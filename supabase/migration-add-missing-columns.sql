-- ============================================
-- Midtownbook Database Migration - Add Missing Columns
-- Run this to add missing columns to existing tables
-- ============================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- ============================================
-- 1. ADD MISSING COLUMNS TO CATEGORIES
-- ============================================

-- Add 'order' column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'categories' AND column_name = 'order'
  ) THEN
    ALTER TABLE categories ADD COLUMN "order" integer DEFAULT 0 NOT NULL;
  END IF;
END $$;

-- Add 'is_active' column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'categories' AND column_name = 'is_active'
  ) THEN
    ALTER TABLE categories ADD COLUMN is_active boolean DEFAULT true NOT NULL;
  END IF;
END $$;

-- ============================================
-- 2. CREATE CATEGORIES TABLE IF NOT EXISTS
-- ============================================

CREATE TABLE IF NOT EXISTS public.categories (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  icon text,
  parent_id uuid REFERENCES categories(id),
  "order" integer DEFAULT 0 NOT NULL,
  is_active boolean DEFAULT true NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Recreate policies
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
-- 3. CREATE BUSINESSES TABLE IF NOT EXISTS
-- ============================================

CREATE TABLE IF NOT EXISTS public.businesses (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  owner_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  category_id uuid REFERENCES categories(id) NOT NULL,
  subcategory text,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  zip_code text NOT NULL,
  latitude decimal(10, 8) NOT NULL,
  longitude decimal(11, 8) NOT NULL,
  phone text,
  email text,
  website text,
  hours jsonb,
  logo_url text,
  cover_image_url text,
  images text[],
  amenities text[],
  price_range integer CHECK (price_range >= 1 AND price_range <= 4),
  is_verified boolean DEFAULT false NOT NULL,
  is_featured boolean DEFAULT false NOT NULL,
  is_active boolean DEFAULT true NOT NULL,
  subscription_tier text DEFAULT 'free' NOT NULL CHECK (subscription_tier IN ('free', 'basic', 'premium', 'featured')),
  subscription_expires_at timestamp with time zone,
  view_count integer DEFAULT 0 NOT NULL,
  claim_status text DEFAULT 'unclaimed' NOT NULL CHECK (claim_status IN ('unclaimed', 'pending', 'claimed')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS businesses_location_idx ON businesses USING gist (
  ll_to_earth(latitude::float8, longitude::float8)
);
CREATE INDEX IF NOT EXISTS businesses_category_id_idx ON businesses(category_id);
CREATE INDEX IF NOT EXISTS businesses_owner_id_idx ON businesses(owner_id);
CREATE INDEX IF NOT EXISTS businesses_slug_idx ON businesses(slug);
CREATE INDEX IF NOT EXISTS businesses_claim_status_idx ON businesses(claim_status);

-- Enable RLS
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;

-- Policies
DO $$ BEGIN
  DROP POLICY IF EXISTS "Businesses are viewable by everyone" ON businesses;
  CREATE POLICY "Businesses are viewable by everyone"
    ON businesses FOR SELECT USING ( is_active = true OR owner_id = auth.uid() );
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Business owners can insert own business" ON businesses;
  CREATE POLICY "Business owners can insert own business"
    ON businesses FOR INSERT WITH CHECK ( auth.uid() = owner_id );
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Business owners can update own business" ON businesses;
  CREATE POLICY "Business owners can update own business"
    ON businesses FOR UPDATE USING ( auth.uid() = owner_id );
EXCEPTION WHEN duplicate_object THEN null;
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
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- ============================================
-- 4. CREATE REVIEWS TABLE IF NOT EXISTS
-- ============================================

CREATE TABLE IF NOT EXISTS public.reviews (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  business_id uuid REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title text,
  content text NOT NULL,
  images text[],
  is_verified_purchase boolean DEFAULT false NOT NULL,
  helpful_count integer DEFAULT 0 NOT NULL,
  is_flagged boolean DEFAULT false NOT NULL,
  is_approved boolean DEFAULT true NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(business_id, user_id)
);

CREATE INDEX IF NOT EXISTS reviews_business_id_idx ON reviews(business_id);
CREATE INDEX IF NOT EXISTS reviews_user_id_idx ON reviews(user_id);
CREATE INDEX IF NOT EXISTS reviews_rating_idx ON reviews(rating);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Reviews are viewable by everyone" ON reviews;
  CREATE POLICY "Reviews are viewable by everyone"
    ON reviews FOR SELECT USING ( is_approved = true OR user_id = auth.uid() );
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Authenticated users can create reviews" ON reviews;
  CREATE POLICY "Authenticated users can create reviews"
    ON reviews FOR INSERT WITH CHECK ( auth.uid() = user_id );
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can update own reviews" ON reviews;
  CREATE POLICY "Users can update own reviews"
    ON reviews FOR UPDATE USING ( auth.uid() = user_id );
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can delete own reviews" ON reviews;
  CREATE POLICY "Users can delete own reviews"
    ON reviews FOR DELETE USING ( auth.uid() = user_id );
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- ============================================
-- 5. CREATE EVENTS TABLE IF NOT EXISTS
-- ============================================

CREATE TABLE IF NOT EXISTS public.events (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  business_id uuid REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  start_date timestamp with time zone NOT NULL,
  end_date timestamp with time zone NOT NULL,
  location text,
  is_online boolean DEFAULT false NOT NULL,
  event_url text,
  image_url text,
  price decimal(10, 2),
  max_attendees integer,
  is_active boolean DEFAULT true NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS events_business_id_idx ON events(business_id);
CREATE INDEX IF NOT EXISTS events_start_date_idx ON events(start_date);
CREATE INDEX IF NOT EXISTS events_slug_idx ON events(slug);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Active events are viewable by everyone" ON events;
  CREATE POLICY "Active events are viewable by everyone"
    ON events FOR SELECT USING ( is_active = true );
EXCEPTION WHEN duplicate_object THEN null;
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
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- ============================================
-- 6. CREATE DEALS TABLE IF NOT EXISTS
-- ============================================

CREATE TABLE IF NOT EXISTS public.deals (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  business_id uuid REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  discount_type text NOT NULL CHECK (discount_type IN ('percentage', 'fixed', 'bogo', 'other')),
  discount_value decimal(10, 2),
  code text,
  terms text,
  start_date timestamp with time zone NOT NULL,
  end_date timestamp with time zone NOT NULL,
  is_active boolean DEFAULT true NOT NULL,
  redemption_count integer DEFAULT 0 NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS deals_business_id_idx ON deals(business_id);
CREATE INDEX IF NOT EXISTS deals_start_date_idx ON deals(start_date);
CREATE INDEX IF NOT EXISTS deals_end_date_idx ON deals(end_date);

ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Active deals are viewable by everyone" ON deals;
  CREATE POLICY "Active deals are viewable by everyone"
    ON deals FOR SELECT USING ( is_active = true AND start_date <= now() AND end_date >= now() );
EXCEPTION WHEN duplicate_object THEN null;
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
EXCEPTION WHEN duplicate_object THEN null;
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

-- Recreate triggers
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

-- Function to calculate average rating
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

-- Function to handle new user creation
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
-- MIGRATION COMPLETE
-- ============================================
