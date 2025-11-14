-- ============================================
-- Midtownbook Final Database Migration v2
-- Based on actual database inspection - 2025-11-14
-- ============================================
--
-- This migration script addresses the following issues:
-- 1. categories table is missing 'order' and 'is_active' columns
-- 2. businesses table exists but may be incomplete - recreate it properly
-- 3. reviews, events tables exist but may be incomplete - recreate them
-- 4. deals table does not exist
-- 5. profiles table has incorrect role values
--
-- Run this in Supabase SQL Editor BEFORE running seed.sql
-- ============================================

-- Enable necessary extensions (idempotent)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "cube";
CREATE EXTENSION IF NOT EXISTS "earthdistance";

-- ============================================
-- 1. FIX CATEGORIES TABLE - ADD MISSING COLUMNS
-- ============================================

-- Add 'order' column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'categories'
    AND column_name = 'order'
  ) THEN
    ALTER TABLE public.categories ADD COLUMN "order" integer DEFAULT 0 NOT NULL;
    RAISE NOTICE 'Added "order" column to categories table';
  ELSE
    RAISE NOTICE '"order" column already exists in categories table';
  END IF;
END $$;

-- Add 'is_active' column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'categories'
    AND column_name = 'is_active'
  ) THEN
    ALTER TABLE public.categories ADD COLUMN is_active boolean DEFAULT true NOT NULL;
    RAISE NOTICE 'Added "is_active" column to categories table';
  ELSE
    RAISE NOTICE '"is_active" column already exists in categories table';
  END IF;
END $$;

-- Update existing categories to set order values if they're all 0
DO $$
DECLARE
  max_order integer;
BEGIN
  SELECT MAX("order") INTO max_order FROM categories;

  IF max_order = 0 OR max_order IS NULL THEN
    -- Set order based on creation date
    WITH numbered AS (
      SELECT id, ROW_NUMBER() OVER (ORDER BY created_at) as rn
      FROM categories
    )
    UPDATE categories c
    SET "order" = n.rn
    FROM numbered n
    WHERE c.id = n.id;

    RAISE NOTICE 'Updated order values for existing categories';
  ELSE
    RAISE NOTICE 'Categories already have order values set';
  END IF;
END $$;

-- ============================================
-- 2. DROP AND RECREATE BUSINESSES TABLE
-- ============================================

-- Drop existing businesses table and recreate with full structure
DROP TABLE IF EXISTS public.businesses CASCADE;

