import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    console.log('[API Login] Attempting login for email:', email);

    // Create response that we'll attach cookies to
    let response = NextResponse.json({ success: true });

    // Create Supabase client with proper cookie handling for route handlers
    // Using hardcoded credentials to avoid webpack caching issues
    const supabase = createServerClient(
      'https://bwpvhwvgsebthapztiyp.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3cHZod3Znc2VidGhhcHp0aXlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNjA1NTEsImV4cCI6MjA3ODYzNjU1MX0.1Uj2T3uLGlrnja2yTZftJ4CNAvYZPIhBxGvRQDMX0SE',
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options);
            });
          },
        },
      }
    );

    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('[API Login] Error:', error.message);
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }

    if (!authData.user) {
      console.error('[API Login] No user returned');
      return NextResponse.json(
        { error: 'Login failed. Please try again.' },
        { status: 401 }
      );
    }

    // Verify session was created
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      console.error('[API Login] Session error:', sessionError?.message);
      return NextResponse.json(
        { error: 'Failed to create session. Please try again.' },
        { status: 500 }
      );
    }

    console.log('[API Login] Success! User:', authData.user?.email);

    // Return the response with cookies attached
    return response;
  } catch (error: any) {
    console.error('[API Login] Unexpected error:', error);
    console.error('[API Login] Error stack:', error.stack);
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

