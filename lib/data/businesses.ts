/**
 * Business data access layer
 * Functions for fetching and managing business data from Supabase
 */

import { createClient } from '@/lib/supabase/server';
import { Business, Category } from '@/lib/types/database';

// Extended business type with calculated fields
export interface BusinessWithDetails extends Business {
  category: Category;
  average_rating: number | null;
  review_count: number;
}

export interface GetBusinessesOptions {
  category?: string;
  rating?: number;
  priceRange?: number[];
  isFeatured?: boolean;
  search?: string;
  sortBy?: 'name' | 'rating' | 'created_at' | 'view_count';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

export interface PaginatedBusinesses {
  businesses: BusinessWithDetails[];
  total: number;
  hasMore: boolean;
}

/**
 * Get businesses with filtering, sorting, and pagination
 */
export async function getBusinesses(
  options: GetBusinessesOptions = {}
): Promise<PaginatedBusinesses> {
  try {
    const supabase = await createClient();
    const {
      category,
      rating,
      priceRange,
      isFeatured,
      search,
      sortBy = 'created_at',
      sortOrder = 'desc',
      limit = 12,
      offset = 0,
    } = options;

    // Start building the query
    let query = supabase
      .from('businesses')
      .select(
        `
        *,
        category:categories!businesses_category_id_fkey(*),
        reviews(rating)
      `,
        { count: 'exact' }
      )
      .eq('is_active', true);

    // Apply filters
    if (category) {
      query = query.eq('category_id', category);
    }

    if (isFeatured !== undefined) {
      query = query.eq('is_featured', isFeatured);
    }

    if (priceRange && priceRange.length > 0) {
      query = query.in('price_range', priceRange);
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    // Apply sorting
    if (sortBy === 'name') {
      query = query.order('name', { ascending: sortOrder === 'asc' });
    } else if (sortBy === 'view_count') {
      query = query.order('view_count', { ascending: sortOrder === 'asc' });
    } else if (sortBy === 'created_at') {
      query = query.order('created_at', { ascending: sortOrder === 'asc' });
    }

    // Apply pagination
    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching businesses:', error);
      return { businesses: [], total: 0, hasMore: false };
    }

    // Calculate ratings and transform data
    const businesses: BusinessWithDetails[] = (data || []).map((business: any) => {
      const reviews = business.reviews || [];
      const ratings = reviews.map((r: any) => r.rating).filter((r: number) => r != null);
      const average_rating = ratings.length > 0
        ? ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length
        : null;

      return {
        ...business,
        category: business.category,
        average_rating,
        review_count: reviews.length,
      };
    });

    // Filter by rating if specified (post-query filtering for calculated fields)
    let filteredBusinesses = businesses;
    if (rating !== undefined) {
      filteredBusinesses = businesses.filter(
        (b) => b.average_rating !== null && b.average_rating >= rating
      );
    }

    // Sort by rating if specified (post-query sorting for calculated fields)
    if (sortBy === 'rating') {
      filteredBusinesses.sort((a, b) => {
        const ratingA = a.average_rating ?? 0;
        const ratingB = b.average_rating ?? 0;
        return sortOrder === 'asc' ? ratingA - ratingB : ratingB - ratingA;
      });
    }

    const total = count || 0;
    const hasMore = offset + limit < total;

    return {
      businesses: filteredBusinesses,
      total,
      hasMore,
    };
  } catch (error) {
    console.error('Unexpected error in getBusinesses:', error);
    return { businesses: [], total: 0, hasMore: false };
  }
}

/**
 * Get a single business by slug with full details
 */
export async function getBusinessBySlug(
  slug: string
): Promise<BusinessWithDetails | null> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('businesses')
      .select(
        `
        *,
        category:categories!businesses_category_id_fkey(*),
        reviews(rating)
      `
      )
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error || !data) {
      console.error('Error fetching business:', error);
      return null;
    }

    // Calculate ratings
    const reviews = data.reviews || [];
    const ratings = reviews.map((r: any) => r.rating).filter((r: number) => r != null);
    const average_rating = ratings.length > 0
      ? ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length
      : null;

    return {
      ...data,
      category: data.category,
      average_rating,
      review_count: reviews.length,
    };
  } catch (error) {
    console.error('Unexpected error in getBusinessBySlug:', error);
    return null;
  }
}

/**
 * Get businesses near a location using Haversine formula
 */
