import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MapPin, Calendar, Users, Ticket, TrendingUp, ExternalLink, Trophy } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Detroit Tigers Spring Training | Joker Marchant Stadium Lakeland',
  description: 'Experience Detroit Tigers Spring Training at Joker Marchant Stadium in Mid-Town Lakeland, Florida. Discover game schedules, tickets, and nearby businesses for the ultimate spring baseball experience.',
  keywords: [
    'Detroit Tigers Spring Training',
    'Joker Marchant Stadium',
    'Lakeland Tigers',
    'Spring Training Lakeland Florida',
    'Mid-Town Lakeland',
    'Tigers baseball',
    'Lakeland baseball',
    'Spring Training games',
    'Memorial Boulevard Lakeland',
  ],
  openGraph: {
    title: 'Detroit Tigers Spring Training | Lakeland, Florida',
    description: 'Experience Spring Training baseball in Mid-Town Lakeland at Joker Marchant Stadium. Explore nearby businesses and game day deals.',
    images: ['/og-tigers-spring-training.jpg'],
  },
};

export default function TigersSpringTrainingPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-50 via-background to-accent-50 section-padding-sm border-b">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 border border-primary-200 mb-6">
                <Trophy className="h-4 w-4 text-primary-600" />
                <span className="text-label-md font-medium text-primary-900">
                  Spring Training Since 1934
                </span>
              </div>

              {/* Title */}
              <h1 className="font-serif font-bold text-display-xl md:text-display-2xl text-foreground mb-4">
                Detroit Tigers Spring Training
              </h1>

              {/* Subtitle */}
              <p className="text-body-xl text-muted-foreground mb-8">
                Experience Major League Baseball in an intimate setting at historic Joker Marchant Stadium in Mid-Town Lakeland
              </p>

              {/* Quick Info */}
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary-600" />
                  <span className="text-body-md">Joker Marchant Stadium</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary-600" />
                  <span className="text-body-md">50K+ Annual Fans</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary-600" />
                  <span className="text-body-md">February - March</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="https://www.milb.com/lakeland" target="_blank" rel="noopener noreferrer">
                    View Schedule & Tickets
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/businesses">Find Pre-Game Dining</Link>
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* Spring Training Experience */}
        <section className="section-padding bg-neutral-50">
          <Container>
            <h2 className="font-serif font-semibold text-heading-xl text-center mb-12">
              The Spring Training Experience
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-serif font-semibold text-heading-md mb-2">
                    Intimate Stadium Setting
                  </h3>
                  <p className="text-body-md text-muted-foreground">
                    Get closer to the action at Joker Marchant Stadium with excellent sightlines and a family-friendly atmosphere
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-serif font-semibold text-heading-md mb-2">
                    Meet the Players
                  </h3>
                  <p className="text-body-md text-muted-foreground">
                    Spring Training offers unique opportunities for autographs and interactions with Tigers players and prospects
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-serif font-semibold text-heading-md mb-2">
                    Perfect Weather
                  </h3>
                  <p className="text-body-md text-muted-foreground">
                    Enjoy beautiful Central Florida weather during February and March with comfortable temperatures
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-serif font-semibold text-heading-md mb-2">
                    Affordable Tickets
                  </h3>
                  <p className="text-body-md text-muted-foreground">
                    Experience Major League Baseball at a fraction of regular season prices with great family packages
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-serif font-semibold text-heading-md mb-2">
                    Historic Legacy
                  </h3>
                  <p className="text-body-md text-muted-foreground">
                    The Tigers have trained in Lakeland since 1934, making it one of baseball's longest stadium partnerships
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-serif font-semibold text-heading-md mb-2">
                    Modern Amenities
                  </h3>
                  <p className="text-body-md text-muted-foreground">
                    Recently renovated stadium features updated concessions, seating, and fan experiences
                  </p>
                </CardContent>
              </Card>
            </div>
          </Container>
        </section>

        {/* Game Day Information */}
        <section className="section-padding">
          <Container>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif font-semibold text-heading-xl text-center mb-8">
                Game Day Information
              </h2>
              <Card>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                        <Calendar className="h-6 w-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-heading-md mb-1">Season Schedule</h3>
                        <p className="text-body-md text-muted-foreground">
                          Spring Training runs from mid-February through March with approximately 15-18 home games. Check the official Lakeland Tigers website for the complete schedule.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-heading-md mb-1">Getting There</h3>
                        <p className="text-body-md text-muted-foreground">
                          Joker Marchant Stadium is located at 2301 Lakeland Hills Blvd in Mid-Town Lakeland, easily accessible from I-4 and surrounded by restaurants and shops.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                        <Ticket className="h-6 w-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-heading-md mb-1">Tickets & Parking</h3>
                        <p className="text-body-md text-muted-foreground">
                          Tickets are available through the Lakeland Tigers website. Parking is available at the stadium with easy access. Arrive early for popular matchups.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                        <Users className="h-6 w-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-heading-md mb-1">Group Events</h3>
                        <p className="text-body-md text-muted-foreground">
                          Special group packages and hospitality options are available for corporate outings, birthday parties, and community groups.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Container>
        </section>

        {/* Make the Most of Game Day */}
        <section className="section-padding bg-gradient-to-br from-primary-500 to-accent-500 text-white">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif font-bold text-heading-xl mb-4">
                Make Game Day Complete
              </h2>
              <p className="text-body-lg mb-8 opacity-90">
                Explore restaurants, sports bars, and shops near Joker Marchant Stadium. Show your game ticket for exclusive deals at participating Mid-Town businesses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="outline" className="bg-white text-foreground hover:bg-neutral-50" asChild>
                  <Link href="/businesses">Find Nearby Businesses</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white/20" asChild>
                  <Link href="/deals">Browse Game Day Deals</Link>
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* Why Mid-Town Lakeland */}
        <section className="section-padding">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif font-semibold text-heading-xl mb-4">
                Why Mid-Town Lakeland for Spring Training
              </h2>
              <p className="text-body-lg text-muted-foreground mb-8">
                Mid-Town Lakeland offers the perfect combination of world-class baseball, beautiful Bonnet Springs Park (USA Today's #1 City Park),
                and a growing selection of local restaurants and shops. Make a full day of it with pre-game dining, post-game celebrations,
                and explore everything this revitalized district has to offer.
              </p>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about">Learn About Mid-Town Lakeland</Link>
              </Button>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
