/**
 * Analytics event types and tracking configuration
 * For Google Analytics 4 and custom event tracking
 */

// Event names for GA4
export type AnalyticsEvent =
  // Business interactions
  | 'view_business'
  | 'click_business_phone'
  | 'click_business_website'
  | 'click_business_directions'
  | 'click_business_email'
  | 'view_business_hours'
  | 'business_claim_started'
  | 'business_claim_completed'

  // Deal interactions
  | 'view_deal'
  | 'click_deal_redeem'
  | 'show_your_ticket_deal_viewed'
  | 'show_your_ticket_deal_clicked'
  | 'deal_shared'

  // Event interactions
  | 'view_event'
  | 'click_event_register'
  | 'park_event_viewed'
  | 'tigers_game_viewed'

  // Search and discovery
  | 'search_performed'
  | 'filter_applied'
  | 'category_selected'
  | 'park_adjacent_filter'
  | 'game_day_filter'

  // Navigation
  | 'page_view'
  | 'attraction_page_viewed'
  | 'bonnet_springs_page_viewed'
  | 'tigers_stadium_page_viewed'

  // User actions
  | 'review_submitted'
  | 'business_favorited'
  | 'newsletter_signup'
  | 'account_created';

// Event parameters
export interface AnalyticsEventParams {
  // Business-related parameters
  business_id?: string;
  business_name?: string;
  business_category?: string;
  business_slug?: string;
  distance_to_park?: number;
  distance_to_stadium?: number;
  is_park_adjacent?: boolean;
  is_game_day_venue?: boolean;
  memorial_boulevard?: boolean;

  // Deal-related parameters
  deal_id?: string;
  deal_category?: 'standard' | 'show_your_ticket' | 'park_visitor' | 'game_day' | 'memorial_boulevard_special';
  deal_type?: 'percentage' | 'fixed' | 'bogo' | 'other';
  deal_value?: number;

  // Event-related parameters
  event_id?: string;
  event_type?: 'general' | 'park_event' | 'tigers_game' | 'memorial_boulevard_event' | 'neighborhood_activity';
  event_date?: string;
  related_attraction?: 'bonnet_springs_park' | 'tigers_stadium' | 'memorial_boulevard';

  // Search parameters
  search_term?: string;
  filter_type?: string;
  filter_value?: string;
  results_count?: number;

  // Page parameters
  page_path?: string;
  page_title?: string;

  // Custom dimensions
  user_type?: 'visitor' | 'business_owner' | 'admin';
  session_id?: string;

  // Generic parameters
  value?: number;
  currency?: string;
  method?: string;
  [key: string]: string | number | boolean | undefined;
}

// Configuration for GA4
export interface AnalyticsConfig {
  measurementId: string;
  debug?: boolean;
  anonymizeIp?: boolean;
  cookieFlags?: string;
}

// Custom dimensions for Mid-Town positioning
export const CUSTOM_DIMENSIONS = {
  DISTANCE_TO_PARK: 'distance_to_bonnet_springs',
  DISTANCE_TO_STADIUM: 'distance_to_tigers_stadium',
  IS_PARK_ADJACENT: 'is_park_adjacent',
  IS_GAME_DAY_VENUE: 'is_game_day_venue',
  MEMORIAL_BOULEVARD: 'memorial_boulevard_location',
  DEAL_CATEGORY: 'deal_category',
  EVENT_TYPE: 'event_type',
  RELATED_ATTRACTION: 'related_attraction',
} as const;

// Conversion events (important for business goals)
export const CONVERSION_EVENTS = [
  'business_claim_completed',
  'click_business_phone',
  'click_business_website',
  'click_deal_redeem',
  'click_event_register',
  'review_submitted',
  'newsletter_signup',
] as const;
