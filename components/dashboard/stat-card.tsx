'use client';

import * as React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
  description?: string;
  isLoading?: boolean;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  description,
  isLoading = false,
  variant = 'default',
  className,
}) => {
  const variantClasses = {
    default: 'bg-white',
    primary: 'bg-gradient-to-br from-primary-500 to-primary-600 text-white',
    success: 'bg-gradient-to-br from-secondary-500 to-secondary-600 text-white',
    warning: 'bg-gradient-to-br from-accent-400 to-accent-500 text-white',
    error: 'bg-gradient-to-br from-error to-error/90 text-white',
  };

  const iconBgClasses = {
    default: 'bg-neutral-100',
    primary: 'bg-white/20',
    success: 'bg-white/20',
    warning: 'bg-white/20',
    error: 'bg-white/20',
  };

  const textClasses = {
    default: 'text-muted-foreground',
    primary: 'text-white/80',
    success: 'text-white/80',
    warning: 'text-white/80',
    error: 'text-white/80',
  };

  if (isLoading) {
    return (
      <Card className={cn('', className)}>
        <CardContent className="p-6">
          <div className="space-y-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn(variantClasses[variant], 'border-0', className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {/* Title */}
            <p
              className={cn(
                'text-label-sm font-medium mb-1',
                variant === 'default' ? 'text-muted-foreground' : textClasses[variant]
              )}
            >
              {title}
            </p>

            {/* Value */}
            <p
              className={cn(
                'font-serif font-bold text-heading-xl mb-2',
                variant === 'default' ? 'text-foreground' : 'text-white'
              )}
            >
              {value}
            </p>

            {/* Trend */}
            {trend && (
              <div className="flex items-center gap-1">
                {trend.isPositive ? (
                  <TrendingUp className="h-4 w-4 text-success" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-error" />
                )}
                <span
                  className={cn(
                    'text-label-sm font-medium',
                    trend.isPositive ? 'text-success' : 'text-error',
                    variant !== 'default' && 'text-white'
                  )}
                >
                  {trend.value > 0 ? '+' : ''}
                  {trend.value}%
                </span>
                {trend.label && (
                  <span className={cn('text-label-sm', textClasses[variant])}>
                    {trend.label}
                  </span>
                )}
              </div>
            )}

            {/* Description */}
            {description && !trend && (
              <p className={cn('text-label-sm', textClasses[variant])}>
                {description}
              </p>
            )}
          </div>

          {/* Icon */}
          {Icon && (
            <div
              className={cn(
                'shrink-0 w-12 h-12 rounded-lg flex items-center justify-center',
                iconBgClasses[variant]
              )}
            >
              <Icon
                className={cn(
                  'h-6 w-6',
                  variant === 'default' ? 'text-primary-600' : 'text-white'
                )}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

StatCard.displayName = 'StatCard';

export { StatCard };
