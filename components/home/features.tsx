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
    name: 'Verified Reviews',
    description:
      'Read authentic reviews from real customers to make informed decisions about local businesses.',
    icon: Shield,
    color: 'text-primary-600 bg-primary-100',
  },
  {
    name: 'Ratings & Rankings',
    description:
      'Discover top-rated businesses based on community feedback and comprehensive ratings.',
    icon: Star,
    color: 'text-accent-600 bg-accent-100',
  },
  {
    name: 'Exclusive Deals',
    description:
      'Access special offers, discounts, and promotions available only to our community members.',
    icon: Tag,
    color: 'text-secondary-600 bg-secondary-100',
  },
  {
    name: 'Local Events',
    description:
      'Stay updated with community events, workshops, and activities happening in Midtown.',
    icon: Calendar,
    color: 'text-primary-600 bg-primary-100',
  },
  {
    name: 'Community Driven',
    description:
      'Join a vibrant community of locals supporting and promoting neighborhood businesses.',
    icon: Users,
    color: 'text-info bg-info-light',
  },
  {
    name: 'Business Growth',
    description:
      'Help local businesses grow and thrive by connecting them with the community.',
    icon: TrendingUp,
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
            Why Choose Midtown Book?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-body-lg text-muted-foreground"
          >
            Everything you need to discover, connect with, and support local businesses
            in one place
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
