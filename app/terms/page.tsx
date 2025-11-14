import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { Container } from '@/components/ui/container';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Midtown Book',
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-12">
        <Container size="md">
          <article className="prose prose-neutral max-w-none">
            <h1 className="font-serif font-bold text-display-lg mb-4">Terms of Service</h1>
            <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

            <h2 className="font-serif font-semibold text-heading-lg mt-8 mb-4">Agreement to Terms</h2>
            <p>
              By accessing and using Midtown Book, you accept and agree to be bound by the terms and provision
              of this agreement. If you do not agree to these terms, please do not use our service.
            </p>

            <h2 className="font-serif font-semibold text-heading-lg mt-8 mb-4">Use License</h2>
            <p>
              Permission is granted to temporarily access the materials on Midtown Book for personal,
              non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul>
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to decompile or reverse engineer any software contained on Midtown Book</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>

            <h2 className="font-serif font-semibold text-heading-lg mt-8 mb-4">User Accounts</h2>
            <p>When you create an account with us, you must provide accurate, complete, and current information.
            Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.</p>
            <p>You are responsible for safeguarding the password that you use to access the service and for any
            activities or actions under your password.</p>

            <h2 className="font-serif font-semibold text-heading-lg mt-8 mb-4">Business Listings</h2>
            <p>
              Business owners who create listings on Midtown Book agree to:
            </p>
            <ul>
              <li>Provide accurate and up-to-date business information</li>
              <li>Respond to customer inquiries in a timely manner</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Not engage in fraudulent or misleading practices</li>
            </ul>

            <h2 className="font-serif font-semibold text-heading-lg mt-8 mb-4">Content</h2>
            <p>
              Our service allows you to post, link, store, share and otherwise make available certain information,
              text, graphics, or other material. You are responsible for the content that you post to the service,
              including its legality, reliability, and appropriateness.
            </p>

            <h2 className="font-serif font-semibold text-heading-lg mt-8 mb-4">Prohibited Uses</h2>
            <p>You may not use our service:</p>
            <ul>
              <li>In any way that violates any applicable law or regulation</li>
              <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent</li>
              <li>To impersonate or attempt to impersonate the company, a company employee, another user or any other person or entity</li>
              <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the service</li>
            </ul>

            <h2 className="font-serif font-semibold text-heading-lg mt-8 mb-4">Disclaimer</h2>
            <p>
              The materials on Midtown Book are provided on an 'as is' basis. Midtown Book makes no warranties,
              expressed or implied, and hereby disclaims and negates all other warranties including, without limitation,
              implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement
              of intellectual property or other violation of rights.
            </p>

            <h2 className="font-serif font-semibold text-heading-lg mt-8 mb-4">Limitations</h2>
            <p>
              In no event shall Midtown Book or its suppliers be liable for any damages (including, without limitation,
              damages for loss of data or profit, or due to business interruption) arising out of the use or inability
              to use the materials on Midtown Book.
            </p>

            <h2 className="font-serif font-semibold text-heading-lg mt-8 mb-4">Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will
              provide notice of any changes by posting the new Terms on this page and updating the "Last updated" date.
            </p>

            <h2 className="font-serif font-semibold text-heading-lg mt-8 mb-4">Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at{' '}
              <a href="mailto:legal@midtownbook.com" className="text-primary-600 hover:text-primary-700">
                legal@midtownbook.com
              </a>
            </p>
          </article>
        </Container>
      </main>
      <Footer />
    </>
  );
}
