-- ============================================
-- Midtownbook Final Database Migration
-- Based on actual database inspection - 2025-11-14
-- ============================================
--
-- This migration script addresses the following issues:
-- 1. categories table is missing 'order' and 'is_active' columns
-- 2. deals table does not exist
-- 3. profiles table has incorrect role values (COMMUNITY_MEMBER instead of user/admin/business_owner)
--
-- Run this in Supabase SQL Editor BEFORE running seed.sql
-- ============================================

-- Enable necessary extensions (idempotent)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

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
-- 2. CREATE DEALS TABLE
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

-- Create indexes for deals
CREATE INDEX IF NOT EXISTS deals_business_id_idx ON deals(business_id);
CREATE INDEX IF NOT EXISTS deals_start_date_idx ON deals(start_date);
CREATE INDEX IF NOT EXISTS deals_end_date_idx ON deals(end_date);
CREATE INDEX IF NOT EXISTS deals_is_active_idx ON deals(is_active);

-- Enable RLS on deals
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;

-- Create policies for deals table
DO $$ BEGIN
  DROP POLICY IF EXISTS "Active deals are viewable by everyone" ON deals;
  CREATE POLICY "Active deals are viewable by everyone"
    ON deals FOR SELECT
    USING ( is_active = true AND start_date <= now() AND end_date >= now() );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
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
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Add trigger for deals updated_at
DROP TRIGGER IF EXISTS update_deals_updated_at ON deals;
CREATE TRIGGER update_deals_updated_at
  BEFORE UPDATE ON deals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 3. FIX PROFILES TABLE - UPDATE ROLE VALUES
-- ============================================

-- First, update any existing COMMUNITY_MEMBER roles to 'user'
UPDATE public.profiles
SET role = 'user'
WHERE role = 'COMMUNITY_MEMBER';

-- Drop the old constraint if it exists
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_role_check;

-- Add the correct constraint
ALTER TABLE public.profiles
ADD CONSTRAINT profiles_role_check
CHECK (role IN ('admin', 'business_owner', 'user'));

-- ============================================
-- 4. VERIFY BUSINESSES TABLE STRUCTURE
-- ============================================

-- Ensure businesses table has all required indexes
CREATE INDEX IF NOT EXISTS businesses_location_idx ON businesses USING gist (
  ll_to_earth(latitude::float8, longitude::float8)
);
CREATE INDEX IF NOT EXISTS businesses_category_id_idx ON businesses(category_id);
CREATE INDEX IF NOT EXISTS businesses_owner_id_idx ON businesses(owner_id);
CREATE INDEX IF NOT EXISTS businesses_slug_idx ON businesses(slug);
CREATE INDEX IF NOT EXISTS businesses_claim_status_idx ON businesses(claim_status);
CREATE INDEX IF NOT EXISTS businesses_is_featured_idx ON businesses(is_featured);
CREATE INDEX IF NOT EXISTS businesses_is_active_idx ON businesses(is_active);

-- ============================================
-- 5. VERIFY HELPER FUNCTIONS EXIST
-- ============================================

-- Function to update updated_at timestamp (should already exist)
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
-- MIGRATION COMPLETE
-- ============================================

-- Verify the migration
DO $$
DECLARE
  categories_order_exists boolean;
  categories_is_active_exists boolean;
  deals_exists boolean;
  community_member_count integer;
BEGIN
  -- Check categories columns
  SELECT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'categories' AND column_name = 'order'
  ) INTO categories_order_exists;

  SELECT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'categories' AND column_name = 'is_active'
  ) INTO categories_is_active_exists;

  -- Check deals table
  SELECT EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_name = 'deals'
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