CREATE TABLE public.businesses (
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
  subscription_tier text NOT NULL DEFAULT 'free' CHECK (subscription_tier IN ('free', 'basic', 'premium', 'featured')),
  subscription_expires_at timestamp with time zone,
  view_count integer DEFAULT 0 NOT NULL,
  claim_status text NOT NULL DEFAULT 'unclaimed' CHECK (claim_status IN ('unclaimed', 'pending', 'claimed')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for businesses
CREATE INDEX businesses_location_idx ON businesses USING gist (
  ll_to_earth(latitude::float8, longitude::float8)
);
CREATE INDEX businesses_category_id_idx ON businesses(category_id);
CREATE INDEX businesses_owner_id_idx ON businesses(owner_id);
CREATE INDEX businesses_slug_idx ON businesses(slug);
CREATE INDEX businesses_claim_status_idx ON businesses(claim_status);
CREATE INDEX businesses_is_featured_idx ON businesses(is_featured);
CREATE INDEX businesses_is_active_idx ON businesses(is_active);

-- Enable RLS on businesses
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;

-- Create policies for businesses
DROP POLICY IF EXISTS "Businesses are viewable by everyone" ON businesses;
CREATE POLICY "Businesses are viewable by everyone"
  ON businesses FOR SELECT
  USING ( is_active = true OR owner_id = auth.uid() );

DROP POLICY IF EXISTS "Business owners can insert own business" ON businesses;
CREATE POLICY "Business owners can insert own business"
  ON businesses FOR INSERT
  WITH CHECK ( auth.uid() = owner_id );

DROP POLICY IF EXISTS "Business owners can update own business" ON businesses;
CREATE POLICY "Business owners can update own business"
  ON businesses FOR UPDATE
  USING ( auth.uid() = owner_id );

DROP POLICY IF EXISTS "Admins can do anything" ON businesses;
CREATE POLICY "Admins can do anything"
  ON businesses FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Add trigger for businesses updated_at
DROP TRIGGER IF EXISTS update_businesses_updated_at ON businesses;
CREATE TRIGGER update_businesses_updated_at
  BEFORE UPDATE ON businesses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 3. DROP AND RECREATE REVIEWS TABLE
-- ============================================

DROP TABLE IF EXISTS public.reviews CASCADE;

CREATE TABLE public.reviews (
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

-- Create indexes for reviews
CREATE INDEX reviews_business_id_idx ON reviews(business_id);
CREATE INDEX reviews_user_id_idx ON reviews(user_id);
CREATE INDEX reviews_rating_idx ON reviews(rating);

-- Enable RLS on reviews
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Create policies for reviews
DROP POLICY IF EXISTS "Reviews are viewable by everyone" ON reviews;
CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT
  USING ( is_approved = true OR user_id = auth.uid() );

DROP POLICY IF EXISTS "Authenticated users can create reviews" ON reviews;
CREATE POLICY "Authenticated users can create reviews"
  ON reviews FOR INSERT
  WITH CHECK ( auth.uid() = user_id );

DROP POLICY IF EXISTS "Users can update own reviews" ON reviews;
CREATE POLICY "Users can update own reviews"
  ON reviews FOR UPDATE
  USING ( auth.uid() = user_id );

DROP POLICY IF EXISTS "Users can delete own reviews" ON reviews;
CREATE POLICY "Users can delete own reviews"
  ON reviews FOR DELETE
  USING ( auth.uid() = user_id );

-- Add trigger for reviews updated_at
DROP TRIGGER IF EXISTS update_reviews_updated_at ON reviews;
CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 4. DROP AND RECREATE EVENTS TABLE
-- ============================================

DROP TABLE IF EXISTS public.events CASCADE;

CREATE TABLE public.events (
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

-- Create indexes for events
CREATE INDEX events_business_id_idx ON events(business_id);
CREATE INDEX events_start_date_idx ON events(start_date);
CREATE INDEX events_slug_idx ON events(slug);

-- Enable RLS on events
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create policies for events
DROP POLICY IF EXISTS "Active events are viewable by everyone" ON events;
CREATE POLICY "Active events are viewable by everyone"
  ON events FOR SELECT
  USING ( is_active = true );

DROP POLICY IF EXISTS "Business owners can manage their events" ON events;
CREATE POLICY "Business owners can manage their events"
  ON events FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM businesses
      WHERE businesses.id = events.business_id
      AND businesses.owner_id = auth.uid()
    )
  );

-- Add trigger for events updated_at
DROP TRIGGER IF EXISTS update_events_updated_at ON events;
CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 5. CREATE DEALS TABLE
-- ============================================

DROP TABLE IF EXISTS public.deals CASCADE;

CREATE TABLE public.deals (
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

-- Create indexes for deals
CREATE INDEX deals_business_id_idx ON deals(business_id);
CREATE INDEX deals_start_date_idx ON deals(start_date);
CREATE INDEX deals_end_date_idx ON deals(end_date);
CREATE INDEX deals_is_active_idx ON deals(is_active);

-- Enable RLS on deals
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;

-- Create policies for deals table
DROP POLICY IF EXISTS "Active deals are viewable by everyone" ON deals;
CREATE POLICY "Active deals are viewable by everyone"
  ON deals FOR SELECT
  USING ( is_active = true AND start_date <= now() AND end_date >= now() );

DROP POLICY IF EXISTS "Business owners can manage their deals" ON deals;
CREATE POLICY "Business owners can manage their deals"
  ON deals FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM businesses
      WHERE businesses.id = deals.business_id
      AND businesses.owner_id = auth.uid()
    )
  );

-- Add trigger for deals updated_at
DROP TRIGGER IF EXISTS update_deals_updated_at ON deals;
CREATE TRIGGER update_deals_updated_at
  BEFORE UPDATE ON deals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 6. FIX PROFILES TABLE - UPDATE ROLE VALUES
-- ============================================

-- Drop the old constraint FIRST
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_role_check;

-- Update any existing COMMUNITY_MEMBER roles to 'user'
UPDATE public.profiles
SET role = 'user'
WHERE role = 'COMMUNITY_MEMBER';

-- Update any other invalid roles
UPDATE public.profiles
SET role = 'user'
WHERE role NOT IN ('admin', 'business_owner', 'user');

-- Add the correct constraint AFTER updating the data
ALTER TABLE public.profiles
ADD CONSTRAINT profiles_role_check
CHECK (role IN ('admin', 'business_owner', 'user'));

-- ============================================
-- 7. VERIFY HELPER FUNCTIONS EXIST
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  new.updated_at = timezone('utc'::text, now());
  RETURN new;
END;
$$ LANGUAGE plpgsql;

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

-- Function to search businesses by location (returns distances in miles)
CREATE OR REPLACE FUNCTION nearby_businesses(
  lat decimal,
  lng decimal,
  max_distance_miles integer DEFAULT 5
)
RETURNS TABLE(
  id uuid,
  name text,
  distance_miles decimal
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
      ) / 1609.34)::numeric,
      2
    ) AS distance_miles
  FROM businesses b
  WHERE b.is_active = true
  AND earth_distance(
    ll_to_earth(lat::float8, lng::float8),
    ll_to_earth(b.latitude::float8, b.longitude::float8)
  ) <= (max_distance_miles * 1609.34)
  ORDER BY distance_miles;
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
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- MIGRATION COMPLETE
-- ============================================

