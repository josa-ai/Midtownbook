'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, MapPin, TrendingUp } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const trendingSearches = [
  'Restaurants',
  'Coffee Shops',
  'Fitness',
  'Salons',
  'Auto Repair',
  'Healthcare',
];

export function Hero() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/businesses?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-background to-background py-20 lg:py-32">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-200/20 rounded-full blur-3xl" />
      </div>

      <Container>
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="flex justify-center mb-6">
            <Badge variant="primary" size="lg" icon={<TrendingUp className="h-4 w-4" />}>
              USA Today's #1 City Park
            </Badge>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeInUp}
            className="text-display-lg lg:text-display-xl font-serif font-bold text-foreground mb-6"
          >
            Experience{' '}
            <span className="text-transparent bg-clip-text bg-gradient-primary">
              Mid-Town Lakeland
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="text-body-lg lg:text-body-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            Home to America's #1 City Park & Detroit Tigers Spring Training. Discover award-winning attractions, unique local shops, and authentic dining in Lakeland's most exciting district.
          </motion.p>

          {/* Search Bar */}
          <motion.form
            variants={fadeInUp}
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto mb-6"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search businesses, events, or services in Mid-Town..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  inputSize="lg"
                  leftIcon={<Search className="h-5 w-5" />}
                  className="w-full shadow-md"
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="sm:w-auto shadow-md"
              >
                Search
              </Button>
            </div>
          </motion.form>

          {/* Trending Searches */}
          <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-2 mb-12">
            <span className="text-label-md text-muted-foreground">Trending:</span>
            {trendingSearches.map((search) => (
              <Link
                key={search}
                href={`/businesses?category=${search.toLowerCase()}`}
                className="text-label-md text-primary-600 hover:text-primary-700 hover:underline transition-colors"
              >
                {search}
              </Link>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button variant="primary" size="lg" asChild>
              <Link href="/about">
                <MapPin className="h-5 w-5" />
                Plan Your Visit
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/businesses">
                Explore Local Businesses
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
