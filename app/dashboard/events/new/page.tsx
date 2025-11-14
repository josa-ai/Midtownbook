import { Metadata } from 'next';
import { Header } from '@/components/layout';
import { CreateEventContent } from './create-event-content';

export const metadata: Metadata = {
  title: 'Create Event',
  description: 'Create a new event for your business',
};

export default function CreateEventPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50">
        <CreateEventContent />
      </main>
    </>
  );
}
