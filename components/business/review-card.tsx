'use client';

import * as React from 'react';
import Image from 'next/image';
import { ThumbsUp, Flag, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RatingDisplay } from './rating-display';
import { cn, formatDate, getInitials } from '@/lib/utils';

interface ReviewCardProps {
  review: {
    id: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    rating: number;
    title?: string;
    content: string;
    images?: string[];
    createdAt: string | Date;
    helpfulCount: number;
    isVerifiedPurchase?: boolean;
    businessResponse?: {
      content: string;
      createdAt: string | Date;
    };
  };
  onHelpful?: (reviewId: string) => void;
  onFlag?: (reviewId: string) => void;
  onReply?: (reviewId: string) => void;
  isHelpful?: boolean;
  showActions?: boolean;
  className?: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  onHelpful,
  onFlag,
  onReply,
  isHelpful = false,
  showActions = true,
  className,
}) => {
  const [showFullContent, setShowFullContent] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  const contentPreview = review.content.slice(0, 200);
  const needsTruncation = review.content.length > 200;

  return (
    <Card variant="default" padding="none" className={cn('overflow-hidden', className)}>
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={review.userAvatar} alt={review.userName} />
            <AvatarFallback>{getInitials(review.userName)}</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-body-md text-foreground">
                {review.userName}
              </h4>
              {review.isVerifiedPurchase && (
                <Badge variant="success" size="sm">
                  Verified
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-3 mb-2">
              <RatingDisplay rating={review.rating} showValue={false} size="sm" />
              <span className="text-label-sm text-muted-foreground">
                {formatDate(review.createdAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Title */}
        {review.title && (
          <h5 className="font-semibold text-heading-xs text-foreground mb-2">
            {review.title}
          </h5>
        )}

        {/* Content */}
        <div className="text-body-md text-foreground mb-4">
          <p className="whitespace-pre-wrap">
            {showFullContent || !needsTruncation ? review.content : `${contentPreview}...`}
          </p>
          {needsTruncation && (
            <button
              onClick={() => setShowFullContent(!showFullContent)}
              className="text-primary-600 hover:text-primary-700 font-medium text-body-sm mt-2 transition-colors"
            >
              {showFullContent ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>

        {/* Images */}
        {review.images && review.images.length > 0 && (
          <div className="flex gap-2 mb-4 overflow-x-auto">
            {review.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image)}
                className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0 group"
              >
                <Image
                  src={image}
                  alt={`Review image ${index + 1}`}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                />
              </button>
            ))}
          </div>
        )}

        {/* Actions */}
        {showActions && (
          <div className="flex items-center gap-4 pt-4 border-t border-border">
            {onHelpful && (
              <button
                onClick={() => onHelpful(review.id)}
                className={cn(
                  'flex items-center gap-1.5 text-label-sm font-medium transition-colors',
                  isHelpful
                    ? 'text-primary-600'
                    : 'text-muted-foreground hover:text-primary-600'
                )}
              >
                <ThumbsUp className={cn('h-4 w-4', isHelpful && 'fill-current')} />
                Helpful ({review.helpfulCount})
              </button>
            )}

            {onReply && (
              <button
                onClick={() => onReply(review.id)}
                className="flex items-center gap-1.5 text-label-sm font-medium text-muted-foreground hover:text-primary-600 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                Reply
              </button>
            )}

            {onFlag && (
              <button
                onClick={() => onFlag(review.id)}
                className="flex items-center gap-1.5 text-label-sm font-medium text-muted-foreground hover:text-error transition-colors ml-auto"
              >
                <Flag className="h-4 w-4" />
                Report
              </button>
            )}
          </div>
        )}

        {/* Business Response */}
        {review.businessResponse && (
          <div className="mt-4 pt-4 border-t border-border bg-neutral-50 -mx-6 -mb-6 p-6 rounded-b-xl">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 shrink-0">
                <span className="text-white text-label-sm font-semibold">B</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-body-sm text-foreground">
                    Business Owner
                  </span>
                  <span className="text-label-sm text-muted-foreground">
                    {formatDate(review.businessResponse.createdAt)}
                  </span>
                </div>
                <p className="text-body-sm text-foreground">
                  {review.businessResponse.content}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-modal bg-neutral-900/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full">
            <Image
              src={selectedImage}
              alt="Review image"
              fill
              className="object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </Card>
  );
};

ReviewCard.displayName = 'ReviewCard';

export { ReviewCard };
