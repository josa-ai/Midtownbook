import { Metadata } from 'next';
import { Header } from '@/components/layout';
import { ReviewsContent } from './reviews-content';

export const metadata: Metadata = {
  title: 'Manage Reviews',
  description: 'View and respond to customer reviews',
};

export default function ReviewsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50">
        <ReviewsContent />
      </main>
    </>
  );
}
