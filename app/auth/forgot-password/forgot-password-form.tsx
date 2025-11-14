'use client';

import * as React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';

export function ForgotPasswordForm() {
  const [email, setEmail] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // TODO: Implement Supabase password reset
      // await supabase.auth.resetPasswordForEmail(email, {
      //   redirectTo: `${window.location.origin}/auth/reset-password`,
      // });
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSuccess(true);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container size="sm">
      <div className="mb-6">
        <Link
          href="/auth/login"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 text-body-sm font-medium"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Sign In
        </Link>
      </div>

      <Card>
        <CardContent className="p-8">
          {success ? (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
              <h1 className="font-serif font-bold text-heading-lg text-foreground mb-2">
                Check Your Email
              </h1>
              <p className="text-body-md text-muted-foreground mb-6">
                We've sent password reset instructions to <strong>{email}</strong>
              </p>
              <div className="space-y-3">
                <p className="text-body-sm text-muted-foreground">
                  Didn't receive an email? Check your spam folder or try again.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSuccess(false);
                    setEmail('');
                  }}
                  className="w-full"
                >
                  Try Another Email
                </Button>
                <Button variant="ghost" asChild className="w-full">
                  <Link href="/auth/login">Return to Sign In</Link>
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-primary-600" />
                </div>
                <h1 className="font-serif font-bold text-heading-lg text-foreground mb-2">
                  Forgot Password?
                </h1>
                <p className="text-body-md text-muted-foreground">
                  No worries! Enter your email and we'll send you reset instructions.
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 rounded-lg bg-error/10 border border-error text-error text-body-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    autoFocus
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  loading={isLoading}
                  disabled={isLoading}
                >
                  Send Reset Instructions
                </Button>

                <div className="text-center">
                  <p className="text-body-sm text-muted-foreground">
                    Remember your password?{' '}
                    <Link
                      href="/auth/login"
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </>
          )}
        </CardContent>
      </Card>

      {/* Additional Help */}
      {!success && (
        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="font-semibold text-heading-xs mb-3">Need Help?</h3>
            <p className="text-body-sm text-muted-foreground mb-4">
              If you're having trouble resetting your password, please contact our support team.
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}
