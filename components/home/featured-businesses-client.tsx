'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Star, ExternalLink } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BusinessWithDetails } from '@/lib/data/businesses';

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

interface FeaturedBusinessesClientProps {
  businesses: BusinessWithDetails[];
}

export function FeaturedBusinessesClient({ businesses }: FeaturedBusinessesClientProps) {
  if (businesses.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-surface">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-display-md font-serif font-bold text-foreground mb-4"
          >
            Featured Businesses
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-body-lg text-muted-foreground"
          >
            Discover the best businesses in Midtown, handpicked just for you
          </motion.p>
        </div>

        {/* Businesses Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {businesses.map((business) => (
            <motion.div key={business.id} variants={itemVariants}>
              <Link href={`/businesses/${business.slug}`}>
                <Card
                  variant="default"
                  padding="none"
                  interactive
                  className="h-full overflow-hidden group"
                >
                  {/* Business Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-muted">
                    {business.cover_image_url ? (
                      <Image
                        src={business.cover_image_url}
                        alt={business.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center">
                        <span className="text-4xl font-serif text-primary-600">
                          {business.name.charAt(0)}
                        </span>
                      </div>
                    )}

                    {/* Verified Badge */}
                    {business.is_verified && (
                      <div className="absolute top-3 right-3">
                        <Badge variant="success" size="sm">
                          Verified
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Business Details */}
                  <CardContent className="p-5">
                    {/* Business Name and Category */}
                    <div className="mb-3">
                      <h3 className="font-serif font-semibold text-heading-sm text-foreground mb-1 line-clamp-1 group-hover:text-primary-600 transition-colors">
                        {business.name}
                      </h3>
                      <p className="text-label-sm text-muted-foreground">
                        {business.category.name}
                      </p>
                    </div>

                    {/* Rating */}
                    {business.average_rating !== null && (
                      <div className="flex items-center gap-1 mb-3">
                        <Star className="h-4 w-4 fill-accent-500 text-accent-500" />
                        <span className="text-body-sm font-medium text-foreground">
                          {business.average_rating.toFixed(1)}
                        </span>
                        <span className="text-label-sm text-muted-foreground">
                          ({business.review_count} {business.review_count === 1 ? 'review' : 'reviews'})
                        </span>
                      </div>
                    )}

                    {/* Location */}
                    <div className="flex items-start gap-2 mb-3">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <p className="text-body-sm text-muted-foreground line-clamp-2">
                        {business.address}, {business.city}, {business.state}
                      </p>
                    </div>

                    {/* Description */}
                    {business.description && (
                      <p className="text-body-sm text-muted-foreground line-clamp-2 mb-4">
                        {business.description}
                      </p>
                    )}

                    {/* View Details Link */}
                    <div className="flex items-center gap-2 text-primary-600 text-body-sm font-medium">
                      View Details
                      <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-10"
        >
          <Link
            href="/businesses"
            className="text-body-md font-medium text-primary-600 hover:text-primary-700 hover:underline underline-offset-4 transition-colors"
          >
            View All Businesses →
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
