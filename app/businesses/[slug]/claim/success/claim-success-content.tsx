'use client';

import * as React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Building2, Clock, Mail, Phone, ArrowRight, HelpCircle } from 'lucide-react';

interface Business {
  id: string;
  slug: string;
  name: string;
  address: string;
  category: string;
}

interface ClaimSuccessContentProps {
  business: Business;
}

export function ClaimSuccessContent({ business }: ClaimSuccessContentProps) {
  return (
    <div className="py-12">
      <Container size="md">
        {/* Success Icon and Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 mb-6">
            <CheckCircle className="h-10 w-10 text-success" />
          </div>
          <h1 className="font-serif font-bold text-display-md text-foreground mb-4">
            Claim Submitted Successfully!
          </h1>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Thank you for submitting your claim for <span className="font-semibold">{business.name}</span>.
            Our team will review your submission and get back to you shortly.
          </p>
        </div>

        {/* What Happens Next */}
        <Card className="mb-6">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary-600" />
              </div>
              <h2 className="font-serif font-semibold text-heading-lg">What Happens Next?</h2>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-semibold text-body-sm">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-body-md mb-1">Verification Review</h3>
                  <p className="text-body-sm text-muted-foreground">
                    Our team will review your submitted documents and information within 2-3 business days.
                    We verify all claims to ensure the security and authenticity of business listings.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-semibold text-body-sm">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-body-md mb-1">Email Notification</h3>
                  <p className="text-body-sm text-muted-foreground">
                    You'll receive an email with the verification status. If we need any additional
                    information, we'll reach out to you directly.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-semibold text-body-sm">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-body-md mb-1">Access Granted</h3>
                  <p className="text-body-sm text-muted-foreground">
                    Once approved, you'll receive login credentials and instructions to access your
                    business dashboard where you can manage your listing, respond to reviews, and more.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-semibold text-body-sm">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-body-md mb-1">Start Managing</h3>
                  <p className="text-body-sm text-muted-foreground">
                    Begin updating your business information, adding photos, responding to customer
                    reviews, creating special offers, and tracking your business insights.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Benefits Reminder */}
        <Card className="mb-6">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-primary-600" />
              </div>
              <h2 className="font-serif font-semibold text-heading-lg">Your Benefits as a Verified Owner</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-body-sm mb-1">Complete Control</p>
                  <p className="text-label-sm text-muted-foreground">
                    Update hours, contact info, photos, and descriptions anytime
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-body-sm mb-1">Customer Engagement</p>
                  <p className="text-label-sm text-muted-foreground">
                    Respond to reviews and build trust with your community
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-body-sm mb-1">Promotional Tools</p>
                  <p className="text-label-sm text-muted-foreground">
                    Create events, special offers, and highlight your services
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-body-sm mb-1">Analytics Dashboard</p>
                  <p className="text-label-sm text-muted-foreground">
                    Track views, clicks, and customer interactions
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-body-sm mb-1">Verified Badge</p>
                  <p className="text-label-sm text-muted-foreground">
                    Display a verified owner badge to build credibility
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-body-sm mb-1">Priority Support</p>
                  <p className="text-label-sm text-muted-foreground">
                    Get dedicated support for verified business owners
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
                <HelpCircle className="h-6 w-6 text-primary-600" />
              </div>
              <h2 className="font-serif font-semibold text-heading-lg">Need Help?</h2>
            </div>

            <p className="text-body-md text-muted-foreground mb-6">
              If you have any questions about your claim or need assistance, our support team
              is here to help. We typically respond within 24 hours.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-neutral-50 border">
                <Mail className="h-5 w-5 text-primary-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-body-sm mb-1">Email Support</p>
                  <a
                    href="mailto:support@midtownbook.com"
                    className="text-body-sm text-primary-600 hover:text-primary-700"
                  >
                    support@midtownbook.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-neutral-50 border">
                <Phone className="h-5 w-5 text-primary-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-body-sm mb-1">Phone Support</p>
                  <a
                    href="tel:+15551234567"
                    className="text-body-sm text-primary-600 hover:text-primary-700"
                  >
                    (555) 123-4567
                  </a>
                  <p className="text-label-xs text-muted-foreground mt-1">
                    Mon-Fri, 9am-5pm PST
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="primary"
            size="lg"
            asChild
          >
            <Link href={`/businesses/${business.slug}`}>
              <Building2 className="h-5 w-5 mr-2" />
              View Business Page
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
          >
            <Link href="/businesses">
              Browse Businesses
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 p-6 rounded-lg bg-primary-50 border border-primary-200 text-center">
          <p className="text-body-sm text-muted-foreground">
            We've sent a confirmation email with your claim details and reference number.
            Please check your inbox (and spam folder) for next steps.
          </p>
        </div>
      </Container>
    </div>
  );
}
