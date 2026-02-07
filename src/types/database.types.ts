/**
 * Tipos de la base de datos de Supabase
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
      plans: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          price: number;
          tokens_limit: number;
          features: Json;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        message_feedback: {
          Row: {
            id: string;
            message_id: string;
            user_id: string;
            feedback_type: "like" | "dislike";
            created_at: string;
          };
          Insert: {
            id?: string;
            message_id: string;
            user_id: string;
            feedback_type: "like" | "dislike";
            created_at?: string;
          };
          Update: {
            id?: string;
            message_id?: string;
            user_id?: string;
            feedback_type?: "like" | "dislike";
            created_at?: string;
          };
        };

        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          price?: number;
          tokens_limit?: number;
          features?: Json;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          price?: number;
          tokens_limit?: number;
          features?: Json;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      ai_models: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          max_tokens: number;
          context_window: number;
          is_available: boolean;
          is_default: boolean;
          speed: string | null;
          quality: string | null;
          best_for: string[] | null;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          description?: string | null;
          max_tokens?: number;
          context_window?: number;
          is_available?: boolean;
          is_default?: boolean;
          speed?: string | null;
          quality?: string | null;
          best_for?: string[] | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          max_tokens?: number;
          context_window?: number;
          is_available?: boolean;
          is_default?: boolean;
          speed?: string | null;
          quality?: string | null;
          best_for?: string[] | null;
          created_at?: string;
        };
      };
      user_profiles: {
        Row: {
          id: string;
          user_id: string;
          username: string | null;
          full_name: string | null;
          avatar_url: string | null;
          plan_id: string | null;
          tokens_used: number;
          tokens_reset_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          plan_id?: string | null;
          tokens_used?: number;
          tokens_reset_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          plan_id?: string | null;
          tokens_used?: number;
          tokens_reset_at?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_settings: {
        Row: {
          id: string;
          user_id: string;
          theme: "dark" | "light" | "system";
          language: string;
          default_model: string | null;
          email_notifications: boolean;
          preferences: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          theme?: "dark" | "light" | "system";
          language?: string;
          default_model?: string | null;
          email_notifications?: boolean;
          preferences?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          theme?: "dark" | "light" | "system";
          language?: string;
          default_model?: string | null;
          email_notifications?: boolean;
          preferences?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
      conversations: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          model: string;
          system_prompt: string | null;
          message_count: number;
          total_tokens: number;
          is_archived: boolean;
          is_pinned: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title?: string;
          model?: string;
          system_prompt?: string | null;
          message_count?: number;
          total_tokens?: number;
          is_archived?: boolean;
          is_pinned?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          model?: string;
          system_prompt?: string | null;
          message_count?: number;
          total_tokens?: number;
          is_archived?: boolean;
          is_pinned?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          conversation_id: string;
          role: "user" | "assistant" | "system";
          content: string;
          tokens_used: number | null;
          model: string | null;
          metadata: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          role: "user" | "assistant" | "system";
          content: string;
          tokens_used?: number | null;
          model?: string | null;
          metadata?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          conversation_id?: string;
          role?: "user" | "assistant" | "system";
          content?: string;
          tokens_used?: number | null;
          model?: string | null;
          metadata?: Json | null;
          created_at?: string;
        };
      };
      usage_logs: {
        Row: {
          id: string;
          user_id: string;
          conversation_id: string | null;
          action: string;
          tokens_input: number;
          tokens_output: number;
          tokens_total: number;
          model: string | null;
          metadata: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          conversation_id?: string | null;
          action: string;
          tokens_input?: number;
          tokens_output?: number;
          tokens_total?: number;
          model?: string | null;
          metadata?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          conversation_id?: string | null;
          action?: string;
          tokens_input?: number;
          tokens_output?: number;
          tokens_total?: number;
          model?: string | null;
          metadata?: Json | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      delete_conversation_cascade: {
        Args: {
          p_user_id: string;
          p_conversation_id: string;
        };
        Returns: boolean;
      };
      toggle_conversation_archive: {
        Args: {
          p_user_id: string;
          p_conversation_id: string;
        };
        Returns: boolean;
      };
      update_user_tokens: {
        Args: {
          p_user_id: string;
          p_tokens: number;
          p_model?: string;
          p_action?: string;
          p_conversation_id?: string;
        };
        Returns: boolean;
      };
      check_tokens_limit: {
        Args: {
          p_user_id: string;
        };
        Returns: {
          has_tokens: boolean;
          tokens_used: number;
          tokens_limit: number;
          tokens_remaining: number;
          percentage_used: number;
        }[];
      };
      get_user_stats: {
        Args: {
          p_user_id: string;
        };
        Returns: {
          total_conversations: number;
          total_messages: number;
          total_tokens_used: number;
          tokens_limit: number;
          tokens_remaining: number;
          plan_name: string;
          member_since: string;
          most_used_model: string;
        }[];
      };
      reset_monthly_tokens: {
        Args: Record<string, never>;
        Returns: number;
      };
      generate_conversation_title: {
        Args: {
          content: string;
        };
        Returns: string;
      };
    };
    Enums: {
      message_role: "user" | "assistant" | "system";
      app_theme: "dark" | "light" | "system";
    };
  };
}

// Tipos helper
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type InsertTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];

export type UpdateTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];

// Tipos específicos
export type Plan = Tables<"plans">;
export type AIModel = Tables<"ai_models">;
export type UserProfile = Tables<"user_profiles">;
export type UserSettings = Tables<"user_settings">;
export type Conversation = Tables<"conversations">;
export type Message = Tables<"messages">;
export type UsageLog = Tables<"usage_logs">;
// Agregar esto al final del archivo
export type MessageRole = Database["public"]["Enums"]["message_role"];
