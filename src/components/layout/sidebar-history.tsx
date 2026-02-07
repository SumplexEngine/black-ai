"use client";

import { useAuth } from "@/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { MessageSquare, Trash2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

interface ChatHistoryItem {
  id: string;
  title: string;
  updated_at: string;
}

export function SidebarHistory() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const [chats, setChats] = useState<ChatHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredChat, setHoveredChat] = useState<string | null>(null);
  const channelRef = useRef<ReturnType<
    ReturnType<typeof createClient>["channel"]
  > | null>(null);

  const fetchHistory = useCallback(async () => {
    if (!user) return;

    const supabase = createClient();
    const { data } = await supabase
      .from("conversations")
      .select("id, title, updated_at")
      .eq("user_id", user.id)
      .eq("is_archived", false)
      .order("updated_at", { ascending: false })
      .limit(50);

    if (data) {
      setChats(data);
    }
    setIsLoading(false);
  }, [user]);

  useEffect(() => {
    if (!user) return;

    fetchHistory();

    const supabase = createClient();

    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
    }

    // Use a single debounced refetch instead of manipulating state per event
    // This prevents flickering and race conditions
    let refetchTimeout: NodeJS.Timeout | null = null;

    const debouncedRefetch = () => {
      if (refetchTimeout) clearTimeout(refetchTimeout);
      refetchTimeout = setTimeout(() => {
        fetchHistory();
      }, 500);
    };

    const channel = supabase
      .channel(`sidebar_${user.id}_${Date.now()}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "conversations",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.eventType === "DELETE") {
            // DELETE: remove immediately, no debounce
            const deletedId = (payload.old as { id?: string })?.id;
            if (deletedId) {
              setChats((prev) => prev.filter((c) => c.id !== deletedId));
            }
          } else {
            // INSERT or UPDATE: debounced refetch to avoid flickering
            debouncedRefetch();
          }
        }
      )
      .subscribe();

    channelRef.current = channel;

    return () => {
      if (refetchTimeout) clearTimeout(refetchTimeout);
      supabase.removeChannel(channel);
      channelRef.current = null;
    };
  }, [user, fetchHistory]);

  const handleDelete = async (e: React.MouseEvent, chatId: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm("¿Eliminar este chat?")) return;

    try {
      const supabase = createClient();

      // Eliminar de Supabase primero
      const { error } = await supabase
        .from("conversations")
        .delete()
        .eq("id", chatId);

      if (error) {
        console.error("Error deleting conversation:", error);
        alert("Error al eliminar el chat");
        return;
      }

      // Si estamos visualizando el chat que se está eliminando, ir a nuevo chat
      if (pathname === `/chat/${chatId}`) {
        // Forzar redirección a nuevo chat limpio inmediatamente
        router.replace("/chat?new=" + Date.now());
      } else {
        // Si está en otro chat, actualizar el historial localmente
        setChats((prev) => prev.filter((c) => c.id !== chatId));
      }
    } catch (error) {
      console.error("Error in handleDelete:", error);
      alert("Error al eliminar el chat");
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="px-4 pb-2">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold tracking-wider whitespace-nowrap text-gray-500 uppercase">
            Historial
          </span>
          <div className="h-px w-full bg-white/10" />
        </div>
      </div>

      <div className="flex-1 space-y-1 px-3 pb-4">
        {isLoading ? (
          [1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-10 w-full animate-pulse rounded-lg bg-white/5"
            />
          ))
        ) : chats.length === 0 ? (
          <div className="px-2 py-4 text-center">
            <p className="text-xs text-gray-600">No hay chats recientes</p>
          </div>
        ) : (
          chats.map((chat) => {
            const isActive = pathname === `/chat/${chat.id}`;

            return (
              <Link
                key={chat.id}
                href={`/chat/${chat.id}`}
                onMouseEnter={() => setHoveredChat(chat.id)}
                onMouseLeave={() => setHoveredChat(null)}
                className={cn(
                  "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <MessageSquare className="h-4 w-4 shrink-0" />
                <span className="flex-1 truncate">{chat.title}</span>

                {(hoveredChat === chat.id || isActive) && (
                  <div className="absolute right-2 flex items-center bg-[#0a0a0a] pl-2 shadow-[-8px_0_8px_#0a0a0a]">
                    <button
                      onClick={(e) => handleDelete(e, chat.id)}
                      className="rounded p-1 text-gray-500 transition-colors hover:bg-white/10 hover:text-red-400"
                      title="Eliminar chat"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
