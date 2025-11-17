import { Metadata } from 'next';
import { Header } from '@/components/layout';
import { AdminDashboardContent } from './admin-dashboard-content';
import { requireAdmin } from '@/lib/auth/admin';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Manage users, businesses, and content',
};

export default async function AdminDashboardPage() {
  // Require admin authentication - will redirect if not authorized
  const admin = await requireAdmin();

  const user = {
    id: admin.id,
    email: admin.email,
    name: admin.full_name || admin.email,
    role: admin.role,
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50">
        <AdminDashboardContent user={user} />
      </main>
    </>
  );
}
