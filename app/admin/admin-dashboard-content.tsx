'use client';

import * as React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { StatCard } from '@/components/dashboard/stat-card';
import { ActivityFeed, Activity } from '@/components/dashboard/activity-feed';
import { Button } from '@/components/ui/button';
import {
  Users,
  Building2,
  MessageSquare,
  AlertTriangle,
  TrendingUp,
  Shield,
  FileText,
  Settings,
} from 'lucide-react';

interface AdminDashboardContentProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export function AdminDashboardContent({ user }: AdminDashboardContentProps) {
  // Mock admin stats
  const stats = {
    totalUsers: 1247,
    usersTrend: 8.2,
    totalBusinesses: 342,
    businessesTrend: 5.4,
    totalReviews: 5823,
    reviewsTrend: 12.3,
    pendingModeration: 23,
  };

  // Mock recent activity
  const recentActivity: Activity[] = [
    {
      id: '1',
      type: 'system',
      title: 'New business registered',
      description: 'Sunset Bistro added their business listing',
      timestamp: new Date('2024-01-15T14:30:00'),
      badge: { text: 'Pending', variant: 'warning' },
    },
    {
      id: '2',
      type: 'system',
      title: 'Review flagged for moderation',
      description: 'Review reported by user for inappropriate content',
      timestamp: new Date('2024-01-15T13:15:00'),
      badge: { text: 'Action Required', variant: 'error' },
    },
    {
      id: '3',
      type: 'system',
      title: 'New user registered',
      description: 'John Smith created an account',
      timestamp: new Date('2024-01-15T12:00:00'),
      badge: { text: 'New', variant: 'success' },
    },
    {
      id: '4',
      type: 'system',
      title: 'Business verification completed',
      description: 'The Garden Café has been verified',
      timestamp: new Date('2024-01-15T11:30:00'),
      badge: { text: 'Completed', variant: 'success' },
    },
  ];

  return (
    <div className="py-8">
      <Container size="xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary-600 flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-serif font-bold text-display-sm text-foreground">
                Admin Dashboard
              </h1>
              <p className="text-body-md text-muted-foreground">
                Welcome back, {user.name}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={stats.totalUsers.toLocaleString()}
            icon={Users}
            trend={{
              value: stats.usersTrend,
              isPositive: true,
              label: 'vs last month',
            }}
           
          />
          <StatCard
            title="Total Businesses"
            value={stats.totalBusinesses}
            icon={Building2}
            trend={{
              value: stats.businessesTrend,
              isPositive: true,
              label: 'vs last month',
            }}
            variant="primary"
          />
          <StatCard
            title="Total Reviews"
            value={stats.totalReviews.toLocaleString()}
            icon={MessageSquare}
            trend={{
              value: stats.reviewsTrend,
              isPositive: true,
              label: 'vs last month',
            }}
            variant="success"
          />
          <StatCard
            title="Pending Moderation"
            value={stats.pendingModeration}
            icon={AlertTriangle}
            variant="warning"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="font-serif font-semibold text-heading-md mb-6">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="justify-start h-auto py-4"
                    asChild
                  >
                    <Link href="/admin/users">
                      <Users className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">Manage Users</div>
                        <div className="text-label-xs text-muted-foreground">
                          View and manage user accounts
                        </div>
                      </div>
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    className="justify-start h-auto py-4"
                    asChild
                  >
                    <Link href="/admin/businesses">
                      <Building2 className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">Manage Businesses</div>
                        <div className="text-label-xs text-muted-foreground">
                          Review and approve listings
                        </div>
                      </div>
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    className="justify-start h-auto py-4"
                    asChild
                  >
                    <Link href="/admin/moderation">
                      <MessageSquare className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">Content Moderation</div>
                        <div className="text-label-xs text-muted-foreground">
                          Review flagged content
                        </div>
                      </div>
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    className="justify-start h-auto py-4"
                    asChild
                  >
                    <Link href="/admin/analytics">
                      <TrendingUp className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">Analytics</div>
                        <div className="text-label-xs text-muted-foreground">
                          Platform insights
                        </div>
                      </div>
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    className="justify-start h-auto py-4"
                    asChild
                  >
                    <Link href="/admin/content">
                      <FileText className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">Content Management</div>
                        <div className="text-label-xs text-muted-foreground">
                          Manage blog posts & pages
                        </div>
                      </div>
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    className="justify-start h-auto py-4"
                    asChild
                  >
                    <Link href="/admin/settings">
                      <Settings className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">System Settings</div>
                        <div className="text-label-xs text-muted-foreground">
                          Configure platform
                        </div>
                      </div>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Pending Actions */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-serif font-semibold text-heading-md">
                    Pending Actions
                  </h2>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/admin/moderation">View All</Link>
                  </Button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-warning/5 border border-warning/20">
                    <div>
                      <p className="font-medium text-body-sm">Business Verifications</p>
                      <p className="text-label-sm text-muted-foreground">
                        5 businesses awaiting verification
                      </p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/admin/businesses?status=pending">Review</Link>
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-error/5 border border-error/20">
                    <div>
                      <p className="font-medium text-body-sm">Flagged Reviews</p>
                      <p className="text-label-sm text-muted-foreground">
                        8 reviews reported for moderation
                      </p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/admin/moderation?type=reviews">Review</Link>
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-primary-50 border border-primary-200">
                    <div>
                      <p className="font-medium text-body-sm">Support Tickets</p>
                      <p className="text-label-sm text-muted-foreground">
                        12 tickets awaiting response
                      </p>
                    </div>
                    <Button variant="outline" size="sm">Review</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Activity Feed */}
          <div>
            <h2 className="font-serif font-semibold text-heading-md mb-4">
              Recent Activity
            </h2>
            <ActivityFeed activities={recentActivity} />
          </div>
        </div>
      </Container>
    </div>
  );
}
