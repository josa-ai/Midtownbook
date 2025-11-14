import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { HelpContent } from './help-content';

export const metadata: Metadata = {
  title: 'Help Center',
  description: 'Find answers to common questions and get support for Midtown Book',
};

export default function HelpPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50">
        <HelpContent />
      </main>
      <Footer />
    </>
  );
}
