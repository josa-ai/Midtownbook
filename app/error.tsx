'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Header, Footer } from '@/components/layout';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-white rounded-2xl shadow-card p-8 md:p-12">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-error-light rounded-full mb-6">
                <svg
                  className="w-8 h-8 text-error"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>

              <h1 className="text-display-md text-neutral-900 mb-4">
                Something went wrong
              </h1>

              <p className="text-body-lg text-neutral-700 mb-2 max-w-prose mx-auto">
                We encountered an unexpected error. This has been logged and we'll look into it.
              </p>

              {error.digest && (
                <p className="text-body-sm text-neutral-600 font-mono bg-neutral-100 px-4 py-2 rounded-lg inline-block">
                  Error ID: {error.digest}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={reset}
                size="lg"
                variant="primary"
              >
                Try Again
              </Button>

              <Button
                onClick={() => window.location.href = '/'}
                size="lg"
                variant="outline"
              >
                Go Home
              </Button>
            </div>
          </div>

          <p className="mt-8 text-body-md text-neutral-600">
            Need help?{' '}
            <a
              href="/contact"
              className="text-primary-600 hover:text-primary-700 underline underline-offset-4"
            >
              Contact support
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
