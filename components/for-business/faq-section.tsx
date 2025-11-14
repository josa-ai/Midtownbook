'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: "How quickly can I get my business listed?",
    answer:
      "Your business can be live within 24 hours! Simply sign up, complete your profile with photos and details, and our team will verify and publish your listing. Premium plans get priority review and can be live in as little as 2 hours.",
  },
  {
    question: "What makes Midtown Book different from other directories?",
    answer:
      "We're hyper-focused on local community engagement. Unlike generic directories, we only feature businesses in Midtown, creating a trusted local network. Our verified review system, featured placements, and direct customer engagement tools are specifically designed to help neighborhood businesses thrive.",
  },
  {
    question: "Can I try before I commit?",
    answer:
      "Absolutely! Every plan includes a 14-day free trial with full access to all features. No credit card required to start. Plus, we offer a 30-day money-back guarantee on all paid plans--if you're not satisfied, we'll refund your payment, no questions asked.",
  },
  {
    question: "How do verified reviews work?",
    answer:
      "We verify reviews through multiple checks: email confirmation, purchase verification (when available), and AI-powered fraud detection. Only real customers can leave reviews, and we moderate all content to prevent spam and ensure authenticity. This builds trust with potential customers.",
  },
  {
    question: "Can I update my listing anytime?",
    answer:
      "Yes! You have 24/7 access to your dashboard where you can update your hours, photos, services, special offers, and more. Changes are reflected on your listing immediately. You can also respond to reviews and post updates to keep your community engaged.",
  },
  {
    question: "What if I have multiple locations?",
    answer:
      "Our Enterprise plan is perfect for multi-location businesses. You can manage all locations from one dashboard, with individual listings for each location. We also offer volume discounts for 3+ locations. Contact our sales team for custom pricing.",
  },
  {
    question: "How does the featured placement work?",
    answer:
      "Featured placements appear at the top of category searches and on the homepage. They receive 3x more views on average. With Professional and Enterprise plans, you can choose your featured category and time slots to maximize visibility during your peak hours.",
  },
  {
    question: "Do you offer any promotional support?",
    answer:
      "Yes! All paid plans include access to our deals platform where you can post special offers. We also feature select businesses in our monthly newsletter (10,000+ subscribers), social media highlights, and seasonal promotion campaigns at no extra cost.",
  },
  {
    question: "Is there a long-term contract?",
    answer:
      "No long-term contracts required! All plans are month-to-month, and you can cancel anytime. Annual plans offer significant savings (equivalent to 3 months free) but are also flexible--we'll prorate any unused time if you need to cancel.",
  },
  {
    question: "What kind of analytics do I get?",
    answer:
      "Your dashboard includes detailed analytics: profile views, click-through rates, customer demographics, search keywords, peak engagement times, review sentiment analysis, and competitor benchmarking. Professional and Enterprise plans get advanced reporting and export capabilities.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <section className="section-padding bg-background">
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
              FAQs
            </Badge>
            <h2 className="text-display-lg md:text-display-xl font-serif font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-body-lg text-muted-foreground">
              Everything you need to know about getting started
            </p>
          </motion.div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className={cn(
                    'w-full text-left p-6 rounded-lg border transition-all duration-200',
                    isOpen
                      ? 'bg-primary-50 border-primary-200 shadow-sm'
                      : 'bg-background border-border hover:border-primary-200 hover:bg-primary-50/50'
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3
                        className={cn(
                          'text-heading-sm font-semibold mb-2 transition-colors',
                          isOpen ? 'text-primary-900' : 'text-foreground'
                        )}
                      >
                        {faq.question}
                      </h3>

                      <div
                        className={cn(
                          'overflow-hidden transition-all duration-200',
                          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        )}
                      >
                        <p className="text-body-md text-muted-foreground pt-2 pr-4">
                          {faq.answer}
                        </p>
                      </div>
                    </div>

                    <ChevronDown
                      className={cn(
                        'h-5 w-5 flex-shrink-0 transition-all duration-200',
                        isOpen
                          ? 'rotate-180 text-primary-600'
                          : 'text-muted-foreground'
                      )}
                    />
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Still Have Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12 max-w-2xl mx-auto"
        >
          <div className="p-8 rounded-lg bg-gradient-to-br from-primary-50 to-accent-50 border border-primary-100">
            <h3 className="text-heading-md font-serif font-bold text-foreground mb-2">
              Still have questions?
            </h3>
            <p className="text-body-md text-muted-foreground mb-4">
              Our team is here to help you get started and grow your business
            </p>
            <a
              href="mailto:support@midtownbook.com"
              className="text-body-md font-semibold text-primary-600 hover:text-primary-700 hover:underline underline-offset-4 transition-colors"
            >
              Contact us at support@midtownbook.com →
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
