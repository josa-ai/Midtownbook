'use client';

import * as React from 'react';
import { Header, Footer } from '@/components/layout';
import { Container } from '@/components/ui/container';
import { CategoryGrid, Category } from '@/components/business/category-grid';
import { Store, Utensils, Scissors, Wrench, Music, Dumbbell, ShoppingBag, Briefcase } from 'lucide-react';

// Mock categories data
const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Restaurants',
    slug: 'restaurants',
    icon: Utensils,
    count: 45,
    description: 'Dining, cafes, and food services',
    color: 'from-primary-400 to-accent-500',
  },
  {
    id: '2',
    name: 'Retail',
    slug: 'retail',
    icon: ShoppingBag,
    count: 56,
    description: 'Shops and boutiques',
    color: 'from-secondary-400 to-secondary-600',
  },
  {
    id: '3',
    name: 'Beauty & Wellness',
    slug: 'beauty-wellness',
    icon: Scissors,
    count: 28,
    description: 'Salons, spas, and wellness centers',
    color: 'from-accent-400 to-accent-600',
  },
  {
    id: '4',
    name: 'Services',
    slug: 'services',
    icon: Wrench,
    count: 32,
    description: 'Professional and home services',
    color: 'from-primary-500 to-primary-700',
  },
  {
    id: '5',
    name: 'Entertainment',
    slug: 'entertainment',
    icon: Music,
    count: 19,
    description: 'Events, venues, and activities',
    color: 'from-accent-500 to-primary-500',
  },
  {
    id: '6',
    name: 'Fitness',
    slug: 'fitness',
    icon: Dumbbell,
    count: 24,
    description: 'Gyms, studios, and fitness centers',
    color: 'from-secondary-500 to-secondary-700',
  },
  {
    id: '7',
    name: 'Shopping',
    slug: 'shopping',
    icon: Store,
    count: 41,
    description: 'Stores and marketplaces',
    color: 'from-primary-400 to-secondary-500',
  },
  {
    id: '8',
    name: 'Professional',
    slug: 'professional',
    icon: Briefcase,
    count: 37,
    description: 'Business and professional services',
    color: 'from-neutral-600 to-neutral-800',
  },
];

export default function CategoriesPage() {
  React.useEffect(() => {
    document.title = 'Browse Categories - Midtown Book';
  }, []);
  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50 py-12">
        <Container size="xl">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="font-serif font-bold text-display-lg text-foreground mb-4">
              Browse by Category
            </h1>
            <p className="text-body-xl text-muted-foreground max-w-2xl mx-auto">
              Discover local businesses organized by industry and service type
            </p>
          </div>

          {/* Categories Grid */}
          <CategoryGrid
            categories={mockCategories}
            columns={4}
            showCount
            showDescription
          />
        </Container>
      </main>
      <Footer />
    </>
  );
}
