import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Header } from '@/components/layout';
import { AdminDashboardContent } from './admin-dashboard-content';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Manage users, businesses, and content',
};

// Mock admin check - replace with actual Supabase auth
async function getCurrentUser() {
  // TODO: Implement Supabase auth check with admin role verification
  return {
    id: 'admin-1',
    email: 'admin@midtownbook.com',
    name: 'Admin User',
    role: 'admin',
  };
}

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== 'admin') {
    redirect('/');
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50">
        <AdminDashboardContent user={user} />
      </main>
    </>
  );
}