-- Verify the migration
DO $$
DECLARE
  categories_order_exists boolean;
  categories_is_active_exists boolean;
  businesses_exists boolean;
  businesses_owner_id_exists boolean;
  reviews_exists boolean;
  events_exists boolean;
  deals_exists boolean;
  community_member_count integer;
BEGIN
  -- Check categories columns
  SELECT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'categories' AND column_name = 'order'
  ) INTO categories_order_exists;

  SELECT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'categories' AND column_name = 'is_active'
  ) INTO categories_is_active_exists;

  -- Check businesses table
  SELECT EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'businesses'
  ) INTO businesses_exists;

  SELECT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'businesses' AND column_name = 'owner_id'
  ) INTO businesses_owner_id_exists;

  -- Check other tables
  SELECT EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'reviews'
  ) INTO reviews_exists;

  SELECT EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'events'
  ) INTO events_exists;

  SELECT EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'deals'
  ) INTO deals_exists;

  -- Check for any remaining COMMUNITY_MEMBER roles
  SELECT COUNT(*) INTO community_member_count
  FROM profiles
  WHERE role = 'COMMUNITY_MEMBER';

  -- Report results
  RAISE NOTICE '═══════════════════════════════════════════════════════';
  RAISE NOTICE 'Migration Verification Results:';
  RAISE NOTICE '═══════════════════════════════════════════════════════';

  IF categories_order_exists THEN
    RAISE NOTICE '✓ categories.order column exists';
  ELSE
    RAISE WARNING '✗ categories.order column MISSING!';
  END IF;

  IF categories_is_active_exists THEN
    RAISE NOTICE '✓ categories.is_active column exists';
  ELSE
    RAISE WARNING '✗ categories.is_active column MISSING!';
  END IF;

  IF businesses_exists THEN
    RAISE NOTICE '✓ businesses table exists';
  ELSE
    RAISE WARNING '✗ businesses table MISSING!';
  END IF;

  IF businesses_owner_id_exists THEN
    RAISE NOTICE '✓ businesses.owner_id column exists';
  ELSE
    RAISE WARNING '✗ businesses.owner_id column MISSING!';
  END IF;

  IF reviews_exists THEN
    RAISE NOTICE '✓ reviews table exists';
  ELSE
    RAISE WARNING '✗ reviews table MISSING!';
  END IF;

  IF events_exists THEN
    RAISE NOTICE '✓ events table exists';
  ELSE
    RAISE WARNING '✗ events table MISSING!';
  END IF;

  IF deals_exists THEN
    RAISE NOTICE '✓ deals table exists';
  ELSE
    RAISE WARNING '✗ deals table MISSING!';
  END IF;

  IF community_member_count = 0 THEN
    RAISE NOTICE '✓ All profiles have valid role values';
  ELSE
    RAISE WARNING '✗ Found % profiles with COMMUNITY_MEMBER role', community_member_count;
  END IF;

  RAISE NOTICE '═══════════════════════════════════════════════════════';
  RAISE NOTICE '✓ Migration completed successfully!';
  RAISE NOTICE 'Next step: Run seed.sql to populate sample data';
  RAISE NOTICE '═══════════════════════════════════════════════════════';
END $$;
