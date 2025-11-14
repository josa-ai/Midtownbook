import { Metadata } from 'next';
import { Suspense } from 'react';
import { Header, Footer } from '@/components/layout';
import { ReviewSuccessContent } from './review-success-content';

export const metadata: Metadata = {
  title: 'Review Submitted Successfully',
  description: 'Your review has been published successfully. Thank you for your feedback!',
};

export default function ReviewSuccessPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50">
        <Suspense fallback={<div>Loading...</div>}>
          <ReviewSuccessContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
