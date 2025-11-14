import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import nodeFetch from 'node-fetch';

export async function createClient() {
  const cookieStore = await cookies();

  // Hardcode values temporarily to bypass webpack inlining issue
  const url = 'https://bwpvhwvgsebthapztiyp.supabase.co';
  const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3cHZod3Znc2VidGhhcHp0aXlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNjA1NTEsImV4cCI6MjA3ODYzNjU1MX0.1Uj2T3uLGlrnja2yTZftJ4CNAvYZPIhBxGvRQDMX0SE';

  console.log('[Supabase Server] URL:', url);
  console.log('[Supabase Server] Key prefix:', key?.substring(0, 20));

  return createServerClient(
    url,
    key,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
      global: {
        fetch: nodeFetch as any,
      },
    }
  );
}
