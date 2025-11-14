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
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const categories = [
  {
    name: 'Restaurants',
    icon: Utensils,
    count: 150,
    href: '/businesses?category=restaurants',
    color: 'text-primary-600 bg-primary-100',
  },
  {
    name: 'Coffee & Tea',
    icon: Coffee,
    count: 45,
    href: '/businesses?category=coffee',
    color: 'text-accent-600 bg-accent-100',
  },
  {
    name: 'Fitness',
    icon: Dumbbell,
    count: 35,
    href: '/businesses?category=fitness',
    color: 'text-secondary-600 bg-secondary-100',
  },
  {
    name: 'Beauty & Spa',
    icon: Scissors,
    count: 80,
    href: '/businesses?category=beauty',
    color: 'text-primary-600 bg-primary-100',
  },
  {
    name: 'Auto Services',
    icon: Wrench,
    count: 40,
    href: '/businesses?category=auto',
    color: 'text-accent-600 bg-accent-100',
  },
  {
    name: 'Healthcare',
    icon: Heart,
    count: 60,
    href: '/businesses?category=healthcare',
    color: 'text-error bg-error-light',
  },
  {
    name: 'Shopping',
    icon: ShoppingBag,
    count: 120,
    href: '/businesses?category=shopping',
    color: 'text-secondary-600 bg-secondary-100',
  },
  {
    name: 'Professional',
    icon: Briefcase,
    count: 90,
    href: '/businesses?category=professional',
    color: 'text-info bg-info-light',
  },
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

export function FeaturedCategories() {
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
            Browse businesses by category and discover what Midtown has to offer
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
          {categories.map((category) => (
            <motion.div key={category.name} variants={itemVariants}>
              <Link href={category.href}>
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
                        category.color
                      )}
                    >
                      <category.icon className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="font-serif font-semibold text-heading-xs text-foreground mb-1">
                        {category.name}
                      </h3>
                      <p className="text-label-sm text-muted-foreground">
                        {category.count} businesses
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
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
