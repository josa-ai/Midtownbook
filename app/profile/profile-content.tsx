'use client';

import * as React from 'react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { BusinessCard } from '@/components/business/business-card';
import { ReviewCard } from '@/components/business/review-card';
import { Save, Upload, Heart, Star, MapPin } from 'lucide-react';

export function ProfileContent() {
  const [activeTab, setActiveTab] = React.useState('info');
  const [isLoading, setIsLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const [profileData, setProfileData] = React.useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    bio: 'Food enthusiast and local business supporter',
    location: 'Midtown, CA',
    website: '',
  });

  const [notificationSettings, setNotificationSettings] = React.useState({
    emailReviews: true,
    emailEvents: true,
    emailDeals: true,
    emailNewsletter: false,
  });

  // Mock favorites
  const mockFavorites = [
    {
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
    },
  ];

  // Mock reviews written by user
  const mockUserReviews = [
    {
      id: '1',
      userId: 'user-1',
      userName: 'John Doe',
      userAvatar: 'https://i.pravatar.cc/150?img=10',
      rating: 5,
      title: 'Amazing coffee!',
      content: 'Best café in Midtown. The atmosphere is perfect for getting work done.',
      createdAt: new Date('2024-01-15'),
      helpfulCount: 12,
      isVerifiedPurchase: true,
      businessName: 'Sunrise Café',
      businessSlug: 'sunrise-cafe',
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // TODO: Implement Supabase profile update
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveNotifications = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement notification preferences update
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12">
      <Container size="xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-24 h-24 rounded-full bg-neutral-200 flex items-center justify-center text-heading-xl font-serif text-neutral-600">
              JD
            </div>
            <div>
              <h1 className="font-serif font-bold text-display-sm text-foreground mb-2">
                {profileData.name}
              </h1>
              <div className="flex items-center gap-2 text-body-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {profileData.location}
              </div>
            </div>
          </div>
        </div>

        {success && (
          <div className="mb-6 p-4 rounded-lg bg-success/10 border border-success text-success">
            Changes saved successfully!
          </div>
        )}

        {/* Profile Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList variant="line">
            <TabsTrigger value="info">Profile Info</TabsTrigger>
            <TabsTrigger value="reviews">My Reviews ({mockUserReviews.length})</TabsTrigger>
            <TabsTrigger value="favorites">Favorites ({mockFavorites.length})</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Profile Info Tab */}
          <TabsContent value="info" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSaveProfile} className="space-y-6">
                  <div>
                    <Label>Profile Photo</Label>
                    <div className="mt-2 flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full bg-neutral-200 flex items-center justify-center text-heading-lg font-serif text-neutral-600">
                        JD
                      </div>
                      <div>
                        <Button type="button" variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Photo
                        </Button>
                        <p className="text-label-xs text-muted-foreground mt-2">
                          JPG, PNG or GIF. Max size 2MB.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={profileData.phone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={handleChange}
                        placeholder="City, State"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={handleChange}
                      placeholder="Tell us about yourself..."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      value={profileData.website}
                      onChange={handleChange}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" variant="primary" loading={isLoading}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              {mockUserReviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <a
                        href={`/businesses/${review.businessSlug}`}
                        className="font-semibold text-heading-sm text-primary-600 hover:text-primary-700"
                      >
                        {review.businessName}
                      </a>
                    </div>
                    <ReviewCard review={review} showActions={true} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="mt-6">
            <div className="grid grid-cols-1 gap-6">
              {mockFavorites.map((business) => (
                <Card key={business.id}>
                  <CardContent className="p-6">
                    <BusinessCard business={business} variant="list" showActions={true} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="mt-6">
            <div className="space-y-6">
              {/* Notification Settings */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-serif font-semibold text-heading-sm mb-6">
                    Email Notifications
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-body-sm">Review Responses</p>
                        <p className="text-label-sm text-muted-foreground">
                          Get notified when businesses respond to your reviews
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.emailReviews}
                        onCheckedChange={(checked) =>
                          setNotificationSettings((prev) => ({ ...prev, emailReviews: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-body-sm">Event Updates</p>
                        <p className="text-label-sm text-muted-foreground">
                          Updates about events you're interested in
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.emailEvents}
                        onCheckedChange={(checked) =>
                          setNotificationSettings((prev) => ({ ...prev, emailEvents: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-body-sm">Deals & Offers</p>
                        <p className="text-label-sm text-muted-foreground">
                          Special deals from your favorite businesses
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.emailDeals}
                        onCheckedChange={(checked) =>
                          setNotificationSettings((prev) => ({ ...prev, emailDeals: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-body-sm">Newsletter</p>
                        <p className="text-label-sm text-muted-foreground">
                          Weekly newsletter with local highlights
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.emailNewsletter}
                        onCheckedChange={(checked) =>
                          setNotificationSettings((prev) => ({
                            ...prev,
                            emailNewsletter: checked,
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <Button variant="primary" onClick={handleSaveNotifications} loading={isLoading}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Preferences
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Account Actions */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-serif font-semibold text-heading-sm mb-6">
                    Account Actions
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Button variant="outline" className="w-full md:w-auto">
                        Change Password
                      </Button>
                    </div>
                    <div className="border-t pt-4">
                      <p className="text-body-sm text-muted-foreground mb-3">
                        Deleting your account will permanently remove all your data, including
                        reviews and favorites.
                      </p>
                      <Button variant="destructive">Delete Account</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Stats Card */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="font-serif font-semibold text-heading-sm mb-6">Your Activity</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 mx-auto mb-2">
                  <Star className="h-6 w-6 text-primary-600" />
                </div>
                <p className="font-bold text-heading-lg">{mockUserReviews.length}</p>
                <p className="text-label-sm text-muted-foreground">Reviews Written</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent-100 mx-auto mb-2">
                  <Heart className="h-6 w-6 text-accent-600" />
                </div>
                <p className="font-bold text-heading-lg">{mockFavorites.length}</p>
                <p className="text-label-sm text-muted-foreground">Favorites</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary-100 mx-auto mb-2">
                  <MapPin className="h-6 w-6 text-secondary-600" />
                </div>
                <p className="font-bold text-heading-lg">3</p>
                <p className="text-label-sm text-muted-foreground">Places Visited</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-success/10 mx-auto mb-2">
                  <Badge variant="success" className="text-label-xs">
                    Active
                  </Badge>
                </div>
                <p className="font-bold text-heading-lg">2 mo</p>
                <p className="text-label-sm text-muted-foreground">Member Since</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
