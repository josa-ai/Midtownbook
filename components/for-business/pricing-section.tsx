'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Star, Zap } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const pricingPlans = [
  {
    name: 'Starter',
    price: 29,
    description: 'Perfect for small businesses getting started',
    popular: false,
    features: [
      'Basic business listing',
      'Up to 5 photos',
      'Business hours & contact info',
      'Customer reviews',
      'Mobile-responsive profile',
      'Basic analytics dashboard',
    ],
    cta: 'Start Free Trial',
    color: 'default',
  },
  {
    name: 'Professional',
    price: 79,
    description: 'Most popular for growing businesses',
    popular: true,
    features: [
      'Everything in Starter, plus:',
      'Featured placement in category',
      'Unlimited photos & videos',
      'Special offers & deals posting',
      'Event listings',
      'Priority customer support',
      'Advanced analytics & insights',
      'Social media integration',
      'Verified business badge',
    ],
    cta: 'Get Started',
    color: 'primary',
  },
  {
    name: 'Enterprise',
    price: 149,
    description: 'For businesses that need maximum visibility',
    popular: false,
    features: [
      'Everything in Professional, plus:',
      'Homepage featured placement',
      'Sponsored search results',
      'Multiple location support',
      'API access',
      'Custom branding options',
      'Dedicated account manager',
      'Quarterly business reviews',
      'White-label reports',
      'Early access to new features',
    ],
    cta: 'Contact Sales',
    color: 'accent',
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

export function PricingSection() {
  return (
    <section id="pricing" className="section-padding bg-background">
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
              Pricing Plans
            </Badge>
            <h2 className="text-display-lg md:text-display-xl font-serif font-bold text-foreground mb-4">
              Choose Your Growth Plan
            </h2>
            <p className="text-body-lg text-muted-foreground">
              Flexible pricing designed to grow with your business. All plans include a 14-day free trial.
            </p>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {pricingPlans.map((plan, index) => (
            <motion.div key={plan.name} variants={itemVariants}>
              <Card
                variant={plan.popular ? 'elevated' : 'default'}
                padding="lg"
                className={cn(
                  'h-full relative',
                  plan.popular && 'border-2 border-primary-500 shadow-card-hover'
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge variant="default" size="lg" className="shadow-md">
                      <Star className="h-4 w-4 mr-1 fill-current" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-heading-lg">{plan.name}</CardTitle>
                    {plan.name === 'Enterprise' && (
                      <Zap className="h-6 w-6 text-accent-500" />
                    )}
                  </div>
                  <CardDescription className="text-body-md mb-4">
                    {plan.description}
                  </CardDescription>
                  <div className="flex items-baseline gap-2">
                    <span className="text-display-md font-bold text-foreground">
                      ${plan.price}
                    </span>
                    <span className="text-body-md text-muted-foreground">/month</span>
                  </div>
                  <p className="text-label-sm text-muted-foreground mt-2">
                    Billed annually, or ${Math.round(plan.price * 1.2)}/month billed monthly
                  </p>
                </CardHeader>

                <CardContent className="pb-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check
                          className={cn(
                            'h-5 w-5 flex-shrink-0 mt-0.5',
                            plan.popular
                              ? 'text-primary-600'
                              : 'text-success'
                          )}
                        />
                        <span
                          className={cn(
                            'text-body-sm',
                            feature.includes('Everything in')
                              ? 'font-semibold text-foreground'
                              : 'text-muted-foreground'
                          )}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button
                    size="lg"
                    variant={plan.popular ? 'default' : 'outline'}
                    className="w-full"
                    asChild
                  >
                    <Link href="/auth/signup">{plan.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Money Back Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-success-light border border-success">
            <Check className="h-5 w-5 text-success" />
            <span className="text-body-md font-medium text-success-foreground">
              30-day money-back guarantee • No long-term contracts
            </span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
