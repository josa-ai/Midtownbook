'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Tag, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn, formatDate } from '@/lib/utils';
import { format } from 'date-fns';

interface DealCardProps {
  deal: {
    id: string;
    slug: string;
    title: string;
    description?: string;
    imageUrl?: string;
    discountPercentage?: number;
    originalPrice?: number;
    discountedPrice?: number;
    startDate: string | Date;
    endDate: string | Date;
    businessName?: string;
    businessSlug?: string;
    location?: string;
    isExpired?: boolean;
  };
  variant?: 'default' | 'compact';
  onClaim?: (dealId: string) => void;
  isClaimed?: boolean;
  className?: string;
}

const DealCard: React.FC<DealCardProps> = ({
  deal,
  variant = 'default',
  onClaim,
  isClaimed = false,
  className,
}) => {
  const endDate = typeof deal.endDate === 'string' ? new Date(deal.endDate) : deal.endDate;
  const daysLeft = Math.ceil((endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  const isExpired = deal.isExpired || daysLeft < 0;

  // Compact variant
  if (variant === 'compact') {
    return (
      <Link
        href={`/deals/${deal.slug}`}
        className={cn(
          'flex gap-4 p-4 rounded-lg transition-colors hover:bg-neutral-50',
          isExpired && 'opacity-60',
          className
        )}
      >
        {/* Image */}
        {deal.imageUrl && (
          <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-neutral-100">
            <Image
              src={deal.imageUrl}
              alt={deal.title}
              fill
              className="object-cover"
            />
            {deal.discountPercentage && (
              <div className="absolute top-2 left-2">
                <Badge variant="error" size="sm">
                  {deal.discountPercentage}% OFF
                </Badge>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-body-md text-foreground line-clamp-1 mb-1">
            {deal.title}
          </h4>
          {deal.businessName && (
            <p className="text-label-sm text-muted-foreground mb-2">
              {deal.businessName}
            </p>
          )}
          <div className="flex items-center gap-2 text-label-sm text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{daysLeft} days left</span>
          </div>
        </div>

        {/* Price */}
        <div className="text-right shrink-0">
          {deal.discountedPrice !== undefined && (
            <div className="font-bold text-heading-xs text-primary-600">
              ${deal.discountedPrice}
            </div>
          )}
          {deal.originalPrice && (
            <div className="text-label-sm text-muted-foreground line-through">
              ${deal.originalPrice}
            </div>
          )}
        </div>
      </Link>
    );
  }

  // Default variant
  return (
    <Card
      variant="default"
      padding="none"
      interactive
      className={cn('overflow-hidden group', isExpired && 'opacity-60', className)}
    >
      <Link href={`/deals/${deal.slug}`}>
        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100">
          {deal.imageUrl ? (
            <Image
              src={deal.imageUrl}
              alt={deal.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary-400 to-accent-500">
              <Tag className="h-16 w-16 text-white/50" />
            </div>
          )}

          {/* Discount Badge */}
          {deal.discountPercentage && (
            <div className="absolute top-4 left-4">
              <Badge variant="error" className="text-heading-xs font-bold">
                {deal.discountPercentage}% OFF
              </Badge>
            </div>
          )}

          {/* Status Badge */}
          {isExpired && (
            <div className="absolute top-4 right-4">
              <Badge variant="default">Expired</Badge>
            </div>
          )}
          {!isExpired && daysLeft <= 3 && (
            <div className="absolute top-4 right-4">
              <Badge variant="warning">Ending Soon</Badge>
            </div>
          )}
        </div>
      </Link>

      <CardContent className="p-6">
        <Link href={`/deals/${deal.slug}`}>
          {/* Business Name */}
          {deal.businessName && deal.businessSlug && (
            <Link
              href={`/businesses/${deal.businessSlug}`}
              className="inline-block mb-2 text-label-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              {deal.businessName}
            </Link>
          )}

          {/* Title */}
          <h3 className="font-serif font-semibold text-heading-md text-foreground line-clamp-2 mb-2 group-hover:text-primary-600 transition-colors">
            {deal.title}
          </h3>

          {/* Description */}
          {deal.description && (
            <p className="text-body-sm text-muted-foreground line-clamp-2 mb-4">
              {deal.description}
            </p>
          )}

          {/* Details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-body-sm text-foreground">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Ends {format(endDate, 'MMM d, yyyy')}</span>
            </div>
            {deal.location && (
              <div className="flex items-center gap-2 text-body-sm text-foreground">
                <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="truncate">{deal.location}</span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-3">
              {/* Price */}
              {deal.discountedPrice !== undefined && (
                <div>
                  <div className="font-bold text-heading-md text-primary-600">
                    ${deal.discountedPrice}
                  </div>
                  {deal.originalPrice && (
                    <div className="text-label-sm text-muted-foreground line-through">
                      ${deal.originalPrice}
                    </div>
                  )}
                </div>
              )}
              {deal.discountPercentage && !deal.discountedPrice && (
                <div className="font-bold text-heading-md text-primary-600">
                  {deal.discountPercentage}% OFF
                </div>
              )}
            </div>

            {/* Claim Button */}
            {onClaim && !isExpired && (
              <Button
                variant={isClaimed ? 'outline' : 'primary'}
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  onClaim(deal.id);
                }}
              >
                {isClaimed ? 'Claimed' : 'Claim Deal'}
              </Button>
            )}
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};

DealCard.displayName = 'DealCard';

export { DealCard };
