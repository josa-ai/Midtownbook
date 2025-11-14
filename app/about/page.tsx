import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Heart, Users, TrendingUp, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Mid-Town Lakeland',
  description: 'Discover the revival story of Mid-Town Lakeland - home to America\'s #1 City Park, Detroit Tigers Spring Training, and a thriving community of local businesses',
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
              Welcome to Mid-Town Lakeland
            </h1>
            <p className="text-body-xl text-muted-foreground max-w-2xl mx-auto">
              A story of revival, community, and world-class attractions meeting local charm
            </p>
          </div>

          {/* Revival Story Section */}
          <Card className="mb-12">
            <CardContent className="p-8 md:p-12">
              <h2 className="font-serif font-semibold text-heading-xl text-foreground mb-4">
                Mid-Town's Revival Story
              </h2>
              <p className="text-body-lg text-muted-foreground leading-relaxed mb-6">
                Mid-Town Lakeland is experiencing an extraordinary transformation. What began as a vision
                to revitalize a historic neighborhood has blossomed into one of Florida's most exciting districts.
                With the arrival of Bonnet Springs Park—voted USA Today's #1 City Park in America—and the continued
                presence of Detroit Tigers Spring Training at Joker Marchant Stadium, Mid-Town has become a destination
                that draws visitors from across the country.
              </p>
              <p className="text-body-lg text-muted-foreground leading-relaxed mb-6">
                But world-class attractions are only part of the story. Along Memorial Boulevard, N. Florida Avenue,
                and Lakeland Hills Boulevard, local entrepreneurs are opening businesses that blend innovation with
                community spirit. From chef-driven restaurants to boutique shops, wellness studios to creative spaces,
                these business owners chose Mid-Town because they believe in its potential.
              </p>
              <p className="text-body-lg text-muted-foreground leading-relaxed">
                Midtown Book was created to connect these two worlds—helping visitors to Bonnet Springs Park and
                Tigers games discover the authentic local experiences that make Mid-Town special, while giving
                neighborhood residents a reason to celebrate the remarkable transformation happening in their own backyard.
              </p>
            </CardContent>
          </Card>

          {/* Why Mid-Town Matters Section */}
          <div className="mb-12">
            <h2 className="font-serif font-semibold text-heading-xl text-foreground mb-6 text-center">
              Why Mid-Town Matters
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center mb-4">
                    <Heart className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="font-serif font-semibold text-heading-md mb-2">
                    World-Class Destinations
                  </h3>
                  <p className="text-body-md text-muted-foreground">
                    Home to Bonnet Springs Park (USA Today's #1 City Park) and Detroit Tigers
                    Spring Training—attractions that put Lakeland on the national map.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-secondary-100 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-secondary-600" />
                  </div>
                  <h3 className="font-serif font-semibold text-heading-md mb-2">
                    Authentic Local Experiences
                  </h3>
                  <p className="text-body-md text-muted-foreground">
                    Every business is locally owned and operated by entrepreneurs who chose
                    Mid-Town for its revival potential and community spirit.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-accent-100 flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-accent-600" />
                  </div>
                  <h3 className="font-serif font-semibold text-heading-md mb-2">
                    A District on the Rise
                  </h3>
                  <p className="text-body-md text-muted-foreground">
                    New businesses are opening along Memorial Boulevard and N. Florida Avenue,
                    creating energy and opportunity throughout the district.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-neutral-600" />
                  </div>
                  <h3 className="font-serif font-semibold text-heading-md mb-2">
                    Connecting Visitors & Residents
                  </h3>
                  <p className="text-body-md text-muted-foreground">
                    We bridge world-class attractions to local businesses, helping thousands
                    of park and Tigers visitors discover Mid-Town's hidden gems.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Be Part of the Story CTA Section */}
          <Card className="bg-gradient-to-br from-primary-500 to-accent-500 text-white border-0">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="font-serif font-bold text-heading-xl mb-4">
                Be Part of the Story
              </h2>
              <p className="text-body-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Whether you're visiting for the day or call Mid-Town home, there's never been
                a better time to discover what makes this district special
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-left">
                  <h3 className="font-serif font-semibold text-heading-md mb-2">
                    For Visitors
                  </h3>
                  <p className="text-body-sm opacity-90 mb-4">
                    Plan your Mid-Town adventure—find pre-game dining, post-park celebrations, and exclusive deals
                  </p>
                  <Button variant="outline" size="md" className="bg-white text-foreground hover:bg-neutral-50 w-full" asChild>
                    <Link href="/businesses">Explore Businesses</Link>
                  </Button>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-left">
                  <h3 className="font-serif font-semibold text-heading-md mb-2">
                    For Residents
                  </h3>
                  <p className="text-body-sm opacity-90 mb-4">
                    Stay connected with events, new openings, and the latest from your neighborhood
                  </p>
                  <Button variant="outline" size="md" className="bg-white text-foreground hover:bg-neutral-50 w-full" asChild>
                    <Link href="/events">View Events</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </Container>
      </main>
      <Footer />
    </>
  );
}
