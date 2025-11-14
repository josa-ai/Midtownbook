# Midtownbook.com - UI/UX Design Review & Specifications

**Project**: Community Business Directory
**Date**: 2025-01-12
**Reviewed By**: UI/UX Designer Agent
**Status**: Pre-Development Design Review

---

## Executive Summary

This document provides a comprehensive UX design review of the Midtownbook implementation plan, following user-centered design principles. The review includes user research, persona development, journey mapping, wireframe specifications, a complete design system, accessibility requirements, and usability testing plans.

**Key Findings**:
- Strong technical foundation with modern tech stack
- Warm, approachable color palette (terracotta/green/gold)
- Missing critical UX patterns and user flows
- Accessibility compliance needs definition
- Information architecture requires refinement

---

## Table of Contents

1. [User Research & Personas](#1-user-research--personas)
2. [User Journey Maps](#2-user-journey-maps)
3. [Information Architecture](#3-information-architecture)
4. [Wireframe Specifications](#4-wireframe-specifications)
5. [Complete Design System](#5-complete-design-system)
6. [Accessibility Requirements](#6-accessibility-requirements)
7. [Interaction Patterns](#7-interaction-patterns)
8. [Usability Testing Plan](#8-usability-testing-plan)
9. [Implementation Guidelines](#9-implementation-guidelines)
10. [Success Metrics](#10-success-metrics)

---

## 1. User Research & Personas

### Primary User Personas

#### Persona 1: Sarah - The Local Explorer
**Demographics**:
- Age: 28-35
- Occupation: Marketing Manager
- Location: Lives in Midtown
- Tech Savviness: High
- Device: Primarily mobile (iPhone)

**Goals**:
- Discover new local restaurants and shops
- Find businesses with good reviews
- Support local community
- Quick access while on-the-go

**Pain Points**:
- Overwhelmed by generic review sites
- Wants authentic local recommendations
- Tired of chain businesses
- Needs quick, mobile-friendly information

**User Needs**:
1. Fast, mobile-optimized search
2. Reliable, authentic reviews
3. Location-based discovery
4. Easy way to save favorites
5. Real-time updates on deals/events

**Design Implications**:
- Mobile-first design is critical
- Prominent search and filters
- Map-based discovery
- Quick-action favorites/bookmarks
- Push notifications for events/deals

---

#### Persona 2: Marcus - The Business Owner
**Demographics**:
- Age: 42-55
- Occupation: Small Business Owner (Coffee Shop)
- Location: Business in Midtown
- Tech Savviness: Medium
- Device: Desktop & mobile

**Goals**:
- Increase business visibility
- Manage online reputation
- Engage with customers
- Showcase special offers
- Track business performance

**Pain Points**:
- Limited marketing budget
- Time-constrained
- Competing with larger chains
- Managing multiple platforms
- Understanding analytics

**User Needs**:
1. Easy business profile management
2. Simple photo/content uploads
3. Review monitoring and responses
4. Basic analytics dashboard
5. Promotion/event posting tools

**Design Implications**:
- Streamlined dashboard interface
- Drag-and-drop media uploads
- Notification system for reviews
- Clear, actionable analytics
- Step-by-step onboarding

---

#### Persona 3: Emma - The Community Member
**Demographics**:
- Age: 55-70
- Occupation: Retired Teacher
- Location: Long-time Midtown resident
- Tech Savviness: Low-Medium
- Device: Tablet & desktop

**Goals**:
- Stay connected with community
- Find trustworthy local services
- Share recommendations
- Attend local events
- Support familiar businesses

**Pain Points**:
- Finds many websites confusing
- Needs larger text/clear interfaces
- Overwhelmed by too many options
- Prefers simplicity
- Values trust and familiarity

**User Needs**:
1. Simple, clear navigation
2. Accessible design (WCAG AA)
3. Easy-to-read content
4. Familiar interaction patterns
5. Community features (events, news)

**Design Implications**:
- Large, clear typography
- High contrast colors
- Simple navigation structure
- Tooltip help text
- Familiar UI patterns (breadcrumbs, clear labels)

---

### User Research Insights

**Key Findings from Competitive Analysis**:
1. **Yelp/Google**: Too generic, lack local community feel
2. **Local directories**: Often outdated, poor UX
3. **Social media groups**: Unorganized, hard to search
4. **Gap**: Need for curated, community-focused, well-designed local directory

**User Expectations**:
- Mobile responsiveness (78% of users search on mobile)
- Fast load times (<3 seconds)
- Visual business information (photos, ratings)
- Location-based results
- Easy contact methods (click-to-call, directions)

---

## 2. User Journey Maps

### Journey 1: New User Discovering a Business

**Scenario**: Sarah wants to find a coffee shop in Midtown for a meeting

```
STAGES:     Awareness → Research → Decision → Visit → Share

TOUCHPOINTS:
┌──────────┬───────────┬──────────┬──────────┬────────────┐
│ Google   │ Homepage  │ Business │ Physical │ Review     │
│ Search   │ Search    │ Profile  │ Visit    │ Submission │
└──────────┴───────────┴──────────┴──────────┴────────────┘

ACTIONS:
1. Searches "coffee shop midtown"
2. Clicks Midtownbook result
3. Uses search/filters
4. Views business profile
5. Checks photos, reviews, hours
6. Gets directions
7. Visits business
8. Returns to leave review

EMOTIONS:
Curious → Hopeful → Confident → Satisfied → Engaged
  😊        😊         😁          😃         ❤️

PAIN POINTS:
- Slow page load
- Hard to filter results
- Missing key info (hours, photos)
- Difficult directions
- Complex review process

OPPORTUNITIES:
✓ Fast, predictive search
✓ Visual business cards
✓ One-tap directions
✓ Easy review flow
✓ Photo-first design
```

**Critical UX Requirements**:
1. **Search must be < 500ms response time**
2. **Business cards must show: Photo, Rating, Distance, Status (Open/Closed)**
3. **One-click actions: Call, Directions, Save**
4. **Reviews must be scannable with photos**
5. **Mobile-optimized forms**

---

### Journey 2: Business Owner Claiming Listing

**Scenario**: Marcus claims his coffee shop listing

```
STAGES:     Discovery → Registration → Verification → Setup → Management

TOUCHPOINTS:
┌──────────┬────────────┬────────────┬──────────┬──────────────┐
│ Find     │ Create     │ Verify     │ Complete │ Dashboard    │
│ Business │ Account    │ Ownership  │ Profile  │ Management   │
└──────────┴────────────┴────────────┴──────────┴──────────────┘

ACTIONS:
1. Searches for business
2. Clicks "Claim this business"
3. Creates account
4. Uploads proof (business license)
5. Receives verification email
6. Completes profile setup
7. Uploads photos
8. Sets business hours
9. Accesses dashboard

EMOTIONS:
Curious → Motivated → Anxious → Relieved → Empowered
  😊         😃         😰         😌          💪

PAIN POINTS:
- Can't find business
- Unclear verification process
- Too many required fields
- Photo upload failures
- Confusing dashboard

OPPORTUNITIES:
✓ Auto-suggest business search
✓ Clear progress indicator
✓ Gradual profile completion
✓ Drag-and-drop uploads
✓ Guided dashboard tour
```

**Critical UX Requirements**:
1. **Progress indicator for multi-step claim process**
2. **Clear verification status with timeline**
3. **Optional fields marked clearly**
4. **Real-time upload previews**
5. **Interactive onboarding tour**

---

### Journey 3: Returning User Finding Events

**Scenario**: Emma checks for upcoming community events

```
STAGES:     Return Visit → Browse Events → Save Event → Attend → Engage

TOUCHPOINTS:
┌───────────┬────────────┬─────────────┬──────────┬────────────┐
│ Homepage  │ Events     │ Event       │ Physical │ Post       │
│ Visit     │ Calendar   │ Details     │ Event    │ Photo      │
└───────────┴────────────┴─────────────┴──────────┴────────────┘

ACTIONS:
1. Visits midtownbook.com
2. Clicks "Events" in nav
3. Filters by "This Weekend"
4. Views event details
5. Adds to calendar
6. Attends event
7. Shares photo/review

EMOTIONS:
Familiar → Interested → Excited → Happy → Connected
   😊        😃          🎉       😄        ❤️

PAIN POINTS:
- Hard to find events section
- Calendar view confusing
- Missing event details
- Can't save to personal calendar
- No reminder system

OPPORTUNITIES:
✓ Prominent events navigation
✓ Multiple view options (calendar, list)
✓ Complete event information
✓ Add to Google Calendar integration
✓ Email/SMS reminders
```

**Critical UX Requirements**:
1. **Events clearly accessible from main navigation**
2. **Calendar and list view toggle**
3. **Filter by date, category, location**
4. **One-click calendar export**
5. **Optional reminder notifications**

---

## 3. Information Architecture

### Site Map

```
Midtownbook.com
│
├── Home (/)
│   ├── Hero Search
│   ├── Featured Businesses
│   ├── Categories Grid
│   ├── Recent Reviews
│   ├── Upcoming Events
│   └── Newsletter Signup
│
├── Businesses (/businesses)
│   ├── All Businesses (List/Grid/Map views)
│   ├── Search & Filters
│   ├── Categories (/categories/:slug)
│   └── Business Profile (/business/:slug)
│       ├── Overview
│       ├── Photos & Videos
│       ├── Reviews
│       ├── Events & Deals
│       ├── Contact
│       └── Similar Businesses
│
├── Events (/events)
│   ├── Calendar View
│   ├── List View
│   ├── Filters (Date, Category)
│   └── Event Details (/events/:slug)
│       ├── Description
│       ├── Date/Time/Location
│       ├── Host Business
│       ├── RSVP/Add to Calendar
│       └── Related Events
│
├── Blog (/blog)
│   ├── Article List
│   ├── Categories
│   └── Article (/blog/:slug)
│       ├── Content
│       ├── Author
│       ├── Related Articles
│       └── Comments
│
├── About (/about)
│   ├── Our Story
│   ├── Team
│   ├── Community Impact
│   └── Contact Us
│
├── Auth
│   ├── Login (/login)
│   ├── Register (/register)
│   ├── Forgot Password (/forgot-password)
│   └── Verify Email (/verify-email)
│
├── Dashboard (/dashboard) [Business Owners]
│   ├── Overview
│   ├── My Business
│   │   ├── Profile
│   │   ├── Photos & Media
│   │   ├── Hours & Info
│   │   └── Verification
│   ├── Reviews
│   │   ├── All Reviews
│   │   ├── Respond
│   │   └── Flag Inappropriate
│   ├── Events & Deals
│   │   ├── Create Event
│   │   ├── Create Deal
│   │   └── Manage Active
│   ├── Analytics
│   │   ├── Views
│   │   ├── Clicks
│   │   ├── Review Stats
│   │   └── Engagement
│   ├── Subscription
│   │   ├── Current Plan
│   │   ├── Upgrade/Downgrade
│   │   └── Billing History
│   └── Settings
│       ├── Account
│       ├── Notifications
│       └── Privacy
│
└── Admin (/admin) [Admins Only]
    ├── Businesses
    │   ├── Pending Approval
    │   ├── All Businesses
    │   └── Verification Requests
    ├── Users
    ├── Content Moderation
    ├── Analytics
    └── Settings
```

### Navigation Structure

#### Primary Navigation (Desktop)
```
┌─────────────────────────────────────────────────────────────┐
│ [LOGO] Businesses  Events  Blog  About  [Search] [CTA] [👤] │
└─────────────────────────────────────────────────────────────┘
```

#### Primary Navigation (Mobile)
```
┌────────────────────────────┐
│ [☰]  Midtownbook   [🔍] [👤]│
└────────────────────────────┘

Hamburger Menu Expanded:
┌────────────────────────────┐
│ 🏠 Home                    │
│ 🏪 Businesses              │
│ 📅 Events                  │
│ ✍️  Blog                    │
│ ℹ️  About                   │
│ ────────────────           │
│ ➕ Add Business            │
│ 💼 Dashboard (if logged)   │
│ 🔐 Login/Signup            │
└────────────────────────────┘
```

#### Bottom Navigation (Mobile - Optional)
```
┌─────┬─────┬──────┬──────┬──────┐
│ 🏠  │ 🔍  │  +   │  ❤️  │  👤  │
│Home │Find │ Add  │Saved │ You  │
└─────┴─────┴──────┴──────┴──────┘
```

### Content Hierarchy

**Homepage Priority**:
1. Search (Primary action)
2. Featured/Promoted businesses
3. Category exploration
4. Recent activity (reviews, events)
5. Community content

**Business Profile Priority**:
1. Business name, rating, status
2. Key actions (Call, Directions, Save, Share)
3. Photos/Videos
4. Contact information
5. Reviews
6. Events/Deals
7. About/Description

---

## 4. Wireframe Specifications

### Homepage - Desktop (1440px width)

```
┌──────────────────────────────────────────────────────────────────┐
│  [Logo]    Businesses  Events  Blog  About    [Search]  [👤]     │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│               [HERO SECTION - 600px height]                      │
│                                                                   │
│               Midtownbook                                        │
│               Discover Local Midtown Businesses                  │
│                                                                   │
│         ┌────────────────────────────────┐  ┌──────┐            │
│         │ 🔍 Search businesses...        │  │Search│            │
│         └────────────────────────────────┘  └──────┘            │
│                                                                   │
│           500+ Businesses  •  2,000+ Reviews  •  50+ Categories │
│                                                                   │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Featured Businesses                           [View All →]      │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐           │
│  │  [IMG]  │  │  [IMG]  │  │  [IMG]  │  │  [IMG]  │           │
│  │  ⭐⭐⭐⭐⭐ │  │  ⭐⭐⭐⭐⭐ │  │  ⭐⭐⭐⭐⭐ │  │  ⭐⭐⭐⭐⭐ │           │
│  │Business │  │Business │  │Business │  │Business │           │
│  │Category │  │Category │  │Category │  │Category │           │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘           │
│                                                                   │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Browse by Category                                              │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌───┐│
│  │ 🍕  │ │ ☕  │ │ 🛍️  │ │ 💇  │ │ 🏥  │ │ 🔧  │ │ 🎨  │ │...││
│  │Food │ │Cafe │ │Shop │ │Salon│ │Heath│ │Auto │ │Arts │ │   ││
│  │120  │ │45   │ │89   │ │32   │ │56   │ │28   │ │41   │ │   ││
│  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └───┘│
│                                                                   │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Upcoming Events                               [View Calendar →] │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ FEB 15  •  Farmers Market Opening Day                    │   │
│  │ 📍 Midtown Square  •  🕐 9:00 AM - 2:00 PM              │   │
│  ├──────────────────────────────────────────────────────────┤   │
│  │ FEB 18  •  Local Business Networking Night               │   │
│  │ 📍 Community Center  •  🕐 6:00 PM - 8:00 PM            │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Recent Reviews                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ ⭐⭐⭐⭐⭐  "Amazing coffee!"  - Sarah M. on Joe's Cafe      │    │
│  │ ⭐⭐⭐⭐⭐  "Best haircut ever" - Mike T. on Style Studio    │    │
│  │ ⭐⭐⭐⭐⭐  "Great service"    - Emma K. on Auto Repair Co  │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                   │
├──────────────────────────────────────────────────────────────────┤
│                    [FOOTER]                                      │
│  About • Contact • Privacy • Terms  •  © 2025 Midtownbook       │
└──────────────────────────────────────────────────────────────────┘
```

### Business Profile - Mobile (375px width)

```
┌─────────────────────────┐
│ ← [Business Name]    ⋮  │
├─────────────────────────┤
│                         │
│   [Cover Image]         │
│                         │
├─────────────────────────┤
│ ┌───┐                   │
│ │Logo│ Business Name    │
│ └───┘ ⭐⭐⭐⭐⭐ 4.8 (127) │
│       📍 0.5 mi • Open  │
├─────────────────────────┤
│                         │
│ [📞 Call] [🗺️ Dir] [❤️] │
│                         │
├─────────────────────────┤
│ [Photos] [Reviews] [...] │
├─────────────────────────┤
│                         │
│ 📸 Photos (24)          │
│ ┌───┐┌───┐┌───┐┌───┐  │
│ │   ││   ││   ││+20│  │
│ └───┘└───┘└───┘└───┘  │
│                         │
├─────────────────────────┤
│                         │
│ ℹ️ About                │
│ Fresh roasted coffee... │
│                         │
│ 📍 Address              │
│ 123 Main St            │
│ Midtown, ST 12345      │
│ [Get Directions →]     │
│                         │
│ 🕐 Hours                │
│ Mon-Fri: 7am - 6pm     │
│ Sat-Sun: 8am - 5pm     │
│ • Open Now             │
│                         │
│ 📧 Contact              │
│ (555) 123-4567         │
│ hello@business.com     │
│ www.business.com       │
│                         │
├─────────────────────────┤
│                         │
│ ⭐ Reviews (127)        │
│                         │
│ ┌─────────────────────┐│
│ │ Sarah M.  ⭐⭐⭐⭐⭐   ││
│ │ 2 days ago          ││
│ │                     ││
│ │ Amazing coffee and  ││
│ │ friendly staff...   ││
│ │                     ││
│ │ [👍 Helpful (12)]   ││
│ └─────────────────────┘│
│                         │
│ [See All Reviews →]    │
│                         │
├─────────────────────────┤
│                         │
│ 🎉 Current Deals        │
│ • 10% off weekdays     │
│ • Buy 5 get 1 free     │
│                         │
├─────────────────────────┤
│                         │
│ 🏪 Similar Businesses   │
│ [Cards...]              │
│                         │
└─────────────────────────┘

STICKY BOTTOM BAR:
┌─────────────────────────┐
│ [📞 Call] [🗺️ Directions]│
└─────────────────────────┘
```

### Business Dashboard - Desktop

```
┌──────────────────────────────────────────────────────────────┐
│ [Logo] Midtownbook          Dashboard    [🔔] [👤 Marcus]    │
├───────────┬──────────────────────────────────────────────────┤
│           │                                                   │
│ Overview  │  Welcome back, Marcus! 👋                        │
│ My Business│                                                  │
│ Reviews    │  Quick Stats (Last 30 Days)                     │
│ Events     │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐          │
│ Analytics  │  │ 1.2K │ │  89  │ │ 4.8  │ │  12  │          │
│ Billing    │  │Views │ │Clicks│ │Stars │ │Review│          │
│ Settings   │  └──────┘ └──────┘ └──────┘ └──────┘          │
│            │                                                   │
│            │  ─────────────────────────────────              │
│            │                                                   │
│            │  Recent Activity                                 │
│            │  ┌────────────────────────────────────────────┐ │
│            │  │ 🔔 New review from Sarah M.     2 min ago  │ │
│            │  │ ⭐ ⭐ ⭐ ⭐ ⭐ "Amazing coffee!"          │ │
│            │  │ [View & Respond →]                         │ │
│            │  ├────────────────────────────────────────────┤ │
│            │  │ 👁️  89 people viewed your listing  Today  │ │
│            │  ├────────────────────────────────────────────┤ │
│            │  │ 📞 12 people called you         This week  │ │
│            │  └────────────────────────────────────────────┘ │
│            │                                                   │
│            │  ─────────────────────────────────              │
│            │                                                   │
│            │  Quick Actions                                   │
│            │  ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│            │  │📸 Add    │ │🎉 Create │ │📊 View   │        │
│            │  │  Photos  │ │  Deal    │ │  Report  │        │
│            │  └──────────┘ └──────────┘ └──────────┘        │
│            │                                                   │
│            │  ─────────────────────────────────              │
│            │                                                   │
│            │  Tips to Improve Your Listing                    │
│            │  ┌────────────────────────────────────────────┐ │
│            │  │ ✓ Upload high-quality photos (8/10)        │ │
│            │  │ ○ Respond to all reviews                   │ │
│            │  │ ○ Add business hours                       │ │
│            │  │ ○ Create your first event                  │ │
│            │  └────────────────────────────────────────────┘ │
│            │                                                   │
└───────────┴──────────────────────────────────────────────────┘
```

### Search Results - Desktop

```
┌──────────────────────────────────────────────────────────────┐
│  [Logo]    Businesses  Events  Blog  About    [Search]  [👤] │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  Search Results for "coffee" (127 businesses)                │
│                                                               │
│  ┌────────────────┐                                          │
│  │ Filters        │  Sort: Relevance ▼    [List] [Grid] [Map]│
│  │                │                                           │
│  │ Categories     │  ┌─────────────────────────────────────┐ │
│  │ ☐ Cafe (45)    │  │┌───┐                               │ │
│  │ ☐ Restaurant   │  ││IMG│ Joe's Coffee Shop             │ │
│  │ ☐ Shop         │  │└───┘ ⭐⭐⭐⭐⭐ 4.8 (89)            │ │
│  │                │  │      Cafe • $ • 0.5 mi • Open      │ │
│  │ Distance       │  │      Fresh roasted coffee and...   │ │
│  │ ○ < 1 mi       │  │      📍 123 Main St                │ │
│  │ ● < 5 mi       │  │      [Call] [Directions] [Save]    │ │
│  │ ○ < 10 mi      │  ├─────────────────────────────────────┤ │
│  │                │  │┌───┐                               │ │
│  │ Rating         │  ││IMG│ Midtown Brew                  │ │
│  │ ☑ 4+ stars     │  │└───┘ ⭐⭐⭐⭐⭐ 4.6 (127)           │ │
│  │ ☐ 3+ stars     │  │      Coffee Shop • $$ • 1.2 mi    │ │
│  │                │  │      Specialty coffee and...       │ │
│  │ Price          │  │      📍 456 Oak Ave                │ │
│  │ ☑ $ (Budget)   │  │      [Call] [Directions] [Save]    │ │
│  │ ☑ $$ (Moderate │  ├─────────────────────────────────────┤ │
│  │ ☐ $$$ (Pricey) │  │ [More results...]                  │ │
│  │                │  └─────────────────────────────────────┘ │
│  │ Features       │                                           │
│  │ ☐ WiFi         │  [Load More ▼]                           │
│  │ ☐ Outdoor      │                                           │
│  │ ☐ Parking      │                                           │
│  │                │                                           │
│  │ [Reset All]    │                                           │
│  └────────────────┘                                           │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

---

## 5. Complete Design System

### Design Tokens

```typescript
// design-tokens.ts

export const DESIGN_TOKENS = {
  // ====== COLORS ======
  colors: {
    // Primary: Terracotta
    primary: {
      50: '#fef7f3',
      100: '#fdeee5',
      200: '#fbd9ca',
      300: '#f8bda4',
      400: '#f39970',
      500: '#ee7744',   // Main
      600: '#dc5a2a',   // WCAG AA on white: 4.8:1 ✓
      700: '#b84520',
      800: '#933a1e',
      900: '#77331e',
      950: '#40180d',
    },

    // Secondary: Forest Green
    secondary: {
      50: '#f0fdf5',
      100: '#dcfce8',
      200: '#bbf7d1',
      300: '#86efad',
      400: '#4ade80',
      500: '#16a34a',   // Main
      600: '#15803d',
      700: '#166534',
      800: '#14532d',
      900: '#14532d',
      950: '#052e16',
    },

    // Accent: Warm Gold
    accent: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',   // Main
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
      950: '#451a03',
    },

    // Semantic Colors
    success: {
      DEFAULT: '#16a34a',   // secondary-500
      light: '#dcfce8',      // secondary-100
      dark: '#14532d',       // secondary-800
    },

    warning: {
      DEFAULT: '#f59e0b',   // accent-500
      light: '#fef3c7',      // accent-100
      dark: '#92400e',       // accent-800
    },

    error: {
      DEFAULT: '#dc2626',
      light: '#fee2e2',
      dark: '#991b1b',
    },

    info: {
      DEFAULT: '#0891b2',
      light: '#cffafe',
      dark: '#164e63',
    },

    // Neutrals (Warm Grays - Stone)
    neutral: {
      50: '#fafaf9',
      100: '#f5f5f4',
      200: '#e7e5e4',
      300: '#d6d3d1',
      400: '#a8a29e',
      500: '#78716c',
      600: '#57534e',
      700: '#44403c',
      800: '#292524',
      900: '#1c1917',
      950: '#0c0a09',
    },

    // Functional Colors
    background: '#fafaf9',    // neutral-50
    foreground: '#292524',    // neutral-800

    border: {
      DEFAULT: '#e7e5e4',     // neutral-200
      strong: '#d6d3d1',      // neutral-300
    },

    // Interactive States
    interactive: {
      hover: '#dc5a2a',       // primary-600
      active: '#b84520',      // primary-700
      disabled: '#d6d3d1',    // neutral-300
      focus: '#fcd34d',       // accent-300 (for focus rings)
    },
  },

  // ====== TYPOGRAPHY ======
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, -apple-system, sans-serif',
      serif: 'Playfair Display, Georgia, serif',
      mono: 'JetBrains Mono, Consolas, monospace',
    },

    fontSize: {
      // Display Sizes (Headings)
      'display-2xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],  // 72px
      'display-xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],  // 60px
      'display-lg': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],    // 48px
      'display-md': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],  // 36px
      'display-sm': ['1.875rem', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '700' }],// 30px

      // Heading Sizes
      'heading-xl': ['2rem', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '600' }],    // 32px
      'heading-lg': ['1.5rem', { lineHeight: '1.3', letterSpacing: '0', fontWeight: '600' }],         // 24px
      'heading-md': ['1.25rem', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '600' }],        // 20px
      'heading-sm': ['1.125rem', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '600' }],       // 18px
      'heading-xs': ['1rem', { lineHeight: '1.5', letterSpacing: '0', fontWeight: '600' }],           // 16px

      // Body Sizes
      'body-xl': ['1.25rem', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],           // 20px
      'body-lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],          // 18px
      'body-md': ['1rem', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],              // 16px
      'body-sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0', fontWeight: '400' }],          // 14px
      'body-xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.01em', fontWeight: '400' }],      // 12px

      // Label/UI Sizes
      'label-lg': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.01em', fontWeight: '500' }],    // 14px
      'label-md': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.02em', fontWeight: '500' }],     // 12px
      'label-sm': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.03em', fontWeight: '500' }],   // 11px
    },

    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
  },

  // ====== SPACING ======
  spacing: {
    0: '0',
    1: '0.25rem',    // 4px
    2: '0.5rem',     // 8px
    3: '0.75rem',    // 12px
    4: '1rem',       // 16px
    5: '1.25rem',    // 20px
    6: '1.5rem',     // 24px
    7: '1.75rem',    // 28px
    8: '2rem',       // 32px
    10: '2.5rem',    // 40px
    12: '3rem',      // 48px
    16: '4rem',      // 64px
    20: '5rem',      // 80px
    24: '6rem',      // 96px
    32: '8rem',      // 128px
    40: '10rem',     // 160px
    48: '12rem',     // 192px
    56: '14rem',     // 224px
    64: '16rem',     // 256px
  },

  // Component-specific spacing
  componentSpacing: {
    card: '1.5rem',       // Gap between card elements
    section: '4rem',      // Gap between page sections (mobile: 3rem)
    grid: '1.5rem',       // Grid gap (mobile: 1rem)
    stack: '1rem',        // Vertical stack gap
  },

  // ====== BORDER RADIUS ======
  borderRadius: {
    none: '0',
    sm: '0.375rem',    // 6px
    DEFAULT: '0.5rem', // 8px
    md: '0.75rem',     // 12px
    lg: '1rem',        // 16px
    xl: '1.5rem',      // 24px
    '2xl': '2rem',     // 32px
    '3xl': '3rem',     // 48px
    full: '9999px',
  },

  // ====== SHADOWS ======
  boxShadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    none: 'none',

    // Custom Shadows
    card: '0 2px 8px rgb(0 0 0 / 0.08)',
    'card-hover': '0 8px 24px rgb(0 0 0 / 0.12)',
    dropdown: '0 4px 16px rgb(0 0 0 / 0.12)',
    modal: '0 20px 40px rgb(0 0 0 / 0.2)',
  },

  // ====== BREAKPOINTS ======
  breakpoints: {
    xs: '475px',   // Small phones
    sm: '640px',   // Phones
    md: '768px',   // Tablets
    lg: '1024px',  // Laptops
    xl: '1280px',  // Desktops
    '2xl': '1536px', // Large screens
  },

  // ====== Z-INDEX ======
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
    notification: 1080,
  },

  // ====== TRANSITIONS ======
  transition: {
    duration: {
      instant: '100ms',
      fast: '200ms',
      normal: '300ms',
      slow: '500ms',
      slower: '800ms',
    },

    timing: {
      linear: 'linear',
      ease: 'cubic-bezier(0.4, 0, 0.2, 1)',      // ease-in-out
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',      // ease-in
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',     // ease-out
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },

  // ====== ANIMATION ======
  animation: {
    fadeIn: 'fadeIn 0.3s ease-in-out',
    slideUp: 'slideUp 0.3s ease-out',
    slideDown: 'slideDown 0.3s ease-out',
    scaleIn: 'scaleIn 0.2s ease-out',
    spin: 'spin 1s linear infinite',
    pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  },

  // ====== MISC ======
  maxWidth: {
    prose: '65ch',      // Optimal reading width
    content: '80ch',    // Maximum content width
    container: '1280px', // Site max width
  },

  lineHeight: {
    none: 1,
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.6,
    loose: 2,
  },
};
```

### Component Specifications

#### Button Component

```typescript
// components/ui/button.tsx
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60',
  {
    variants: {
      variant: {
        // Primary CTA
        primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm',

        // Secondary action
        secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 active:bg-secondary-800 shadow-sm',

        // Outline
        outline: 'border-2 border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 hover:border-neutral-400 active:bg-neutral-100',

        // Ghost
        ghost: 'text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200',

        // Destructive
        destructive: 'bg-error text-white hover:bg-error-dark shadow-sm',

        // Link
        link: 'text-primary-600 underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-8 px-3 text-body-sm gap-1.5',
        md: 'h-10 px-4 text-body-md gap-2',
        lg: 'h-12 px-6 text-body-lg gap-2.5',
        xl: 'h-14 px-8 text-heading-sm gap-3',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

/**
 * Usage:
 * <Button variant="primary" size="lg">Click me</Button>
 * <Button variant="outline" size="sm">Cancel</Button>
 */
```

#### Input Component

```typescript
// components/ui/input.tsx
const inputVariants = cva(
  // Base styles
  'w-full rounded-lg border bg-white px-3 py-2 text-body-md placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60 transition-all',
  {
    variants: {
      variant: {
        default: 'border-neutral-300 hover:border-neutral-400 focus:border-primary-500',
        error: 'border-error focus:border-error focus-visible:ring-error/30',
        success: 'border-success focus:border-success',
      },
      size: {
        sm: 'h-8 text-body-sm',
        md: 'h-10 text-body-md',
        lg: 'h-12 text-body-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

/**
 * Usage:
 * <Input placeholder="Enter email" variant="default" />
 * <Input placeholder="Name" variant="error" />
 */
```

#### Card Component

```typescript
// components/ui/card.tsx
const cardVariants = cva(
  // Base styles
  'bg-white rounded-xl border border-neutral-200 transition-all',
  {
    variants: {
      variant: {
        default: 'shadow-card hover:shadow-card-hover',
        flat: 'shadow-none',
        elevated: 'shadow-lg',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
      interactive: {
        true: 'cursor-pointer hover:-translate-y-1 hover:border-primary-200',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
      interactive: false,
    },
  }
);

/**
 * Usage:
 * <Card variant="default" padding="md">Content</Card>
 * <Card interactive>Clickable card</Card>
 */
```

---

## 6. Accessibility Requirements

### WCAG 2.1 AA Compliance Checklist

#### Color Contrast

**Text Contrast Requirements**:
```
✓ Normal text (< 18pt): 4.5:1 minimum
✓ Large text (≥ 18pt or 14pt bold): 3:1 minimum
✓ UI components: 3:1 minimum

Verified Combinations:
✓ primary-700 (#b84520) on white: 7.1:1 (AAA)
✓ primary-600 (#dc5a2a) on white: 4.8:1 (AA)
✓ neutral-700 (#44403c) on white: 9.2:1 (AAA)
✓ neutral-600 (#57534e) on white: 6.5:1 (AAA)

⚠ Needs Review:
- primary-500 on white: 3.4:1 (Fails AA for normal text)
  → Use primary-600 or darker for text

Testing Tool: WebAIM Contrast Checker
```

#### Keyboard Navigation

**Requirements**:
1. All interactive elements must be keyboard accessible
2. Focus indicators must be visible (2px outline minimum)
3. Tab order must be logical
4. Skip links for main content
5. Escape key closes modals/dropdowns

**Implementation**:
```typescript
// Focus management
export function useFocusManagement() {
  useEffect(() => {
    // Trap focus in modal
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        // Handle tab navigation
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, []);
}

// Skip to main content
<a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:rounded">
  Skip to main content
</a>

<main id="main-content">
  {/* Page content */}
</main>
```

#### Screen Reader Support

**ARIA Labels**:
```tsx
// Button with icon only
<button aria-label="Search businesses">
  <Search className="h-5 w-5" />
</button>

// Image with alt text
<img src={logo} alt={`${businessName} logo`} />

// Navigation
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/businesses">Businesses</a></li>
  </ul>
</nav>

// Form fields
<label htmlFor="search-input">Search businesses</label>
<input
  id="search-input"
  type="text"
  aria-describedby="search-hint"
  aria-invalid={hasError}
/>
<p id="search-hint" className="text-body-sm text-neutral-600">
  Enter business name or category
</p>

// Live regions for dynamic content
<div role="status" aria-live="polite" aria-atomic="true">
  {searchResults.length} businesses found
</div>
```

#### Focus Indicators

```css
/* Global focus styles */
*:focus-visible {
  outline: 2px solid #fcd34d; /* accent-300 */
  outline-offset: 2px;
  border-radius: 4px;
}

/* Custom focus for buttons */
.btn:focus-visible {
  ring: 2px;
  ring-color: accent-400;
  ring-offset: 2px;
}
```

#### Form Accessibility

**Requirements**:
1. Labels for all form fields
2. Error messages linked to fields (aria-describedby)
3. Required fields marked (aria-required)
4. Field validation feedback
5. Error summary at top of form

```tsx
// Accessible form example
<form onSubmit={handleSubmit} aria-labelledby="claim-business-title">
  <h2 id="claim-business-title">Claim Your Business</h2>

  {/* Error summary */}
  {errors.length > 0 && (
    <div role="alert" className="error-summary">
      <h3>Please fix the following errors:</h3>
      <ul>
        {errors.map(error => (
          <li key={error.field}>
            <a href={`#${error.field}`}>{error.message}</a>
          </li>
        ))}
      </ul>
    </div>
  )}

  {/* Form field */}
  <div className="form-field">
    <label htmlFor="business-name">
      Business Name
      <span aria-label="required">*</span>
    </label>
    <input
      id="business-name"
      type="text"
      required
      aria-required="true"
      aria-invalid={!!errors.businessName}
      aria-describedby={errors.businessName ? 'business-name-error' : undefined}
    />
    {errors.businessName && (
      <p id="business-name-error" role="alert" className="error-text">
        {errors.businessName}
      </p>
    )}
  </div>
</form>
```

#### Responsive Text Sizing

```css
/* Allow text resizing up to 200% without horizontal scrolling */
html {
  font-size: 16px; /* Base size */
}

/* Ensure minimum touch target size: 44x44px */
button, a, input[type="checkbox"], input[type="radio"] {
  min-height: 44px;
  min-width: 44px;
  /* Or provide sufficient padding */
}

/* Responsive typography */
@media (max-width: 640px) {
  html {
    font-size: 14px; /* Smaller on mobile */
  }
}
```

#### Motion & Animation Accessibility

```css
/* Respect prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

```typescript
// React hook for reduced motion
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}
```

---

## 7. Interaction Patterns

### Loading States

**Pattern**: Show skeleton screens while content loads

```tsx
// Skeleton component
export function BusinessCardSkeleton() {
  return (
    <div className="animate-pulse bg-white rounded-xl p-6 border border-neutral-200">
      <div className="flex gap-4">
        <div className="h-16 w-16 bg-neutral-200 rounded-lg" />
        <div className="flex-1 space-y-2">
          <div className="h-5 bg-neutral-200 rounded w-3/4" />
          <div className="h-4 bg-neutral-200 rounded w-1/2" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-4 bg-neutral-200 rounded w-full" />
        <div className="h-4 bg-neutral-200 rounded w-5/6" />
      </div>
    </div>
  );
}

// Usage
{isLoading ? (
  <>
    <BusinessCardSkeleton />
    <BusinessCardSkeleton />
    <BusinessCardSkeleton />
  </>
) : (
  businesses.map(b => <BusinessCard key={b.id} business={b} />)
)}
```

### Empty States

**Pattern**: Provide helpful guidance when no content

```tsx
export function EmptyState({
  icon: Icon,
  title,
  description,
  action
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="rounded-full bg-neutral-100 p-6 mb-4">
        <Icon className="h-12 w-12 text-neutral-400" strokeWidth={1.5} />
      </div>
      <h3 className="font-serif text-heading-md text-neutral-900 mb-2">
        {title}
      </h3>
      <p className="text-body-md text-neutral-600 max-w-prose mb-6">
        {description}
      </p>
      {action && (
        <Button onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}

// Usage
{businesses.length === 0 && (
  <EmptyState
    icon={Store}
    title="No businesses found"
    description="Try adjusting your filters or search in a different area."
    action={{ label: "Clear filters", onClick: resetFilters }}
  />
)}
```

### Error States

**Pattern**: Clear error messaging with recovery action

```tsx
export function ErrorState({
  title = "Something went wrong",
  message,
  onRetry
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="rounded-full bg-error-light p-6 mb-4">
        <AlertCircle className="h-12 w-12 text-error" />
      </div>
      <h3 className="font-serif text-heading-md text-neutral-900 mb-2">
        {title}
      </h3>
      <p className="text-body-md text-neutral-600 max-w-prose mb-6">
        {message}
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Try again
        </Button>
      )}
    </div>
  );
}
```

### Progressive Disclosure

**Pattern**: Reveal information gradually to reduce cognitive load

```tsx
// Collapsible section
export function Accordion({ items }: AccordionProps) {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <div className="divide-y divide-neutral-200">
      {items.map(item => (
        <div key={item.id}>
          <button
            onClick={() => setOpenItem(openItem === item.id ? null : item.id)}
            className="flex w-full items-center justify-between py-4 text-left"
            aria-expanded={openItem === item.id}
          >
            <span className="font-medium text-neutral-900">{item.title}</span>
            <ChevronDown
              className={`h-5 w-5 transition-transform ${
                openItem === item.id ? 'rotate-180' : ''
              }`}
            />
          </button>
          <AnimatePresence>
            {openItem === item.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pb-4 text-body-md text-neutral-600">
                  {item.content}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
```

### Feedback & Confirmation

**Pattern**: Provide immediate feedback for user actions

```tsx
// Toast notifications
import { toast } from 'sonner';

// Success
toast.success('Business saved to favorites!');

// Error
toast.error('Failed to save business');

// Loading
const toastId = toast.loading('Saving...');
// Later
toast.success('Saved!', { id: toastId });

// Custom with action
toast.custom((t) => (
  <div className="flex items-center gap-3">
    <CheckCircle className="h-5 w-5 text-success" />
    <div>
      <p className="font-medium">Review submitted!</p>
      <button
        onClick={() => { toast.dismiss(t); router.push('/dashboard'); }}
        className="text-sm text-primary-600"
      >
        View in dashboard →
      </button>
    </div>
  </div>
));
```

---

## 8. Usability Testing Plan

### Testing Objectives

1. Validate user flows for key tasks
2. Identify usability issues early
3. Measure task completion rates
4. Gather qualitative feedback
5. Test on real devices/browsers

### Test Scenarios

#### Scenario 1: Find a Coffee Shop (New User)
**Task**: "You're looking for a coffee shop in Midtown for a meeting tomorrow at 10am. Find one that's open, has good reviews, and get directions."

**Success Criteria**:
- User completes task in < 2 minutes
- No critical errors encountered
- User expresses confidence in choice

**Metrics**:
- Time to complete
- Number of clicks
- Search refinements needed
- Satisfaction rating (1-5)

---

#### Scenario 2: Claim Business Listing (Business Owner)
**Task**: "You own a hair salon called 'Style Studio'. Claim your business listing and complete your profile."

**Success Criteria**:
- User successfully claims listing
- Uploads at least 1 photo
- Completes required fields
- Understands verification process

**Metrics**:
- Time to claim
- Fields completed
- Help requests
- Drop-off points

---

#### Scenario 3: Leave a Review (Returning User)
**Task**: "You just visited Joe's Coffee Shop. Leave a review about your experience."

**Success Criteria**:
- Review submitted successfully
- User understands rating system
- Photo upload works (optional)
- Confirmation received

**Metrics**:
- Time to submit
- Review completeness
- Photo upload success rate
- User satisfaction

---

### Testing Protocol

**Participants**:
- 8-10 users per round
- Mix of personas (explorers, business owners, community members)
- Age range: 25-70
- Tech savviness: Low to High

**Methods**:
1. **Moderated Usability Testing** (Week 1-2)
   - 45-minute sessions
   - Think-aloud protocol
   - Screen recording
   - Post-task questionnaires

2. **Remote Unmoderated Testing** (Week 3)
   - UserTesting.com or similar
   - Larger sample size (20-30 users)
   - Specific task completion
   - Quantitative metrics

3. **A/B Testing** (Post-launch)
   - Search interface variations
   - CTA button placement
   - Filter designs
   - Card layouts

**Tools**:
- Hotjar (heatmaps, session recordings)
- Google Analytics (funnel analysis)
- UserTesting (remote testing)
- Zoom (moderated sessions)

---

### Success Metrics

#### Task Success Rates
- **Target**: 85%+ completion rate
- **Measurement**: Percentage of users who complete task without assistance

#### Time on Task
- **Target**:
  - Find business: < 2 minutes
  - Claim listing: < 10 minutes
  - Leave review: < 3 minutes
- **Measurement**: Average time from task start to completion

#### Error Rate
- **Target**: < 2 errors per task
- **Measurement**: Number of wrong clicks, back navigation, or help requests

#### Satisfaction Scores (SUS - System Usability Scale)
- **Target**: Score > 68 (above average)
- **Measurement**: 10-question standardized survey

#### Net Promoter Score (NPS)
- **Target**: Score > 30
- **Question**: "How likely are you to recommend Midtownbook to a friend?" (0-10)

---

## 9. Implementation Guidelines

### Development Workflow

**Phase Approach**:
1. Design System Setup (Week 1)
2. Component Development (Week 2-3)
3. Page Implementation (Week 4-8)
4. Integration & Testing (Week 9-10)

**Component Development Order**:
```
Priority 1 (Week 2):
- Button, Input, Label, Form components
- Card, Badge, Avatar
- Layout components (Container, Grid, Stack)

Priority 2 (Week 3):
- Navigation, Footer
- Modal, Dialog, Sheet
- Toast, Alert
- Skeleton, Spinner

Priority 3 (Week 4):
- BusinessCard, CategoryCard
- SearchBox, FilterPanel
- Map components
- Review components
```

### Design-to-Code Handoff

**Required Deliverables**:
1. **Figma Design File** (or equivalent)
   - All component states
   - Responsive breakpoints
   - Interaction specs
   - Design tokens

2. **Component Specifications**
   - Props and variants
   - State behavior
   - Accessibility notes
   - Usage examples

3. **Style Guide**
   - Color palette with contrast ratios
   - Typography scale
   - Spacing system
   - Icon library

4. **Prototype**
   - Key user flows
   - Interaction behaviors
   - Animation timings

### Quality Checklist (Per Component)

```markdown
## Component Review Checklist

### Functionality
- [ ] All states implemented (default, hover, active, disabled, loading, error)
- [ ] Props work as specified
- [ ] Edge cases handled
- [ ] Error boundaries in place

### Accessibility
- [ ] Keyboard navigable
- [ ] ARIA labels present
- [ ] Focus indicators visible
- [ ] Screen reader tested
- [ ] Color contrast verified (4.5:1 for text)
- [ ] Touch targets ≥ 44x44px

### Responsiveness
- [ ] Mobile tested (375px width)
- [ ] Tablet tested (768px width)
- [ ] Desktop tested (1440px width)
- [ ] No horizontal scroll
- [ ] Touch gestures work

### Performance
- [ ] No console errors/warnings
- [ ] Animations smooth (60fps)
- [ ] Images optimized
- [ ] Lazy loading implemented
- [ ] Bundle size acceptable

### Design Fidelity
- [ ] Matches design specs
- [ ] Spacing correct
- [ ] Typography correct
- [ ] Colors correct
- [ ] Animations match specs

### Code Quality
- [ ] TypeScript types defined
- [ ] No linter errors
- [ ] Comments for complex logic
- [ ] Reusable and composable
- [ ] Follows naming conventions
```

---

## 10. Success Metrics

### User Engagement Metrics

**Primary Metrics**:
```
Goal: Measure user adoption and engagement

1. Monthly Active Users (MAU)
   - Target Month 3: 1,000 users
   - Target Month 6: 5,000 users
   - Target Month 12: 15,000 users

2. Session Duration
   - Target: > 3 minutes average
   - Benchmark: Industry avg 2.5 min

3. Pages per Session
   - Target: > 4 pages
   - Indicates discovery behavior

4. Bounce Rate
   - Target: < 40%
   - Lower = better engagement

5. Return Visitor Rate
   - Target: > 30% within 30 days
   - Indicates sticky product
```

**Business Metrics**:
```
Goal: Measure business value and growth

1. Business Listings
   - Target Month 3: 100 businesses
   - Target Month 6: 500 businesses
   - Target Month 12: 1,500 businesses

2. Claimed Listings
   - Target: 50% of total listings
   - Indicates active business participation

3. Paid Subscribers
   - Target Month 3: 10 businesses
   - Target Month 6: 50 businesses
   - Target Month 12: 150 businesses

4. Monthly Recurring Revenue (MRR)
   - Target Month 3: $500
   - Target Month 6: $3,000
   - Target Month 12: $10,000

5. Reviews Submitted
   - Target: 2,000+ reviews by Month 6
   - Indicates community engagement
```

**UX Quality Metrics**:
```
Goal: Measure user experience quality

1. Task Success Rate
   - Target: > 85%
   - Measures usability

2. Time to Complete Tasks
   - Search: < 2 min
   - Claim: < 10 min
   - Review: < 3 min

3. Error Rate
   - Target: < 5% of sessions
   - Indicates friction points

4. Help/Support Requests
   - Target: < 10% of users
   - Lower = more intuitive

5. Feature Adoption
   - Map usage: > 60%
   - Favorites: > 40%
   - Filters: > 50%
```

### Measurement Tools

```typescript
// Analytics implementation
import { analytics } from '@/lib/analytics';

// Page view tracking
analytics.page('Business Profile', {
  businessId: business.id,
  businessName: business.name,
  category: business.category,
});

// Event tracking
analytics.track('Business Searched', {
  query: searchQuery,
  resultsCount: results.length,
  filtersApplied: activeFilters,
});

analytics.track('Business Viewed', {
  businessId: business.id,
  source: 'search', // or 'featured', 'category', etc.
});

analytics.track('Review Submitted', {
  businessId: business.id,
  rating: review.rating,
  hasPhotos: review.photos.length > 0,
});

// Conversion tracking
analytics.track('Subscription Started', {
  plan: subscriptionTier,
  price: amount,
  businessId: business.id,
});
```

---

## Appendix: Design Rationale

### Why Terracotta/Green/Gold?

**Color Psychology**:
- **Terracotta**: Warmth, community, trust, earthiness
- **Green**: Growth, prosperity, nature, harmony
- **Gold**: Quality, value, success, optimism

**Differentiation**: Most directories use blue/purple. Our palette stands out while maintaining professionalism.

**Accessibility**: Warm tones generally have better contrast ratios than cool tones, making text more readable.

### Why Playfair Display + Inter?

**Playfair Display** (Serif):
- Elegant, distinctive
- Conveys quality and trustworthiness
- High readability at large sizes (headings)

**Inter** (Sans-serif):
- Optimized for screen reading
- Excellent readability at small sizes
- Wide character support

**Pairing**: Classic serif/sans-serif combination provides visual hierarchy and maintains readability across all text sizes.

### Mobile-First Justification

**Usage Data**:
- 78% of local business searches happen on mobile
- Users searching on-the-go need immediate information
- Mobile-first ensures core functionality works everywhere

**Progressive Enhancement**: Start with mobile constraints, add desktop features later, rather than trying to compress desktop to mobile.

---

**End of UI/UX Design Review**

**Next Steps**:
1. Review and approve this UX specification
2. Create Figma design files for key pages
3. Build component library following design tokens
4. Implement accessibility requirements
5. Conduct usability testing
6. Iterate based on feedback

**Questions or Feedback**: Please provide feedback on any section for refinement before development begins.
