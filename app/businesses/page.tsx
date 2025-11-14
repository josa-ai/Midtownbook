import { Suspense } from 'react';
import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { Container } from '@/components/ui/container';
import { BusinessesContent } from './businesses-content';
import { getBusinesses } from '@/lib/data/businesses';
import { getCategories } from '@/lib/data/categories';

export const metadata: Metadata = {
  title: 'Browse Businesses',
  description: 'Discover local businesses in Midtown. Search, filter, and find the perfect business for your needs.',
};

export default async function BusinessesPage() {
  // Fetch initial data server-side
  const [businessesData, categories] = await Promise.all([
    getBusinesses({ limit: 12, offset: 0, sortBy: 'created_at', sortOrder: 'desc' }),
    getCategories(),
  ]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50 py-8">
        <Container size="xl">
          <Suspense fallback={<BusinessesLoadingSkeleton />}>
            <BusinessesContent
              initialBusinesses={businessesData.businesses}
              initialCategories={categories}
              initialTotal={businessesData.total}
            />
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
