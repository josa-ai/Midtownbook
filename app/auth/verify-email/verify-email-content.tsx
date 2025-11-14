'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, XCircle, Mail, Loader2 } from 'lucide-react';

export function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = React.useState<'verifying' | 'success' | 'error'>('verifying');
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');

      if (!token) {
        setStatus('error');
        setError('No verification token provided');
        return;
      }

      try {
        // TODO: Implement Supabase email verification
        // await supabase.auth.verifyOtp({
        //   token_hash: token,
        //   type: 'email'
        // });

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setStatus('success');

        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
          router.push('/dashboard');
        }, 3000);
      } catch (err: any) {
        setStatus('error');
        setError(err.message || 'Failed to verify email. The link may be expired or invalid.');
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  return (
    <Container size="sm">
      <Card>
        <CardContent className="p-12 text-center">
          {status === 'verifying' && (
            <>
              <Loader2 className="h-16 w-16 text-primary-600 mx-auto mb-6 animate-spin" />
              <h1 className="font-serif font-bold text-heading-lg text-foreground mb-2">
                Verifying Your Email
              </h1>
              <p className="text-body-md text-muted-foreground">
                Please wait while we verify your email address...
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-success" />
              </div>
              <h1 className="font-serif font-bold text-heading-lg text-foreground mb-2">
                Email Verified!
              </h1>
              <p className="text-body-md text-muted-foreground mb-8">
                Your email has been successfully verified. You will be redirected to your dashboard
                in a moment.
              </p>
              <div className="space-y-3">
                <Button variant="primary" size="lg" className="w-full" asChild>
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
                <Button variant="ghost" size="lg" className="w-full" asChild>
                  <Link href="/">Return to Home</Link>
                </Button>
              </div>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center mx-auto mb-6">
                <XCircle className="h-10 w-10 text-error" />
              </div>
              <h1 className="font-serif font-bold text-heading-lg text-foreground mb-2">
                Verification Failed
              </h1>
              <p className="text-body-md text-muted-foreground mb-2">
                {error || 'We couldn\'t verify your email address.'}
              </p>
              <p className="text-body-sm text-muted-foreground mb-8">
                The verification link may be expired or invalid. Please request a new verification
                email.
              </p>
              <div className="space-y-3">
                <Button variant="primary" size="lg" className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Resend Verification Email
                </Button>
                <Button variant="ghost" size="lg" className="w-full" asChild>
                  <Link href="/contact">Contact Support</Link>
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Help Text */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <h3 className="font-semibold text-heading-xs mb-3">Having Trouble?</h3>
          <ul className="space-y-2 text-body-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary-600 mt-0.5">•</span>
              <span>Check your spam folder if you haven't received the verification email</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 mt-0.5">•</span>
              <span>Verification links expire after 24 hours for security reasons</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 mt-0.5">•</span>
              <span>
                If you continue to have issues, please{' '}
                <Link href="/contact" className="text-primary-600 hover:text-primary-700 font-medium">
                  contact our support team
                </Link>
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </Container>
  );
}
