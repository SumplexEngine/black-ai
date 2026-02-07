"use client";

import { ChatInput } from "@/components/chat/chat-input";
import { MessageBubble } from "@/components/chat/message-bubble";
import { useChat, type ChatMessage } from "@/hooks/use-chat";
import { useChatStore } from "@/store/chat-store";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function ConversationPage() {
  const params = useParams();
  const convId = params.conversationId as string;
  const router = useRouter();

  const { currentMode, setMode, setActiveConversationId } = useChatStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);
  const prevMessageCountRef = useRef(0);

  // Crear un número único basado en convId para forzar re-mount del hook
  const convKey = convId ? parseInt(convId.split("-")[0] || "0", 16) || 0 : 0;

  const {
    messages,
    isLoading,
    isStreaming,
    sendMessage,
    stopGeneration,
    loadConversation,
    deleteMessagePair, // IMPORTANTE
  } = useChat({
    key: convKey,
    conversationId: convId,
    mode: currentMode,
    onError: (error: string) => {
      console.error("Chat error:", error);
    },
    onConversationDeleted: () => {
      // Si se borra la conversación, ir a nuevo chat
      setActiveConversationId(null);
      router.replace("/chat?new=" + Date.now());
    },
  });

  // Sync to store
  const { setMessages: setStoreMessages, setLoading: setStoreLoading } =
    useChatStore();

  useEffect(() => {
    setStoreMessages(
      messages.map((m: ChatMessage) => ({
        id: m.id,
        role: m.role,
        content: m.content,
        createdAt: m.createdAt,
        dbId: m.dbId,
      }))
    );
  }, [messages, setStoreMessages]);

  useEffect(() => {
    setStoreLoading(isLoading);
  }, [isLoading, setStoreLoading]);

  // Load on mount or when convId changes
  useEffect(() => {
    if (convId) {
      console.log("🔄 Cargando conversación:", convId);
      // Resetear loadedRef cuando cambia convId
      loadedRef.current = false;
    }
  }, [convId]);

  useEffect(() => {
    if (convId && !loadedRef.current) {
      console.log("📌 Iniciando carga para:", convId);
      loadedRef.current = true;
      setActiveConversationId(convId);
      loadConversation(convId);
    }
  }, [convId, loadConversation, setActiveConversationId]);

  // Auto-scroll
  useEffect(() => {
    const currentCount = messages.length;
    const prevCount = prevMessageCountRef.current;

    if (currentCount > prevCount) {
      const lastMessage = messages[currentCount - 1];
      if (
        lastMessage?.role === "user" ||
        (lastMessage?.role === "assistant" && lastMessage.content === "")
      ) {
        if (scrollRef.current) {
          setTimeout(() => {
            scrollRef.current?.scrollTo({
              top: scrollRef.current.scrollHeight,
              behavior: "smooth",
            });
          }, 100);
        }
      }
    }
    prevMessageCountRef.current = currentCount;
  }, [messages.length]);

  const handleSendMessage = async (content: string) => {
    await sendMessage(content, currentMode);
  };

  return (
    <div className="relative flex h-full flex-col bg-black">
      <div
        ref={scrollRef}
        className="scrollbar-thin scrollbar-track-black scrollbar-thumb-white/10 flex-1 overflow-y-auto"
      >
        {isLoading && messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/20 border-t-white" />
              <span className="text-xs text-gray-500">
                Cargando conversación...
              </span>
            </div>
          </div>
        ) : (
          <div className="pt-4 pb-4">
            {messages.map((msg: ChatMessage) => (
              <MessageBubble
                key={msg.id}
                id={msg.id}
                role={msg.role}
                content={msg.content}
                createdAt={msg.createdAt}
                isStreaming={msg.isStreaming}
                onDelete={deleteMessagePair} // PASAR LA FUNCIÓN
                onEdit={(id, newContent) => {
                  console.log("Edit:", id, newContent);
                }}
                onRegenerate={(id) => {
                  console.log("Regenerate:", id);
                }}
                onFeedback={(id, type) => {
                  console.log("Feedback:", id, type);
                }}
              />
            ))}

            {isStreaming &&
              messages.length > 0 &&
              messages[messages.length - 1]?.content === "" &&
              messages[messages.length - 1]?.isStreaming && (
                <div className="animate-fade-in px-4 py-3 md:px-6">
                  <div className="mx-auto flex max-w-3xl items-center gap-3 pl-10">
                    <div className="flex gap-1.5">
                      <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/30 [animation-delay:-0.3s]" />
                      <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/30 [animation-delay:-0.15s]" />
                      <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/30" />
                    </div>
                    <span className="text-xs text-gray-600">
                      Black AI is thinking...
                    </span>
                  </div>
                </div>
              )}
          </div>
        )}
      </div>

      <div className="w-full pt-2 pb-6">
        <ChatInput
          onSendMessage={handleSendMessage}
          onModeChange={setMode}
          currentMode={currentMode}
          isLoading={isLoading}
          isStreaming={isStreaming}
          onStopGeneration={stopGeneration}
        />
      </div>
    </div>
  );
}
