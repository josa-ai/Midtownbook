/**
 * Category data access layer
 * Functions for fetching and managing category data from Supabase
 */

import { createClient } from '@/lib/supabase/server';
import { Category } from '@/lib/types/database';

export interface CategoryWithCount extends Category {
  business_count: number;
}

/**
 * Get all categories with business counts
 */
export async function getCategories(): Promise<CategoryWithCount[]> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('categories')
      .select(
        `
        *,
        businesses(count)
      `
      )
      .eq('is_active', true)
      .order('order', { ascending: true });

    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }

    // Transform data to include business count
    const categories: CategoryWithCount[] = (data || []).map((category: any) => ({
      ...category,
      business_count: category.businesses?.[0]?.count || 0,
    }));

    return categories;
  } catch (error) {
    console.error('Unexpected error in getCategories:', error);
    return [];
  }
}

/**
 * Get a single category by slug with business count
 */
export async function getCategoryBySlug(slug: string): Promise<CategoryWithCount | null> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('categories')
      .select(
        `
        *,
        businesses(count)
      `
      )
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error || !data) {
      console.error('Error fetching category:', error);
      return null;
    }

    return {
      ...data,
      business_count: data.businesses?.[0]?.count || 0,
    };
  } catch (error) {
    console.error('Unexpected error in getCategoryBySlug:', error);
    return null;
  }
}

/**
 * Get category by ID
 */
export async function getCategoryById(id: string): Promise<Category | null> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (error || !data) {
      console.error('Error fetching category by ID:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error in getCategoryById:', error);
    return null;
  }
}

/**
 * Get top categories by business count
 */
export async function getTopCategories(limit: number = 8): Promise<CategoryWithCount[]> {
  try {
    const categories = await getCategories();

    // Sort by business count and take top N
    return categories
      .sort((a, b) => b.business_count - a.business_count)
      .slice(0, limit);
  } catch (error) {
    console.error('Unexpected error in getTopCategories:', error);
    return [];
  }
}
