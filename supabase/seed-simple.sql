-- ============================================
-- Midtownbook Seed Data (Simplified)
-- Uses your existing authenticated user as the business owner
-- Run this AFTER running migration-final-v2.sql
-- ============================================

DO $$
DECLARE
  current_user_id uuid;

  -- Category IDs (we'll fetch these)
  cat_restaurants uuid;
  cat_cafes uuid;
  cat_retail uuid;
  cat_services uuid;
  cat_health uuid;
  cat_entertainment uuid;

BEGIN
  -- Get the first user from profiles (your authenticated user)
  SELECT id INTO current_user_id FROM profiles LIMIT 1;

  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'No user found in profiles table. Please sign up first!';
  END IF;

  RAISE NOTICE 'Using user ID: %', current_user_id;

  -- Get category IDs
  SELECT id INTO cat_restaurants FROM categories WHERE slug = 'restaurants';
  SELECT id INTO cat_cafes FROM categories WHERE slug = 'cafes-coffee';
  SELECT id INTO cat_retail FROM categories WHERE slug = 'retail';
  SELECT id INTO cat_services FROM categories WHERE slug = 'services';
  SELECT id INTO cat_health FROM categories WHERE slug = 'health-wellness';
  SELECT id INTO cat_entertainment FROM categories WHERE slug = 'entertainment';

  -- ============================================
  -- INSERT SAMPLE BUSINESSES
  -- ============================================

  -- 1. Golden Dragon Restaurant
  INSERT INTO public.businesses (
    owner_id, name, slug, description, category_id, subcategory,
    address, city, state, zip_code, latitude, longitude,
    phone, email, website, hours, logo_url, cover_image_url, images,
    amenities, price_range, is_verified, is_featured, subscription_tier
  ) VALUES (
    current_user_id,
    'Golden Dragon Restaurant',
    'golden-dragon-restaurant',
    'Authentic Chinese cuisine with a modern twist. Family-owned for over 20 years.',
    cat_restaurants,
    'Chinese',
    '456 Market Street',
    'San Francisco',
    'CA',
    '94102',
    37.7849,
    -122.4094,
    '(415) 555-0123',
    'info@goldendragon.com',
    'https://goldendragon.example.com',
    '{"monday": {"open": "11:00", "close": "22:00"}, "tuesday": {"open": "11:00", "close": "22:00"}, "wednesday": {"open": "11:00", "close": "22:00"}, "thursday": {"open": "11:00", "close": "22:00"}, "friday": {"open": "11:00", "close": "23:00"}, "saturday": {"open": "12:00", "close": "23:00"}, "sunday": {"open": "12:00", "close": "21:00"}}'::jsonb,
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200',
    ARRAY['https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800'],
    ARRAY['takeout', 'delivery', 'outdoor_seating', 'reservations'],
    2,
    true,
    true,
    'premium'
  );

  -- 2. Blue Bottle Coffee
  INSERT INTO public.businesses (
    owner_id, name, slug, description, category_id, subcategory,
    address, city, state, zip_code, latitude, longitude,
    phone, email, website, hours, logo_url, cover_image_url,
    amenities, price_range, is_verified, subscription_tier
  ) VALUES (
    current_user_id,
    'Blue Bottle Coffee',
    'blue-bottle-coffee',
    'Artisanal coffee roasted fresh daily. Perfect spot for remote work.',
    cat_cafes,
    'Coffee Shop',
    '234 Hayes Street',
    'San Francisco',
    'CA',
    '94102',
    37.7759,
    -122.4234,
    '(415) 555-0145',
    'midtown@bluebottle.com',
    'https://bluebottlecoffee.com',
    '{"monday": {"open": "07:00", "close": "18:00"}, "tuesday": {"open": "07:00", "close": "18:00"}, "wednesday": {"open": "07:00", "close": "18:00"}, "thursday": {"open": "07:00", "close": "18:00"}, "friday": {"open": "07:00", "close": "18:00"}, "saturday": {"open": "08:00", "close": "18:00"}, "sunday": {"open": "08:00", "close": "17:00"}}'::jsonb,
    'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400',
    'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1200',
    ARRAY['wifi', 'outdoor_seating', 'takeout', 'laptop_friendly'],
    2,
    true,
    'basic'
  );

  -- 3. Peak Fitness Center
  INSERT INTO public.businesses (
    owner_id, name, slug, description, category_id, subcategory,
    address, city, state, zip_code, latitude, longitude,
    phone, email, website, hours, logo_url, cover_image_url,
    amenities, price_range, is_verified, is_featured, subscription_tier
  ) VALUES (
    current_user_id,
    'Peak Fitness Center',
    'peak-fitness-center',
    'State-of-the-art fitness facility with certified personal trainers and group classes.',
    cat_health,
    'Gym',
    '123 Mission Street',
    'San Francisco',
    'CA',
    '94105',
    37.7899,
    -122.3964,
    '(415) 555-0201',
    'info@peakfitness.com',
    'https://peakfitness.example.com',
    '{"monday": {"open": "05:00", "close": "22:00"}, "tuesday": {"open": "05:00", "close": "22:00"}, "wednesday": {"open": "05:00", "close": "22:00"}, "thursday": {"open": "05:00", "close": "22:00"}, "friday": {"open": "05:00", "close": "21:00"}, "saturday": {"open": "07:00", "close": "20:00"}, "sunday": {"open": "07:00", "close": "20:00"}}'::jsonb,
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200',
    ARRAY['personal_training', 'group_classes', 'showers', 'lockers', 'sauna'],
    3,
    true,
    true,
    'premium'
  );

  -- 4. Artisan Books & Stationery
  INSERT INTO public.businesses (
    owner_id, name, slug, description, category_id, subcategory,
    address, city, state, zip_code, latitude, longitude,
    phone, email, website, hours, logo_url, cover_image_url,
    amenities, price_range, subscription_tier
  ) VALUES (
    current_user_id,
    'Artisan Books & Stationery',
    'artisan-books-stationery',
    'Independent bookstore featuring curated collections and local authors.',
    cat_retail,
    'Bookstore',
    '789 Valencia Street',
    'San Francisco',
    'CA',
    '94110',
    37.7599,
    -122.4214,
    '(415) 555-0167',
    'hello@artisanbooks.com',
    'https://artisanbooks.example.com',
    '{"monday": {"open": "10:00", "close": "20:00"}, "tuesday": {"open": "10:00", "close": "20:00"}, "wednesday": {"open": "10:00", "close": "20:00"}, "thursday": {"open": "10:00", "close": "20:00"}, "friday": {"open": "10:00", "close": "21:00"}, "saturday": {"open": "09:00", "close": "21:00"}, "sunday": {"open": "10:00", "close": "19:00"}}'::jsonb,
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200',
    ARRAY['gift_wrapping', 'special_orders', 'book_clubs'],
    2,
    'basic'
  );

  -- 5. Midtown Barber Shop
  INSERT INTO public.businesses (
    owner_id, name, slug, description, category_id, subcategory,
    address, city, state, zip_code, latitude, longitude,
    phone, email, website, hours, logo_url, cover_image_url,
    amenities, price_range, subscription_tier
  ) VALUES (
    current_user_id,
    'Midtown Barber Shop',
    'midtown-barber-shop',
    'Classic barbershop offering modern and traditional cuts and hot towel shaves.',
    cat_services,
    'Barbershop',
    '567 Fell Street',
    'San Francisco',
    'CA',
    '94102',
    37.7739,
    -122.4294,
    '(415) 555-0189',
    'book@midtownbarber.com',
    'https://midtownbarber.example.com',
    '{"monday": {"open": "09:00", "close": "19:00"}, "tuesday": {"open": "09:00", "close": "19:00"}, "wednesday": {"open": "09:00", "close": "19:00"}, "thursday": {"open": "09:00", "close": "20:00"}, "friday": {"open": "09:00", "close": "20:00"}, "saturday": {"open": "08:00", "close": "18:00"}, "sunday": "closed"}'::jsonb,
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400',
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200',
    ARRAY['walk_ins', 'appointments', 'online_booking'],
    2,
    'free'
  );

  -- 6. Bella Italia Trattoria
  INSERT INTO public.businesses (
    owner_id, name, slug, description, category_id, subcategory,
    address, city, state, zip_code, latitude, longitude,
    phone, email, website, hours, logo_url, cover_image_url,
    amenities, price_range, is_verified, is_featured, subscription_tier
  ) VALUES (
    current_user_id,
    'Bella Italia Trattoria',
    'bella-italia-trattoria',
    'Authentic Italian restaurant serving homemade pasta and wood-fired pizzas.',
    cat_restaurants,
    'Italian',
    '678 Columbus Avenue',
    'San Francisco',
    'CA',
    '94133',
    37.8009,
    -122.4104,
    '(415) 555-0289',
    'reservations@bellaitalia.com',
    'https://bellaitalia.example.com',
    '{"monday": "closed", "tuesday": {"open": "17:00", "close": "22:00"}, "wednesday": {"open": "17:00", "close": "22:00"}, "thursday": {"open": "17:00", "close": "22:00"}, "friday": {"open": "17:00", "close": "23:00"}, "saturday": {"open": "12:00", "close": "23:00"}, "sunday": {"open": "12:00", "close": "21:00"}}'::jsonb,
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200',
    ARRAY['reservations', 'outdoor_seating', 'wine_list', 'romantic'],
    3,
    true,
    true,
    'featured'
  );

  -- 7. The Corner Cafe
  INSERT INTO public.businesses (
    owner_id, name, slug, description, category_id, subcategory,
    address, city, state, zip_code, latitude, longitude,
    phone, email, website, hours, logo_url, cover_image_url,
    amenities, price_range, subscription_tier
  ) VALUES (
    current_user_id,
    'The Corner Cafe',
    'the-corner-cafe',
    'Cozy neighborhood cafe serving breakfast all day and homemade pastries.',
    cat_cafes,
    'Cafe',
    '234 Divisadero Street',
    'San Francisco',
    'CA',
    '94117',
    37.7719,
    -122.4394,
    '(415) 555-0301',
    'hello@cornercafe.com',
    'https://cornercafe.example.com',
    '{"monday": {"open": "07:00", "close": "15:00"}, "tuesday": {"open": "07:00", "close": "15:00"}, "wednesday": {"open": "07:00", "close": "15:00"}, "thursday": {"open": "07:00", "close": "15:00"}, "friday": {"open": "07:00", "close": "15:00"}, "saturday": {"open": "08:00", "close": "16:00"}, "sunday": {"open": "08:00", "close": "16:00"}}'::jsonb,
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400',
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200',
    ARRAY['outdoor_seating', 'takeout', 'vegetarian_options', 'dog_friendly'],
    2,
    'free'
  );

  -- 8. Regal Cinema
  INSERT INTO public.businesses (
    owner_id, name, slug, description, category_id, subcategory,
    address, city, state, zip_code, latitude, longitude,
    phone, email, website, hours, logo_url, cover_image_url,
    amenities, price_range, subscription_tier
  ) VALUES (
    current_user_id,
    'Regal Cinema Midtown',
    'regal-cinema-midtown',
    '12-screen multiplex featuring the latest blockbusters. IMAX and 3D available.',
    cat_entertainment,
    'Movie Theater',
    '890 Market Street',
    'San Francisco',
    'CA',
    '94102',
    37.7829,
    -122.4074,
    '(415) 555-0223',
    'midtown@regalcinema.com',
    'https://regalcinema.com/midtown',
    '{"monday": {"open": "10:00", "close": "23:00"}, "tuesday": {"open": "10:00", "close": "23:00"}, "wednesday": {"open": "10:00", "close": "23:00"}, "thursday": {"open": "10:00", "close": "23:00"}, "friday": {"open": "10:00", "close": "01:00"}, "saturday": {"open": "10:00", "close": "01:00"}, "sunday": {"open": "10:00", "close": "23:00"}}'::jsonb,
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400',
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200',
    ARRAY['imax', 'recliner_seats', 'online_tickets', 'concessions'],
    3,
    'free'
  );

  -- 9. Sakura Sushi Bar
  INSERT INTO public.businesses (
    owner_id, name, slug, description, category_id, subcategory,
    address, city, state, zip_code, latitude, longitude,
    phone, email, website, hours, logo_url, cover_image_url,
    amenities, price_range, is_verified, is_featured, subscription_tier
  ) VALUES (
    current_user_id,
    'Sakura Sushi Bar',
    'sakura-sushi-bar',
    'Premium sushi and Japanese cuisine. Fresh fish delivered daily.',
    cat_restaurants,
    'Japanese',
    '321 Geary Street',
    'San Francisco',
    'CA',
    '94102',
    37.7869,
    -122.4114,
    '(415) 555-0389',
    'reservations@sakurasushi.com',
    'https://sakurasushi.example.com',
    '{"monday": "closed", "tuesday": {"open": "17:30", "close": "22:00"}, "wednesday": {"open": "17:30", "close": "22:00"}, "thursday": {"open": "17:30", "close": "22:00"}, "friday": {"open": "17:30", "close": "23:00"}, "saturday": {"open": "17:00", "close": "23:00"}, "sunday": {"open": "17:00", "close": "21:00"}}'::jsonb,
    'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400',
    'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=1200',
    ARRAY['reservations', 'omakase', 'sake_selection', 'romantic'],
    4,
    true,
    true,
    'premium'
  );

  -- 10. TechFix Repair Shop
  INSERT INTO public.businesses (
    owner_id, name, slug, description, category_id, subcategory,
    address, city, state, zip_code, latitude, longitude,
    phone, email, website, hours, logo_url, cover_image_url,
    amenities, price_range, subscription_tier
  ) VALUES (
    current_user_id,
    'TechFix Repair Shop',
    'techfix-repair-shop',
    'Professional electronics repair for smartphones, tablets, and computers.',
    cat_services,
    'Electronics Repair',
    '567 Mission Street',
    'San Francisco',
    'CA',
    '94105',
    37.7879,
    -122.3994,
    '(415) 555-0401',
    'support@techfix.com',
    'https://techfix.example.com',
    '{"monday": {"open": "10:00", "close": "19:00"}, "tuesday": {"open": "10:00", "close": "19:00"}, "wednesday": {"open": "10:00", "close": "19:00"}, "thursday": {"open": "10:00", "close": "19:00"}, "friday": {"open": "10:00", "close": "19:00"}, "saturday": {"open": "10:00", "close": "17:00"}, "sunday": "closed"}'::jsonb,
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200',
    ARRAY['same_day_service', 'warranty', 'walk_ins'],
    2,
    'free'
  );

  RAISE NOTICE '═══════════════════════════════════════════════════════';
  RAISE NOTICE '✅ Seed data inserted successfully!';
  RAISE NOTICE '═══════════════════════════════════════════════════════';
  RAISE NOTICE 'Created 10 sample businesses';
  RAISE NOTICE 'All businesses owned by user: %', current_user_id;
  RAISE NOTICE '';
  RAISE NOTICE 'You can now:';
  RAISE NOTICE '1. Visit http://localhost:3000/businesses to see the listings';
  RAISE NOTICE '2. Click on any business to see details';
  RAISE NOTICE '3. Add reviews and manage your businesses';
  RAISE NOTICE '═══════════════════════════════════════════════════════';

END $$;

-- ============================================
-- SEED DATA COMPLETE
-- ============================================
