import * as React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: number;
  maxRating?: number;
  showValue?: boolean;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

const RatingDisplay = React.forwardRef<HTMLDivElement, RatingDisplayProps>(
  (
    {
      rating,
      maxRating = 5,
      showValue = true,
      reviewCount,
      size = 'md',
      interactive = false,
      className,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'h-3 w-3',
      md: 'h-4 w-4',
      lg: 'h-5 w-5',
    };

    const textSizeClasses = {
      sm: 'text-label-sm',
      md: 'text-body-sm',
      lg: 'text-body-md',
    };

    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-1', className)}
        role="img"
        aria-label={`Rating: ${rating} out of ${maxRating} stars${reviewCount ? ` from ${reviewCount} reviews` : ''}`}
        {...props}
      >
        <div className="flex items-center gap-0.5">
          {Array.from({ length: maxRating }, (_, index) => {
            const starValue = index + 1;
            const isFilled = starValue <= Math.floor(rating);
            const isPartial = starValue === Math.ceil(rating) && rating % 1 !== 0;

            return (
              <div key={index} className="relative">
                <Star
                  className={cn(
                    sizeClasses[size],
                    'text-neutral-300',
                    interactive && 'cursor-pointer transition-colors hover:text-accent-400'
                  )}
                  fill="currentColor"
                />
                {(isFilled || isPartial) && (
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{
                      width: isPartial ? `${(rating % 1) * 100}%` : '100%',
                    }}
                  >
                    <Star
                      className={cn(
                        sizeClasses[size],
                        'text-accent-500',
                        interactive && 'cursor-pointer transition-colors hover:text-accent-600'
                      )}
                      fill="currentColor"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {showValue && (
          <span className={cn('font-medium text-foreground', textSizeClasses[size])}>
            {rating.toFixed(1)}
          </span>
        )}

        {reviewCount !== undefined && (
          <span className={cn('text-muted-foreground', textSizeClasses[size])}>
            ({reviewCount.toLocaleString()})
          </span>
        )}
      </div>
    );
  }
);

RatingDisplay.displayName = 'RatingDisplay';

export { RatingDisplay };
