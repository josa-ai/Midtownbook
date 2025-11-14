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
import { EventCard } from '@/components/business/event-card';
import { StatCard } from '@/components/dashboard/stat-card';
import { ArrowLeft, Plus, Calendar, Users, TrendingUp, Edit, Trash2, Eye } from 'lucide-react';
import { format } from 'date-fns';

interface Event {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl?: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  isOnline: boolean;
  onlineUrl?: string;
  price: number;
  maxAttendees?: number;
  attendeeCount: number;
  status: 'draft' | 'published' | 'cancelled';
  tags?: string[];
}

export function EventsListContent() {
  const [activeTab, setActiveTab] = React.useState('all');
  const [sortBy, setSortBy] = React.useState('date-desc');

  // Mock events data
  const mockEvents: Event[] = [
    {
      id: '1',
      slug: 'summer-music-festival',
      title: 'Summer Music Festival',
      description: 'Join us for an unforgettable evening of live music featuring talented local artists.',
      imageUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800',
      startDate: new Date('2024-07-15T18:00:00'),
      endDate: new Date('2024-07-15T23:00:00'),
      location: 'Midtown Park, 456 Park Avenue',
      isOnline: false,
      price: 15,
      maxAttendees: 500,
      attendeeCount: 342,
      status: 'published',
      tags: ['Music', 'Outdoor'],
    },
    {
      id: '2',
      slug: 'cooking-workshop',
      title: 'Italian Cooking Workshop',
      description: 'Learn to make authentic Italian pasta from scratch with our expert chef.',
      imageUrl: 'https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=800',
      startDate: new Date('2024-06-20T14:00:00'),
      endDate: new Date('2024-06-20T17:00:00'),
      location: 'Sunrise Café, 123 Main St',
      isOnline: false,
      price: 45,
      maxAttendees: 20,
      attendeeCount: 18,
      status: 'published',
      tags: ['Workshop', 'Food'],
    },
    {
      id: '3',
      slug: 'virtual-wine-tasting',
      title: 'Virtual Wine Tasting Experience',
      description: 'Taste and learn about premium wines from the comfort of your home.',
      startDate: new Date('2024-08-10T19:00:00'),
      endDate: new Date('2024-08-10T21:00:00'),
      isOnline: true,
      onlineUrl: 'https://zoom.us/j/123456789',
      price: 35,
      maxAttendees: 50,
      attendeeCount: 12,
      status: 'published',
      tags: ['Online', 'Wine'],
    },
    {
      id: '4',
      slug: 'fall-harvest-dinner',
      title: 'Fall Harvest Dinner',
      description: 'A seasonal five-course dinner featuring local ingredients.',
      startDate: new Date('2024-09-25T18:30:00'),
      endDate: new Date('2024-09-25T22:00:00'),
      location: 'Sunrise Café, 123 Main St',
      isOnline: false,
      price: 75,
      maxAttendees: 40,
      attendeeCount: 0,
      status: 'draft',
      tags: ['Dinner', 'Seasonal'],
    },
  ];

  const stats = {
    totalEvents: 4,
    upcomingEvents: 3,
    totalAttendees: 372,
    revenue: 15840,
  };

  const filterEvents = (events: Event[]) => {
    let filtered = [...events];

    // Filter by status
    if (activeTab !== 'all') {
      filtered = filtered.filter((e) => e.status === activeTab);
    }

    // Sort events
    if (sortBy === 'date-desc') {
      filtered.sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
    } else if (sortBy === 'date-asc') {
      filtered.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
    } else if (sortBy === 'attendees-desc') {
      filtered.sort((a, b) => b.attendeeCount - a.attendeeCount);
    } else if (sortBy === 'attendees-asc') {
      filtered.sort((a, b) => a.attendeeCount - b.attendeeCount);
    }

    return filtered;
  };

  const filteredEvents = filterEvents(mockEvents);

  const handleDelete = async (eventId: string) => {
    // TODO: Implement Supabase delete
    console.log('Delete event:', eventId);
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
                Events
              </h1>
              <p className="text-body-md text-muted-foreground">
                Manage your business events and track attendance
              </p>
            </div>
            <Button variant="primary" size="lg" asChild>
              <Link href="/dashboard/events/new">
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Events"
            value={stats.totalEvents}
            icon={Calendar}
           
          />
          <StatCard
            title="Upcoming Events"
            value={stats.upcomingEvents}
            icon={TrendingUp}
            variant="primary"
          />
          <StatCard
            title="Total Attendees"
            value={stats.totalAttendees.toLocaleString()}
            icon={Users}
            variant="success"
          />
          <StatCard
            title="Revenue"
            value={`$${stats.revenue.toLocaleString()}`}
            icon={TrendingUp}
           
          />
        </div>

        {/* Filters and Events List */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="all">All ({mockEvents.length})</TabsTrigger>
              <TabsTrigger value="published">
                Published ({mockEvents.filter((e) => e.status === 'published').length})
              </TabsTrigger>
              <TabsTrigger value="draft">
                Drafts ({mockEvents.filter((e) => e.status === 'draft').length})
              </TabsTrigger>
              <TabsTrigger value="cancelled">
                Cancelled ({mockEvents.filter((e) => e.status === 'cancelled').length})
              </TabsTrigger>
            </TabsList>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">Newest First</SelectItem>
                <SelectItem value="date-asc">Oldest First</SelectItem>
                <SelectItem value="attendees-desc">Most Attendees</SelectItem>
                <SelectItem value="attendees-asc">Least Attendees</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Events List */}
          <TabsContent value={activeTab}>
          {filteredEvents.length > 0 ? (
            <div className="space-y-6">
              {filteredEvents.map((event) => (
                <Card key={event.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      {/* Event Card Preview */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-serif font-semibold text-heading-md">
                                {event.title}
                              </h3>
                              <Badge
                                variant={
                                  event.status === 'published'
                                    ? 'success'
                                    : event.status === 'draft'
                                    ? 'warning'
                                    : 'error'
                                }
                              >
                                {event.status}
                              </Badge>
                            </div>
                            <p className="text-body-sm text-muted-foreground mb-3">
                              {event.description}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-label-xs text-muted-foreground mb-1">Date</p>
                            <p className="text-body-sm font-medium">
                              {format(event.startDate, 'MMM d, yyyy')}
                            </p>
                          </div>
                          <div>
                            <p className="text-label-xs text-muted-foreground mb-1">Time</p>
                            <p className="text-body-sm font-medium">
                              {format(event.startDate, 'h:mm a')}
                            </p>
                          </div>
                          <div>
                            <p className="text-label-xs text-muted-foreground mb-1">Attendees</p>
                            <p className="text-body-sm font-medium">
                              {event.attendeeCount}
                              {event.maxAttendees && ` / ${event.maxAttendees}`}
                            </p>
                          </div>
                          <div>
                            <p className="text-label-xs text-muted-foreground mb-1">Revenue</p>
                            <p className="text-body-sm font-medium">
                              ${(event.price * event.attendeeCount).toLocaleString()}
                            </p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/events/${event.slug}`}>
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
                                <AlertDialogTitle>Delete Event?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the
                                  event and all associated data.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(event.id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-heading-sm mb-2">No events found</h3>
                <p className="text-body-sm text-muted-foreground mb-6">
                  Get started by creating your first event
                </p>
                <Button variant="primary" asChild>
                  <Link href="/dashboard/events/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Event
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
