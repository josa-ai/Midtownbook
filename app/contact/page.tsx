import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { ContactForm } from './contact-form';
import { Mail, MapPin, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Midtown Book team',
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50 py-12">
        <Container size="lg">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="font-serif font-bold text-display-lg text-foreground mb-4">
              Get in Touch
            </h1>
            <p className="text-body-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center shrink-0">
                      <Mail className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-heading-xs mb-1">Email</h3>
                      <p className="text-body-sm text-muted-foreground mb-2">
                        Our team is here to help
                      </p>
                      <a
                        href="mailto:hello@midtownbook.com"
                        className="text-primary-600 hover:text-primary-700 text-body-sm"
                      >
                        hello@midtownbook.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-secondary-100 flex items-center justify-center shrink-0">
                      <Phone className="h-6 w-6 text-secondary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-heading-xs mb-1">Phone</h3>
                      <p className="text-body-sm text-muted-foreground mb-2">
                        Mon-Fri 9am-5pm PST
                      </p>
                      <a
                        href="tel:+15551234567"
                        className="text-primary-600 hover:text-primary-700 text-body-sm"
                      >
                        (555) 123-4567
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-accent-100 flex items-center justify-center shrink-0">
                      <MapPin className="h-6 w-6 text-accent-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-heading-xs mb-1">Office</h3>
                      <p className="text-body-sm text-muted-foreground mb-2">
                        Visit us in person
                      </p>
                      <p className="text-body-sm text-foreground">
                        123 Main Street<br />
                        Midtown, CA 94102
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-8">
                  <h2 className="font-serif font-semibold text-heading-lg mb-6">
                    Send us a message
                  </h2>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
