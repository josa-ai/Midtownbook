import { Metadata } from 'next';
import { Header } from '@/components/layout';
import { UsersManagementContent } from './users-management-content';

export const metadata: Metadata = {
  title: 'User Management',
  description: 'Manage user accounts and permissions',
};

export default function UsersManagementPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50">
        <UsersManagementContent />
      </main>
    </>
  );
}
