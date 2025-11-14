import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { NewsletterSuccessContent } from './newsletter-success-content';

export const metadata: Metadata = {
  title: 'Successfully Subscribed',
  description: 'You\'ve successfully subscribed to our newsletter. Welcome to the community!',
};

export default function NewsletterSuccessPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50">
        <NewsletterSuccessContent />
      </main>
      <Footer />
    </>
  );
}
