'use client';

import * as React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  CheckCircle,
  Mail,
  Calendar,
  Gift,
  TrendingUp,
  MapPin,
  Bell,
  ArrowRight,
} from 'lucide-react';

export function NewsletterSuccessContent() {
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
            You're All Set!
          </h1>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Welcome to the Midtown Book community! You've successfully subscribed to our
            newsletter and will start receiving updates soon.
          </p>

          {/* What You'll Receive Card */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <h2 className="font-serif font-semibold text-heading-lg mb-6">
                What You'll Receive
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-body-md mb-1">Weekly Highlights</h3>
                    <p className="text-body-sm text-muted-foreground">
                      Top-rated businesses, new openings, and trending spots in your community
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                    <Gift className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-body-md mb-1">Exclusive Deals</h3>
                    <p className="text-body-sm text-muted-foreground">
                      Special offers and discounts from local businesses, just for subscribers
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-body-md mb-1">Upcoming Events</h3>
                    <p className="text-body-sm text-muted-foreground">
                      Early access to community events, workshops, and local happenings
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-body-md mb-1">Neighborhood News</h3>
                    <p className="text-body-sm text-muted-foreground">
                      Stay informed about changes and developments in your local area
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Email Confirmation */}
          <div className="mb-8 p-6 rounded-lg bg-primary-50 border border-primary-200">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Mail className="h-5 w-5 text-primary-600" />
              <h3 className="font-semibold text-body-md">Confirmation Email Sent</h3>
            </div>
            <p className="text-body-sm text-muted-foreground">
              We've sent a welcome email to your inbox. Please confirm your subscription by
              clicking the link in the email. Don't forget to check your spam folder!
            </p>
          </div>

          {/* Preferences Card */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Bell className="h-5 w-5 text-primary-600" />
                <h3 className="font-semibold text-body-md">Manage Your Preferences</h3>
              </div>
              <p className="text-body-sm text-muted-foreground mb-4">
                Want to customize how often you hear from us or what topics you're interested in?
                You can update your preferences anytime.
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link href="/auth/signup">
                  Create Account to Manage Preferences
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button variant="primary" size="lg" asChild>
              <Link href="/businesses">
                Explore Businesses
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/events">Browse Events</Link>
            </Button>
          </div>

          {/* Social Proof */}
          <div className="text-center">
            <p className="text-body-sm text-muted-foreground">
              Join <span className="font-semibold text-foreground">12,500+</span> community
              members who stay connected with local businesses
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
