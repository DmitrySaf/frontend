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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      channel_grants: {
        Row: {
          channel_id: string
          granted_at: string
          id: string
          user_id: string
        }
        Insert: {
          channel_id: string
          granted_at?: string
          id?: string
          user_id: string
        }
        Update: {
          channel_id?: string
          granted_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "channel_grants_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "community_channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "channel_grants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      communities: {
        Row: {
          cover_url: string | null
          created_at: string | null
          description: string
          display_name: string
          id: string
          logo_url: string | null
          name: string
          owner_id: string
          updated_at: string | null
          visibility: string
        }
        Insert: {
          cover_url?: string | null
          created_at?: string | null
          description?: string
          display_name: string
          id?: string
          logo_url?: string | null
          name: string
          owner_id: string
          updated_at?: string | null
          visibility?: string
        }
        Update: {
          cover_url?: string | null
          created_at?: string | null
          description?: string
          display_name?: string
          id?: string
          logo_url?: string | null
          name?: string
          owner_id?: string
          updated_at?: string | null
          visibility?: string
        }
        Relationships: [
          {
            foreignKeyName: "communities_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      community_categories: {
        Row: {
          community_id: string
          created_at: string
          id: string
          name: string
          position: number
        }
        Insert: {
          community_id: string
          created_at?: string
          id?: string
          name: string
          position?: number
        }
        Update: {
          community_id?: string
          created_at?: string
          id?: string
          name?: string
          position?: number
        }
        Relationships: [
          {
            foreignKeyName: "community_categories_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
        ]
      }
      community_channels: {
        Row: {
          access: string
          category_id: string | null
          community_id: string
          created_at: string
          id: string
          name: string
          position: number
          slug: string
          type: string
        }
        Insert: {
          access?: string
          category_id?: string | null
          community_id: string
          created_at?: string
          id?: string
          name: string
          position?: number
          slug: string
          type: string
        }
        Update: {
          access?: string
          category_id?: string | null
          community_id?: string
          created_at?: string
          id?: string
          name?: string
          position?: number
          slug?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_channels_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "community_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_channels_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
        ]
      }
      community_invites: {
        Row: {
          channel_id: string | null
          code: string
          community_id: string
          created_at: string
          created_by: string
          expires_at: string | null
          id: string
          max_uses: number | null
          revoked_at: string | null
          uses: number
        }
        Insert: {
          channel_id?: string | null
          code: string
          community_id: string
          created_at?: string
          created_by: string
          expires_at?: string | null
          id?: string
          max_uses?: number | null
          revoked_at?: string | null
          uses?: number
        }
        Update: {
          channel_id?: string | null
          code?: string
          community_id?: string
          created_at?: string
          created_by?: string
          expires_at?: string | null
          id?: string
          max_uses?: number | null
          revoked_at?: string | null
          uses?: number
        }
        Relationships: [
          {
            foreignKeyName: "community_invites_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "community_channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_invites_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_invites_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      community_members: {
        Row: {
          community_id: string
          id: string
          joined_at: string
          role: string
          user_id: string
        }
        Insert: {
          community_id: string
          id?: string
          joined_at?: string
          role?: string
          user_id: string
        }
        Update: {
          community_id?: string
          id?: string
          joined_at?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_members_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      community_storefronts: {
        Row: {
          community_id: string
          description: string
          features: Json
          id: string
          media: Json
          updated_at: string | null
        }
        Insert: {
          community_id: string
          description?: string
          features?: Json
          id?: string
          media?: Json
          updated_at?: string | null
        }
        Update: {
          community_id?: string
          description?: string
          features?: Json
          id?: string
          media?: Json
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "community_storefronts_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: true
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
        ]
      }
      course_lessons: {
        Row: {
          created_at: string
          description: string
          duration_seconds: number | null
          id: string
          module_id: string
          position: number
          title: string
          video_path: string | null
        }
        Insert: {
          created_at?: string
          description?: string
          duration_seconds?: number | null
          id?: string
          module_id: string
          position?: number
          title: string
          video_path?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          duration_seconds?: number | null
          id?: string
          module_id?: string
          position?: number
          title?: string
          video_path?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_lessons_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "course_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      course_modules: {
        Row: {
          course_id: string
          created_at: string
          id: string
          position: number
          title: string
        }
        Insert: {
          course_id: string
          created_at?: string
          id?: string
          position?: number
          title: string
        }
        Update: {
          course_id?: string
          created_at?: string
          id?: string
          position?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_modules_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          channel_id: string
          cover_url: string | null
          created_at: string
          description: string
          id: string
          title: string
        }
        Insert: {
          channel_id: string
          cover_url?: string | null
          created_at?: string
          description?: string
          id?: string
          title?: string
        }
        Update: {
          channel_id?: string
          cover_url?: string | null
          created_at?: string
          description?: string
          id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "courses_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: true
            referencedRelation: "community_channels"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_progress: {
        Row: {
          completed_at: string
          id: string
          lesson_id: string
          user_id: string
        }
        Insert: {
          completed_at?: string
          id?: string
          lesson_id: string
          user_id: string
        }
        Update: {
          completed_at?: string
          id?: string
          lesson_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "course_lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lesson_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          attachments: Json | null
          author_id: string
          channel_id: string
          content: string
          created_at: string
          deleted_at: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          attachments?: Json | null
          author_id: string
          channel_id: string
          content: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          attachments?: Json | null
          author_id?: string
          channel_id?: string
          content?: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "community_channels"
            referencedColumns: ["id"]
          },
        ]
      }
      payout_methods: {
        Row: {
          brand: string
          created_at: string
          holder_name: string
          id: string
          is_default: boolean
          kind: string
          last4: string
          user_id: string
        }
        Insert: {
          brand: string
          created_at?: string
          holder_name: string
          id?: string
          is_default?: boolean
          kind?: string
          last4: string
          user_id: string
        }
        Update: {
          brand?: string
          created_at?: string
          holder_name?: string
          id?: string
          is_default?: boolean
          kind?: string
          last4?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payout_methods_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      post_bookmarks: {
        Row: {
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_bookmarks_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_bookmarks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      post_comments: {
        Row: {
          author_id: string
          content: string
          created_at: string
          id: string
          post_id: string
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string
          id?: string
          post_id: string
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          id?: string
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_comments_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_likes: {
        Row: {
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          author_id: string
          channel_id: string
          content: string
          cover_url: string | null
          created_at: string
          id: string
          pinned: boolean
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id: string
          channel_id: string
          content: string
          cover_url?: string | null
          created_at?: string
          id?: string
          pinned?: boolean
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string
          channel_id?: string
          content?: string
          cover_url?: string | null
          created_at?: string
          id?: string
          pinned?: boolean
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "community_channels"
            referencedColumns: ["id"]
          },
        ]
      }
      pricing_tiers: {
        Row: {
          community_id: string
          created_at: string
          discount_percent: number | null
          id: string
          is_active: boolean
          is_hidden: boolean
          kind: string
          name: string
          period_months: number | null
          position: number
          price_kopeks: number
        }
        Insert: {
          community_id: string
          created_at?: string
          discount_percent?: number | null
          id?: string
          is_active?: boolean
          is_hidden?: boolean
          kind: string
          name: string
          period_months?: number | null
          position?: number
          price_kopeks: number
        }
        Update: {
          community_id?: string
          created_at?: string
          discount_percent?: number | null
          id?: string
          is_active?: boolean
          is_hidden?: boolean
          kind?: string
          name?: string
          period_months?: number | null
          position?: number
          price_kopeks?: number
        }
        Relationships: [
          {
            foreignKeyName: "pricing_tiers_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_social_links: {
        Row: {
          created_at: string | null
          id: string
          label: string | null
          link: string
          platform: Database["public"]["Enums"]["social_platform"]
          profile_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          label?: string | null
          link: string
          platform: Database["public"]["Enums"]["social_platform"]
          profile_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          label?: string | null
          link?: string
          platform?: Database["public"]["Enums"]["social_platform"]
          profile_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_social_links_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string
          id: string
          privacy_settings: Json
          updated_at: string
          username: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name: string
          id: string
          privacy_settings?: Json
          updated_at?: string
          username: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string
          id?: string
          privacy_settings?: Json
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          community_id: string
          expires_at: string | null
          id: string
          started_at: string
          status: string
          tier_id: string | null
          user_id: string
        }
        Insert: {
          community_id: string
          expires_at?: string | null
          id?: string
          started_at?: string
          status?: string
          tier_id?: string | null
          user_id: string
        }
        Update: {
          community_id?: string
          expires_at?: string | null
          id?: string
          started_at?: string
          status?: string
          tier_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_tier_id_fkey"
            columns: ["tier_id"]
            isOneToOne: false
            referencedRelation: "pricing_tiers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount_kopeks: number
          community_id: string | null
          created_at: string
          id: string
          metadata: Json
          status: string
          type: string
          user_id: string
        }
        Insert: {
          amount_kopeks: number
          community_id?: string | null
          created_at?: string
          id?: string
          metadata?: Json
          status?: string
          type: string
          user_id: string
        }
        Update: {
          amount_kopeks?: number
          community_id?: string | null
          created_at?: string
          id?: string
          metadata?: Json
          status?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      verification_requests: {
        Row: {
          data: Json
          id: string
          kind: string
          status: string
          submitted_at: string
          user_id: string
        }
        Insert: {
          data?: Json
          id?: string
          kind: string
          status?: string
          submitted_at?: string
          user_id: string
        }
        Update: {
          data?: Json
          id?: string
          kind?: string
          status?: string
          submitted_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "verification_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_moderate_post: { Args: { p_post_id: string }; Returns: boolean }
      channel_community: { Args: { p_channel_id: string }; Returns: string }
      community_is_open: { Args: { p_community_id: string }; Returns: boolean }
      consume_invite: { Args: { p_code: string }; Returns: Json }
      course_channel: { Args: { p_course_id: string }; Returns: string }
      get_storefront: {
        Args: { p_invite_code?: string; p_slug: string }
        Returns: Json
      }
      has_channel_access: { Args: { p_channel_id: string }; Returns: boolean }
      has_channel_grant: { Args: { p_channel_id: string }; Returns: boolean }
      has_post_access: { Args: { p_post_id: string }; Returns: boolean }
      is_community_admin: { Args: { p_community_id: string }; Returns: boolean }
      is_community_member: {
        Args: { p_community_id: string }
        Returns: boolean
      }
      is_community_owner: { Args: { p_community_id: string }; Returns: boolean }
      join_free_community: {
        Args: { p_community_id: string }
        Returns: undefined
      }
      lesson_channel: { Args: { p_lesson_id: string }; Returns: string }
      module_channel: { Args: { p_module_id: string }; Returns: string }
      simulate_purchase: {
        Args: { p_invite_code?: string; p_tier_id: string }
        Returns: Json
      }
      update_profile_with_social_links: {
        Args: {
          p_avatar_url?: string
          p_bio?: string
          p_display_name?: string
          p_privacy_settings?: Json
          p_social_links?: Json
          p_username?: string
        }
        Returns: undefined
      }
    }
    Enums: {
      social_platform: "instagram" | "telegram" | "vk" | "youtube" | "website"
    }
    CompositeTypes: {
      social_link_data: {
        platform: Database["public"]["Enums"]["social_platform"] | null
        label: string | null
        link: string | null
      }
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
    Enums: {
      social_platform: ["instagram", "telegram", "vk", "youtube", "website"],
    },
  },
} as const
