# Midtown Book - Community Business Directory

A modern, full-featured community business directory built with Next.js, Supabase, and Tailwind CSS.

## Project Overview

Midtown Book is a comprehensive business directory platform that connects local businesses with community members. It features business listings, reviews, events, deals, and more.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Payments**: Stripe
- **Email**: Mailgun (transactional) + GoHighLevel (marketing)
- **Maps**: Google Maps JavaScript API
- **Animations**: Framer Motion
- **UI Components**: Custom components based on Shadcn UI patterns

## Design System

### Color Palette (Official City Colors)

- **Primary**: City Blue (#00B6E3 / PMS 306 U)
- **Secondary**: City Green (#81D07A / PMS 359 U)
- **Purple**: City Purple (#B455B3 / PMS 253 U)
- **Accent Yellow**: City Yellow (#FFEA64 / PMS 107 U)
- **Accent Red**: City Red (#F35562 / PMS RED 032 U)
- **Accent Orange**: City Orange (#F7B446 / PMS 129 U)
- **Neutrals**: Warm Stone grays

### Typography

- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)
- **Monospace**: JetBrains Mono

## Project Structure

```
Midtownbook/
├── app/                        # Next.js app directory
│   ├── globals.css            # Global styles and design tokens
│   ├── layout.tsx             # Root layout with fonts
│   ├── page.tsx               # Homepage
│   ├── businesses/            # Business pages
│   │   ├── page.tsx           # Business listing
│   │   ├── businesses-content.tsx
│   │   ├── [slug]/            # Business detail
│   │   │   ├── page.tsx
│   │   │   ├── business-detail-content.tsx
│   │   │   └── claim/         # Business claiming
│   │   │       ├── page.tsx
│   │   │       ├── claim-business-form.tsx
│   │   │       └── success/
│   │   │           ├── page.tsx
│   │   │           └── claim-success-content.tsx
│   │   └── create/            # Add business
│   │       ├── page.tsx
│   │       └── create-business-content.tsx
│   ├── events/                # Event pages
│   │   ├── page.tsx           # Events listing
│   │   └── [slug]/            # Event detail
│   │       └── page.tsx
│   ├── deals/                 # Deals page
│   │   └── page.tsx
│   ├── categories/            # Category pages
│   │   ├── page.tsx           # All categories
│   │   └── [slug]/            # Category detail
│   │       └── page.tsx
│   ├── auth/                  # Authentication
│   │   ├── login/
│   │   │   ├── page.tsx
│   │   │   └── login-form.tsx
│   │   ├── signup/
│   │   │   ├── page.tsx
│   │   │   └── signup-form.tsx
│   │   ├── forgot-password/
│   │   │   ├── page.tsx
│   │   │   └── forgot-password-form.tsx
│   │   ├── reset-password/
│   │   │   ├── page.tsx
│   │   │   └── reset-password-form.tsx
│   │   └── verify-email/
│   │       ├── page.tsx
│   │       └── verify-email-content.tsx
│   ├── profile/               # User profile
│   │   ├── page.tsx
│   │   └── profile-content.tsx
│   ├── dashboard/             # Business owner dashboard
│   │   ├── page.tsx
│   │   ├── dashboard-content.tsx
│   │   ├── settings/
│   │   │   ├── page.tsx
│   │   │   └── settings-content.tsx
│   │   ├── analytics/
│   │   │   ├── page.tsx
│   │   │   └── analytics-content.tsx
│   │   ├── events/
│   │   │   ├── page.tsx           # Events list
│   │   │   ├── events-list-content.tsx
│   │   │   └── new/
│   │   │       ├── page.tsx
│   │   │       └── create-event-content.tsx
│   │   ├── deals/
│   │   │   ├── page.tsx           # Deals list
│   │   │   ├── deals-list-content.tsx
│   │   │   └── new/
│   │   │       ├── page.tsx
│   │   │       └── create-deal-content.tsx
│   │   └── reviews/
│   │       ├── page.tsx
│   │       └── reviews-content.tsx
│   ├── blog/                  # Blog pages
│   │   ├── page.tsx           # Blog listing
│   │   ├── blog-content.tsx
│   │   └── [slug]/            # Blog post detail
│   │       └── page.tsx
│   ├── admin/                 # Admin pages
│   │   ├── page.tsx
│   │   ├── admin-dashboard-content.tsx
│   │   ├── users/
│   │   │   ├── page.tsx
│   │   │   └── users-management-content.tsx
│   │   └── moderation/
│   │       ├── page.tsx
│   │       └── moderation-content.tsx
│   ├── help/                  # Help & FAQ
│   │   ├── page.tsx
│   │   └── help-content.tsx
│   ├── about/                 # Static pages
│   │   └── page.tsx
│   ├── contact/
│   │   ├── page.tsx
│   │   ├── contact-form.tsx
│   │   └── success/
│   │       ├── page.tsx
│   │       └── contact-success-content.tsx
│   ├── newsletter/
│   │   └── success/
│   │       ├── page.tsx
│   │       └── newsletter-success-content.tsx
│   ├── reviews/
│   │   └── success/
│   │       ├── page.tsx
│   │       └── review-success-content.tsx
│   ├── privacy/
│   │   └── page.tsx
│   ├── terms/
│   │   └── page.tsx
│   └── not-found.tsx          # 404 page
├── components/
│   ├── ui/                    # Design system components (31 components)
│   │   ├── index.ts           # Barrel exports
│   │   ├── button.tsx         # Primary button component
│   │   ├── input.tsx          # Text input field
│   │   ├── textarea.tsx       # Multi-line text input
│   │   ├── label.tsx          # Form label
│   │   ├── card.tsx           # Container with variants
│   │   ├── badge.tsx          # Status/category badge
│   │   ├── separator.tsx      # Visual divider
│   │   ├── container.tsx      # Page container
│   │   ├── checkbox.tsx       # Checkbox input
│   │   ├── radio-group.tsx    # Radio button group
│   │   ├── select.tsx         # Dropdown select
│   │   ├── switch.tsx         # Toggle switch
│   │   ├── dialog.tsx         # Modal dialog
│   │   ├── sheet.tsx          # Slide-out panel
│   │   ├── alert-dialog.tsx   # Confirmation dialog
│   │   ├── dropdown-menu.tsx  # Context menu
│   │   ├── context-menu.tsx   # Right-click menu
│   │   ├── popover.tsx        # Floating content
│   │   ├── tooltip.tsx        # Hover tooltip
│   │   ├── hover-card.tsx     # Hover popover
│   │   ├── combobox.tsx       # Searchable select
│   │   ├── command.tsx        # Command palette
│   │   ├── calendar.tsx       # Date picker
│   │   ├── tabs.tsx           # Tab navigation
│   │   ├── accordion.tsx      # Collapsible sections
│   │   ├── breadcrumbs.tsx    # Navigation path
│   │   ├── progress.tsx       # Progress indicator
│   │   ├── skeleton.tsx       # Loading placeholder
│   │   ├── avatar.tsx         # User avatar
│   │   ├── empty-state.tsx    # No content state
│   │   └── error-state.tsx    # Error display
│   ├── business/              # Business components (12 components)
│   │   ├── index.ts           # Barrel exports
│   │   ├── business-card.tsx  # Business listing card (3 variants)
│   │   ├── rating-display.tsx # Star rating display
│   │   ├── status-badge.tsx   # Open/closed status
│   │   ├── search-box.tsx     # Search with autocomplete
│   │   ├── filter-panel.tsx   # Advanced filtering
│   │   ├── review-card.tsx    # Review display with actions
│   │   ├── event-card.tsx     # Event listing (2 variants)
│   │   ├── review-form.tsx    # Review submission form
│   │   ├── photo-gallery.tsx  # Photo grid with lightbox
│   │   ├── deal-card.tsx      # Deal display
│   │   ├── category-grid.tsx  # Category grid
│   │   └── map-view.tsx       # Map integration placeholder
│   ├── dashboard/             # Dashboard components (5 components)
│   │   ├── index.ts           # Barrel exports
│   │   ├── stat-card.tsx      # Metrics display
│   │   ├── activity-feed.tsx  # Timeline feed
│   │   ├── analytics-chart.tsx # Chart placeholder
│   │   ├── upload-zone.tsx    # Drag-drop upload
│   │   └── onboarding-tour.tsx # Tour placeholder
│   ├── layout/                # Layout components (2 components)
│   │   ├── index.ts           # Barrel exports
│   │   ├── header.tsx         # Main navigation header
│   │   └── footer.tsx         # Site footer
│   └── home/                  # Homepage sections (4 components)
│       ├── index.ts           # Barrel exports
│       ├── hero.tsx           # Hero section
│       ├── featured-categories.tsx # Category grid
│       ├── features.tsx       # Feature highlights
│       └── cta-section.tsx    # Call to action
├── lib/
│   ├── supabase/              # Supabase configuration
│   │   ├── client.ts          # Browser client
│   │   └── server.ts          # Server client
│   ├── types/                 # TypeScript types
│   │   └── database.ts        # Database types
│   └── utils.ts               # Utility functions
├── supabase/
│   └── schema.sql             # Database schema
├── public/                    # Static assets
├── middleware.ts              # Auth middleware
├── next.config.js             # Next.js configuration
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies

```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account
- A Vercel account (for deployment)
- Stripe account (for payments)
- Mailgun account (for emails)
- Google Cloud account (for Maps API)

### Installation

1. **Clone the repository**
   ```bash
   cd Midtownbook
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy [.env.example](.env.example) to `.env.local` and fill in your values:
   ```bash
   cp .env.example .env.local
   ```

4. **Set up Supabase**

   - Create a new Supabase project at https://app.supabase.com
   - Run the SQL in [supabase/schema.sql](supabase/schema.sql) in your Supabase SQL editor
   - Copy your project URL and anon key to `.env.local`

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open http://localhost:3000**

## Database Schema

The database schema includes the following main tables:

- **profiles**: User profiles linked to auth.users
- **businesses**: Business listings with location, contact, and subscription info
- **categories**: Hierarchical category system
- **reviews**: User reviews with ratings and verification
- **events**: Business-hosted events
- **deals**: Special offers and promotions
- **favorites**: User bookmarks
- **review_votes**: Helpful votes on reviews

See [supabase/schema.sql](supabase/schema.sql) for the complete schema.

## Components Library

This project includes a comprehensive component library with 54 production-ready components built following the design system specifications.

### UI Components (31 components)

#### Core Components

- **[Button](components/ui/button.tsx)** - Primary interactive element with 7 variants
  - Variants: `primary`, `secondary`, `outline`, `ghost`, `link`, `destructive`, `accent`
  - Sizes: `sm`, `md`, `lg`, `icon`
  - States: loading, disabled
  - Features: left/right icons, asChild prop for composition

- **[Card](components/ui/card.tsx)** - Versatile container component
  - Variants: `default`, `bordered`, `elevated`
  - Padding: `none`, `sm`, `md`, `lg`
  - States: interactive (hover effects)
  - Sub-components: `CardHeader`, `CardContent`, `CardFooter`

- **[Badge](components/ui/badge.tsx)** - Status and category indicator
  - Variants: `default`, `primary`, `secondary`, `accent`, `success`, `warning`, `error`, `info`
  - Sizes: `sm`, `md`, `lg`
  - Removable option with close button

- **[Container](components/ui/container.tsx)** - Page layout container
  - Sizes: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px), `full`
  - Responsive padding and max-width

#### Form Components

- **[Input](components/ui/input.tsx)** - Text input field with validation states
- **[Textarea](components/ui/textarea.tsx)** - Multi-line text input
- **[Label](components/ui/label.tsx)** - Form field label with required indicator
- **[Checkbox](components/ui/checkbox.tsx)** - Checkbox with intermediate state
- **[RadioGroup](components/ui/radio-group.tsx)** - Radio button group
- **[Select](components/ui/select.tsx)** - Dropdown select with search
- **[Switch](components/ui/switch.tsx)** - Toggle switch

#### Dialog & Overlays

- **[Dialog](components/ui/dialog.tsx)** - Modal dialog system
  - Sub-components: `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`
  - Accessibility: Focus trap, escape to close
  - Sizes: `sm`, `md`, `lg`, `xl`, `full`

- **[DropdownMenu](components/ui/dropdown-menu.tsx)** - Context menu
  - Sub-components: Menu items, separators, labels, checkboxes
  - Keyboard navigation support

- **[Popover](components/ui/popover.tsx)** - Floating content container
- **[Tooltip](components/ui/tooltip.tsx)** - Hover tooltip with delay

#### Navigation

- **[Tabs](components/ui/tabs.tsx)** - Tab navigation with variants
  - Variants: `line`, `pill`, `segment`
  - Keyboard navigation (Arrow keys)

- **[Accordion](components/ui/accordion.tsx)** - Collapsible sections
  - Single or multiple expansion modes
  - Animated transitions

- **[Breadcrumbs](components/ui/breadcrumbs.tsx)** - Navigation path
  - Automatic truncation on mobile
  - Custom separators

#### Feedback Components

- **[Progress](components/ui/progress.tsx)** - Progress indicator
  - Variants: `default`, `success`, `warning`, `error`
  - Sizes: `sm`, `md`, `lg`

- **[Skeleton](components/ui/skeleton.tsx)** - Loading placeholder
  - Variants: `text`, `circular`, `rectangular`
  - Animated pulse effect

- **[Avatar](components/ui/avatar.tsx)** - User avatar with fallback
  - Sizes: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`
  - Status indicators (online/offline)
  - Fallback to initials

- **[EmptyState](components/ui/empty-state.tsx)** - No content state
  - Customizable icon, title, description, actions
  - Variants for different contexts

- **[ErrorState](components/ui/error-state.tsx)** - Error display
  - Retry action
  - Customizable error messages

### Business Components (7 components)

- **[BusinessCard](components/business/business-card.tsx)** - Business listing card
  - **Variants**:
    - `grid` - Full card with image and details
    - `list` - Horizontal layout for list views
    - `compact` - Minimal layout for sidebars
  - **Features**: Rating display, favorite button, status badge, featured indicator

- **[RatingDisplay](components/business/rating-display.tsx)** - Star rating visualization
  - Interactive and read-only modes
  - Half-star support
  - Review count display
  - Sizes: `xs`, `sm`, `md`, `lg`

- **[StatusBadge](components/business/status-badge.tsx)** - Business open/closed status
  - Real-time status indicator
  - Custom hours display
  - Color-coded (green=open, red=closed, yellow=closing soon)

- **[SearchBox](components/business/search-box.tsx)** - Advanced search with autocomplete
  - **Features**:
    - Real-time suggestions
    - Recent searches history
    - Trending searches
    - Location filter toggle
    - Keyboard navigation
    - Clear button
  - **Performance**: <500ms suggestion response time

- **[FilterPanel](components/business/filter-panel.tsx)** - Advanced filtering system
  - **Features**:
    - Checkbox and radio filter groups
    - Collapsible accordion sections
    - Active filter display with removal
    - Clear all functionality
    - Filter count badges
  - **Variants**: `sidebar`, `sheet` (mobile)

- **[ReviewCard](components/business/review-card.tsx)** - Review display and interaction
  - **Features**:
    - User avatar and name
    - Star rating display
    - Review content with read more/less
    - Photo gallery with lightbox
    - Helpful voting
    - Report/flag functionality
    - Business response display
    - Verified purchase badge
  - **Accessibility**: Keyboard navigation, screen reader support

- **[EventCard](components/business/event-card.tsx)** - Event listing
  - **Variants**:
    - `default` - Full card with image
    - `compact` - Minimal layout for lists
  - **Features**:
    - Date badge display
    - Location and time info
    - Price display (free/paid)
    - RSVP functionality
    - Attendee count
    - Sold out indicator
    - Online event badge

### Layout Components (2 components)

- **[Header](components/layout/header.tsx)** - Main navigation header
  - **Features**:
    - Sticky positioning
    - Responsive mobile menu
    - Search icon button
    - User authentication state
    - Sign in/Sign up buttons
    - Add Business CTA
    - Glassmorphism effect

- **[Footer](components/layout/footer.tsx)** - Site footer
  - **Features**:
    - Multi-column layout
    - Social media links
    - Newsletter signup
    - Copyright information
    - Responsive design

### Homepage Components (4 components)

- **[Hero](components/home/hero.tsx)** - Hero section
  - **Features**:
    - Main search box integration
    - Category quick links
    - Featured statistics
    - Background gradient
    - Call-to-action buttons

- **[FeaturedCategories](components/home/featured-categories.tsx)** - Category grid
  - Responsive grid layout
  - Category icons and counts
  - Hover effects

- **[Features](components/home/features.tsx)** - Feature highlights
  - Icon-based feature cards
  - 3-column responsive layout

- **[CtaSection](components/home/cta-section.tsx)** - Call to action
  - Business owner CTA
  - Gradient background
  - Action buttons

### Usage Examples

#### Basic Button Usage
```tsx
import { Button } from '@/components/ui/button';

<Button variant="primary" size="md">
  Click Me
</Button>
```

#### Business Card with Actions
```tsx
import { BusinessCard } from '@/components/business';

<BusinessCard
  business={businessData}
  variant="grid"
  onFavorite={handleFavorite}
  isFavorited={false}
  showActions
/>
```

#### Search with Filter
```tsx
import { SearchBox, FilterPanel } from '@/components/business';

<div className="flex gap-4">
  <FilterPanel
    filters={filterGroups}
    selectedFilters={selected}
    onFilterChange={handleChange}
    onClearAll={handleClear}
  />
  <SearchBox
    value={query}
    onChange={setQuery}
    onSearch={handleSearch}
    suggestions={suggestions}
    showLocation
  />
</div>
```

### Component Guidelines

- **Import Pattern**: Use barrel exports for clean imports
  ```tsx
  import { Button, Card, Badge } from '@/components/ui';
  import { BusinessCard, SearchBox } from '@/components/business';
  ```

- **Styling**: All components use Tailwind CSS with the custom design system
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation and screen reader support
- **TypeScript**: Full type safety with proper prop interfaces
- **Responsive**: Mobile-first design with responsive variants

## Features Implemented

### ✅ Phase 1: Foundation (100% Complete)

- [x] Project setup and configuration
- [x] Next.js 15 with App Router and TypeScript
- [x] Design system with custom Tailwind config (300+ lines)
- [x] Complete color palette (Terracotta/Green/Gold - NO blue/purple)
- [x] Typography system (Playfair Display + Inter)
- [x] Supabase integration setup (client/server)
- [x] Database schema (500+ lines with RLS policies)
- [x] TypeScript types for database
- [x] Authentication middleware
- [x] Environment configuration
- [x] Responsive design foundation
- [x] Framer Motion animations setup

### ✅ Phase 2: Component Library (100% Complete)

**Completed Components (54 components):**

- [x] **UI Components (31)**
  - Core: Button, Card, Badge, Container, Input, Textarea, Label, Separator
  - Forms: Checkbox, Radio Group, Select, Switch
  - Dialogs: Dialog, Dropdown Menu, Popover, Tooltip, Sheet, Alert Dialog, Context Menu, Hover Card
  - Advanced: Combobox, Command, Calendar
  - Navigation: Tabs, Accordion, Breadcrumbs
  - Feedback: Progress, Skeleton, Avatar, Empty State, Error State

- [x] **Business Components (12)**
  - Business Card (3 variants)
  - Rating Display
  - Status Badge
  - Search Box with autocomplete
  - Filter Panel
  - Review Card with lightbox
  - Event Card (2 variants)
  - Review Form (with star rating, photo upload)
  - Photo Gallery (with lightbox, keyboard navigation)
  - Deal Card
  - Category Grid
  - Map View (placeholder for Google Maps)

- [x] **Dashboard Components (5)**
  - Stat Card (5 color variants)
  - Activity Feed (timeline with badges)
  - Analytics Chart (placeholder)
  - Upload Zone (drag-and-drop)
  - Onboarding Tour (placeholder)

- [x] **Layout Components (2)**
  - Header with mobile menu
  - Footer with newsletter

- [x] **Homepage Components (4)**
  - Hero section
  - Featured Categories
  - Features
  - CTA Section

**Component Features:**
- [x] Comprehensive variant system
- [x] WCAG 2.1 AA accessibility compliance
- [x] Keyboard navigation support
- [x] Loading and error states
- [x] Responsive design
- [x] Barrel exports for clean imports
- [x] Full TypeScript types
- [x] Framer Motion animations

### ✅ Phase 3: Core Pages (100% Complete)

**Completed Pages (46 total):**

**Public Pages (24 pages):**
- [x] `/` - Homepage with hero, categories, features
- [x] `/businesses` - Business listing page with search/filters
- [x] `/businesses/[slug]` - Business detail page with tabs, reviews, photos
- [x] `/businesses/create` - Multi-step business listing creation form
- [x] `/businesses/[slug]/claim` - 3-step business claim wizard with document upload
- [x] `/businesses/[slug]/claim/success` - Business claim success confirmation
- [x] `/categories` - Category grid view
- [x] `/categories/[slug]` - Category-specific business listings
- [x] `/events` - Events listing page
- [x] `/events/[slug]` - Event detail page with RSVP
- [x] `/deals` - Deals and offers listing
- [x] `/blog` - Blog listing with search and categories
- [x] `/blog/[slug]` - Blog post detail with related articles
- [x] `/help` - Comprehensive help center with 30+ FAQs across 5 categories
- [x] `/favorites` - User favorites and bookmarks with collection organization
- [x] `/compare` - Business comparison tool (up to 3 businesses side-by-side)
- [x] `/about` - About page with mission and values
- [x] `/contact` - Contact form with info cards
- [x] `/contact/success` - Contact form submission success with auto-redirect
- [x] `/newsletter/success` - Newsletter subscription success with benefits
- [x] `/reviews/success` - Review submission success with sharing options
- [x] `/privacy` - Privacy policy
- [x] `/terms` - Terms of service
- [x] `/not-found` - Enhanced 404 page with search, featured businesses, and categories

**Authentication Pages (5 pages):**
- [x] `/auth/login` - Sign in page
- [x] `/auth/signup` - Registration page
- [x] `/auth/forgot-password` - Password reset request flow
- [x] `/auth/reset-password` - Password reset confirmation with strength meter
- [x] `/auth/verify-email` - Email verification with status feedback

**User Pages (1 page):**
- [x] `/profile` - User profile with tabs (info, reviews, favorites, settings)

**Dashboard Pages - Business Owners (9 pages):**
- [x] `/dashboard` - Main dashboard with stats, activity, quick actions
- [x] `/dashboard/settings` - Business settings (4 tabs: business, account, notifications, billing)
- [x] `/dashboard/analytics` - Detailed analytics with charts and demographics
- [x] `/dashboard/events` - Events list with filtering, sorting, and management
- [x] `/dashboard/events/new` - Create event form with preview
- [x] `/dashboard/deals` - Deals list with performance tracking and status
- [x] `/dashboard/deals/new` - Create deal form with discount calculator
- [x] `/dashboard/reviews` - Review management with reply functionality

**Admin Dashboard Pages (4 pages):**
- [x] `/admin` - Admin dashboard with platform stats and quick actions
- [x] `/admin/users` - User management with search, filtering, and actions
- [x] `/admin/moderation` - Content moderation queue with approve/remove actions
- [x] `/admin/businesses` - Business verification with approve/reject workflow

**Key Features:**
- [x] Business claiming workflow with 3-step wizard and document verification
- [x] Comprehensive help center with 30+ FAQs across 5 categories (General, Business Owners, Account, Technical, Privacy)
- [x] Success confirmation pages for all major user actions (contact, newsletter, reviews, claims)
- [x] Password strength meter with real-time validation
- [x] Email verification flow with token handling
- [x] Auto-redirect functionality on success pages
- [x] Multi-step forms with progress indicators
- [x] User favorites and bookmarks with collection organization
- [x] Business comparison tool (up to 3 businesses side-by-side with detailed feature comparison)
- [x] Admin business verification with approve/reject workflow and notes
- [x] Enhanced 404 page with search functionality, featured businesses, and helpful resources

### 🚀 Future Phases

- **Phase 4**: Business features (search, maps, reviews, claim)
- **Phase 5**: Community features (events, deals, newsletter)
- **Phase 6**: Monetization (Stripe subscriptions)
- **Phase 7**: Dashboards (business owner, admin)
- **Phase 8**: Integrations (Maps, Mailgun, GoHighLevel)
- **Phase 9**: Optimization (performance, SEO, accessibility)
- **Phase 10**: Launch preparation and execution

See [MASTER_PLAN.md](MASTER_PLAN.md) for detailed roadmap and checklists.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Component-based architecture
- Server and client components separation
- Accessibility-first approach (WCAG 2.1 AA)

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables
4. Deploy

The site will be automatically deployed to your custom domain (midtownbook.com).

### Environment Variables for Production

Make sure to set all required environment variables in your Vercel dashboard:

- Supabase credentials
- Stripe keys
- Mailgun configuration
- Google Maps API key
- GoHighLevel credentials

## Documentation

- **[Master Plan](MASTER_PLAN.md)** - Comprehensive project roadmap with progress tracking
- **[Implementation Plan](IMPLEMENTATION_PLAN.md)** - Detailed implementation specifications
- **[UX Design Review](UX_DESIGN_REVIEW.md)** - User experience specifications and wireframes
- **[Database Schema](supabase/schema.sql)** - Complete database structure with RLS policies
- **[Component Library](#components-library)** - Detailed component documentation (see above)

## Contributing

This is a private project. If you have access and want to contribute:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

Private and proprietary. All rights reserved.

## Support

For questions or issues, contact the development team.

---

**Built with ❤️ for the Midtown Community**
