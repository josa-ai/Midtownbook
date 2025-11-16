-- ============================================
-- Mid-Town Lakeland Positioning Migration
-- Adds fields to support the Mid-Town positioning strategy
-- ============================================

-- ============================================
-- 1. BUSINESSES TABLE ENHANCEMENTS
-- ============================================

-- Add Mid-Town specific fields to businesses table
alter table public.businesses
  add column if not exists distance_to_bonnet_springs decimal(10, 2),
  add column if not exists distance_to_tigers_stadium decimal(10, 2),
  add column if not exists is_park_adjacent boolean default false not null,
  add column if not exists is_game_day_venue boolean default false not null,
  add column if not exists memorial_boulevard_location boolean default false not null,
  add column if not exists business_tags text[] default array[]::text[];

-- Add indexes for new fields
create index if not exists businesses_distance_to_bonnet_springs_idx
  on businesses(distance_to_bonnet_springs) where distance_to_bonnet_springs is not null;

create index if not exists businesses_distance_to_tigers_stadium_idx
  on businesses(distance_to_tigers_stadium) where distance_to_tigers_stadium is not null;

create index if not exists businesses_is_park_adjacent_idx
  on businesses(is_park_adjacent) where is_park_adjacent = true;

create index if not exists businesses_is_game_day_venue_idx
  on businesses(is_game_day_venue) where is_game_day_venue = true;

create index if not exists businesses_memorial_boulevard_location_idx
  on businesses(memorial_boulevard_location) where memorial_boulevard_location = true;

create index if not exists businesses_tags_idx
  on businesses using gin(business_tags);

-- Add comment explaining the new fields
comment on column public.businesses.distance_to_bonnet_springs is
  'Distance in miles from business to Bonnet Springs Park';

comment on column public.businesses.distance_to_tigers_stadium is
  'Distance in miles from business to Joker Marchant Stadium';

comment on column public.businesses.is_park_adjacent is
  'True if business is within walking distance (0.5 miles) of Bonnet Springs Park';

comment on column public.businesses.is_game_day_venue is
  'True if business caters to Tigers game day crowds';

comment on column public.businesses.memorial_boulevard_location is
  'True if business is located on Memorial Boulevard';

comment on column public.businesses.business_tags is
  'Array of tags like "park-adjacent", "game-day-dining", "show-your-ticket"';

-- ============================================
-- 2. DEALS TABLE ENHANCEMENTS
-- ============================================

-- Add deal type field to support "Show Your Ticket" promotions
alter table public.deals
  add column if not exists deal_category text default 'standard'
    check (deal_category in ('standard', 'show_your_ticket', 'park_visitor', 'game_day', 'memorial_boulevard_special')),
  add column if not exists requires_proof boolean default false not null,
  add column if not exists proof_type text
    check (proof_type is null or proof_type in ('park_receipt', 'park_ticket', 'game_ticket', 'parking_receipt'));

-- Add index for deal categories
create index if not exists deals_deal_category_idx on deals(deal_category);

-- Add comments
comment on column public.deals.deal_category is
  'Type of deal: standard, show_your_ticket, park_visitor, game_day, or memorial_boulevard_special';

comment on column public.deals.requires_proof is
  'True if customer must show proof (ticket, receipt, etc.) to redeem deal';

comment on column public.deals.proof_type is
  'Type of proof required: park_receipt, park_ticket, game_ticket, or parking_receipt';

-- ============================================
-- 3. EVENTS TABLE ENHANCEMENTS
-- ============================================

-- Add event type field to categorize events
alter table public.events
  add column if not exists event_type text default 'general'
    check (event_type in ('general', 'park_event', 'tigers_game', 'memorial_boulevard_event', 'neighborhood_activity')),
  add column if not exists is_featured_event boolean default false not null,
  add column if not exists related_attraction text
    check (related_attraction is null or related_attraction in ('bonnet_springs_park', 'tigers_stadium', 'memorial_boulevard'));

-- Add indexes
create index if not exists events_event_type_idx on events(event_type);
create index if not exists events_is_featured_event_idx on events(is_featured_event) where is_featured_event = true;
create index if not exists events_related_attraction_idx on events(related_attraction) where related_attraction is not null;

-- Add comments
comment on column public.events.event_type is
  'Category of event: general, park_event, tigers_game, memorial_boulevard_event, or neighborhood_activity';

comment on column public.events.is_featured_event is
  'True if this is a featured event that should be prominently displayed';

comment on column public.events.related_attraction is
  'Which major attraction this event is related to: bonnet_springs_park, tigers_stadium, or memorial_boulevard';

-- ============================================
-- 4. HELPER FUNCTIONS
-- ============================================

