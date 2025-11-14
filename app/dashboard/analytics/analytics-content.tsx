'use client';

import * as React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StatCard } from '@/components/dashboard/stat-card';
import {
  ArrowLeft,
  Eye,
  Star,
  Users,
  TrendingUp,
  MapPin,
  Clock,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';

export function AnalyticsContent() {
  const [activeTab, setActiveTab] = React.useState('overview');
  const [dateRange, setDateRange] = React.useState('30d');

  // Mock analytics data
  const stats = {
    views: 3247,
    viewsTrend: 15.2,
    rating: 4.5,
    ratingTrend: 0.3,
    reviews: 89,
    reviewsTrend: 12,
    clicks: 542,
    clicksTrend: -3.4,
  };

  const trafficSources = [
    { source: 'Google Search', visits: 1234, percentage: 38, trend: 12.5 },
    { source: 'Direct', visits: 892, percentage: 27, trend: -5.2 },
    { source: 'Social Media', visits: 654, percentage: 20, trend: 24.1 },
    { source: 'Referrals', visits: 467, percentage: 15, trend: 8.3 },
  ];

  const topPages = [
    { page: 'Business Profile', views: 1547, avgTime: '2:34' },
    { page: 'Photo Gallery', views: 892, avgTime: '1:45' },
    { page: 'Reviews', views: 543, avgTime: '3:12' },
    { page: 'Contact Info', views: 265, avgTime: '0:58' },
  ];

  const demographics = [
    { age: '18-24', percentage: 12 },
    { age: '25-34', percentage: 34 },
    { age: '35-44', percentage: 28 },
    { age: '45-54', percentage: 16 },
    { age: '55+', percentage: 10 },
  ];

  const peakHours = [
    { hour: '8-10 AM', views: 245 },
    { hour: '10-12 PM', views: 432 },
    { hour: '12-2 PM', views: 687 },
    { hour: '2-4 PM', views: 521 },
    { hour: '4-6 PM', views: 589 },
    { hour: '6-8 PM', views: 773 },
  ];

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
                Analytics
              </h1>
              <p className="text-body-md text-muted-foreground">
                Track your business performance and insights
              </p>
            </div>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="12m">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Views"
            value={stats.views.toLocaleString()}
            icon={Eye}
            trend={{
              value: stats.viewsTrend,
              isPositive: true,
              label: 'vs last period',
            }}
            variant="default"
          />
          <StatCard
            title="Average Rating"
            value={stats.rating.toFixed(1)}
            icon={Star}
            trend={{
              value: stats.ratingTrend,
              isPositive: true,
            }}
            variant="primary"
          />
          <StatCard
            title="Total Reviews"
            value={stats.reviews}
            icon={Users}
            trend={{
              value: stats.reviewsTrend,
              isPositive: true,
              label: 'this period',
            }}
            variant="success"
          />
          <StatCard
            title="Profile Clicks"
            value={stats.clicks}
            icon={TrendingUp}
            trend={{
              value: stats.clicksTrend,
              isPositive: false,
              label: 'vs last period',
            }}
            variant="default"
          />
        </div>

        {/* Analytics Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList variant="line">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="traffic">Traffic</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Traffic Sources */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-serif font-semibold text-heading-sm mb-4">
                    Traffic Sources
                  </h3>
                  <div className="space-y-4">
                    {trafficSources.map((source) => (
                      <div key={source.source}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-body-sm font-medium">{source.source}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-body-sm text-muted-foreground">
                              {source.visits.toLocaleString()}
                            </span>
                            <span
                              className={`text-label-xs flex items-center ${
                                source.trend >= 0 ? 'text-success' : 'text-error'
                              }`}
                            >
                              {source.trend >= 0 ? (
                                <ChevronUp className="h-3 w-3" />
                              ) : (
                                <ChevronDown className="h-3 w-3" />
                              )}
                              {Math.abs(source.trend)}%
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-neutral-100 rounded-full h-2">
                          <div
                            className="bg-primary-600 h-2 rounded-full"
                            style={{ width: `${source.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Pages */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-serif font-semibold text-heading-sm mb-4">
                    Top Pages
                  </h3>
                  <div className="space-y-4">
                    {topPages.map((page) => (
                      <div key={page.page} className="flex items-center justify-between">
                        <div>
                          <p className="text-body-sm font-medium">{page.page}</p>
                          <p className="text-label-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Avg. {page.avgTime}
                          </p>
                        </div>
                        <span className="text-body-sm font-medium">
                          {page.views.toLocaleString()} views
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Peak Hours */}
              <Card className="lg:col-span-2">
                <CardContent className="p-6">
                  <h3 className="font-serif font-semibold text-heading-sm mb-4">
                    Peak Traffic Hours
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {peakHours.map((hour) => (
                      <div key={hour.hour} className="text-center">
                        <div className="mb-2">
                          <div className="h-24 bg-neutral-100 rounded-lg relative overflow-hidden">
                            <div
                              className="absolute bottom-0 w-full bg-primary-600 rounded-t-lg"
                              style={{
                                height: `${(hour.views / Math.max(...peakHours.map((h) => h.views))) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                        <p className="text-label-xs font-medium">{hour.hour}</p>
                        <p className="text-label-xs text-muted-foreground">{hour.views}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Traffic Tab */}
          <TabsContent value="traffic" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-serif font-semibold text-heading-sm mb-4">
                  Traffic Analysis
                </h3>
                <p className="text-body-sm text-muted-foreground">
                  Detailed traffic charts will be displayed here. Integration with analytics
                  library (Recharts, Chart.js) needed.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Engagement Tab */}
          <TabsContent value="engagement" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-serif font-semibold text-heading-sm mb-4">
                    Review Performance
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-body-sm">5 Stars</span>
                      <div className="flex items-center gap-3 flex-1 ml-4">
                        <div className="flex-1 bg-neutral-100 rounded-full h-2">
                          <div className="bg-success h-2 rounded-full" style={{ width: '68%' }} />
                        </div>
                        <span className="text-label-sm text-muted-foreground w-12 text-right">
                          68%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-body-sm">4 Stars</span>
                      <div className="flex items-center gap-3 flex-1 ml-4">
                        <div className="flex-1 bg-neutral-100 rounded-full h-2">
                          <div className="bg-primary-600 h-2 rounded-full" style={{ width: '22%' }} />
                        </div>
                        <span className="text-label-sm text-muted-foreground w-12 text-right">
                          22%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-body-sm">3 Stars</span>
                      <div className="flex items-center gap-3 flex-1 ml-4">
                        <div className="flex-1 bg-neutral-100 rounded-full h-2">
                          <div className="bg-accent-600 h-2 rounded-full" style={{ width: '7%' }} />
                        </div>
                        <span className="text-label-sm text-muted-foreground w-12 text-right">
                          7%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-body-sm">2 Stars</span>
                      <div className="flex items-center gap-3 flex-1 ml-4">
                        <div className="flex-1 bg-neutral-100 rounded-full h-2">
                          <div className="bg-warning h-2 rounded-full" style={{ width: '2%' }} />
                        </div>
                        <span className="text-label-sm text-muted-foreground w-12 text-right">
                          2%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-body-sm">1 Star</span>
                      <div className="flex items-center gap-3 flex-1 ml-4">
                        <div className="flex-1 bg-neutral-100 rounded-full h-2">
                          <div className="bg-error h-2 rounded-full" style={{ width: '1%' }} />
                        </div>
                        <span className="text-label-sm text-muted-foreground w-12 text-right">
                          1%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-serif font-semibold text-heading-sm mb-4">
                    User Actions
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-body-sm">Phone Clicks</span>
                      <span className="text-heading-sm font-semibold">234</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-body-sm">Website Clicks</span>
                      <span className="text-heading-sm font-semibold">189</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-body-sm">Direction Requests</span>
                      <span className="text-heading-sm font-semibold">567</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-body-sm">Favorites</span>
                      <span className="text-heading-sm font-semibold">123</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-body-sm">Shares</span>
                      <span className="text-heading-sm font-semibold">45</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Demographics Tab */}
          <TabsContent value="demographics" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-serif font-semibold text-heading-sm mb-4">
                    Age Distribution
                  </h3>
                  <div className="space-y-4">
                    {demographics.map((demo) => (
                      <div key={demo.age}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-body-sm font-medium">{demo.age}</span>
                          <span className="text-body-sm text-muted-foreground">
                            {demo.percentage}%
                          </span>
                        </div>
                        <div className="w-full bg-neutral-100 rounded-full h-2">
                          <div
                            className="bg-primary-600 h-2 rounded-full"
                            style={{ width: `${demo.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-serif font-semibold text-heading-sm mb-4">
                    Location
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-body-sm">Midtown</span>
                      </div>
                      <span className="text-body-sm font-medium">45%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-body-sm">Downtown</span>
                      </div>
                      <span className="text-body-sm font-medium">28%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-body-sm">Uptown</span>
                      </div>
                      <span className="text-body-sm font-medium">15%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-body-sm">Other Areas</span>
                      </div>
                      <span className="text-body-sm font-medium">12%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Container>
    </div>
  );
}
