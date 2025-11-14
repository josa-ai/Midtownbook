'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Quote, Star, TrendingUp } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Owner',
    business: 'Blue Lotus Yoga Studio',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    quote:
      "Within 3 months of joining Midtown Book, we saw a 45% increase in new student sign-ups. The verified reviews really helped build trust with potential customers.",
    results: '+45% new customers',
    rating: 5,
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Head Chef & Owner',
    business: 'La Cocina Restaurant',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marcus',
    quote:
      "The featured placement during lunch hours brought in so much foot traffic. We've had to hire two more staff members to keep up with demand!",
    results: '+60% lunch reservations',
    rating: 5,
  },
  {
    name: 'Jennifer Park',
    role: 'Salon Manager',
    business: 'Elegance Hair & Spa',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jennifer',
    quote:
      "The deals feature is a game-changer. We posted a first-time customer promotion and got 82 bookings in one week. Best marketing ROI we've ever had.",
    results: '82 new clients in 1 week',
    rating: 5,
  },
  {
    name: 'David Thompson',
    role: 'Owner',
    business: 'Thompson Hardware',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
    quote:
      "As a 3rd generation family business, adapting to online marketing was intimidating. Midtown Book made it simple, and our sales increased 35% in the first quarter.",
    results: '+35% quarterly revenue',
    rating: 5,
  },
  {
    name: 'Alicia Martinez',
    role: 'Founder',
    business: 'FitLife Personal Training',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alicia',
    quote:
      "The analytics dashboard showed me exactly when potential clients were searching. I adjusted my posting schedule and doubled my consultation requests.",
    results: '2x consultation requests',
    rating: 5,
  },
  {
    name: 'Robert Kim',
    role: 'Co-Owner',
    business: 'Artisan Coffee Roasters',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=robert',
    quote:
      "Midtown Book connected us with the local community in a way social media never did. Real customers leaving real reviews made all the difference.",
    results: '+50% weekend traffic',
    rating: 5,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-padding bg-neutral-50">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="secondary" size="lg" className="mb-4">
              Success Stories
            </Badge>
            <h2 className="text-display-lg md:text-display-xl font-serif font-bold text-foreground mb-4">
              Real Results from Real Businesses
            </h2>
            <p className="text-body-lg text-muted-foreground">
              Join hundreds of local businesses who are growing with Midtown Book
            </p>
          </motion.div>
        </div>

        {/* Testimonials Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card
                variant="default"
                padding="lg"
                className="h-full hover:shadow-card-hover transition-all duration-300"
              >
                <CardHeader className="pb-4">
                  {/* Quote Icon */}
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                    <Quote className="h-5 w-5 text-primary-600" />
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-accent-500 text-accent-500"
                      />
                    ))}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Quote */}
                  <p className="text-body-md text-muted-foreground italic">
                    "{testimonial.quote}"
                  </p>

                  {/* Results Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-success-light border border-success">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <span className="text-label-sm font-semibold text-success-foreground">
                      {testimonial.results}
                    </span>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted flex-shrink-0">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-body-md text-foreground">
                        {testimonial.name}
                      </div>
                      <div className="text-label-sm text-muted-foreground">
                        {testimonial.role}, {testimonial.business}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-body-lg text-muted-foreground mb-4">
            Ready to write your own success story?
          </p>
          <a
            href="#pricing"
            className="text-body-md font-semibold text-primary-600 hover:text-primary-700 hover:underline underline-offset-4 transition-colors"
          >
            View Pricing Plans →
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
