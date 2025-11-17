# Storage System Documentation

## Overview
Mid-Town Lakeland uses Supabase Storage for all file uploads and management. This document explains the storage architecture, buckets, and usage.

---

## Storage Buckets

### 1. `claim-documents`
**Purpose**: Business ownership verification documents
**Access**: Public (for admin review)
**File Types**: PDF, JPEG, PNG, WebP
**Max Size**: 10MB per file
**Path Structure**: `{user_id}/{timestamp}-{filename}`

**Example**:
```
claim-documents/
  └── abc123-def456/
      ├── 1763337099000-business-license.pdf
      └── 1763337100000-tax-id.jpg
```

**Permissions**:
- Authenticated users can upload their own documents
- Anyone can view (required for admin review)
- Users can update/delete only their own documents

---

### 2. `business-logos`
**Purpose**: Business logo images
**Access**: Public
**File Types**: JPEG, PNG, WebP, SVG
**Max Size**: 5MB per file
**Path Structure**: `{business_id}/logo/{timestamp}-{filename}`

**Example**:
```
business-logos/
  └── biz-001/
      └── logo/
          └── 1763337200000-logo.png
```

**Permissions**:
- Business owners can upload/update/delete their business logos
- Anyone can view
- Upsert enabled (can replace existing logo)

---

### 3. `business-covers`
**Purpose**: Business cover/header images
**Access**: Public
**File Types**: JPEG, PNG, WebP
**Max Size**: 10MB per file
**Path Structure**: `{business_id}/cover/{timestamp}-{filename}`

**Example**:
```
business-covers/
  └── biz-001/
      └── cover/
          └── 1763337300000-storefront.jpg
```

**Permissions**:
- Business owners can upload/update/delete their business covers
- Anyone can view
- Upsert enabled (can replace existing cover)

---

### 4. `business-images`
**Purpose**: Business gallery images
**Access**: Public
**File Types**: JPEG, PNG, WebP
**Max Size**: 10MB per file
**Path Structure**: `{business_id}/gallery/{timestamp}-{filename}`

**Example**:
```
business-images/
  └── biz-001/
      └── gallery/
          ├── 1763337400000-interior-1.jpg
          ├── 1763337401000-interior-2.jpg
          └── 1763337402000-product.jpg
```

**Permissions**:
- Business owners can upload/update/delete their business images
- Anyone can view
- Multiple images allowed

---

### 5. `event-images`
**Purpose**: Event promotional images
**Access**: Public
**File Types**: JPEG, PNG, WebP
**Max Size**: 10MB per file
**Path Structure**: `{event_id}/{timestamp}-{filename}`

**Example**:
```
event-images/
  └── evt-001/
      └── 1763337500000-event-poster.jpg
```

