-- ============================================
-- Midtownbook Database Schema
-- Run this entire script in Supabase SQL Editor
-- ============================================

-- Enable necessary extensions
create extension if not exists "uuid-ossp";
create extension if not exists "postgis";

-- ============================================
-- 1. PROFILES TABLE (User Data)
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

-- Enable RLS
alter table public.profiles enable row level security;

-- RLS Policies
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

-- Continue in next message due to length...
