import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { BlogContent } from './blog-content';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Latest news, tips, and stories from the Midtown community',
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50">
        <BlogContent />
      </main>
      <Footer />
    </>
  );
}
