"use client";

import { useAuth } from "@/hooks/use-auth";
import { useCallback, useEffect, useState } from "react";

// ============================================
// TIPOS
// ============================================

export interface ConversationItem {
  id: string;
  title: string;
  model: string;
  message_count: number;
  total_tokens: number;
  is_archived: boolean;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
  lastMessage?: {
    content: string;
    role: string;
  } | null;
}

interface ConversationsResponse {
  conversations: ConversationItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface UseConversationsOptions {
  search?: string;
  model?: string;
  sort?: "recent" | "oldest" | "most_messages";
  archived?: boolean;
  page?: number;
  limit?: number;
}

// ============================================
// HOOK
// ============================================

export function useConversations(options: UseConversationsOptions = {}) {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    search = "",
    model = "",
    sort = "recent",
    archived = false,
    page = 1,
    limit = 20,
  } = options;

  const fetchConversations = useCallback(async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        search,
        model,
        sort,
        archived: String(archived),
        page: String(page),
        limit: String(limit),
      });

      const res = await fetch(`/api/conversations?${params}`);

      if (!res.ok) {
        throw new Error("Error al cargar conversaciones");
      }

      const data: ConversationsResponse = await res.json();

      setConversations(data.conversations);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Error fetching conversations:", err);
      setError(
        err instanceof Error ? err.message : "Error al cargar conversaciones"
      );
    } finally {
      setIsLoading(false);
    }
  }, [user, search, model, sort, archived, page, limit]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  // ============================================
  // ACCIONES
  // ============================================

  const deleteConversation = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/conversations", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Error al eliminar");

      setConversations((prev) => prev.filter((c) => c.id !== id));
      setTotal((prev) => prev - 1);
      return true;
    } catch (err) {
      console.error("Error deleting conversation:", err);
      return false;
    }
  };

  const renameConversation = async (
    id: string,
    title: string
  ): Promise<boolean> => {
    try {
      const res = await fetch("/api/conversations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, title }),
      });

      if (!res.ok) throw new Error("Error al renombrar");

      setConversations((prev) =>
        prev.map((c) => (c.id === id ? { ...c, title } : c))
      );
      return true;
    } catch (err) {
      console.error("Error renaming conversation:", err);
      return false;
    }
  };

  const archiveConversation = async (id: string): Promise<boolean> => {
    try {
      const currentConv = conversations.find((c) => c.id === id);
      const newArchived = !currentConv?.is_archived;

      const res = await fetch("/api/conversations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, is_archived: newArchived }),
      });

      if (!res.ok) throw new Error("Error al archivar");

      // Remover de la lista actual (se mueve a la otra vista)
      setConversations((prev) => prev.filter((c) => c.id !== id));
      setTotal((prev) => prev - 1);
      return true;
    } catch (err) {
      console.error("Error archiving conversation:", err);
      return false;
    }
  };

  const pinConversation = async (id: string): Promise<boolean> => {
    try {
      const currentConv = conversations.find((c) => c.id === id);
      const newPinned = !currentConv?.is_pinned;

      const res = await fetch("/api/conversations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, is_pinned: newPinned }),
      });

      if (!res.ok) throw new Error("Error al fijar");

      setConversations((prev) =>
        prev.map((c) => (c.id === id ? { ...c, is_pinned: newPinned } : c))
      );
      return true;
    } catch (err) {
      console.error("Error pinning conversation:", err);
      return false;
    }
  };

  return {
    conversations,
    total,
    totalPages,
    isLoading,
    error,
    refetch: fetchConversations,
    deleteConversation,
    renameConversation,
    archiveConversation,
    pinConversation,
  };
}
