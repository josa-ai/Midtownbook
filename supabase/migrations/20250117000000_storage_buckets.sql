/**
 * Storage Buckets Setup
 * Creates all required storage buckets for the application
 */

-- Create storage buckets if they don't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  (
    'claim-documents',
    'claim-documents',
    true, -- Public for admin review
    10485760, -- 10MB limit
    ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/jpg', 'image/webp']
  ),
  (
    'business-logos',
    'business-logos',
    true, -- Public for display
    5242880, -- 5MB limit
    ARRAY['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/svg+xml']
  ),
  (
    'business-covers',
    'business-covers',
    true, -- Public for display
    10485760, -- 10MB limit
    ARRAY['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
  ),
  (
    'business-images',
    'business-images',
    true, -- Public for display
    10485760, -- 10MB limit per file
    ARRAY['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
  ),
  (
    'event-images',
    'event-images',
    true, -- Public for display
    10485760, -- 10MB limit
    ARRAY['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
  ),
  (
    'avatars',
    'avatars',
    true, -- Public for display
    2097152, -- 2MB limit
    ARRAY['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
  )
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for each bucket

-- claim-documents: Authenticated users can upload, anyone can view
CREATE POLICY "Authenticated users can upload claim documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'claim-documents');

CREATE POLICY "Anyone can view claim documents"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'claim-documents');

CREATE POLICY "Users can update own claim documents"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'claim-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own claim documents"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'claim-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- business-logos: Business owners can upload, anyone can view
CREATE POLICY "Business owners can upload logos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'business-logos' AND
  EXISTS (
    SELECT 1 FROM businesses
    WHERE id::text = (storage.foldername(name))[1]
    AND owner_id = auth.uid()
  )
);

CREATE POLICY "Anyone can view business logos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'business-logos');

CREATE POLICY "Business owners can update own logos"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'business-logos' AND
  EXISTS (
    SELECT 1 FROM businesses
    WHERE id::text = (storage.foldername(name))[1]
    AND owner_id = auth.uid()
  )
);

CREATE POLICY "Business owners can delete own logos"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'business-logos' AND
  EXISTS (
    SELECT 1 FROM businesses
    WHERE id::text = (storage.foldername(name))[1]
    AND owner_id = auth.uid()
  )
);

-- business-covers: Business owners can upload, anyone can view
CREATE POLICY "Business owners can upload covers"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'business-covers' AND
  EXISTS (
    SELECT 1 FROM businesses
    WHERE id::text = (storage.foldername(name))[1]
    AND owner_id = auth.uid()
  )
);

CREATE POLICY "Anyone can view business covers"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'business-covers');

CREATE POLICY "Business owners can update own covers"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'business-covers' AND
  EXISTS (
    SELECT 1 FROM businesses
    WHERE id::text = (storage.foldername(name))[1]
    AND owner_id = auth.uid()
  )
);

CREATE POLICY "Business owners can delete own covers"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'business-covers' AND
  EXISTS (
    SELECT 1 FROM businesses
    WHERE id::text = (storage.foldername(name))[1]
    AND owner_id = auth.uid()
  )
);

-- business-images: Business owners can upload, anyone can view
CREATE POLICY "Business owners can upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'business-images' AND
  EXISTS (
    SELECT 1 FROM businesses
    WHERE id::text = (storage.foldername(name))[1]
    AND owner_id = auth.uid()
  )
);

CREATE POLICY "Anyone can view business images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'business-images');

CREATE POLICY "Business owners can update own images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'business-images' AND
  EXISTS (
    SELECT 1 FROM businesses
    WHERE id::text = (storage.foldername(name))[1]
    AND owner_id = auth.uid()
  )
);

CREATE POLICY "Business owners can delete own images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'business-images' AND
  EXISTS (
    SELECT 1 FROM businesses
    WHERE id::text = (storage.foldername(name))[1]
    AND owner_id = auth.uid()
  )
);

-- event-images: Business owners can upload, anyone can view
CREATE POLICY "Business owners can upload event images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'event-images' AND
  EXISTS (
    SELECT 1 FROM events e
    JOIN businesses b ON b.id = e.business_id
    WHERE e.id::text = (storage.foldername(name))[1]
    AND b.owner_id = auth.uid()
  )
);

CREATE POLICY "Anyone can view event images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'event-images');

CREATE POLICY "Business owners can update own event images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'event-images' AND
  EXISTS (
    SELECT 1 FROM events e
    JOIN businesses b ON b.id = e.business_id
    WHERE e.id::text = (storage.foldername(name))[1]
    AND b.owner_id = auth.uid()
  )
);

CREATE POLICY "Business owners can delete own event images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'event-images' AND
  EXISTS (
    SELECT 1 FROM events e
    JOIN businesses b ON b.id = e.business_id
    WHERE e.id::text = (storage.foldername(name))[1]
    AND b.owner_id = auth.uid()
  )
);

-- avatars: Users can upload own avatars, anyone can view
CREATE POLICY "Users can upload own avatar"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Anyone can view avatars"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'avatars');

CREATE POLICY "Users can update own avatar"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete own avatar"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
