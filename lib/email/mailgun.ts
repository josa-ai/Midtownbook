/**
 * Mailgun Email Service
 * Handles transactional email sending via Mailgun API
 */

import formData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(formData);

// Initialize Mailgun client
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || '',
});

const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN || '';
const FROM_EMAIL = process.env.MAILGUN_FROM_EMAIL || 'noreply@midtownbook.com';

export interface EmailOptions {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  from?: string;
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: Array<{
    filename: string;
    data: Buffer | string;
  }>;
}

/**
 * Send an email via Mailgun
 */
export async function sendEmail(options: EmailOptions) {
  if (!process.env.MAILGUN_API_KEY) {
    console.warn('Mailgun API key not configured. Email not sent:', options.subject);
    return null;
  }

  if (!MAILGUN_DOMAIN) {
    console.warn('Mailgun domain not configured. Email not sent:', options.subject);
    return null;
  }

  try {
    const message: any = {
      from: options.from || FROM_EMAIL,
      to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
      ...(options.cc && { cc: Array.isArray(options.cc) ? options.cc.join(', ') : options.cc }),
      ...(options.bcc && { bcc: Array.isArray(options.bcc) ? options.bcc.join(', ') : options.bcc }),
      ...(options.attachments && { attachment: options.attachments }),
    };

    const response = await mg.messages.create(MAILGUN_DOMAIN, message);
    console.log('Email sent successfully:', response.id);
    return response;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}

/**
 * Send business claim notification to admin
 */
export async function sendClaimNotification(data: {
  businessName: string;
  businessSlug: string;
  claimerName: string;
  claimerEmail: string;
  claimerPhone: string;
  claimerPosition: string;
  additionalInfo?: string;
}) {
  const subject = `🏢 New Business Claim: ${data.businessName}`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #0066CC 0%, #00C9A7 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .info-row { margin: 15px 0; padding: 10px; background: white; border-left: 4px solid #0066CC; }
          .label { font-weight: bold; color: #555; }
          .value { color: #333; margin-left: 10px; }
          .button { display: inline-block; padding: 12px 24px; background: #0066CC; color: white; text-decoration: none; border-radius: 6px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">New Business Claim Request</h1>
          </div>
          <div class="content">
            <p>A new claim request has been submitted for <strong>${data.businessName}</strong>.</p>

            <div class="info-row">
              <span class="label">Claimer Name:</span>
              <span class="value">${data.claimerName}</span>
            </div>

            <div class="info-row">
              <span class="label">Email:</span>
              <span class="value"><a href="mailto:${data.claimerEmail}">${data.claimerEmail}</a></span>
            </div>

            <div class="info-row">
              <span class="label">Phone:</span>
              <span class="value">${data.claimerPhone}</span>
            </div>

            <div class="info-row">
              <span class="label">Position:</span>
              <span class="value">${data.claimerPosition}</span>
            </div>

            ${data.additionalInfo ? `
            <div class="info-row">
              <span class="label">Additional Information:</span>
              <div class="value" style="margin-top: 10px;">${data.additionalInfo}</div>
            </div>
            ` : ''}

            <div style="text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/claims" class="button">
                Review Claim Request
              </a>
            </div>

            <p style="margin-top: 30px; font-size: 12px; color: #666;">
              This is an automated notification from Midtown Book.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
New Business Claim Request

Business: ${data.businessName}
Claimer: ${data.claimerName}
Email: ${data.claimerEmail}
Phone: ${data.claimerPhone}
Position: ${data.claimerPosition}

${data.additionalInfo ? `Additional Information:\n${data.additionalInfo}\n\n` : ''}
Review the claim at: ${process.env.NEXT_PUBLIC_SITE_URL}/admin/claims
  `.trim();

  // Send to admin email (could be configured in env)
  return sendEmail({
    to: process.env.ADMIN_EMAIL || 'admin@midtownbook.com',
    subject,
    html,
    text,
  });
}

/**
 * Send claim confirmation to claimer
 */
export async function sendClaimConfirmation(data: {
  claimerName: string;
  claimerEmail: string;
  businessName: string;
}) {
  const subject = `✅ Claim Request Received for ${data.businessName}`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #0066CC 0%, #00C9A7 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .highlight { background: #e8f4fd; padding: 15px; border-radius: 6px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">✅ Claim Request Received</h1>
          </div>
          <div class="content">
            <p>Hi ${data.claimerName},</p>

            <p>Thank you for claiming <strong>${data.businessName}</strong> on Midtown Book!</p>

            <div class="highlight">
              <p style="margin: 0;"><strong>What happens next?</strong></p>
              <ul style="margin: 10px 0 0 20px;">
                <li>Our team will review your claim request within 2-3 business days</li>
                <li>We may reach out to verify your relationship to the business</li>
                <li>Once approved, you'll receive access to your business dashboard</li>
              </ul>
            </div>

            <p>If you have any questions, please don't hesitate to reach out to our support team.</p>

            <p>Best regards,<br>The Midtown Book Team</p>

            <p style="margin-top: 30px; font-size: 12px; color: #666;">
              This is an automated confirmation from Midtown Book.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
Hi ${data.claimerName},

Thank you for claiming ${data.businessName} on Midtown Book!

What happens next?
- Our team will review your claim request within 2-3 business days
- We may reach out to verify your relationship to the business
- Once approved, you'll receive access to your business dashboard

If you have any questions, please don't hesitate to reach out to our support team.

Best regards,
The Midtown Book Team
  `.trim();

  return sendEmail({
    to: data.claimerEmail,
    subject,
    html,
    text,
  });
}

/**
 * Send review notification to business owner
 */
export async function sendReviewNotification(data: {
  businessName: string;
  businessEmail: string;
  reviewerName: string;
  rating: number;
  reviewText?: string;
  businessSlug: string;
}) {
  const subject = `⭐ New Review for ${data.businessName}`;

  const stars = '⭐'.repeat(data.rating) + '☆'.repeat(5 - data.rating);

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #0066CC 0%, #00C9A7 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .review { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #00C9A7; }
          .rating { font-size: 24px; color: #FFB800; margin: 10px 0; }
          .button { display: inline-block; padding: 12px 24px; background: #0066CC; color: white; text-decoration: none; border-radius: 6px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">You received a new review!</h1>
          </div>
          <div class="content">
            <p><strong>${data.businessName}</strong> just received a review from ${data.reviewerName}.</p>

            <div class="review">
              <div class="rating">${stars}</div>
              ${data.reviewText ? `<p style="margin: 15px 0 0 0; color: #555;">"${data.reviewText}"</p>` : ''}
            </div>

            <p>Reviews help build trust with potential customers. Consider responding to show you value customer feedback!</p>

            <div style="text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/businesses/${data.businessSlug}#reviews" class="button">
                View & Respond to Review
              </a>
            </div>

            <p style="margin-top: 30px; font-size: 12px; color: #666;">
              This is an automated notification from Midtown Book.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
You received a new review!

${data.businessName} just received a review from ${data.reviewerName}.

Rating: ${stars}
${data.reviewText ? `\n"${data.reviewText}"\n` : ''}

Reviews help build trust with potential customers. Consider responding to show you value customer feedback!

View the review at: ${process.env.NEXT_PUBLIC_SITE_URL}/businesses/${data.businessSlug}#reviews
  `.trim();

  return sendEmail({
    to: data.businessEmail,
    subject,
    html,
    text,
  });
}
