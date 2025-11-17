/**
 * Admin Business Management Actions
 * Server actions for managing businesses and claims
 */

'use server';

import { createClient } from '@/lib/supabase/server';
import { requireAdmin, logAdminAction } from '@/lib/auth/admin';
import { revalidatePath } from 'next/cache';

export interface BusinessFilters {
  search?: string;
  status?: 'pending' | 'approved' | 'rejected' | 'suspended';
  category?: string;
  claimStatus?: 'unclaimed' | 'pending' | 'claimed';
  limit?: number;
  offset?: number;
}

export interface Business {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  address: string;
  city: string;
  state: string;
  zip_code: string | null;
  status: string | null;
  claim_status: string;
  is_verified: boolean;
  is_featured: boolean;
  rating: number | null;
  review_count: number;
  view_count: number;
  created_at: string;
  approved_at: string | null;
  category: { name: string } | null;
  owner: { id: string; full_name: string | null; email: string } | null;
}

/**
 * Get businesses with filters and pagination
 */
export async function getBusinesses(
  filters: BusinessFilters = {}
): Promise<{ data: Business[]; count: number; error: string | null }> {
  try {
    const admin = await requireAdmin();
    const supabase = await createClient();

    let query = supabase
      .from('businesses')
      .select(
        `
        *,
        category:categories(name),
        owner:profiles!businesses_owner_id_fkey(id, full_name, email)
      `,
        { count: 'exact' }
      );

    // Apply filters
    if (filters.search) {
      query = query.or(
        `name.ilike.%${filters.search}%,address.ilike.%${filters.search}%,city.ilike.%${filters.search}%`
      );
    }

    if (filters.status) {
      query = query.eq('status', filters.status);
    }

    if (filters.category) {
      query = query.eq('category_id', filters.category);
    }

    if (filters.claimStatus) {
      query = query.eq('claim_status', filters.claimStatus);
    }

    // Pagination
    const limit = filters.limit || 20;
    const offset = filters.offset || 0;
    query = query.range(offset, offset + limit - 1);

    // Order by created_at descending
    query = query.order('created_at', { ascending: false });

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching businesses:', error);
      return { data: [], count: 0, error: error.message };
    }

    return { data: data || [], count: count || 0, error: null };
  } catch (error) {
    console.error('Error in getBusinesses:', error);
    return {
      data: [],
      count: 0,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Approve a business
 */
export async function approveBusiness(
  businessId: string,
  notes?: string
): Promise<{ success: boolean; error: string | null }> {
  try {
    const admin = await requireAdmin();
    const supabase = await createClient();

    const { error } = await supabase
      .from('businesses')
      .update({
        status: 'approved',
        approved_at: new Date().toISOString(),
        approved_by: admin.id,
      })
      .eq('id', businessId);

    if (error) {
      console.error('Error approving business:', error);
      return { success: false, error: error.message };
    }

    // Log the action
    await logAdminAction({
      adminId: admin.id,
      action: 'approve_business',
      entityType: 'business',
      entityId: businessId,
      details: { notes },
    });

    revalidatePath('/admin/businesses');
    return { success: true, error: null };
  } catch (error) {
    console.error('Error in approveBusiness:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Reject a business
 */
export async function rejectBusiness(
  businessId: string,
  reason: string
): Promise<{ success: boolean; error: string | null }> {
  try {
    const admin = await requireAdmin();
    const supabase = await createClient();

    const { error } = await supabase
      .from('businesses')
      .update({
        status: 'rejected',
      })
      .eq('id', businessId);

    if (error) {
      console.error('Error rejecting business:', error);
      return { success: false, error: error.message };
    }

    // Log the action
    await logAdminAction({
      adminId: admin.id,
      action: 'reject_business',
      entityType: 'business',
      entityId: businessId,
      details: { reason },
    });

    revalidatePath('/admin/businesses');
    return { success: true, error: null };
  } catch (error) {
    console.error('Error in rejectBusiness:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Suspend a business
 */
export async function suspendBusiness(
  businessId: string,
  reason: string
): Promise<{ success: boolean; error: string | null }> {
  try {
    const admin = await requireAdmin();
    const supabase = await createClient();

    const { error } = await supabase
      .from('businesses')
      .update({
        status: 'suspended',
        is_active: false,
      })
      .eq('id', businessId);

    if (error) {
      console.error('Error suspending business:', error);
      return { success: false, error: error.message };
    }

    // Log the action
    await logAdminAction({
      adminId: admin.id,
      action: 'suspend_business',
      entityType: 'business',
      entityId: businessId,
      details: { reason },
    });

    revalidatePath('/admin/businesses');
    return { success: true, error: null };
  } catch (error) {
    console.error('Error in suspendBusiness:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Delete a business (soft delete by setting is_active to false)
 */
export async function deleteBusiness(
  businessId: string
): Promise<{ success: boolean; error: string | null }> {
  try {
    const admin = await requireAdmin();
    const supabase = await createClient();

    const { error } = await supabase
      .from('businesses')
      .update({
        is_active: false,
        status: 'rejected',
      })
      .eq('id', businessId);

    if (error) {
      console.error('Error deleting business:', error);
      return { success: false, error: error.message };
    }

    // Log the action
    await logAdminAction({
      adminId: admin.id,
      action: 'delete_business',
      entityType: 'business',
      entityId: businessId,
    });

    revalidatePath('/admin/businesses');
    return { success: true, error: null };
  } catch (error) {
    console.error('Error in deleteBusiness:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get business statistics for admin dashboard
 */
export async function getBusinessStats(): Promise<{
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  claimed: number;
  error: string | null;
}> {
  try {
    await requireAdmin();
    const supabase = await createClient();

    const { count: total } = await supabase
      .from('businesses')
      .select('*', { count: 'exact', head: true });

    const { count: pending } = await supabase
      .from('businesses')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    const { count: approved } = await supabase
      .from('businesses')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'approved');

    const { count: rejected } = await supabase
      .from('businesses')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'rejected');

    const { count: claimed } = await supabase
      .from('businesses')
      .select('*', { count: 'exact', head: true })
      .eq('claim_status', 'claimed');

    return {
      total: total || 0,
      pending: pending || 0,
      approved: approved || 0,
      rejected: rejected || 0,
      claimed: claimed || 0,
      error: null,
    };
  } catch (error) {
    console.error('Error in getBusinessStats:', error);
    return {
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
      claimed: 0,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
