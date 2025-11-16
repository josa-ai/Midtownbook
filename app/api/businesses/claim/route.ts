/**
 * Business Claim API Route
 * Handles business claim submissions with document upload and email notifications
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sendClaimNotification, sendClaimConfirmation } from '@/lib/email/mailgun';

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

    const formData = await request.formData();

    // Extract form fields
    const businessId = formData.get('businessId') as string;
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const position = formData.get('position') as string;
    const relationship = formData.get('relationship') as string;
    const additionalInfo = formData.get('additionalInfo') as string;
    const documents = formData.getAll('documents') as File[];

    // Validate required fields
    if (!businessId || !fullName || !email || !phone || !position) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get business details
    const { data: business, error: businessError } = await supabase
      .from('businesses')
      .select('id, name, slug, email')
      .eq('id', businessId)
      .single();

    if (businessError || !business) {
      return NextResponse.json(
        { error: 'Business not found' },
        { status: 404 }
      );
    }

    // Upload verification documents to Supabase Storage
    const documentUrls: string[] = [];

    for (const document of documents) {
      if (document && document.size > 0) {
        const fileName = `${user.id}/${Date.now()}-${document.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('claim-documents')
          .upload(fileName, document, {
            contentType: document.type,
            upsert: false,
          });

        if (uploadError) {
          console.error('Error uploading document:', uploadError);
          continue;
        }

        // Get public URL
        const {
          data: { publicUrl },
        } = supabase.storage.from('claim-documents').getPublicUrl(uploadData.path);

        documentUrls.push(publicUrl);
      }
    }

    // Create claim request record
    const { data: claim, error: claimError } = await supabase
      .from('business_claims')
      .insert({
        business_id: businessId,
        user_id: user.id,
        full_name: fullName,
        email,
        phone,
        position,
        relationship_to_business: relationship,
        additional_info: additionalInfo,
        verification_documents: documentUrls,
        status: 'pending',
      })
      .select()
      .single();

    if (claimError) {
      console.error('Error creating claim:', claimError);
      return NextResponse.json(
        { error: 'Failed to submit claim' },
        { status: 500 }
      );
    }

    // Send notification emails
    try {
      // Notify admin
      await sendClaimNotification({
        businessName: business.name,
        businessSlug: business.slug,
        claimerName: fullName,
        claimerEmail: email,
        claimerPhone: phone,
        claimerPosition: position,
        additionalInfo,
      });

      // Confirm to claimer
      await sendClaimConfirmation({
        claimerName: fullName,
        claimerEmail: email,
        businessName: business.name,
      });
    } catch (emailError) {
      console.error('Error sending emails:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      claim,
    });
  } catch (error) {
    console.error('Error in claim submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
