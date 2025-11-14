'use client';

import * as React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { StatCard } from '@/components/dashboard/stat-card';
import { ArrowLeft, Plus, Tag, Percent, Users, DollarSign, Edit, Trash2, Eye, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface Deal {
  id: string;
  slug: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  originalPrice?: number;
  startDate: Date;
  endDate: Date;
  code?: string;
  maxRedemptions?: number;
  currentRedemptions: number;
  status: 'active' | 'scheduled' | 'expired' | 'draft';
  imageUrl?: string;
}

export function DealsListContent() {
  const [activeTab, setActiveTab] = React.useState('all');
  const [sortBy, setSortBy] = React.useState('recent');

  // Mock deals data
  const mockDeals: Deal[] = [
    {
      id: '1',
      slug: '20-off-lunch-menu',
      title: '20% Off All Lunch Items',
      description: 'Get 20% off our entire lunch menu Monday through Friday.',
      discountType: 'percentage',
      discountValue: 20,
      originalPrice: 15,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-03-31'),
      code: 'LUNCH20',
      maxRedemptions: 500,
      currentRedemptions: 234,
      status: 'active',
      imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
    },
    {
      id: '2',
      slug: 'happy-hour-special',
      title: 'Happy Hour: $5 Off Drinks',
      description: 'Save $5 on all beverages during happy hour (3-6 PM daily).',
      discountType: 'fixed',
      discountValue: 5,
      originalPrice: 12,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      currentRedemptions: 892,
      status: 'active',
      imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800',
    },
    {
      id: '3',
      slug: 'summer-weekend-brunch',
      title: 'Summer Weekend Brunch Special',
      description: '15% off our weekend brunch menu all summer long.',
      discountType: 'percentage',
      discountValue: 15,
      startDate: new Date('2024-06-01'),
      endDate: new Date('2024-08-31'),
      code: 'BRUNCH15',
      maxRedemptions: 300,
      currentRedemptions: 0,
      status: 'scheduled',
    },
    {
      id: '4',
      slug: 'winter-comfort-food',
      title: 'Winter Comfort Food Deal',
      description: '$10 off our hearty winter specials.',
      discountType: 'fixed',
      discountValue: 10,
      startDate: new Date('2023-12-01'),
      endDate: new Date('2024-01-15'),
      currentRedemptions: 156,
      status: 'expired',
    },
    {
      id: '5',
      slug: 'early-bird-breakfast',
      title: 'Early Bird Breakfast',
      description: '25% off breakfast before 8 AM.',
      discountType: 'percentage',
      discountValue: 25,
      startDate: new Date('2024-02-01'),
      endDate: new Date('2024-12-31'),
      currentRedemptions: 0,
      status: 'draft',
    },
  ];

  const stats = {
    activeDeals: mockDeals.filter((d) => d.status === 'active').length,
    totalRedemptions: mockDeals.reduce((sum, d) => sum + d.currentRedemptions, 0),
    avgDiscount: Math.round(
      mockDeals.reduce((sum, d) => sum + d.discountValue, 0) / mockDeals.length
    ),
    revenue: 12450,
  };

  const filterDeals = (deals: Deal[]) => {
    let filtered = [...deals];

    // Filter by status
    if (activeTab !== 'all') {
      filtered = filtered.filter((d) => d.status === activeTab);
    }

    // Sort deals
    if (sortBy === 'recent') {
      filtered.sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
    } else if (sortBy === 'redemptions-desc') {
      filtered.sort((a, b) => b.currentRedemptions - a.currentRedemptions);
    } else if (sortBy === 'redemptions-asc') {
      filtered.sort((a, b) => a.currentRedemptions - b.currentRedemptions);
    } else if (sortBy === 'expiring-soon') {
      filtered.sort((a, b) => a.endDate.getTime() - b.endDate.getTime());
    }

    return filtered;
  };

  const filteredDeals = filterDeals(mockDeals);

  const handleDelete = async (dealId: string) => {
    // TODO: Implement Supabase delete
    console.log('Delete deal:', dealId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'scheduled':
        return 'info';
      case 'expired':
        return 'error';
      case 'draft':
        return 'warning';
      default:
        return 'default';
    }
  };

  const calculateFinalPrice = (deal: Deal) => {
    if (!deal.originalPrice) return null;
    if (deal.discountType === 'percentage') {
      return (deal.originalPrice * (1 - deal.discountValue / 100)).toFixed(2);
    } else {
      return (deal.originalPrice - deal.discountValue).toFixed(2);
    }
  };

  return (
    <div className="py-8">
      <Container size="xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 text-body-sm font-medium mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif font-bold text-display-sm text-foreground mb-2">
                Deals & Offers
              </h1>
              <p className="text-body-md text-muted-foreground">
                Manage your special offers and track performance
              </p>
            </div>
            <Button variant="primary" size="lg" asChild>
              <Link href="/dashboard/deals/new">
                <Plus className="h-4 w-4 mr-2" />
                Create Deal
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Active Deals"
            value={stats.activeDeals}
            icon={Tag}
            variant="primary"
          />
          <StatCard
            title="Total Redemptions"
            value={stats.totalRedemptions.toLocaleString()}
            icon={Users}
            variant="success"
          />
          <StatCard
            title="Avg. Discount"
            value={`${stats.avgDiscount}%`}
            icon={Percent}
           
          />
          <StatCard
            title="Revenue Impact"
            value={`$${stats.revenue.toLocaleString()}`}
            icon={DollarSign}
           
          />
        </div>

        {/* Filters and Deals List */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="all">All ({mockDeals.length})</TabsTrigger>
              <TabsTrigger value="active">
                Active ({mockDeals.filter((d) => d.status === 'active').length})
              </TabsTrigger>
              <TabsTrigger value="scheduled">
                Scheduled ({mockDeals.filter((d) => d.status === 'scheduled').length})
              </TabsTrigger>
              <TabsTrigger value="draft">
                Drafts ({mockDeals.filter((d) => d.status === 'draft').length})
              </TabsTrigger>
              <TabsTrigger value="expired">
                Expired ({mockDeals.filter((d) => d.status === 'expired').length})
              </TabsTrigger>
            </TabsList>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="expiring-soon">Expiring Soon</SelectItem>
                <SelectItem value="redemptions-desc">Most Popular</SelectItem>
                <SelectItem value="redemptions-asc">Least Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Deals List */}
          <TabsContent value={activeTab}>
          {filteredDeals.length > 0 ? (
            <div className="space-y-6">
              {filteredDeals.map((deal) => {
                const finalPrice = calculateFinalPrice(deal);
                const daysLeft = Math.ceil(
                  (deal.endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
                );

                return (
                  <Card key={deal.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-serif font-semibold text-heading-md">
                              {deal.title}
                            </h3>
                            <Badge variant={getStatusColor(deal.status) as any}>
                              {deal.status}
                            </Badge>
                            {deal.status === 'active' && daysLeft < 7 && (
                              <Badge variant="warning">Expires in {daysLeft} days</Badge>
                            )}
                          </div>
                          <p className="text-body-sm text-muted-foreground mb-3">
                            {deal.description}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                        <div>
                          <p className="text-label-xs text-muted-foreground mb-1">Discount</p>
                          <p className="text-body-sm font-medium flex items-center gap-1">
                            {deal.discountType === 'percentage' ? (
                              <>
                                <Percent className="h-3 w-3" />
                                {deal.discountValue}% OFF
                              </>
                            ) : (
                              <>
                                <DollarSign className="h-3 w-3" />$
                                {deal.discountValue} OFF
                              </>
                            )}
                          </p>
                        </div>
                        {finalPrice && (
                          <div>
                            <p className="text-label-xs text-muted-foreground mb-1">Final Price</p>
                            <p className="text-body-sm font-medium">${finalPrice}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-label-xs text-muted-foreground mb-1">Redemptions</p>
                          <p className="text-body-sm font-medium">
                            {deal.currentRedemptions}
                            {deal.maxRedemptions && ` / ${deal.maxRedemptions}`}
                          </p>
                        </div>
                        {deal.code && (
                          <div>
                            <p className="text-label-xs text-muted-foreground mb-1">Code</p>
                            <p className="text-body-sm font-medium font-mono">{deal.code}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-label-xs text-muted-foreground mb-1">Valid Until</p>
                          <p className="text-body-sm font-medium flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {format(deal.endDate, 'MMM d, yyyy')}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/deals#${deal.slug}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Deal?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the deal
                                and all associated data.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(deal.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Tag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-heading-sm mb-2">No deals found</h3>
                <p className="text-body-sm text-muted-foreground mb-6">
                  Get started by creating your first deal
                </p>
                <Button variant="primary" asChild>
                  <Link href="/dashboard/deals/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Deal
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
          </TabsContent>
        </Tabs>
      </Container>
    </div>
  );
}
