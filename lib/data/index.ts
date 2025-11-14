/**
 * Data access layer exports
 * Centralized exports for all data access functions
 */

export {
  getBusinesses,
  getBusinessBySlug,
  getNearbyBusinesses,
  getFeaturedBusinesses,
  getBusinessReviews,
  incrementViewCount,
  getRelatedBusinesses,
  type BusinessWithDetails,
  type GetBusinessesOptions,
  type PaginatedBusinesses,
} from './businesses';

export {
  getCategories,
  getCategoryBySlug,
  getCategoryById,
  getTopCategories,
  type CategoryWithCount,
} from './categories';
