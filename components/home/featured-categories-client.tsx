'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Utensils,
  Coffee,
  Dumbbell,
  Scissors,
  Wrench,
  Heart,
  ShoppingBag,
  Briefcase,
  Book,
  Film,
  Home,
  LucideIcon,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { CategoryWithCount } from '@/lib/data/categories';

// Icon mapping for database icon strings
const iconMap: Record<string, LucideIcon> = {
  utensils: Utensils,
  coffee: Coffee,
  dumbbell: Dumbbell,
  scissors: Scissors,
  wrench: Wrench,
  heart: Heart,
  'shopping-bag': ShoppingBag,
  briefcase: Briefcase,
  book: Book,
  film: Film,
  home: Home,
};

// Color mapping for categories (cycling through available colors)
const colorClasses = [
  'text-primary-600 bg-primary-100',
  'text-accent-600 bg-accent-100',
  'text-secondary-600 bg-secondary-100',
  'text-error bg-error-light',
  'text-info bg-info-light',
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

interface FeaturedCategoriesClientProps {
  categories: CategoryWithCount[];
}

export function FeaturedCategoriesClient({ categories }: FeaturedCategoriesClientProps) {
  return (
    <section className="section-padding bg-background">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-display-md font-serif font-bold text-foreground mb-4"
          >
            Explore Categories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-body-lg text-muted-foreground"
          >
            Whether you're visiting Bonnet Springs or live in the neighborhood, discover Mid-Town's diverse businesses
          </motion.p>
        </div>

        {/* Categories Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6"
        >
          {categories.map((category, index) => {
            const IconComponent = iconMap[category.icon || ''] || Briefcase;
            const colorClass = colorClasses[index % colorClasses.length];

            return (
              <motion.div key={category.id} variants={itemVariants}>
                <Link href={`/categories/${category.slug}`}>
                  <Card
                    variant="default"
                    padding="md"
                    interactive
                    className="h-full group"
                  >
                    <CardContent className="flex flex-col items-center text-center space-y-3">
                      <div
                        className={cn(
                          'w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110',
                          colorClass
                        )}
                      >
                        <IconComponent className="h-7 w-7" />
                      </div>
                      <div>
                        <h3 className="font-serif font-semibold text-heading-xs text-foreground mb-1">
                          {category.name}
                        </h3>
                        <p className="text-label-sm text-muted-foreground">
                          {category.business_count} {category.business_count === 1 ? 'business' : 'businesses'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-10"
        >
          <Link
            href="/categories"
            className="text-body-md font-medium text-primary-600 hover:text-primary-700 hover:underline underline-offset-4 transition-colors"
          >
            View All Categories →
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
