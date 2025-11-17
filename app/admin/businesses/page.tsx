import { Metadata } from 'next';
import { Header } from '@/components/layout';
import { BusinessesManagementContent } from './businesses-management-content';
import { requireAdmin } from '@/lib/auth/admin';

export const metadata: Metadata = {
  title: 'Business Management',
  description: 'Manage and verify business listings',
};

export default async function BusinessesManagementPage() {
  // Require admin authentication
  await requireAdmin();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50">
        <BusinessesManagementContent />
      </main>
    </>
  );
}
