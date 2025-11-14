'use client';

import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

// TODO: Integrate with Google Maps JavaScript API
// This is a placeholder component for now

interface Location {
  lat: number;
  lng: number;
  title?: string;
  description?: string;
}

interface MapViewProps {
  center?: Location;
  zoom?: number;
  markers?: Location[];
  height?: number;
  className?: string;
}

const MapView: React.FC<MapViewProps> = ({
  center = { lat: 40.7128, lng: -74.006 },
  zoom = 12,
  markers = [],
  height = 400,
  className,
}) => {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardContent className="p-0">
        <div
          className="flex items-center justify-center bg-neutral-100 border-2 border-dashed border-neutral-300"
          style={{ height: `${height}px` }}
        >
          <div className="text-center p-6">
            <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="font-semibold text-heading-sm text-foreground mb-2">
              Map View Placeholder
            </h3>
            <p className="text-body-sm text-muted-foreground mb-4">
              Center: {center.lat.toFixed(4)}, {center.lng.toFixed(4)}
              <br />
              Zoom: {zoom} | Markers: {markers.length}
            </p>
            <p className="text-label-xs text-muted-foreground max-w-sm">
              Integrate with Google Maps JavaScript API using{' '}
              <code className="px-1 py-0.5 bg-neutral-200 rounded text-label-xs">
                @googlemaps/js-api-loader
              </code>
              {' '}for full functionality
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

MapView.displayName = 'MapView';

export { MapView, type Location };
