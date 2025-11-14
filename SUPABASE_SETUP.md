# Supabase Setup Guide

## ✅ What's Already Done

1. ✅ Supabase project created
2. ✅ Environment variables configured in `.env.local`
3. ✅ Supabase client utilities created:
   - `lib/supabase/client.ts` - Browser client
   - `lib/supabase/server.ts` - Server client
   - `lib/supabase/middleware.ts` - Auth middleware
4. ✅ Next.js middleware configured for route protection
5. ✅ All Supabase packages installed

## 🎯 Next Steps: Set Up Your Database

### Step 1: Go to Supabase SQL Editor

1. Open your Supabase project: https://supabase.com/dashboard/project/bwpvhwvgsebthapztiyp
2. Click on **"SQL Editor"** in the left sidebar
3. Click **"New Query"**

### Step 2: Copy and Run This SQL

Copy the ENTIRE SQL script below and paste it into the SQL Editor, then click **"RUN"**:

\`\`\`sql
-- ============================================
-- Midtownbook Database Schema
-- ============================================

-- Enable necessary extensions
create extension if not exists "uuid-ossp";
create extension if not exists "postgis";

-- ============================================
-- 1. PROFILES TABLE
-- ============================================

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

create policy "Users can insert own profile"
  on profiles for insert with check ( auth.uid() = id );

-- ============================================
-- 2. CATEGORIES TABLE
-- ============================================

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

create policy "Only admins can modify categories"
  on categories for all using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'ADMIN'
    )
  );

-- Insert default categories
insert into categories (name, slug, description, icon) values
  ('Restaurants', 'restaurants', 'Dining establishments and eateries', 'utensils'),
  ('Cafes & Coffee', 'cafes-coffee', 'Coffee shops and tea houses', 'coffee'),
  ('Retail', 'retail', 'Shopping and retail stores', 'shopping-bag'),
  ('Services', 'services', 'Professional and personal services', 'briefcase'),
  ('Health & Wellness', 'health-wellness', 'Healthcare and fitness', 'heart'),
  ('Entertainment', 'entertainment', 'Fun and recreational activities', 'film'),
  ('Arts & Culture', 'arts-culture', 'Galleries, museums, and cultural venues', 'palette'),
  ('Professional Services', 'professional-services', 'Legal, financial, and business services', 'building')
on conflict (slug) do nothing;

-- ============================================
-- 3. BUSINESSES TABLE
-- ============================================

create table public.businesses (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  name text not null,
  description text not null,
  tagline text,
  category_id uuid references categories(id),
  email text not null,
  phone text not null,
  website text,
  address text not null,
  city text not null default 'Midtown',
  state text not null default 'CA',
  zip_code text not null,
  location geography(Point, 4326),
  logo_url text,
  cover_image_url text,
  gallery_urls text[],
  status text not null default 'PENDING' check (status in ('PENDING', 'ACTIVE', 'SUSPENDED', 'DELETED')),
  verified boolean default false,
  claimed_by uuid references public.profiles(id),
  claimed_at timestamp with time zone,
  subscription_tier text not null default 'FREE' check (subscription_tier in ('FREE', 'BASIC', 'PREMIUM', 'FEATURED')),
  featured_until timestamp with time zone,
  stripe_customer_id text,
  stripe_subscription_id text,
  view_count integer default 0,
  review_count integer default 0,
  average_rating numeric(3, 2) default 0,
  hours jsonb default '{}'::jsonb,
  features text[] default array[]::text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  search_vector tsvector generated always as (
    setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(description, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(tagline, '')), 'C')
  ) stored
);

create index businesses_slug_idx on businesses(slug);
create index businesses_status_verified_idx on businesses(status, verified);
create index businesses_category_id_idx on businesses(category_id);
create index businesses_search_idx on businesses using gin(search_vector);

alter table public.businesses enable row level security;

create policy "Businesses are viewable by everyone"
  on businesses for select using ( status = 'ACTIVE' or auth.uid() = claimed_by );

create policy "Business owners can update their businesses"
  on businesses for update using ( auth.uid() = claimed_by );

create policy "Anyone can create a business"
  on businesses for insert with check ( true );

-- ============================================
-- 4. REVIEWS TABLE
-- ============================================

create table public.reviews (
  id uuid default uuid_generate_v4() primary key,
  business_id uuid references businesses(id) on delete cascade not null,
  author_id uuid references public.profiles(id) on delete cascade not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  title text not null,
  content text not null,
  helpful_count integer default 0,
  verified boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(business_id, author_id)
);

create index reviews_business_id_idx on reviews(business_id);
create index reviews_author_id_idx on reviews(author_id);

alter table public.reviews enable row level security;

create policy "Reviews are viewable by everyone"
  on reviews for select using ( true );

create policy "Users can create reviews"
  on reviews for insert with check ( auth.uid() = author_id );

create policy "Users can update their reviews"
  on reviews for update using ( auth.uid() = author_id );

-- ============================================
-- 5. EVENTS TABLE
-- ============================================

create table public.events (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique not null,
  description text not null,
  start_date timestamp with time zone not null,
  end_date timestamp with time zone,
  location text not null,
  address text,
  image_url text,
  business_id uuid references businesses(id) on delete set null,
  created_by uuid references public.profiles(id) on delete set null,
  published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index events_start_date_idx on events(start_date, published);
create index events_slug_idx on events(slug);

alter table public.events enable row level security;

create policy "Published events are viewable by everyone"
  on events for select using ( published = true or created_by = auth.uid() );

create policy "Event creators can manage their events"
  on events for all using ( auth.uid() = created_by );

-- ============================================
-- 6. FAVORITES TABLE
-- ============================================

create table public.favorites (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  business_id uuid references businesses(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, business_id)
);

create index favorites_user_id_idx on favorites(user_id);
create index favorites_business_id_idx on favorites(business_id);

alter table public.favorites enable row level security;

create policy "Users can view their favorites"
  on favorites for select using ( auth.uid() = user_id );

create policy "Users can add favorites"
  on favorites for insert with check ( auth.uid() = user_id );

create policy "Users can remove favorites"
  on favorites for delete using ( auth.uid() = user_id );

-- ============================================
-- 7. TRIGGERS & FUNCTIONS
-- ============================================

create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_profiles_updated_at before update on profiles
  for each row execute procedure update_updated_at_column();

create trigger update_businesses_updated_at before update on businesses
  for each row execute procedure update_updated_at_column();

create trigger update_reviews_updated_at before update on reviews
  for each row execute procedure update_updated_at_column();

create trigger update_events_updated_at before update on events
  for each row execute procedure update_updated_at_column();

-- Update business metrics when review changes
create or replace function update_business_metrics()
returns trigger as $$
begin
  update businesses
  set
    review_count = (select count(*) from reviews where business_id = coalesce(new.business_id, old.business_id)),
    average_rating = (select avg(rating) from reviews where business_id = coalesce(new.business_id, old.business_id))
  where id = coalesce(new.business_id, old.business_id);
  return coalesce(new, old);
end;
$$ language plpgsql;

create trigger update_business_metrics_on_review
after insert or update or delete on reviews
for each row execute procedure update_business_metrics();
\`\`\`

### Step 3: Configure Authentication Settings

1. In your Supabase dashboard, go to **Authentication** → **URL Configuration**
2. Add these URLs:
   - **Site URL**: `http://localhost:3000`
   - **Redirect URLs**: Add these one by one:
     - `http://localhost:3000/auth/callback`
     - `http://localhost:3000/auth/confirm`
     - `http://localhost:3000/**`

### Step 4: Set Up Storage Buckets

1. Go to **Storage** in your Supabase dashboard
2. Create these buckets (click "New bucket" for each):
   - `avatars` (Public)
   - `business-logos` (Public)
   - `business-covers` (Public)
   - `business-galleries` (Public)
   - `event-images` (Public)

3. For each bucket, set the following policies:
   - **SELECT**: Allow public access
   - **INSERT**: Allow authenticated users
   - **UPDATE**: Allow users to update their own files
   - **DELETE**: Allow users to delete their own files

## 🎉 That's It!

Once you've completed these steps, your database is ready! Let me know when you're done and I'll help you:
1. Test the database connection
2. Create auth actions (login, signup, logout)
3. Connect the auth pages to Supabase

## 📝 Quick Reference

- **Project URL**: https://bwpvhwvgsebthapztiyp.supabase.co
- **Database**: All tables created with RLS enabled
- **Auth**: Email/password enabled by default
- **Storage**: 6 public buckets for images

## 🔍 Verify It Worked

After running the SQL, check your Supabase dashboard:
1. Go to **Table Editor** - you should see 6 tables
2. Go to **Database** → **Tables** - verify all tables are listed
3. Check **Authentication** → **Users** - should be empty (ready for signups!)
