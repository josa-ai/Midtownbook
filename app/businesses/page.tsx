import { Suspense } from 'react';
import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { Container } from '@/components/ui/container';
import { BusinessesContent } from './businesses-content';

export const metadata: Metadata = {
  title: 'Browse Businesses',
  description: 'Discover local businesses in Midtown. Search, filter, and find the perfect business for your needs.',
};

export default function BusinessesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50 py-8">
        <Container size="xl">
          <Suspense fallback={<BusinessesLoadingSkeleton />}>
            <BusinessesContent />
          </Suspense>
        </Container>
      </main>
      <Footer />
    </>
  );
}

function BusinessesLoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-12 bg-neutral-200 rounded-lg mb-8 max-w-md" />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="h-96 bg-neutral-200 rounded-lg" />
        </div>
        <div className="lg:col-span-3 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-48 bg-neutral-200 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
