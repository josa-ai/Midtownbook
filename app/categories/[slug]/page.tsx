import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import { Container } from '@/components/ui/container';
import { BusinessCard } from '@/components/business/business-card';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

async function getCategory(slug: string) {
  // Mock category data
  const categories: Record<string, any> = {
    restaurants: {
      id: '1',
      name: 'Restaurants',
      slug: 'restaurants',
      description: 'Discover the best dining experiences in Midtown, from cozy cafes to fine dining establishments.',
      businessCount: 45,
    },
  };

  return categories[slug] || null;
}

async function getCategoryBusinesses(slug: string) {
  // Mock businesses for category
  return [
    {
      id: '1',
      slug: 'sunrise-cafe',
      name: 'Sunrise Café',
      description: 'Cozy neighborhood café serving fresh pastries and artisan coffee',
      category: 'Restaurant',
      address: '123 Main St, Midtown',
      coverImageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
      rating: 4.5,
      reviewCount: 127,
      isOpen: true,
      isFeatured: true,
      isVerified: true,
    },
    {
      id: '2',
      slug: 'midtown-bistro',
      name: 'Midtown Bistro',
      description: 'Contemporary bistro with seasonal menu and craft cocktails',
      category: 'Restaurant',
      address: '456 Oak Ave, Midtown',
      coverImageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
      rating: 4.7,
      reviewCount: 203,
      isOpen: true,
      isVerified: true,
    },
  ];
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const category = await getCategory(params.slug);

  if (!category) {
    return { title: 'Category Not Found' };
  }

  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryDetailPage({ params }: { params: { slug: string } }) {
  const category = await getCategory(params.slug);

  if (!category) {
    notFound();
  }

  const businesses = await getCategoryBusinesses(params.slug);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50 py-8">
        <Container size="xl">
          {/* Breadcrumbs */}
          <div className="mb-6">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Categories', href: '/categories' },
                { label: category.name },
              ]}
            />
          </div>

          {/* Category Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Link href="/categories">
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  All Categories
                </Button>
              </Link>
            </div>

            <h1 className="font-serif font-bold text-display-md text-foreground mb-2">
              {category.name}
            </h1>
            <p className="text-body-lg text-muted-foreground mb-4">
              {category.description}
            </p>
            <p className="text-body-md text-muted-foreground">
              {category.businessCount} businesses found
            </p>
          </div>

          {/* Business Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businesses.map((business) => (
              <BusinessCard
                key={business.id}
                business={business}
                variant="grid"
                showActions
              />
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
