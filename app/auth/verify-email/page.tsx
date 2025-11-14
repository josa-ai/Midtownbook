import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Verify Your Email',
  description: 'Check your email to verify your account',
};

export default function VerifyEmailPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50 flex items-center py-12">
        <Container size="sm">
          <div className="bg-background rounded-xl shadow-lg p-8 text-center">
            {/* Icon */}
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>

            {/* Content */}
            <h1 className="font-serif font-bold text-heading-xl text-foreground mb-4">
              Check Your Email
            </h1>
            <p className="text-body-md text-muted-foreground mb-6">
              We've sent you a verification email. Please check your inbox and click the
              verification link to activate your account.
            </p>

            {/* Instructions */}
            <div className="bg-neutral-50 rounded-lg p-4 mb-6 text-left">
              <p className="text-body-sm text-neutral-700 mb-2">
                <strong>Didn't receive the email?</strong>
              </p>
              <ul className="text-body-sm text-neutral-600 space-y-1 list-disc list-inside">
                <li>Check your spam or junk folder</li>
                <li>Make sure you entered the correct email address</li>
                <li>Wait a few minutes and check again</li>
              </ul>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button variant="primary" size="lg" className="w-full" asChild>
                <Link href="/auth/login">Go to Sign In</Link>
              </Button>
              <Button variant="outline" size="lg" className="w-full" asChild>
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}
