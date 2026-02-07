"use client";

import { ChatInput } from "@/components/chat/chat-input";
import { MessageBubble } from "@/components/chat/message-bubble";
import { WelcomeScreen } from "@/components/chat/welcome-screen";
import { useChat, type ChatMessage } from "@/hooks/use-chat";
import { useChatStore } from "@/store/chat-store";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function ChatPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const newKey = searchParams.get("new") || "0";

  const { currentMode, setMode, setActiveConversationId } = useChatStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const prevMessageCountRef = useRef(0);

  const {
    messages,
    isLoading,
    isStreaming,
    sendMessage,
    stopGeneration,
    deleteMessagePair, // IMPORTANTE: traer la función del hook
  } = useChat({
    key: parseInt(newKey) || 0,
    mode: currentMode,
    onConversationCreated: (id: string) => {
      setActiveConversationId(id);
      // NO cambiar URL para evitar re-mount
    },
    onTitleGenerated: (_title: string) => {},
    onError: (error: string) => {
      console.error("Chat error:", error);
    },
    onConversationDeleted: () => {
      // Si se borra la conversación, ir a nuevo chat limpio
      setActiveConversationId(null);
      router.replace("/chat?new=" + Date.now());
    },
  });

  // Reset store on mount
  useEffect(() => {
    setActiveConversationId(null);
  }, [newKey, setActiveConversationId]);

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
        {messages.length === 0 ? (
          <WelcomeScreen />
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
                onDelete={deleteMessagePair} // PASAR LA FUNCIÓN DEL HOOK
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
