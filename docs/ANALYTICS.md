# Analytics Implementation Guide

## Overview

The Mid-Town Lakeland Directory uses Google Analytics 4 (GA4) to track user interactions and measure the effectiveness of the Mid-Town positioning strategy.

## Setup

### 1. Environment Configuration

Add your Google Analytics 4 Measurement ID to your environment variables:

```bash
# .env.local
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 2. Analytics Integration

Analytics are automatically loaded in the root layout ([app/layout.tsx](app/layout.tsx:93)):

```tsx
import { GoogleAnalytics, AnalyticsProvider } from '@/components/analytics';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <GoogleAnalytics />
      <body>
        <AnalyticsProvider>{children}</AnalyticsProvider>
      </body>
    </html>
  );
}
```

## Tracking Events

### Business Interactions

Track when users view or interact with businesses:

```tsx
import { trackBusinessView, trackBusinessInteraction } from '@/lib/analytics';

// Track business page view
trackBusinessView({
  businessId: '123',
  businessName: 'Joe\'s Coffee',
  businessCategory: 'Restaurant',
  businessSlug: 'joes-coffee',
  distanceToPark: 0.3, // Distance to Bonnet Springs Park in miles
  distanceToStadium: 1.2, // Distance to Joker Marchant Stadium in miles
  isParkAdjacent: true,
  isGameDayVenue: false,
  memorialBoulevard: true,
});

// Track phone click
trackBusinessInteraction('phone', {
  businessId: '123',
  businessName: 'Joe\'s Coffee',
  businessSlug: 'joes-coffee',
});

// Track website click
trackBusinessInteraction('website', {
  businessId: '123',
  businessName: 'Joe\'s Coffee',
});
```

### Deal Tracking

Track "Show Your Ticket" and other deal interactions:

```tsx
import { trackDealView, trackDealClick } from '@/lib/analytics';

// Track deal view
trackDealView({
  dealId: 'deal-456',
  businessId: '123',
  businessName: 'Joe\'s Coffee',
  dealCategory: 'show_your_ticket',
  dealType: 'percentage',
  dealValue: 20,
});

// Track deal click/redemption
trackDealClick({
  dealId: 'deal-456',
  businessId: '123',
  businessName: 'Joe\'s Coffee',
  dealCategory: 'show_your_ticket',
});
```

### Event Tracking

Track park events and Tigers games:

```tsx
import { trackEventView } from '@/lib/analytics';

trackEventView({
  eventId: 'event-789',
  businessId: '123',
  businessName: 'Bonnet Springs Park',
  eventType: 'park_event',
  relatedAttraction: 'bonnet_springs_park',
  eventDate: '2025-06-15',
});
```

### Attraction Page Views

Track views of attraction pages (Bonnet Springs Park, Tigers Stadium):

```tsx
import { AttractionViewTracker } from '@/components/analytics/attraction-view-tracker';

export default function BonnetSpringsParkPage() {
  return (
    <>
      <AttractionViewTracker attraction="bonnet_springs_park" />
      {/* page content */}
    </>
  );
}
```

### Search and Filtering

Track search queries and filter usage:

```tsx
import { trackSearch, trackFilter } from '@/lib/analytics';

// Track search
trackSearch({
  searchTerm: 'coffee',
  resultsCount: 12,
  filterType: 'category',
  filterValue: 'restaurants',
});

// Track filter application
trackFilter({
  filterType: 'park_adjacent',
  filterValue: 'true',
  resultsCount: 8,
});
```

## Custom Dimensions

The following custom dimensions track Mid-Town Lakeland-specific metrics:

- `distance_to_bonnet_springs` - Distance from business to Bonnet Springs Park (miles)
- `distance_to_tigers_stadium` - Distance from business to Joker Marchant Stadium (miles)
- `is_park_adjacent` - Whether business is within 0.5 miles of the park
- `is_game_day_venue` - Whether business caters to Tigers game day crowds
- `memorial_boulevard_location` - Whether business is on Memorial Boulevard
- `deal_category` - Type of deal (standard, show_your_ticket, park_visitor, game_day, memorial_boulevard_special)
- `event_type` - Type of event (general, park_event, tigers_game, memorial_boulevard_event, neighborhood_activity)
- `related_attraction` - Which major attraction the event/deal is related to

## Conversion Events

The following events are marked as conversions in GA4:

- `business_claim_completed` - Business owner claims their listing
- `click_business_phone` - User clicks business phone number
- `click_business_website` - User clicks business website
- `click_deal_redeem` - User clicks to redeem a deal
- `click_event_register` - User clicks to register for an event
- `review_submitted` - User submits a review
- `newsletter_signup` - User signs up for newsletter

## Development Mode

In development, analytics events are logged to the console instead of being sent to GA4:

```bash
[Analytics] view_business {
  business_id: '123',
  business_name: 'Joe\'s Coffee',
  distance_to_park: 0.3,
  is_park_adjacent: true
}
```

## Testing Analytics

### Browser DevTools

1. Open Chrome DevTools
2. Go to Network tab
3. Filter by "google-analytics" or "collect"
4. Perform actions on the site
5. Verify events are being sent

### GA4 DebugView

1. Install the [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/) Chrome extension
2. Enable the debugger
3. Go to your GA4 property
4. Navigate to Configure → DebugView
5. Perform actions on your site
6. See real-time event tracking

## Key Metrics to Monitor

### Mid-Town Positioning Metrics

1. **Park-Adjacent Business Performance**
   - Views of park-adjacent businesses
   - Conversion rate for park-adjacent vs. non-adjacent

2. **"Show Your Ticket" Deal Effectiveness**
   - `show_your_ticket_deal_viewed` count
   - `show_your_ticket_deal_clicked` conversion rate
   - Revenue attribution (if e-commerce tracking added)

3. **Game Day Impact**
   - Traffic spikes on Tigers game days
   - Game-day venue performance
   - Tigers game event registrations

4. **Attraction Page Performance**
   - `bonnet_springs_page_viewed` count
   - User flow from attraction pages to businesses
   - Time spent on attraction pages

5. **Memorial Boulevard Focus**
   - Views of Memorial Boulevard businesses
   - Filter usage for Memorial Boulevard
   - Geographic concentration of user interest

## Custom Reports

### Recommended GA4 Explorations

1. **Mid-Town Funnel Analysis**
   - Attraction page → Business listing → Contact/Website click

2. **Deal Performance Report**
   - Group by `deal_category`
   - Measure view-to-click conversion

3. **Geographic Heatmap**
   - User locations relative to Bonnet Springs Park
   - Distance-based segmentation

4. **Event Attribution**
   - Business views attributed to park events
   - Revenue per Tigers game day

## Privacy & Compliance

- IP anonymization is enabled by default
- Cookies use `SameSite=None;Secure` flags
- No personal information is tracked without consent
- Compliant with GDPR and CCPA requirements

## Support

For analytics questions or custom tracking requirements, see:
- [lib/analytics/types.ts](../lib/analytics/types.ts) - Event definitions
- [lib/analytics/gtag.ts](../lib/analytics/gtag.ts) - Tracking functions
- [Google Analytics 4 Documentation](https://support.google.com/analytics/answer/10089681)
