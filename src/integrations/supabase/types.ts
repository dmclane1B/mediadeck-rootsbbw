export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      analytics_conversions: {
        Row: {
          conversion_type: string
          conversion_value: number | null
          currency: string | null
          id: string
          page_path: string | null
          referrer: string | null
          session_id: string
          timestamp: string
          user_id: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          conversion_type: string
          conversion_value?: number | null
          currency?: string | null
          id?: string
          page_path?: string | null
          referrer?: string | null
          session_id: string
          timestamp?: string
          user_id?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          conversion_type?: string
          conversion_value?: number | null
          currency?: string | null
          id?: string
          page_path?: string | null
          referrer?: string | null
          session_id?: string
          timestamp?: string
          user_id?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      analytics_events: {
        Row: {
          browser: string | null
          city: string | null
          country: string | null
          device_type: string | null
          event_name: string
          event_properties: Json | null
          id: string
          ip_address: string | null
          os: string | null
          page_path: string | null
          referrer: string | null
          screen_resolution: string | null
          session_id: string
          timestamp: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          browser?: string | null
          city?: string | null
          country?: string | null
          device_type?: string | null
          event_name: string
          event_properties?: Json | null
          id?: string
          ip_address?: string | null
          os?: string | null
          page_path?: string | null
          referrer?: string | null
          screen_resolution?: string | null
          session_id: string
          timestamp?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          browser?: string | null
          city?: string | null
          country?: string | null
          device_type?: string | null
          event_name?: string
          event_properties?: Json | null
          id?: string
          ip_address?: string | null
          os?: string | null
          page_path?: string | null
          referrer?: string | null
          screen_resolution?: string | null
          session_id?: string
          timestamp?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      analytics_page_views: {
        Row: {
          id: string
          page_path: string
          page_title: string | null
          referrer: string | null
          scroll_depth: number | null
          session_id: string
          time_on_page: number | null
          timestamp: string
          user_id: string | null
        }
        Insert: {
          id?: string
          page_path: string
          page_title?: string | null
          referrer?: string | null
          scroll_depth?: number | null
          session_id: string
          time_on_page?: number | null
          timestamp?: string
          user_id?: string | null
        }
        Update: {
          id?: string
          page_path?: string
          page_title?: string | null
          referrer?: string | null
          scroll_depth?: number | null
          session_id?: string
          time_on_page?: number | null
          timestamp?: string
          user_id?: string | null
        }
        Relationships: []
      }
      analytics_sessions: {
        Row: {
          bounce: boolean | null
          browser: string | null
          city: string | null
          country: string | null
          device_type: string | null
          duration: number | null
          end_time: string | null
          events_count: number | null
          id: string
          ip_address: string | null
          os: string | null
          page_views: number | null
          referrer: string | null
          session_id: string
          start_time: string
          user_agent: string | null
          user_id: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          bounce?: boolean | null
          browser?: string | null
          city?: string | null
          country?: string | null
          device_type?: string | null
          duration?: number | null
          end_time?: string | null
          events_count?: number | null
          id?: string
          ip_address?: string | null
          os?: string | null
          page_views?: number | null
          referrer?: string | null
          session_id: string
          start_time?: string
          user_agent?: string | null
          user_id?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          bounce?: boolean | null
          browser?: string | null
          city?: string | null
          country?: string | null
          device_type?: string | null
          duration?: number | null
          end_time?: string | null
          events_count?: number | null
          id?: string
          ip_address?: string | null
          os?: string | null
          page_views?: number | null
          referrer?: string | null
          session_id?: string
          start_time?: string
          user_agent?: string | null
          user_id?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      analytics_user_journeys: {
        Row: {
          action_type: string | null
          element_id: string | null
          id: string
          page_path: string | null
          session_id: string
          step_name: string
          step_order: number
          timestamp: string
          user_id: string | null
        }
        Insert: {
          action_type?: string | null
          element_id?: string | null
          id?: string
          page_path?: string | null
          session_id: string
          step_name: string
          step_order: number
          timestamp?: string
          user_id?: string | null
        }
        Update: {
          action_type?: string | null
          element_id?: string | null
          id?: string
          page_path?: string | null
          session_id?: string
          step_name?: string
          step_order?: number
          timestamp?: string
          user_id?: string | null
        }
        Relationships: []
      }
      assets: {
        Row: {
          alt_text: string | null
          category: string | null
          created_at: string
          created_by: string | null
          description: string | null
          file_path: string
          file_size: number | null
          file_type: string
          filename: string
          id: string
          metadata: Json | null
          original_name: string
          tags: string[] | null
          updated_at: string
        }
        Insert: {
          alt_text?: string | null
          category?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          file_path: string
          file_size?: number | null
          file_type: string
          filename: string
          id?: string
          metadata?: Json | null
          original_name: string
          tags?: string[] | null
          updated_at?: string
        }
        Update: {
          alt_text?: string | null
          category?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          file_path?: string
          file_size?: number | null
          file_type?: string
          filename?: string
          id?: string
          metadata?: Json | null
          original_name?: string
          tags?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          id: string
          new_data: Json | null
          old_data: Json | null
          operation: string
          performed_by: string
          table_name: string
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          new_data?: Json | null
          old_data?: Json | null
          operation: string
          performed_by: string
          table_name: string
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          new_data?: Json | null
          old_data?: Json | null
          operation?: string
          performed_by?: string
          table_name?: string
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      bookings: {
        Row: {
          booking_date: string
          booking_time: string
          created_at: string
          customer_id: string
          id: string
          notes: string | null
          service_id: string
          status: string
          updated_at: string
        }
        Insert: {
          booking_date: string
          booking_time: string
          created_at?: string
          customer_id: string
          id?: string
          notes?: string | null
          service_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          booking_date?: string
          booking_time?: string
          created_at?: string
          customer_id?: string
          id?: string
          notes?: string | null
          service_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      case_studies: {
        Row: {
          category: string | null
          challenge: string | null
          client_name: string | null
          created_at: string
          description: string | null
          featured: boolean | null
          gallery_images: string[] | null
          id: string
          image_url: string | null
          process_steps: Json | null
          project_duration: string | null
          project_url: string | null
          result_metric: string | null
          seo_meta: Json | null
          solution: string | null
          sort_order: number | null
          status: string | null
          tags: string[] | null
          team_size: number | null
          testimonial_author: string | null
          testimonial_quote: string | null
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          category?: string | null
          challenge?: string | null
          client_name?: string | null
          created_at?: string
          description?: string | null
          featured?: boolean | null
          gallery_images?: string[] | null
          id?: string
          image_url?: string | null
          process_steps?: Json | null
          project_duration?: string | null
          project_url?: string | null
          result_metric?: string | null
          seo_meta?: Json | null
          solution?: string | null
          sort_order?: number | null
          status?: string | null
          tags?: string[] | null
          team_size?: number | null
          testimonial_author?: string | null
          testimonial_quote?: string | null
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          category?: string | null
          challenge?: string | null
          client_name?: string | null
          created_at?: string
          description?: string | null
          featured?: boolean | null
          gallery_images?: string[] | null
          id?: string
          image_url?: string | null
          process_steps?: Json | null
          project_duration?: string | null
          project_url?: string | null
          result_metric?: string | null
          seo_meta?: Json | null
          solution?: string | null
          sort_order?: number | null
          status?: string | null
          tags?: string[] | null
          team_size?: number | null
          testimonial_author?: string | null
          testimonial_quote?: string | null
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          active: boolean | null
          created_at: string
          description: string | null
          id: string
          name: string
          slug: string
          sort_order: number | null
          type: string
          updated_at: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          slug: string
          sort_order?: number | null
          type: string
          updated_at?: string
        }
        Update: {
          active?: boolean | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          slug?: string
          sort_order?: number | null
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      consultation_bookings: {
        Row: {
          amount: number
          budget_range: string | null
          consultation_type: string
          created_at: string
          currency: string | null
          customer_company: string | null
          customer_email: string
          customer_name: string
          customer_phone: string | null
          id: string
          project_details: string | null
          status: string | null
          stripe_session_id: string | null
          timeline: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount: number
          budget_range?: string | null
          consultation_type: string
          created_at?: string
          currency?: string | null
          customer_company?: string | null
          customer_email: string
          customer_name: string
          customer_phone?: string | null
          id?: string
          project_details?: string | null
          status?: string | null
          stripe_session_id?: string | null
          timeline?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          budget_range?: string | null
          consultation_type?: string
          created_at?: string
          currency?: string | null
          customer_company?: string | null
          customer_email?: string
          customer_name?: string
          customer_phone?: string | null
          id?: string
          project_details?: string | null
          status?: string | null
          stripe_session_id?: string | null
          timeline?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      media_showcase: {
        Row: {
          category: string | null
          client_name: string | null
          created_at: string
          created_by: string | null
          description: string | null
          external_link: string | null
          featured: boolean | null
          gallery_images: string[] | null
          id: string
          metadata: Json | null
          primary_image_url: string | null
          project_type: string | null
          sort_order: number | null
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          category?: string | null
          client_name?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          external_link?: string | null
          featured?: boolean | null
          gallery_images?: string[] | null
          id?: string
          metadata?: Json | null
          primary_image_url?: string | null
          project_type?: string | null
          sort_order?: number | null
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          category?: string | null
          client_name?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          external_link?: string | null
          featured?: boolean | null
          gallery_images?: string[] | null
          id?: string
          metadata?: Json | null
          primary_image_url?: string | null
          project_type?: string | null
          sort_order?: number | null
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          full_name: string | null
          id: string
          role: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string | null
          id?: string
          role?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          role?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          duration: number
          id: string
          name: string
          price: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          duration: number
          id?: string
          name: string
          price: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          duration?: number
          id?: string
          name?: string
          price?: number
          updated_at?: string
        }
        Relationships: []
      }
      site_content: {
        Row: {
          content_data: Json
          content_type: string
          created_at: string
          created_by: string | null
          id: string
          section_name: string
          updated_at: string
        }
        Insert: {
          content_data: Json
          content_type: string
          created_at?: string
          created_by?: string | null
          id?: string
          section_name: string
          updated_at?: string
        }
        Update: {
          content_data?: Json
          content_type?: string
          created_at?: string
          created_by?: string | null
          id?: string
          section_name?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      anonymize_customer_data: {
        Args: { booking_id: string }
        Returns: boolean
      }
      check_admin_rate_limit: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      emergency_customer_data_lockdown: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      get_admin_customer_data: {
        Args: Record<PropertyKey, never>
        Returns: {
          created_at: string
          email: string
          full_name: string
          id: string
          role: string
          user_id: string
        }[]
      }
      get_analytics_summary: {
        Args: { end_date?: string; start_date?: string }
        Returns: {
          avg_session_duration: number
          bounce_rate: number
          daily_stats: Json
          top_events: Json
          top_pages: Json
          total_events: number
          total_page_views: number
          total_sessions: number
          total_users: number
        }[]
      }
      get_customer_bookings_secure: {
        Args: { include_sensitive_data?: boolean }
        Returns: {
          amount: number
          budget_range: string
          consultation_type: string
          created_at: string
          currency: string
          customer_company: string
          customer_email: string
          customer_name: string
          customer_phone: string
          id: string
          project_details: string
          status: string
          timeline: string
          updated_at: string
        }[]
      }
      get_profiles_secure: {
        Args: { include_sensitive_data?: boolean }
        Returns: {
          created_at: string
          email: string
          full_name: string
          id: string
          role: string
          updated_at: string
          user_id: string
        }[]
      }
      get_safe_profile_data: {
        Args: { profile_user_id?: string }
        Returns: {
          created_at: string
          email: string
          full_name: string
          id: string
          role: string
          updated_at: string
          user_id: string
        }[]
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_admin_bulletproof: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_current_user_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      mask_customer_data: {
        Args: { email: string; phone?: string }
        Returns: Json
      }
      mask_customer_email: {
        Args: { email: string }
        Returns: string
      }
      mask_customer_name: {
        Args: { name: string }
        Returns: string
      }
      mask_customer_phone: {
        Args: { phone: string }
        Returns: string
      }
      secure_data_access_control: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      update_session_end_time: {
        Args: { p_session_id: string }
        Returns: undefined
      }
      verify_admin_access: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
