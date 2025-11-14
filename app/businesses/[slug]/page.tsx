import { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header, Footer } from '@/components/layout';
import { BusinessDetailContent } from './business-detail-content';
import {
  getBusinessBySlug,
  incrementViewCount,
  getBusinessReviews,
  getRelatedBusinesses,
} from '@/lib/data/businesses';
import { Skeleton } from '@/components/ui/skeleton';
import { Container } from '@/components/ui/container';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const business = await getBusinessBySlug(slug);

  if (!business) {
    return {
      title: 'Business Not Found',
    };
  }

  return {
    title: `${business.name} | Midtownbook`,
    description: business.description || `Visit ${business.name} in ${business.city}. ${business.category.name}`,
    openGraph: {
      title: business.name,
      description: business.description || undefined,
      images: business.cover_image_url ? [
        {
          url: business.cover_image_url,
          width: 1200,
          height: 630,
          alt: business.name,
        }
      ] : [],
      type: 'website',
      siteName: 'Midtownbook',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: business.name,
      description: business.description || undefined,
      images: business.cover_image_url ? [business.cover_image_url] : [],
    },
    alternates: {
      canonical: `/businesses/${business.slug}`,
    },
  };
}

export default async function BusinessDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const business = await getBusinessBySlug(slug);

  if (!business) {
    notFound();
  }

  // Fetch reviews and related businesses on the server
  const [reviewsData, relatedBusinesses] = await Promise.all([
    getBusinessReviews(business.id, 10, 0),
    getRelatedBusinesses(business.category_id, business.id, 3),
  ]);

  // Increment view count (fire and forget)
  incrementViewCount(business.id).catch(console.error);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <Suspense fallback={<BusinessDetailSkeleton />}>
          <BusinessDetailContent
            business={business}
            reviews={reviewsData.reviews}
            relatedBusinesses={relatedBusinesses}
          />
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
      <Container className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-64" />
            <Skeleton className="h-48" />
          </div>
        </div>
      </Container>
    </div>
  );
}
