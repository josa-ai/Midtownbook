'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

const benefits = [
  'Show your park receipt or Tigers ticket for exclusive discounts',
  'Find the perfect pre-game spot or post-park celebration',
  'Browse unique shops and boutiques on Memorial Boulevard',
  'Enjoy walkable streets connecting attractions to local businesses',
  'Discover why Mid-Town is Lakeland\'s most exciting district',
];

export function CtaSection() {
  return (
    <section className="section-padding bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden relative">
      {/* Decorative Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl" />
      </div>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-display-md lg:text-display-lg font-serif font-bold mb-6">
              Make the Most of Your Visit
            </h2>
            <p className="text-body-lg text-white/90 mb-8">
              Thousands visit Bonnet Springs Park and Tigers games every year. Here's how local businesses make your Mid-Town adventure unforgettable.
            </p>

            {/* Benefits List */}
            <ul className="space-y-4 mb-10">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="h-6 w-6 text-accent-300 flex-shrink-0" />
                  <span className="text-body-md text-white/95">{benefit}</span>
                </motion.li>
              ))}
            </ul>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                variant="accent"
                size="lg"
                asChild
                className="shadow-xl hover:shadow-2xl"
              >
                <Link href="/deals">
                  See All Deals & Offers
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <Link href="/events">Browse Events</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Image/Illustration Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-square">
              {/* Placeholder for illustration or image */}
              <div className="absolute inset-0 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <div className="text-center space-y-4 p-8">
                  <div className="w-24 h-24 mx-auto bg-accent-400 rounded-2xl flex items-center justify-center shadow-2xl">
                    <svg
                      className="w-12 h-12 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <p className="text-display-sm font-serif font-bold">
                      +150%
                    </p>
                    <p className="text-body-md text-white/80">
                      Average customer growth
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Stats Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -top-4 -right-4 bg-white rounded-xl shadow-2xl p-4"
              >
                <p className="text-label-sm text-neutral-600 mb-1">New Reviews</p>
                <p className="text-heading-lg font-bold text-primary-600">+245</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-2xl p-4"
              >
                <p className="text-label-sm text-neutral-600 mb-1">Active Deals</p>
                <p className="text-heading-lg font-bold text-secondary-600">350+</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
