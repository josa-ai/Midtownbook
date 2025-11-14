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
import { RatingDisplay } from '@/components/business/rating-display';
import { StatusBadge } from '@/components/business/status-badge';
import { PhotoGallery, Photo } from '@/components/business/photo-gallery';
import { ReviewCard } from '@/components/business/review-card';
import { MapView } from '@/components/business/map-view';
import { BusinessCard } from '@/components/business/business-card';
import { cn } from '@/lib/utils';
import { BusinessWithDetails } from '@/lib/data/businesses';

interface Review {
  id: string;
  user_id: string;
  rating: number;
  title?: string;
  content: string;
  created_at: string;
  helpful_count: number;
  is_verified_purchase: boolean;
  user?: {
    full_name?: string;
    avatar_url?: string;
  };
}

interface BusinessDetailContentProps {
  business: BusinessWithDetails;
  reviews: Review[];
  relatedBusinesses: BusinessWithDetails[];
}

export function BusinessDetailContent({
  business,
  reviews: initialReviews,
  relatedBusinesses,
}: BusinessDetailContentProps) {
  const [activeTab, setActiveTab] = React.useState('overview');
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [reviews] = React.useState<Review[]>(initialReviews);

  const photos: Photo[] = React.useMemo(() => {
    const images = business.images || [];
    return images.map((url: string, index: number) => ({
      id: `photo-${index}`,
      url,
      alt: `${business.name} - Photo ${index + 1}`,
    }));
  }, [business.images, business.name]);

  // Parse hours
  const hours = React.useMemo(() => {
    if (!business.hours || typeof business.hours !== 'object') {
      return null;
    }
    return business.hours as Record<string, string>;
  }, [business.hours]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: business.name,
          text: business.description || `Check out ${business.name}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div>
      {/* Hero Image */}
      <div className="relative h-96 bg-neutral-100">
        {business.cover_image_url && (
          <Image
            src={business.cover_image_url}
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
                onClick={handleShare}
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
                {business.logo_url && (
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-white shadow-lg -mt-12">
                    <Image
                      src={business.logo_url}
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
                          href={`/categories/${business.category.slug}`}
                          className="text-primary-600 hover:text-primary-700 font-medium"
                        >
                          {business.category.name}
                        </Link>
                        {business.is_verified && (
                          <Badge variant="success" size="sm">
                            Verified
                          </Badge>
                        )}
                        {business.is_featured && (
                          <Badge variant="accent" size="sm">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                        {business.price_range && (
                          <span className="text-label-sm font-medium text-neutral-600">
                            {'$'.repeat(business.price_range)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {business.average_rating !== null && (
                    <RatingDisplay
                      rating={business.average_rating}
                      reviewCount={business.review_count}
                      size="lg"
                      showValue
                    />
                  )}
                </div>
              </div>

              {business.description && (
                <p className="text-body-lg text-muted-foreground">
                  {business.description}
                </p>
              )}
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="reviews">
                  Reviews ({business.review_count})
                </TabsTrigger>
                {photos.length > 0 && (
                  <TabsTrigger value="photos">
                    Photos ({photos.length})
                  </TabsTrigger>
                )}
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
                            <Badge key={amenity} variant="outline">
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
                      <p className="mt-3 text-body-sm text-muted-foreground flex items-start gap-2">
                        <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                        <span>
                          {business.address}, {business.city}, {business.state} {business.zip_code}
                        </span>
                      </p>
                    </CardContent>
                  </Card>

                  {/* Related Businesses */}
                  {relatedBusinesses.length > 0 && (
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="font-serif font-semibold text-heading-sm mb-4">
                          Similar Businesses
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {relatedBusinesses.map((relatedBusiness) => (
                            <BusinessCard
                              key={relatedBusiness.id}
                              business={{
                                id: relatedBusiness.id,
                                slug: relatedBusiness.slug,
                                name: relatedBusiness.name,
                                category: relatedBusiness.category.name,
                                coverImageUrl: relatedBusiness.cover_image_url || undefined,
                                rating: relatedBusiness.average_rating || undefined,
                                reviewCount: relatedBusiness.review_count,
                              }}
                              variant="compact"
                            />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
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

                  {reviews.length === 0 ? (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <p className="text-muted-foreground mb-4">
                          No reviews yet. Be the first to review!
                        </p>
                        <Button variant="primary">Write the First Review</Button>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <ReviewCard
                          key={review.id}
                          review={{
                            id: review.id,
                            userId: review.user_id,
                            userName: review.user?.full_name || 'Anonymous',
                            userAvatar: review.user?.avatar_url,
                            rating: review.rating,
                            title: review.title || undefined,
                            content: review.content,
                            createdAt: new Date(review.created_at),
                            helpfulCount: review.helpful_count,
                            isVerifiedPurchase: review.is_verified_purchase,
                          }}
                          showActions
                        />
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Photos Tab */}
              {photos.length > 0 && (
                <TabsContent value="photos">
                  <div>
                    <h3 className="font-serif font-semibold text-heading-sm mb-4">
                      Photos
                    </h3>
                    <PhotoGallery photos={photos} columns={3} />
                  </div>
                </TabsContent>
              )}
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
                        href={`https://maps.google.com/?q=${encodeURIComponent(
                          `${business.address}, ${business.city}, ${business.state} ${business.zip_code}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 text-body-sm hover:text-primary-600 transition-colors"
                      >
                        <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                        <span>
                          {business.address}
                          <br />
                          {business.city}, {business.state} {business.zip_code}
                        </span>
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
              {hours && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-serif font-semibold text-heading-sm mb-4 flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Hours
                    </h3>
                    <div className="space-y-2">
                      {Object.entries(hours).map(([day, time]) => (
                        <div
                          key={day}
                          className="flex justify-between text-body-sm"
                        >
                          <span className="capitalize text-muted-foreground">{day}</span>
                          <span className="font-medium">{time as string}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Stats Card */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-serif font-semibold text-heading-sm mb-4">
                    Business Stats
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-body-sm">
                      <span className="text-muted-foreground">Views</span>
                      <span className="font-medium">{business.view_count.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-body-sm">
                      <span className="text-muted-foreground">Reviews</span>
                      <span className="font-medium">{business.review_count}</span>
                    </div>
                    {business.average_rating && (
                      <div className="flex justify-between text-body-sm">
                        <span className="text-muted-foreground">Average Rating</span>
                        <span className="font-medium">
                          {business.average_rating.toFixed(1)} / 5.0
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

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
