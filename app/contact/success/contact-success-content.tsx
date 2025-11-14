'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Home, Mail, Clock, ArrowRight } from 'lucide-react';

export function ContactSuccessContent() {
  const router = useRouter();
  const [countdown, setCountdown] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

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
            Message Sent Successfully!
          </h1>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Thank you for contacting us. We've received your message and will get back to you
            as soon as possible.
          </p>

          {/* What Happens Next Card */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary-600" />
                </div>
                <h2 className="font-serif font-semibold text-heading-lg">What Happens Next?</h2>
              </div>

              <div className="text-left space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-600 text-white flex items-center justify-center text-label-sm font-semibold">
                    1
                  </div>
                  <p className="text-body-md text-muted-foreground">
                    Our team will review your message and gather any necessary information.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-600 text-white flex items-center justify-center text-label-sm font-semibold">
                    2
                  </div>
                  <p className="text-body-md text-muted-foreground">
                    We'll respond to your email within 1-2 business days (usually sooner!).
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-600 text-white flex items-center justify-center text-label-sm font-semibold">
                    3
                  </div>
                  <p className="text-body-md text-muted-foreground">
                    If your inquiry requires immediate attention, feel free to call us at (555) 123-4567.
                  </p>
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
              We've sent a confirmation email to the address you provided. Please check your inbox
              (and spam folder) for the confirmation.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button variant="primary" size="lg" asChild>
              <Link href="/">
                <Home className="h-5 w-5 mr-2" />
                Back to Home
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/businesses">
                Explore Businesses
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>

          {/* Auto-redirect Notice */}
          <p className="text-body-sm text-muted-foreground">
            Redirecting to homepage in {countdown} seconds...
          </p>
        </div>
      </Container>
    </div>
  );
}
