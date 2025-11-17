/**
 * Admin Claims Management Actions
 * Server actions for managing business ownership claims
 */

'use server';

import { createClient } from '@/lib/supabase/server';
import { requireAdmin, logAdminAction } from '@/lib/auth/admin';
import { sendEmail } from '@/lib/email/mailgun';
import { revalidatePath } from 'next/cache';

export interface BusinessClaim {
  id: string;
  business_id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone: string;
  position: string;
  relationship_to_business: string | null;
  additional_info: string | null;
  verification_documents: string[];
  status: 'pending' | 'approved' | 'rejected';
  admin_notes: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
  business: {
    id: string;
    name: string;
    slug: string;
    address: string;
    email: string | null;
  } | null;
  user: {
    id: string;
    email: string;
    full_name: string | null;
  } | null;
  reviewer: {
    id: string;
    full_name: string | null;
    email: string;
  } | null;
}

/**
 * Get business claims with filters
 */
export async function getBusinessClaims(filters: {
  status?: 'pending' | 'approved' | 'rejected';
  limit?: number;
  offset?: number;
} = {}): Promise<{ data: BusinessClaim[]; count: number; error: string | null }> {
  try {
    await requireAdmin();
    const supabase = await createClient();

    let query = supabase
      .from('business_claims')
      .select(
        `
        *,
        business:businesses(id, name, slug, address, email),
        user:profiles!business_claims_user_id_fkey(id, email, full_name),
        reviewer:profiles!business_claims_reviewed_by_fkey(id, full_name, email)
      `,
        { count: 'exact' }
      );

    if (filters.status) {
      query = query.eq('status', filters.status);
    }

    const limit = filters.limit || 20;
    const offset = filters.offset || 0;
    query = query.range(offset, offset + limit - 1);

    query = query.order('created_at', { ascending: false });

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching claims:', error);
      return { data: [], count: 0, error: error.message };
    }

    return { data: data || [], count: count || 0, error: null };
  } catch (error) {
    console.error('Error in getBusinessClaims:', error);
    return {
      data: [],
      count: 0,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Approve a business claim
 */
export async function approveClaim(
  claimId: string,
  notes?: string
): Promise<{ success: boolean; error: string | null }> {
  try {
    const admin = await requireAdmin();
    const supabase = await createClient();

    // Get claim details
    const { data: claim } = await supabase
      .from('business_claims')
      .select(
        `
        *,
        business:businesses(id, name, slug, email),
        user:profiles!business_claims_user_id_fkey(id, email, full_name)
      `
      )
      .eq('id', claimId)
      .single();

    if (!claim) {
      return { success: false, error: 'Claim not found' };
    }

    // Update claim status
    const { error: claimError } = await supabase
      .from('business_claims')
      .update({
        status: 'approved',
        admin_notes: notes,
        reviewed_by: admin.id,
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', claimId);

    if (claimError) {
      console.error('Error approving claim:', claimError);
      return { success: false, error: claimError.message };
    }

    // Update business ownership
    const { error: businessError } = await supabase
      .from('businesses')
      .update({
        owner_id: claim.user_id,
        claim_status: 'claimed',
        is_verified: true,
      })
      .eq('id', claim.business_id);

    if (businessError) {
      console.error('Error updating business ownership:', businessError);
      return { success: false, error: businessError.message };
    }

    // Update user role to business_owner
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ role: 'business_owner' })
      .eq('id', claim.user_id);

    if (profileError) {
      console.error('Error updating user role:', profileError);
    }

    // Send approval email
    try {
      await sendEmail({
        to: claim.email,
        subject: `✅ Business Claim Approved - ${claim.business?.name}`,
        html: `
          <h2>Claim Approved!</h2>
          <p>Hi ${claim.full_name},</p>
          <p>Your claim for <strong>${claim.business?.name}</strong> has been approved!</p>
          <p>You now have full access to manage your business listing.</p>
          <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/dashboard">Go to Dashboard</a></p>
          ${notes ? `<p><strong>Admin Note:</strong> ${notes}</p>` : ''}
        `,
        text: `Claim Approved! Your claim for ${claim.business?.name} has been approved. You now have full access to manage your business listing. ${notes ? `Admin Note: ${notes}` : ''}`,
      });
    } catch (emailError) {
      console.error('Error sending approval email:', emailError);
    }

    // Log the action
    await logAdminAction({
      adminId: admin.id,
      action: 'approve_claim',
      entityType: 'business_claim',
      entityId: claimId,
      details: { businessId: claim.business_id, userId: claim.user_id, notes },
    });

    revalidatePath('/admin/businesses');
    return { success: true, error: null };
  } catch (error) {
    console.error('Error in approveClaim:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Reject a business claim
 */
export async function rejectClaim(
  claimId: string,
  reason: string
): Promise<{ success: boolean; error: string | null }> {
  try {
    const admin = await requireAdmin();
    const supabase = await createClient();

    // Get claim details
    const { data: claim } = await supabase
      .from('business_claims')
      .select(
        `
        *,
        business:businesses(id, name, slug)
      `
      )
      .eq('id', claimId)
      .single();

    if (!claim) {
      return { success: false, error: 'Claim not found' };
    }

    // Update claim status
    const { error: claimError } = await supabase
      .from('business_claims')
      .update({
        status: 'rejected',
        admin_notes: reason,
        reviewed_by: admin.id,
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', claimId);

    if (claimError) {
      console.error('Error rejecting claim:', claimError);
      return { success: false, error: claimError.message };
    }

    // Send rejection email
    try {
      await sendEmail({
        to: claim.email,
        subject: `Business Claim Update - ${claim.business?.name}`,
        html: `
          <h2>Claim Update</h2>
          <p>Hi ${claim.full_name},</p>
          <p>We've reviewed your claim for <strong>${claim.business?.name}</strong>.</p>
          <p><strong>Reason:</strong> ${reason}</p>
          <p>If you believe this is an error, please contact our support team.</p>
        `,
        text: `Claim Update: We've reviewed your claim for ${claim.business?.name}. Reason: ${reason}. If you believe this is an error, please contact our support team.`,
      });
    } catch (emailError) {
      console.error('Error sending rejection email:', emailError);
    }

    // Log the action
    await logAdminAction({
      adminId: admin.id,
      action: 'reject_claim',
      entityType: 'business_claim',
      entityId: claimId,
      details: { businessId: claim.business_id, userId: claim.user_id, reason },
    });

    revalidatePath('/admin/businesses');
    return { success: true, error: null };
  } catch (error) {
    console.error('Error in rejectClaim:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get claim statistics
 */
export async function getClaimStats(): Promise<{
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  error: string | null;
}> {
  try {
    await requireAdmin();
    const supabase = await createClient();

    const { count: total } = await supabase
      .from('business_claims')
      .select('*', { count: 'exact', head: true });

    const { count: pending } = await supabase
      .from('business_claims')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    const { count: approved } = await supabase
      .from('business_claims')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'approved');

    const { count: rejected } = await supabase
      .from('business_claims')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'rejected');

    return {
      total: total || 0,
      pending: pending || 0,
      approved: approved || 0,
      rejected: rejected || 0,
      error: null,
    };
  } catch (error) {
    console.error('Error in getClaimStats:', error);
    return {
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
