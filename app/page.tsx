import { Hero, FeaturedCategories, FeaturedBusinesses, CtaSection } from '@/components/home';
import { Header, Footer } from '@/components/layout';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Hero />
        <FeaturedCategories />
        <FeaturedBusinesses />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
