'use client';

import * as React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Upload } from 'lucide-react';

export function SettingsContent() {
  const [activeTab, setActiveTab] = React.useState('business');
  const [isLoading, setIsLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const [businessSettings, setBusinessSettings] = React.useState({
    name: 'Sunrise Café',
    description: 'Cozy neighborhood café serving fresh pastries and artisan coffee',
    category: 'restaurant',
    phone: '(555) 123-4567',
    email: 'hello@sunrisecafe.com',
    website: 'https://sunrisecafe.com',
    address: '123 Main St',
    city: 'Midtown',
    state: 'CA',
    zipCode: '94102',
  });

  const [accountSettings, setAccountSettings] = React.useState({
    ownerName: 'John Doe',
    ownerEmail: 'owner@business.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notificationSettings, setNotificationSettings] = React.useState({
    emailReviews: true,
    emailMessages: true,
    emailEvents: false,
    emailMarketing: true,
    pushReviews: true,
    pushMessages: false,
  });

  const handleBusinessSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // TODO: Implement Supabase update
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccountSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // TODO: Implement Supabase auth update
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationSave = async () => {
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
          <h1 className="font-serif font-bold text-display-sm text-foreground mb-2">
            Settings
          </h1>
          <p className="text-body-md text-muted-foreground">
            Manage your business profile, account, and preferences
          </p>
        </div>

        {success && (
          <div className="mb-6 p-4 rounded-lg bg-success/10 border border-success text-success">
            Settings saved successfully!
          </div>
        )}

        {/* Settings Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList variant="line">
            <TabsTrigger value="business">Business Profile</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          {/* Business Profile Tab */}
          <TabsContent value="business" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleBusinessSave} className="space-y-6">
                  {/* Business Logo */}
                  <div>
                    <Label>Business Logo</Label>
                    <div className="mt-2 flex items-center gap-4">
                      <div className="w-24 h-24 rounded-lg bg-neutral-100 flex items-center justify-center">
                        <span className="text-heading-lg font-serif text-neutral-400">SC</span>
                      </div>
                      <div>
                        <Button type="button" variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload New Logo
                        </Button>
                        <p className="text-label-xs text-muted-foreground mt-2">
                          JPG, PNG or GIF. Max size 2MB.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Business Name *</Label>
                      <Input
                        id="name"
                        value={businessSettings.name}
                        onChange={(e) =>
                          setBusinessSettings((prev) => ({ ...prev, name: e.target.value }))
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={businessSettings.category}
                        onValueChange={(value) =>
                          setBusinessSettings((prev) => ({ ...prev, category: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="restaurant">Restaurant</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="services">Services</SelectItem>
                          <SelectItem value="entertainment">Entertainment</SelectItem>
                          <SelectItem value="health">Health & Wellness</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={businessSettings.description}
                      onChange={(e) =>
                        setBusinessSettings((prev) => ({ ...prev, description: e.target.value }))
                      }
                      rows={4}
                      required
                    />
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={businessSettings.phone}
                        onChange={(e) =>
                          setBusinessSettings((prev) => ({ ...prev, phone: e.target.value }))
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={businessSettings.email}
                        onChange={(e) =>
                          setBusinessSettings((prev) => ({ ...prev, email: e.target.value }))
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      value={businessSettings.website}
                      onChange={(e) =>
                        setBusinessSettings((prev) => ({ ...prev, website: e.target.value }))
                      }
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      value={businessSettings.address}
                      onChange={(e) =>
                        setBusinessSettings((prev) => ({ ...prev, address: e.target.value }))
                      }
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={businessSettings.city}
                        onChange={(e) =>
                          setBusinessSettings((prev) => ({ ...prev, city: e.target.value }))
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={businessSettings.state}
                        onChange={(e) =>
                          setBusinessSettings((prev) => ({ ...prev, state: e.target.value }))
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        value={businessSettings.zipCode}
                        onChange={(e) =>
                          setBusinessSettings((prev) => ({ ...prev, zipCode: e.target.value }))
                        }
                        required
                      />
                    </div>
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

          {/* Account Tab */}
          <TabsContent value="account" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleAccountSave} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="ownerName">Full Name *</Label>
                      <Input
                        id="ownerName"
                        value={accountSettings.ownerName}
                        onChange={(e) =>
                          setAccountSettings((prev) => ({ ...prev, ownerName: e.target.value }))
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ownerEmail">Email Address *</Label>
                      <Input
                        id="ownerEmail"
                        type="email"
                        value={accountSettings.ownerEmail}
                        onChange={(e) =>
                          setAccountSettings((prev) => ({ ...prev, ownerEmail: e.target.value }))
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-semibold text-heading-sm mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          value={accountSettings.currentPassword}
                          onChange={(e) =>
                            setAccountSettings((prev) => ({
                              ...prev,
                              currentPassword: e.target.value,
                            }))
                          }
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input
                            id="newPassword"
                            type="password"
                            value={accountSettings.newPassword}
                            onChange={(e) =>
                              setAccountSettings((prev) => ({
                                ...prev,
                                newPassword: e.target.value,
                              }))
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={accountSettings.confirmPassword}
                            onChange={(e) =>
                              setAccountSettings((prev) => ({
                                ...prev,
                                confirmPassword: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </div>
                    </div>
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

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-heading-sm mb-4">Email Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-body-sm">New Reviews</p>
                          <p className="text-label-sm text-muted-foreground">
                            Get notified when someone leaves a review
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
                          <p className="font-medium text-body-sm">Messages</p>
                          <p className="text-label-sm text-muted-foreground">
                            Get notified about new customer messages
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.emailMessages}
                          onCheckedChange={(checked) =>
                            setNotificationSettings((prev) => ({ ...prev, emailMessages: checked }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-body-sm">Event Updates</p>
                          <p className="text-label-sm text-muted-foreground">
                            Updates about your events and RSVPs
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
                          <p className="font-medium text-body-sm">Marketing & Tips</p>
                          <p className="text-label-sm text-muted-foreground">
                            Tips and best practices for your business
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.emailMarketing}
                          onCheckedChange={(checked) =>
                            setNotificationSettings((prev) => ({
                              ...prev,
                              emailMarketing: checked,
                            }))
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-semibold text-heading-sm mb-4">Push Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-body-sm">New Reviews</p>
                          <p className="text-label-sm text-muted-foreground">
                            Push notifications for new reviews
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.pushReviews}
                          onCheckedChange={(checked) =>
                            setNotificationSettings((prev) => ({ ...prev, pushReviews: checked }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-body-sm">Messages</p>
                          <p className="text-label-sm text-muted-foreground">
                            Push notifications for customer messages
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.pushMessages}
                          onCheckedChange={(checked) =>
                            setNotificationSettings((prev) => ({ ...prev, pushMessages: checked }))
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button variant="primary" onClick={handleNotificationSave} loading={isLoading}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Preferences
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-heading-sm mb-2">Current Plan</h3>
                    <p className="text-body-sm text-muted-foreground mb-4">
                      You are currently on the <strong>Free</strong> plan
                    </p>
                    <Button variant="primary">Upgrade to Premium</Button>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-semibold text-heading-sm mb-4">Billing History</h3>
                    <p className="text-body-sm text-muted-foreground">
                      No billing history available
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Container>
    </div>
  );
}
