'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Clock, DollarSign, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn, formatDate } from '@/lib/utils';
import { format } from 'date-fns';

interface EventCardProps {
  event: {
    id: string;
    slug: string;
    title: string;
    description?: string;
    imageUrl?: string;
    startDate: string | Date;
    endDate: string | Date;
    location?: string;
    isOnline?: boolean;
    price?: number;
    maxAttendees?: number;
    attendeeCount?: number;
    businessName?: string;
    businessSlug?: string;
  };
  variant?: 'default' | 'compact';
  onRSVP?: (eventId: string) => void;
  isRSVPed?: boolean;
  className?: string;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  variant = 'default',
  onRSVP,
  isRSVPed = false,
  className,
}) => {
  const startDate = typeof event.startDate === 'string' ? new Date(event.startDate) : event.startDate;
  const endDate = typeof event.endDate === 'string' ? new Date(event.endDate) : event.endDate;

  const dateDisplay = format(startDate, 'MMM d, yyyy');
  const timeDisplay = format(startDate, 'h:mm a');
  const isFree = event.price === 0 || event.price === null || event.price === undefined;
  const isSoldOut = event.maxAttendees && event.attendeeCount && event.attendeeCount >= event.maxAttendees;

  // Compact variant
  if (variant === 'compact') {
    return (
      <Link
        href={`/events/${event.slug}`}
        className={cn(
          'flex gap-4 p-4 rounded-lg transition-colors hover:bg-neutral-50',
          className
        )}
      >
        {/* Date Badge */}
        <div className="flex flex-col items-center justify-center w-16 h-16 rounded-lg bg-primary-100 text-primary-700 shrink-0">
          <div className="text-heading-sm font-bold leading-none">
            {format(startDate, 'd')}
          </div>
          <div className="text-label-xs uppercase font-semibold">
            {format(startDate, 'MMM')}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-body-md text-foreground line-clamp-1 mb-1">
            {event.title}
          </h4>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-label-sm text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{timeDisplay}</span>
            </div>
            {event.location && !event.isOnline && (
              <div className="flex items-center gap-2 text-label-sm text-muted-foreground truncate">
                <MapPin className="h-3 w-3 shrink-0" />
                <span className="truncate">{event.location}</span>
              </div>
            )}
            {event.isOnline && (
              <Badge variant="info" size="sm">Online Event</Badge>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="text-right shrink-0">
          <div className="font-semibold text-body-sm text-foreground">
            {isFree ? 'Free' : `$${event.price}`}
          </div>
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
      className={cn('overflow-hidden group', className)}
    >
      <Link href={`/events/${event.slug}`}>
        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100">
          {event.imageUrl ? (
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary-400 to-accent-500">
              <Calendar className="h-16 w-16 text-white/50" />
            </div>
          )}

          {/* Date Badge */}
          <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex flex-col items-center px-3 py-2">
              <div className="text-heading-md font-bold leading-none text-primary-600">
                {format(startDate, 'd')}
              </div>
              <div className="text-label-sm uppercase font-semibold text-neutral-600">
                {format(startDate, 'MMM')}
              </div>
            </div>
          </div>

          {/* Status Badges */}
          <div className="absolute top-4 right-4 flex gap-2">
            {isSoldOut && (
              <Badge variant="error">Sold Out</Badge>
            )}
            {event.isOnline && (
              <Badge variant="info">Online</Badge>
            )}
          </div>
        </div>
      </Link>

      <CardContent className="p-6">
        <Link href={`/events/${event.slug}`}>
          {/* Business Name */}
          {event.businessName && event.businessSlug && (
            <Link
              href={`/businesses/${event.businessSlug}`}
              className="inline-block mb-2 text-label-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              Hosted by {event.businessName}
            </Link>
          )}

          {/* Title */}
          <h3 className="font-serif font-semibold text-heading-md text-foreground line-clamp-2 mb-3 group-hover:text-primary-600 transition-colors">
            {event.title}
          </h3>

          {/* Description */}
          {event.description && (
            <p className="text-body-sm text-muted-foreground line-clamp-2 mb-4">
              {event.description}
            </p>
          )}

          {/* Event Details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-body-sm text-foreground">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{dateDisplay}</span>
            </div>
            <div className="flex items-center gap-2 text-body-sm text-foreground">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{timeDisplay}</span>
            </div>
            {event.location && !event.isOnline && (
              <div className="flex items-center gap-2 text-body-sm text-foreground">
                <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="truncate">{event.location}</span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-4">
              {/* Price */}
              <div className="flex items-center gap-1.5">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold text-body-md text-foreground">
                  {isFree ? 'Free' : `$${event.price}`}
                </span>
              </div>

              {/* Attendees */}
              {event.maxAttendees && (
                <div className="flex items-center gap-1.5 text-label-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>
                    {event.attendeeCount || 0}/{event.maxAttendees}
                  </span>
                </div>
              )}
            </div>

            {/* RSVP Button */}
            {onRSVP && !isSoldOut && (
              <Button
                variant={isRSVPed ? 'outline' : 'primary'}
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  onRSVP(event.id);
                }}
              >
                {isRSVPed ? 'Cancel RSVP' : 'RSVP'}
              </Button>
            )}
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};

EventCard.displayName = 'EventCard';

export { EventCard };
