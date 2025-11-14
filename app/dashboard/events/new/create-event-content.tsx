'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { UploadZone } from '@/components/dashboard/upload-zone';
import { ArrowLeft, Save, Calendar as CalendarIcon } from 'lucide-react';

export function CreateEventContent() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [coverImage, setCoverImage] = React.useState<File | null>(null);
  const [eventData, setEventData] = React.useState({
    title: '',
    description: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    location: '',
    isOnline: false,
    onlineUrl: '',
    price: '',
    maxAttendees: '',
    tags: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEventData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleImageUpload = (files: File[]) => {
    if (files.length > 0) {
      setCoverImage(files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement Supabase event creation
      // 1. Upload cover image to Supabase Storage
      // 2. Create event record with image URL
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Redirect to dashboard or event page
      router.push('/dashboard');
    } catch (error) {
      console.error('Error creating event:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-8">
      <Container size="lg">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 text-body-sm font-medium mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="font-serif font-bold text-display-sm text-foreground mb-2">
            Create Event
          </h1>
          <p className="text-body-md text-muted-foreground">
            Host an event and engage with your community
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-serif font-semibold text-heading-md mb-6">
                    Event Details
                  </h2>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Event Title *</Label>
                      <Input
                        id="title"
                        value={eventData.title}
                        onChange={handleChange}
                        placeholder="e.g., Summer Music Festival"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        value={eventData.description}
                        onChange={handleChange}
                        placeholder="Describe your event, what attendees can expect, and any special details..."
                        rows={6}
                        required
                      />
                      <p className="text-label-xs text-muted-foreground">
                        Minimum 100 characters recommended
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags</Label>
                      <Input
                        id="tags"
                        value={eventData.tags}
                        onChange={handleChange}
                        placeholder="Music, Outdoor, Family Friendly (comma separated)"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Date & Time */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-serif font-semibold text-heading-md mb-6">
                    Date & Time
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date *</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={eventData.startDate}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="startTime">Start Time *</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={eventData.startTime}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date *</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={eventData.endDate}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endTime">End Time *</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={eventData.endTime}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-serif font-semibold text-heading-md mb-6">
                    Location
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="isOnline">Online Event</Label>
                        <p className="text-label-sm text-muted-foreground">
                          This event will be hosted virtually
                        </p>
                      </div>
                      <Switch
                        id="isOnline"
                        checked={eventData.isOnline}
                        onCheckedChange={(checked) =>
                          setEventData((prev) => ({ ...prev, isOnline: checked }))
                        }
                      />
                    </div>

                    {eventData.isOnline ? (
                      <div className="space-y-2">
                        <Label htmlFor="onlineUrl">Meeting URL *</Label>
                        <Input
                          id="onlineUrl"
                          type="url"
                          value={eventData.onlineUrl}
                          onChange={handleChange}
                          placeholder="https://zoom.us/j/123456789"
                          required={eventData.isOnline}
                        />
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Label htmlFor="location">Venue Address *</Label>
                        <Input
                          id="location"
                          value={eventData.location}
                          onChange={handleChange}
                          placeholder="123 Main Street, Midtown, CA 94102"
                          required={!eventData.isOnline}
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Cover Image */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-serif font-semibold text-heading-md mb-6">
                    Cover Image
                  </h2>
                  <UploadZone
                    accept="image/*"
                    maxFiles={1}
                    maxSize={5 * 1024 * 1024}
                    onUpload={handleImageUpload}
                  />
                  {coverImage && (
                    <p className="text-label-sm text-muted-foreground mt-2">
                      Selected: {coverImage.name}
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Ticketing */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-serif font-semibold text-heading-sm mb-6">
                    Ticketing
                  </h2>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="price">Ticket Price ($)</Label>
                      <Input
                        id="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={eventData.price}
                        onChange={handleChange}
                        placeholder="0.00"
                      />
                      <p className="text-label-xs text-muted-foreground">
                        Leave blank or enter 0 for free events
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maxAttendees">Max Attendees</Label>
                      <Input
                        id="maxAttendees"
                        type="number"
                        min="1"
                        value={eventData.maxAttendees}
                        onChange={handleChange}
                        placeholder="Unlimited"
                      />
                      <p className="text-label-xs text-muted-foreground">
                        Leave blank for unlimited capacity
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Preview */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-heading-xs mb-4">
                    Event Preview
                  </h3>
                  {coverImage && (
                    <div className="mb-4 aspect-video bg-neutral-100 rounded-lg overflow-hidden">
                      <img
                        src={URL.createObjectURL(coverImage)}
                        alt="Cover preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-body-md">
                      {eventData.title || 'Event Title'}
                    </h4>
                    <div className="flex items-center gap-2 text-label-sm text-muted-foreground">
                      <CalendarIcon className="h-4 w-4" />
                      {eventData.startDate || 'Select date'}
                    </div>
                    <p className="text-label-sm text-muted-foreground line-clamp-3">
                      {eventData.description || 'Add a description...'}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="space-y-3">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  loading={isLoading}
                  disabled={isLoading}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Create Event
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={() => router.back()}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
}
