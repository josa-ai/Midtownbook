import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { ProfileContent } from './profile-content';

export const metadata: Metadata = {
  title: 'My Profile',
  description: 'Manage your user profile and preferences',
};

export default function ProfilePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50">
        <ProfileContent />
      </main>
      <Footer />
    </>
  );
}
