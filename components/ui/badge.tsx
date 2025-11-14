import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        primary: 'bg-primary-100 text-primary-800 hover:bg-primary-200',
        secondary:
          'bg-secondary-100 text-secondary-800 hover:bg-secondary-200',
        accent: 'bg-accent-100 text-accent-800 hover:bg-accent-200',
        success: 'bg-success-light text-success-dark hover:bg-success/20',
        warning: 'bg-warning-light text-warning-dark hover:bg-warning/20',
        error: 'bg-error-light text-error-dark hover:bg-error/20',
        info: 'bg-info-light text-info-dark hover:bg-info/20',
        outline: 'border border-border text-foreground hover:bg-muted',
        ghost: 'text-foreground hover:bg-muted',
      },
      size: {
        sm: 'px-2 py-0.5 text-label-sm',
        md: 'px-2.5 py-0.5 text-label-md',
        lg: 'px-3 py-1 text-label-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
}

function Badge({ className, variant, size, icon, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
