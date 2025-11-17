/**
 * File Upload API
 * Unified endpoint for all file uploads
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import {
  uploadBusinessLogo,
  uploadBusinessCover,
  uploadBusinessImages,
  uploadEventImage,
  uploadAvatar,
  uploadClaimDocument,
  type StorageBucket,
} from '@/lib/supabase/storage';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse form data
    const formData = await request.formData();
    const type = formData.get('type') as string;
    const entityId = formData.get('entityId') as string;
    const files = formData.getAll('files') as File[];

    if (!type || !entityId) {
      return NextResponse.json(
        { error: 'Missing type or entityId' },
        { status: 400 }
      );
    }

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    // Validate file types and sizes
    const maxSizes: Record<string, number> = {
      logo: 5 * 1024 * 1024, // 5MB
      cover: 10 * 1024 * 1024, // 10MB
      image: 10 * 1024 * 1024, // 10MB
      event: 10 * 1024 * 1024, // 10MB
      avatar: 2 * 1024 * 1024, // 2MB
      claim: 10 * 1024 * 1024, // 10MB
    };

    const allowedTypes: Record<string, string[]> = {
      logo: ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/svg+xml'],
      cover: ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'],
      image: ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'],
      event: ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'],
      avatar: ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'],
      claim: [
        'image/jpeg',
        'image/png',
        'image/jpg',
        'image/webp',
        'application/pdf',
      ],
    };

    const maxSize = maxSizes[type] || 10 * 1024 * 1024;
    const allowed = allowedTypes[type] || allowedTypes.image;

    for (const file of files) {
      if (file.size > maxSize) {
        return NextResponse.json(
          { error: `File ${file.name} exceeds maximum size of ${maxSize / 1024 / 1024}MB` },
          { status: 400 }
        );
      }

      if (!allowed.includes(file.type)) {
        return NextResponse.json(
          { error: `File type ${file.type} not allowed for ${type}` },
          { status: 400 }
        );
      }
    }

    // Check permissions based on upload type
    if (type === 'logo' || type === 'cover' || type === 'image') {
      // Verify user owns the business
      const { data: business } = await supabase
        .from('businesses')
        .select('owner_id')
        .eq('id', entityId)
        .single();

      if (!business || business.owner_id !== user.id) {
        return NextResponse.json(
          { error: 'You do not have permission to upload to this business' },
          { status: 403 }
        );
      }
    } else if (type === 'event') {
      // Verify user owns the business that owns the event
      const { data: event } = await supabase
        .from('events')
        .select('business_id, businesses!inner(owner_id)')
        .eq('id', entityId)
        .single();

      if (!event || (event.businesses as any)?.owner_id !== user.id) {
        return NextResponse.json(
          { error: 'You do not have permission to upload to this event' },
          { status: 403 }
        );
      }
    } else if (type === 'avatar') {
      // Verify user is uploading their own avatar
      if (entityId !== user.id) {
        return NextResponse.json(
          { error: 'You can only upload your own avatar' },
          { status: 403 }
        );
      }
    }

    // Upload files based on type
    let results;

    switch (type) {
      case 'logo':
        results = [await uploadBusinessLogo(entityId, files[0])];
        break;
      case 'cover':
        results = [await uploadBusinessCover(entityId, files[0])];
        break;
      case 'image':
        results = await uploadBusinessImages(entityId, files);
        break;
      case 'event':
        results = [await uploadEventImage(entityId, files[0])];
        break;
      case 'avatar':
        results = [await uploadAvatar(entityId, files[0])];
        break;
      case 'claim':
        results = await Promise.all(
          files.map((file) => uploadClaimDocument(user.id, file))
        );
        break;
      default:
        return NextResponse.json({ error: 'Invalid upload type' }, { status: 400 });
    }

    // Check for errors
    const errors = results.filter((r) => r.error);
    if (errors.length > 0) {
      return NextResponse.json(
        { error: 'Some files failed to upload', details: errors },
        { status: 500 }
      );
    }

    // Return successful uploads
    const uploads = results.map((r) => ({ url: r.url, path: r.path }));

    return NextResponse.json({
      success: true,
      uploads,
      count: uploads.length,
    });
  } catch (error) {
    console.error('Error in upload API:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
