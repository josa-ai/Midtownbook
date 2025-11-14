import { Metadata } from 'next';
import { Header } from '@/components/layout';
import { EventsListContent } from './events-list-content';

export const metadata: Metadata = {
  title: 'Manage Events',
  description: 'View and manage your business events',
};

export default function EventsListPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50">
        <EventsListContent />
      </main>
    </>
  );
}
