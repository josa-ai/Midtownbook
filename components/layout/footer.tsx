import * as React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const footerLinks = {
  discover: [
    { name: 'Browse Businesses', href: '/businesses' },
    { name: 'Categories', href: '/categories' },
    { name: 'Events', href: '/events' },
    { name: 'Deals & Offers', href: '/deals' },
    { name: 'Featured', href: '/featured' },
  ],
  forBusiness: [
    { name: 'For Business', href: '/for-business' },
    { name: 'Add Your Business', href: '/for-business' },
    { name: 'Pricing', href: '/for-business#pricing' },
    { name: 'Success Stories', href: '/for-business#testimonials' },
    { name: 'FAQ', href: '/for-business#faq' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Accessibility', href: '/accessibility' },
  ],
};

const socialLinks = [
  { name: 'Facebook', href: '#', icon: Facebook },
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'Instagram', href: '#', icon: Instagram },
  { name: 'LinkedIn', href: '#', icon: Linkedin },
];

export function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-border mt-auto">
      <Container>
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-flex items-center space-x-2 group mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-primary">
                  <span className="text-white font-serif font-bold text-xl">M</span>
                </div>
                <span className="font-serif font-bold text-heading-sm text-foreground group-hover:text-primary-600 transition-colors">
                  Midtown Book
                </span>
              </Link>
              <p className="text-body-sm text-muted-foreground mb-6 max-w-sm">
                Your trusted community business directory. Discover, connect, and support
                local businesses in Midtown.
              </p>

              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-body-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span>Midtown Community</span>
                </div>
                <div className="flex items-center space-x-2 text-body-sm text-muted-foreground">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <a
                    href="mailto:info@midtownbook.com"
                    className="hover:text-primary-600 transition-colors"
                  >
                    info@midtownbook.com
                  </a>
                </div>
                <div className="flex items-center space-x-2 text-body-sm text-muted-foreground">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <a
                    href="tel:+1234567890"
                    className="hover:text-primary-600 transition-colors"
                  >
                    (123) 456-7890
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-2 mt-6">
                {socialLinks.map((social) => (
                  <Button
                    key={social.name}
                    variant="ghost"
                    size="icon"
                    asChild
                    className="hover:bg-primary-50 hover:text-primary-600"
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            <div>
              <h3 className="font-serif font-semibold text-heading-xs mb-4">Discover</h3>
              <ul className="space-y-3">
                {footerLinks.discover.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-body-sm text-muted-foreground hover:text-primary-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-serif font-semibold text-heading-xs mb-4">For Business</h3>
              <ul className="space-y-3">
                {footerLinks.forBusiness.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-body-sm text-muted-foreground hover:text-primary-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-serif font-semibold text-heading-xs mb-4">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-body-sm text-muted-foreground hover:text-primary-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-serif font-semibold text-heading-xs mb-4">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-body-sm text-muted-foreground hover:text-primary-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="mt-12 lg:mt-16">
            <div className="bg-gradient-primary rounded-2xl p-8 lg:p-12">
              <div className="max-w-2xl mx-auto text-center">
                <h3 className="font-serif font-bold text-heading-lg text-white mb-2">
                  Stay Connected
                </h3>
                <p className="text-body-md text-white/90 mb-6">
                  Get the latest updates on new businesses, events, and exclusive deals
                  delivered to your inbox.
                </p>
                <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-white flex-1"
                    required
                  />
                  <Button
                    type="submit"
                    variant="secondary"
                    size="md"
                    className="sm:w-auto"
                  >
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Bottom Bar */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-body-sm text-muted-foreground text-center md:text-left">
              &copy; {new Date().getFullYear()} Midtown Book. All rights reserved.
            </p>
            <p className="text-body-sm text-muted-foreground text-center md:text-right">
              Made with ❤️ for the Midtown Community
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
