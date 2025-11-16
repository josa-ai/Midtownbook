/**
 * Google Analytics 4 utility functions
 * Client-side analytics tracking
 */

import type { AnalyticsEvent, AnalyticsEventParams } from './types';

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date | AnalyticsEvent,
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

/**
 * Initialize Google Analytics
 * Call this in the app root or layout
 */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

/**
 * Check if analytics is enabled
 */
export const isAnalyticsEnabled = (): boolean => {
  return typeof window !== 'undefined' && !!GA_MEASUREMENT_ID && !!window.gtag;
};

/**
 * Track page views
 * This is automatically called by Next.js on route changes if configured
 */
export const pageview = (url: string, title?: string): void => {
  if (!isAnalyticsEnabled()) return;

  window.gtag!('config', GA_MEASUREMENT_ID, {
    page_path: url,
    page_title: title,
  });
};

/**
 * Track custom events
 */
export const event = (
  eventName: AnalyticsEvent,
  params?: AnalyticsEventParams
): void => {
  if (!isAnalyticsEnabled()) {
    // In development, log to console
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics]', eventName, params);
    }
    return;
  }

  window.gtag!('event', eventName, params);
};

/**
 * Track business view
 */
export const trackBusinessView = (params: {
  businessId: string;
  businessName: string;
  businessCategory?: string;
  businessSlug?: string;
  distanceToPark?: number | null;
  distanceToStadium?: number | null;
  isParkAdjacent?: boolean;
  isGameDayVenue?: boolean;
  memorialBoulevard?: boolean;
}): void => {
  event('view_business', {
    business_id: params.businessId,
    business_name: params.businessName,
    business_category: params.businessCategory,
    business_slug: params.businessSlug,
    distance_to_park: params.distanceToPark ?? undefined,
    distance_to_stadium: params.distanceToStadium ?? undefined,
    is_park_adjacent: params.isParkAdjacent,
    is_game_day_venue: params.isGameDayVenue,
    memorial_boulevard: params.memorialBoulevard,
  });
};

/**
 * Track business interactions
 */
export const trackBusinessInteraction = (
  action: 'phone' | 'website' | 'directions' | 'email',
  params: {
    businessId: string;
    businessName: string;
    businessSlug?: string;
  }
): void => {
  const eventMap = {
    phone: 'click_business_phone',
    website: 'click_business_website',
    directions: 'click_business_directions',
    email: 'click_business_email',
  } as const;

  event(eventMap[action], {
    business_id: params.businessId,
    business_name: params.businessName,
    business_slug: params.businessSlug,
  });
};

/**
 * Track deal view and interactions
 */
export const trackDealView = (params: {
  dealId: string;
  businessId: string;
  businessName: string;
  dealCategory?: 'standard' | 'show_your_ticket' | 'park_visitor' | 'game_day' | 'memorial_boulevard_special';
  dealType?: 'percentage' | 'fixed' | 'bogo' | 'other';
  dealValue?: number | null;
}): void => {
  event('view_deal', {
    deal_id: params.dealId,
    business_id: params.businessId,
    business_name: params.businessName,
    deal_category: params.dealCategory,
    deal_type: params.dealType,
    deal_value: params.dealValue ?? undefined,
  });

  // Track "Show Your Ticket" deals separately
  if (params.dealCategory === 'show_your_ticket') {
    event('show_your_ticket_deal_viewed', {
      deal_id: params.dealId,
      business_id: params.businessId,
      business_name: params.businessName,
    });
  }
};

export const trackDealClick = (params: {
  dealId: string;
  businessId: string;
  businessName: string;
  dealCategory?: 'standard' | 'show_your_ticket' | 'park_visitor' | 'game_day' | 'memorial_boulevard_special';
}): void => {
  event('click_deal_redeem', {
    deal_id: params.dealId,
    business_id: params.businessId,
    business_name: params.businessName,
    deal_category: params.dealCategory,
  });

  // Track "Show Your Ticket" deal clicks separately
  if (params.dealCategory === 'show_your_ticket') {
    event('show_your_ticket_deal_clicked', {
      deal_id: params.dealId,
      business_id: params.businessId,
      business_name: params.businessName,
    });
  }
};

/**
 * Track event view
 */
export const trackEventView = (params: {
  eventId: string;
  businessId: string;
  businessName?: string;
  eventType?: 'general' | 'park_event' | 'tigers_game' | 'memorial_boulevard_event' | 'neighborhood_activity';
  relatedAttraction?: 'bonnet_springs_park' | 'tigers_stadium' | 'memorial_boulevard';
  eventDate?: string;
}): void => {
  event('view_event', {
    event_id: params.eventId,
    business_id: params.businessId,
    business_name: params.businessName,
    event_type: params.eventType,
    related_attraction: params.relatedAttraction,
    event_date: params.eventDate,
  });

  // Track park events separately
  if (params.eventType === 'park_event' || params.relatedAttraction === 'bonnet_springs_park') {
    event('park_event_viewed', {
      event_id: params.eventId,
      business_name: params.businessName,
    });
  }

  // Track Tigers game events separately
  if (params.eventType === 'tigers_game' || params.relatedAttraction === 'tigers_stadium') {
    event('tigers_game_viewed', {
      event_id: params.eventId,
      business_name: params.businessName,
      event_date: params.eventDate,
    });
  }
};

/**
 * Track search
 */
export const trackSearch = (params: {
  searchTerm: string;
  resultsCount: number;
  filterType?: string;
  filterValue?: string;
}): void => {
  event('search_performed', {
    search_term: params.searchTerm,
    results_count: params.resultsCount,
    filter_type: params.filterType,
    filter_value: params.filterValue,
  });
};

/**
 * Track filter usage
 */
export const trackFilter = (params: {
  filterType: string;
  filterValue: string;
  resultsCount?: number;
}): void => {
  event('filter_applied', {
    filter_type: params.filterType,
    filter_value: params.filterValue,
    results_count: params.resultsCount,
  });

  // Track Mid-Town specific filters
  if (params.filterType === 'park_adjacent') {
    event('park_adjacent_filter', {
      filter_value: params.filterValue,
    });
  }

  if (params.filterType === 'game_day') {
    event('game_day_filter', {
      filter_value: params.filterValue,
    });
  }
};

/**
 * Track attraction page views
 */
export const trackAttractionView = (
  attraction: 'bonnet_springs_park' | 'tigers_stadium'
): void => {
  event('attraction_page_viewed', {
    related_attraction: attraction,
  });

  if (attraction === 'bonnet_springs_park') {
    event('bonnet_springs_page_viewed', {});
  } else if (attraction === 'tigers_stadium') {
    event('tigers_stadium_page_viewed', {});
  }
};

/**
 * Track business claim process
 */
export const trackBusinessClaim = (
  status: 'started' | 'completed',
  params: {
    businessId: string;
    businessName: string;
  }
): void => {
  const eventName = status === 'started'
    ? 'business_claim_started'
    : 'business_claim_completed';

  event(eventName, {
    business_id: params.businessId,
    business_name: params.businessName,
  });
};

/**
 * Track review submission
 */
export const trackReviewSubmit = (params: {
  businessId: string;
  businessName: string;
  rating: number;
}): void => {
  event('review_submitted', {
    business_id: params.businessId,
    business_name: params.businessName,
    value: params.rating,
  });
};

/**
 * Track newsletter signup
 */
export const trackNewsletterSignup = (params?: {
  method?: string;
}): void => {
  event('newsletter_signup', {
    method: params?.method || 'form',
  });
};
