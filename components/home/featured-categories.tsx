import * as React from 'react';
import { getTopCategories } from '@/lib/data/categories';
import { FeaturedCategoriesClient } from './featured-categories-client';

export async function FeaturedCategories() {
  const categories = await getTopCategories(8);

  return <FeaturedCategoriesClient categories={categories} />;
}
