import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MapPin, Clock, Star, Ticket, TrendingUp, ExternalLink } from 'lucide-react';
import { JsonLdScript } from '@/components/seo/json-ld-script';
import { generateBonnetSpringsParkSchema, generateBreadcrumbSchema } from '@/lib/seo/json-ld';
import { AttractionViewTracker } from '@/components/analytics/attraction-view-tracker';

export const metadata: Metadata = {
  title: 'Bonnet Springs Park | USA Today\'s #1 City Park in America',
  description: 'Discover Bonnet Springs Park in Mid-Town Lakeland - voted USA Today\'s #1 City Park in America. Explore 180 acres of world-class amenities, gardens, trails, and nearby businesses.',
  keywords: [
    'Bonnet Springs Park',
    'Lakeland Florida park',
    'USA Today #1 City Park',
    'Mid-Town Lakeland',
    'Lakeland attractions',
    'best city park America',
    'Bonnet Springs Park businesses',
    'Memorial Boulevard Lakeland',
  ],
  openGraph: {
    title: 'Bonnet Springs Park | USA Today\'s #1 City Park',
    description: 'Explore USA Today\'s #1 City Park in America and discover nearby businesses in Mid-Town Lakeland, Florida.',
    images: ['/og-bonnet-springs.jpg'],
  },
};

export default function BonnetSpringsParkPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Bonnet Springs Park', url: '/attractions/bonnet-springs-park' },
  ];

  return (
    <>
      <AttractionViewTracker attraction="bonnet_springs_park" />
      <JsonLdScript
        data={[
          generateBonnetSpringsParkSchema(),
          generateBreadcrumbSchema(breadcrumbs),
        ]}
      />
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-50 via-background to-accent-50 section-padding-sm border-b">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-100 border border-accent-200 mb-6">
                <Star className="h-4 w-4 text-accent-600 fill-accent-600" />
                <span className="text-label-md font-medium text-accent-900">
                  USA Today's #1 City Park in America
                </span>
              </div>

              {/* Title */}
              <h1 className="font-serif font-bold text-display-xl md:text-display-2xl text-foreground mb-4">
                Bonnet Springs Park
              </h1>

              {/* Subtitle */}
              <p className="text-body-xl text-muted-foreground mb-8">
                180 acres of world-class gardens, trails, and amenities in the heart of Mid-Town Lakeland, Florida
              </p>

              {/* Quick Info */}
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary-600" />
                  <span className="text-body-md">Memorial Boulevard, Lakeland</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary-600" />
                  <span className="text-body-md">1M+ Annual Visitors</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ticket className="h-5 w-5 text-primary-600" />
                  <span className="text-body-md">Free Admission</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="https://bonnetspringspark.org" target="_blank" rel="noopener noreferrer">
                    Visit Official Website
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/businesses">Explore Nearby Businesses</Link>
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* Park Features */}
        <section className="section-padding bg-neutral-50">
          <Container>
            <h2 className="font-serif font-semibold text-heading-xl text-center mb-12">
              Park Features & Amenities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-serif font-semibold text-heading-md mb-2">
                    Florida Gardens
                  </h3>
                  <p className="text-body-md text-muted-foreground">
                    Explore native Florida plants and stunning botanical displays across themed garden areas
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-serif font-semibold text-heading-md mb-2">
                    Walking & Biking Trails
                  </h3>
                  <p className="text-body-md text-muted-foreground">
                    Miles of paved trails perfect for walking, jogging, and cycling through scenic landscapes
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-serif font-semibold text-heading-md mb-2">
                    Children's Adventure Garden
                  </h3>
                  <p className="text-body-md text-muted-foreground">
                    Interactive play areas designed to inspire curiosity and exploration for young visitors
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-serif font-semibold text-heading-md mb-2">
                    Event Spaces
                  </h3>
                  <p className="text-body-md text-muted-foreground">
                    Host concerts, festivals, and community gatherings in beautiful outdoor venues
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-serif font-semibold text-heading-md mb-2">
                    Nature Center
                  </h3>
                  <p className="text-body-md text-muted-foreground">
                    Educational exhibits showcasing Florida's unique ecosystems and wildlife
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-serif font-semibold text-heading-md mb-2">
                    Lake Bonnet
                  </h3>
                  <p className="text-body-md text-muted-foreground">
                    Scenic lakefront views with boardwalks and observation areas for wildlife watching
                  </p>
                </CardContent>
              </Card>
            </div>
          </Container>
        </section>

        {/* Visitor Information */}
        <section className="section-padding">
          <Container>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif font-semibold text-heading-xl text-center mb-8">
                Visitor Information
              </h2>
              <Card>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                        <Clock className="h-6 w-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-heading-md mb-1">Hours</h3>
                        <p className="text-body-md text-muted-foreground">
                          Park hours vary by season. Visit the official website for current hours and special event schedules.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-heading-md mb-1">Location</h3>
                        <p className="text-body-md text-muted-foreground">
                          Located along Memorial Boulevard in Mid-Town Lakeland, easily accessible from I-4 and surrounded by local businesses.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                        <Ticket className="h-6 w-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-heading-md mb-1">Admission</h3>
                        <p className="text-body-md text-muted-foreground">
                          Free general admission with optional paid experiences and special events throughout the year.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Container>
        </section>

        {/* Make the Most of Your Visit */}
        <section className="section-padding bg-gradient-to-br from-primary-500 to-accent-500 text-white">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif font-bold text-heading-xl mb-4">
                Make the Most of Your Park Visit
              </h2>
              <p className="text-body-lg mb-8 opacity-90">
                Discover restaurants, shops, and services near Bonnet Springs Park. Many businesses offer exclusive "Show Your Ticket" deals for park visitors.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="outline" className="bg-white text-foreground hover:bg-neutral-50" asChild>
                  <Link href="/businesses">Find Nearby Businesses</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white/20" asChild>
                  <Link href="/deals">Browse Park Visitor Deals</Link>
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
