import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

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
    default: 'Midtown Book - Community Business Directory',
    template: '%s | Midtown Book',
  },
  description:
    'Discover and support local businesses in Midtown. Your comprehensive community business directory featuring authentic reviews, events, and exclusive deals.',
  keywords: [
    'Midtown',
    'local business',
    'business directory',
    'community',
    'reviews',
    'events',
    'deals',
    'small business',
  ],
  authors: [{ name: 'Midtown Book' }],
  creator: 'Midtown Book',
  publisher: 'Midtown Book',
  metadataBase: new URL('https://midtownbook.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://midtownbook.com',
    siteName: 'Midtown Book',
    title: 'Midtown Book - Community Business Directory',
    description:
      'Discover and support local businesses in Midtown. Your comprehensive community business directory.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Midtown Book',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Midtown Book - Community Business Directory',
    description:
      'Discover and support local businesses in Midtown. Your comprehensive community business directory.',
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
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable,
          playfair.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
