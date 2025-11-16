# Mid-Town Lakeland Content Strategy

## Overview

This document outlines the content strategy for launching the Mid-Town Lakeland Directory with a focus on positioning the area around its two world-class attractions: Bonnet Springs Park (USA Today's #1 City Park) and Detroit Tigers Spring Training.

## Phase 1: Core Business Listings (Week 1-2)

### Priority Categories

Focus on businesses that directly benefit from park/stadium traffic:

#### 1. Dining & Restaurants
**Target: 15-20 businesses**

Memorial Boulevard corridor:
- Red Door Lakeland
- Harry's Seafood Bar & Grille
- Mitchell's Coffee House
- Cob & Pen
- Black & Brew Coffee House
- Palace Pizza
- Nineteen61

Near Bonnet Springs Park (within 0.5 miles):
- Search for businesses at:
  - E Memorial Blvd & Lake Bonnet Dr intersection
  - Memorial Blvd & Crystal Lake Dr area

Near Tigers Stadium:
- Businesses along Lakeland Hills Blvd
- Lake Miriam Drive establishments

**Data to collect for each:**
- Exact address (for automatic distance calculation)
- Phone, website, hours
- Price range ($ - $$$$)
- Specialties/cuisine type
- "Show Your Ticket" deal potential

#### 2. Coffee Shops & Cafes
**Target: 5-8 businesses**

Ideal for pre-park visits and post-game meetups:
- Mitchell's Coffee House
- Black & Brew Coffee House
- Grasslands Brewing Company (coffee + brewery)
- Poor Porker (coffee + BBQ)

#### 3. Retail & Shopping
**Target: 10-15 businesses**

Focus on Memorial Boulevard and nearby:
- Antique shops
- Boutiques
- Gift shops
- Sports memorabilia (for Tigers fans)

#### 4. Services
**Target: 8-12 businesses**

- Hotels near park/stadium
- Parking facilities
- Bike rentals
- Event venues

### Initial Business Onboarding Checklist

For each business:

```markdown
- [ ] Business name and slug
- [ ] Complete address (latitude/longitude will auto-calculate)
- [ ] Category assignment
- [ ] Contact information (phone, email, website)
- [ ] Business hours
- [ ] Price range
- [ ] Photos (logo, cover image, gallery)
- [ ] Business description (highlighting proximity to park/stadium)
- [ ] Amenities
- [ ] Tags: park-adjacent, game-day-dining, memorial-boulevard, etc.
```

## Phase 2: "Show Your Ticket" Deal Campaign (Week 3)

### Deal Strategy

Target 8-12 businesses for launch deals:

#### Deal Categories to Create:

1. **Park Visitor Deals**
   - "Show your Bonnet Springs parking receipt"
   - "Flash your park wristband"
   - Valid same-day only

2. **Tigers Game Day Deals**
   - "Show your game ticket stub"
   - "Wear Tigers gear for discount"
   - Valid on game days + 2 hours after

3. **Memorial Boulevard Specials**
   - Weekend promotions
   - First Friday events
   - Art walk specials

#### Example Deals:

```typescript
{
  title: "Park Visitor Special - 20% Off Lunch",
  description: "Visited Bonnet Springs Park today? Show your parking receipt or admission and get 20% off any lunch entrée",
  dealCategory: "park_visitor",
  requiresProof: true,
  proofType: "park_receipt",
  discountType: "percentage",
  discountValue: 20,
  startDate: "2025-03-01",
  endDate: "2025-12-31"
}

{
  title: "Tigers Game Day Special",
  description: "Show your Tigers game ticket stub and get 15% off your entire bill on game days",
  dealCategory: "game_day",
  requiresProof: true,
  proofType: "game_ticket",
  discountType: "percentage",
  discountValue: 15
}
```

### Business Outreach for Deals

Email template:
```
Subject: Partner with Mid-Town Lakeland to Attract Park & Stadium Visitors

Hi [Business Name],

Bonnet Springs Park attracts over 1 million visitors annually, and Tigers Spring Training brings thousands of fans to Mid-Town Lakeland each spring.

We're launching a "Show Your Ticket" promotion to connect these visitors with local businesses like yours.

Would you be interested in offering a special deal for:
- Bonnet Springs Park visitors
- Tigers game attendees
- Memorial Boulevard shoppers

Your business is perfectly positioned at [X.X miles from park/stadium], and we'd love to feature you in our directory.

Best regards,
Mid-Town Lakeland Directory Team
```

## Phase 3: Event Calendar (Week 3-4)

### Event Types to Add:

#### 1. Bonnet Springs Park Events
- Concert series
- Festivals
- Educational programs
- Seasonal events
- Park runs/walks

**Data sources:**
- https://bonnetspringspark.org/events
- Park's social media

#### 2. Tigers Spring Training Schedule
- Game schedule (February - March)
- Fan fest events
- Meet & greets
- Special promotions

**Data sources:**
- https://www.milb.com/lakeland/schedule
- Tigers official website

#### 3. Memorial Boulevard Events
- First Friday events
- Art walks
- Street festivals
- Community gatherings

#### 4. Business-Hosted Events
- Grand openings
- Live music
- Tastings
- Workshops

### Event Entry Template:

```typescript
{
  title: "Summer Concert Series at Bonnet Springs",
  eventType: "park_event",
  relatedAttraction: "bonnet_springs_park",
  isFeaturedEvent: true,
  startDate: "2025-06-06T18:00:00",
  endDate: "2025-06-06T21:00:00",
  location: "Bonnet Springs Park Amphitheater",
  price: 0, // or ticket price
  description: "Live music featuring local artists every Friday evening..."
}
```

## Phase 4: SEO Content & Blog (Week 4-6)

### Key Landing Pages to Create:

1. **Neighborhood Guides**
   - `/neighborhoods/memorial-boulevard`
   - `/neighborhoods/lake-bonnet`
   - `/neighborhoods/downtown-lakeland`

2. **Category Pages with Local Angle**
   - `/restaurants/park-adjacent`
   - `/dining/game-day-venues`
   - `/coffee-shops/memorial-boulevard`

3. **Blog Content**
   - "Top 10 Restaurants Near Bonnet Springs Park"
   - "Where to Eat Before/After a Tigers Game"
   - "Memorial Boulevard: Lakeland's Restaurant Row"
   - "Make the Most of Your Park Visit: Local Tips"
   - "Tigers Spring Training Guide: Beyond the Ballpark"

### SEO Keywords to Target:

**Primary:**
- Mid-Town Lakeland
- Bonnet Springs Park restaurants
- Detroit Tigers Spring Training dining
- Memorial Boulevard Lakeland
- Lakeland Florida businesses

**Long-tail:**
- "restaurants near Bonnet Springs Park"
- "where to eat near Tigers Spring Training"
- "best coffee shops Mid-Town Lakeland"
- "things to do after Bonnet Springs Park"
- "game day dining Lakeland Florida"

## Phase 5: Business Owner Outreach (Week 5-8)

### Claiming & Verification Strategy

#### Tier 1: Personal Outreach
**Target: Top 20 businesses**

Personal visit or call to:
- Explain the platform
- Set up their profile
- Create their first deal
- Take professional photos

#### Tier 2: Email Campaign
**Target: Next 30-50 businesses**

Series of 3 emails:
1. Introduction & value proposition
2. Platform features & benefits
3. Success stories & call-to-action

#### Tier 3: Self-Service
**Target: All others**

- Clear "Claim Your Business" workflow
- Video tutorials
- FAQ section
- Support email

### Business Owner Benefits to Highlight:

✅ Free business listing
✅ Targeted to park/stadium visitors
✅ Special deal promotion capabilities
✅ Event listing features
✅ Analytics on views & interactions
✅ Direct connection to 1M+ annual park visitors
✅ Tigers Spring Training fan base

## Phase 6: Social Media Integration (Week 6-8)

### Platform Strategy:

#### Instagram
- Business spotlights
- "Show Your Ticket" deal highlights
- Park event coverage
- Tigers game day content
- User-generated content (tag #MidTownLakeland)

#### Facebook
- Community group integration
- Event promotion
- Business features
- Local news sharing

#### Content Calendar:

**Monday:** Business Spotlight
**Tuesday:** Deal of the Day
**Wednesday:** Mid-Town History/Fun Facts
**Thursday:** Event This Weekend
**Friday:** Weekend Guide
**Saturday:** Park/Stadium Event Coverage
**Sunday:** Community Feature

## Phase 7: Partnership Development (Ongoing)

### Key Partnerships to Establish:

1. **Bonnet Springs Park Foundation**
   - Official directory partnership
   - Cross-promotion
   - Event collaboration
   - Visitor information integration

2. **Detroit Tigers / Lakeland Flying Tigers**
   - Game day promotion
   - Fan guide integration
   - Season ticket holder benefits
   - Team merchandise deals

3. **Lakeland Downtown Development Authority**
   - Official Mid-Town resource
   - Business referral program
   - Event coordination
   - Marketing collaboration

4. **Visit Central Florida / Visit Lakeland**
   - Tourism promotion
   - Visitor guide inclusion
   - Website integration
   - Co-marketing opportunities

## Success Metrics

### Month 1 Goals:
- 40+ businesses listed
- 10+ "Show Your Ticket" deals active
- 20+ events in calendar
- 5 businesses claimed and verified

### Month 3 Goals:
- 100+ businesses listed
- 25+ active deals
- 50+ events listed
- 20+ verified business owners
- 1,000+ monthly visitors

### Month 6 Goals:
- 200+ businesses listed
- 50+ active deals
- Partnership with Bonnet Springs Park
- 5,000+ monthly visitors
- Measurable deal redemptions

## Quick Start Checklist

To launch with impact:

```markdown
- [ ] Add 10 Memorial Boulevard restaurants
- [ ] Add 5 park-adjacent businesses
- [ ] Add 5 game-day venues
- [ ] Create 5 "Show Your Ticket" deals
- [ ] Add Tigers Spring Training schedule
- [ ] Add 5 Bonnet Springs events
- [ ] Set up Google Analytics
- [ ] Create social media accounts
- [ ] Draft business owner outreach email
- [ ] Prepare launch announcement
```

## Tools & Resources

### Data Collection:
- Google Maps for business discovery
- Bonnet Springs Park website for events
- Tigers website for game schedule
- City of Lakeland business directory

### Photo Resources:
- Unsplash (placeholder images)
- Business websites (with permission)
- Original photography (preferred)

### Outreach Tools:
- Email templates (see above)
- Business owner portal guide
- Video tutorials
- Social media graphics

## Next Steps

1. **Immediate (This Week)**
   - Research and compile list of 40 target businesses
   - Prepare contact information spreadsheet
   - Draft "Show Your Ticket" deal partnerships

2. **Short Term (Next 2 Weeks)**
   - Begin data entry for core businesses
   - Reach out to 5-10 businesses personally
   - Set up social media accounts

3. **Medium Term (Next Month)**
   - Launch with initial business set
   - Begin business owner outreach campaign
   - Establish partnership discussions

4. **Long Term (Next 3 Months)**
   - Scale to 100+ businesses
   - Develop tourism partnerships
   - Measure and optimize performance

---

**Remember:** The Mid-Town Lakeland positioning is unique. You're not just another business directory - you're the bridge connecting world-class attractions to local businesses. Every piece of content should reinforce this value proposition.
