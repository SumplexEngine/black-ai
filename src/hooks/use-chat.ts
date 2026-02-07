"use client";

import type { AIMode } from "@/constants/ai-models";
import { createClient } from "@/lib/supabase/client";
import { generateId } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

// ============================================
// TYPES
// ============================================

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: Date;
  isStreaming?: boolean;
  dbId?: string;
}

interface UseChatOptions {
  key?: number;
  conversationId?: string | null;
  mode?: AIMode;
  onConversationCreated?: (id: string) => void;
  onTitleGenerated?: (title: string) => void;
  onError?: (error: string) => void;
  onConversationDeleted?: () => void;
}

// ============================================
// HOOK
// ============================================

export function useChat(options: UseChatOptions = {}) {
  const {
    key = 0,
    conversationId: initialConversationId = null,
    mode = "fast",
    onConversationCreated,
    onTitleGenerated,
    onError,
    onConversationDeleted,
  } = options;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(
    initialConversationId
  );

  const abortControllerRef = useRef<AbortController | null>(null);

  // Reset when key changes
  useEffect(() => {
    setMessages([]);
    setConversationId(initialConversationId);
    setIsLoading(false);
    setIsStreaming(false);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, [key, initialConversationId]);

  // ============================================
  // DELETE MESSAGE PAIR
  // ============================================

  const deleteMessagePair = useCallback(
    async (messageId: string) => {
      // 1. Identificar mensajes a borrar
      const index = messages.findIndex((m) => m.id === messageId);
      if (index === -1) return;

      const targetMsg = messages[index];
      if (!targetMsg) return;

      const messagesToDelete: ChatMessage[] = [targetMsg];
      const nextMsg = messages[index + 1];
      const prevMsg = messages[index - 1];

      // Fix: Check if nextMsg/prevMsg exist before checking role
      if (
        targetMsg.role === "user" &&
        nextMsg &&
        nextMsg.role === "assistant"
      ) {
        messagesToDelete.push(nextMsg);
      } else if (
        targetMsg.role === "assistant" &&
        prevMsg &&
        prevMsg.role === "user"
      ) {
        messagesToDelete.push(prevMsg);
      }

      const idsToRemove = messagesToDelete.map((m) => m.id);

      // 2. Actualizar UI INMEDIATAMENTE
      const remainingMessages = messages.filter(
        (m) => !idsToRemove.includes(m.id)
      );
      setMessages(remainingMessages);

      // 3. Borrar de Supabase en background
      const supabase = createClient();
      const dbIdsToDelete = messagesToDelete
        .map((m) => m.dbId || m.id)
        .filter((id) => id && id.length > 10); // Validar UUID simple

      if (dbIdsToDelete.length > 0) {
        await supabase.from("messages").delete().in("id", dbIdsToDelete);
      }

      // 4. Si no quedan mensajes, borrar conversación
      if (remainingMessages.length === 0 && conversationId) {
        console.warn("Chat vacío, eliminando conversación:", conversationId);

        // Delete conversation (triggers sidebar realtime update)
        await supabase.from("conversations").delete().eq("id", conversationId);

        setConversationId(null);
        onConversationDeleted?.();
      } else if (conversationId) {
        // Update count - cast to any to avoid never
        await (supabase.from("conversations") as any)
          .update({ message_count: remainingMessages.length })
          .eq("id", conversationId);
      }
    },
    [messages, conversationId, onConversationDeleted]
  );

  // ============================================
  // SEND MESSAGE
  // ============================================

  const sendMessage = useCallback(
    async (content: string, currentMode?: AIMode) => {
      if (!content.trim() || isLoading) return;

      const activeMode = currentMode || mode;

      const userTempId = generateId();
      const userMessage: ChatMessage = {
        id: userTempId,
        role: "user",
        content,
        createdAt: new Date(),
      };

      const assistantTempId = generateId();
      const assistantMessage: ChatMessage = {
        id: assistantTempId,
        role: "assistant",
        content: "",
        createdAt: new Date(),
        isStreaming: true,
      };

      setMessages((prev) => [...prev, userMessage, assistantMessage]);
      setIsLoading(true);
      setIsStreaming(true);

      abortControllerRef.current = new AbortController();

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: content,
            conversationId,
            mode: activeMode,
          }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Error sending message");
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error("Could not read response");

        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split("\n\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;

            try {
              const jsonStr = line.slice(6);
              const data = JSON.parse(jsonStr);

              switch (data.type) {
                case "conversation_id":
                  if (!conversationId) {
                    setConversationId(data.id);
                    onConversationCreated?.(data.id);
                  }
                  break;

                case "user_message_id":
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === userTempId ? { ...msg, dbId: data.id } : msg
                    )
                  );
                  break;

                case "text":
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === assistantTempId
                        ? { ...msg, content: msg.content + data.content }
                        : msg
                    )
                  );
                  break;

                case "title":
                  onTitleGenerated?.(data.title);
                  break;

                case "done":
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === assistantTempId
                        ? {
                            ...msg,
                            isStreaming: false,
                            dbId: data.assistantMessageId,
                          }
                        : msg
                    )
                  );
                  break;

                case "error":
                  throw new Error(data.error);
              }
            } catch (parseError) {
              if (
                parseError instanceof Error &&
                !parseError.message.includes("JSON") &&
                !parseError.message.includes("Unexpected")
              ) {
                throw parseError;
              }
            }
          }
        }
      } catch (error: unknown) {
        const err = error instanceof Error ? error : new Error("Unknown error");

        if (err.name === "AbortError") {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantTempId
                ? {
                    ...msg,
                    content: msg.content || "⚠️ Generation cancelled.",
                    isStreaming: false,
                  }
                : msg
            )
          );
        } else {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantTempId
                ? {
                    ...msg,
                    content: `❌ Error: ${err.message}`,
                    isStreaming: false,
                  }
                : msg
            )
          );

          onError?.(err.message);
        }
      } finally {
        setIsLoading(false);
        setIsStreaming(false);
        abortControllerRef.current = null;
      }
    },
    [
      conversationId,
      mode,
      isLoading,
      onConversationCreated,
      onTitleGenerated,
      onError,
    ]
  );

  const stopGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  const loadConversation = useCallback(
    async (convId: string) => {
      console.log("📥 Iniciando carga de conversación:", convId);
      setIsLoading(true);

      try {
        const res = await fetch(`/api/conversations/${convId}/messages`);
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(`API error: ${errorData.error || "Unknown error"}`);
        }

        const data = await res.json();
        console.log("📦 Datos recibidos del API:", data);

        const loadedMessages: ChatMessage[] = (data.messages || []).map(
          (msg: {
            id: string;
            role: string;
            content: string;
            created_at: string;
          }) => ({
            id: msg.id,
            dbId: msg.id,
            role: msg.role as "user" | "assistant" | "system",
            content: msg.content,
            createdAt: new Date(msg.created_at),
            isStreaming: false,
          })
        );

        console.log("✅ Mensajes cargados:", loadedMessages.length);
        setMessages(loadedMessages);
        setConversationId(convId);
      } catch (error: unknown) {
        const err =
          error instanceof Error
            ? error
            : new Error("Error loading conversation");
        console.error("❌ Error loading conversation:", err);
        onError?.(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    [onError]
  );

  const clearChat = useCallback(() => {
    setMessages([]);
    setConversationId(null);
    setIsLoading(false);
    setIsStreaming(false);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  return {
    messages,
    setMessages,
    isLoading,
    isStreaming,
    conversationId,
    sendMessage,
    stopGeneration,
    loadConversation,
    clearChat,
    deleteMessagePair,
  };
}
