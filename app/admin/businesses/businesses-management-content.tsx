'use client';

import * as React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { StatCard } from '@/components/dashboard/stat-card';
import { ArrowLeft, Search, Building2, CheckCircle, XCircle, Eye, AlertTriangle, Star, MapPin, Phone, Mail, Globe } from 'lucide-react';
import { format } from 'date-fns';

interface Business {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  address: string;
  city: string;
  phone?: string;
  email?: string;
  website?: string;
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  isClaimed: boolean;
  isVerified: boolean;
  owner?: {
    name: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
  rating?: number;
  reviewCount: number;
  viewCount: number;
}

export function BusinessesManagementContent() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('pending');
  const [sortBy, setSortBy] = React.useState('recent');
  const [selectedBusiness, setSelectedBusiness] = React.useState<Business | null>(null);
  const [reviewDialogOpen, setReviewDialogOpen] = React.useState(false);
  const [reviewNote, setReviewNote] = React.useState('');
  const [reviewAction, setReviewAction] = React.useState<'approve' | 'reject'>('approve');

  // Mock businesses data
  const mockBusinesses: Business[] = [
    {
      id: '1',
      name: 'Sunrise Café',
      slug: 'sunrise-cafe',
      description: 'Cozy neighborhood café serving artisan coffee and fresh pastries daily.',
      category: 'Restaurant',
      address: '123 Main St',
      city: 'Midtown',
      phone: '(555) 123-4567',
      email: 'info@sunrisecafe.com',
      website: 'https://sunrisecafe.com',
      status: 'pending',
      isClaimed: true,
      isVerified: false,
      owner: {
        name: 'Sarah Johnson',
        email: 'sarah@sunrisecafe.com',
      },
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
      rating: 4.5,
      reviewCount: 24,
      viewCount: 1250,
    },
    {
      id: '2',
      name: 'Tech Repair Plus',
      slug: 'tech-repair-plus',
      description: 'Professional electronics repair service for all devices.',
      category: 'Services',
      address: '456 Oak Ave',
      city: 'Midtown',
      phone: '(555) 234-5678',
      status: 'pending',
      isClaimed: false,
      isVerified: false,
      createdAt: new Date('2024-01-14'),
      updatedAt: new Date('2024-01-14'),
      reviewCount: 0,
      viewCount: 89,
    },
    {
      id: '3',
      name: 'Green Leaf Market',
      slug: 'green-leaf-market',
      description: 'Organic grocery store with locally sourced produce.',
      category: 'Shopping',
      address: '789 Elm St',
      city: 'Midtown',
      phone: '(555) 345-6789',
      email: 'hello@greenleaf.com',
      website: 'https://greenleafmarket.com',
      status: 'approved',
      isClaimed: true,
      isVerified: true,
      owner: {
        name: 'Michael Chen',
        email: 'michael@greenleaf.com',
      },
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-12'),
      rating: 4.8,
      reviewCount: 156,
      viewCount: 5420,
    },
    {
      id: '4',
      name: 'Suspicious Business LLC',
      slug: 'suspicious-business',
      description: 'We do things.',
      category: 'Other',
      address: '000 Unknown St',
      city: 'Midtown',
      status: 'rejected',
      isClaimed: false,
      isVerified: false,
      createdAt: new Date('2024-01-08'),
      updatedAt: new Date('2024-01-09'),
      reviewCount: 0,
      viewCount: 12,
    },
  ];

  const stats = {
    total: 342,
    pending: mockBusinesses.filter((b) => b.status === 'pending').length,
    approved: 298,
    rejected: 12,
    claimed: 245,
  };

  const filterBusinesses = (businesses: Business[]) => {
    let filtered = [...businesses];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (b) =>
          b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by tab
    if (activeTab !== 'all') {
      filtered = filtered.filter((b) => b.status === activeTab);
    }

    // Sort businesses
    if (sortBy === 'recent') {
      filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'views') {
      filtered.sort((a, b) => b.viewCount - a.viewCount);
    }

    return filtered;
  };

  const filteredBusinesses = filterBusinesses(mockBusinesses);

  const handleReview = (business: Business, action: 'approve' | 'reject') => {
    setSelectedBusiness(business);
    setReviewAction(action);
    setReviewDialogOpen(true);
  };

  const handleConfirmReview = async () => {
    if (!selectedBusiness) return;

    // TODO: Implement Supabase business approval/rejection
    console.log(`${reviewAction} business:`, selectedBusiness.id, 'Note:', reviewNote);

    setReviewDialogOpen(false);
    setSelectedBusiness(null);
    setReviewNote('');
  };

  const handleSuspend = async (businessId: string) => {
    // TODO: Implement Supabase business suspension
    console.log('Suspend business:', businessId);
  };

