import * as React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbsProps extends React.ComponentPropsWithoutRef<'nav'> {
  separator?: React.ReactNode;
}

const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ className, children, separator, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn('flex items-center space-x-1', className)}
        {...props}
      >
        <ol className="flex items-center space-x-1">
          {React.Children.map(children, (child, index) => {
            const isLast = index === React.Children.count(children) - 1;
            return (
              <li className="flex items-center space-x-1">
                {child}
                {!isLast && (
                  <span className="text-muted-foreground" aria-hidden="true">
                    {separator || <ChevronRight className="h-4 w-4" />}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);
Breadcrumbs.displayName = 'Breadcrumbs';

interface BreadcrumbItemProps extends React.ComponentPropsWithoutRef<'a'> {
  href?: string;
  current?: boolean;
}

const BreadcrumbItem = React.forwardRef<HTMLAnchorElement, BreadcrumbItemProps>(
  ({ className, current, children, href, ...props }, ref) => {
    if (current || !href) {
      return (
        <span
          className={cn(
            'text-body-sm font-medium text-foreground',
            current && 'text-primary-600',
            className
          )}
          aria-current={current ? 'page' : undefined}
        >
          {children}
        </span>
      );
    }

    return (
      <a
        ref={ref}
        href={href}
        className={cn(
          'text-body-sm font-medium text-muted-foreground transition-colors',
          'hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300 focus-visible:ring-offset-2 rounded',
          className
        )}
        {...props}
      >
        {children}
      </a>
    );
  }
);
BreadcrumbItem.displayName = 'BreadcrumbItem';

export { Breadcrumbs, BreadcrumbItem };
