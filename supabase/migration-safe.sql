-- ============================================
-- Midtownbook Database Migration (Safe)
-- Run this script if schema.sql fails due to existing tables
-- ============================================

-- Enable necessary extensions
create extension if not exists "uuid-ossp";
create extension if not exists "postgis";

-- ============================================
-- 1. PROFILES TABLE (Skip if exists)
-- ============================================

DO $$ BEGIN
  CREATE TABLE IF NOT EXISTS public.profiles (
    id uuid references auth.users on delete cascade primary key,
    email text unique not null,
    full_name text,
    avatar_url text,
    role text not null default 'user' check (role in ('admin', 'business_owner', 'user')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
  );
END $$;

-- Enable RLS
alter table public.profiles enable row level security;

-- Drop existing policies if they exist, then recreate
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
  CREATE POLICY "Public profiles are viewable by everyone"
    ON profiles FOR SELECT USING ( true );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
  CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE USING ( auth.uid() = id );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
  CREATE POLICY "Users can insert own profile"
    ON profiles FOR INSERT WITH CHECK ( auth.uid() = id );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- ============================================
-- 2. CATEGORIES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.categories (
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

DO $$ BEGIN
  DROP POLICY IF EXISTS "Categories are viewable by everyone" ON categories;
  CREATE POLICY "Categories are viewable by everyone"
    ON categories FOR SELECT USING ( true );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Only admins can modify categories" ON categories;
  CREATE POLICY "Only admins can modify categories"
    ON categories FOR ALL USING (
      EXISTS (
        SELECT 1 FROM profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
      )
    );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Insert default categories (only if they don't exist)
INSERT INTO categories (name, slug, description, icon, "order") VALUES
  ('Restaurants', 'restaurants', 'Dining establishments and eateries', 'utensils', 1),
  ('Cafes & Coffee', 'cafes-coffee', 'Coffee shops and tea houses', 'coffee', 2),
  ('Retail', 'retail', 'Shopping and retail stores', 'shopping-bag', 3),
  ('Services', 'services', 'Professional and personal services', 'briefcase', 4),
  ('Health & Wellness', 'health-wellness', 'Healthcare and fitness', 'heart', 5),
  ('Entertainment', 'entertainment', 'Fun and recreational activities', 'film', 6),
  ('Arts & Culture', 'arts-culture', 'Galleries, museums, and cultural venues', 'palette', 7),
  ('Professional Services', 'professional-services', 'Legal, financial, and business services', 'building', 8)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- 3. BUSINESSES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.businesses (
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

-- Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS businesses_location_idx ON businesses USING gist (
  ll_to_earth(latitude::float8, longitude::float8)
);
CREATE INDEX IF NOT EXISTS businesses_category_id_idx ON businesses(category_id);
CREATE INDEX IF NOT EXISTS businesses_owner_id_idx ON businesses(owner_id);
CREATE INDEX IF NOT EXISTS businesses_slug_idx ON businesses(slug);
CREATE INDEX IF NOT EXISTS businesses_claim_status_idx ON businesses(claim_status);

alter table public.businesses enable row level security;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Businesses are viewable by everyone" ON businesses;
  CREATE POLICY "Businesses are viewable by everyone"
    ON businesses FOR SELECT USING ( is_active = true OR owner_id = auth.uid() );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Business owners can insert own business" ON businesses;
  CREATE POLICY "Business owners can insert own business"
    ON businesses FOR INSERT WITH CHECK ( auth.uid() = owner_id );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Business owners can update own business" ON businesses;
  CREATE POLICY "Business owners can update own business"
    ON businesses FOR UPDATE USING ( auth.uid() = owner_id );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Admins can do anything" ON businesses;
  CREATE POLICY "Admins can do anything"
    ON businesses FOR ALL USING (
      EXISTS (
        SELECT 1 FROM profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
      )
    );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- ============================================
-- 4. REVIEWS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.reviews (
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

CREATE INDEX IF NOT EXISTS reviews_business_id_idx ON reviews(business_id);
CREATE INDEX IF NOT EXISTS reviews_user_id_idx ON reviews(user_id);
CREATE INDEX IF NOT EXISTS reviews_rating_idx ON reviews(rating);

alter table public.reviews enable row level security;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Reviews are viewable by everyone" ON reviews;
  CREATE POLICY "Reviews are viewable by everyone"
    ON reviews FOR SELECT USING ( is_approved = true OR user_id = auth.uid() );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Authenticated users can create reviews" ON reviews;
  CREATE POLICY "Authenticated users can create reviews"
    ON reviews FOR INSERT WITH CHECK ( auth.uid() = user_id );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can update own reviews" ON reviews;
  CREATE POLICY "Users can update own reviews"
    ON reviews FOR UPDATE USING ( auth.uid() = user_id );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can delete own reviews" ON reviews;
  CREATE POLICY "Users can delete own reviews"
    ON reviews FOR DELETE USING ( auth.uid() = user_id );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- ============================================
-- 5. EVENTS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.events (
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

CREATE INDEX IF NOT EXISTS events_business_id_idx ON events(business_id);
CREATE INDEX IF NOT EXISTS events_start_date_idx ON events(start_date);
CREATE INDEX IF NOT EXISTS events_slug_idx ON events(slug);

alter table public.events enable row level security;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Active events are viewable by everyone" ON events;
  CREATE POLICY "Active events are viewable by everyone"
    ON events FOR SELECT USING ( is_active = true );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Business owners can manage their events" ON events;
  CREATE POLICY "Business owners can manage their events"
    ON events FOR ALL USING (
      EXISTS (
        SELECT 1 FROM businesses
        WHERE businesses.id = events.business_id
        AND businesses.owner_id = auth.uid()
      )
    );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- ============================================
-- 6. DEALS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.deals (
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

CREATE INDEX IF NOT EXISTS deals_business_id_idx ON deals(business_id);
CREATE INDEX IF NOT EXISTS deals_start_date_idx ON deals(start_date);
CREATE INDEX IF NOT EXISTS deals_end_date_idx ON deals(end_date);

alter table public.deals enable row level security;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Active deals are viewable by everyone" ON deals;
  CREATE POLICY "Active deals are viewable by everyone"
    ON deals FOR SELECT USING ( is_active = true AND start_date <= now() AND end_date >= now() );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Business owners can manage their deals" ON deals;
  CREATE POLICY "Business owners can manage their deals"
    ON deals FOR ALL USING (
      EXISTS (
        SELECT 1 FROM businesses
        WHERE businesses.id = deals.business_id
        AND businesses.owner_id = auth.uid()
      )
    );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- ============================================
-- 7. FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  new.updated_at = timezone('utc'::text, now());
  RETURN new;
END;
$$ LANGUAGE plpgsql;

-- Drop triggers if they exist, then recreate
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_businesses_updated_at ON businesses;
CREATE TRIGGER update_businesses_updated_at BEFORE UPDATE ON businesses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_reviews_updated_at ON reviews;
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_events_updated_at ON events;
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_deals_updated_at ON deals;
CREATE TRIGGER update_deals_updated_at BEFORE UPDATE ON deals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate average rating for a business
CREATE OR REPLACE FUNCTION get_business_rating(business_uuid uuid)
RETURNS TABLE(average_rating decimal, total_reviews bigint) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COALESCE(ROUND(AVG(rating)::numeric, 1), 0) AS average_rating,
    COUNT(*) AS total_reviews
  FROM reviews
  WHERE business_id = business_uuid
  AND is_approved = true;
END;
$$ LANGUAGE plpgsql;

-- Function to search businesses by location
CREATE OR REPLACE FUNCTION nearby_businesses(
  lat decimal,
  lng decimal,
  distance_km integer DEFAULT 5
)
RETURNS TABLE(
  id uuid,
  name text,
  distance_km decimal
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    b.id,
    b.name,
    ROUND(
      (earth_distance(
        ll_to_earth(lat::float8, lng::float8),
        ll_to_earth(b.latitude::float8, b.longitude::float8)
      ) / 1000)::numeric,
      2
    ) AS distance_km
  FROM businesses b
  WHERE b.is_active = true
  AND earth_distance(
    ll_to_earth(lat::float8, lng::float8),
    ll_to_earth(b.latitude::float8, b.longitude::float8)
  ) <= (distance_km * 1000)
  ORDER BY distance_km;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 8. HANDLE NEW USER FUNCTION
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- SCHEMA SETUP COMPLETE
-- ============================================
