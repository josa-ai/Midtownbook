import { Metadata } from 'next';
import { Header } from '@/components/layout';
import { ModerationContent } from './moderation-content';
import { requireAdmin } from '@/lib/auth/admin';

export const metadata: Metadata = {
  title: 'Content Moderation',
  description: 'Review and moderate flagged content',
};

export default async function ModerationPage() {
  // Require admin authentication
  await requireAdmin();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50">
        <ModerationContent />
      </main>
    </>
  );
}
