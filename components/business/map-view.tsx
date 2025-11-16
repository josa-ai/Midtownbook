'use client';

import * as React from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  showMidtownLandmarks?: boolean;
}

// Mid-Town Lakeland landmarks
const BONNET_SPRINGS_PARK = { lat: 28.039, lng: -81.9577, title: 'Bonnet Springs Park' };
const TIGERS_STADIUM = { lat: 28.0747, lng: -81.9786, title: 'Joker Marchant Stadium' };
const LAKELAND_CENTER = { lat: 28.0395, lng: -81.9498 };

const MapView: React.FC<MapViewProps> = ({
  center = LAKELAND_CENTER,
  zoom = 14,
  markers = [],
  height = 400,
  className,
  showMidtownLandmarks = false,
}) => {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const googleMapRef = React.useRef<google.maps.Map | null>(null);

  React.useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      setError('Google Maps API key not configured');
      setIsLoading(false);
      return;
    }

    if (!mapRef.current) return;

    const loader = new Loader({
      apiKey,
      version: 'weekly',
      libraries: ['places', 'marker'],
    });

    loader
      .load()
      .then(() => {
        if (!mapRef.current) return;

        // Create map
        const map = new google.maps.Map(mapRef.current, {
          center,
          zoom,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }],
            },
          ],
        });

        googleMapRef.current = map;

        // Add Mid-Town landmarks if enabled
        if (showMidtownLandmarks) {
          // Bonnet Springs Park marker (green)
          new google.maps.Marker({
            position: BONNET_SPRINGS_PARK,
            map,
            title: BONNET_SPRINGS_PARK.title,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: '#10b981',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 2,
            },
          });

          // Tigers Stadium marker (blue)
          new google.maps.Marker({
            position: TIGERS_STADIUM,
            map,
            title: TIGERS_STADIUM.title,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: '#3b82f6',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 2,
            },
          });
        }

        // Add custom markers
        markers.forEach((marker) => {
          const mapMarker = new google.maps.Marker({
            position: { lat: marker.lat, lng: marker.lng },
            map,
            title: marker.title,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: '#dc2626',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 2,
            },
          });

          // Add info window if description provided
          if (marker.description) {
            const infoWindow = new google.maps.InfoWindow({
              content: `
                <div style="padding: 8px;">
                  <h3 style="font-weight: 600; margin-bottom: 4px;">${marker.title || 'Location'}</h3>
                  <p style="font-size: 14px; color: #666;">${marker.description}</p>
                </div>
              `,
            });

            mapMarker.addListener('click', () => {
              infoWindow.open(map, mapMarker);
            });
          }
        });

        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error loading Google Maps:', err);
        setError('Failed to load map');
        setIsLoading(false);
      });
  }, [center, zoom, markers, showMidtownLandmarks]);

  if (error) {
    return (
      <Card className={cn('overflow-hidden', className)}>
        <CardContent className="p-0">
          <div
            className="flex items-center justify-center bg-neutral-50"
            style={{ height: `${height}px` }}
          >
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-error-100 flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-8 w-8 text-error-600" />
              </div>
              <h3 className="font-semibold text-heading-sm text-foreground mb-2">
                Map Unavailable
              </h3>
              <p className="text-body-sm text-muted-foreground mb-4">{error}</p>
              <p className="text-label-xs text-muted-foreground max-w-sm">
                Add <code className="px-1 py-0.5 bg-neutral-200 rounded text-label-xs">
                  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
                </code> to your environment variables
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardContent className="p-0 relative">
        {isLoading && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-neutral-100 z-10"
            style={{ height: `${height}px` }}
          >
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-3 animate-pulse">
                <MapPin className="h-6 w-6 text-primary-600" />
              </div>
              <p className="text-body-sm text-muted-foreground">Loading map...</p>
            </div>
          </div>
        )}
        <div ref={mapRef} style={{ height: `${height}px`, width: '100%' }} />
      </CardContent>
    </Card>
  );
};

MapView.displayName = 'MapView';

export { MapView, type Location };
