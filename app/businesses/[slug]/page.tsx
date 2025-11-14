import { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header, Footer } from '@/components/layout';
import { BusinessDetailContent } from './business-detail-content';

// Mock data - replace with actual data fetching
async function getBusiness(slug: string) {
  // Simulate API call
  const mockBusiness = {
    id: '1',
    slug: slug,
    name: 'Sunrise Café',
    description: 'Cozy neighborhood café serving fresh pastries and artisan coffee. We pride ourselves on using locally sourced ingredients and supporting the community.',
    category: 'Restaurant',
    categorySlug: 'restaurants',
    address: '123 Main St, Midtown, CA 94102',
    latitude: 37.7749,
    longitude: -122.4194,
    phone: '(555) 123-4567',
    email: 'hello@sunrisecafe.com',
    website: 'https://sunrisecafe.com',
    coverImageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200',
    logoUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=200',
    images: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800',
    ],
    rating: 4.5,
    reviewCount: 127,
    isOpen: true,
    isFeatured: true,
    isVerified: true,
    hours: {
      monday: '7:00 AM - 6:00 PM',
      tuesday: '7:00 AM - 6:00 PM',
      wednesday: '7:00 AM - 6:00 PM',
      thursday: '7:00 AM - 6:00 PM',
      friday: '7:00 AM - 8:00 PM',
      saturday: '8:00 AM - 8:00 PM',
      sunday: '8:00 AM - 4:00 PM',
    },
    amenities: ['WiFi', 'Outdoor Seating', 'Takeout', 'Dine-in'],
    ownerId: 'user-1',
  };

  if (slug !== mockBusiness.slug) {
    return null;
  }

  return mockBusiness;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const business = await getBusiness(slug);

  if (!business) {
    return {
      title: 'Business Not Found',
    };
  }

  return {
    title: business.name,
    description: business.description,
    openGraph: {
      title: business.name,
      description: business.description,
      images: business.coverImageUrl ? [business.coverImageUrl] : [],
    },
  };
}

export default async function BusinessDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const business = await getBusiness(slug);

  if (!business) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <Suspense fallback={<BusinessDetailSkeleton />}>
          <BusinessDetailContent business={business} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

function BusinessDetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-96 bg-neutral-200" />
      <div className="container mx-auto px-4 py-8">
        <div className="h-12 bg-neutral-200 rounded-lg mb-4 max-w-md" />
        <div className="h-6 bg-neutral-200 rounded-lg mb-8 max-w-lg" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-48 bg-neutral-200 rounded-lg" />
            <div className="h-48 bg-neutral-200 rounded-lg" />
          </div>
          <div className="h-96 bg-neutral-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
