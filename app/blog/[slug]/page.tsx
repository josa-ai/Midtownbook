import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Header, Footer } from '@/components/layout';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, Share2, Facebook, Twitter, Linkedin, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

async function getBlogPost(slug: string) {
  // Mock blog post data
  const mockPost = {
    id: '1',
    slug: slug,
    title: 'Top 10 Must-Try Restaurants in Midtown',
    excerpt:
      "Discover the best dining experiences Midtown has to offer. From cozy cafés to upscale dining, we've curated a list of local favorites.",
    content: `
Midtown has become a culinary destination, offering an incredible variety of dining options that cater to every taste and budget. Whether you're a longtime resident or just visiting, these ten restaurants represent the best of what our community has to offer.

## 1. Sunrise Café

Starting our list is the beloved Sunrise Café, known for its warm atmosphere and exceptional coffee. Their fresh pastries and artisan breakfast sandwiches have made it a morning ritual for many locals.

**What to try:** The Sunrise Special - avocado toast with poached eggs and their signature house blend coffee.

## 2. The Garden Bistro

For those seeking farm-to-table excellence, The Garden Bistro sources ingredients from local farms to create seasonal menus that change monthly. The restaurant's commitment to sustainability and quality is evident in every dish.

**What to try:** Seasonal tasting menu - changes monthly based on what's fresh.

## 3. Spice Route

Bringing authentic flavors from across Asia, Spice Route has quickly become a favorite for those craving bold, complex flavors. Their modern take on traditional dishes keeps customers coming back.

**What to try:** The Pad Thai and Green Curry are customer favorites.

## 4. Bella Notte

Italian cuisine at its finest, Bella Notte offers an intimate dining experience with handmade pasta and wood-fired pizzas. The family recipes passed down through generations shine through in every bite.

**What to try:** Carbonara and the Margherita pizza with fresh mozzarella.

## 5. The Steakhouse

When you're in the mood for premium cuts and classic sides, The Steakhouse delivers. Their dry-aged steaks and extensive wine list make it perfect for special occasions.

**What to try:** 30-day dry-aged ribeye with truffle fries.

## Planning Your Visit

All of these restaurants accept reservations, and we recommend booking ahead, especially for weekend dinners. Many also offer takeout options for those who prefer dining at home.

## Supporting Local

When you dine at these establishments, you're not just getting a great meal - you're supporting local business owners, farmers, and the entire community ecosystem that makes Midtown special.

We encourage you to explore all of these wonderful restaurants and discover your own favorites. Each one brings something unique to our culinary scene, and together they make Midtown a true food lover's paradise.
    `,
    coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200',
    category: 'Food & Dining',
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://i.pravatar.cc/150?img=1',
      bio: 'Food writer and Midtown resident with a passion for discovering local culinary gems.',
    },
    publishedAt: new Date('2024-01-15'),
    readTime: 5,
    tags: ['Restaurants', 'Food', 'Guide'],
  };

  if (slug !== mockPost.slug) {
    return null;
  }

  return mockPost;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = [
    {
      id: '2',
      slug: 'weekend-events-guide',
      title: 'This Weekend in Midtown: Events You Can\'t Miss',
      coverImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400',
    },
    {
      id: '3',
      slug: 'hidden-gems-midtown',
      title: 'Hidden Gems: Undiscovered Places in Midtown',
      coverImage: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400',
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Image */}
        <div className="relative h-96 bg-neutral-100">
          <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent" />
        </div>

        <Container className="py-8">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link
              href="/blog"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 text-body-sm font-medium mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>

            {/* Article Header */}
            <div className="mb-8">
              <Badge variant="primary" className="mb-4">
                {post.category}
              </Badge>
              <h1 className="font-serif font-bold text-display-lg text-foreground mb-6">
                {post.title}
              </h1>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-body-sm">{post.author.name}</p>
                    <div className="flex items-center gap-3 text-label-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(post.publishedAt, 'MMMM d, yyyy')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime} min read
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex items-center gap-2 mb-6">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="default">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-3">
                <span className="text-label-sm text-muted-foreground">Share:</span>
                <Button variant="ghost" size="sm">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Separator className="mb-8" />

            {/* Article Content */}
            <div className="prose prose-neutral prose-lg max-w-none mb-12">
              {post.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="font-serif font-bold text-heading-lg mt-8 mb-4">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                } else if (paragraph.startsWith('**')) {
                  return (
                    <p key={index} className="font-semibold text-body-md mb-4">
                      {paragraph.replace(/\*\*/g, '')}
                    </p>
                  );
                } else if (paragraph.trim()) {
                  return (
                    <p key={index} className="text-body-md text-foreground mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  );
                }
                return null;
              })}
            </div>

            <Separator className="mb-8" />

            {/* Author Bio */}
            <Card className="mb-12">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-heading-sm mb-2">
                      About {post.author.name}
                    </h3>
                    <p className="text-body-sm text-muted-foreground">{post.author.bio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Posts */}
            <div>
              <h3 className="font-serif font-bold text-heading-lg mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <Image
                          src={relatedPost.coverImage}
                          alt={relatedPost.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-body-md hover:text-primary-600 transition-colors">
                          {relatedPost.title}
                        </h4>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
