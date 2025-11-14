import * as React from 'react';
import { getFeaturedBusinesses } from '@/lib/data/businesses';
import { FeaturedBusinessesClient } from './featured-businesses-client';

export async function FeaturedBusinesses() {
  const businesses = await getFeaturedBusinesses(6);

  return <FeaturedBusinessesClient businesses={businesses} />;
}
