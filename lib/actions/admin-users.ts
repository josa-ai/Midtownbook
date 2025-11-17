/**
 * Admin User Management Actions
 * Server actions for managing users
 */

'use server';

import { createClient } from '@/lib/supabase/server';
import { requireAdmin, logAdminAction } from '@/lib/auth/admin';
import { sendEmail } from '@/lib/email/mailgun';
import { revalidatePath } from 'next/cache';

export interface User {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: string;
  status: string;
  suspended_at: string | null;
  last_login: string | null;
  created_at: string;
  updated_at: string;
  businesses_count?: number;
  reviews_count?: number;
}

/**
 * Get users with filters and pagination
 */
export async function getUsers(filters: {
  search?: string;
  role?: 'admin' | 'business_owner' | 'user';
  status?: 'active' | 'suspended' | 'deleted';
  limit?: number;
  offset?: number;
} = {}): Promise<{ data: User[]; count: number; error: string | null }> {
  try {
    await requireAdmin();
    const supabase = await createClient();

    let query = supabase
      .from('profiles')
      .select(
        `
        *,
        businesses:businesses(count),
        reviews:reviews(count)
      `,
        { count: 'exact' }
      );

    // Apply filters
    if (filters.search) {
      query = query.or(`full_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`);
    }

    if (filters.role) {
      query = query.eq('role', filters.role);
    }

    if (filters.status) {
      query = query.eq('status', filters.status);
    }

    // Pagination
    const limit = filters.limit || 20;
    const offset = filters.offset || 0;
    query = query.range(offset, offset + limit - 1);

    // Order by created_at descending
    query = query.order('created_at', { ascending: false });

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching users:', error);
      return { data: [], count: 0, error: error.message };
    }

    // Transform data to include counts
    const users = data?.map((user: any) => ({
      ...user,
      businesses_count: user.businesses?.[0]?.count || 0,
      reviews_count: user.reviews?.[0]?.count || 0,
    }));

    return { data: users || [], count: count || 0, error: null };
  } catch (error) {
    console.error('Error in getUsers:', error);
    return {
      data: [],
      count: 0,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Suspend a user
 */
export async function suspendUser(
  userId: string,
  reason: string
): Promise<{ success: boolean; error: string | null }> {
  try {
    const admin = await requireAdmin();
    const supabase = await createClient();

    // Get user details
    const { data: user } = await supabase
      .from('profiles')
      .select('id, email, full_name')
      .eq('id', userId)
      .single();

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    // Prevent self-suspension
    if (user.id === admin.id) {
      return { success: false, error: 'Cannot suspend yourself' };
    }

    // Update user status
    const { error } = await supabase
      .from('profiles')
      .update({
        status: 'suspended',
        suspended_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (error) {
      console.error('Error suspending user:', error);
      return { success: false, error: error.message };
    }

    // Send suspension email
    try {
      await sendEmail({
        to: user.email,
        subject: 'Account Suspended - Mid-Town Lakeland',
        html: `
          <h2>Account Suspended</h2>
          <p>Hi ${user.full_name || user.email},</p>
          <p>Your account has been suspended.</p>
          <p><strong>Reason:</strong> ${reason}</p>
          <p>If you believe this is an error, please contact our support team.</p>
        `,
        text: `Account Suspended: Your account has been suspended. Reason: ${reason}. If you believe this is an error, please contact our support team.`,
      });
    } catch (emailError) {
      console.error('Error sending suspension email:', emailError);
    }

    // Log the action
    await logAdminAction({
      adminId: admin.id,
      action: 'suspend_user',
      entityType: 'user',
      entityId: userId,
      details: { reason },
    });

    revalidatePath('/admin/users');
    return { success: true, error: null };
  } catch (error) {
    console.error('Error in suspendUser:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Reinstate a suspended user
 */
export async function reinstateUser(
  userId: string
): Promise<{ success: boolean; error: string | null }> {
  try {
    const admin = await requireAdmin();
    const supabase = await createClient();

    // Get user details
    const { data: user } = await supabase
      .from('profiles')
      .select('id, email, full_name')
      .eq('id', userId)
      .single();

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    // Update user status
    const { error } = await supabase
      .from('profiles')
      .update({
        status: 'active',
        suspended_at: null,
      })
      .eq('id', userId);

    if (error) {
      console.error('Error reinstating user:', error);
      return { success: false, error: error.message };
    }

    // Send reinstatement email
    try {
      await sendEmail({
        to: user.email,
        subject: 'Account Reinstated - Mid-Town Lakeland',
        html: `
          <h2>Account Reinstated</h2>
          <p>Hi ${user.full_name || user.email},</p>
          <p>Your account has been reinstated. You can now access all features of Mid-Town Lakeland.</p>
          <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/dashboard">Go to Dashboard</a></p>
        `,
        text: `Account Reinstated: Your account has been reinstated. You can now access all features of Mid-Town Lakeland.`,
      });
    } catch (emailError) {
      console.error('Error sending reinstatement email:', emailError);
    }

    // Log the action
    await logAdminAction({
      adminId: admin.id,
      action: 'reinstate_user',
      entityType: 'user',
      entityId: userId,
    });

    revalidatePath('/admin/users');
    return { success: true, error: null };
  } catch (error) {
    console.error('Error in reinstateUser:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Delete a user (soft delete)
 */
export async function deleteUser(
  userId: string
): Promise<{ success: boolean; error: string | null }> {
  try {
    const admin = await requireAdmin();
    const supabase = await createClient();

    // Prevent self-deletion
    if (userId === admin.id) {
      return { success: false, error: 'Cannot delete yourself' };
    }

    // Soft delete - set status to deleted
    const { error } = await supabase
      .from('profiles')
      .update({
        status: 'deleted',
      })
      .eq('id', userId);

    if (error) {
      console.error('Error deleting user:', error);
      return { success: false, error: error.message };
    }

    // Log the action
    await logAdminAction({
      adminId: admin.id,
      action: 'delete_user',
      entityType: 'user',
      entityId: userId,
    });

    revalidatePath('/admin/users');
    return { success: true, error: null };
  } catch (error) {
    console.error('Error in deleteUser:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Update user role
 */
export async function updateUserRole(
  userId: string,
  role: 'admin' | 'business_owner' | 'user'
): Promise<{ success: boolean; error: string | null }> {
  try {
    const admin = await requireAdmin();
    const supabase = await createClient();

    // Prevent changing own role
    if (userId === admin.id) {
      return { success: false, error: 'Cannot change your own role' };
    }

    const { error } = await supabase
      .from('profiles')
      .update({ role })
      .eq('id', userId);

    if (error) {
      console.error('Error updating user role:', error);
      return { success: false, error: error.message };
    }

    // Log the action
    await logAdminAction({
      adminId: admin.id,
      action: 'update_user_role',
      entityType: 'user',
      entityId: userId,
      details: { newRole: role },
    });

    revalidatePath('/admin/users');
    return { success: true, error: null };
  } catch (error) {
    console.error('Error in updateUserRole:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get user statistics
 */
export async function getUserStats(): Promise<{
  total: number;
  active: number;
  suspended: number;
  businessOwners: number;
  admins: number;
  error: string | null;
}> {
  try {
    await requireAdmin();
    const supabase = await createClient();

    const { count: total } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });

    const { count: active } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active');

    const { count: suspended } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'suspended');

    const { count: businessOwners } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'business_owner');

    const { count: admins } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'admin');

    return {
      total: total || 0,
      active: active || 0,
      suspended: suspended || 0,
      businessOwners: businessOwners || 0,
      admins: admins || 0,
      error: null,
    };
  } catch (error) {
    console.error('Error in getUserStats:', error);
    return {
      total: 0,
      active: 0,
      suspended: 0,
      businessOwners: 0,
      admins: 0,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
