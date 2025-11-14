import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Heart, Users, TrendingUp, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about Midtown Book and our mission to support local businesses',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-12">
        <Container size="lg">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="font-serif font-bold text-display-lg text-foreground mb-4">
              About Midtown Book
            </h1>
            <p className="text-body-xl text-muted-foreground max-w-2xl mx-auto">
              Connecting our community with local businesses and creating lasting relationships
            </p>
          </div>

          {/* Mission Section */}
          <Card className="mb-12">
            <CardContent className="p-8 md:p-12">
              <h2 className="font-serif font-semibold text-heading-xl text-foreground mb-4">
                Our Mission
              </h2>
              <p className="text-body-lg text-muted-foreground leading-relaxed mb-6">
                Midtown Book was created to bridge the gap between local businesses and community members.
                We believe in the power of local commerce and the importance of supporting businesses
                that make our neighborhood unique.
              </p>
              <p className="text-body-lg text-muted-foreground leading-relaxed">
                Our platform makes it easy to discover, connect with, and support the businesses
                that make Midtown special. From restaurants to retail, services to entertainment,
                we're here to help you find exactly what you're looking for.
              </p>
            </CardContent>
          </Card>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="font-serif font-semibold text-heading-md mb-2">
                  Community First
                </h3>
                <p className="text-body-md text-muted-foreground">
                  We prioritize the needs of our local community and work to strengthen
                  connections between residents and businesses.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-secondary-100 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-secondary-600" />
                </div>
                <h3 className="font-serif font-semibold text-heading-md mb-2">
                  Supporting Local
                </h3>
                <p className="text-body-md text-muted-foreground">
                  Every business on our platform is locally owned and operated,
                  contributing to the unique character of our neighborhood.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-accent-100 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-accent-600" />
                </div>
                <h3 className="font-serif font-semibold text-heading-md mb-2">
                  Growth Together
                </h3>
                <p className="text-body-md text-muted-foreground">
                  We provide tools and features that help businesses grow while making
                  it easier for customers to discover them.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-neutral-600" />
                </div>
                <h3 className="font-serif font-semibold text-heading-md mb-2">
                  Trust & Quality
                </h3>
                <p className="text-body-md text-muted-foreground">
                  We verify businesses and moderate reviews to ensure a trustworthy
                  experience for everyone in our community.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <Card className="bg-gradient-to-br from-primary-500 to-accent-500 text-white border-0">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="font-serif font-bold text-heading-xl mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-body-lg mb-6 opacity-90">
                Join our community of local businesses and customers
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" size="lg" className="bg-white text-foreground hover:bg-neutral-50" asChild>
                  <Link href="/businesses">Browse Businesses</Link>
                </Button>
                <Button variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-white/10" asChild>
                  <Link href="/businesses/new">List Your Business</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </Container>
      </main>
      <Footer />
    </>
  );
}
