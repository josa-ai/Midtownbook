# Database Inspection Report

**Date**: 2025-11-14
**Database**: Supabase - bwpvhwvgsebthapztiyp.supabase.co

## Summary

| Table | Status | Rows | Notes |
|-------|--------|------|-------|
| profiles | ✅ EXISTS | 1+ | Fully functional |
| categories | ✅ EXISTS | 1+ | **MISSING COLUMNS: `order`, `is_active`** |
| businesses | ✅ EXISTS | 0 | Empty table - needs seed data |
| reviews | ✅ EXISTS | 0 | Empty table - needs seed data |
| events | ✅ EXISTS | 0 | Empty table - needs seed data |
| deals | ❌ DOES NOT EXIST | - | Table needs to be created |

## Detailed Findings

### 1. profiles Table ✅
**Status**: EXISTS and populated

**Actual columns**:
- `id` (uuid)
- `email` (text)
- `full_name` (text)
- `avatar_url` (text, nullable)
- `role` (text) - Currently "COMMUNITY_MEMBER"
- `created_at` (timestamp)
- `updated_at` (timestamp)

**Issues**:
- ⚠️ **Role mismatch**: Current role is "COMMUNITY_MEMBER", but schema expects "user", "business_owner", "admin"
- Need to update role enum or existing data

**Sample data**:
```json
{
  "id": "59230d7c-822f-4697-9faf-d357f8abde23",
  "email": "tjosato+mb@gmail.com",
  "full_name": "Ernesto Josato",
  "avatar_url": null,
  "role": "COMMUNITY_MEMBER",
  "created_at": "2025-11-13T21:09:51.919528+00:00",
  "updated_at": "2025-11-13T21:09:51.919528+00:00"
}
```

---

### 2. categories Table ✅⚠️
**Status**: EXISTS but INCOMPLETE

**Actual columns**:
- `id` (uuid)
- `name` (text)
- `slug` (text)
- `description` (text)
- `icon` (text)
- `parent_id` (uuid, nullable)
- `created_at` (timestamp)

**Missing columns**:
- ❌ `order` (integer) - Used for sorting categories
- ❌ `is_active` (boolean) - Used to show/hide categories

**Sample data**:
```json
{
  "id": "1154b615-953e-4b2f-bd93-8d8ce88d14a7",
  "name": "Restaurants",
  "slug": "restaurants",
  "description": "Dining establishments and eateries",
  "icon": "utensils",
  "parent_id": null,
  "created_at": "2025-11-13T19:15:41.411827+00:00"
}
```

---

### 3. businesses Table ✅
**Status**: EXISTS but EMPTY

**Issues**:
- Table exists but has 0 rows
- Cannot determine column structure from empty table
- Need to check schema against expected structure

**Expected columns** (from schema.sql):
- id, owner_id, name, slug, description
- category_id, subcategory
- address, city, state, zip_code
- latitude, longitude
- phone, email, website
- hours (jsonb), logo_url, cover_image_url, images, amenities
- price_range, is_verified, is_featured, is_active
- subscription_tier, subscription_expires_at
- view_count, claim_status
- created_at, updated_at

**Action needed**:
- Run seed.sql to populate with sample data
- Verify all columns exist via schema check

---

### 4. reviews Table ✅
**Status**: EXISTS but EMPTY

**Issues**:
- Table exists but has 0 rows
- Cannot determine column structure

**Expected columns** (from schema.sql):
- id, business_id, user_id
- rating, title, content, images
- is_verified_purchase, helpful_count
- is_flagged, is_approved
- created_at, updated_at

**Action needed**:
- Run seed.sql to populate with sample data

---

### 5. events Table ✅
**Status**: EXISTS but EMPTY

**Issues**:
- Table exists but has 0 rows
- Cannot determine column structure

**Expected columns** (from schema.sql):
- id, business_id, title, slug, description
- start_date, end_date, location
- is_online, event_url, image_url
- price, max_attendees, is_active
- created_at, updated_at

**Action needed**:
- Run seed.sql to populate with sample data

---

### 6. deals Table ❌
**Status**: DOES NOT EXIST

**Error message**:
```
"Could not find the table 'public.deals' in the schema cache"
```

**Expected columns** (from schema.sql):
- id, business_id, title, description
- discount_type, discount_value, code, terms
- start_date, end_date, is_active
- redemption_count
- created_at, updated_at

**Action needed**:
- Create the deals table using CREATE TABLE statement

---

## Migration Plan

### Step 1: Add Missing Columns to categories
```sql
-- Add 'order' column
ALTER TABLE categories ADD COLUMN IF NOT EXISTS "order" integer DEFAULT 0 NOT NULL;

-- Add 'is_active' column
ALTER TABLE categories ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true NOT NULL;
```

### Step 2: Create deals Table
```sql
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

-- Enable RLS
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;

-- Add policies
CREATE POLICY "Active deals are viewable by everyone"
  ON deals FOR SELECT USING ( is_active = true AND start_date <= now() AND end_date >= now() );

CREATE POLICY "Business owners can manage their deals"
  ON deals FOR ALL USING (
    EXISTS (
      SELECT 1 FROM businesses
      WHERE businesses.id = deals.business_id
      AND businesses.owner_id = auth.uid()
    )
  );

-- Add trigger
CREATE TRIGGER update_deals_updated_at BEFORE UPDATE ON deals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Step 3: Fix profiles Role Enum
```sql
-- Update existing role to match expected values
UPDATE profiles SET role = 'user' WHERE role = 'COMMUNITY_MEMBER';

-- Add constraint if not exists
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE profiles ADD CONSTRAINT profiles_role_check
  CHECK (role IN ('admin', 'business_owner', 'user'));
```

### Step 4: Verify businesses, reviews, events Structure
Since these tables are empty, we need to verify they have all required columns.
Run a query to check information_schema.columns for each table.

### Step 5: Run Seed Data
Once all tables have correct structure, run seed.sql to populate with sample data.

---

## Verification Checklist

After running migrations:

- [ ] categories table has `order` column
- [ ] categories table has `is_active` column
- [ ] deals table exists
- [ ] deals table has all 12 columns
- [ ] profiles role values are 'user', 'business_owner', or 'admin'
- [ ] businesses table has all expected columns
- [ ] reviews table has all expected columns
- [ ] events table has all expected columns
- [ ] All tables have RLS enabled
- [ ] All tables have correct policies
- [ ] All tables have update triggers

---

## Next Steps

1. Create `supabase/migration-final.sql` with:
   - ALTER TABLE for categories missing columns
   - CREATE TABLE for deals
   - UPDATE profiles role values

2. Run migration in Supabase SQL Editor

3. Verify with inspection script

4. Run seed.sql to populate data

5. Test application with real data
