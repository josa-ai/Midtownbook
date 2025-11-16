/**
 * Attraction View Tracker Component
 * Client component to track attraction page views
 */

'use client';

import { useEffect } from 'react';
import { trackAttractionView } from '@/lib/analytics';

interface AttractionViewTrackerProps {
  attraction: 'bonnet_springs_park' | 'tigers_stadium';
}

export function AttractionViewTracker({ attraction }: AttractionViewTrackerProps) {
  useEffect(() => {
    trackAttractionView(attraction);
  }, [attraction]);

  return null;
}
