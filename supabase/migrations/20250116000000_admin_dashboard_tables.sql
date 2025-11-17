-- Migration: Admin Dashboard Tables
-- Created: 2025-01-16
-- Description: Creates missing tables and columns for admin dashboard functionality

-- ============================================================================
-- 1. CREATE MISSING TABLES
-- ============================================================================

-- Business Claims Table (CRITICAL - referenced in code but doesn't exist!)
CREATE TABLE IF NOT EXISTS public.business_claims (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id uuid REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  position text NOT NULL,
  relationship_to_business text,
  additional_info text,
  verification_documents text[], -- URLs from Supabase Storage
  status text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_notes text,
  reviewed_by uuid REFERENCES public.profiles(id),
  reviewed_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Content Reports Table (for moderation queue)
CREATE TABLE IF NOT EXISTS public.content_reports (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_type text NOT NULL CHECK (content_type IN ('review', 'business', 'comment')),
  content_id uuid NOT NULL, -- References reviews.id, businesses.id, etc
  reported_by uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  reason text NOT NULL,
  reason_category text CHECK (reason_category IN (
    'spam', 'inappropriate', 'misleading', 'duplicate', 'harassment', 'other'
  )),
  additional_details text,
  status text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'removed', 'dismissed')),
  moderator_id uuid REFERENCES public.profiles(id),
  moderator_notes text,
  moderated_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Admin Audit Log Table (for accountability)
CREATE TABLE IF NOT EXISTS public.admin_audit_log (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  action text NOT NULL, -- e.g., 'approve_business', 'suspend_user', 'remove_review'
  entity_type text NOT NULL, -- e.g., 'business', 'user', 'review'
  entity_id uuid NOT NULL,
  details jsonb, -- Flexible field for action-specific data
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- ============================================================================
-- 2. ADD MISSING COLUMNS TO EXISTING TABLES
-- ============================================================================

-- Add status tracking to businesses table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'businesses' AND column_name = 'status'
  ) THEN
    ALTER TABLE public.businesses
    ADD COLUMN status text CHECK (status IN ('pending', 'approved', 'rejected', 'suspended'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'businesses' AND column_name = 'approved_at'
  ) THEN
    ALTER TABLE public.businesses ADD COLUMN approved_at timestamp with time zone;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'businesses' AND column_name = 'approved_by'
  ) THEN
    ALTER TABLE public.businesses ADD COLUMN approved_by uuid REFERENCES public.profiles(id);
  END IF;
END $$;

-- Add moderation tracking to reviews table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'reviews' AND column_name = 'moderator_id'
  ) THEN
    ALTER TABLE public.reviews ADD COLUMN moderator_id uuid REFERENCES public.profiles(id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'reviews' AND column_name = 'moderated_at'
  ) THEN
    ALTER TABLE public.reviews ADD COLUMN moderated_at timestamp with time zone;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'reviews' AND column_name = 'moderation_notes'
  ) THEN
    ALTER TABLE public.reviews ADD COLUMN moderation_notes text;
  END IF;
END $$;

-- Add user status tracking to profiles table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'status'
  ) THEN
    ALTER TABLE public.profiles
    ADD COLUMN status text NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'suspended', 'deleted'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'suspended_at'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN suspended_at timestamp with time zone;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'last_login'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN last_login timestamp with time zone;
  END IF;
END $$;

-- ============================================================================
-- 3. CREATE INDEXES FOR PERFORMANCE
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_business_claims_status ON public.business_claims(status);
CREATE INDEX IF NOT EXISTS idx_business_claims_user_id ON public.business_claims(user_id);
CREATE INDEX IF NOT EXISTS idx_business_claims_business_id ON public.business_claims(business_id);

CREATE INDEX IF NOT EXISTS idx_content_reports_status ON public.content_reports(status);
CREATE INDEX IF NOT EXISTS idx_content_reports_content_type ON public.content_reports(content_type);
CREATE INDEX IF NOT EXISTS idx_content_reports_reported_by ON public.content_reports(reported_by);

CREATE INDEX IF NOT EXISTS idx_admin_audit_log_admin_id ON public.admin_audit_log(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_audit_log_entity_type ON public.admin_audit_log(entity_type);
CREATE INDEX IF NOT EXISTS idx_admin_audit_log_created_at ON public.admin_audit_log(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_businesses_status ON public.businesses(status) WHERE status IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_profiles_status ON public.profiles(status);

-- ============================================================================
-- 4. SET UP ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on new tables
ALTER TABLE public.business_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

-- Business Claims Policies
-- Admins can view all claims
CREATE POLICY "Admins can view all business claims"
  ON public.business_claims FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Users can view their own claims
CREATE POLICY "Users can view own business claims"
  ON public.business_claims FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create claims
CREATE POLICY "Users can create business claims"
  ON public.business_claims FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Admins can update claims
CREATE POLICY "Admins can update business claims"
  ON public.business_claims FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Content Reports Policies
-- Anyone can create reports
CREATE POLICY "Authenticated users can report content"
  ON public.content_reports FOR INSERT
  WITH CHECK (auth.uid() = reported_by);

-- Users can view their own reports
CREATE POLICY "Users can view own reports"
  ON public.content_reports FOR SELECT
  USING (auth.uid() = reported_by);

-- Admins can view all reports
CREATE POLICY "Admins can view all reports"
  ON public.content_reports FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Admins can update reports
CREATE POLICY "Admins can moderate reports"
  ON public.content_reports FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Admin Audit Log Policies
-- Only admins can view audit logs
CREATE POLICY "Admins can view audit logs"
  ON public.admin_audit_log FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- System can insert audit logs (for triggers)
CREATE POLICY "System can insert audit logs"
  ON public.admin_audit_log FOR INSERT
  WITH CHECK (true);

-- ============================================================================
-- 5. CREATE HELPER FUNCTIONS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for business_claims
DROP TRIGGER IF EXISTS update_business_claims_updated_at ON public.business_claims;
CREATE TRIGGER update_business_claims_updated_at
  BEFORE UPDATE ON public.business_claims
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================================
-- 6. GRANT PERMISSIONS
-- ============================================================================

-- Grant necessary permissions to authenticated users
GRANT SELECT, INSERT ON public.business_claims TO authenticated;
GRANT SELECT, INSERT ON public.content_reports TO authenticated;
GRANT SELECT ON public.admin_audit_log TO authenticated;

-- Note: Admins need UPDATE permissions, which are handled by RLS policies

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================

-- Add migration log
COMMENT ON TABLE public.business_claims IS 'Stores business ownership claim requests for admin review';
COMMENT ON TABLE public.content_reports IS 'Stores user-reported content for moderation queue';
COMMENT ON TABLE public.admin_audit_log IS 'Tracks all admin actions for accountability and auditing';
