import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Header } from '@/components/layout';
import { Container } from '@/components/ui/container';
import { DashboardContent } from './dashboard-content';
import { createClient } from '@/lib/supabase/server';
import { getProfile } from '@/lib/actions/auth';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Manage your business on Midtown Book',
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Get user profile
  const profile = await getProfile();

  // Combine user and profile data
  const userData = {
    id: user.id,
    email: user.email || '',
    name: profile?.full_name || user.user_metadata?.full_name || 'User',
    role: profile?.role || 'user',
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50">
        <DashboardContent user={userData} />
      </main>
    </>
  );
}
