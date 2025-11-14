import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Header } from '@/components/layout';
import { BusinessesManagementContent } from './businesses-management-content';

async function getCurrentUser() {
  // TODO: Implement Supabase auth check
  // Mock user data
  return {
    id: 'admin-1',
    email: 'admin@midtownbook.com',
    name: 'Admin User',
    role: 'admin',
  };
}

export const metadata: Metadata = {
  title: 'Business Management',
  description: 'Manage and verify business listings',
};

export default async function BusinessesManagementPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== 'admin') {
    redirect('/');
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50">
        <BusinessesManagementContent />
      </main>
    </>
  );
}
