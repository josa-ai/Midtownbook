'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header, Footer } from '@/components/layout';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { BusinessCard } from '@/components/business';
import { Home, Search, TrendingUp, HelpCircle, MapPin, Calendar, Tag, ArrowRight } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/businesses?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Mock popular pages
  const popularPages = [
    { title: 'Browse Businesses', href: '/businesses', icon: MapPin },
    { title: 'Upcoming Events', href: '/events', icon: Calendar },
    { title: 'Deals & Offers', href: '/deals', icon: Tag },
    { title: 'Help Center', href: '/help', icon: HelpCircle },
  ];

  // Mock featured businesses
  const featuredBusinesses = [
    {
      id: '1',
      slug: 'sunrise-cafe',
      name: 'Sunrise Café',
      description: 'Cozy neighborhood café',
      category: 'Restaurant',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
      rating: 4.5,
      reviewCount: 24,
      address: '123 Main St, Midtown',
      priceLevel: 2,
      isOpen: true,
      isFeatured: true,
    },
    {
      id: '2',
      slug: 'green-leaf-market',
      name: 'Green Leaf Market',
      description: 'Organic grocery store',
      category: 'Shopping',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800',
      rating: 4.8,
      reviewCount: 156,
      address: '789 Elm St, Midtown',
      priceLevel: 3,
      isOpen: true,
      isFeatured: false,
    },
    {
      id: '3',
      slug: 'garden-bistro',
      name: 'The Garden Bistro',
      description: 'Farm-to-table restaurant',
      category: 'Restaurant',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
      rating: 4.6,
      reviewCount: 142,
      address: '567 Maple Dr, Midtown',
      priceLevel: 3,
      isOpen: true,
      isFeatured: false,
    },
  ];

  // Mock popular categories
  const popularCategories = [
    { name: 'Restaurants', slug: 'restaurants', count: 45 },
    { name: 'Shopping', slug: 'shopping', count: 32 },
    { name: 'Services', slug: 'services', count: 28 },
    { name: 'Health & Fitness', slug: 'health-fitness', count: 19 },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50 py-12">
        <Container size="xl">
          {/* 404 Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-error/10 mb-6">
              <span className="font-serif font-bold text-display-lg text-error">404</span>
            </div>
            <h1 className="font-serif font-bold text-display-lg text-foreground mb-4">
              Page Not Found
            </h1>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
              Try searching for what you need below.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for businesses, categories, or services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-body-md"
                />
                <Button
                  type="submit"
                  variant="primary"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  Search
                </Button>
              </div>
            </form>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" asChild>
                <Link href="/">
                  <Home className="mr-2 h-5 w-5" />
                  Go to Homepage
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/businesses">
                  Browse All Businesses
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Popular Pages */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-5 w-5 text-primary-600" />
              <h2 className="font-serif font-semibold text-heading-lg">Popular Pages</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {popularPages.map((page) => {
                const Icon = page.icon;
                return (
                  <Link key={page.href} href={page.href}>
                    <Card className="hover:border-primary-600 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                            <Icon className="h-5 w-5 text-primary-600" />
                          </div>
                          <span className="font-medium text-body-md">{page.title}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Featured Businesses */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif font-semibold text-heading-lg">Featured Businesses</h2>
              <Button variant="outline" asChild>
                <Link href="/businesses">View All</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredBusinesses.map((business) => (
                <BusinessCard
                  key={business.id}
                  business={business}
                  variant="grid"
                  showActions={false}
                />
              ))}
            </div>
          </div>

          {/* Popular Categories */}
          <div className="mb-12">
            <h2 className="font-serif font-semibold text-heading-lg mb-6">
              Browse by Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {popularCategories.map((category) => (
                <Link key={category.slug} href={`/categories/${category.slug}`}>
                  <Card className="hover:border-primary-600 transition-colors">
                    <CardContent className="p-6 text-center">
                      <h3 className="font-semibold text-body-md mb-1">{category.name}</h3>
                      <p className="text-body-sm text-muted-foreground">
                        {category.count} businesses
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Help Section */}
          <Card className="bg-primary-50 border-primary-200">
            <CardContent className="p-8 text-center">
              <HelpCircle className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h2 className="font-serif font-semibold text-heading-lg mb-2">
                Still can't find what you're looking for?
              </h2>
              <p className="text-body-md text-muted-foreground mb-6 max-w-2xl mx-auto">
                Our help center has answers to common questions, or you can contact our support team for assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" asChild>
                  <Link href="/help">Visit Help Center</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/contact">Contact Support</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </Container>
      </main>
      <Footer />
    </>
  );
}
