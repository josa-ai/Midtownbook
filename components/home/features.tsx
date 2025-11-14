'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Star,
  Tag,
  Calendar,
  Users,
  TrendingUp,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const features = [
  {
    name: 'Built-In Foot Traffic',
    description:
      'Over 1 million annual visitors to Bonnet Springs Park and 50K+ Tigers fans looking for nearby dining, shopping, and services.',
    icon: TrendingUp,
    color: 'text-primary-600 bg-primary-100',
  },
  {
    name: 'Featured Placement',
    description:
      'Get prominent visibility on the homepage and in category searches during peak park and game times.',
    icon: Star,
    color: 'text-accent-600 bg-accent-100',
  },
  {
    name: 'Show Your Ticket Deals',
    description:
      'Attract park-goers and Tigers fans with exclusive "Show Your Ticket" promotions that drive immediate traffic.',
    icon: Tag,
    color: 'text-secondary-600 bg-secondary-100',
  },
  {
    name: 'Event Integration',
    description:
      'Connect your business to park events, Tigers game days, and neighborhood activities to maximize exposure.',
    icon: Calendar,
    color: 'text-primary-600 bg-primary-100',
  },
  {
    name: 'Verified Reviews',
    description:
      'Build trust with authentic reviews from real customers exploring Mid-Town Lakeland.',
    icon: Shield,
    color: 'text-info bg-info-light',
  },
  {
    name: 'Memorial Boulevard Visibility',
    description:
      'Showcase your business on Mid-Town\'s main corridor connecting world-class attractions to local gems.',
    icon: Users,
    color: 'text-secondary-600 bg-secondary-100',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function Features() {
  return (
    <section className="section-padding bg-neutral-50">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-display-md font-serif font-bold text-foreground mb-4"
          >
            Why List Your Business in Mid-Town?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-body-lg text-muted-foreground"
          >
            Reach thousands of park and Tigers visitors while serving the neighborhood you call home
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div key={feature.name} variants={itemVariants}>
              <Card
                variant="default"
                padding="lg"
                className="h-full group hover:shadow-card-hover transition-all duration-300"
              >
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110 ${feature.color}`}
                  >
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{feature.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-body-md">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