  const handleDelete = async (businessId: string) => {
    // TODO: Implement Supabase business deletion
    console.log('Delete business:', businessId);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'error';
      case 'suspended':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <div className="py-8">
      <Container size="xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 text-body-sm font-medium mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Admin Dashboard
          </Link>
          <h1 className="font-serif font-bold text-display-sm text-foreground mb-2">
            Business Management
          </h1>
          <p className="text-body-md text-muted-foreground">
            Review, approve, and manage business listings
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <StatCard title="Total Businesses" value={stats.total} icon={Building2} variant="default" />
          <StatCard title="Pending Review" value={stats.pending} icon={AlertTriangle} variant="warning" />
          <StatCard title="Approved" value={stats.approved} icon={CheckCircle} variant="success" />
          <StatCard title="Rejected" value={stats.rejected} icon={XCircle} variant="error" />
          <StatCard title="Claimed" value={stats.claimed} icon={Star} variant="primary" />
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search by name, category, or address..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="views">Most Viewed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Businesses Table */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList variant="line">
            <TabsTrigger value="all">All ({mockBusinesses.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
            <TabsTrigger value="approved">Approved ({stats.approved})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({stats.rejected})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="space-y-4">
              {filteredBusinesses.map((business) => (
                <Card key={business.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-primary-100 flex items-center justify-center">
                        <Building2 className="h-8 w-8 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-body-md">{business.name}</h3>
                              {business.isVerified && (
                                <Badge variant="success">Verified</Badge>
                              )}
                              {business.isClaimed && (
                                <Badge variant="primary">Claimed</Badge>
                              )}
                            </div>
                            <p className="text-body-sm text-muted-foreground mb-2">
                              {business.description}
                            </p>
                          </div>
                          <Badge variant={getStatusBadgeVariant(business.status) as any}>
                            {business.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                          <div className="flex items-center gap-2 text-body-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 shrink-0" />
                            <span>{business.address}, {business.city}</span>
                          </div>
                          {business.phone && (
                            <div className="flex items-center gap-2 text-body-sm text-muted-foreground">
                              <Phone className="h-4 w-4 shrink-0" />
                              <span>{business.phone}</span>
                            </div>
                          )}
                          {business.email && (
                            <div className="flex items-center gap-2 text-body-sm text-muted-foreground">
                              <Mail className="h-4 w-4 shrink-0" />
                              <span>{business.email}</span>
                            </div>
                          )}
                          {business.website && (
                            <div className="flex items-center gap-2 text-body-sm text-muted-foreground">
                              <Globe className="h-4 w-4 shrink-0" />
                              <a
                                href={business.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary-600 hover:text-primary-700"
                              >
                                Website
                              </a>
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-3 rounded-lg bg-neutral-50">
                          <div>
                            <p className="text-label-xs text-muted-foreground mb-1">Category</p>
                            <p className="text-body-sm font-medium">{business.category}</p>
                          </div>
                          <div>
                            <p className="text-label-xs text-muted-foreground mb-1">Reviews</p>
                            <p className="text-body-sm font-medium">
                              {business.reviewCount}
                              {business.rating && ` (${business.rating}⭐)`}
                            </p>
                          </div>
                          <div>
                            <p className="text-label-xs text-muted-foreground mb-1">Views</p>
                            <p className="text-body-sm font-medium">{business.viewCount.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-label-xs text-muted-foreground mb-1">Created</p>
                            <p className="text-body-sm font-medium">{format(business.createdAt, 'MMM d, yyyy')}</p>
                          </div>
                        </div>

                        {business.owner && (
                          <div className="mb-4 p-3 rounded-lg bg-primary-50 border border-primary-200">
                            <p className="text-label-xs text-muted-foreground mb-1">Business Owner</p>
                            <p className="text-body-sm font-medium">{business.owner.name}</p>
                            <p className="text-body-sm text-muted-foreground">{business.owner.email}</p>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/businesses/${business.slug}`} target="_blank">
                              <Eye className="h-4 w-4 mr-2" />
                              View Page
                            </Link>
                          </Button>

                          {business.status === 'pending' && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleReview(business, 'approve')}
                                className="bg-success/10 border-success text-success hover:bg-success/20"
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Approve
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleReview(business, 'reject')}
                                className="bg-error/10 border-error text-error hover:bg-error/20"
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject
                              </Button>
                            </>
                          )}

                          {business.status === 'approved' && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <AlertTriangle className="h-4 w-4 mr-2" />
                                  Suspend
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Suspend Business?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will temporarily suspend the business listing. It will no longer appear in search results.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleSuspend(business.id)}>
                                    Suspend
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm" className="text-error hover:text-error">
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Business?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the business listing and all associated data.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(business.id)}>
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

              {filteredBusinesses.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold text-heading-sm mb-2">No businesses found</h3>
                    <p className="text-body-sm text-muted-foreground">
                      {searchQuery
                        ? `No businesses match "${searchQuery}"`
                        : `There are no ${activeTab} businesses at this time.`}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Review Dialog */}
        <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {reviewAction === 'approve' ? 'Approve' : 'Reject'} Business
              </DialogTitle>
              <DialogDescription>
                {selectedBusiness && (
                  <>
                    You are about to {reviewAction} <strong>{selectedBusiness.name}</strong>.
                    {reviewAction === 'approve'
                      ? ' This business will be visible to all users.'
                      : ' This business will be rejected and not visible to users.'}
                  </>
                )}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <label className="text-body-sm font-medium mb-2 block">
                  Add a note (optional)
                </label>
                <Textarea
                  placeholder={
                    reviewAction === 'approve'
                      ? 'Add any notes about this approval...'
                      : 'Explain why this business is being rejected...'
                  }
                  value={reviewNote}
                  onChange={(e) => setReviewNote(e.target.value)}
                  rows={4}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setReviewDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                variant={reviewAction === 'approve' ? 'primary' : 'destructive'}
                onClick={handleConfirmReview}
              >
                {reviewAction === 'approve' ? 'Approve Business' : 'Reject Business'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Container>
    </div>
  );
}
