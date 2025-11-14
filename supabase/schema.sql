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
  role text not null default 'user' check (role in ('admin', 'business_owner', 'user')),
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
  "order" integer default 0 not null,
  is_active boolean default true not null,
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
      and profiles.role = 'admin'
    )
  );

-- Insert default categories
insert into categories (name, slug, description, icon, "order") values
  ('Restaurants', 'restaurants', 'Dining establishments and eateries', 'utensils', 1),
  ('Cafes & Coffee', 'cafes-coffee', 'Coffee shops and tea houses', 'coffee', 2),
  ('Retail', 'retail', 'Shopping and retail stores', 'shopping-bag', 3),
  ('Services', 'services', 'Professional and personal services', 'briefcase', 4),
  ('Health & Wellness', 'health-wellness', 'Healthcare and fitness', 'heart', 5),
  ('Entertainment', 'entertainment', 'Fun and recreational activities', 'film', 6),
  ('Arts & Culture', 'arts-culture', 'Galleries, museums, and cultural venues', 'palette', 7),
  ('Professional Services', 'professional-services', 'Legal, financial, and business services', 'building', 8)
on conflict (slug) do nothing;

-- ============================================
-- 3. BUSINESSES TABLE
-- ============================================

create table public.businesses (
  id uuid default uuid_generate_v4() primary key,
  owner_id uuid references profiles(id) on delete cascade not null,
  name text not null,
  slug text unique not null,
  description text,
  category_id uuid references categories(id) not null,
  subcategory text,
  address text not null,
  city text not null,
  state text not null,
  zip_code text not null,
  latitude decimal(10, 8) not null,
  longitude decimal(11, 8) not null,
  phone text,
  email text,
  website text,
  hours jsonb,
  logo_url text,
  cover_image_url text,
  images text[],
  amenities text[],
  price_range integer check (price_range >= 1 and price_range <= 4),
  is_verified boolean default false not null,
  is_featured boolean default false not null,
  is_active boolean default true not null,
  subscription_tier text not null default 'free' check (subscription_tier in ('free', 'basic', 'premium', 'featured')),
  subscription_expires_at timestamp with time zone,
  view_count integer default 0 not null,
  claim_status text not null default 'unclaimed' check (claim_status in ('unclaimed', 'pending', 'claimed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create spatial index for location-based queries
create index businesses_location_idx on businesses using gist (
  ll_to_earth(latitude::float8, longitude::float8)
);

-- Other indexes
create index businesses_category_id_idx on businesses(category_id);
create index businesses_owner_id_idx on businesses(owner_id);
create index businesses_slug_idx on businesses(slug);
create index businesses_claim_status_idx on businesses(claim_status);

alter table public.businesses enable row level security;

-- RLS Policies for businesses
create policy "Businesses are viewable by everyone"
  on businesses for select using ( is_active = true or owner_id = auth.uid() );

create policy "Business owners can insert own business"
  on businesses for insert with check ( auth.uid() = owner_id );

create policy "Business owners can update own business"
  on businesses for update using ( auth.uid() = owner_id );

create policy "Admins can do anything"
  on businesses for all using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- ============================================
-- 4. REVIEWS TABLE
-- ============================================

create table public.reviews (
  id uuid default uuid_generate_v4() primary key,
  business_id uuid references businesses(id) on delete cascade not null,
  user_id uuid references profiles(id) on delete cascade not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  title text,
  content text not null,
  images text[],
  is_verified_purchase boolean default false not null,
  helpful_count integer default 0 not null,
  is_flagged boolean default false not null,
  is_approved boolean default true not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(business_id, user_id)
);

create index reviews_business_id_idx on reviews(business_id);
create index reviews_user_id_idx on reviews(user_id);
create index reviews_rating_idx on reviews(rating);

alter table public.reviews enable row level security;

create policy "Reviews are viewable by everyone"
  on reviews for select using ( is_approved = true or user_id = auth.uid() );

create policy "Authenticated users can create reviews"
  on reviews for insert with check ( auth.uid() = user_id );

create policy "Users can update own reviews"
  on reviews for update using ( auth.uid() = user_id );

create policy "Users can delete own reviews"
  on reviews for delete using ( auth.uid() = user_id );

-- ============================================
-- 5. EVENTS TABLE
-- ============================================

create table public.events (
  id uuid default uuid_generate_v4() primary key,
  business_id uuid references businesses(id) on delete cascade not null,
  title text not null,
  slug text unique not null,
  description text not null,
  start_date timestamp with time zone not null,
  end_date timestamp with time zone not null,
  location text,
  is_online boolean default false not null,
  event_url text,
  image_url text,
  price decimal(10, 2),
  max_attendees integer,
  is_active boolean default true not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index events_business_id_idx on events(business_id);
create index events_start_date_idx on events(start_date);
create index events_slug_idx on events(slug);

alter table public.events enable row level security;

create policy "Active events are viewable by everyone"
  on events for select using ( is_active = true );

create policy "Business owners can manage their events"
  on events for all using (
    exists (
      select 1 from businesses
      where businesses.id = events.business_id
      and businesses.owner_id = auth.uid()
    )
  );

-- ============================================
-- 6. DEALS TABLE
-- ============================================

create table public.deals (
  id uuid default uuid_generate_v4() primary key,
  business_id uuid references businesses(id) on delete cascade not null,
  title text not null,
  description text not null,
  discount_type text not null check (discount_type in ('percentage', 'fixed', 'bogo', 'other')),
  discount_value decimal(10, 2),
  code text,
  terms text,
  start_date timestamp with time zone not null,
  end_date timestamp with time zone not null,
  is_active boolean default true not null,
  redemption_count integer default 0 not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index deals_business_id_idx on deals(business_id);
create index deals_start_date_idx on deals(start_date);
create index deals_end_date_idx on deals(end_date);

alter table public.deals enable row level security;

create policy "Active deals are viewable by everyone"
  on deals for select using ( is_active = true and start_date <= now() and end_date >= now() );

create policy "Business owners can manage their deals"
  on deals for all using (
    exists (
      select 1 from businesses
      where businesses.id = deals.business_id
      and businesses.owner_id = auth.uid()
    )
  );

-- ============================================
-- 7. FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Triggers for updated_at
create trigger update_profiles_updated_at before update on profiles
  for each row execute function update_updated_at_column();

create trigger update_businesses_updated_at before update on businesses
  for each row execute function update_updated_at_column();

create trigger update_reviews_updated_at before update on reviews
  for each row execute function update_updated_at_column();

create trigger update_events_updated_at before update on events
  for each row execute function update_updated_at_column();

create trigger update_deals_updated_at before update on deals
  for each row execute function update_updated_at_column();

-- Function to calculate average rating for a business
create or replace function get_business_rating(business_uuid uuid)
returns table(average_rating decimal, total_reviews bigint) as $$
begin
  return query
  select
    coalesce(round(avg(rating)::numeric, 1), 0) as average_rating,
    count(*) as total_reviews
  from reviews
  where business_id = business_uuid
  and is_approved = true;
end;
$$ language plpgsql;

-- Function to search businesses by location
create or replace function nearby_businesses(
  lat decimal,
  lng decimal,
  distance_km integer default 5
)
returns table(
  id uuid,
  name text,
  distance_km decimal
) as $$
begin
  return query
  select
    b.id,
    b.name,
    round(
      (earth_distance(
        ll_to_earth(lat::float8, lng::float8),
        ll_to_earth(b.latitude::float8, b.longitude::float8)
      ) / 1000)::numeric,
      2
    ) as distance_km
  from businesses b
  where b.is_active = true
  and earth_distance(
    ll_to_earth(lat::float8, lng::float8),
    ll_to_earth(b.latitude::float8, b.longitude::float8)
  ) <= (distance_km * 1000)
  order by distance_km;
end;
$$ language plpgsql;

-- ============================================
-- 8. HANDLE NEW USER FUNCTION
-- ============================================

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================
-- SCHEMA SETUP COMPLETE
-- ============================================
-- Next step: Run seed.sql to populate with sample data
