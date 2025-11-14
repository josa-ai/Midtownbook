'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Search, Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { format } from 'date-fns';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  coverImage: string;
  category: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: Date;
  readTime: number;
  tags: string[];
}

export function BlogContent() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState('all');

  // Mock blog posts
  const mockPosts: BlogPost[] = [
    {
      id: '1',
      slug: 'top-10-restaurants-midtown',
      title: 'Top 10 Must-Try Restaurants in Midtown',
      excerpt:
        "Discover the best dining experiences Midtown has to offer. From cozy cafés to upscale dining, we've curated a list of local favorites.",
      coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
      category: 'Food & Dining',
      author: {
        name: 'Sarah Johnson',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
      publishedAt: new Date('2024-01-15'),
      readTime: 5,
      tags: ['Restaurants', 'Food', 'Guide'],
    },
    {
      id: '2',
      slug: 'small-business-marketing-tips',
      title: '5 Essential Marketing Tips for Small Businesses',
      excerpt:
        'Learn how to effectively market your local business on a budget. These proven strategies will help you reach more customers.',
      coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      category: 'Business Tips',
      author: {
        name: 'Michael Chen',
        avatar: 'https://i.pravatar.cc/150?img=2',
      },
      publishedAt: new Date('2024-01-12'),
      readTime: 7,
      tags: ['Marketing', 'Business', 'Tips'],
    },
    {
      id: '3',
      slug: 'weekend-events-guide',
      title: 'This Weekend in Midtown: Events You Can\'t Miss',
      excerpt:
        'Your complete guide to the best events happening this weekend. From live music to farmers markets, there\'s something for everyone.',
      coverImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
      category: 'Events',
      author: {
        name: 'Emily Rodriguez',
        avatar: 'https://i.pravatar.cc/150?img=3',
      },
      publishedAt: new Date('2024-01-10'),
      readTime: 4,
      tags: ['Events', 'Weekend', 'Community'],
    },
    {
      id: '4',
      slug: 'support-local-businesses',
      title: 'Why Supporting Local Businesses Matters',
      excerpt:
        'Discover the impact your shopping choices have on the community and why buying local makes a difference.',
      coverImage: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=800',
      category: 'Community',
      author: {
        name: 'David Park',
        avatar: 'https://i.pravatar.cc/150?img=4',
      },
      publishedAt: new Date('2024-01-08'),
      readTime: 6,
      tags: ['Community', 'Local', 'Business'],
    },
    {
      id: '5',
      slug: 'hidden-gems-midtown',
      title: 'Hidden Gems: Undiscovered Places in Midtown',
      excerpt:
        'Venture off the beaten path and explore some of Midtown\'s best-kept secrets that locals love.',
      coverImage: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800',
      category: 'Guides',
      author: {
        name: 'Lisa Thompson',
        avatar: 'https://i.pravatar.cc/150?img=5',
      },
      publishedAt: new Date('2024-01-05'),
      readTime: 8,
      tags: ['Guide', 'Local', 'Discover'],
    },
    {
      id: '6',
      slug: 'seasonal-deals-winter',
      title: 'Best Winter Deals and Offers in Midtown',
      excerpt:
        'Stay warm and save money with our roundup of the best seasonal deals from local businesses.',
      coverImage: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800',
      category: 'Deals',
      author: {
        name: 'James Wilson',
        avatar: 'https://i.pravatar.cc/150?img=6',
      },
      publishedAt: new Date('2024-01-03'),
      readTime: 5,
      tags: ['Deals', 'Shopping', 'Winter'],
    },
  ];

  const categories = ['all', 'Food & Dining', 'Business Tips', 'Events', 'Community', 'Guides', 'Deals'];

  const filteredPosts = mockPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = mockPosts[0];
  const recentPosts = mockPosts.slice(1, 4);

  return (
    <div className="py-12">
      <Container size="xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif font-bold text-display-lg text-foreground mb-4">
            Blog
          </h1>
          <p className="text-body-xl text-muted-foreground max-w-2xl mx-auto">
            Stories, tips, and insights from the Midtown community
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Featured Post */}
        {!searchQuery && activeCategory === 'all' && (
          <Card className="mb-12 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto">
                <Image
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-8">
                <Badge variant="primary" className="mb-4">
                  Featured
                </Badge>
                <h2 className="font-serif font-bold text-heading-xl mb-4">
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="hover:text-primary-600 transition-colors"
                  >
                    {featuredPost.title}
                  </Link>
                </h2>
                <p className="text-body-md text-muted-foreground mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 text-label-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span>{featuredPost.author.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {format(featuredPost.publishedAt, 'MMM d, yyyy')}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {featuredPost.readTime} min read
                  </div>
                </div>
                <Button variant="primary" asChild>
                  <Link href={`/blog/${featuredPost.slug}`}>
                    Read Article
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </div>
          </Card>
        )}

        {/* Category Tabs */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
          <TabsList variant="line">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category === 'all' ? 'All Posts' : category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <Link href={`/blog/${post.slug}`}>
                <div className="relative h-48">
                  <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="default">{post.category}</Badge>
                  </div>
                  <h3 className="font-serif font-semibold text-heading-sm mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-body-sm text-muted-foreground mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-label-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-5 h-5 rounded-full"
                      />
                      <span>{post.author.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime} min
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-body-lg text-muted-foreground">
              No articles found matching your search.
            </p>
          </div>
        )}

        {/* Newsletter CTA */}
        <Card className="mt-16 bg-gradient-to-br from-primary-50 to-accent-50 border-primary-200">
          <CardContent className="p-12 text-center">
            <h2 className="font-serif font-bold text-heading-xl mb-4">
              Stay in the Loop
            </h2>
            <p className="text-body-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get the latest stories, events, and deals from Midtown delivered to your inbox.
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <Input type="email" placeholder="Enter your email" />
              <Button variant="primary" size="lg">
                Subscribe
              </Button>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
