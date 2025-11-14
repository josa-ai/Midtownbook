-- Check if your email is confirmed
-- Run this in Supabase SQL Editor

SELECT
  id,
  email,
  email_confirmed_at,
  confirmation_sent_at,
  confirmed_at,
  CASE
    WHEN email_confirmed_at IS NULL THEN 'NOT CONFIRMED - You must click the verification link in your email'
    ELSE 'CONFIRMED - You should be able to log in'
  END as status
FROM auth.users
WHERE email = 'tjosato+mb@gmail.com';
