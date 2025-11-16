import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { GoogleAnalytics, AnalyticsProvider } from '@/components/analytics';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Mid-Town Lakeland Directory | Bonnet Springs Park & Detroit Tigers',
    template: '%s | Mid-Town Lakeland',
  },
  description:
    'Discover Mid-Town Lakeland businesses near Bonnet Springs Park (USA Today\'s #1 City Park) and Detroit Tigers Spring Training. Find dining, shopping, and services in Lakeland, Florida\'s most exciting district.',
  keywords: [
    'Mid-Town Lakeland',
    'Lakeland Florida',
    'Bonnet Springs Park',
    'Detroit Tigers Spring Training',
    'Lakeland businesses',
    'Memorial Boulevard',
    'Florida Avenue Lakeland',
    'Lakeland restaurants',
    'Lakeland shopping',
    'business directory',
    'local business',
  ],
  authors: [{ name: 'Midtown Book' }],
  creator: 'Midtown Book',
  publisher: 'Midtown Book',
  metadataBase: new URL('https://midtownbook.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://midtownbook.com',
    siteName: 'Mid-Town Lakeland Directory',
    title: 'Mid-Town Lakeland | Home to USA Today\'s #1 City Park',
    description:
      'Discover Mid-Town Lakeland businesses near Bonnet Springs Park and Detroit Tigers Spring Training. Your guide to Lakeland, Florida\'s most exciting district.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mid-Town Lakeland - Home to Bonnet Springs Park',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mid-Town Lakeland | Bonnet Springs Park & Detroit Tigers',
    description:
      'Discover Mid-Town Lakeland businesses near USA Today\'s #1 City Park and Detroit Tigers Spring Training in Lakeland, Florida.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <GoogleAnalytics />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable,
          playfair.variable
        )}
      >
        <AnalyticsProvider>{children}</AnalyticsProvider>
      </body>
    </html>
  );
}
