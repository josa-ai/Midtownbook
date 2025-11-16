import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { Container } from '@/components/ui/container';
import { EventCard } from '@/components/business/event-card';
import { EmptyState } from '@/components/ui/empty-state';
import { Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Events',
  description: 'Discover upcoming events and activities in Mid-Town Lakeland near Bonnet Springs Park and Detroit Tigers Spring Training at Joker Marchant Stadium.',
};

// Mock events data - will be replaced with real data from database
const mockEvents = [
  {
    id: '1',
    slug: 'bonnet-springs-concert',
    title: 'Summer Concert Series at Bonnet Springs Park',
    description: 'Join us for live music at USA Today\'s #1 City Park featuring local and regional artists every Friday evening',
    imageUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800',
    startDate: new Date('2025-06-06T18:00:00'),
    endDate: new Date('2025-06-06T21:00:00'),
    location: 'Bonnet Springs Park',
    isOnline: false,
    price: 0,
    maxAttendees: 1000,
    attendeeCount: 687,
    businessName: 'Bonnet Springs Park',
    businessSlug: 'bonnet-springs-park',
  },
  {
    id: '2',
    slug: 'tigers-opening-day',
    title: 'Detroit Tigers Spring Training Opening Day',
    description: 'Celebrate the start of Spring Training at Joker Marchant Stadium with pre-game festivities along Memorial Boulevard',
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800',
    startDate: new Date('2025-02-15T11:00:00'),
    endDate: new Date('2025-02-15T15:00:00'),
    location: 'Joker Marchant Stadium & Memorial Boulevard',
    isOnline: false,
    price: 25,
    maxAttendees: 8500,
    attendeeCount: 7234,
    businessName: 'Detroit Tigers',
    businessSlug: 'detroit-tigers',
  },
  {
    id: '3',
    slug: 'midtown-art-walk',
    title: 'Mid-Town Art Walk',
    description: 'Explore local galleries, shops, and restaurants along Memorial Boulevard and N. Florida Avenue with special exhibitions and live art demonstrations',
    imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800',
    startDate: new Date('2025-03-08T17:00:00'),
    endDate: new Date('2025-03-08T21:00:00'),
    location: 'Memorial Boulevard District',
    isOnline: false,
    price: 0,
    maxAttendees: 500,
    attendeeCount: 312,
    businessName: 'Mid-Town Lakeland Association',
    businessSlug: 'midtown-association',
  },
];

export default function EventsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50 py-8">
        <Container size="xl">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-serif font-bold text-display-md text-foreground mb-2">
              Mid-Town Lakeland Events
            </h1>
            <p className="text-body-lg text-muted-foreground">
              Discover events at Bonnet Springs Park, Tigers Spring Training games, and neighborhood activities along Memorial Boulevard
            </p>
          </div>

          {/* Events Grid */}
          {mockEvents.length === 0 ? (
            <EmptyState
              icon={Calendar}
              title="No events scheduled"
              description="Check back soon for upcoming events"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
}
