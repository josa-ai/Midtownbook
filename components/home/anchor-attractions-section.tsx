'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Palmtree, Trophy, Store, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const attractions = [
  {
    icon: Palmtree,
    title: 'Bonnet Springs Park',
    badge: "USA Today's #1",
    badgeVariant: 'primary' as const,
    description: "America's top-rated city park features 180 acres of stunning landscapes, interactive water features, and world-class amenities that draw visitors from across the country.",
    cta: 'Explore the Park',
    href: '/attractions/bonnet-springs-park',
    color: 'from-green-500 to-emerald-600',
  },
  {
    icon: Trophy,
    title: 'Detroit Tigers Spring Training',
    badge: 'Major League Baseball',
    badgeVariant: 'accent' as const,
    description: 'Experience the excitement of MLB spring training at Joker Marchant Stadium. Watch the Tigers prepare for the season with practices, games, and fan experiences.',
    cta: 'View Schedule',
    href: '/attractions/tigers-spring-training',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    icon: Store,
    title: 'Local Discovery',
    badge: 'Shop Local',
    badgeVariant: 'secondary' as const,
    description: 'From award-winning restaurants to unique boutiques, Mid-Town businesses offer authentic experiences you won\'t find anywhere else. Many offer special deals for park and game visitors.',
    cta: 'Browse Businesses',
    href: '/businesses',
    color: 'from-primary-500 to-primary-600',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

export function AnchorAttractionsSection() {
  return (
    <section className="section-padding bg-gradient-to-b from-background to-neutral-50">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-display-md lg:text-display-lg font-serif font-bold text-foreground mb-4">
              World-Class Attractions Meet Local Charm
            </h2>
            <p className="text-body-lg text-muted-foreground">
              Mid-Town Lakeland is home to nationally recognized destinations and the vibrant local businesses that make them even better
            </p>
          </motion.div>
        </div>

        {/* Attractions Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {attractions.map((attraction) => {
            const IconComponent = attraction.icon;

            return (
              <motion.div key={attraction.title} variants={itemVariants}>
                <Card
                  variant="default"
                  padding="lg"
                  className="h-full hover:shadow-card-hover transition-all duration-300 group"
                >
                  <CardHeader className="pb-4">
                    {/* Icon with gradient background */}
                    <div className="mb-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${attraction.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="h-7 w-7 text-white" />
                      </div>
                    </div>

                    {/* Badge */}
                    <Badge variant={attraction.badgeVariant} size="sm" className="mb-3 w-fit">
                      {attraction.badge}
                    </Badge>

                    {/* Title */}
                    <CardTitle className="text-heading-md font-serif mb-2">
                      {attraction.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="pb-6">
                    <CardDescription className="text-body-md text-muted-foreground leading-relaxed">
                      {attraction.description}
                    </CardDescription>
                  </CardContent>

                  <CardFooter>
                    <Button
                      variant="outline"
                      size="md"
                      className="w-full group-hover:bg-primary-50 group-hover:border-primary-300 transition-colors"
                      asChild
                    >
                      <Link href={attraction.href}>
                        {attraction.cta}
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-200">
            <span className="text-body-md font-medium text-foreground">
              Show your park receipt or Tigers ticket for exclusive deals at participating businesses
            </span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
