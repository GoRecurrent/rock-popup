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
      articles: {
        Row: {
          content: string
          created_at: string
          excerpt: string | null
          featured_image: string | null
          id: string
          meta_description: string | null
          published: boolean
          published_at: string | null
          seo_keywords: string[] | null
          seo_title: string | null
          slug: string
          social_image: string | null
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          meta_description?: string | null
          published?: boolean
          published_at?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          slug: string
          social_image?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          meta_description?: string | null
          published?: boolean
          published_at?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          slug?: string
          social_image?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      content_results: {
        Row: {
          completed_at: string | null
          created_at: string
          description: string | null
          error: string | null
          html_content: string | null
          id: string
          intended_audience: string | null
          keywords: string | null
          meta_keywords: string | null
          project_id: string | null
          sample_content: string | null
          status: string
          text_content: string | null
          title: string | null
          url: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          description?: string | null
          error?: string | null
          html_content?: string | null
          id?: string
          intended_audience?: string | null
          keywords?: string | null
          meta_keywords?: string | null
          project_id?: string | null
          sample_content?: string | null
          status?: string
          text_content?: string | null
          title?: string | null
          url?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          description?: string | null
          error?: string | null
          html_content?: string | null
          id?: string
          intended_audience?: string | null
          keywords?: string | null
          meta_keywords?: string | null
          project_id?: string | null
          sample_content?: string | null
          status?: string
          text_content?: string | null
          title?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_results_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      csi_ssr_project_controller: {
        Row: {
          cc_emails: string | null
          changes_since_last_email: number | null
          created_at: string | null
          customer_email: string | null
          customer_name: string | null
          doc_id: string | null
          drive_id: string | null
          frequency: string | null
          id: number
          last_data_file: string | null
          last_email_date: string | null
          last_modified_by: string | null
          last_modified_date: string | null
          pm_email: string | null
          pm_name: string | null
          project_name: string | null
          rolling_changes: string | null
          send_direct_to_customer: boolean
          send_when_no_changes: boolean
          share_link: string | null
          site_id: string | null
          status: string | null
          style_layout: string
        }
        Insert: {
          cc_emails?: string | null
          changes_since_last_email?: number | null
          created_at?: string | null
          customer_email?: string | null
          customer_name?: string | null
          doc_id?: string | null
          drive_id?: string | null
          frequency?: string | null
          id?: number
          last_data_file?: string | null
          last_email_date?: string | null
          last_modified_by?: string | null
          last_modified_date?: string | null
          pm_email?: string | null
          pm_name?: string | null
          project_name?: string | null
          rolling_changes?: string | null
          send_direct_to_customer?: boolean
          send_when_no_changes?: boolean
          share_link?: string | null
          site_id?: string | null
          status?: string | null
          style_layout?: string
        }
        Update: {
          cc_emails?: string | null
          changes_since_last_email?: number | null
          created_at?: string | null
          customer_email?: string | null
          customer_name?: string | null
          doc_id?: string | null
          drive_id?: string | null
          frequency?: string | null
          id?: number
          last_data_file?: string | null
          last_email_date?: string | null
          last_modified_by?: string | null
          last_modified_date?: string | null
          pm_email?: string | null
          pm_name?: string | null
          project_name?: string | null
          rolling_changes?: string | null
          send_direct_to_customer?: boolean
          send_when_no_changes?: boolean
          share_link?: string | null
          site_id?: string | null
          status?: string | null
          style_layout?: string
        }
        Relationships: []
      }
      jonas_articles: {
        Row: {
          content: string
          created_at: string
          excerpt: string | null
          featured_image: string | null
          id: string
          meta_description: string | null
          published: boolean
          published_at: string | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          meta_description?: string | null
          published?: boolean
          published_at?: string | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          meta_description?: string | null
          published?: boolean
          published_at?: string | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      optimization_results: {
        Row: {
          completed_at: string | null
          created_at: string
          description: string | null
          error: string | null
          id: string
          keywords: string | null
          meta_keywords: string | null
          on_page_description: string | null
          project_id: string | null
          status: string
          title: string | null
          url: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          description?: string | null
          error?: string | null
          id?: string
          keywords?: string | null
          meta_keywords?: string | null
          on_page_description?: string | null
          project_id?: string | null
          status?: string
          title?: string | null
          url: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          description?: string | null
          error?: string | null
          id?: string
          keywords?: string | null
          meta_keywords?: string | null
          on_page_description?: string | null
          project_id?: string | null
          status?: string
          title?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "optimization_results_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string
          description: string | null
          domain: string | null
          id: string
          name: string
          project_type: string
          sitemap_last_import: string | null
          sitemap_url: string | null
          sitemap_urls_count: number | null
          status: string
          updated_at: string
          urls: string[] | null
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          domain?: string | null
          id?: string
          name: string
          project_type?: string
          sitemap_last_import?: string | null
          sitemap_url?: string | null
          sitemap_urls_count?: number | null
          status?: string
          updated_at?: string
          urls?: string[] | null
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          domain?: string | null
          id?: string
          name?: string
          project_type?: string
          sitemap_last_import?: string | null
          sitemap_url?: string | null
          sitemap_urls_count?: number | null
          status?: string
          updated_at?: string
          urls?: string[] | null
          user_id?: string
        }
        Relationships: []
      }
      ruffcase_accounting: {
        Row: {
          amount: number | null
          date: string | null
          description: string | null
          id: number
          important: boolean | null
          project_name: string | null
          reference_doc: string | null
          reference_id: string | null
          task: string | null
          type: string | null
        }
        Insert: {
          amount?: number | null
          date?: string | null
          description?: string | null
          id?: number
          important?: boolean | null
          project_name?: string | null
          reference_doc?: string | null
          reference_id?: string | null
          task?: string | null
          type?: string | null
        }
        Update: {
          amount?: number | null
          date?: string | null
          description?: string | null
          id?: number
          important?: boolean | null
          project_name?: string | null
          reference_doc?: string | null
          reference_id?: string | null
          task?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ruffcase_accounting_project_name_fkey"
            columns: ["project_name"]
            isOneToOne: false
            referencedRelation: "ruffcase_projects"
            referencedColumns: ["project_name"]
          },
        ]
      }
      ruffcase_projects: {
        Row: {
          created_at: string
          data_file_id: string | null
          data_freshness: boolean | null
          problems: Json | null
          project_name: string
          shared_links: Json[] | null
          status: string | null
          total_items: number | null
        }
        Insert: {
          created_at?: string
          data_file_id?: string | null
          data_freshness?: boolean | null
          problems?: Json | null
          project_name: string
          shared_links?: Json[] | null
          status?: string | null
          total_items?: number | null
        }
        Update: {
          created_at?: string
          data_file_id?: string | null
          data_freshness?: boolean | null
          problems?: Json | null
          project_name?: string
          shared_links?: Json[] | null
          status?: string | null
          total_items?: number | null
        }
        Relationships: []
      }
      sops: {
        Row: {
          created_at: string
          file_url: string | null
          id: string
          name: string
          request_text: string
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          file_url?: string | null
          id?: string
          name: string
          request_text: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          file_url?: string | null
          id?: string
          name?: string
          request_text?: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      waste_water_sops: {
        Row: {
          created_at: string
          file: string
          id: string
          name: string
          project: string | null
          status: string
          type: string | null
        }
        Insert: {
          created_at?: string
          file: string
          id?: string
          name: string
          project?: string | null
          status: string
          type?: string | null
        }
        Update: {
          created_at?: string
          file?: string
          id?: string
          name?: string
          project?: string | null
          status?: string
          type?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_edit_project_domain: {
        Args: { project_id: string }
        Returns: boolean
      }
      generate_slug: { Args: { title: string }; Returns: string }
      soft_delete_waste_water_sop: {
        Args: { sop_id: string }
        Returns: undefined
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
