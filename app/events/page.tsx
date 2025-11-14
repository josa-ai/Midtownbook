import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { Container } from '@/components/ui/container';
import { EventCard } from '@/components/business/event-card';
import { EmptyState } from '@/components/ui/empty-state';
import { Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Events',
  description: 'Discover upcoming events and activities in Midtown',
};

// Mock events data
const mockEvents = [
  {
    id: '1',
    slug: 'summer-music-festival',
    title: 'Summer Music Festival',
    description: 'Join us for an evening of live music featuring local artists',
    imageUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800',
    startDate: new Date('2024-07-15T18:00:00'),
    endDate: new Date('2024-07-15T23:00:00'),
    location: 'Midtown Park',
    isOnline: false,
    price: 15,
    maxAttendees: 500,
    attendeeCount: 342,
    businessName: 'Midtown Events',
    businessSlug: 'midtown-events',
  },
  {
    id: '2',
    slug: 'tech-workshop',
    title: 'Web Development Workshop',
    description: 'Learn the basics of web development in this hands-on workshop',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    startDate: new Date('2024-07-20T14:00:00'),
    endDate: new Date('2024-07-20T17:00:00'),
    location: 'Tech Hub Midtown',
    isOnline: true,
    price: 0,
    maxAttendees: 30,
    attendeeCount: 18,
    businessName: 'Tech Hub',
    businessSlug: 'tech-hub',
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
              Upcoming Events
            </h1>
            <p className="text-body-lg text-muted-foreground">
              Discover {mockEvents.length} exciting events happening in Midtown
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
                <EventCard key={event.id} event={event} variant="default" />
              ))}
            </div>
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
}
