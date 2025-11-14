import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header, Footer } from '@/components/layout';
import { ClaimSuccessContent } from './claim-success-content';

async function getBusiness(slug: string) {
  // Mock business data
  const mockBusiness = {
    id: '1',
    slug: slug,
    name: 'Sunrise Café',
    address: '123 Main St, Midtown, CA 94102',
    category: 'Restaurant',
  };

  if (slug !== mockBusiness.slug) {
    return null;
  }

  return mockBusiness;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const business = await getBusiness(params.slug);

  if (!business) {
    return { title: 'Business Not Found' };
  }

  return {
    title: `Claim Submitted - ${business.name}`,
    description: `Your claim for ${business.name} has been successfully submitted`,
  };
}

export default async function ClaimSuccessPage({ params }: { params: { slug: string } }) {
  const business = await getBusiness(params.slug);

  if (!business) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50">
        <ClaimSuccessContent business={business} />
      </main>
      <Footer />
    </>
  );
}
