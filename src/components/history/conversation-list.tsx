"use client";

import type { ConversationItem } from "@/hooks/use-conversations";
import { ConversationCard } from "./conversation-card";

interface ConversationListProps {
  conversations: ConversationItem[];
  isLoading: boolean;
  onRename: (id: string, title: string) => void;
  onDelete: (id: string) => void;
  onArchive: (id: string) => void;
  onPin: (id: string) => void;
  onExport: (id: string) => void;
}

export function ConversationList({
  conversations,
  isLoading,
  onRename,
  onDelete,
  onArchive,
  onPin,
  onExport,
}: ConversationListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-32 animate-pulse rounded-xl border border-white/5 bg-[#0a0a0a]"
          >
            <div className="space-y-3 p-4">
              <div className="h-4 w-3/4 rounded bg-white/5" />
              <div className="h-3 w-full rounded bg-white/5" />
              <div className="h-3 w-1/2 rounded bg-white/5" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/5 bg-[#0a0a0a]">
          <span className="text-2xl">💬</span>
        </div>
        <h3 className="mb-2 text-sm font-medium text-white">
          No hay conversaciones
        </h3>
        <p className="max-w-sm text-xs text-gray-500">
          Tus conversaciones aparecerán aquí. Empieza un nuevo chat para crear
          tu primera conversación.
        </p>
      </div>
    );
  }

  // Separar fijadas de normales
  const pinned = conversations.filter((c) => c.is_pinned);
  const regular = conversations.filter((c) => !c.is_pinned);

  return (
    <div className="space-y-6">
      {/* Conversaciones fijadas */}
      {pinned.length > 0 && (
        <div className="space-y-3">
          <h3 className="flex items-center gap-2 text-xs font-semibold tracking-wider text-yellow-500 uppercase">
            <span>📌</span> Fijadas
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {pinned.map((conv) => (
              <ConversationCard
                key={conv.id}
                conversation={conv}
                onRename={onRename}
                onDelete={onDelete}
                onArchive={onArchive}
                onPin={onPin}
                onExport={onExport}
              />
            ))}
          </div>
        </div>
      )}

      {/* Conversaciones regulares */}
      {regular.length > 0 && (
        <div className="space-y-3">
          {pinned.length > 0 && (
            <h3 className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
              Todas
            </h3>
          )}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {regular.map((conv) => (
              <ConversationCard
                key={conv.id}
                conversation={conv}
                onRename={onRename}
                onDelete={onDelete}
                onArchive={onArchive}
                onPin={onPin}
                onExport={onExport}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
