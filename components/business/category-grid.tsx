'use client';

import * as React from 'react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: LucideIcon;
  count?: number;
  description?: string;
  color?: string;
}

interface CategoryGridProps {
  categories: Category[];
  columns?: 2 | 3 | 4 | 6;
  showCount?: boolean;
  showDescription?: boolean;
  className?: string;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  columns = 3,
  showCount = true,
  showDescription = false,
  className,
}) => {
  const gridClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
    6: 'grid-cols-3 sm:grid-cols-4 md:grid-cols-6',
  }[columns];

  return (
    <div className={cn(`grid ${gridClass} gap-4`, className)}>
      {categories.map((category) => {
        const Icon = category.icon;
        const colorClass = category.color || 'from-primary-400 to-accent-500';

        return (
          <Link key={category.id} href={`/categories/${category.slug}`}>
            <Card
              variant="default"
              padding="none"
              interactive
              className="h-full overflow-hidden group"
            >
              <CardContent className="p-6">
                {/* Icon */}
                <div
                  className={cn(
                    'w-12 h-12 rounded-lg bg-gradient-to-br flex items-center justify-center mb-4 transition-transform group-hover:scale-110',
                    colorClass.startsWith('from-')
                      ? colorClass
                      : `bg-${colorClass}`
                  )}
                >
                  {Icon ? (
                    <Icon className="h-6 w-6 text-white" />
                  ) : (
                    <div className="h-6 w-6 rounded bg-white/30" />
                  )}
                </div>

                {/* Name */}
                <h3 className="font-semibold text-body-md text-foreground mb-1 group-hover:text-primary-600 transition-colors">
                  {category.name}
                </h3>

                {/* Count */}
                {showCount && category.count !== undefined && (
                  <p className="text-label-sm text-muted-foreground">
                    {category.count} {category.count === 1 ? 'business' : 'businesses'}
                  </p>
                )}

                {/* Description */}
                {showDescription && category.description && (
                  <p className="mt-2 text-body-sm text-muted-foreground line-clamp-2">
                    {category.description}
                  </p>
                )}
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

CategoryGrid.displayName = 'CategoryGrid';

export { CategoryGrid, type Category };
