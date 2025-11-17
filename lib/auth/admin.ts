/**
 * Admin Authentication Helper
 * Provides reusable functions for admin role verification
 */

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export interface AdminUser {
  id: string;
  email: string;
  role: string;
  full_name: string | null;
  avatar_url: string | null;
}

/**
 * Require admin role for a page
 * Redirects to login if not authenticated
 * Redirects to home if not admin
 * Returns admin user if authorized
 */
export async function requireAdmin(): Promise<AdminUser> {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect('/auth/login?redirect=/admin');
  }

  // Get user profile with role
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, email, role, full_name, avatar_url, status')
    .eq('id', user.id)
    .single();

  if (profileError || !profile) {
    console.error('Error fetching profile:', profileError);
    redirect('/auth/login?redirect=/admin');
  }

  // Check if user is admin
  if (profile.role !== 'admin') {
    redirect('/?error=unauthorized');
  }

  // Check if account is suspended
  if (profile.status === 'suspended') {
    redirect('/?error=account_suspended');
  }

  return {
    id: profile.id,
    email: profile.email,
    role: profile.role,
    full_name: profile.full_name,
    avatar_url: profile.avatar_url,
  };
}

/**
 * Check if current user is admin (non-redirecting)
 * Returns admin user if authorized, null otherwise
 */
export async function checkAdmin(): Promise<AdminUser | null> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    const { data: profile } = await supabase
      .from('profiles')
      .select('id, email, role, full_name, avatar_url, status')
      .eq('id', user.id)
      .single();

    if (!profile || profile.role !== 'admin' || profile.status === 'suspended') {
      return null;
    }

    return {
      id: profile.id,
      email: profile.email,
      role: profile.role,
      full_name: profile.full_name,
      avatar_url: profile.avatar_url,
    };
  } catch (error) {
    console.error('Error checking admin:', error);
    return null;
  }
}

/**
 * Log admin action to audit log
 */
export async function logAdminAction(params: {
  adminId: string;
  action: string;
  entityType: string;
  entityId: string;
  details?: Record<string, unknown>;
}): Promise<void> {
  try {
    const supabase = await createClient();

    await supabase.from('admin_audit_log').insert({
      admin_id: params.adminId,
      action: params.action,
      entity_type: params.entityType,
      entity_id: params.entityId,
      details: params.details || {},
    });
  } catch (error) {
    console.error('Error logging admin action:', error);
    // Don't throw - logging failures shouldn't break the main action
  }
}
