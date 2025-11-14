-- Run this in your Supabase SQL Editor to fix your existing account
-- Replace 'tjosato+mb@gmail.com' with your actual email if different

-- Step 1: Check if user exists and email confirmation status
SELECT
  id,
  email,
  email_confirmed_at,
  raw_user_meta_data->>'full_name' as full_name,
  created_at
FROM auth.users
WHERE email = 'tjosato+mb@gmail.com';

-- Step 2: Check if profile exists
SELECT * FROM public.profiles
WHERE email = 'tjosato+mb@gmail.com';

-- Step 3: If profile doesn't exist, create it
-- This will only insert if the profile doesn't already exist
INSERT INTO public.profiles (id, email, full_name, role)
SELECT
  id,
  email,
  raw_user_meta_data->>'full_name',
  'COMMUNITY_MEMBER'
FROM auth.users
WHERE email = 'tjosato+mb@gmail.com'
AND NOT EXISTS (
  SELECT 1 FROM public.profiles WHERE email = 'tjosato+mb@gmail.com'
);

-- Step 4: Verify the profile was created
SELECT * FROM public.profiles
WHERE email = 'tjosato+mb@gmail.com';