export async function getNearbyBusinesses(
  lat: number,
  lng: number,
  radiusKm: number = 5,
  limit: number = 10
): Promise<BusinessWithDetails[]> {
  try {
    const supabase = await createClient();

    // Note: For production, consider using PostGIS extension for better performance
    // This uses a simple bounding box approach
    const latDelta = radiusKm / 111.32; // 1 degree latitude ≈ 111.32 km
    const lngDelta = radiusKm / (111.32 * Math.cos((lat * Math.PI) / 180));

    const { data, error } = await supabase
      .from('businesses')
      .select(
        `
        *,
        category:categories!businesses_category_id_fkey(*),
        reviews(rating)
      `
      )
      .eq('is_active', true)
      .gte('latitude', lat - latDelta)
      .lte('latitude', lat + latDelta)
      .gte('longitude', lng - lngDelta)
      .lte('longitude', lng + lngDelta)
      .limit(limit);

    if (error || !data) {
      console.error('Error fetching nearby businesses:', error);
      return [];
    }

    // Calculate distance and ratings for each business
    const businesses: BusinessWithDetails[] = data.map((business: any) => {
      const reviews = business.reviews || [];
      const ratings = reviews.map((r: any) => r.rating).filter((r: number) => r != null);
      const average_rating = ratings.length > 0
        ? ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length
        : null;

      // Calculate actual distance using Haversine formula
      const R = 6371; // Earth's radius in km
      const dLat = ((business.latitude - lat) * Math.PI) / 180;
      const dLng = ((business.longitude - lng) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat * Math.PI) / 180) *
          Math.cos((business.latitude * Math.PI) / 180) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;

      return {
        ...business,
        category: business.category,
        average_rating,
        review_count: reviews.length,
        distance,
      };
    });

    // Filter by actual radius and sort by distance
    return businesses
      .filter((b: any) => b.distance <= radiusKm)
      .sort((a: any, b: any) => a.distance - b.distance);
  } catch (error) {
    console.error('Unexpected error in getNearbyBusinesses:', error);
    return [];
  }
}

/**
 * Get featured businesses for homepage
 */
export async function getFeaturedBusinesses(
  limit: number = 6
): Promise<BusinessWithDetails[]> {
  try {
    const result = await getBusinesses({
      isFeatured: true,
      sortBy: 'view_count',
      sortOrder: 'desc',
      limit,
    });

    return result.businesses;
  } catch (error) {
    console.error('Unexpected error in getFeaturedBusinesses:', error);
    return [];
  }
}

/**
 * Get reviews for a business
 */
export async function getBusinessReviews(
  businessId: string,
  limit: number = 10,
  offset: number = 0
) {
  try {
    const supabase = await createClient();

    const { data, error, count } = await supabase
      .from('reviews')
      .select(
        `
        *,
        user:profiles!reviews_user_id_fkey(id, full_name, avatar_url)
      `,
        { count: 'exact' }
      )
      .eq('business_id', businessId)
      .eq('is_approved', true)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Error fetching reviews:', error);
      return { reviews: [], total: 0, hasMore: false };
    }

    return {
      reviews: data || [],
      total: count || 0,
      hasMore: offset + limit < (count || 0),
    };
  } catch (error) {
    console.error('Unexpected error in getBusinessReviews:', error);
    return { reviews: [], total: 0, hasMore: false };
  }
}

/**
 * Increment view count for a business
 */
export async function incrementViewCount(businessId: string): Promise<boolean> {
  try {
    const supabase = await createClient();

    const { error } = await supabase.rpc('increment_view_count', {
      business_id: businessId,
    });

    if (error) {
      // If RPC function doesn't exist, fallback to manual increment
      const { data: business } = await supabase
        .from('businesses')
        .select('view_count')
        .eq('id', businessId)
        .single();

      if (business) {
        await supabase
          .from('businesses')
          .update({ view_count: (business.view_count || 0) + 1 })
          .eq('id', businessId);
      }
    }

    return true;
  } catch (error) {
    console.error('Error incrementing view count:', error);
    return false;
  }
}

/**
 * Get related businesses from the same category
 */
export async function getRelatedBusinesses(
  categoryId: string,
  excludeBusinessId: string,
  limit: number = 3
): Promise<BusinessWithDetails[]> {
  try {
    const result = await getBusinesses({
      category: categoryId,
      sortBy: 'rating',
      sortOrder: 'desc',
      limit: limit + 1, // Get one extra to filter out current business
    });

    // Filter out the current business
    return result.businesses
      .filter((b) => b.id !== excludeBusinessId)
      .slice(0, limit);
  } catch (error) {
    console.error('Unexpected error in getRelatedBusinesses:', error);
    return [];
  }
}
