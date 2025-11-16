import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { Container } from '@/components/ui/container';
import { DealCard } from '@/components/business/deal-card';
import { EmptyState } from '@/components/ui/empty-state';
import { Tag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Deals & Offers',
  description: 'Find the best deals and special offers from Mid-Town Lakeland businesses. Show your park ticket or game stub for exclusive discounts near Bonnet Springs Park and Tigers Spring Training.',
};

// Mock deals data - will be replaced with real data from database
const mockDeals = [
  {
    id: '1',
    slug: 'park-visitor-lunch',
    title: 'Show Your Park Ticket - 20% Off Lunch',
    description: 'Visited Bonnet Springs Park today? Show your parking receipt or admission and get 20% off any lunch entrée',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
    discountPercentage: 20,
    originalPrice: 20,
    discountedPrice: 16,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    businessName: 'Memorial Café',
    businessSlug: 'memorial-cafe',
    location: 'Memorial Boulevard',
    isExpired: false,
  },
  {
    id: '2',
    slug: 'tigers-game-day-deal',
    title: 'Tigers Game Day Special',
    description: 'Show your Tigers game ticket stub and get 15% off your entire meal on game days',
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
    discountPercentage: 15,
    originalPrice: 50,
    discountedPrice: 42.50,
    startDate: new Date('2024-02-15'),
    endDate: new Date('2024-04-30'),
    businessName: 'Lakeland Bistro',
    businessSlug: 'lakeland-bistro',
    location: 'N. Florida Avenue',
    isExpired: false,
  },
  {
    id: '3',
    slug: 'post-park-wellness',
    title: 'Post-Park Wellness Special',
    description: 'After your park visit, relax with 25% off any massage or yoga class',
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800',
    discountPercentage: 25,
    originalPrice: 80,
    discountedPrice: 60,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    businessName: 'Mid-Town Wellness',
    businessSlug: 'midtown-wellness',
    location: 'Memorial Boulevard',
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
              Mid-Town Lakeland Deals & Offers
            </h1>
            <p className="text-body-lg text-muted-foreground">
              Save money with exclusive "Show Your Ticket" deals from businesses near Bonnet Springs Park and Detroit Tigers Spring Training
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
