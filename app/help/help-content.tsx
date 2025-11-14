'use client';

import * as React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  HelpCircle,
  Search,
  Building2,
  User,
  CreditCard,
  Settings,
  Shield,
  Mail,
  Phone,
  MessageCircle,
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  faqs: FAQItem[];
}

export function HelpContent() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState('general');

  const categories: FAQCategory[] = [
    {
      id: 'general',
      title: 'General Questions',
      icon: HelpCircle,
      faqs: [
        {
          question: 'What is Midtown Book?',
          answer:
            'Midtown Book is a community-focused business directory that helps local residents discover and connect with businesses in their neighborhood. We provide detailed business listings, reviews, events, and special offers to help you explore and support your local community.',
        },
        {
          question: 'How do I search for businesses?',
          answer:
            'You can search for businesses using the search bar on the homepage. Filter results by category, location, rating, and other criteria. You can also browse businesses by category or explore featured businesses on our homepage.',
        },
        {
          question: 'Is Midtown Book free to use?',
          answer:
            'Yes! Midtown Book is completely free for consumers to search, browse, and review businesses. Business owners can claim their listings for free and access basic features. Premium business subscriptions are available with additional features.',
        },
        {
          question: 'How do I leave a review?',
          answer:
            'To leave a review, you need to create a free account. Once logged in, visit any business page and click the "Write a Review" button. Share your experience with a rating (1-5 stars) and detailed feedback to help other community members.',
        },
        {
          question: 'Can I edit or delete my review?',
          answer:
            'Yes, you can edit or delete your reviews at any time. Go to your account dashboard, navigate to "My Reviews," and select the review you want to modify. Click "Edit" to make changes or "Delete" to remove it permanently.',
        },
        {
          question: 'How are businesses verified?',
          answer:
            'Businesses with a verified badge have completed our verification process by submitting proof of ownership or authorization. This includes business licenses, utility bills, or official documentation. Verified businesses are marked with a special badge on their listing.',
        },
      ],
    },
    {
      id: 'business-owners',
      title: 'For Business Owners',
      icon: Building2,
      faqs: [
        {
          question: 'How do I claim my business listing?',
          answer:
            'To claim your business listing, find your business on Midtown Book and click the "Claim This Business" button. You\'ll need to verify your ownership by providing documentation such as a business license or utility bill. Our team typically reviews claims within 2-3 business days.',
        },
        {
          question: 'What documents do I need to verify ownership?',
          answer:
            'Acceptable documents include: business license or registration, utility bill with business address, articles of incorporation, or a letter of authorization from the business owner. Documents must clearly show the business name and current address.',
        },
        {
          question: 'What can I do with a claimed listing?',
          answer:
            'With a claimed listing, you can update business information, add photos, respond to customer reviews, create events and special offers, access analytics and insights, and display a verified badge on your listing.',
        },
        {
          question: 'How do I respond to reviews?',
          answer:
            'Once your business is claimed and verified, you can respond to reviews from your business dashboard. Navigate to "Reviews" and click "Reply" on any review. Your responses will be publicly visible and marked as coming from the business owner.',
        },
        {
          question: 'Can I add photos to my business listing?',
          answer:
            'Yes! Verified business owners can upload up to 50 photos including your logo, storefront, interior, products, and team. High-quality photos help attract more customers and showcase what makes your business unique.',
        },
        {
          question: 'How do I create a special offer or deal?',
          answer:
            'From your business dashboard, navigate to "Deals & Offers" and click "Create New Deal." Add details about the offer, set the discount amount, choose start and end dates, and publish. Your deal will appear on your business listing and in our deals section.',
        },
        {
          question: 'What are the premium business features?',
          answer:
            'Premium subscriptions include: priority placement in search results, enhanced analytics with detailed customer insights, unlimited photos and videos, custom branding options, featured listing badge, and priority customer support. Contact us for pricing details.',
        },
      ],
    },
    {
      id: 'account',
      title: 'Account & Billing',
      icon: User,
      faqs: [
        {
          question: 'How do I create an account?',
          answer:
            'Click the "Sign Up" button in the top right corner of any page. You can create an account using your email address or sign up with Google. Once registered, you\'ll receive a verification email to activate your account.',
        },
        {
          question: 'I forgot my password. How do I reset it?',
          answer:
            'Click "Sign In" and then "Forgot Password" on the login page. Enter your email address, and we\'ll send you a password reset link. Follow the instructions in the email to create a new password.',
        },
        {
          question: 'How do I change my email address?',
          answer:
            'Log in to your account, go to "Settings," and click "Account Information." Enter your new email address and verify it by clicking the confirmation link we send to your new email.',
        },
        {
          question: 'Can I delete my account?',
          answer:
            'Yes, you can delete your account from the Settings page. Please note that this action is permanent and will remove all your reviews, photos, and saved businesses. If you have a claimed business, you\'ll need to transfer ownership first.',
        },
        {
          question: 'How much does a premium subscription cost?',
          answer:
            'Premium business subscriptions start at $29/month with annual plans available at discounted rates. We offer a 14-day free trial for new business owners. Visit our pricing page or contact our sales team for custom enterprise solutions.',
        },
        {
          question: 'How do I cancel my subscription?',
          answer:
            'You can cancel your premium subscription at any time from your business dashboard under "Billing & Subscription." Your access to premium features will continue until the end of your current billing period.',
        },
      ],
    },
    {
      id: 'technical',
      title: 'Technical Support',
      icon: Settings,
      faqs: [
        {
          question: 'The website is not loading properly. What should I do?',
          answer:
            'Try clearing your browser cache and cookies, or use a different browser. Make sure you\'re using an up-to-date version of Chrome, Firefox, Safari, or Edge. If the problem persists, contact our support team with details about your browser and device.',
        },
        {
          question: 'I\'m having trouble uploading photos. What file types are supported?',
          answer:
            'We support JPG, PNG, and WebP image formats. Files should be under 10MB in size. For best results, use high-resolution images (at least 1200px wide). If you continue to have issues, try reducing the file size or converting to JPG format.',
        },
        {
          question: 'Why am I not receiving email notifications?',
          answer:
            'Check your spam/junk folder first. Add noreply@midtownbook.com to your contacts to ensure our emails reach your inbox. You can also adjust your notification preferences in your account settings under "Email Preferences."',
        },
        {
          question: 'Can I access Midtown Book on my mobile device?',
          answer:
            'Yes! Midtown Book is fully responsive and works on all mobile devices. We recommend using the latest version of your mobile browser for the best experience. We also have native mobile apps coming soon for iOS and Android.',
        },
        {
          question: 'How do I report a technical bug?',
          answer:
            'If you encounter a bug, please contact our support team at support@midtownbook.com with a detailed description of the issue, including your device, browser version, and steps to reproduce the problem. Screenshots are helpful!',
        },
      ],
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      icon: Shield,
      faqs: [
        {
          question: 'How is my personal information protected?',
          answer:
            'We use industry-standard encryption (SSL/TLS) to protect your data during transmission. Your personal information is stored securely and never shared with third parties without your consent. We comply with GDPR and CCPA privacy regulations.',
        },
        {
          question: 'What information do you collect?',
          answer:
            'We collect information you provide (name, email, reviews), usage data (pages visited, search queries), and device information. We use this data to improve our service, personalize your experience, and send relevant notifications. See our Privacy Policy for full details.',
        },
        {
          question: 'Can I control what information is visible to others?',
          answer:
            'Yes! You can control your privacy settings from your account dashboard. Choose whether to display your full name or username on reviews, control who can see your saved businesses, and manage your public profile visibility.',
        },
        {
          question: 'How do I report inappropriate content or spam?',
          answer:
            'Every review and business listing has a "Report" button. Click it to flag inappropriate content, spam, fake reviews, or violations of our community guidelines. Our moderation team reviews all reports within 24 hours.',
        },
        {
          question: 'Do you sell my data to third parties?',
          answer:
            'No, we never sell your personal data to third parties. We may share aggregated, anonymized data for research purposes, but this data cannot be used to identify individual users. Your privacy is our top priority.',
        },
      ],
    },
  ];

  const filterFAQs = () => {
    if (!searchQuery) {
      return categories.find((c) => c.id === activeCategory)?.faqs || [];
    }

    // Search across all categories
    const allFAQs: FAQItem[] = [];
    categories.forEach((category) => {
      const matchingFAQs = category.faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
      allFAQs.push(...matchingFAQs);
    });

    return allFAQs;
  };

  const filteredFAQs = filterFAQs();

  return (
    <div className="py-12">
      <Container size="lg">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 mb-6">
            <HelpCircle className="h-8 w-8 text-primary-600" />
          </div>
          <h1 className="font-serif font-bold text-display-lg text-foreground mb-4">
            How Can We Help?
          </h1>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Search our knowledge base for answers to common questions, or browse by category below.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-body-md"
              />
            </div>
          </div>
        </div>

        {/* FAQ Content */}
        {!searchQuery ? (
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList variant="line" className="mb-8">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <TabsTrigger key={category.id} value={category.id}>
                    <Icon className="h-4 w-4 mr-2" />
                    {category.title}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <Card>
                  <CardContent className="p-8">
                    <Accordion type="single" collapsible className="space-y-4">
                      {category.faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent>
                            <p className="text-body-md text-muted-foreground leading-relaxed">
                              {faq.answer}
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <Card>
            <CardContent className="p-8">
              {filteredFAQs.length > 0 ? (
                <>
                  <h2 className="font-serif font-semibold text-heading-lg mb-6">
                    Search Results ({filteredFAQs.length})
                  </h2>
                  <Accordion type="single" collapsible className="space-y-4">
                    {filteredFAQs.map((faq, index) => (
                      <AccordionItem key={index} value={`search-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-body-md text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </>
              ) : (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-heading-sm mb-2">No Results Found</h3>
                  <p className="text-body-md text-muted-foreground mb-6">
                    We couldn't find any articles matching "{searchQuery}"
                  </p>
                  <Button variant="outline" onClick={() => setSearchQuery('')}>
                    Clear Search
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Contact Support Section */}
        <Card className="mt-12">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="font-serif font-semibold text-heading-lg mb-2">
                Still Need Help?
              </h2>
              <p className="text-body-md text-muted-foreground">
                Our support team is here to assist you. Choose your preferred method of contact:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 mb-4">
                    <Mail className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-body-md mb-2">Email Support</h3>
                  <p className="text-body-sm text-muted-foreground mb-4">
                    Get a response within 24 hours
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="mailto:support@midtownbook.com">
                      Send Email
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 mb-4">
                    <Phone className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-body-md mb-2">Phone Support</h3>
                  <p className="text-body-sm text-muted-foreground mb-4">
                    Mon-Fri, 9am-5pm PST
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="tel:+15551234567">
                      (555) 123-4567
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 mb-4">
                    <MessageCircle className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-body-md mb-2">Live Chat</h3>
                  <p className="text-body-sm text-muted-foreground mb-4">
                    Chat with us in real-time
                  </p>
                  <Button variant="outline" size="sm">
                    Start Chat
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Additional Resources */}
        <div className="mt-12 text-center">
          <h2 className="font-serif font-semibold text-heading-lg mb-6">
            Additional Resources
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/terms">Terms of Service</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/privacy">Privacy Policy</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/blog">Community Blog</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
