'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, Mail, Globe, Clock, Star, Heart, Share2, Flag } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RatingDisplay } from '@/components/business/rating-display';
import { StatusBadge } from '@/components/business/status-badge';
import { PhotoGallery, Photo } from '@/components/business/photo-gallery';
import { ReviewCard } from '@/components/business/review-card';
import { MapView } from '@/components/business/map-view';
import { cn } from '@/lib/utils';

interface BusinessDetailContentProps {
  business: any; // Replace with proper type
}

// Mock reviews
const mockReviews = [
  {
    id: '1',
    userId: 'user-1',
    userName: 'Sarah Johnson',
    userAvatar: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
    title: 'Amazing coffee and atmosphere!',
    content: 'I visit this café every morning for my coffee fix. The baristas are friendly, the coffee is consistently excellent, and the atmosphere is perfect for getting work done. Highly recommend!',
    createdAt: new Date('2024-01-15'),
    helpfulCount: 12,
    isVerifiedPurchase: true,
  },
  {
    id: '2',
    userId: 'user-2',
    userName: 'Mike Chen',
    userAvatar: 'https://i.pravatar.cc/150?img=2',
    rating: 4,
    title: 'Great spot for breakfast',
    content: 'Love their breakfast menu. The avocado toast is delicious and the portions are generous. Sometimes it gets crowded on weekends, but worth the wait.',
    createdAt: new Date('2024-01-10'),
    helpfulCount: 8,
  },
];

export function BusinessDetailContent({ business }: BusinessDetailContentProps) {
  const [activeTab, setActiveTab] = React.useState('overview');
  const [isFavorite, setIsFavorite] = React.useState(false);

  const photos: Photo[] = business.images.map((url: string, index: number) => ({
    id: `photo-${index}`,
    url,
    alt: `${business.name} - Photo ${index + 1}`,
  }));

  return (
    <div>
      {/* Hero Image */}
      <div className="relative h-96 bg-neutral-100">
        {business.coverImageUrl && (
          <Image
            src={business.coverImageUrl}
            alt={business.name}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent" />

        {/* Back Button & Actions */}
        <Container className="relative h-full flex items-end pb-8">
          <div className="flex items-end justify-between w-full">
            <Link
              href="/businesses"
              className="px-4 py-2 rounded-lg bg-white/90 backdrop-blur-sm hover:bg-white transition-colors text-body-sm font-medium"
            >
              ← Back to Businesses
            </Link>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="bg-white/90 backdrop-blur-sm hover:bg-white"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={cn('h-5 w-5', isFavorite && 'fill-error text-error')} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-white/90 backdrop-blur-sm hover:bg-white"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Business Header */}
            <div className="mb-6">
              <div className="flex items-start gap-4 mb-4">
                {business.logoUrl && (
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-white shadow-lg -mt-12">
                    <Image
                      src={business.logoUrl}
                      alt={`${business.name} logo`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h1 className="font-serif font-bold text-display-sm text-foreground mb-2">
                        {business.name}
                      </h1>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Link
                          href={`/categories/${business.categorySlug}`}
                          className="text-primary-600 hover:text-primary-700 font-medium"
                        >
                          {business.category}
                        </Link>
                        {business.isVerified && (
                          <Badge variant="success" size="sm">
                            Verified
                          </Badge>
                        )}
                        {business.isFeatured && (
                          <Badge variant="accent" size="sm">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                        <StatusBadge isOpen={business.isOpen} />
                      </div>
                    </div>
                  </div>

                  <RatingDisplay
                    rating={business.rating}
                    reviewCount={business.reviewCount}
                    size="lg"
                    showValue
                  />
                </div>
              </div>

              <p className="text-body-lg text-muted-foreground">
                {business.description}
              </p>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList variant="line" className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({business.reviewCount})</TabsTrigger>
                <TabsTrigger value="photos">Photos ({photos.length})</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview">
                <div className="space-y-6">
                  {/* Amenities */}
                  {business.amenities && business.amenities.length > 0 && (
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="font-serif font-semibold text-heading-sm mb-4">
                          Amenities
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {business.amenities.map((amenity: string) => (
                            <Badge key={amenity} variant="default">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Map */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-serif font-semibold text-heading-sm mb-4">
                        Location
                      </h3>
                      <MapView
                        center={{ lat: business.latitude, lng: business.longitude }}
                        markers={[
                          {
                            lat: business.latitude,
                            lng: business.longitude,
                            title: business.name,
                          },
                        ]}
                        height={300}
                      />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif font-semibold text-heading-sm">
                      Customer Reviews
                    </h3>
                    <Button variant="primary">Write a Review</Button>
                  </div>
                  <div className="space-y-4">
                    {mockReviews.map((review) => (
                      <ReviewCard key={review.id} review={review} showActions />
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Photos Tab */}
              <TabsContent value="photos">
                <div>
                  <h3 className="font-serif font-semibold text-heading-sm mb-4">
                    Photos
                  </h3>
                  <PhotoGallery photos={photos} columns={3} />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <aside>
            <div className="sticky top-24 space-y-4">
              {/* Contact Card */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-serif font-semibold text-heading-sm mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    {business.address && (
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(business.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 text-body-sm hover:text-primary-600 transition-colors"
                      >
                        <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                        <span>{business.address}</span>
                      </a>
                    )}
                    {business.phone && (
                      <a
                        href={`tel:${business.phone}`}
                        className="flex items-center gap-3 text-body-sm hover:text-primary-600 transition-colors"
                      >
                        <Phone className="h-5 w-5 text-muted-foreground" />
                        <span>{business.phone}</span>
                      </a>
                    )}
                    {business.email && (
                      <a
                        href={`mailto:${business.email}`}
                        className="flex items-center gap-3 text-body-sm hover:text-primary-600 transition-colors"
                      >
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <span>{business.email}</span>
                      </a>
                    )}
                    {business.website && (
                      <a
                        href={business.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-body-sm hover:text-primary-600 transition-colors"
                      >
                        <Globe className="h-5 w-5 text-muted-foreground" />
                        <span>Visit Website</span>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Hours Card */}
              {business.hours && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-serif font-semibold text-heading-sm mb-4 flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Hours
                    </h3>
                    <div className="space-y-2">
                      {Object.entries(business.hours).map(([day, hours]) => (
                        <div
                          key={day}
                          className="flex justify-between text-body-sm"
                        >
                          <span className="capitalize text-muted-foreground">{day}</span>
                          <span className="font-medium">{hours as string}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Report Button */}
              <Button variant="ghost" size="sm" className="w-full text-muted-foreground">
                <Flag className="h-4 w-4 mr-2" />
                Report this business
              </Button>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
