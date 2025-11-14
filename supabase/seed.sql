-- ============================================
-- Midtownbook Seed Data
-- This file populates the database with sample data
-- Run this AFTER running schema.sql
-- ============================================

-- Note: You'll need to create a test user first in Supabase Auth
-- or use an existing user ID. Replace 'YOUR_USER_ID' below with
-- an actual UUID from auth.users table.

-- For this seed data, we'll create a default admin user profile
-- You should replace this with your actual user ID after creating an account

DO $$
DECLARE
  admin_user_id uuid;
  user1_id uuid;
  user2_id uuid;

  -- Category IDs (we'll fetch these)
  cat_restaurants uuid;
  cat_cafes uuid;
  cat_retail uuid;
  cat_services uuid;
  cat_health uuid;
  cat_entertainment uuid;
  cat_arts uuid;
  cat_professional uuid;

  -- Business IDs (for reviews)
  biz_golden_dragon uuid;
  biz_blue_bottle uuid;
  biz_artisan_books uuid;
  biz_midtown_barber uuid;
  biz_peak_fitness uuid;
  biz_regal_cinema uuid;
  biz_modern_gallery uuid;
  biz_summit_law uuid;
  biz_bella_italia uuid;
  biz_corner_cafe uuid;
  biz_midtown_market uuid;
  biz_wellness_spa uuid;
  biz_craft_brewery uuid;
  biz_sakura_sushi uuid;
  biz_tech_repair uuid;

BEGIN
  -- Create sample user IDs (these would normally come from auth.users)
  -- In production, you'd use actual authenticated user IDs
  admin_user_id := gen_random_uuid();
  user1_id := gen_random_uuid();
  user2_id := gen_random_uuid();

  -- Insert sample profiles (bypassing auth for seed data)
  -- Note: In production, profiles are created via the handle_new_user() trigger
  INSERT INTO public.profiles (id, email, full_name, role, avatar_url) VALUES
    (admin_user_id, 'admin@midtownbook.com', 'Admin User', 'admin', 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'),
    (user1_id, 'sarah.johnson@example.com', 'Sarah Johnson', 'business_owner', 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah'),
    (user2_id, 'mike.chen@example.com', 'Mike Chen', 'user', 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike')
  ON CONFLICT (email) DO NOTHING;

  -- Get category IDs
  SELECT id INTO cat_restaurants FROM categories WHERE slug = 'restaurants';
  SELECT id INTO cat_cafes FROM categories WHERE slug = 'cafes-coffee';
  SELECT id INTO cat_retail FROM categories WHERE slug = 'retail';
  SELECT id INTO cat_services FROM categories WHERE slug = 'services';
  SELECT id INTO cat_health FROM categories WHERE slug = 'health-wellness';
  SELECT id INTO cat_entertainment FROM categories WHERE slug = 'entertainment';
  SELECT id INTO cat_arts FROM categories WHERE slug = 'arts-culture';
  SELECT id INTO cat_professional FROM categories WHERE slug = 'professional-services';

  -- ============================================
  -- INSERT BUSINESSES
  -- ============================================

  -- 1. Golden Dragon Restaurant (Chinese)
  INSERT INTO public.businesses (
    id, owner_id, name, slug, description, category_id, subcategory,
    address, city, state, zip_code, latitude, longitude,
    phone, email, website, hours, logo_url, cover_image_url, images,
    amenities, price_range, is_verified, is_featured, subscription_tier,
    claim_status, view_count
  ) VALUES (
    gen_random_uuid(),
    admin_user_id,
    'Golden Dragon Restaurant',
    'golden-dragon-restaurant',
    'Authentic Chinese cuisine with a modern twist. Family-owned for over 20 years, serving traditional Cantonese and Szechuan dishes made with fresh, locally-sourced ingredients.',
    cat_restaurants,
    'Chinese',
    '456 Market Street',
    'Midtown',
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
    ARRAY['https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800', 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800'],
    ARRAY['takeout', 'delivery', 'outdoor_seating', 'reservations', 'family_friendly'],
    2,
    true,
    true,
    'premium',
    'claimed',
    1247
  ) RETURNING id INTO biz_golden_dragon;

  -- 2. Blue Bottle Coffee
  INSERT INTO public.businesses (
    id, owner_id, name, slug, description, category_id, subcategory,
    address, city, state, zip_code, latitude, longitude,
    phone, email, website, hours, logo_url, cover_image_url, images,
    amenities, price_range, is_verified, is_featured, subscription_tier,
    claim_status, view_count
  ) VALUES (
    gen_random_uuid(),
    user1_id,
    'Blue Bottle Coffee',
    'blue-bottle-coffee-midtown',
    'Artisanal coffee roasted fresh daily. We specialize in single-origin beans and carefully crafted espresso drinks. Perfect spot for remote work or catching up with friends.',
    cat_cafes,
    'Coffee Shop',
    '234 Hayes Street',
    'Midtown',
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
    ARRAY['https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800', 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800'],
    ARRAY['wifi', 'outdoor_seating', 'takeout', 'vegan_options', 'laptop_friendly'],
    2,
    true,
    false,
    'basic',
    'claimed',
    892
  ) RETURNING id INTO biz_blue_bottle;

  -- 3. Artisan Books & Stationery
  INSERT INTO public.businesses (
    id, owner_id, name, slug, description, category_id, subcategory,
    address, city, state, zip_code, latitude, longitude,
    phone, email, website, hours, logo_url, cover_image_url, images,
    amenities, price_range, is_verified, subscription_tier,
    claim_status, view_count
  ) VALUES (
    gen_random_uuid(),
    admin_user_id,
    'Artisan Books & Stationery',
    'artisan-books-stationery',
    'Independent bookstore featuring curated collections of fiction, non-fiction, and local authors. We also carry premium stationery, journals, and unique gifts.',
    cat_retail,
    'Bookstore',
    '789 Valencia Street',
    'Midtown',
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
    ARRAY['https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800'],
    ARRAY['gift_wrapping', 'special_orders', 'book_clubs', 'author_events'],
    2,
    true,
    'basic',
    'claimed',
    634
  ) RETURNING id INTO biz_artisan_books;

  -- 4. Midtown Barber Shop
  INSERT INTO public.businesses (
    id, owner_id, name, slug, description, category_id, subcategory,
    address, city, state, zip_code, latitude, longitude,
    phone, email, website, hours, logo_url, cover_image_url,
    amenities, price_range, is_verified, subscription_tier,
    claim_status, view_count
  ) VALUES (
    gen_random_uuid(),
    user1_id,
    'Midtown Barber Shop',
    'midtown-barber-shop',
    'Classic barbershop offering modern and traditional cuts, beard trims, and hot towel shaves. Walk-ins welcome, appointments preferred.',
    cat_services,
    'Barbershop',
    '567 Fell Street',
    'Midtown',
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
    ARRAY['walk_ins', 'appointments', 'online_booking', 'senior_discount'],
    2,
    true,
    'free',
    'claimed',
    445
  ) RETURNING id INTO biz_midtown_barber;

  -- 5. Peak Fitness Center
  INSERT INTO public.businesses (
    id, owner_id, name, slug, description, category_id, subcategory,
    address, city, state, zip_code, latitude, longitude,
    phone, email, website, hours, logo_url, cover_image_url, images,
    amenities, price_range, is_verified, is_featured, subscription_tier,
    claim_status, view_count
  ) VALUES (
    gen_random_uuid(),
    admin_user_id,
    'Peak Fitness Center',
    'peak-fitness-center',
    'State-of-the-art fitness facility with certified personal trainers, group classes, and top-tier equipment. Offering yoga, spinning, HIIT, and strength training.',
    cat_health,
    'Gym',
    '123 Mission Street',
    'Midtown',
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
    ARRAY['https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800', 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800'],
    ARRAY['personal_training', 'group_classes', 'showers', 'lockers', 'parking', 'sauna'],
    3,
    true,
    true,
    'premium',
    'claimed',
    1589
  ) RETURNING id INTO biz_peak_fitness;

  -- 6. Regal Cinema Midtown
  INSERT INTO public.businesses (
    id, owner_id, name, slug, description, category_id, subcategory,
    address, city, state, zip_code, latitude, longitude,
    phone, email, website, hours, logo_url, cover_image_url,
    amenities, price_range, subscription_tier,
    claim_status, view_count
  ) VALUES (
    gen_random_uuid(),
    admin_user_id,
    'Regal Cinema Midtown',
    'regal-cinema-midtown',
    '12-screen multiplex featuring the latest blockbusters and indie films. IMAX and 3D available. Premium seating with recliners.',
    cat_entertainment,
    'Movie Theater',
    '890 Market Street',
    'Midtown',
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
    ARRAY['imax', 'recliner_seats', 'online_tickets', 'reserved_seating', 'concessions'],
    3,
    'free',
    'unclaimed',
    2341
  ) RETURNING id INTO biz_regal_cinema;

  -- 7. Modern Art Gallery
  INSERT INTO public.businesses (
    id, owner_id, name, slug, description, category_id, subcategory,
    address, city, state, zip_code, latitude, longitude,
    phone, email, website, hours, logo_url, cover_image_url, images,
    amenities, price_range, is_verified, subscription_tier,
    claim_status, view_count
  ) VALUES (
    gen_random_uuid(),
    user1_id,
    'Modern Art Gallery',
    'modern-art-gallery',
    'Contemporary art gallery showcasing emerging and established artists. Monthly exhibitions, artist talks, and private viewings available.',
    cat_arts,
    'Art Gallery',
    '345 Grove Street',
    'Midtown',
    'CA',
    '94102',
    37.7779,
    -122.4224,
    '(415) 555-0245',
    'info@modernartgallery.com',
    'https://modernartgallery.example.com',
    '{"monday": "closed", "tuesday": {"open": "11:00", "close": "18:00"}, "wednesday": {"open": "11:00", "close": "18:00"}, "thursday": {"open": "11:00", "close": "20:00"}, "friday": {"open": "11:00", "close": "20:00"}, "saturday": {"open": "10:00", "close": "18:00"}, "sunday": {"open": "12:00", "close": "17:00"}}'::jsonb,
    'https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=400',
    'https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=1200',
    ARRAY['https://images.unsplash.com/photo-1577083552792-a0d461cb1dd6?w=800'],
    ARRAY['free_admission', 'guided_tours', 'artist_talks', 'private_events'],
    1,
    true,
    'basic',
    'claimed',
    567
  ) RETURNING id INTO biz_modern_gallery;

  -- 8. Summit Law Group
  INSERT INTO public.businesses (
    id, owner_id, name, slug, description, category_id, subcategory,
    address, city, state, zip_code, latitude, longitude,
    phone, email, website, hours, logo_url, cover_image_url,
    amenities, price_range, is_verified, subscription_tier,
    claim_status, view_count
  ) VALUES (
    gen_random_uuid(),
    admin_user_id,
    'Summit Law Group',
    'summit-law-group',
    'Full-service law firm specializing in business law, real estate, and estate planning. Experienced attorneys providing personalized legal solutions.',
    cat_professional,
    'Law Firm',
    '1200 Montgomery Street',
    'Midtown',
    'CA',
    '94133',
    37.7989,
    -122.4034,
    '(415) 555-0267',
    'contact@summitlaw.com',
    'https://summitlaw.example.com',
    '{"monday": {"open": "08:30", "close": "17:30"}, "tuesday": {"open": "08:30", "close": "17:30"}, "wednesday": {"open": "08:30", "close": "17:30"}, "thursday": {"open": "08:30", "close": "17:30"}, "friday": {"open": "08:30", "close": "17:00"}, "saturday": "closed", "sunday": "closed"}'::jsonb,
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400',
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200',
    ARRAY['free_consultation', 'virtual_meetings', 'parking', 'multilingual'],
    4,
    true,
    'basic',
    'claimed',
    423
  ) RETURNING id INTO biz_summit_law;

  -- 9. Bella Italia Trattoria
  INSERT INTO public.businesses (
    id, owner_id, name, slug, description, category_id, subcategory,
    address, city, state, zip_code, latitude, longitude,
    phone, email, website, hours, logo_url, cover_image_url, images,
    amenities, price_range, is_verified, is_featured, subscription_tier,
    claim_status, view_count
  ) VALUES (
    gen_random_uuid(),
    user1_id,
    'Bella Italia Trattoria',
    'bella-italia-trattoria',
    'Authentic Italian restaurant serving homemade pasta, wood-fired pizzas, and classic Italian dishes. Family recipes passed down through generations.',
    cat_restaurants,
    'Italian',
    '678 Columbus Avenue',
    'Midtown',
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
    ARRAY['https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800', 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800'],
    ARRAY['reservations', 'outdoor_seating', 'wine_list', 'private_dining', 'romantic'],
    3,
    true,
    true,
    'featured',
    'claimed',
    1876
  ) RETURNING id INTO biz_bella_italia;

  -- 10. The Corner Cafe
  INSERT INTO public.businesses (
    id, owner_id, name, slug, description, category_id, subcategory,
    address, city, state, zip_code, latitude, longitude,
    phone, email, website, hours, logo_url, cover_image_url,
    amenities, price_range, subscription_tier,
    claim_status, view_count
  ) VALUES (
    gen_random_uuid(),
    admin_user_id,
    'The Corner Cafe',
    'the-corner-cafe',
    'Cozy neighborhood cafe serving breakfast all day, fresh sandwiches, and homemade pastries. Great spot for brunch with friends.',
    cat_cafes,
    'Cafe',
    '234 Divisadero Street',
    'Midtown',
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
    'free',
    'unclaimed',
    789
  ) RETURNING id INTO biz_corner_cafe;

  -- 11. Midtown Farmers Market
  INSERT INTO public.businesses (
    id, owner_id, name, slug, description, category_id, subcategory,
    address, city, state, zip_code, latitude, longitude,
    phone, email, website, hours, logo_url, cover_image_url,
    amenities, price_range, subscription_tier,
    claim_status, view_count
  ) VALUES (
    gen_random_uuid(),
    admin_user_id,
    'Midtown Farmers Market',
    'midtown-farmers-market',
    'Weekly farmers market featuring local produce, artisanal foods, fresh flowers, and handmade goods from regional vendors.',
    cat_retail,
    'Farmers Market',
    'Civic Center Plaza',
    'Midtown',
    'CA',
    '94102',
    37.7799,
    -122.4134,
    '(415) 555-0323',
    'info@midtownmarket.org',
    'https://midtownmarket.example.com',
    '{"saturday": {"open": "08:00", "close": "14:00"}, "sunday": {"open": "09:00", "close": "14:00"}}'::jsonb,
    'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400',
    'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1200',
    ARRAY['local_vendors', 'organic', 'family_friendly', 'pet_friendly', 'live_music'],
    2,
    'free',
    'unclaimed',
    1234
  ) RETURNING id INTO biz_midtown_market;

  -- 12. Serenity Wellness Spa
  INSERT INTO public.businesses (
    id, owner_id, name, slug, description, category_id, subcategory,
    address, city, state, zip_code, latitude, longitude,
    phone, email, website, hours, logo_url, cover_image_url, images,
    amenities, price_range, is_verified, subscription_tier,
    claim_status, view_count
  ) VALUES (
    gen_random_uuid(),
    user1_id,
    'Serenity Wellness Spa',
    'serenity-wellness-spa',
    'Luxurious day spa offering massages, facials, body treatments, and holistic wellness services. Escape the city stress and rejuvenate.',
    cat_health,
    'Spa',
    '456 Sutter Street',
    'Midtown',
    'CA',
    '94108',
    37.7889,
    -122.4074,
    '(415) 555-0345',
    'book@serenityspa.com',
    'https://serenityspa.example.com',
    '{"monday": {"open": "09:00", "close": "20:00"}, "tuesday": {"open": "09:00", "close": "20:00"}, "wednesday": {"open": "09:00", "close": "20:00"}, "thursday": {"open": "09:00", "close": "21:00"}, "friday": {"open": "09:00", "close": "21:00"}, "saturday": {"open": "08:00", "close": "20:00"}, "sunday": {"open": "09:00", "close": "19:00"}}'::jsonb,
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400',
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200',
    ARRAY['https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800'],
    ARRAY['appointments', 'couples_packages', 'gift_certificates', 'parking', 'relaxation_room'],
    4,
    true,
    'premium',
    'claimed',
    956
  ) RETURNING id INTO biz_wellness_spa;

  -- 13. Hop & Barrel Craft Brewery
  INSERT INTO public.businesses (
    id, owner_id, name, slug, description, category_id, subcategory,
    address, city, state, zip_code, latitude, longitude,
    phone, email, website, hours, logo_url, cover_image_url, images,
    amenities, price_range, is_verified, subscription_tier,
    claim_status, view_count
  ) VALUES (
    gen_random_uuid(),
    admin_user_id,
    'Hop & Barrel Craft Brewery',
    'hop-barrel-craft-brewery',
    'Local craft brewery specializing in IPAs, stouts, and seasonal brews. Taproom with rotating selection and brewery tours available.',
    cat_entertainment,
    'Brewery',
    '789 Howard Street',
    'Midtown',
    'CA',
    '94103',
    37.7819,
    -122.3984,
    '(415) 555-0367',
    'taproom@hopbarrel.com',
    'https://hopbarrel.example.com',
    '{"monday": "closed", "tuesday": {"open": "15:00", "close": "22:00"}, "wednesday": {"open": "15:00", "close": "22:00"}, "thursday": {"open": "15:00", "close": "23:00"}, "friday": {"open": "12:00", "close": "00:00"}, "saturday": {"open": "12:00", "close": "00:00"}, "sunday": {"open": "12:00", "close": "21:00"}}'::jsonb,
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=1200',
    ARRAY['https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=800'],
    ARRAY['outdoor_seating', 'brewery_tours', 'live_music', 'food_trucks', 'dog_friendly'],
    2,
    true,
    'basic',
    'claimed',
    1445
  ) RETURNING id INTO biz_craft_brewery;

  -- 14. Sakura Sushi Bar
  INSERT INTO public.businesses (
    id, owner_id, name, slug, description, category_id, subcategory,
    address, city, state, zip_code, latitude, longitude,
    phone, email, website, hours, logo_url, cover_image_url,
    amenities, price_range, is_verified, is_featured, subscription_tier,
    claim_status, view_count
  ) VALUES (
    gen_random_uuid(),
    user1_id,
    'Sakura Sushi Bar',
    'sakura-sushi-bar',
    'Premium sushi and Japanese cuisine. Fresh fish delivered daily, omakase available. Intimate setting with counter seating.',
    cat_restaurants,
    'Japanese',
    '321 Geary Street',
    'Midtown',
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
    ARRAY['reservations', 'omakase', 'sake_selection', 'counter_seating', 'romantic'],
    4,
    true,
    true,
    'premium',
    'claimed',
    1678
  ) RETURNING id INTO biz_sakura_sushi;

  -- 15. TechFix Repair Shop
  INSERT INTO public.businesses (
    id, owner_id, name, slug, description, category_id, subcategory,
    address, city, state, zip_code, latitude, longitude,
    phone, email, website, hours, logo_url, cover_image_url,
    amenities, price_range, subscription_tier,
    claim_status, view_count
  ) VALUES (
    gen_random_uuid(),
    admin_user_id,
    'TechFix Repair Shop',
    'techfix-repair-shop',
    'Professional electronics repair for smartphones, tablets, laptops, and computers. Same-day service available for most repairs.',
    cat_services,
    'Electronics Repair',
    '567 Mission Street',
    'Midtown',
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
    ARRAY['same_day_service', 'warranty', 'walk_ins', 'free_diagnostics'],
    2,
    'free',
    'unclaimed',
    512
  ) RETURNING id INTO biz_tech_repair;

  -- ============================================
  -- INSERT SAMPLE REVIEWS
  -- ============================================

  -- Reviews for Golden Dragon Restaurant
  INSERT INTO public.reviews (business_id, user_id, rating, title, content, helpful_count) VALUES
    (biz_golden_dragon, user1_id, 5, 'Best Chinese food in Midtown!', 'Absolutely love this place. The Kung Pao Chicken is incredible and the service is always friendly. Been coming here for years and it never disappoints.', 12),
    (biz_golden_dragon, user2_id, 4, 'Great food, long wait times', 'The food is delicious but be prepared to wait, especially on weekends. The dim sum brunch is worth it though!', 8);

  -- Reviews for Blue Bottle Coffee
  INSERT INTO public.reviews (business_id, user_id, rating, title, content, helpful_count) VALUES
    (biz_blue_bottle, user2_id, 5, 'Perfect coffee spot', 'Best coffee in the neighborhood. The baristas really know their craft. Great place to work remotely with good WiFi.', 15);

  -- Reviews for Peak Fitness Center
  INSERT INTO public.reviews (business_id, user_id, rating, title, content, helpful_count) VALUES
    (biz_peak_fitness, user1_id, 5, 'Amazing gym with great trainers', 'The equipment is top-notch and always well-maintained. The personal trainers are knowledgeable and motivating. Worth every penny!', 23),
    (biz_peak_fitness, user2_id, 4, 'Good gym, can get crowded', 'Great facility overall. My only complaint is it gets very crowded during peak hours (5-7pm). Early morning sessions are perfect though.', 11);

  -- Reviews for Bella Italia Trattoria
  INSERT INTO public.reviews (business_id, user_id, rating, title, content, helpful_count) VALUES
    (biz_bella_italia, user2_id, 5, 'Authentic Italian experience', 'This is the real deal! The pasta is made fresh daily and you can taste the quality. The tiramisu is to die for. Perfect for date night.', 19);

  -- Reviews for Sakura Sushi Bar
  INSERT INTO public.reviews (business_id, user_id, rating, title, content, helpful_count) VALUES
    (biz_sakura_sushi, user1_id, 5, 'Best sushi in the city', 'The omakase experience here is outstanding. Chef-san is incredibly talented and the fish quality is impeccable. Reserve well in advance!', 27);

  -- Reviews for Serenity Wellness Spa
  INSERT INTO public.reviews (business_id, user_id, rating, title, content, helpful_count) VALUES
    (biz_wellness_spa, user2_id, 5, 'Pure relaxation', 'Had the most amazing couples massage here. The therapists are skilled and the atmosphere is so peaceful. Highly recommend!', 14);

  -- Reviews for Hop & Barrel Craft Brewery
  INSERT INTO public.reviews (business_id, user_id, rating, title, content, helpful_count) VALUES
    (biz_craft_brewery, user1_id, 4, 'Great local brewery', 'Love supporting local breweries and this one does not disappoint. The IPA selection is excellent and the taproom has a great vibe.', 9);

  RAISE NOTICE 'Seed data inserted successfully!';
  RAISE NOTICE 'Created % businesses with sample reviews', 15;
  RAISE NOTICE 'Note: Replace sample user IDs with real auth.users IDs for production';

END $$;

-- ============================================
-- SEED DATA COMPLETE
-- ============================================
-- You can now browse the businesses in your application
