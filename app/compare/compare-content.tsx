'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Combobox } from '@/components/ui/combobox';
import { RatingDisplay } from '@/components/business';
import { EmptyState } from '@/components/ui/empty-state';
import {
  GitCompare,
  X,
  Plus,
  Check,
  MapPin,
  Phone,
  Globe,
  DollarSign,
  Clock,
  Star,
  Users,
  Calendar,
  ArrowRight,
} from 'lucide-react';

interface Business {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
  address: string;
  city: string;
  phone?: string;
  website?: string;
  priceLevel: number;
  isOpen: boolean;
  hours?: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  features: string[];
  established?: number;
  parking?: boolean;
  accessibility?: boolean;
  reservations?: boolean;
  delivery?: boolean;
  outdoorSeating?: boolean;
}

export function CompareContent() {
  const searchParams = useSearchParams();
  const [selectedBusinesses, setSelectedBusinesses] = React.useState<Business[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');

  // Mock businesses for search/selection
  const availableBusinesses: Business[] = [
    {
      id: '1',
      slug: 'sunrise-cafe',
      name: 'Sunrise Café',
      description: 'Cozy neighborhood café serving artisan coffee and fresh pastries daily.',
      category: 'Restaurant',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
      rating: 4.5,
      reviewCount: 24,
      address: '123 Main St',
      city: 'Midtown',
      phone: '(555) 123-4567',
      website: 'https://sunrisecafe.com',
      priceLevel: 2,
      isOpen: true,
      hours: {
        monday: '7:00 AM - 8:00 PM',
        tuesday: '7:00 AM - 8:00 PM',
        wednesday: '7:00 AM - 8:00 PM',
        thursday: '7:00 AM - 8:00 PM',
        friday: '7:00 AM - 9:00 PM',
        saturday: '8:00 AM - 9:00 PM',
        sunday: '8:00 AM - 6:00 PM',
      },
      features: ['Free Wi-Fi', 'Outdoor Seating', 'Vegan Options', 'Pet Friendly'],
      established: 2018,
      parking: true,
      accessibility: true,
      reservations: false,
      delivery: true,
      outdoorSeating: true,
    },
    {
      id: '2',
      slug: 'garden-bistro',
      name: 'The Garden Bistro',
      description: 'Farm-to-table restaurant with seasonal menus and outdoor seating.',
      category: 'Restaurant',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
      rating: 4.6,
      reviewCount: 142,
      address: '567 Maple Dr',
      city: 'Midtown',
      phone: '(555) 234-5678',
      website: 'https://gardenbistro.com',
      priceLevel: 3,
      isOpen: true,
      hours: {
        monday: 'Closed',
        tuesday: '5:00 PM - 10:00 PM',
        wednesday: '5:00 PM - 10:00 PM',
        thursday: '5:00 PM - 10:00 PM',
        friday: '5:00 PM - 11:00 PM',
        saturday: '11:00 AM - 11:00 PM',
        sunday: '11:00 AM - 9:00 PM',
      },
      features: ['Organic', 'Outdoor Seating', 'Full Bar', 'Private Events'],
      established: 2015,
      parking: true,
      accessibility: true,
      reservations: true,
      delivery: false,
      outdoorSeating: true,
    },
    {
      id: '3',
      slug: 'downtown-diner',
      name: 'Downtown Diner',
      description: 'Classic American diner serving breakfast all day.',
      category: 'Restaurant',
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800',
      rating: 4.3,
      reviewCount: 89,
      address: '234 Center St',
      city: 'Midtown',
      phone: '(555) 345-6789',
      priceLevel: 1,
      isOpen: false,
      hours: {
        monday: '6:00 AM - 3:00 PM',
        tuesday: '6:00 AM - 3:00 PM',
        wednesday: '6:00 AM - 3:00 PM',
        thursday: '6:00 AM - 3:00 PM',
        friday: '6:00 AM - 9:00 PM',
        saturday: '7:00 AM - 9:00 PM',
        sunday: '7:00 AM - 3:00 PM',
      },
      features: ['Breakfast All Day', 'Kids Menu', 'Large Portions', 'Classic Diner'],
      established: 1985,
      parking: false,
      accessibility: true,
      reservations: false,
      delivery: true,
      outdoorSeating: false,
    },
  ];

  React.useEffect(() => {
    // Get initial businesses from URL params
    const ids = searchParams.get('ids')?.split(',') || [];
    if (ids.length > 0) {
      const initialBusinesses = availableBusinesses.filter(b => ids.includes(b.id));
      setSelectedBusinesses(initialBusinesses);
    }
  }, []);

  const addBusiness = (businessId: string) => {
    if (selectedBusinesses.length >= 3) {
      alert('You can only compare up to 3 businesses at a time');
      return;
    }

    const business = availableBusinesses.find(b => b.id === businessId);
    if (business && !selectedBusinesses.find(b => b.id === businessId)) {
      setSelectedBusinesses([...selectedBusinesses, business]);
    }
  };

  const removeBusiness = (businessId: string) => {
    setSelectedBusinesses(selectedBusinesses.filter(b => b.id !== businessId));
  };

  const getPriceLevelDisplay = (level: number) => {
    return '$'.repeat(level) + '$'.repeat(Math.max(0, 4 - level)).split('').map((_, i) =>
      i < level ? '$' : <span key={i} className="text-neutral-300">$</span>
    );
  };

  const getFeatureStatus = (business: Business, feature: keyof Business) => {
    const value = business[feature];
    if (typeof value === 'boolean') {
      return value ? (
        <div className="flex items-center gap-1 text-success">
          <Check className="h-4 w-4" />
          <span className="text-body-sm">Yes</span>
        </div>
      ) : (
        <div className="flex items-center gap-1 text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="text-body-sm">No</span>
        </div>
      );
    }
    return <span className="text-body-sm">{value || 'N/A'}</span>;
  };

  return (
    <div className="py-12">
      <Container size="xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
              <GitCompare className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h1 className="font-serif font-bold text-display-md text-foreground">
                Compare Businesses
              </h1>
              <p className="text-body-md text-muted-foreground">
                Compare up to 3 businesses side-by-side
              </p>
            </div>
          </div>
        </div>

        {/* Business Selection */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="font-semibold text-heading-sm mb-4">
              Select Businesses to Compare ({selectedBusinesses.length}/3)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[0, 1, 2].map((index) => {
                const business = selectedBusinesses[index];
                return (
                  <div key={index}>
                    {business ? (
                      <Card className="relative">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 z-10"
                          onClick={() => removeBusiness(business.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <CardContent className="p-4">
                          <img
                            src={business.image}
                            alt={business.name}
                            className="w-full h-32 object-cover rounded-lg mb-3"
                          />
                          <h3 className="font-semibold text-body-md mb-1">{business.name}</h3>
                          <p className="text-body-sm text-muted-foreground mb-2">
                            {business.category}
                          </p>
                          <RatingDisplay rating={business.rating} reviewCount={business.reviewCount} size="sm" />
                        </CardContent>
                      </Card>
                    ) : (
                      <Card className="h-full border-dashed">
                        <CardContent className="p-4 h-full flex flex-col items-center justify-center">
                          <select
                            className="w-full p-2 border rounded-lg"
                            onChange={(e) => {
                              if (e.target.value) {
                                addBusiness(e.target.value);
                                e.target.value = '';
                              }
                            }}
                          >
                            <option value="">Select a business...</option>
                            {availableBusinesses
                              .filter(b => !selectedBusinesses.find(sb => sb.id === b.id))
                              .map(b => (
                                <option key={b.id} value={b.id}>{b.name}</option>
                              ))}
                          </select>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Comparison Table */}
        {selectedBusinesses.length >= 2 ? (
          <div className="space-y-6">
            {/* Basic Info */}
            <Card>
              <CardContent className="p-6">
                <h2 className="font-semibold text-heading-sm mb-4">Basic Information</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 text-body-sm font-semibold text-muted-foreground w-48">
                          Feature
                        </th>
                        {selectedBusinesses.map(business => (
                          <th key={business.id} className="p-3 text-left">
                            {/* Empty header for business columns */}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-3 text-body-sm font-medium">Rating</td>
                        {selectedBusinesses.map(business => (
                          <td key={business.id} className="p-3">
                            <RatingDisplay rating={business.rating} reviewCount={business.reviewCount} size="sm" />
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 text-body-sm font-medium">Price Level</td>
                        {selectedBusinesses.map(business => (
                          <td key={business.id} className="p-3">
                            <div className="flex items-center gap-1 text-body-md">
                              {getPriceLevelDisplay(business.priceLevel)}
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 text-body-sm font-medium">Address</td>
                        {selectedBusinesses.map(business => (
                          <td key={business.id} className="p-3">
                            <div className="flex items-start gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                              <span className="text-body-sm">{business.address}, {business.city}</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 text-body-sm font-medium">Phone</td>
                        {selectedBusinesses.map(business => (
                          <td key={business.id} className="p-3">
                            {business.phone ? (
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span className="text-body-sm">{business.phone}</span>
                              </div>
                            ) : (
                              <span className="text-body-sm text-muted-foreground">N/A</span>
                            )}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 text-body-sm font-medium">Website</td>
                        {selectedBusinesses.map(business => (
                          <td key={business.id} className="p-3">
                            {business.website ? (
                              <a
                                href={business.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-primary-600 hover:text-primary-700 text-body-sm"
                              >
                                <Globe className="h-4 w-4" />
                                Visit Site
                              </a>
                            ) : (
                              <span className="text-body-sm text-muted-foreground">N/A</span>
                            )}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 text-body-sm font-medium">Established</td>
                        {selectedBusinesses.map(business => (
                          <td key={business.id} className="p-3">
                            {business.established ? (
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-body-sm">{business.established}</span>
                              </div>
                            ) : (
                              <span className="text-body-sm text-muted-foreground">N/A</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Features & Amenities */}
            <Card>
              <CardContent className="p-6">
                <h2 className="font-semibold text-heading-sm mb-4">Features & Amenities</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="p-3 text-body-sm font-medium w-48">Parking Available</td>
                        {selectedBusinesses.map(business => (
                          <td key={business.id} className="p-3">
                            {getFeatureStatus(business, 'parking')}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 text-body-sm font-medium">Wheelchair Accessible</td>
                        {selectedBusinesses.map(business => (
                          <td key={business.id} className="p-3">
                            {getFeatureStatus(business, 'accessibility')}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 text-body-sm font-medium">Accepts Reservations</td>
                        {selectedBusinesses.map(business => (
                          <td key={business.id} className="p-3">
                            {getFeatureStatus(business, 'reservations')}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 text-body-sm font-medium">Delivery Available</td>
                        {selectedBusinesses.map(business => (
                          <td key={business.id} className="p-3">
                            {getFeatureStatus(business, 'delivery')}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 text-body-sm font-medium">Outdoor Seating</td>
                        {selectedBusinesses.map(business => (
                          <td key={business.id} className="p-3">
                            {getFeatureStatus(business, 'outdoorSeating')}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Special Features */}
            <Card>
              <CardContent className="p-6">
                <h2 className="font-semibold text-heading-sm mb-4">Special Features</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <tbody>
                      <tr>
                        <td className="p-3 text-body-sm font-medium w-48 align-top">Features</td>
                        {selectedBusinesses.map(business => (
                          <td key={business.id} className="p-3">
                            <div className="flex flex-wrap gap-2">
                              {business.features.map((feature, idx) => (
                                <Badge key={idx}>{feature}</Badge>
                              ))}
                            </div>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {selectedBusinesses.map(business => (
                <Button key={business.id} variant="primary" asChild>
                  <Link href={`/businesses/${business.slug}`}>
                    View {business.name}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <EmptyState
            icon={GitCompare}
            title="Select at least 2 businesses to compare"
            description="Choose businesses from the selection above to see a detailed side-by-side comparison."
            action={
              <Button variant="primary" asChild>
                <Link href="/businesses">Browse Businesses</Link>
              </Button>
            }
          />
        )}
      </Container>
    </div>
  );
}
