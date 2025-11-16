/**
 * Analytics exports
 * Centralized export for all analytics functionality
 */

// Core tracking functions
export {
  pageview,
  event,
  trackBusinessView,
  trackBusinessInteraction,
  trackDealView,
  trackDealClick,
  trackEventView,
  trackSearch,
  trackFilter,
  trackAttractionView,
  trackBusinessClaim,
  trackReviewSubmit,
  trackNewsletterSignup,
  isAnalyticsEnabled,
  GA_MEASUREMENT_ID,
} from './gtag';

// Types
export type {
  AnalyticsEvent,
  AnalyticsEventParams,
  AnalyticsConfig,
} from './types';

export {
  CUSTOM_DIMENSIONS,
  CONVERSION_EVENTS,
} from './types';
