import { Metadata } from 'next';
import { Header } from '@/components/layout';
import { CreateBusinessContent } from './create-business-content';

export const metadata: Metadata = {
  title: 'Add Your Business',
  description: 'List your business on Midtown Book',
};

export default function CreateBusinessPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50">
        <CreateBusinessContent />
      </main>
    </>
  );
}
