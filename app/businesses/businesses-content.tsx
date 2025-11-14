'use client';

import * as React from 'react';
import { Search, SlidersHorizontal, Grid, List } from 'lucide-react';
import { BusinessCard } from '@/components/business/business-card';
import { FilterPanel, FilterGroup } from '@/components/business/filter-panel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { EmptyState } from '@/components/ui/empty-state';
import { Skeleton } from '@/components/ui/skeleton';

// Mock data - replace with actual data fetching
const mockBusinesses = [
  {
    id: '1',
    slug: 'sunrise-cafe',
    name: 'Sunrise Café',
    description: 'Cozy neighborhood café serving fresh pastries and artisan coffee',
    category: 'Restaurant',
    address: '123 Main St, Midtown',
    coverImageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
    logoUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=200',
    rating: 4.5,
    reviewCount: 127,
    isOpen: true,
    isFeatured: true,
    isVerified: true,
  },
  {
    id: '2',
    slug: 'tech-repair-pro',
    name: 'Tech Repair Pro',
    description: 'Expert electronics repair and IT services',
    category: 'Services',
    address: '456 Oak Ave, Midtown',
    coverImageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
    rating: 4.8,
    reviewCount: 89,
    isOpen: true,
    isVerified: true,
  },
  {
    id: '3',
    slug: 'style-studio',
    name: 'Style Studio',
    description: 'Modern hair salon and beauty services',
    category: 'Beauty',
    address: '789 Elm St, Midtown',
    coverImageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800',
    rating: 4.6,
    reviewCount: 203,
    isOpen: false,
    isVerified: true,
  },
];

const filterGroups: FilterGroup[] = [
  {
    id: 'category',
    label: 'Category',
    type: 'checkbox',
    options: [
      { id: 'restaurant', label: 'Restaurants', count: 45 },
      { id: 'services', label: 'Services', count: 32 },
      { id: 'beauty', label: 'Beauty & Wellness', count: 28 },
      { id: 'retail', label: 'Retail', count: 56 },
      { id: 'entertainment', label: 'Entertainment', count: 19 },
    ],
  },
  {
    id: 'rating',
    label: 'Rating',
    type: 'checkbox',
    options: [
      { id: '5', label: '5 stars', count: 12 },
      { id: '4', label: '4+ stars', count: 48 },
      { id: '3', label: '3+ stars', count: 89 },
    ],
  },
  {
    id: 'features',
    label: 'Features',
    type: 'checkbox',
    options: [
      { id: 'verified', label: 'Verified', count: 67 },
      { id: 'featured', label: 'Featured', count: 23 },
      { id: 'open_now', label: 'Open Now', count: 45 },
    ],
  },
];

export function BusinessesContent() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedFilters, setSelectedFilters] = React.useState<Record<string, string[]>>({});
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleFilterChange = (groupId: string, values: string[]) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [groupId]: values,
    }));
  };

  const handleClearAll = () => {
    setSelectedFilters({});
  };

  const filteredBusinesses = mockBusinesses.filter((business) => {
    // Search filter
    if (searchQuery && !business.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-serif font-bold text-display-md text-foreground mb-2">
          Browse Businesses
        </h1>
        <p className="text-body-lg text-muted-foreground">
          Discover {mockBusinesses.length} local businesses in Midtown
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6 flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search businesses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Mobile Filter Toggle */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="md" className="lg:hidden">
              <SlidersHorizontal className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <FilterPanel
              filters={filterGroups}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
              onClearAll={handleClearAll}
              variant="sheet"
            />
          </SheetContent>
        </Sheet>

        {/* View Mode Toggle */}
        <div className="hidden sm:flex gap-1 border border-border rounded-lg p-1">
          <Button
            variant={viewMode === 'grid' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Desktop Only */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <FilterPanel
              filters={filterGroups}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
              onClearAll={handleClearAll}
              variant="sidebar"
            />
          </div>
        </aside>

        {/* Business List */}
        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-48 rounded-lg" />
              ))}
            </div>
          ) : filteredBusinesses.length === 0 ? (
            <EmptyState
              icon={Search}
              title="No businesses found"
              description="Try adjusting your search or filters"
              action={{
                label: 'Clear Filters',
                onClick: handleClearAll,
              }}
            />
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {filteredBusinesses.map((business) => (
                <BusinessCard
                  key={business.id}
                  business={business}
                  variant={viewMode === 'grid' ? 'grid' : 'list'}
                  showActions
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
