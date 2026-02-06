/**
 * Tipos de la base de datos de Supabase
 * Estos tipos representan la estructura de nuestras tablas SQL
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// ============================================
// TIPOS DE TABLAS
// ============================================

/**
 * Tabla: plans
 * Almacena los planes disponibles (Free, Pro, Enterprise)
 */
export interface Plan {
  id: string;
  name: string;
  description: string | null;
  price: number;
  tokens_limit: number;
  features: Json;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Tabla: user_profiles
 * Información extendida del usuario
 */
export interface UserProfile {
  id: string;
  user_id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  plan_id: string;
  tokens_used: number;
  tokens_reset_at: string;
  created_at: string;
  updated_at: string;
}

/**
 * Tabla: conversations
 * Almacena las conversaciones/chats
 */
export interface Conversation {
  id: string;
  user_id: string;
  title: string;
  model: string;
  system_prompt: string | null;
  message_count: number;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Tabla: messages
 * Mensajes individuales de cada conversación
 */
export interface Message {
  id: string;
  conversation_id: string;
  role: "user" | "assistant" | "system";
  content: string;
  tokens_used: number | null;
  model: string | null;
  created_at: string;
}

/**
 * Tabla: ai_models
 * Modelos de IA disponibles
 */
export interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string | null;
  max_tokens: number;
  is_free: boolean;
  is_active: boolean;
  created_at: string;
}

/**
 * Tabla: user_settings
 * Configuraciones personalizadas del usuario
 */
export interface UserSettings {
  id: string;
  user_id: string;
  theme: "dark" | "light" | "system";
  language: string;
  default_model: string | null;
  preferences: Json;
  created_at: string;
  updated_at: string;
}

/**
 * Tabla: usage_logs
 * Registro de uso para analytics
 */
export interface UsageLog {
  id: string;
  user_id: string;
  action: string;
  tokens_used: number;
  model: string | null;
  metadata: Json | null;
  created_at: string;
}

// ============================================
// TIPOS PARA INSERT Y UPDATE
// ============================================

export type PlanInsert = Omit<Plan, "id" | "created_at" | "updated_at">;
export type PlanUpdate = Partial<PlanInsert>;

export type UserProfileInsert = Omit<
  UserProfile,
  "id" | "created_at" | "updated_at"
>;
export type UserProfileUpdate = Partial<UserProfileInsert>;

export type ConversationInsert = Omit<
  Conversation,
  "id" | "created_at" | "updated_at" | "message_count"
>;
export type ConversationUpdate = Partial<ConversationInsert>;

export type MessageInsert = Omit<Message, "id" | "created_at">;
export type MessageUpdate = Partial<MessageInsert>;

export type UserSettingsInsert = Omit<
  UserSettings,
  "id" | "created_at" | "updated_at"
>;
export type UserSettingsUpdate = Partial<UserSettingsInsert>;

// ============================================
// TIPO DE BASE DE DATOS COMPLETO
// ============================================

export interface Database {
  public: {
    Tables: {
      plans: {
        Row: Plan;
        Insert: PlanInsert;
        Update: PlanUpdate;
      };
      user_profiles: {
        Row: UserProfile;
        Insert: UserProfileInsert;
        Update: UserProfileUpdate;
      };
      conversations: {
        Row: Conversation;
        Insert: ConversationInsert;
        Update: ConversationUpdate;
      };
      messages: {
        Row: Message;
        Insert: MessageInsert;
        Update: MessageUpdate;
      };
      ai_models: {
        Row: AIModel;
        Insert: Omit<AIModel, "id" | "created_at">;
        Update: Partial<Omit<AIModel, "id" | "created_at">>;
      };
      user_settings: {
        Row: UserSettings;
        Insert: UserSettingsInsert;
        Update: UserSettingsUpdate;
      };
      usage_logs: {
        Row: UsageLog;
        Insert: Omit<UsageLog, "id" | "created_at">;
        Update: never;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      message_role: "user" | "assistant" | "system";
      theme_type: "dark" | "light" | "system";
    };
  };
}
