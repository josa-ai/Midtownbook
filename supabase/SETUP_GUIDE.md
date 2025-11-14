# Supabase Database Setup Guide for Midtownbook

This guide will walk you through setting up the complete database schema and seed data for the Midtownbook project.

## Prerequisites

- A Supabase account (sign up at [supabase.com](https://supabase.com))
- A Supabase project created
- Access to the Supabase SQL Editor

## Overview

The Midtownbook database consists of:
- **Profiles**: User account information
- **Categories**: Business categories (Restaurants, Cafes, Retail, etc.)
- **Businesses**: Business listings with location data
- **Reviews**: User reviews and ratings
- **Events**: Business-hosted events
- **Deals**: Special offers and promotions

## Step-by-Step Setup

### Step 1: Access Supabase SQL Editor

1. Log in to your Supabase dashboard at [app.supabase.com](https://app.supabase.com)
2. Select your project
3. Click on **SQL Editor** in the left sidebar
4. Click **New Query** to create a new SQL query

### Step 2: Run the Schema Script

1. Open the file `/supabase/schema.sql` in your code editor
2. Copy the **entire contents** of the file
3. Paste it into the Supabase SQL Editor
4. Click **Run** (or press Ctrl/Cmd + Enter)

**Expected Result:**
- All tables should be created successfully
- You should see a success message: "Success. No rows returned"
- Default categories will be inserted automatically

**What this creates:**
- 6 database tables (profiles, categories, businesses, reviews, events, deals)
- Row Level Security (RLS) policies for each table
- Indexes for optimized queries
- Helper functions for ratings and location-based searches
- Triggers for auto-updating timestamps
- 8 default business categories

### Step 3: Verify Schema Installation

1. In the Supabase dashboard, click on **Table Editor** in the left sidebar
2. You should see the following tables:
   - `profiles`
   - `categories`
   - `businesses`
   - `reviews`
   - `events`
   - `deals`

3. Click on the `categories` table
4. Verify that 8 default categories are present:
   - Restaurants
   - Cafes & Coffee
   - Retail
   - Services
   - Health & Wellness
   - Entertainment
   - Arts & Culture
   - Professional Services

### Step 4: Run the Seed Data Script

1. Open the file `/supabase/seed.sql` in your code editor
2. Copy the **entire contents** of the file
3. Return to the **SQL Editor** in Supabase
4. Create a **new query**
5. Paste the seed data script
6. Click **Run**

**Expected Result:**
- Success message with: "Created 15 businesses with sample reviews"
- 15 realistic business listings inserted
- Sample user profiles created
- Sample reviews added

**What this creates:**
- 3 sample user profiles (admin, business owner, community member)
- 15 diverse business listings across different categories:
  - 3 Restaurants (Golden Dragon, Bella Italia, Sakura Sushi)
  - 2 Cafes (Blue Bottle Coffee, The Corner Cafe)
  - 2 Retail (Artisan Books, Midtown Farmers Market)
  - 2 Services (Midtown Barber, TechFix Repair)
  - 2 Health & Wellness (Peak Fitness, Serenity Spa)
  - 2 Entertainment (Regal Cinema, Hop & Barrel Brewery)
  - 1 Arts & Culture (Modern Art Gallery)
  - 1 Professional Services (Summit Law Group)
- 8+ sample reviews with realistic content

### Step 5: Verify Seed Data

1. Click on **Table Editor** in the left sidebar
2. Select the `businesses` table
3. You should see 15 business listings with complete data
4. Select the `reviews` table
5. You should see multiple reviews linked to businesses
6. Select the `profiles` table
7. You should see 3 sample user profiles

### Step 6: Test the Database Functions

Run these test queries in the SQL Editor to verify everything is working:

#### Test 1: Get All Active Businesses
```sql
SELECT name, city, category_id, claim_status, price_range
FROM businesses
WHERE is_active = true
ORDER BY name;
```

#### Test 2: Get Businesses with Average Rating
```sql
SELECT
  b.name,
  b.description,
  (SELECT average_rating FROM get_business_rating(b.id)) as avg_rating,
  (SELECT total_reviews FROM get_business_rating(b.id)) as review_count
FROM businesses b
WHERE is_active = true
ORDER BY avg_rating DESC;
```

#### Test 3: Find Nearby Businesses (5km radius from Midtown center)
```sql
SELECT *
FROM nearby_businesses(37.7749, -122.4194, 5)
ORDER BY distance_km
LIMIT 10;
```

#### Test 4: Get Businesses by Category
```sql
SELECT
  b.name,
  c.name as category_name,
  b.address,
  b.phone
FROM businesses b
JOIN categories c ON b.category_id = c.id
WHERE c.slug = 'restaurants'
ORDER BY b.name;
```

## Database Schema Reference

### Table: businesses

Key columns:
- `id`: Unique identifier (UUID)
- `name`: Business name
- `slug`: URL-friendly identifier
- `category_id`: Reference to categories table
- `latitude` / `longitude`: Geographic coordinates
- `hours`: JSON object with business hours
- `amenities`: Array of amenity tags
- `price_range`: 1-4 dollar signs ($, $$, $$$, $$$$)
- `claim_status`: 'unclaimed', 'pending', or 'claimed'
- `subscription_tier`: 'free', 'basic', 'premium', or 'featured'

### Table: reviews

Key columns:
- `business_id`: Reference to business
- `user_id`: Reference to user profile
- `rating`: 1-5 stars
- `content`: Review text
- `helpful_count`: Number of helpful votes

### Table: categories

Default categories with slugs:
- `restaurants` - Dining establishments
- `cafes-coffee` - Coffee shops and cafes
- `retail` - Shopping and retail
- `services` - Professional services
- `health-wellness` - Fitness and healthcare
- `entertainment` - Movies, bars, breweries
- `arts-culture` - Galleries and museums
- `professional-services` - Legal, financial services

## Row Level Security (RLS)

The database uses RLS policies to secure data:

- **Profiles**: Users can view all profiles, but only update their own
- **Businesses**: Everyone can view active businesses; owners can update their own
- **Reviews**: Everyone can view approved reviews; users can only edit their own
- **Categories**: Everyone can view; only admins can modify
- **Events/Deals**: Everyone can view active items; only business owners can manage their own

## Common Operations

### Adding a New Business

```sql
INSERT INTO businesses (
  owner_id,
  name,
  slug,
  category_id,
  address,
  city,
  state,
  zip_code,
  latitude,
  longitude
) VALUES (
  'YOUR_USER_ID',
  'New Business Name',
  'new-business-name',
  (SELECT id FROM categories WHERE slug = 'restaurants'),
  '123 Main Street',
  'Midtown',
  'CA',
  '94102',
  37.7749,
  -122.4194
);
```

### Adding a Review

```sql
INSERT INTO reviews (
  business_id,
  user_id,
  rating,
  title,
  content
) VALUES (
  'BUSINESS_UUID',
  'USER_UUID',
  5,
  'Great experience!',
  'I had an amazing time at this business...'
);
```

## Troubleshooting

### Issue: "permission denied for table" error

**Solution**: This means RLS policies are blocking the operation. Make sure you're authenticated with a valid user when testing from your application. For testing in SQL Editor, you can temporarily disable RLS:

```sql
-- Disable RLS for testing (NOT for production!)
ALTER TABLE businesses DISABLE ROW LEVEL SECURITY;

-- Re-enable when done
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
```

### Issue: Schema already exists

**Solution**: If you need to reset the database:

```sql
-- Drop all tables (WARNING: This deletes all data!)
DROP TABLE IF EXISTS deals CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS businesses CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Then re-run schema.sql
```

### Issue: Foreign key constraint violations

**Solution**: Make sure you're inserting data in the correct order:
1. Profiles (or use existing auth.users IDs)
2. Categories (done automatically in schema.sql)
3. Businesses
4. Reviews, Events, Deals (depend on businesses)

### Issue: PostGIS functions not working

**Solution**: Make sure the PostGIS extension is enabled:

```sql
CREATE EXTENSION IF NOT EXISTS postgis;
```

### Issue: Seed data fails with "invalid user ID"

**Solution**: The seed script creates sample user IDs for demonstration. For production:
1. Create real users through Supabase Auth
2. Update the seed script with actual user UUIDs from `auth.users` table
3. Or manually insert businesses using real user IDs

## Next Steps

After setting up the database:

1. **Configure Environment Variables**: Update your `.env.local` file with:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

2. **Test Authentication**: Create a user account through your application

3. **Test Business Listing**: Create a test business listing

4. **Verify Queries**: Test that your application can query businesses, categories, and reviews

5. **Set up Storage**: Configure Supabase Storage buckets for business images:
   - Go to Storage in Supabase dashboard
   - Create buckets: `business-logos`, `business-images`, `user-avatars`
   - Set appropriate policies for public read access

## Viewing Data in Supabase Dashboard

### Table Editor View
- Click **Table Editor** in sidebar
- Select any table to view/edit data
- Use filters to search and sort
- Click on any row to edit (respecting RLS policies)

### Expected Data Count After Seed:
- **Profiles**: 3 users
- **Categories**: 8 categories
- **Businesses**: 15 businesses
- **Reviews**: 8+ reviews
- **Events**: 0 (add your own)
- **Deals**: 0 (add your own)

### SQL Editor Queries

**View all businesses with ratings:**
```sql
SELECT
  b.name,
  b.city,
  c.name as category,
  COUNT(r.id) as review_count,
  ROUND(AVG(r.rating)::numeric, 1) as avg_rating
FROM businesses b
LEFT JOIN reviews r ON b.id = r.business_id AND r.is_approved = true
LEFT JOIN categories c ON b.category_id = c.id
GROUP BY b.id, b.name, b.city, c.name
ORDER BY avg_rating DESC NULLS LAST;
```

## Security Considerations

1. **Never disable RLS in production** - RLS policies protect your data
2. **Use service role key carefully** - Only use in secure server environments
3. **Validate user input** - Always sanitize and validate data from users
4. **Keep Supabase keys secret** - Never commit keys to version control
5. **Use environment variables** - Store all credentials in `.env.local`

## Support

For issues or questions:
- Check [Supabase Documentation](https://supabase.com/docs)
- Review [PostGIS Documentation](https://postgis.net/documentation/)
- Consult the Midtownbook project README

## Summary

You should now have:
- ✅ Complete database schema with all tables
- ✅ Row Level Security policies configured
- ✅ 15 sample businesses with realistic data
- ✅ Sample reviews and user profiles
- ✅ Helper functions for ratings and location searches
- ✅ Proper indexes for query performance

Your Midtownbook database is now ready for development!