**Permissions**:
- Business owners (who own the event's business) can upload/update/delete
- Anyone can view

---

### 6. `avatars`
**Purpose**: User profile avatars
**Access**: Public
**File Types**: JPEG, PNG, WebP
**Max Size**: 2MB per file
**Path Structure**: `{user_id}/{timestamp}-{filename}`

**Example**:
```
avatars/
  └── user-001/
      └── 1763337600000-profile.jpg
```

**Permissions**:
- Users can upload/update/delete only their own avatar
- Anyone can view
- Upsert enabled (can replace existing avatar)

---

## Usage

### Server-Side Upload (Recommended)

```typescript
import {
  uploadBusinessLogo,
  uploadBusinessCover,
  uploadBusinessImages,
  uploadEventImage,
  uploadAvatar,
  uploadClaimDocument,
} from '@/lib/supabase/storage';

// Upload business logo
const result = await uploadBusinessLogo('business-id', logoFile);
if (result.error) {
  console.error('Upload failed:', result.error);
} else {
  console.log('Uploaded to:', result.url);
}

// Upload multiple business images
const files = [image1, image2, image3];
const results = await uploadBusinessImages('business-id', files);

// Upload user avatar
const avatarResult = await uploadAvatar('user-id', avatarFile);
```

### Client-Side Upload with Hook

```typescript
'use client';

import { useUpload } from '@/lib/hooks/use-upload';

function MyComponent() {
  const { upload, uploading, progress } = useUpload();

  const handleUpload = async (files: File[]) => {
    const result = await upload({
      type: 'logo',
      entityId: 'business-id',
      files,
      onProgress: (p) => console.log(`Upload progress: ${p}%`),
    });

    if (result.success) {
      console.log('Uploaded:', result.uploads);
    } else {
      console.error('Upload failed:', result.error);
    }
  };

  return (
    <div>
      {uploading && <p>Uploading: {progress}%</p>}
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files) {
            handleUpload(Array.from(e.target.files));
          }
        }}
      />
    </div>
  );
}
```

### API Route Upload

```typescript
// POST /api/upload
const formData = new FormData();
formData.append('type', 'logo'); // logo | cover | image | event | avatar | claim
formData.append('entityId', 'business-id');
formData.append('files', file1);
formData.append('files', file2); // Multiple files for 'image' type

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData,
});

const data = await response.json();
// { success: true, uploads: [{ url: '...', path: '...' }], count: 2 }
```

---

## File Validation

### Size Limits
- **Avatars**: 2MB max
- **Logos**: 5MB max
- **Covers**: 10MB max
- **Business Images**: 10MB max per file
- **Event Images**: 10MB max
- **Claim Documents**: 10MB max per file

### Allowed MIME Types

| Upload Type | Allowed Types |
|------------|---------------|
| logo | JPEG, PNG, WebP, SVG |
| cover | JPEG, PNG, WebP |
| image | JPEG, PNG, WebP |
| event | JPEG, PNG, WebP |
| avatar | JPEG, PNG, WebP |
| claim | JPEG, PNG, WebP, PDF |

---

## Security

### Row Level Security (RLS)
All storage buckets have RLS policies that:
- Require authentication for uploads
- Verify ownership before allowing uploads
- Allow public read access for display
- Prevent users from modifying others' files

### Ownership Verification
The upload API checks:
- **Business files**: User must be the business owner
- **Event files**: User must own the business that owns the event
- **Avatar**: User can only upload their own avatar
- **Claims**: User can only upload documents to their own user folder

### Path Isolation
Files are organized by entity ID (business_id, user_id, event_id) to:
- Prevent naming collisions
- Enable easy cleanup when entities are deleted
- Simplify permission checks

---

## Utilities

### Generate Storage Path
```typescript
import { generateStoragePath } from '@/lib/supabase/storage';

const path = generateStoragePath('business-id', 'logo.png', 'logo');
// Returns: "business-id/logo/1763337700000-logo.png"
```

### Get Public URL
```typescript
import { getPublicUrl } from '@/lib/supabase/storage';

const url = await getPublicUrl('business-logos', 'business-id/logo/file.png');
```

### Delete Files
```typescript
import { deleteFile, deleteFiles } from '@/lib/supabase/storage';

// Delete single file
await deleteFile('business-logos', 'business-id/logo/old-logo.png');

// Delete multiple files
await deleteFiles('business-images', [
  'business-id/gallery/image-1.jpg',
  'business-id/gallery/image-2.jpg',
]);
```

### Extract Path from URL
```typescript
import { extractPathFromUrl } from '@/lib/supabase/storage';

const path = extractPathFromUrl(
  'https://project.supabase.co/storage/v1/object/public/business-logos/biz-001/logo.png',
  'business-logos'
);
// Returns: "biz-001/logo.png"
```

---

## Migration Setup

### Run Storage Migration
```bash
# In Supabase Dashboard SQL Editor:
# Execute: supabase/migrations/20250117000000_storage_buckets.sql
```

This migration creates:
- All 6 storage buckets
- RLS policies for each bucket
- File size and type restrictions
- Proper permissions and access controls

### Verify Buckets
```bash
# Check buckets in Supabase Dashboard > Storage
# All 6 buckets should be visible:
# - claim-documents
# - business-logos
# - business-covers
# - business-images
# - event-images
# - avatars
```

---

## Best Practices

### 1. Always Use Helper Functions
Don't upload directly to storage. Use the typed helper functions:
```typescript
// ✅ Good
await uploadBusinessLogo(businessId, file);

// ❌ Bad
await supabase.storage.from('business-logos').upload(path, file);
```

### 2. Handle Errors Gracefully
```typescript
const result = await uploadBusinessLogo(businessId, file);
if (result.error) {
  // Show user-friendly error
  toast.error('Failed to upload logo. Please try again.');
  console.error('Upload error:', result.error);
  return;
}

// Update database with new URL
await updateBusiness(businessId, { logo_url: result.url });
```

### 3. Clean Up Old Files
When replacing images:
```typescript
// Get old logo URL from database
const oldLogoUrl = business.logo_url;

// Upload new logo
const result = await uploadBusinessLogo(businessId, newFile);

// Update database
await updateBusiness(businessId, { logo_url: result.url });

// Delete old logo
if (oldLogoUrl) {
  const oldPath = extractPathFromUrl(oldLogoUrl, 'business-logos');
  if (oldPath) {
    await deleteFile('business-logos', oldPath);
  }
}
```

### 4. Validate Before Upload
```typescript
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

if (file.size > MAX_FILE_SIZE) {
  return { error: 'File too large. Maximum size is 5MB.' };
}

if (!ALLOWED_TYPES.includes(file.type)) {
  return { error: 'Invalid file type. Only JPEG, PNG, and WebP allowed.' };
}
```

### 5. Use Progress Callbacks
```typescript
const { upload, progress } = useUpload();

await upload({
  type: 'image',
  entityId: businessId,
  files: selectedFiles,
  onProgress: (p) => {
    setUploadProgress(p);
    // Update UI to show progress
  },
});
```

---

## Troubleshooting

### Upload Fails with 401 Unauthorized
- Check that user is authenticated
- Verify user has correct permissions (e.g., owns the business)

### Upload Fails with 413 Payload Too Large
- File exceeds size limit for that upload type
- Compress image or reduce quality before uploading

### Upload Fails with 415 Unsupported Media Type
- File type not allowed for that upload type
- Convert to allowed format (e.g., JPEG, PNG)

### RLS Policy Error
- User doesn't have permission for that bucket/path
- Check ownership verification logic
- Verify RLS policies are set up correctly

### File Not Appearing After Upload
- Check that public URL is being saved to database
- Verify bucket has public read access
- Check browser console for CORS errors

---

## Examples

### Complete Business Logo Upload Flow

```typescript
'use client';

import { useState } from 'react';
import { useUpload } from '@/lib/hooks/use-upload';
import { updateBusiness } from '@/lib/actions/businesses';
import { extractPathFromUrl } from '@/lib/supabase/storage';

export function BusinessLogoUpload({ business }) {
  const { upload, uploading, progress } = useUpload();
  const [error, setError] = useState<string | null>(null);

  const handleLogoUpload = async (file: File) => {
    setError(null);

    // Validate
    if (file.size > 5 * 1024 * 1024) {
      setError('Logo must be under 5MB');
      return;
    }

    // Upload
    const result = await upload({
      type: 'logo',
      entityId: business.id,
      files: [file],
    });

    if (!result.success || !result.uploads) {
      setError(result.error || 'Upload failed');
      return;
    }

    // Update database
    const { success, error: updateError } = await updateBusiness(business.id, {
      logo_url: result.uploads[0].url,
    });

    if (!success) {
      setError(updateError || 'Failed to update business');
      return;
    }

    // Success!
    toast.success('Logo updated successfully');
  };

  return (
    <div>
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/svg+xml"
        disabled={uploading}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleLogoUpload(file);
        }}
      />
      {uploading && <p>Uploading: {progress}%</p>}
      {error && <p className="text-error">{error}</p>}
    </div>
  );
}
```

---

## Next Steps

1. **Run Migration**: Execute the storage buckets migration in Supabase
2. **Test Uploads**: Use the upload API to test each upload type
3. **Update UI**: Integrate upload functionality into business dashboard
4. **Add Validation**: Implement client-side file validation
5. **Monitor Usage**: Check Supabase Storage metrics for usage patterns
