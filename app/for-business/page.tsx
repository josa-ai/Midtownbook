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
  title: 'For Business | Midtown Book',
  description:
    'Grow your local business with Midtown Book. Connect with thousands of customers, build trust with verified reviews, and increase visibility in your community.',
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
