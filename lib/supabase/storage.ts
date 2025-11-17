/**
 * Supabase Storage Utilities
 * Helper functions for file uploads and management
 */

'use server';

import { createClient } from '@/lib/supabase/server';

export type StorageBucket =
  | 'claim-documents'
  | 'business-logos'
  | 'business-covers'
  | 'business-images'
  | 'event-images'
  | 'avatars';

export interface UploadOptions {
  bucket: StorageBucket;
  path: string;
  file: File;
  upsert?: boolean;
}

export interface UploadResult {
  url: string;
  path: string;
  error: string | null;
}

/**
 * Upload a file to Supabase Storage
 */
export async function uploadFile(options: UploadOptions): Promise<UploadResult> {
  try {
    const supabase = await createClient();
    const { bucket, path, file, upsert = false } = options;

    // Upload file
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        contentType: file.type,
        upsert,
      });

    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      return { url: '', path: '', error: uploadError.message };
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(uploadData.path);

    return { url: publicUrl, path: uploadData.path, error: null };
  } catch (error) {
    console.error('Error in uploadFile:', error);
    return {
      url: '',
      path: '',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Upload multiple files to Supabase Storage
 */
export async function uploadFiles(
  bucket: StorageBucket,
  files: { path: string; file: File }[]
): Promise<UploadResult[]> {
  const results = await Promise.all(
    files.map((f) => uploadFile({ bucket, path: f.path, file: f.file }))
  );
  return results;
}

/**
 * Delete a file from Supabase Storage
 */
export async function deleteFile(
  bucket: StorageBucket,
  path: string
): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createClient();

    const { error } = await supabase.storage.from(bucket).remove([path]);

    if (error) {
      console.error('Error deleting file:', error);
      return { success: false, error: error.message };
    }

    return { success: true, error: null };
  } catch (error) {
    console.error('Error in deleteFile:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Delete multiple files from Supabase Storage
 */
export async function deleteFiles(
  bucket: StorageBucket,
  paths: string[]
): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createClient();

    const { error } = await supabase.storage.from(bucket).remove(paths);

    if (error) {
      console.error('Error deleting files:', error);
      return { success: false, error: error.message };
    }

    return { success: true, error: null };
  } catch (error) {
    console.error('Error in deleteFiles:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get public URL for a file
 */
export async function getPublicUrl(
  bucket: StorageBucket,
  path: string
): Promise<string> {
  const supabase = await createClient();
  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(path);
  return publicUrl;
}

/**
 * Generate a storage path for a file
 */
export function generateStoragePath(
  entityId: string,
  fileName: string,
  prefix?: string
): string {
  const timestamp = Date.now();
  const cleanFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
  const parts = [entityId];
  if (prefix) parts.push(prefix);
  parts.push(`${timestamp}-${cleanFileName}`);
  return parts.join('/');
}

/**
 * Upload business logo
 */
export async function uploadBusinessLogo(
  businessId: string,
  file: File
): Promise<UploadResult> {
  const path = generateStoragePath(businessId, file.name, 'logo');
  return uploadFile({
    bucket: 'business-logos',
    path,
    file,
    upsert: true, // Allow replacing logo
  });
}

/**
 * Upload business cover image
 */
export async function uploadBusinessCover(
  businessId: string,
  file: File
): Promise<UploadResult> {
  const path = generateStoragePath(businessId, file.name, 'cover');
  return uploadFile({
    bucket: 'business-covers',
    path,
    file,
    upsert: true, // Allow replacing cover
  });
}

/**
 * Upload business gallery images
 */
export async function uploadBusinessImages(
  businessId: string,
  files: File[]
): Promise<UploadResult[]> {
  const uploads = files.map((file) => ({
    path: generateStoragePath(businessId, file.name, 'gallery'),
    file,
  }));
  return uploadFiles('business-images', uploads);
}

/**
 * Upload event image
 */
export async function uploadEventImage(
  eventId: string,
  file: File
): Promise<UploadResult> {
  const path = generateStoragePath(eventId, file.name);
  return uploadFile({
    bucket: 'event-images',
    path,
    file,
  });
}

/**
 * Upload user avatar
 */
export async function uploadAvatar(userId: string, file: File): Promise<UploadResult> {
  const path = generateStoragePath(userId, file.name);
  return uploadFile({
    bucket: 'avatars',
    path,
    file,
    upsert: true, // Allow replacing avatar
  });
}

/**
 * Upload claim verification document
 */
export async function uploadClaimDocument(
  userId: string,
  file: File
): Promise<UploadResult> {
  const path = generateStoragePath(userId, file.name);
  return uploadFile({
    bucket: 'claim-documents',
    path,
    file,
  });
}

/**
 * Extract path from storage URL
 */
export function extractPathFromUrl(url: string, bucket: StorageBucket): string | null {
  try {
    const urlObj = new URL(url);
    const pathMatch = urlObj.pathname.match(new RegExp(`/${bucket}/(.+)$`));
    return pathMatch ? pathMatch[1] : null;
  } catch {
    return null;
  }
}

/**
 * Delete business images by URLs
 */
export async function deleteBusinessImagesByUrls(
  urls: string[]
): Promise<{ success: boolean; error: string | null }> {
  const paths = urls
    .map((url) => extractPathFromUrl(url, 'business-images'))
    .filter((p): p is string => p !== null);

  if (paths.length === 0) {
    return { success: true, error: null };
  }

  return deleteFiles('business-images', paths);
}
