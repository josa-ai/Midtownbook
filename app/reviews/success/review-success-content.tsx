'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  CheckCircle,
  Star,
  ThumbsUp,
  Share2,
  Bell,
  TrendingUp,
  Award,
  ArrowRight,
} from 'lucide-react';

export function ReviewSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const businessSlug = searchParams.get('business') || 'sunrise-cafe';
  const businessName = searchParams.get('name') || 'Sunrise Café';

  return (
    <div className="py-16">
      <Container size="md">
        <div className="text-center">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 mb-6">
            <CheckCircle className="h-10 w-10 text-success" />
          </div>

          {/* Success Message */}
          <h1 className="font-serif font-bold text-display-md text-foreground mb-4">
            Review Published!
          </h1>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Thank you for sharing your experience at <span className="font-semibold">{businessName}</span>.
            Your feedback helps others make informed decisions and supports our local community.
          </p>

          {/* Impact Card */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <h2 className="font-serif font-semibold text-heading-lg mb-6">
                Your Review Makes a Difference
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                    <ThumbsUp className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-body-md mb-1">Helps the Community</h3>
                    <p className="text-body-sm text-muted-foreground">
                      Your honest feedback helps neighbors discover great local businesses
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-body-md mb-1">Supports Local Business</h3>
                    <p className="text-body-sm text-muted-foreground">
                      Constructive reviews help businesses improve and grow
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                    <Star className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-body-md mb-1">Builds Your Reputation</h3>
                    <p className="text-body-sm text-muted-foreground">
                      Quality reviews establish you as a trusted community voice
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                    <Award className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-body-md mb-1">Earn Rewards</h3>
                    <p className="text-body-sm text-muted-foreground">
                      Active reviewers earn badges and access to exclusive perks
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Share Your Review */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Share2 className="h-5 w-5 text-primary-600" />
                <h3 className="font-semibold text-body-md">Share Your Review</h3>
              </div>
              <p className="text-body-sm text-muted-foreground mb-4">
                Let your friends know about your experience! Share your review on social media.
              </p>
              <div className="flex gap-3 justify-center">
                <Button variant="outline" size="sm">
                  Share on Twitter
                </Button>
                <Button variant="outline" size="sm">
                  Share on Facebook
                </Button>
                <Button variant="outline" size="sm">
                  Copy Link
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notifications Card */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Bell className="h-5 w-5 text-primary-600" />
                <h3 className="font-semibold text-body-md">Get Notified</h3>
              </div>
              <p className="text-body-sm text-muted-foreground mb-4">
                Turn on notifications to know when the business responds to your review or when
                others find it helpful.
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/settings">
                  Manage Notification Settings
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button variant="primary" size="lg" asChild>
              <Link href={`/businesses/${businessSlug}`}>
                View Business Page
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/dashboard/reviews">View My Reviews</Link>
            </Button>
          </div>

          {/* Review Another Business CTA */}
          <div className="p-6 rounded-lg bg-primary-50 border border-primary-200">
            <h3 className="font-semibold text-body-md mb-2">
              Have you visited other local businesses?
            </h3>
            <p className="text-body-sm text-muted-foreground mb-4">
              Share more reviews to help the community and earn reviewer badges.
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link href="/businesses">
                Find More Businesses to Review
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
