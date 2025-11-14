import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { ContactSuccessContent } from './contact-success-content';

export const metadata: Metadata = {
  title: 'Message Sent Successfully',
  description: 'Your message has been sent successfully. We\'ll get back to you soon.',
};

export default function ContactSuccessPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50">
        <ContactSuccessContent />
      </main>
      <Footer />
    </>
  );
}
