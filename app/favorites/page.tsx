import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Header, Footer } from '@/components/layout';
import { FavoritesContent } from './favorites-content';

async function getCurrentUser() {
  // TODO: Implement Supabase auth check
  // Mock user data
  return {
    id: 'user-1',
    email: 'john@example.com',
    name: 'John Doe',
    role: 'user',
  };
}

export const metadata: Metadata = {
  title: 'My Favorites',
  description: 'Your saved businesses and bookmarks',
};

export default async function FavoritesPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/auth/login?redirect=/favorites');
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50">
        <FavoritesContent user={user} />
      </main>
      <Footer />
    </>
  );
}
