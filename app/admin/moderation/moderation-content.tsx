'use client';

import * as React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { StatCard } from '@/components/dashboard/stat-card';
import { ReviewCard } from '@/components/business/review-card';
import { ArrowLeft, AlertTriangle, MessageSquare, Building2, Check, X, Eye } from 'lucide-react';
import { format } from 'date-fns';

interface FlaggedContent {
  id: string;
  type: 'review' | 'business' | 'comment';
  content: any;
  reason: string;
  reportedBy: {
    name: string;
    email: string;
  };
  reportedAt: Date;
  status: 'pending' | 'approved' | 'removed';
}

export function ModerationContent() {
  const [activeTab, setActiveTab] = React.useState('pending');
  const [sortBy, setSortBy] = React.useState('recent');
  const [selectedItem, setSelectedItem] = React.useState<string | null>(null);
  const [actionNote, setActionNote] = React.useState('');

  // Mock flagged content
  const mockFlaggedContent: FlaggedContent[] = [
    {
      id: '1',
      type: 'review',
      content: {
        id: 'review-1',
        userId: 'user-1',
        userName: 'Anonymous User',
        userAvatar: 'https://i.pravatar.cc/150?img=10',
        rating: 1,
        title: 'Terrible Experience',
        content: 'This place is awful. The staff was rude and unprofessional. I would never recommend this to anyone.',
        createdAt: new Date('2024-01-14'),
        helpfulCount: 0,
        businessName: 'Sunrise Café',
        businessSlug: 'sunrise-cafe',
      },
      reason: 'Inappropriate language',
      reportedBy: {
        name: 'John Doe',
        email: 'john@example.com',
      },
      reportedAt: new Date('2024-01-15T10:30:00'),
      status: 'pending',
    },
    {
      id: '2',
      type: 'review',
      content: {
        id: 'review-2',
        userId: 'user-2',
        userName: 'Sarah Smith',
        userAvatar: 'https://i.pravatar.cc/150?img=5',
        rating: 5,
        title: 'Spam Review',
        content: 'Check out my website for amazing deals! Click here for discount codes and promotions.',
        createdAt: new Date('2024-01-13'),
        helpfulCount: 0,
        businessName: 'The Garden Bistro',
        businessSlug: 'garden-bistro',
      },
      reason: 'Spam or promotional content',
      reportedBy: {
        name: 'Business Owner',
        email: 'owner@gardenbistro.com',
      },
      reportedAt: new Date('2024-01-14T16:45:00'),
      status: 'pending',
    },
    {
      id: '3',
      type: 'business',
      content: {
        id: 'business-1',
        name: 'Suspicious Business Name LLC',
        description: 'We offer the best services in town.',
        category: 'Services',
      },
      reason: 'Fake or duplicate listing',
      reportedBy: {
        name: 'Community Member',
        email: 'member@example.com',
      },
      reportedAt: new Date('2024-01-13T09:15:00'),
      status: 'pending',
    },
  ];

  const stats = {
    pending: mockFlaggedContent.filter((c) => c.status === 'pending').length,
    approved: mockFlaggedContent.filter((c) => c.status === 'approved').length,
    removed: mockFlaggedContent.filter((c) => c.status === 'removed').length,
    totalReports: mockFlaggedContent.length,
  };

  const handleApprove = async (itemId: string) => {
    // TODO: Implement Supabase content approval
    console.log('Approve:', itemId, 'Note:', actionNote);
    setActionNote('');
    setSelectedItem(null);
  };

  const handleRemove = async (itemId: string) => {
    // TODO: Implement Supabase content removal
    console.log('Remove:', itemId, 'Note:', actionNote);
    setActionNote('');
    setSelectedItem(null);
  };

  const filterContent = (content: FlaggedContent[]) => {
    let filtered = [...content];

    // Filter by status
    filtered = filtered.filter((c) => c.status === activeTab || activeTab === 'all');

    // Sort
    if (sortBy === 'recent') {
      filtered.sort((a, b) => b.reportedAt.getTime() - a.reportedAt.getTime());
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => a.reportedAt.getTime() - b.reportedAt.getTime());
    }

    return filtered;
  };

  const filteredContent = filterContent(mockFlaggedContent);

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
            Content Moderation
          </h1>
          <p className="text-body-md text-muted-foreground">
            Review and moderate flagged content
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Pending Review" value={stats.pending} icon={AlertTriangle} variant="warning" />
          <StatCard title="Approved" value={stats.approved} icon={Check} variant="success" />
          <StatCard title="Removed" value={stats.removed} icon={X} variant="error" />
          <StatCard title="Total Reports" value={stats.totalReports} icon={MessageSquare} />
        </div>

        {/* Filters and Content List */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
              <TabsTrigger value="approved">Approved ({stats.approved})</TabsTrigger>
              <TabsTrigger value="removed">Removed ({stats.removed})</TabsTrigger>
            </TabsList>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Flagged Content List */}
          <TabsContent value={activeTab}>
          <div className="space-y-6">
            {filteredContent.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Badge variant="warning">
                        {item.type}
                      </Badge>
                      <span className="text-label-sm text-muted-foreground">
                        Reported {format(item.reportedAt, 'MMM d, yyyy h:mm a')}
                      </span>
                    </div>
                    {item.status === 'pending' && (
                      <Badge variant="warning">Pending Review</Badge>
                    )}
                  </div>

                  {/* Report Details */}
                  <div className="mb-4 p-4 rounded-lg bg-error/5 border border-error/20">
                    <p className="font-semibold text-body-sm mb-1">Report Reason:</p>
                    <p className="text-body-sm text-foreground">{item.reason}</p>
                    <p className="text-label-sm text-muted-foreground mt-2">
                      Reported by {item.reportedBy.name} ({item.reportedBy.email})
                    </p>
                  </div>

                  {/* Content Preview */}
                  {item.type === 'review' && (
                    <div className="mb-4">
                      <p className="font-semibold text-body-sm mb-2">Review Content:</p>
                      <ReviewCard review={item.content} showActions={false} />
                    </div>
                  )}

                  {item.type === 'business' && (
                    <div className="mb-4 p-4 rounded-lg bg-neutral-50 border">
                      <p className="font-semibold text-body-sm mb-2">Business Listing:</p>
                      <h4 className="font-semibold text-body-md mb-1">{item.content.name}</h4>
                      <p className="text-body-sm text-muted-foreground mb-2">{item.content.description}</p>
                      <Badge>{item.content.category}</Badge>
                    </div>
                  )}

                  {/* Action Buttons */}
                  {item.status === 'pending' && (
                    <div className="space-y-4">
                      {selectedItem === item.id && (
                        <div className="space-y-3">
                          <Textarea
                            placeholder="Add a note about your decision (optional)..."
                            value={actionNote}
                            onChange={(e) => setActionNote(e.target.value)}
                            rows={3}
                          />
                        </div>
                      )}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (item.type === 'review') {
                              window.open(`/businesses/${item.content.businessSlug}`, '_blank');
                            }
                          }}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Full Context
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (selectedItem === item.id) {
                              handleApprove(item.id);
                            } else {
                              setSelectedItem(item.id);
                            }
                          }}
                          className="bg-success/10 border-success text-success hover:bg-success/20"
                        >
                          <Check className="h-4 w-4 mr-2" />
                          {selectedItem === item.id ? 'Confirm Approve' : 'Approve'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (selectedItem === item.id) {
                              handleRemove(item.id);
                            } else {
                              setSelectedItem(item.id);
                            }
                          }}
                          className="bg-error/10 border-error text-error hover:bg-error/20"
                        >
                          <X className="h-4 w-4 mr-2" />
                          {selectedItem === item.id ? 'Confirm Remove' : 'Remove'}
                        </Button>
                        {selectedItem === item.id && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedItem(null);
                              setActionNote('');
                            }}
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  )}

                  {item.status !== 'pending' && (
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={item.status === 'approved' ? 'success' : 'error'}
                      >
                        {item.status === 'approved' ? 'Approved' : 'Removed'}
                      </Badge>
                      <span className="text-label-sm text-muted-foreground">
                        Moderated on {format(item.reportedAt, 'MMM d, yyyy')}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            {filteredContent.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-heading-sm mb-2">No items to review</h3>
                  <p className="text-body-sm text-muted-foreground">
                    There are no {activeTab} items at this time.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
          </TabsContent>
        </Tabs>
      </Container>
    </div>
  );
}
