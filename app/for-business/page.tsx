import { Header, Footer } from '@/components/layout';
import {
  BusinessHero,
  PricingSection,
  TestimonialsSection,
  FaqSection,
  BusinessCta,
} from '@/components/for-business';
import { Features } from '@/components/home/features';

export const metadata = {
  title: 'For Business | Mid-Town Lakeland Directory',
  description:
    'Join Mid-Town Lakeland\'s revival. Reach thousands of Bonnet Springs Park and Detroit Tigers visitors. Get discovered by customers exploring Lakeland\'s most exciting district.',
};

export default function ForBusinessPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <BusinessHero />
        <Features />
        <TestimonialsSection />
        <PricingSection />
        <FaqSection />
        <BusinessCta />
      </main>
      <Footer />
    </>
  );
}
