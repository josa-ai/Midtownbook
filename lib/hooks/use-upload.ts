/**
 * File Upload Hook
 * Client-side hook for handling file uploads
 */

'use client';

import { useState } from 'react';

export type UploadType = 'logo' | 'cover' | 'image' | 'event' | 'avatar' | 'claim';

export interface UploadOptions {
  type: UploadType;
  entityId: string;
  files: File[];
  onProgress?: (progress: number) => void;
}

export interface UploadResult {
  success: boolean;
  uploads?: { url: string; path: string }[];
  error?: string;
}

export function useUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const upload = async (options: UploadOptions): Promise<UploadResult> => {
    const { type, entityId, files, onProgress } = options;

    setUploading(true);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append('type', type);
      formData.append('entityId', entityId);

      files.forEach((file) => {
        formData.append('files', file);
      });

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const next = Math.min(prev + 10, 90);
          onProgress?.(next);
          return next;
        });
      }, 200);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setProgress(100);
      onProgress?.(100);

      return {
        success: true,
        uploads: data.uploads,
      };
    } catch (error) {
      console.error('Upload error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed',
      };
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 1000); // Reset after delay
    }
  };

  return {
    upload,
    uploading,
    progress,
  };
}
