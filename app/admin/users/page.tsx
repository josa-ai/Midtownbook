import { Metadata } from 'next';
import { Header } from '@/components/layout';
import { UsersManagementContent } from './users-management-content';
import { requireAdmin } from '@/lib/auth/admin';

export const metadata: Metadata = {
  title: 'User Management',
  description: 'Manage user accounts and permissions',
};

export default async function UsersManagementPage() {
  // Require admin authentication
  await requireAdmin();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50">
        <UsersManagementContent />
      </main>
    </>
  );
}
