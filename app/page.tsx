import { Hero, FeaturedCategories, Features, CtaSection } from '@/components/home';
import { Header, Footer } from '@/components/layout';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Hero />
        <FeaturedCategories />
        <Features />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