-- Function to calculate distance from Bonnet Springs Park
-- Bonnet Springs Park coordinates: 28.039, -81.9577
create or replace function calculate_distance_to_bonnet_springs(
  business_lat decimal,
  business_lng decimal
)
returns decimal as $$
declare
  park_lat constant decimal := 28.039;
  park_lng constant decimal := -81.9577;
  distance_meters decimal;
  distance_miles decimal;
begin
  distance_meters := earth_distance(
    ll_to_earth(park_lat::float8, park_lng::float8),
    ll_to_earth(business_lat::float8, business_lng::float8)
  );

  -- Convert meters to miles (1 meter = 0.000621371 miles)
  distance_miles := round((distance_meters * 0.000621371)::numeric, 2);

  return distance_miles;
end;
$$ language plpgsql immutable;

-- Function to calculate distance from Joker Marchant Stadium
-- Joker Marchant Stadium coordinates: 28.0747, -81.9786
create or replace function calculate_distance_to_tigers_stadium(
  business_lat decimal,
  business_lng decimal
)
returns decimal as $$
declare
  stadium_lat constant decimal := 28.0747;
  stadium_lng constant decimal := -81.9786;
  distance_meters decimal;
  distance_miles decimal;
begin
  distance_meters := earth_distance(
    ll_to_earth(stadium_lat::float8, stadium_lng::float8),
    ll_to_earth(business_lat::float8, business_lng::float8)
  );

  -- Convert meters to miles
  distance_miles := round((distance_meters * 0.000621371)::numeric, 2);

  return distance_miles;
end;
$$ language plpgsql immutable;

-- Function to auto-calculate Mid-Town fields when business is inserted/updated
create or replace function auto_calculate_midtown_fields()
returns trigger as $$
begin
  -- Calculate distances
  new.distance_to_bonnet_springs := calculate_distance_to_bonnet_springs(
    new.latitude,
    new.longitude
  );

  new.distance_to_tigers_stadium := calculate_distance_to_tigers_stadium(
    new.latitude,
    new.longitude
  );

  -- Auto-set park_adjacent if within 0.5 miles
  if new.distance_to_bonnet_springs <= 0.5 then
    new.is_park_adjacent := true;
  end if;

  -- Auto-set game_day_venue if within 0.75 miles of stadium
  if new.distance_to_tigers_stadium <= 0.75 then
    new.is_game_day_venue := true;
  end if;

  return new;
end;
$$ language plpgsql;

-- Trigger to auto-calculate Mid-Town fields
drop trigger if exists auto_calculate_midtown_fields_trigger on businesses;
create trigger auto_calculate_midtown_fields_trigger
  before insert or update of latitude, longitude on businesses
  for each row
  execute function auto_calculate_midtown_fields();

-- ============================================
-- 5. HELPFUL QUERIES/VIEWS
-- ============================================

-- View for park-adjacent businesses
create or replace view park_adjacent_businesses as
select
  b.*,
  c.name as category_name,
  c.slug as category_slug
from businesses b
join categories c on b.category_id = c.id
where b.is_park_adjacent = true
  and b.is_active = true
order by b.distance_to_bonnet_springs;

-- View for game-day venues
create or replace view game_day_venues as
select
  b.*,
  c.name as category_name,
  c.slug as category_slug
from businesses b
join categories c on b.category_id = c.id
where b.is_game_day_venue = true
  and b.is_active = true
order by b.distance_to_tigers_stadium;

-- View for Memorial Boulevard businesses
create or replace view memorial_boulevard_businesses as
select
  b.*,
  c.name as category_name,
  c.slug as category_slug
from businesses b
join categories c on b.category_id = c.id
where b.memorial_boulevard_location = true
  and b.is_active = true
order by b.name;

-- View for "Show Your Ticket" deals
create or replace view show_your_ticket_deals as
select
  d.*,
  b.name as business_name,
  b.slug as business_slug,
  b.address,
  b.distance_to_bonnet_springs,
  b.distance_to_tigers_stadium
from deals d
join businesses b on d.business_id = b.id
where d.deal_category = 'show_your_ticket'
  and d.is_active = true
  and d.start_date <= now()
  and d.end_date >= now()
order by d.created_at desc;

-- ============================================
-- 6. UPDATE EXISTING DATA (if needed)
-- ============================================

-- Update distances for all existing businesses
update businesses
set
  distance_to_bonnet_springs = calculate_distance_to_bonnet_springs(latitude, longitude),
  distance_to_tigers_stadium = calculate_distance_to_tigers_stadium(latitude, longitude),
  is_park_adjacent = calculate_distance_to_bonnet_springs(latitude, longitude) <= 0.5,
  is_game_day_venue = calculate_distance_to_tigers_stadium(latitude, longitude) <= 0.75
where latitude is not null and longitude is not null;

-- ============================================
-- MIGRATION COMPLETE
-- ============================================
-- New fields added to support Mid-Town Lakeland positioning
-- Auto-calculation triggers in place
-- Helper views created for common queries
