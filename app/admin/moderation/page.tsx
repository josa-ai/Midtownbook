import { Metadata } from 'next';
import { Header } from '@/components/layout';
import { ModerationContent } from './moderation-content';

export const metadata: Metadata = {
  title: 'Content Moderation',
  description: 'Review and moderate flagged content',
};

export default function ModerationPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50">
        <ModerationContent />
      </main>
    </>
  );
}
