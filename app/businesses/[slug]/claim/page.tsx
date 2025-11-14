import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header, Footer } from '@/components/layout';
import { ClaimBusinessForm } from './claim-business-form';

async function getBusiness(slug: string) {
  // Mock business data
  const mockBusiness = {
    id: '1',
    slug: slug,
    name: 'Sunrise Café',
    address: '123 Main St, Midtown, CA 94102',
    category: 'Restaurant',
    isClaimed: false,
  };

  if (slug !== mockBusiness.slug) {
    return null;
  }

  return mockBusiness;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const business = await getBusiness(slug);

  if (!business) {
    return { title: 'Business Not Found' };
  }

  return {
    title: `Claim ${business.name}`,
    description: `Claim your business listing for ${business.name}`,
  };
}

export default async function ClaimBusinessPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const business = await getBusiness(slug);

  if (!business) {
    notFound();
  }

  if (business.isClaimed) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-neutral-50 flex items-center justify-center py-12">
          <div className="text-center">
            <h1 className="font-serif font-bold text-heading-lg mb-4">
              Business Already Claimed
            </h1>
            <p className="text-body-md text-muted-foreground">
              This business listing has already been claimed by the owner.
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50">
        <ClaimBusinessForm business={business} />
      </main>
      <Footer />
    </>
  );
}
