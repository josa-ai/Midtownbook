import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Header, Footer } from '@/components/layout';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, MapPin, DollarSign, Users, Share2 } from 'lucide-react';
import { format } from 'date-fns';

async function getEvent(slug: string) {
  // Mock event data
  const mockEvent = {
    id: '1',
    slug: slug,
    title: 'Summer Music Festival',
    description: 'Join us for an unforgettable evening of live music featuring talented local artists from across the region. This outdoor festival celebrates the vibrant music scene in Midtown with performances spanning multiple genres including jazz, rock, indie, and electronic music.\n\nFood trucks and local vendors will be on-site offering delicious food and refreshments. Bring your friends and family for a memorable summer evening under the stars.',
    imageUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200',
    startDate: new Date('2024-07-15T18:00:00'),
    endDate: new Date('2024-07-15T23:00:00'),
    location: 'Midtown Park, 456 Park Avenue',
    isOnline: false,
    price: 15,
    maxAttendees: 500,
    attendeeCount: 342,
    businessName: 'Midtown Events',
    businessSlug: 'midtown-events',
    organizer: {
      name: 'Midtown Events',
      avatar: 'https://i.pravatar.cc/150?img=20',
    },
    tags: ['Music', 'Outdoor', 'Family Friendly'],
  };

  if (slug !== mockEvent.slug) {
    return null;
  }

  return mockEvent;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    return { title: 'Event Not Found' };
  }

  return {
    title: event.title,
    description: event.description.substring(0, 160),
    openGraph: {
      title: event.title,
      description: event.description,
      images: event.imageUrl ? [event.imageUrl] : [],
    },
  };
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    notFound();
  }

  const isFree = event.price === 0;
  const spotsLeft = event.maxAttendees - event.attendeeCount;
  const isSoldOut = spotsLeft <= 0;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Image */}
        <div className="relative h-96 bg-neutral-100">
          {event.imageUrl && (
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent" />
        </div>

        <Container className="py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Link
                href="/events"
                className="inline-block mb-4 text-primary-600 hover:text-primary-700 text-body-sm font-medium"
              >
                ← Back to Events
              </Link>

              <h1 className="font-serif font-bold text-display-md text-foreground mb-4">
                {event.title}
              </h1>

              <div className="flex items-center gap-3 mb-6 flex-wrap">
                <Link
                  href={`/businesses/${event.businessSlug}`}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  By {event.businessName}
                </Link>
                {event.tags.map((tag) => (
                  <Badge key={tag}>
                    {tag}
                  </Badge>
                ))}
              </div>

              <Card className="mb-8">
                <CardContent className="p-6">
                  <h2 className="font-serif font-semibold text-heading-sm mb-4">
                    About This Event
                  </h2>
                  <div className="prose prose-neutral max-w-none">
                    {event.description.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-body-md text-foreground mb-4 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <aside>
              <div className="sticky top-24 space-y-4">
                {/* Booking Card */}
                <Card>
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <div className="flex items-baseline gap-2 mb-2">
                        {isFree ? (
                          <span className="font-bold text-heading-xl text-foreground">Free</span>
                        ) : (
                          <>
                            <span className="font-bold text-heading-xl text-foreground">
                              ${event.price}
                            </span>
                            <span className="text-body-sm text-muted-foreground">per person</span>
                          </>
                        )}
                      </div>
                      {!isSoldOut && (
                        <p className="text-label-sm text-muted-foreground">
                          {spotsLeft} spots left
                        </p>
                      )}
                    </div>

                    {isSoldOut ? (
                      <Button variant="outline" size="lg" className="w-full" disabled>
                        Sold Out
                      </Button>
                    ) : (
                      <Button variant="primary" size="lg" className="w-full">
                        RSVP Now
                      </Button>
                    )}
                  </CardContent>
                </Card>

                {/* Event Details */}
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-body-sm mb-0.5">Date</p>
                        <p className="text-body-sm text-muted-foreground">
                          {format(event.startDate, 'EEEE, MMMM d, yyyy')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-body-sm mb-0.5">Time</p>
                        <p className="text-body-sm text-muted-foreground">
                          {format(event.startDate, 'h:mm a')} - {format(event.endDate, 'h:mm a')}
                        </p>
                      </div>
                    </div>

                    {event.location && (
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-body-sm mb-0.5">Location</p>
                          <p className="text-body-sm text-muted-foreground">
                            {event.location}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-body-sm mb-0.5">Attendees</p>
                        <p className="text-body-sm text-muted-foreground">
                          {event.attendeeCount} registered
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Share Button */}
                <Button variant="outline" className="w-full">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Event
                </Button>
              </div>
            </aside>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
