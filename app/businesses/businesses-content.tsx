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
import { BusinessWithDetails } from '@/lib/data/businesses';
import { CategoryWithCount } from '@/lib/data/categories';

interface BusinessesContentProps {
  initialBusinesses: BusinessWithDetails[];
  initialCategories: CategoryWithCount[];
  initialTotal: number;
}

export function BusinessesContent({
  initialBusinesses,
  initialCategories,
  initialTotal,
}: BusinessesContentProps) {
  const [businesses, setBusinesses] = React.useState<BusinessWithDetails[]>(initialBusinesses);
  const [categories] = React.useState<CategoryWithCount[]>(initialCategories);
  const [total, setTotal] = React.useState(initialTotal);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedFilters, setSelectedFilters] = React.useState<Record<string, string[]>>({});
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = React.useState(false);
  const [sortBy, setSortBy] = React.useState<'name' | 'rating' | 'created_at' | 'view_count' | 'distance_to_park' | 'distance_to_stadium'>('created_at');
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 12;

  const fetchBusinesses = React.useCallback(async () => {
    setIsLoading(true);
    try {
      // Build query params
      const params = new URLSearchParams({
        sortBy,
        sortOrder: 'desc',
        limit: itemsPerPage.toString(),
        offset: ((currentPage - 1) * itemsPerPage).toString(),
      });

      if (searchQuery) {
        params.set('search', searchQuery);
      }

      // Apply category filter
      if (selectedFilters.category?.length > 0) {
        params.set('category', selectedFilters.category[0]);
      }

      // Apply rating filter
      if (selectedFilters.rating?.length > 0) {
        const minRating = Math.min(...selectedFilters.rating.map(Number));
        params.set('rating', minRating.toString());
      }

      // Apply price range filter
      if (selectedFilters.price_range?.length > 0) {
        params.set('priceRange', selectedFilters.price_range.join(','));
      }

      // Apply featured filter
      if (selectedFilters.features?.includes('featured')) {
        params.set('isFeatured', 'true');
      }

      // Apply Mid-Town location filters
      if (selectedFilters.midtown_location?.includes('park_adjacent')) {
        params.set('isParkAdjacent', 'true');
      }
      if (selectedFilters.midtown_location?.includes('game_day_venue')) {
        params.set('isGameDayVenue', 'true');
      }
      if (selectedFilters.midtown_location?.includes('memorial_boulevard')) {
        params.set('memorialBoulevard', 'true');
      }

      // Fetch from API route
      const response = await fetch(`/api/businesses?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch businesses');

      const result = await response.json();
      setBusinesses(result.businesses);
      setTotal(result.total);
    } catch (error) {
      console.error('Error fetching businesses:', error);
      setBusinesses([]);
      setTotal(0);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, selectedFilters, sortBy, currentPage]);

  // Fetch businesses when filters or search change
  React.useEffect(() => {
    fetchBusinesses();
  }, [fetchBusinesses]);

  // Build filter groups from categories
  const filterGroups: FilterGroup[] = React.useMemo(() => {
    const groups: FilterGroup[] = [];

    // Category filter
    if (categories.length > 0) {
      groups.push({
        id: 'category',
        label: 'Category',
        type: 'radio',
        options: categories.map((cat) => ({
          id: cat.id,
          label: cat.name,
          count: cat.business_count,
        })),
      });
    }

    // Rating filter
    groups.push({
      id: 'rating',
      label: 'Minimum Rating',
      type: 'radio',
      options: [
        { id: '4', label: '4+ stars' },
        { id: '3', label: '3+ stars' },
        { id: '2', label: '2+ stars' },
      ],
    });

    // Price range filter
    groups.push({
      id: 'price_range',
      label: 'Price Range',
      type: 'checkbox',
      options: [
        { id: '1', label: '$' },
        { id: '2', label: '$$' },
        { id: '3', label: '$$$' },
        { id: '4', label: '$$$$' },
      ],
    });

    // Mid-Town Location filter
    groups.push({
      id: 'midtown_location',
      label: 'Mid-Town Location',
      type: 'checkbox',
      options: [
        { id: 'park_adjacent', label: 'Near Bonnet Springs Park' },
        { id: 'game_day_venue', label: 'Near Tigers Stadium' },
        { id: 'memorial_boulevard', label: 'Memorial Boulevard' },
      ],
    });

    // Features filter
    groups.push({
      id: 'features',
      label: 'Features',
      type: 'checkbox',
      options: [
        { id: 'verified', label: 'Verified' },
        { id: 'featured', label: 'Featured' },
      ],
    });

    return groups;
  }, [categories]);

  const handleFilterChange = (groupId: string, values: string[]) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [groupId]: values,
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleClearAll = () => {
    setSelectedFilters({});
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(total / itemsPerPage);

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-serif font-bold text-display-md text-foreground mb-2">
          Browse Businesses
        </h1>
        <p className="text-body-lg text-muted-foreground">
          Discover {total} local businesses in Midtown
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
            onChange={(e) => handleSearch(e.target.value)}
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

      {/* Sort Options */}
      <div className="mb-6 flex items-center gap-4">
        <span className="text-body-sm text-muted-foreground">Sort by:</span>
        <div className="flex gap-2">
          <Button
            variant={sortBy === 'created_at' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setSortBy('created_at')}
          >
            Newest
          </Button>
          <Button
            variant={sortBy === 'rating' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setSortBy('rating')}
          >
            Rating
          </Button>
          <Button
            variant={sortBy === 'name' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setSortBy('name')}
          >
            Name
          </Button>
          <Button
            variant={sortBy === 'view_count' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setSortBy('view_count')}
          >
            Popular
          </Button>
          <Button
            variant={sortBy === 'distance_to_park' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setSortBy('distance_to_park')}
          >
            Near Park
          </Button>
          <Button
            variant={sortBy === 'distance_to_stadium' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setSortBy('distance_to_stadium')}
          >
            Near Stadium
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
          ) : businesses.length === 0 ? (
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
            <>
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {businesses.map((business) => (
                  <BusinessCard
                    key={business.id}
                    business={{
                      id: business.id,
                      slug: business.slug,
                      name: business.name,
                      description: business.description || undefined,
                      category: business.category.name,
                      logoUrl: business.logo_url || undefined,
                      coverImageUrl: business.cover_image_url || undefined,
                      rating: business.average_rating || undefined,
                      reviewCount: business.review_count,
                      address: `${business.address}, ${business.city}`,
                      phone: business.phone || undefined,
                      priceRange: business.price_range || undefined,
                      isFeatured: business.is_featured,
                      // Mid-Town positioning
                      isParkAdjacent: business.is_park_adjacent || false,
                      isGameDayVenue: business.is_game_day_venue || false,
                      distanceToPark: business.distance_to_bonnet_springs || undefined,
                      distanceToStadium: business.distance_to_tigers_stadium || undefined,
                    }}
                    variant={viewMode === 'grid' ? 'grid' : 'list'}
                    showActions
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1 || isLoading}
                  >
                    Previous
                  </Button>
                  <span className="text-body-sm text-muted-foreground px-4">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages || isLoading}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
