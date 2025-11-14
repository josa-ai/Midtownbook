# Database Setup Instructions

## Quick Start Guide

Follow these steps to set up your Supabase database with the Midtownbook schema and seed data.

### Step 1: Access Supabase SQL Editor

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Select your **midtownbook** project (or the project with URL: `https://bwpvhwvgsebthapztiyp.supabase.co`)
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**

### Step 2: Run the Schema

1. Open [supabase/schema.sql](./supabase/schema.sql) in your code editor
2. Copy the **entire file contents** (Cmd/Ctrl + A, then Cmd/Ctrl + C)
3. Paste into the Supabase SQL Editor
4. Click **RUN** (or press Cmd/Ctrl + Enter)
5. Wait for success message: "Success. No rows returned"

**What this creates:**
- ✅ `profiles` table (user accounts)
- ✅ `categories` table (8 default categories auto-inserted)
- ✅ `businesses` table (with PostGIS location support)
- ✅ `reviews` table
- ✅ `events` table
- ✅ `deals` table
- ✅ Row Level Security policies for all tables
- ✅ Helper functions (`get_business_rating`, `nearby_businesses`)
- ✅ Triggers for auto-updating timestamps

### Step 3: Run the Seed Data

1. Open [supabase/seed.sql](./supabase/seed.sql) in your code editor
2. Copy the **entire file contents**
3. In Supabase SQL Editor, click **New Query** (to create a fresh query tab)
4. Paste the seed data
5. Click **RUN**
6. Wait for success message

**What this creates:**
- ✅ 15 realistic business listings (restaurants, cafes, retail, services, etc.)
- ✅ 3 sample user profiles
- ✅ 8+ sample reviews
- ✅ Realistic business data (hours, photos, amenities, ratings)

### Step 4: Verify the Setup

Go to **Table Editor** in Supabase dashboard and check:

**Categories table:**
- Should have 8 rows
- Names: Restaurants, Cafes & Coffee, Retail, Services, Health & Wellness, Entertainment, Arts & Culture, Professional Services

**Businesses table:**
- Should have 15 rows
- Check a few: Golden Dragon Restaurant, Blue Bottle Coffee, Peak Fitness Center, etc.
- Each should have: name, address, coordinates, phone, hours, photos, etc.

**Profiles table:**
- Should have 3 rows
- Sample users with emails

**Reviews table:**
- Should have 8+ rows
- Linked to businesses and users

### Step 5: Test the Connection

Run the verification script:

```bash
npx tsx scripts/setup-database.ts
```

Expected output:
```
✅ Connection successful
✅ Categories: 8 found
✅ Businesses: 15 found
✅ Profiles: 3 found
```

### Step 6: Test in the App

1. Make sure your dev server is running: `npm run dev`
2. Visit [http://localhost:3000](http://localhost:3000)
3. The homepage should now show real business data
4. Visit [http://localhost:3000/businesses](http://localhost:3000/businesses) to see all listings
5. Click on any business to see the detail page

## Troubleshooting

### Error: "extension postgis does not exist"

**Solution**: Enable PostGIS extension
1. Go to **Database > Extensions** in Supabase
2. Search for "postgis"
3. Click **Enable**
4. Re-run the schema script

### Error: "permission denied"

**Solution**: You need to use a service role key or run via SQL Editor (not API)
- Always use the Supabase SQL Editor for schema changes
- The SQL Editor runs with full admin privileges

### Error: "relation already exists"

**Solution**: Tables already created
- This is OK! It means the schema was already applied
- You can skip to running the seed data
- Or drop all tables first if you want a fresh start:

```sql
DROP TABLE IF EXISTS deals CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS businesses CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
```

Then re-run the schema.

### No businesses showing on the website

**Checklist:**
1. ✅ Schema applied successfully
2. ✅ Seed data applied successfully
3. ✅ Environment variables set in `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. ✅ Dev server restarted after adding env vars
5. ✅ Check browser console for errors
6. ✅ Check Supabase logs for RLS policy issues

### RLS Policy Issues

If you can't see data, temporarily disable RLS to test:

```sql
ALTER TABLE businesses DISABLE ROW LEVEL SECURITY;
```

**Important**: Re-enable before production:
```sql
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
```

## Next Steps

After successful setup:

1. ✅ Database is ready
2. ➡️ Build the `/businesses` listing page (connects to Supabase)
3. ➡️ Build the `/businesses/[slug]` detail page
4. ➡️ Add search functionality
5. ➡️ Add filtering
6. ➡️ Add review submission

## Useful Queries

### View all businesses with ratings

```sql
SELECT
  b.name,
  b.rating,
  get_business_rating(b.id) as calculated_rating,
  c.name as category
FROM businesses b
JOIN categories c ON b.category_id = c.id
ORDER BY b.name;
```

### Find businesses near a location

```sql
SELECT * FROM nearby_businesses(37.7749, -122.4194, 5000)
LIMIT 10;
```

### Count businesses by category

```sql
SELECT
  c.name as category,
  COUNT(b.id) as business_count
FROM categories c
LEFT JOIN businesses b ON b.category_id = c.id
GROUP BY c.id, c.name
ORDER BY business_count DESC;
```

## Support

If you encounter issues:
1. Check the [Supabase docs](https://supabase.com/docs)
2. Review [supabase/SETUP_GUIDE.md](./supabase/SETUP_GUIDE.md)
3. Check the Supabase logs in the dashboard
4. Verify your environment variables

---

**Status**: Ready for Phase 3 - Core Pages Integration
