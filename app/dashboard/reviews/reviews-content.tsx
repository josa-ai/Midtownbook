'use client';

import * as React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ReviewCard } from '@/components/business/review-card';
import { StatCard } from '@/components/dashboard/stat-card';
import { ArrowLeft, Star, MessageSquare, ThumbsUp, TrendingUp } from 'lucide-react';

interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title?: string;
  content: string;
  createdAt: Date;
  helpfulCount: number;
  isVerifiedPurchase?: boolean;
  response?: {
    content: string;
    createdAt: Date;
  };
}

export function ReviewsContent() {
  const [activeTab, setActiveTab] = React.useState('all');
  const [sortBy, setSortBy] = React.useState('recent');
  const [replyingTo, setReplyingTo] = React.useState<string | null>(null);
  const [replyText, setReplyText] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Mock reviews data
  const mockReviews: Review[] = [
    {
      id: '1',
      userId: 'user-1',
      userName: 'Sarah Johnson',
      userAvatar: 'https://i.pravatar.cc/150?img=1',
      rating: 5,
      title: 'Amazing coffee!',
      content:
        'Best café in Midtown. The atmosphere is perfect for getting work done, and the staff is incredibly friendly. Their house blend is exceptional!',
      createdAt: new Date('2024-01-15'),
      helpfulCount: 12,
      isVerifiedPurchase: true,
    },
    {
      id: '2',
      userId: 'user-2',
      userName: 'Michael Chen',
      userAvatar: 'https://i.pravatar.cc/150?img=2',
      rating: 4,
      title: 'Great pastries',
      content:
        'Love the croissants here. They are fresh and flaky every morning. Coffee is good too, though I wish they had more seating.',
      createdAt: new Date('2024-01-14'),
      helpfulCount: 8,
      isVerifiedPurchase: true,
      response: {
        content:
          'Thank you for your feedback, Michael! We are actually working on expanding our seating area. Stay tuned!',
        createdAt: new Date('2024-01-14'),
      },
    },
    {
      id: '3',
      userId: 'user-3',
      userName: 'Emily Rodriguez',
      userAvatar: 'https://i.pravatar.cc/150?img=3',
      rating: 5,
      content:
        'This is my go-to spot for morning coffee before work. Never disappoints!',
      createdAt: new Date('2024-01-13'),
      helpfulCount: 5,
      isVerifiedPurchase: false,
    },
    {
      id: '4',
      userId: 'user-4',
      userName: 'David Park',
      userAvatar: 'https://i.pravatar.cc/150?img=4',
      rating: 3,
      title: 'Decent but pricey',
      content:
        'The quality is good, but I find the prices a bit high for what you get. Service can be slow during peak hours.',
      createdAt: new Date('2024-01-12'),
      helpfulCount: 3,
      isVerifiedPurchase: true,
    },
    {
      id: '5',
      userId: 'user-5',
      userName: 'Lisa Thompson',
      userAvatar: 'https://i.pravatar.cc/150?img=5',
      rating: 5,
      title: 'Hidden gem!',
      content:
        'Found this place by accident and so glad I did. Everything from the ambiance to the food is top-notch.',
      createdAt: new Date('2024-01-11'),
      helpfulCount: 15,
      isVerifiedPurchase: true,
    },
  ];

  const stats = {
    avgRating: 4.5,
    ratingTrend: 0.3,
    totalReviews: 89,
    reviewsTrend: 12,
    responseRate: 87,
    responseRateTrend: 5,
    helpfulVotes: 234,
    helpfulVotesTrend: 18,
  };

  const handleReply = async (reviewId: string) => {
    if (!replyText.trim()) return;

    setIsSubmitting(true);
    try {
      // TODO: Implement Supabase review response creation
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setReplyingTo(null);
      setReplyText('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filterReviews = (reviews: Review[]) => {
    let filtered = [...reviews];

    // Filter by rating tab
    if (activeTab !== 'all') {
      if (activeTab === 'pending') {
        filtered = filtered.filter((r) => !r.response);
      } else {
        const rating = parseInt(activeTab);
        filtered = filtered.filter((r) => r.rating === rating);
      }
    }

    // Sort reviews
    if (sortBy === 'recent') {
      filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    } else if (sortBy === 'helpful') {
      filtered.sort((a, b) => b.helpfulCount - a.helpfulCount);
    } else if (sortBy === 'rating-high') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'rating-low') {
      filtered.sort((a, b) => a.rating - b.rating);
    }

    return filtered;
  };

  const filteredReviews = filterReviews(mockReviews);

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
                Reviews
              </h1>
              <p className="text-body-md text-muted-foreground">
                Manage and respond to customer feedback
              </p>
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="helpful">Most Helpful</SelectItem>
                <SelectItem value="rating-high">Highest Rating</SelectItem>
                <SelectItem value="rating-low">Lowest Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Average Rating"
            value={stats.avgRating.toFixed(1)}
            icon={Star}
            trend={{
              value: stats.ratingTrend,
              isPositive: true,
              label: 'vs last month',
            }}
            variant="primary"
          />
          <StatCard
            title="Total Reviews"
            value={stats.totalReviews}
            icon={MessageSquare}
            trend={{
              value: stats.reviewsTrend,
              isPositive: true,
              label: 'this month',
            }}
            variant="success"
          />
          <StatCard
            title="Response Rate"
            value={`${stats.responseRate}%`}
            icon={TrendingUp}
            trend={{
              value: stats.responseRateTrend,
              isPositive: true,
            }}
            variant="default"
          />
          <StatCard
            title="Helpful Votes"
            value={stats.helpfulVotes}
            icon={ThumbsUp}
            trend={{
              value: stats.helpfulVotesTrend,
              isPositive: true,
            }}
            variant="default"
          />
        </div>

        {/* Reviews Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Reviews ({mockReviews.length})</TabsTrigger>
            <TabsTrigger value="pending">
              Pending Response ({mockReviews.filter((r) => !r.response).length})
            </TabsTrigger>
            <TabsTrigger value="5">5 Stars</TabsTrigger>
            <TabsTrigger value="4">4 Stars</TabsTrigger>
            <TabsTrigger value="3">3 Stars</TabsTrigger>
            <TabsTrigger value="2">2 Stars</TabsTrigger>
            <TabsTrigger value="1">1 Star</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {filteredReviews.length > 0 ? (
              <div className="space-y-6">
                {filteredReviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <ReviewCard review={review} showActions={false} />

                      {/* Business Response */}
                      {review.response && (
                        <div className="mt-4 ml-12 pl-6 border-l-2 border-primary-600">
                          <div className="mb-2">
                            <span className="font-semibold text-body-sm">
                              Response from Business
                            </span>
                            <span className="text-label-sm text-muted-foreground ml-2">
                              {review.response.createdAt.toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-body-sm text-foreground">
                            {review.response.content}
                          </p>
                        </div>
                      )}

                      {/* Reply Form */}
                      {!review.response && (
                        <div className="mt-4">
                          {replyingTo === review.id ? (
                            <div className="space-y-3">
                              <Textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="Write your response..."
                                rows={3}
                              />
                              <div className="flex gap-2">
                                <Button
                                  variant="primary"
                                  size="sm"
                                  onClick={() => handleReply(review.id)}
                                  loading={isSubmitting}
                                  disabled={isSubmitting || !replyText.trim()}
                                >
                                  Post Response
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setReplyingTo(null);
                                    setReplyText('');
                                  }}
                                  disabled={isSubmitting}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setReplyingTo(review.id)}
                            >
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Reply to Review
                            </Button>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-heading-sm mb-2">No reviews found</h3>
                  <p className="text-body-sm text-muted-foreground">
                    There are no reviews matching your current filter.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Tips Card */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="font-serif font-semibold text-heading-sm mb-4">
              Tips for Managing Reviews
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-body-sm mb-2">Respond Promptly</h4>
                <p className="text-label-sm text-muted-foreground">
                  Try to respond to reviews within 24-48 hours to show customers you value
                  their feedback.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-body-sm mb-2">Be Professional</h4>
                <p className="text-label-sm text-muted-foreground">
                  Always maintain a professional and courteous tone, even when addressing
                  negative reviews.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-body-sm mb-2">Show Appreciation</h4>
                <p className="text-label-sm text-muted-foreground">
                  Thank customers for positive reviews and acknowledge their time and support.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
