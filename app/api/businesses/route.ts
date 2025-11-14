import { NextRequest, NextResponse } from 'next/server';
import { getBusinesses, GetBusinessesOptions } from '@/lib/data/businesses';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Build options from query params
    const options: GetBusinessesOptions = {
      search: searchParams.get('search') || undefined,
      category: searchParams.get('category') || undefined,
      sortBy: (searchParams.get('sortBy') as any) || 'created_at',
      sortOrder: (searchParams.get('sortOrder') as any) || 'desc',
      limit: parseInt(searchParams.get('limit') || '12'),
      offset: parseInt(searchParams.get('offset') || '0'),
    };

    // Parse rating
    const rating = searchParams.get('rating');
    if (rating) {
      options.rating = parseFloat(rating);
    }

    // Parse price range
    const priceRange = searchParams.get('priceRange');
    if (priceRange) {
      options.priceRange = priceRange.split(',').map(Number);
    }

    // Parse featured flag
    const isFeatured = searchParams.get('isFeatured');
    if (isFeatured === 'true') {
      options.isFeatured = true;
    }

    // Fetch businesses
    const result = await getBusinesses(options);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in businesses API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch businesses', businesses: [], total: 0, hasMore: false },
      { status: 500 }
    );
  }
}
