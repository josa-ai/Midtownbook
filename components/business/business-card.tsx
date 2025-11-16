'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Star, Heart, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RatingDisplay } from './rating-display';
import { StatusBadge } from './status-badge';
import { cn } from '@/lib/utils';

interface BusinessCardProps {
  business: {
    id: string;
    slug: string;
    name: string;
    description?: string;
    category: string;
    logoUrl?: string;
    coverImageUrl?: string;
    rating?: number;
    reviewCount?: number;
    distance?: string;
    address?: string;
    phone?: string;
    priceRange?: 1 | 2 | 3 | 4;
    isOpen?: boolean;
    nextOpenTime?: string;
    isFeatured?: boolean;
    // Mid-Town positioning
    isParkAdjacent?: boolean;
    isGameDayVenue?: boolean;
    distanceToPark?: number;
    distanceToStadium?: number;
  };
  variant?: 'grid' | 'list' | 'compact';
  showActions?: boolean;
  onFavorite?: (id: string) => void;
  isFavorited?: boolean;
  className?: string;
}

const BusinessCard: React.FC<BusinessCardProps> = ({
  business,
  variant = 'grid',
  showActions = true,
  onFavorite,
  isFavorited = false,
  className,
}) => {
  const priceSymbols = business.priceRange ? '$'.repeat(business.priceRange) : null;

  // Grid variant (default)
  if (variant === 'grid') {
    return (
      <Card
        variant="default"
        padding="none"
        interactive
        className={cn('overflow-hidden group', className)}
      >
        <Link href={`/businesses/${business.slug}`} className="block">
          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
            {business.coverImageUrl ? (
              <Image
                src={business.coverImageUrl}
                alt={business.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-primary">
                <span className="text-4xl font-serif font-bold text-white">
                  {business.name.charAt(0)}
                </span>
              </div>
            )}

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {business.isFeatured && (
                <Badge variant="accent" className="shadow-md">
                  <Star className="h-3 w-3 fill-current" />
                  Featured
                </Badge>
              )}
              {business.isParkAdjacent && (
                <Badge variant="success" className="shadow-md">
                  Near Park
                </Badge>
              )}
              {business.isGameDayVenue && (
                <Badge variant="primary" className="shadow-md">
                  Game Day
                </Badge>
              )}
            </div>

            {/* Favorite Button */}
            {showActions && onFavorite && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onFavorite(business.id);
                }}
                className={cn(
                  'absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md',
                  'transition-colors hover:bg-white',
                  'focus:outline-none focus:ring-2 focus:ring-accent-300'
                )}
                aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart
                  className={cn(
                    'h-4 w-4',
                    isFavorited ? 'fill-error text-error' : 'text-neutral-600'
                  )}
                />
              </button>
            )}
          </div>
        </Link>

        <CardContent className="p-4">
          <Link href={`/businesses/${business.slug}`}>
            {/* Header */}
            <div className="mb-2">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-serif font-semibold text-heading-sm text-foreground line-clamp-1 group-hover:text-primary-600 transition-colors">
                  {business.name}
                </h3>
                {priceSymbols && (
                  <span className="text-label-sm font-medium text-neutral-600 shrink-0">
                    {priceSymbols}
                  </span>
                )}
              </div>

              <Badge variant="outline" size="sm" className="mb-2">
                {business.category}
              </Badge>
            </div>

            {/* Rating & Status */}
            <div className="flex items-center justify-between mb-3">
              {business.rating !== undefined && (
                <RatingDisplay
                  rating={business.rating}
                  reviewCount={business.reviewCount}
                  size="sm"
                />
              )}
              {business.isOpen !== undefined && (
                <StatusBadge isOpen={business.isOpen} nextOpenTime={business.nextOpenTime} />
              )}
            </div>

            {/* Description */}
            {business.description && (
              <p className="text-body-sm text-muted-foreground line-clamp-2 mb-3">
                {business.description}
              </p>
            )}

            {/* Location & Distance */}
            <div className="flex items-center gap-4 text-label-sm text-muted-foreground">
              {business.address && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate">{business.address.split(',')[0]}</span>
                </div>
              )}
              {business.distance && (
                <span className="shrink-0">{business.distance}</span>
              )}
            </div>
          </Link>
        </CardContent>
      </Card>
    );
  }

  // List variant
  if (variant === 'list') {
    return (
      <Card
        variant="default"
        padding="none"
        interactive
        className={cn('overflow-hidden group', className)}
      >
        <Link href={`/businesses/${business.slug}`}>
          <div className="flex gap-4 p-4">
            {/* Image */}
            <div className="relative w-32 h-32 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
              {business.coverImageUrl ? (
                <Image
                  src={business.coverImageUrl}
                  alt={business.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gradient-primary">
                  <span className="text-2xl font-serif font-bold text-white">
                    {business.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-serif font-semibold text-heading-md text-foreground truncate group-hover:text-primary-600 transition-colors">
                      {business.name}
                    </h3>
                    {priceSymbols && (
                      <span className="text-label-sm font-medium text-neutral-600 shrink-0">
                        {priceSymbols}
                      </span>
                    )}
                    {business.isFeatured && (
                      <Badge variant="accent" size="sm">
                        <Star className="h-3 w-3 fill-current" />
                        Featured
                      </Badge>
                    )}
                    {business.isParkAdjacent && (
                      <Badge variant="success" size="sm">
                        Near Park
                      </Badge>
                    )}
                    {business.isGameDayVenue && (
                      <Badge variant="primary" size="sm">
                        Game Day
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" size="sm">
                      {business.category}
                    </Badge>
                    {business.distanceToPark && (
                      <span className="text-label-sm text-muted-foreground">
                        {business.distanceToPark.toFixed(1)} mi to park
                      </span>
                    )}
                  </div>
                </div>

                {showActions && onFavorite && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      onFavorite(business.id);
                    }}
                    className={cn(
                      'p-2 rounded-lg transition-colors hover:bg-neutral-100',
                      'focus:outline-none focus:ring-2 focus:ring-accent-300'
                    )}
                    aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Heart
                      className={cn(
                        'h-5 w-5',
                        isFavorited ? 'fill-error text-error' : 'text-neutral-600'
                      )}
                    />
                  </button>
                )}
              </div>

              {/* Rating & Status */}
              <div className="flex items-center gap-4 mb-2">
                {business.rating !== undefined && (
                  <RatingDisplay
                    rating={business.rating}
                    reviewCount={business.reviewCount}
                    size="sm"
                  />
                )}
                {business.isOpen !== undefined && (
                  <StatusBadge isOpen={business.isOpen} nextOpenTime={business.nextOpenTime} />
                )}
              </div>

              {/* Description */}
              {business.description && (
                <p className="text-body-sm text-muted-foreground line-clamp-2 mb-3">
                  {business.description}
                </p>
              )}

              {/* Location & Phone */}
              <div className="flex items-center gap-4 text-label-sm text-muted-foreground">
                {business.address && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate">{business.address}</span>
                  </div>
                )}
                {business.phone && (
                  <div className="flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    <span>{business.phone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Link>
      </Card>
    );
  }

  // Compact variant
  return (
    <Link
      href={`/businesses/${business.slug}`}
      className={cn(
        'flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-neutral-50',
        className
      )}
    >
      {/* Logo */}
      <div className="relative w-12 h-12 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
        {business.logoUrl ? (
          <Image src={business.logoUrl} alt={business.name} fill className="object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-primary">
            <span className="text-sm font-serif font-bold text-white">
              {business.name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-body-sm text-foreground truncate mb-0.5">
          {business.name}
        </h4>
        <div className="flex items-center gap-2">
          {business.rating !== undefined && (
            <RatingDisplay
              rating={business.rating}
              showValue={false}
              size="sm"
            />
          )}
          <span className="text-label-sm text-muted-foreground truncate">
            {business.category}
          </span>
        </div>
      </div>

      <ExternalLink className="h-4 w-4 text-neutral-400 shrink-0" />
    </Link>
  );
};

BusinessCard.displayName = 'BusinessCard';

export { BusinessCard };
