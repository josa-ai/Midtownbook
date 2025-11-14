import { Metadata } from 'next';
import { Header } from '@/components/layout';
import { AnalyticsContent } from './analytics-content';

export const metadata: Metadata = {
  title: 'Analytics',
  description: 'View detailed analytics for your business',
};

export default function AnalyticsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50">
        <AnalyticsContent />
      </main>
    </>
  );
}
