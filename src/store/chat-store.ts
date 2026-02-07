import { AIMode, DEFAULT_MODE } from "@/constants/ai-models";
import { createClient } from "@/lib/supabase/client";
import { create } from "zustand";

// ============================================
// TYPES
// ============================================

interface StoreMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: Date;
  dbId?: string;
}

interface ChatState {
  currentMode: AIMode;
  setMode: (mode: AIMode) => void;

  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;

  messages: StoreMessage[];
  isLoading: boolean;
  setMessages: (messages: StoreMessage[]) => void;
  addMessage: (message: StoreMessage) => void;
  setLoading: (loading: boolean) => void;
  clearMessages: () => void;

  editMessage: (id: string, newContent: string) => void;
  deleteMessagePair: (messageId: string) => void;
  regenerateResponse: (assistantMessageId: string) => void;
  submitFeedback: (messageId: string, type: "like" | "dislike") => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  currentMode: DEFAULT_MODE,
  activeConversationId: null,
  messages: [],
  isLoading: false,

  setMode: (mode) => set({ currentMode: mode }),
  setActiveConversationId: (id) => set({ activeConversationId: id }),
  setMessages: (messages) => set({ messages }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setLoading: (isLoading) => set({ isLoading }),
  clearMessages: () => set({ messages: [], activeConversationId: null }),

  editMessage: (id, newContent) =>
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === id ? { ...msg, content: newContent } : msg
      ),
    })),

  // Delete message pair from UI AND Supabase
  deleteMessagePair: (messageId) => {
    const state = get();
    const index = state.messages.findIndex((m) => m.id === messageId);
    if (index === -1) return;

    const targetMsg = state.messages[index];
    if (!targetMsg) return;

    // Find the pair to delete
    const messagesToDelete: StoreMessage[] = [targetMsg];
    const nextMsg = state.messages[index + 1];
    const prevMsg = state.messages[index - 1];

    if (targetMsg.role === "user" && nextMsg && nextMsg.role === "assistant") {
      messagesToDelete.push(nextMsg);
    } else if (
      targetMsg.role === "assistant" &&
      prevMsg &&
      prevMsg.role === "user"
    ) {
      messagesToDelete.push(prevMsg);
    }

    const idsToRemoveFromUI = messagesToDelete.map((m) => m.id);

    // Update UI immediately
    set({
      messages: state.messages.filter((m) => !idsToRemoveFromUI.includes(m.id)),
    });

    // Delete from Supabase using dbId (real DB id) or id (if loaded from DB)
    const supabase = createClient();

    for (const msg of messagesToDelete) {
      const dbId = msg.dbId || msg.id;

      // Only try to delete if it looks like a valid UUID
      if (dbId && dbId.length > 10) {
        supabase
          .from("messages")
          .delete()
          .eq("id", dbId)
          .then(({ error }) => {
            if (error) {
              console.error("Error deleting message from DB:", error);
            }
          });
      }
    }

    // Update conversation message_count
    const convId = state.activeConversationId;
    if (convId) {
      const newCount = state.messages.length - messagesToDelete.length;
      (supabase.from("conversations") as any)
        .update({ message_count: Math.max(0, newCount) })
        .eq("id", convId)
        .then(() => {})
        .catch((err: unknown) =>
          console.error("Error updating message count:", err)
        );
    }
  },

  regenerateResponse: (_assistantMessageId) => {
    console.log("[Store] Regenerate - handled in chat page");
  },

  submitFeedback: (_messageId, type) => {
    console.log(`[Store] Feedback '${type}' registered`);
  },
}));
