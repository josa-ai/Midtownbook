import * as React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'We encountered an error while loading this content. Please try again.',
  onRetry,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 px-4 text-center',
        className
      )}
      role="alert"
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-error-light">
        <AlertTriangle className="h-8 w-8 text-error" />
      </div>

      <h3 className="text-heading-md font-serif font-semibold text-foreground mb-2">
        {title}
      </h3>

      <p className="text-body-md text-muted-foreground max-w-md mb-6">
        {message}
      </p>

      {onRetry && (
        <Button onClick={onRetry} variant="primary">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      )}
    </div>
  );
};

ErrorState.displayName = 'ErrorState';

export { ErrorState };
