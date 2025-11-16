/**
 * Database types for Midtown Book
 * These types correspond to the Supabase database schema
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          role: 'user' | 'business_owner' | 'admin';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: 'user' | 'business_owner' | 'admin';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: 'user' | 'business_owner' | 'admin';
          created_at?: string;
          updated_at?: string;
        };
      };
      businesses: {
        Row: {
          id: string;
          owner_id: string;
          name: string;
          slug: string;
          description: string | null;
          category_id: string;
          subcategory: string | null;
          address: string;
          city: string;
          state: string;
          zip_code: string;
          latitude: number;
          longitude: number;
          phone: string | null;
          email: string | null;
          website: string | null;
          hours: Json | null;
          logo_url: string | null;
          cover_image_url: string | null;
          images: string[] | null;
          amenities: string[] | null;
          price_range: 1 | 2 | 3 | 4 | null;
          is_verified: boolean;
          is_featured: boolean;
          is_active: boolean;
          subscription_tier: 'free' | 'basic' | 'premium' | 'featured';
          subscription_expires_at: string | null;
          view_count: number;
          claim_status: 'unclaimed' | 'pending' | 'claimed';
          // Mid-Town Lakeland positioning fields
          distance_to_bonnet_springs: number | null;
          distance_to_tigers_stadium: number | null;
          is_park_adjacent: boolean;
          is_game_day_venue: boolean;
          memorial_boulevard_location: boolean;
          business_tags: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          name: string;
          slug: string;
          description?: string | null;
          category_id: string;
          subcategory?: string | null;
          address: string;
          city: string;
          state: string;
          zip_code: string;
          latitude: number;
          longitude: number;
          phone?: string | null;
          email?: string | null;
          website?: string | null;
          hours?: Json | null;
          logo_url?: string | null;
          cover_image_url?: string | null;
          images?: string[] | null;
          amenities?: string[] | null;
          price_range?: 1 | 2 | 3 | 4 | null;
          is_verified?: boolean;
          is_featured?: boolean;
          is_active?: boolean;
          subscription_tier?: 'free' | 'basic' | 'premium' | 'featured';
          subscription_expires_at?: string | null;
          view_count?: number;
          claim_status?: 'unclaimed' | 'pending' | 'claimed';
          // Mid-Town Lakeland positioning fields
          distance_to_bonnet_springs?: number | null;
          distance_to_tigers_stadium?: number | null;
          is_park_adjacent?: boolean;
          is_game_day_venue?: boolean;
          memorial_boulevard_location?: boolean;
          business_tags?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          owner_id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          category_id?: string;
          subcategory?: string | null;
          address?: string;
          city?: string;
          state?: string;
          zip_code?: string;
          latitude?: number;
          longitude?: number;
          phone?: string | null;
          email?: string | null;
          website?: string | null;
          hours?: Json | null;
          logo_url?: string | null;
          cover_image_url?: string | null;
          images?: string[] | null;
          amenities?: string[] | null;
          price_range?: 1 | 2 | 3 | 4 | null;
          is_verified?: boolean;
          is_featured?: boolean;
          is_active?: boolean;
          subscription_tier?: 'free' | 'basic' | 'premium' | 'featured';
          subscription_expires_at?: string | null;
          view_count?: number;
          claim_status?: 'unclaimed' | 'pending' | 'claimed';
          // Mid-Town Lakeland positioning fields
          distance_to_bonnet_springs?: number | null;
          distance_to_tigers_stadium?: number | null;
          is_park_adjacent?: boolean;
          is_game_day_venue?: boolean;
          memorial_boulevard_location?: boolean;
          business_tags?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          icon: string | null;
          parent_id: string | null;
          order: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          icon?: string | null;
          parent_id?: string | null;
          order?: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          icon?: string | null;
          parent_id?: string | null;
          order?: number;
          is_active?: boolean;
          created_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          business_id: string;
          user_id: string;
          rating: number;
          title: string | null;
          content: string;
          images: string[] | null;
          is_verified_purchase: boolean;
          helpful_count: number;
          is_flagged: boolean;
          is_approved: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          business_id: string;
          user_id: string;
          rating: number;
          title?: string | null;
          content: string;
          images?: string[] | null;
          is_verified_purchase?: boolean;
          helpful_count?: number;
          is_flagged?: boolean;
          is_approved?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          business_id?: string;
          user_id?: string;
          rating?: number;
          title?: string | null;
          content?: string;
          images?: string[] | null;
          is_verified_purchase?: boolean;
          helpful_count?: number;
          is_flagged?: boolean;
          is_approved?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      events: {
        Row: {
          id: string;
          business_id: string;
          title: string;
          slug: string;
          description: string;
          start_date: string;
          end_date: string;
          location: string | null;
          is_online: boolean;
          event_url: string | null;
          image_url: string | null;
          price: number | null;
          max_attendees: number | null;
          is_active: boolean;
          // Mid-Town Lakeland event fields
          event_type: 'general' | 'park_event' | 'tigers_game' | 'memorial_boulevard_event' | 'neighborhood_activity';
          is_featured_event: boolean;
          related_attraction: 'bonnet_springs_park' | 'tigers_stadium' | 'memorial_boulevard' | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          business_id: string;
          title: string;
          slug: string;
          description: string;
          start_date: string;
          end_date: string;
          location?: string | null;
          is_online?: boolean;
          event_url?: string | null;
          image_url?: string | null;
          price?: number | null;
          max_attendees?: number | null;
          is_active?: boolean;
          // Mid-Town Lakeland event fields
          event_type?: 'general' | 'park_event' | 'tigers_game' | 'memorial_boulevard_event' | 'neighborhood_activity';
          is_featured_event?: boolean;
          related_attraction?: 'bonnet_springs_park' | 'tigers_stadium' | 'memorial_boulevard' | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          business_id?: string;
          title?: string;
          slug?: string;
          description?: string;
          start_date?: string;
          end_date?: string;
          location?: string | null;
          is_online?: boolean;
          event_url?: string | null;
          image_url?: string | null;
          price?: number | null;
          max_attendees?: number | null;
          is_active?: boolean;
          // Mid-Town Lakeland event fields
          event_type?: 'general' | 'park_event' | 'tigers_game' | 'memorial_boulevard_event' | 'neighborhood_activity';
          is_featured_event?: boolean;
          related_attraction?: 'bonnet_springs_park' | 'tigers_stadium' | 'memorial_boulevard' | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      deals: {
        Row: {
          id: string;
          business_id: string;
          title: string;
          description: string;
          discount_type: 'percentage' | 'fixed' | 'bogo' | 'other';
          discount_value: number | null;
          code: string | null;
          terms: string | null;
          start_date: string;
          end_date: string;
          is_active: boolean;
          redemption_count: number;
          // Mid-Town Lakeland deal fields
          deal_category: 'standard' | 'show_your_ticket' | 'park_visitor' | 'game_day' | 'memorial_boulevard_special';
          requires_proof: boolean;
          proof_type: 'park_receipt' | 'park_ticket' | 'game_ticket' | 'parking_receipt' | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          business_id: string;
          title: string;
          description: string;
          discount_type: 'percentage' | 'fixed' | 'bogo' | 'other';
          discount_value?: number | null;
          code?: string | null;
          terms?: string | null;
          start_date: string;
          end_date: string;
          is_active?: boolean;
          redemption_count?: number;
          // Mid-Town Lakeland deal fields
          deal_category?: 'standard' | 'show_your_ticket' | 'park_visitor' | 'game_day' | 'memorial_boulevard_special';
          requires_proof?: boolean;
          proof_type?: 'park_receipt' | 'park_ticket' | 'game_ticket' | 'parking_receipt' | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          business_id?: string;
          title?: string;
          description?: string;
          discount_type?: 'percentage' | 'fixed' | 'bogo' | 'other';
          discount_value?: number | null;
          code?: string | null;
          terms?: string | null;
          start_date?: string;
          end_date?: string;
          is_active?: boolean;
          redemption_count?: number;
          // Mid-Town Lakeland deal fields
          deal_category?: 'standard' | 'show_your_ticket' | 'park_visitor' | 'game_day' | 'memorial_boulevard_special';
          requires_proof?: boolean;
          proof_type?: 'park_receipt' | 'park_ticket' | 'game_ticket' | 'parking_receipt' | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      user_role: 'user' | 'business_owner' | 'admin';
      subscription_tier: 'free' | 'basic' | 'premium' | 'featured';
      claim_status: 'unclaimed' | 'pending' | 'claimed';
      discount_type: 'percentage' | 'fixed' | 'bogo' | 'other';
      deal_category: 'standard' | 'show_your_ticket' | 'park_visitor' | 'game_day' | 'memorial_boulevard_special';
      proof_type: 'park_receipt' | 'park_ticket' | 'game_ticket' | 'parking_receipt';
      event_type: 'general' | 'park_event' | 'tigers_game' | 'memorial_boulevard_event' | 'neighborhood_activity';
      attraction_type: 'bonnet_springs_park' | 'tigers_stadium' | 'memorial_boulevard';
    };
  };
}

// Helper types for easier use
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Business = Database['public']['Tables']['businesses']['Row'];
export type Category = Database['public']['Tables']['categories']['Row'];
export type Review = Database['public']['Tables']['reviews']['Row'];
export type Event = Database['public']['Tables']['events']['Row'];
export type Deal = Database['public']['Tables']['deals']['Row'];

export type InsertProfile = Database['public']['Tables']['profiles']['Insert'];
export type InsertBusiness = Database['public']['Tables']['businesses']['Insert'];
export type InsertCategory = Database['public']['Tables']['categories']['Insert'];
export type InsertReview = Database['public']['Tables']['reviews']['Insert'];
export type InsertEvent = Database['public']['Tables']['events']['Insert'];
export type InsertDeal = Database['public']['Tables']['deals']['Insert'];

export type UpdateProfile = Database['public']['Tables']['profiles']['Update'];
export type UpdateBusiness = Database['public']['Tables']['businesses']['Update'];
export type UpdateCategory = Database['public']['Tables']['categories']['Update'];
export type UpdateReview = Database['public']['Tables']['reviews']['Update'];
export type UpdateEvent = Database['public']['Tables']['events']['Update'];
export type UpdateDeal = Database['public']['Tables']['deals']['Update'];
