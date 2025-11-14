'use client';

import * as React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { StatCard } from '@/components/dashboard/stat-card';
import { ActivityFeed, Activity } from '@/components/dashboard/activity-feed';
import { BusinessCard } from '@/components/business/business-card';
import { ReviewCard } from '@/components/business/review-card';
import { EmptyState } from '@/components/ui/empty-state';
import {
  TrendingUp,
  Eye,
  Star,
  Users,
  Calendar,
  Plus,
  Settings,
  BarChart3
} from 'lucide-react';

interface DashboardContentProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

// Mock data
const mockStats = {
  views: 1247,
  viewsTrend: 12.5,
  rating: 4.5,
  ratingTrend: 0.3,
  reviews: 89,
  reviewsTrend: 8,
  clicks: 342,
  clicksTrend: -2.1,
};

const mockBusiness = {
  id: '1',
  slug: 'sunrise-cafe',
  name: 'Sunrise Café',
  description: 'Cozy neighborhood café serving fresh pastries and artisan coffee',
  category: 'Restaurant',
  address: '123 Main St, Midtown',
  coverImageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
  rating: 4.5,
  reviewCount: 89,
  isOpen: true,
  isVerified: true,
};

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'review',
    title: 'New review from Sarah Johnson',
    description: 'Left a 5-star review',
    timestamp: new Date('2024-01-15T10:30:00'),
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    badge: { text: '5 stars', variant: 'success' },
  },
  {
    id: '2',
    type: 'event',
    title: 'Event RSVP',
    description: '3 new attendees for Summer Music Festival',
    timestamp: new Date('2024-01-15T09:15:00'),
    iconColor: 'bg-accent-500',
  },
  {
    id: '3',
    type: 'update',
    title: 'Business hours updated',
    description: 'Your business hours have been updated successfully',
    timestamp: new Date('2024-01-14T16:45:00'),
    iconColor: 'bg-primary-500',
  },
];

const mockRecentReviews = [
  {
    id: '1',
    userId: 'user-1',
    userName: 'Sarah Johnson',
    userAvatar: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
    title: 'Amazing coffee!',
    content: 'Best café in Midtown. The atmosphere is perfect for getting work done.',
    createdAt: new Date('2024-01-15'),
    helpfulCount: 12,
    isVerifiedPurchase: true,
  },
];

export function DashboardContent({ user }: DashboardContentProps) {
  const [activeTab, setActiveTab] = React.useState('overview');

  return (
    <div className="py-8">
      <Container size="xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="font-serif font-bold text-display-sm text-foreground mb-2">
                Welcome back, {user.name}
              </h1>
              <p className="text-body-md text-muted-foreground">
                Here's what's happening with your business today
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="md" asChild>
                <Link href="/dashboard/settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
              </Button>
              <Button variant="primary" size="md" asChild>
                <Link href={`/businesses/${mockBusiness.slug}`}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Public Profile
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Views"
            value={mockStats.views.toLocaleString()}
            icon={Eye}
            trend={{
              value: mockStats.viewsTrend,
              isPositive: true,
              label: 'vs last month',
            }}
           
          />
          <StatCard
            title="Average Rating"
            value={mockStats.rating.toFixed(1)}
            icon={Star}
            trend={{
              value: mockStats.ratingTrend,
              isPositive: true,
            }}
            variant="primary"
          />
          <StatCard
            title="Total Reviews"
            value={mockStats.reviews}
            icon={Users}
            trend={{
              value: mockStats.reviewsTrend,
              isPositive: true,
              label: 'this month',
            }}
            variant="success"
          />
          <StatCard
            title="Profile Clicks"
            value={mockStats.clicks}
            icon={TrendingUp}
            trend={{
              value: mockStats.clicksTrend,
              isPositive: false,
              label: 'vs last week',
            }}
           
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Business & Tabs */}
          <div className="lg:col-span-2 space-y-6">
            {/* Business Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-serif font-semibold text-heading-md">
                    Your Business
                  </h2>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/dashboard/edit">Edit</Link>
                  </Button>
                </div>
                <BusinessCard
                  business={mockBusiness}
                  variant="list"
                  showActions={false}
                />
              </CardContent>
            </Card>

            {/* Tabs */}
            <Card>
              <CardContent className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-heading-sm mb-4">
                        Quick Actions
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="justify-start h-auto py-4" asChild>
                          <Link href="/dashboard/events/new">
                            <Calendar className="h-5 w-5 mr-3" />
                            <div className="text-left">
                              <div className="font-medium">Create Event</div>
                              <div className="text-label-xs text-muted-foreground">
                                Host an event
                              </div>
                            </div>
                          </Link>
                        </Button>
                        <Button variant="outline" className="justify-start h-auto py-4" asChild>
                          <Link href="/dashboard/deals/new">
                            <Plus className="h-5 w-5 mr-3" />
                            <div className="text-left">
                              <div className="font-medium">Add Deal</div>
                              <div className="text-label-xs text-muted-foreground">
                                Create special offer
                              </div>
                            </div>
                          </Link>
                        </Button>
                        <Button variant="outline" className="justify-start h-auto py-4" asChild>
                          <Link href="/dashboard/analytics">
                            <BarChart3 className="h-5 w-5 mr-3" />
                            <div className="text-left">
                              <div className="font-medium">View Analytics</div>
                              <div className="text-label-xs text-muted-foreground">
                                Detailed insights
                              </div>
                            </div>
                          </Link>
                        </Button>
                        <Button variant="outline" className="justify-start h-auto py-4" asChild>
                          <Link href="/dashboard/settings">
                            <Settings className="h-5 w-5 mr-3" />
                            <div className="text-left">
                              <div className="font-medium">Settings</div>
                              <div className="text-label-xs text-muted-foreground">
                                Manage account
                              </div>
                            </div>
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="reviews" className="mt-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-heading-sm">
                          Recent Reviews
                        </h3>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href="/dashboard/reviews">View All</Link>
                        </Button>
                      </div>
                      {mockRecentReviews.map((review) => (
                        <ReviewCard
                          key={review.id}
                          review={review}
                          showActions={false}
                        />
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="analytics" className="mt-6">
                    <EmptyState
                      icon={BarChart3}
                      title="Analytics Coming Soon"
                      description="Detailed analytics and insights will be available here"
                      action={
                        <Button variant="primary" asChild>
                          <Link href="/dashboard">Back to Dashboard</Link>
                        </Button>
                      }
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Activity Feed */}
          <div>
            <h2 className="font-serif font-semibold text-heading-md mb-4">
              Recent Activity
            </h2>
            <ActivityFeed activities={mockActivities} />
          </div>
        </div>
      </Container>
    </div>
  );
}
