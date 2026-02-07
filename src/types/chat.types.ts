/**
 * Tipos relacionados con el chat y conversaciones
 */

import type { AIModel, Conversation, Message } from "./database.types";

// ============================================
// ROLES Y MENSAJES
// ============================================

export interface ChatMessage extends Message {
  isStreaming?: boolean;
  isError?: boolean;
  errorMessage?: string;
}

export interface StreamingMessage {
  id: string;
  conversationId: string;
  content: string;
  isComplete: boolean;
  tokensUsed?: number;
}

// ============================================
// CONVERSACIONES
// ============================================

export interface ConversationWithMessages extends Conversation {
  messages: ChatMessage[];
}

export interface ConversationSummary {
  id: string;
  title: string;
  lastMessage?: string;
  messageCount: number;
  model: string;
  updatedAt: string;
}

// ============================================
// ESTADO DEL CHAT
// ============================================

export interface ChatState {
  conversations: ConversationSummary[];
  currentConversation: ConversationWithMessages | null;
  isLoading: boolean;
  isStreaming: boolean;
  isSending: boolean;
  error: string | null;
}

// ============================================
// PARÁMETROS DE ACCIONES
// ============================================

export interface SendMessageParams {
  conversationId: string;
  content: string;
  model?: string;
}

export interface CreateConversationParams {
  title?: string;
  model: string;
  systemPrompt?: string;
  initialMessage?: string;
}

export interface UpdateConversationParams {
  id: string;
  title?: string;
  model?: string;
  systemPrompt?: string;
  isArchived?: boolean;
}

// ============================================
// MODELOS DE IA
// ============================================

export interface AIModelConfig extends AIModel {
  iconUrl?: string;
  color?: string;
  recommended?: boolean;
}

export interface ModelSelection {
  modelId: string;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
}

// ============================================
// CONFIGURACIÓN DEL CHAT
// ============================================

export interface ChatConfig {
  defaultModel: string;
  temperature: number;
  maxTokens: number;
  streamResponse: boolean;
  showTokenCount: boolean;
}

// ============================================
// EXPORTACIÓN
// ============================================

export type ExportFormat = "markdown" | "txt" | "json" | "html";

export interface ExportOptions {
  format: ExportFormat;
  includeMetadata: boolean;
  includeTimestamps: boolean;
  includeSystemPrompt: boolean;
}
