import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { CompareContent } from './compare-content';

export const metadata: Metadata = {
  title: 'Compare Businesses',
  description: 'Compare businesses side-by-side to make informed decisions',
};

export default function ComparePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50">
        <CompareContent />
      </main>
      <Footer />
    </>
  );
}
