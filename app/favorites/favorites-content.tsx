'use client';

import * as React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BusinessCard } from '@/components/business';
import { EmptyState } from '@/components/ui/empty-state';
import { Heart, Search, Grid, List, Folder, ArrowRight } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface FavoritesBusiness {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
  address: string;
  priceLevel: number;
  isOpen: boolean;
  isFeatured: boolean;
  savedAt: Date;
  collection?: string;
}

interface FavoritesContentProps {
  user: User;
}

export function FavoritesContent({ user }: FavoritesContentProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = React.useState('recent');
  const [activeCollection, setActiveCollection] = React.useState('all');
  const [selectedBusinesses, setSelectedBusinesses] = React.useState<string[]>([]);

  // Mock favorites data
  const mockFavorites: FavoritesBusiness[] = [
    {
      id: '1',
      slug: 'sunrise-cafe',
      name: 'Sunrise Café',
      description: 'Cozy neighborhood café serving artisan coffee and fresh pastries daily.',
      category: 'Restaurant',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
      rating: 4.5,
      reviewCount: 24,
      address: '123 Main St, Midtown, CA 94102',
      priceLevel: 2,
      isOpen: true,
      isFeatured: true,
      savedAt: new Date('2024-01-15'),
      collection: 'restaurants',
    },
    {
      id: '2',
      slug: 'green-leaf-market',
      name: 'Green Leaf Market',
      description: 'Organic grocery store with locally sourced produce and sustainable products.',
      category: 'Shopping',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800',
      rating: 4.8,
      reviewCount: 156,
      address: '789 Elm St, Midtown, CA 94102',
      priceLevel: 3,
      isOpen: true,
      isFeatured: false,
      savedAt: new Date('2024-01-12'),
      collection: 'shopping',
    },
    {
      id: '3',
      slug: 'midtown-yoga',
      name: 'Midtown Yoga Studio',
      description: 'Peaceful yoga studio offering classes for all levels.',
      category: 'Health & Fitness',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
      rating: 4.9,
      reviewCount: 89,
      address: '456 Oak Ave, Midtown, CA 94102',
      priceLevel: 2,
      isOpen: false,
      isFeatured: false,
      savedAt: new Date('2024-01-10'),
      collection: 'wellness',
    },
    {
      id: '4',
      slug: 'the-book-nook',
      name: 'The Book Nook',
      description: 'Independent bookstore with curated selection and cozy reading spaces.',
      category: 'Shopping',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800',
      rating: 4.7,
      reviewCount: 67,
      address: '321 Pine St, Midtown, CA 94102',
      priceLevel: 2,
      isOpen: true,
      isFeatured: true,
      savedAt: new Date('2024-01-08'),
      collection: 'shopping',
    },
    {
      id: '5',
      slug: 'garden-bistro',
      name: 'The Garden Bistro',
      description: 'Farm-to-table restaurant with seasonal menus and outdoor seating.',
      category: 'Restaurant',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
      rating: 4.6,
      reviewCount: 142,
      address: '567 Maple Dr, Midtown, CA 94102',
      priceLevel: 3,
      isOpen: true,
      isFeatured: false,
      savedAt: new Date('2024-01-05'),
      collection: 'restaurants',
    },
  ];

  const collections = [
    { id: 'all', name: 'All Favorites', count: mockFavorites.length },
    { id: 'restaurants', name: 'Restaurants', count: mockFavorites.filter(f => f.collection === 'restaurants').length },
    { id: 'shopping', name: 'Shopping', count: mockFavorites.filter(f => f.collection === 'shopping').length },
    { id: 'wellness', name: 'Wellness', count: mockFavorites.filter(f => f.collection === 'wellness').length },
  ];

  const filterFavorites = (favorites: FavoritesBusiness[]) => {
    let filtered = [...favorites];

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(
        (f) =>
          f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by collection
    if (activeCollection !== 'all') {
      filtered = filtered.filter((f) => f.collection === activeCollection);
    }

    // Sort
    if (sortBy === 'recent') {
      filtered.sort((a, b) => b.savedAt.getTime() - a.savedAt.getTime());
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  };

  const filteredFavorites = filterFavorites(mockFavorites);

  const handleRemoveFavorite = (businessId: string) => {
    // TODO: Implement Supabase favorite removal
    console.log('Remove favorite:', businessId);
  };

  const handleBulkRemove = () => {
    // TODO: Implement Supabase bulk favorite removal
    console.log('Remove favorites:', selectedBusinesses);
    setSelectedBusinesses([]);
  };

  const toggleBusinessSelection = (businessId: string) => {
    setSelectedBusinesses((prev) =>
      prev.includes(businessId)
        ? prev.filter((id) => id !== businessId)
        : [...prev, businessId]
    );
  };

  return (
    <div className="py-12">
      <Container size="xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
              <Heart className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h1 className="font-serif font-bold text-display-md text-foreground">
                My Favorites
              </h1>
              <p className="text-body-md text-muted-foreground">
                {mockFavorites.length} saved business{mockFavorites.length !== 1 ? 'es' : ''}
              </p>
            </div>
          </div>
        </div>

        {/* Collections */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Folder className="h-5 w-5 text-muted-foreground" />
            <h2 className="font-semibold text-heading-sm">Collections</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {collections.map((collection) => (
              <Button
                key={collection.id}
                variant={activeCollection === collection.id ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setActiveCollection(collection.id)}
              >
                {collection.name} ({collection.count})
              </Button>
            ))}
          </div>
        </div>

        {/* Search and Controls */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search your favorites..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Recently Saved</SelectItem>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {selectedBusinesses.length > 0 && (
              <div className="mt-4 flex items-center justify-between p-3 rounded-lg bg-primary-50 border border-primary-200">
                <p className="text-body-sm font-medium">
                  {selectedBusinesses.length} business{selectedBusinesses.length !== 1 ? 'es' : ''} selected
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setSelectedBusinesses([])}>
                    Clear Selection
                  </Button>
                  <Button variant="destructive" size="sm" onClick={handleBulkRemove}>
                    Remove Selected
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Favorites Grid/List */}
        {filteredFavorites.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredFavorites.map((business) => (
              <div key={business.id} className="relative">
                <BusinessCard
                  business={business}
                  variant={viewMode === 'grid' ? 'grid' : 'list'}
                  onFavorite={() => handleRemoveFavorite(business.id)}
                  isFavorited={true}
                  showActions
                />
                {viewMode === 'grid' && (
                  <div className="absolute top-4 left-4">
                    <input
                      type="checkbox"
                      checked={selectedBusinesses.includes(business.id)}
                      onChange={() => toggleBusinessSelection(business.id)}
                      className="w-5 h-5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Heart}
            title={searchQuery ? 'No matching favorites' : 'No favorites yet'}
            description={
              searchQuery
                ? `No favorites match "${searchQuery}". Try a different search term.`
                : 'Start saving businesses you love to easily find them later.'
            }
            action={
              searchQuery ? (
                <Button variant="outline" onClick={() => setSearchQuery('')}>
                  Clear Search
                </Button>
              ) : (
                <Button variant="primary" asChild>
                  <Link href="/businesses">
                    Explore Businesses
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              )
            }
          />
        )}

        {/* Tips Card */}
        {filteredFavorites.length > 0 && (
          <Card className="mt-8">
            <CardContent className="p-6">
              <h3 className="font-semibold text-heading-sm mb-4">Organize Your Favorites</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Folder className="h-4 w-4 text-primary-600" />
                    <h4 className="font-medium text-body-sm">Create Collections</h4>
                  </div>
                  <p className="text-body-sm text-muted-foreground">
                    Group your favorites into custom collections like "Date Night" or "Weekend Brunch"
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="h-4 w-4 text-primary-600" />
                    <h4 className="font-medium text-body-sm">Get Notifications</h4>
                  </div>
                  <p className="text-body-sm text-muted-foreground">
                    Receive updates when your favorite businesses post new deals or events
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <ArrowRight className="h-4 w-4 text-primary-600" />
                    <h4 className="font-medium text-body-sm">Share Lists</h4>
                  </div>
                  <p className="text-body-sm text-muted-foreground">
                    Share your curated lists with friends and family
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </Container>
    </div>
  );
}
