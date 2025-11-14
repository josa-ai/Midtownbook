import { Metadata } from 'next';
import { Header } from '@/components/layout';
import { CreateDealContent } from './create-deal-content';

export const metadata: Metadata = {
  title: 'Create Deal',
  description: 'Create a new deal or special offer',
};

export default function CreateDealPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50">
        <CreateDealContent />
      </main>
    </>
  );
}
