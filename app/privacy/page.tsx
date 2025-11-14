import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { Container } from '@/components/ui/container';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Midtown Book',
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-12">
        <Container size="md">
          <article className="prose prose-neutral max-w-none">
            <h1 className="font-serif font-bold text-display-lg mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

            <h2 className="font-serif font-semibold text-heading-lg mt-8 mb-4">Introduction</h2>
            <p>
              Welcome to Midtown Book. We respect your privacy and are committed to protecting your personal data.
              This privacy policy will inform you about how we look after your personal data when you visit our
              website and tell you about your privacy rights.
            </p>

            <h2 className="font-serif font-semibold text-heading-lg mt-8 mb-4">Information We Collect</h2>
            <p>We may collect, use, store and transfer different kinds of personal data about you including:</p>
            <ul>
              <li><strong>Identity Data:</strong> first name, last name, username</li>
              <li><strong>Contact Data:</strong> email address, telephone number</li>
              <li><strong>Technical Data:</strong> IP address, browser type and version</li>
              <li><strong>Usage Data:</strong> information about how you use our website</li>
              <li><strong>Marketing Data:</strong> your preferences in receiving marketing from us</li>
            </ul>

            <h2 className="font-serif font-semibold text-heading-lg mt-8 mb-4">How We Use Your Data</h2>
            <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
            <ul>
              <li>To register you as a new customer</li>
              <li>To process and deliver your service</li>
              <li>To manage our relationship with you</li>
              <li>To improve our website, products/services, marketing or customer relationships</li>
            </ul>

            <h2 className="font-serif font-semibold text-heading-lg mt-8 mb-4">Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being
              accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
            </p>

            <h2 className="font-serif font-semibold text-heading-lg mt-8 mb-4">Your Legal Rights</h2>
            <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:</p>
            <ul>
              <li>Request access to your personal data</li>
              <li>Request correction of your personal data</li>
              <li>Request erasure of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Request restriction of processing your personal data</li>
              <li>Request transfer of your personal data</li>
              <li>Right to withdraw consent</li>
            </ul>

            <h2 className="font-serif font-semibold text-heading-lg mt-8 mb-4">Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our privacy practices, please contact us at{' '}
              <a href="mailto:privacy@midtownbook.com" className="text-primary-600 hover:text-primary-700">
                privacy@midtownbook.com
              </a>
            </p>
          </article>
        </Container>
      </main>
      <Footer />
    </>
  );
}
