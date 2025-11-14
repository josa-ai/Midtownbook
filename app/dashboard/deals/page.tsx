import { Metadata } from 'next';
import { Header } from '@/components/layout';
import { DealsListContent } from './deals-list-content';

export const metadata: Metadata = {
  title: 'Manage Deals',
  description: 'View and manage your business deals',
};

export default function DealsListPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50">
        <DealsListContent />
      </main>
    </>
  );
}
