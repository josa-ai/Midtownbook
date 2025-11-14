# Midtownbook.com - Complete Implementation Plan

**Domain**: https://midtownbook.com
**Project**: Community Business Directory
**Last Updated**: 2025-01-12

---

## Table of Contents

1. [Technology Stack](#1-technology-stack)
2. [Architecture Overview](#2-architecture-overview)
3. [Color Palette & Design System](#3-color-palette--design-system)
4. [Database Schema (Supabase)](#4-database-schema-supabase)
5. [Environment Variables](#5-environment-variables)
6. [Third-Party Integrations](#6-third-party-integrations)
7. [Project Setup Instructions](#7-project-setup-instructions)
8. [Framer Motion Animations](#8-framer-motion-animations)
9. [SEO & Metadata Configuration](#9-seo--metadata-configuration)
10. [Email Configuration](#10-email-configuration)
11. [Development Phases](#11-development-phases)
12. [Domain Configuration Checklist](#12-domain-configuration-checklist)

---

## 1. Technology Stack

### Frontend Stack
- **Framework**: Next.js 14+ (App Router) - deployed on **Vercel**
- **UI Framework**: React 18+ with TypeScript
- **Styling**: Tailwind CSS + **Shadcn/ui** components
- **Animations**: **Framer Motion** (smooth, modern animations)
- **State Management**:
  - Zustand for global state
  - React Query (TanStack Query) for server state
- **Maps**: **Google Maps JavaScript API** + Places API
- **Forms**: React Hook Form + Zod validation
- **Rich Text**: Tiptap or Lexical editor

### Backend & Database Stack
- **Database**: **Supabase** (PostgreSQL 15+)
  - Built-in auth
  - Real-time subscriptions
  - Row Level Security (RLS)
- **Storage**: **Supabase Storage** (images, videos, documents)
- **API**: Next.js API Routes + Supabase Client
- **Cache**: Vercel Edge Config + Supabase Caching
- **Search**: PostgreSQL Full-Text Search (Supabase)

### Authentication & Communication
- **Auth**: **Supabase Auth** (email/password, OAuth, magic links)
- **Transactional Email**: **Mailgun** (verification, notifications, receipts)
- **Mass Email/Marketing**: **GoHighLevel** (newsletters, promotions, campaigns)
- **Payments**: **Stripe** (subscriptions, one-time payments)

### Infrastructure & DevOps
- **Hosting**: **Vercel** (automatic deployments from GitHub)
- **Version Control**: **GitHub** (repository integration)
- **CI/CD**: GitHub Actions + Vercel Git Integration
- **Monitoring**: Sentry (errors) + Vercel Analytics

---

## 2. Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│              Vercel Edge Network (Global CDN)               │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│              Next.js Application (Vercel)                   │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  Public     │  │ Business     │  │  Admin           │  │
│  │  Pages      │  │ Dashboard    │  │  Dashboard       │  │
│  │(Shadcn UI)  │  │(Framer Motion│  │(Analytics)       │  │
│  └─────────────┘  └──────────────┘  └──────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                   API Layer (Next.js)                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Supabase Client (Server-side & Client-side)        │  │
│  └──────────────────────────────────────────────────────┘  │
└──────┬──────────┬──────────┬──────────┬───────────────┬────┘
       │          │          │          │               │
   ┌───▼──┐  ┌───▼────┐ ┌──▼─────┐ ┌──▼──────┐  ┌────▼─────┐
   │Supa- │  │ Supa-  │ │Stripe  │ │Mailgun  │  │GoHigh-   │
   │base  │  │base    │ │Payment │ │Trans-   │  │Level     │
   │DB    │  │Storage │ │API     │ │actional │  │Marketing │
   │(PG)  │  │(Blobs) │ │        │ │Email    │  │Email     │
   └──────┘  └────────┘ └────────┘ └─────────┘  └──────────┘
```

---

## 3. Color Palette & Design System

### Color Scheme (Warm Terracotta/Green/Gold - NO Blue/Purple)

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        // Primary: Warm Terracotta/Burnt Orange
        primary: {
          50: '#fef7f3',
          100: '#fdeee5',
          200: '#fbd9ca',
          300: '#f8bda4',
          400: '#f39970',
          500: '#ee7744',  // Main primary
          600: '#dc5a2a',
          700: '#b84520',
          800: '#933a1e',
          900: '#77331e',
          950: '#40180d',
        },
        // Secondary: Deep Teal/Forest Green
        secondary: {
          50: '#f0fdf5',
          100: '#dcfce8',
          200: '#bbf7d1',
          300: '#86efad',
          400: '#4ade80',
          500: '#16a34a',  // Main secondary
          600: '#15803d',
          700: '#166534',
          800: '#14532d',
          900: '#14532d',
          950: '#052e16',
        },
        // Accent: Warm Gold/Amber
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',  // Main accent
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        // Neutrals: Warm Grays
        background: '#fafaf9',
        foreground: '#292524',
        muted: {
          DEFAULT: '#f5f5f4',
          foreground: '#78716c',
        },
        card: {
          DEFAULT: '#ffffff',
          foreground: '#292524',
        },
      },
    },
  },
};
```

### Typography

```typescript
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

// Usage:
// Headings: Playfair Display (serif, elegant)
// Body: Inter (sans-serif, readable)
```

---

## 4. Database Schema (Supabase)

### Core Tables SQL

```sql
-- Enable necessary extensions
create extension if not exists "uuid-ossp";
create extension if not exists "postgis";

-- Users table (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  role text not null default 'COMMUNITY_MEMBER' check (role in ('ADMIN', 'BUSINESS_OWNER', 'COMMUNITY_MEMBER')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone"
  on profiles for select using ( true );

create policy "Users can update own profile"
  on profiles for update using ( auth.uid() = id );

-- Categories
create table public.categories (
  id uuid default uuid_generate_v4() primary key,
  name text unique not null,
  slug text unique not null,
  description text,
  icon text,
  parent_id uuid references categories(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.categories enable row level security;

create policy "Categories are viewable by everyone"
  on categories for select using ( true );

-- Business Listings
create table public.businesses (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  name text not null,
  description text not null,
  tagline text,

  -- Contact & Location
  email text not null,
  phone text not null,
  website text,
  address text not null,
  city text not null,
  state text not null,
  zip_code text not null,
  location geography(Point, 4326),

  -- Media
  logo_url text,
  cover_image_url text,
  gallery_urls text[],

  -- Status & Verification
  status text not null default 'PENDING' check (status in ('PENDING', 'ACTIVE', 'SUSPENDED', 'DELETED')),
  verified boolean default false,
  claimed_by uuid references public.profiles(id),

  -- Subscription
  subscription_tier text not null default 'FREE' check (subscription_tier in ('FREE', 'BASIC', 'PREMIUM', 'FEATURED')),
  featured_until timestamp with time zone,
  stripe_customer_id text,
  stripe_subscription_id text,

  -- Metrics
  view_count integer default 0,
  review_count integer default 0,
  average_rating numeric(3, 2) default 0,

  -- Timestamps
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,

  -- Full-text search
  search_vector tsvector generated always as (
    setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(description, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(tagline, '')), 'C')
  ) stored
);

-- Indexes
create index businesses_slug_idx on businesses(slug);
create index businesses_status_verified_idx on businesses(status, verified);
create index businesses_subscription_tier_idx on businesses(subscription_tier, featured_until);
create index businesses_location_idx on businesses using gist(location);
create index businesses_search_idx on businesses using gin(search_vector);

alter table public.businesses enable row level security;

-- Reviews
create table public.reviews (
  id uuid default uuid_generate_v4() primary key,
  business_id uuid references businesses(id) on delete cascade not null,
  author_id uuid references public.profiles(id) on delete cascade not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  title text not null,
  content text not null,
  helpful_count integer default 0,
  verified boolean default false,
  featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index reviews_business_id_idx on reviews(business_id);
create index reviews_author_id_idx on reviews(author_id);

alter table public.reviews enable row level security;

-- Events
create table public.events (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique not null,
  description text not null,
  start_date timestamp with time zone not null,
  end_date timestamp with time zone,
  location text not null,
  image_url text,
  business_id uuid references businesses(id) on delete set null,
  published boolean default false,
  featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index events_start_date_idx on events(start_date, published);
create index events_slug_idx on events(slug);

alter table public.events enable row level security;

-- Additional tables: tags, deals, articles, favorites, subscribers, etc.
-- (See full schema in Section 4 of original plan)
```

### Supabase Storage Buckets

```typescript
// Create these buckets in Supabase Dashboard → Storage

1. business-logos (2MB limit, public)
2. business-covers (5MB limit, public)
3. business-galleries (5MB limit, public)
4. event-images (5MB limit, public)
5. article-images (5MB limit, public)
6. avatars (1MB limit, public)
```

---

## 5. Environment Variables

### Development (.env.local)

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Midtownbook
NEXT_PUBLIC_DOMAIN=midtownbook.com

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Mailgun
MAILGUN_API_KEY=your-mailgun-api-key
MAILGUN_DOMAIN=mg.midtownbook.com
MAILGUN_FROM_EMAIL=noreply@midtownbook.com
MAILGUN_FROM_NAME=Midtownbook

# GoHighLevel
GHL_API_KEY=your-ghl-api-key
GHL_LOCATION_ID=your-location-id

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-key

# Sentry (optional)
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

### Production (Vercel)

```bash
# Update these in Vercel Dashboard → Settings → Environment Variables

NEXT_PUBLIC_SITE_URL=https://midtownbook.com
NEXT_PUBLIC_SITE_NAME=Midtownbook
NEXT_PUBLIC_DOMAIN=midtownbook.com

# Use production keys for:
- Stripe (pk_live_..., sk_live_...)
- All other services (same as dev but with production credentials)
```

---

## 6. Third-Party Integrations

### Service Costs Summary

| Service | Free Tier | Production Cost |
|---------|-----------|-----------------|
| **Vercel** | ✅ Hobby plan | $20/month (Pro) |
| **Supabase** | ✅ 500MB DB, 1GB storage | $25/month (Pro) |
| **Mailgun** | ✅ 5,000 emails/month | $35/month |
| **Google Maps** | ✅ $200 credit/month | $100/month (after credit) |
| **Stripe** | ✅ Free (pay per transaction) | 2.9% + $0.30 per transaction |
| **Sentry** | ✅ 5,000 errors/month | $26/month |
| **GoHighLevel** | Existing account | Existing account |
| **Total** | **$0/month** | **~$206/month** + transaction fees |

---

## 7. Project Setup Instructions

### Step 1: Create Next.js Project

```bash
npx create-next-app@latest midtownbook \
  --typescript \
  --tailwind \
  --app \
  --eslint \
  --src-dir \
  --import-alias "@/*"

cd midtownbook
```

### Step 2: Install Dependencies

```bash
# Core dependencies
npm install \
  @supabase/supabase-js \
  @supabase/ssr \
  @supabase/auth-helpers-nextjs \
  @tanstack/react-query \
  zustand \
  zod \
  react-hook-form \
  @hookform/resolvers \
  stripe \
  @stripe/stripe-js \
  framer-motion \
  date-fns \
  lucide-react \
  @googlemaps/js-api-loader \
  mailgun.js \
  form-data

# Shadcn UI
npx shadcn-ui@latest init

# Install common components
npx shadcn-ui@latest add button input card badge dialog dropdown-menu form select textarea toast avatar separator tabs calendar popover
```

### Step 3: Configure Supabase

```typescript
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// lib/supabase/server.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {}
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {}
        },
      },
    }
  );
}
```

### Step 4: Initialize GitHub & Deploy to Vercel

```bash
# Initialize git
git init
git add .
git commit -m "Initial commit: Midtownbook setup"

# Create GitHub repo (via CLI or web)
gh repo create midtownbook --private --source=. --remote=origin
git push -u origin main

# Deploy to Vercel
# Option 1: Via dashboard (recommended)
# 1. Go to vercel.com
# 2. Import from GitHub
# 3. Select midtownbook repo
# 4. Add environment variables
# 5. Deploy

# Option 2: Via CLI
npm install -g vercel
vercel login
vercel
```

---

## 8. Framer Motion Animations

### Hero Section Example

```tsx
// components/landing/Hero.tsx
'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Search } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-accent-50 to-secondary-50 py-20 md:py-32">
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container relative mx-auto px-4">
        <motion.h1
          className="text-6xl md:text-8xl font-serif font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Midtownbook
        </motion.h1>
        {/* Add rest of hero content */}
      </div>
    </section>
  );
}
```

### Business Card with Hover Animation

```tsx
// components/business/BusinessCard.tsx
'use client';

import { motion } from 'framer-motion';

export function BusinessCard({ business }) {
  return (
    <motion.div
      className="bg-card rounded-2xl overflow-hidden shadow-md"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Card content */}
    </motion.div>
  );
}
```

---

## 9. SEO & Metadata Configuration

### Site Metadata

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://midtownbook.com'),
  title: {
    default: 'Midtownbook - Discover Local Midtown Businesses',
    template: '%s | Midtownbook',
  },
  description: 'Your comprehensive guide to local Midtown businesses.',
  openGraph: {
    type: 'website',
    url: 'https://midtownbook.com',
    siteName: 'Midtownbook',
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

### Sitemap

```typescript
// app/sitemap.ts
export default async function sitemap() {
  const baseUrl = 'https://midtownbook.com';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1,
    },
    // Add dynamic routes from database
  ];
}
```

---

## 10. Email Configuration

### Mailgun (Transactional)

```typescript
// lib/email/mailgun.ts
import Mailgun from 'mailgun.js';
import formData from 'form-data';

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY!,
});

export async function sendTransactionalEmail({
  to,
  subject,
  template,
  variables,
}) {
  return await mg.messages.create(process.env.MAILGUN_DOMAIN!, {
    from: `${process.env.MAILGUN_FROM_NAME} <${process.env.MAILGUN_FROM_EMAIL}>`,
    to: [to],
    subject,
    template,
    'h:X-Mailgun-Variables': JSON.stringify(variables),
  });
}
```

### GoHighLevel (Marketing)

```typescript
// lib/email/gohighlevel.ts
export async function syncToGoHighLevel(email: string, data: any) {
  const response = await fetch('https://rest.gohighlevel.com/v1/contacts/', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      locationId: process.env.GHL_LOCATION_ID,
      ...data,
    }),
  });
  return response.json();
}
```

---

## 11. Development Phases

### Phase 1: Foundation (3 weeks)
- Next.js setup with TypeScript
- Supabase initialization
- Authentication (Supabase Auth)
- Shadcn UI components
- Tailwind with custom colors
- Framer Motion integration
- GitHub & Vercel deployment

### Phase 2: Business Listings (3 weeks)
- Business CRUD operations
- Image upload (Supabase Storage)
- Google Maps integration
- Category/tag system
- Search functionality

### Phase 3: Discovery & Engagement (3 weeks)
- Advanced filters
- Interactive maps
- Review system
- Favorites
- Animated UI

### Phase 4: Content & Community (3 weeks)
- Events calendar
- Deals system
- Blog/articles
- Newsletter (GoHighLevel)
- Transactional emails (Mailgun)

### Phase 5: Monetization (3 weeks)
- Stripe integration
- Subscription tiers
- Featured listings
- Analytics dashboard

### Phase 6: Launch (3 weeks)
- Performance optimization
- SEO implementation
- Security audit
- Testing
- Production launch

**Total: ~18 weeks (4.5 months)**

---

## 12. Domain Configuration Checklist

### ✅ Vercel Domain Setup
- [ ] Verify midtownbook.com in Vercel Dashboard
- [ ] Add www.midtownbook.com with redirect
- [ ] Confirm SSL certificate is active
- [ ] Update environment variables with production domain

### ✅ Mailgun Setup
- [ ] Add mg.midtownbook.com domain in Mailgun
- [ ] Add DNS records to Vercel:
  - TXT for SPF
  - TXT for DKIM
  - CNAME for tracking
  - MX records
- [ ] Verify domain in Mailgun
- [ ] Test email sending

### ✅ Supabase Configuration
- [ ] Set Site URL: https://midtownbook.com
- [ ] Add redirect URLs:
  - https://midtownbook.com/auth/callback
  - https://midtownbook.com/auth/confirm
  - http://localhost:3000/auth/callback (dev)

### ✅ Stripe Webhook
- [ ] Add endpoint: https://midtownbook.com/api/webhooks/stripe
- [ ] Subscribe to events:
  - customer.subscription.*
  - invoice.payment_*

### ✅ Google Search Console
- [ ] Add property: https://midtownbook.com
- [ ] Verify via DNS
- [ ] Submit sitemap: https://midtownbook.com/sitemap.xml

---

## Project Structure

```
midtownbook/
├── .github/
│   └── workflows/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (public)/
│   │   │   ├── page.tsx
│   │   │   ├── businesses/
│   │   │   ├── categories/
│   │   │   ├── events/
│   │   │   └── blog/
│   │   ├── (dashboard)/
│   │   │   └── dashboard/
│   │   ├── (admin)/
│   │   │   └── admin/
│   │   ├── api/
│   │   │   ├── businesses/
│   │   │   ├── reviews/
│   │   │   └── webhooks/
│   │   ├── layout.tsx
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── ui/              # Shadcn components
│   │   ├── business/
│   │   ├── landing/
│   │   ├── layout/
│   │   └── map/
│   ├── lib/
│   │   ├── supabase/
│   │   ├── stripe.ts
│   │   ├── email/
│   │   └── google-maps.ts
│   ├── hooks/
│   ├── stores/
│   └── types/
├── .env.local
├── .env.example
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Quick Reference Commands

```bash
# Development
npm run dev

# Build
npm run build

# Deploy
git push origin main  # Auto-deploys to Vercel

# Add Shadcn component
npx shadcn-ui@latest add [component-name]
```

---

## Next Steps

1. **Set up accounts** for all services (Supabase, Stripe, Mailgun, Google Maps)
2. **Run project setup** commands (Section 7)
3. **Configure environment variables**
4. **Deploy to Vercel**
5. **Complete domain checklist** (Section 12)
6. **Start Phase 1 development**

---

**Last Updated**: 2025-01-12
**Version**: 1.0
**Status**: Ready for Implementation
