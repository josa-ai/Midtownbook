'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export function BusinessHero() {
  return (
    <section className="relative section-padding bg-gradient-to-br from-primary-50 via-background to-accent-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-200 rounded-full opacity-20 blur-3xl" />
      </div>

      <Container className="relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Special Offer Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-100 border border-accent-200 mb-6"
          >
            <span className="inline-block w-2 h-2 bg-accent-500 rounded-full animate-pulse" />
            <span className="text-label-md font-medium text-accent-900">
              Limited Time: Get 3 months free on annual plans
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-display-xl md:text-display-2xl font-serif font-bold text-foreground mb-6"
          >
            Grow Your Business with{' '}
            <span className="text-primary-600">Midtown Book</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-body-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Connect with thousands of local customers actively searching for businesses like yours.
            Increase visibility, build trust, and drive real growth.
          </motion.p>

          {/* Key Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6 mb-10"
          >
            {[
              'No setup fees',
              'Cancel anytime',
              'Featured placement',
              'Verified reviews',
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                <span className="text-body-md font-medium text-foreground">
                  {benefit}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button size="lg" asChild>
              <Link href="#pricing">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#testimonials">See Success Stories</Link>
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 pt-8 border-t border-border"
          >
            <p className="text-label-sm text-muted-foreground mb-4">
              Trusted by local businesses
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              <div className="text-center">
                <div className="text-heading-lg font-bold text-primary-600">
                  1,000+
                </div>
                <div className="text-label-sm text-muted-foreground">
                  Active Listings
                </div>
              </div>
              <div className="text-center">
                <div className="text-heading-lg font-bold text-primary-600">
                  10,000+
                </div>
                <div className="text-label-sm text-muted-foreground">
                  Monthly Searches
                </div>
              </div>
              <div className="text-center">
                <div className="text-heading-lg font-bold text-primary-600">
                  98%
                </div>
                <div className="text-label-sm text-muted-foreground">
                  Customer Satisfaction
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
