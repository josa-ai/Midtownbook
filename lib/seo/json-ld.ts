/**
 * JSON-LD Structured Data Generators for SEO
 * Provides rich snippets for Google and other search engines
 */

import type { Business, Event, Deal } from '@/lib/types/database';

// Base URL for the site
const SITE_URL = 'https://midtownbook.com';

/**
 * Organization Schema for site-wide use
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Mid-Town Lakeland Directory',
    alternateName: 'Midtown Book',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: 'Discover Mid-Town Lakeland businesses near Bonnet Springs Park (USA Today\'s #1 City Park) and Detroit Tigers Spring Training in Lakeland, Florida.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lakeland',
      addressRegion: 'FL',
      addressCountry: 'US',
    },
    sameAs: [
      // Add social media URLs when available
    ],
  };
}

/**
 * Local Business Schema
 */
export function generateBusinessSchema(business: Business & { category_name?: string; average_rating?: number; total_reviews?: number }) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/businesses/${business.slug}`,
    name: business.name,
    description: business.description,
    url: business.website || `${SITE_URL}/businesses/${business.slug}`,
    telephone: business.phone,
    email: business.email,
    image: business.logo_url || business.cover_image_url,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address,
      addressLocality: business.city,
      addressRegion: business.state,
      postalCode: business.zip_code,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.latitude,
      longitude: business.longitude,
    },
  };

  // Add price range if available
  if (business.price_range) {
    schema.priceRange = '$'.repeat(business.price_range);
  }

  // Add aggregate rating if available
  if (business.average_rating && business.total_reviews) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: business.average_rating,
      reviewCount: business.total_reviews,
      bestRating: 5,
      worstRating: 1,
    };
  }

  // Add opening hours if available
  if (business.hours && typeof business.hours === 'object') {
    // Transform hours object to OpeningHoursSpecification
    // This would need to be customized based on your hours format
  }

  return schema;
}

/**
 * Breadcrumb List Schema
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

/**
 * Event Schema
 */
export function generateEventSchema(event: Event & { business_name?: string }) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    '@id': `${SITE_URL}/events/${event.slug}`,
    name: event.title,
    description: event.description,
    startDate: event.start_date,
    endDate: event.end_date,
    eventStatus: event.is_active ? 'https://schema.org/EventScheduled' : 'https://schema.org/EventCancelled',
    eventAttendanceMode: event.is_online
      ? 'https://schema.org/OnlineEventAttendanceMode'
      : 'https://schema.org/OfflineEventAttendanceMode',
    image: event.image_url,
  };

  // Add location
  if (event.location && !event.is_online) {
    schema.location = {
      '@type': 'Place',
      name: event.location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lakeland',
        addressRegion: 'FL',
        addressCountry: 'US',
      },
    };
  } else if (event.is_online && event.event_url) {
    schema.location = {
      '@type': 'VirtualLocation',
      url: event.event_url,
    };
  }

  // Add ticket offers if price is available
  if (event.price !== null) {
    schema.offers = {
      '@type': 'Offer',
      price: event.price,
      priceCurrency: 'USD',
      availability: event.is_active ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
      url: event.event_url || `${SITE_URL}/events/${event.slug}`,
    };
  }

  // Add organizer if business name is provided
  if (event.business_name) {
    schema.organizer = {
      '@type': 'Organization',
      name: event.business_name,
    };
  }

  return schema;
}

/**
 * Offer Schema for Deals
 */
export function generateOfferSchema(deal: Deal & { business_name?: string; business_slug?: string }) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: deal.title,
    description: deal.description,
    priceValidUntil: deal.end_date,
    availability: deal.is_active ? 'https://schema.org/InStock' : 'https://schema.org/Discontinued',
    url: `${SITE_URL}/deals/${deal.id}`,
  };

  // Add seller if business info is provided
  if (deal.business_name && deal.business_slug) {
    schema.seller = {
      '@type': 'LocalBusiness',
      name: deal.business_name,
      url: `${SITE_URL}/businesses/${deal.business_slug}`,
    };
  }

  // Add discount information
  if (deal.discount_type === 'percentage' && deal.discount_value) {
    schema.eligibleQuantity = {
      '@type': 'QuantitativeValue',
      value: deal.discount_value,
      unitText: 'PERCENT',
    };
  }

  return schema;
}

/**
 * Tourist Attraction Schema for Bonnet Springs Park
 */
export function generateBonnetSpringsParkSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: 'Bonnet Springs Park',
    description: '180 acres of world-class gardens, trails, and amenities - voted USA Today\'s #1 City Park in America',
    url: 'https://bonnetspringspark.org',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1901 E Memorial Blvd',
      addressLocality: 'Lakeland',
      addressRegion: 'FL',
      postalCode: '33801',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.039,
      longitude: -81.9577,
    },
    isAccessibleForFree: true,
    publicAccess: true,
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Walking Trails',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Gardens',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Nature Center',
        value: true,
      },
    ],
  };
}

/**
 * Sports Facility Schema for Joker Marchant Stadium
 */
export function generateJokerMarchantStadiumSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'StadiumOrArena',
    name: 'Joker Marchant Stadium',
    description: 'Home of Detroit Tigers Spring Training since 1934',
    url: 'https://www.milb.com/lakeland',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2301 Lakeland Hills Blvd',
      addressLocality: 'Lakeland',
      addressRegion: 'FL',
      postalCode: '33805',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.0747,
      longitude: -81.9786,
    },
    homeTeam: {
      '@type': 'SportsTeam',
      name: 'Detroit Tigers',
      sport: 'Baseball',
    },
  };
}

/**
 * Item List Schema for business listings
 */
export function generateBusinessListSchema(businesses: Array<Business & { category_name?: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: businesses.map((business, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'LocalBusiness',
        '@id': `${SITE_URL}/businesses/${business.slug}`,
        name: business.name,
        description: business.description,
        url: `${SITE_URL}/businesses/${business.slug}`,
      },
    })),
  };
}

/**
 * Search Action Schema for site search
 */
export function generateSearchActionSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/businesses?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Helper to combine multiple schemas
 */
export function combineSchemas(...schemas: any[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': schemas,
  };
}
