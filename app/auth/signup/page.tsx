import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout';
import { Container } from '@/components/ui/container';
import { SignupForm } from './signup-form';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create your Midtown Book account',
};

export default function SignupPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50 flex items-center py-12">
        <Container size="sm">
          <div className="bg-background rounded-xl shadow-lg p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="font-serif font-bold text-heading-xl text-foreground mb-2">
                Create Account
              </h1>
              <p className="text-body-md text-muted-foreground">
                Join Midtown Book to discover local businesses
              </p>
            </div>

            {/* Signup Form */}
            <SignupForm />

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-label-sm">
                <span className="px-2 bg-background text-muted-foreground">
                  Already have an account?
                </span>
              </div>
            </div>

            {/* Sign In Link */}
            <div className="text-center">
              <Link
                href="/auth/login"
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                Sign in instead
              </Link>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}
