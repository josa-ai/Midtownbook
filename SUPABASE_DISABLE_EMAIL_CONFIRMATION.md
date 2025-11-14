# Disable Email Confirmation in Supabase (for development)

If you want to disable email confirmation temporarily for development:

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to **Authentication** → **Providers** → **Email**
4. Scroll down to **Confirm email**
5. Toggle **OFF** the "Enable email confirmations" setting
6. Click **Save**

After this, you can sign up and log in immediately without email verification.

## Alternative: Check Email Confirmation Status

Run this in your Supabase SQL Editor to check if your email is confirmed:

```sql
SELECT
  id,
  email,
  email_confirmed_at,
  CASE
    WHEN email_confirmed_at IS NULL THEN 'NOT CONFIRMED'
    ELSE 'CONFIRMED'
  END as status
FROM auth.users
WHERE email = 'tjosato+blake@gmail.com';
```

If `email_confirmed_at` is NULL, you need to click the verification link in your email.
