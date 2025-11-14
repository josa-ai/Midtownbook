import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { Container } from '@/components/ui/container';
import { DealCard } from '@/components/business/deal-card';
import { EmptyState } from '@/components/ui/empty-state';
import { Tag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Deals & Offers',
  description: 'Find the best deals and special offers from local businesses in Midtown',
};

// Mock deals data
const mockDeals = [
  {
    id: '1',
    slug: 'lunch-special',
    title: '50% Off Lunch Special',
    description: 'Get half off any lunch entrée when you dine in',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
    discountPercentage: 50,
    originalPrice: 20,
    discountedPrice: 10,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-07-31'),
    businessName: 'Sunrise Café',
    businessSlug: 'sunrise-cafe',
    location: 'Midtown',
    isExpired: false,
  },
  {
    id: '2',
    slug: 'haircut-deal',
    title: 'First Visit Haircut Discount',
    description: 'New customers get 30% off their first haircut',
    imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800',
    discountPercentage: 30,
    originalPrice: 50,
    discountedPrice: 35,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    businessName: 'Style Studio',
    businessSlug: 'style-studio',
    location: 'Midtown',
    isExpired: false,
  },
];

export default function DealsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50 py-8">
        <Container size="xl">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-serif font-bold text-display-md text-foreground mb-2">
              Deals & Offers
            </h1>
            <p className="text-body-lg text-muted-foreground">
              Save money with {mockDeals.length} exclusive deals from local businesses
            </p>
          </div>

          {/* Deals Grid */}
          {mockDeals.length === 0 ? (
            <EmptyState
              icon={Tag}
              title="No deals available"
              description="Check back soon for new deals and offers"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockDeals.map((deal) => (
                <DealCard key={deal.id} deal={deal} />
              ))}
            </div>
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
}
