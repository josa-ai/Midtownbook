import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout';
import { Container } from '@/components/ui/container';
import { LoginForm } from './login-form';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your Midtown Book account',
};

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50 flex items-center py-12">
        <Container size="sm">
          <div className="bg-background rounded-xl shadow-lg p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="font-serif font-bold text-heading-xl text-foreground mb-2">
                Welcome Back
              </h1>
              <p className="text-body-md text-muted-foreground">
                Sign in to your account to continue
              </p>
            </div>

            {/* Login Form */}
            <LoginForm />

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-label-sm">
                <span className="px-2 bg-background text-muted-foreground">
                  Don't have an account?
                </span>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <Link
                href="/auth/signup"
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                Create an account
              </Link>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}
