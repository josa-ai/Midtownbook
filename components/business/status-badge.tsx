import * as React from 'react';
import { Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  isOpen: boolean;
  nextOpenTime?: string;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  isOpen,
  nextOpenTime,
  className,
}) => {
  return (
    <div className={cn('inline-flex items-center gap-1', className)}>
      <Badge
        variant={isOpen ? 'success' : 'error'}
        className={cn(
          'font-medium',
          isOpen
            ? 'bg-success-light text-success-dark'
            : 'bg-error-light text-error-dark'
        )}
      >
        <span
          className={cn(
            'mr-1.5 inline-block h-2 w-2 rounded-full',
            isOpen ? 'bg-success' : 'bg-error'
          )}
          aria-hidden="true"
        />
        {isOpen ? 'Open' : 'Closed'}
      </Badge>

      {!isOpen && nextOpenTime && (
        <span className="text-label-sm text-muted-foreground flex items-center gap-1">
          <Clock className="h-3 w-3" />
          Opens {nextOpenTime}
        </span>
      )}
    </div>
  );
};

StatusBadge.displayName = 'StatusBadge';

export { StatusBadge };
