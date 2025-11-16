/**
 * Reviews API Route
 * Handles review submission with email notifications
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sendReviewNotification } from '@/lib/email/mailgun';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check if user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { businessId, rating, reviewText, visitDate } = body;

    // Validate required fields
    if (!businessId || !rating) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Get business details
    const { data: business, error: businessError } = await supabase
      .from('businesses')
      .select('id, name, slug, email, user_id')
      .eq('id', businessId)
      .single();

    if (businessError || !business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 });
    }

    // Check if user already reviewed this business
    const { data: existingReview } = await supabase
      .from('reviews')
      .select('id')
      .eq('business_id', businessId)
      .eq('user_id', user.id)
      .single();

    if (existingReview) {
      return NextResponse.json(
        { error: 'You have already reviewed this business' },
        { status: 409 }
      );
    }

    // Get user profile for display name
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, avatar_url')
      .eq('id', user.id)
      .single();

    const displayName = profile?.full_name || user.email?.split('@')[0] || 'Anonymous';

    // Create review
    const { data: review, error: reviewError } = await supabase
      .from('reviews')
      .insert({
        business_id: businessId,
        user_id: user.id,
        rating,
        review_text: reviewText,
        visit_date: visitDate,
        status: 'published', // Auto-approve for now, can add moderation later
      })
      .select()
      .single();

    if (reviewError) {
      console.error('Error creating review:', reviewError);
      return NextResponse.json(
        { error: 'Failed to submit review' },
        { status: 500 }
      );
    }

    // Update business average rating
    const { data: stats } = await supabase
      .from('reviews')
      .select('rating')
      .eq('business_id', businessId)
      .eq('status', 'published');

    if (stats && stats.length > 0) {
      const avgRating =
        stats.reduce((sum, r) => sum + r.rating, 0) / stats.length;

      await supabase
        .from('businesses')
        .update({
          rating: Math.round(avgRating * 10) / 10,
          review_count: stats.length,
        })
        .eq('id', businessId);
    }

    // Send notification email to business owner if they have claimed the business
    if (business.email && business.user_id) {
      try {
        await sendReviewNotification({
          businessName: business.name,
          businessEmail: business.email,
          reviewerName: displayName,
          rating,
          reviewText,
          businessSlug: business.slug,
        });
      } catch (emailError) {
        console.error('Error sending review notification:', emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({
      success: true,
      review,
    });
  } catch (error) {
    console.error('Error in review submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
