"use client";

import type { ConversationItem } from "@/hooks/use-conversations";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/lib/utils/helpers";
import {
  Archive,
  ArchiveRestore,
  Edit3,
  MessageSquare,
  MoreVertical,
  Pin,
  PinOff,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface ConversationCardProps {
  conversation: ConversationItem;
  onRename: (id: string, title: string) => void;
  onDelete: (id: string) => void;
  onArchive: (id: string) => void;
  onPin: (id: string) => void;
  onExport: (id: string) => void;
}

// Mapear IDs internos a nombres amigables
function getModelDisplayName(model: string): string {
  const map: Record<string, string> = {
    "gemini-3-flash-preview": "Rápido",
    "gemini-3-pro-preview": "Pro",
    "gemini-2.0-flash": "Flash 2.0",
    "gemini-1.5-flash": "Flash 1.5",
    "gemini-1.5-pro": "Pro 1.5",
  };
  return map[model] || model;
}

export function ConversationCard({
  conversation,
  onRename,
  onDelete,
  onArchive,
  onPin,
}: ConversationCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(conversation.title);
  const menuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isRenaming && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isRenaming]);

  const handleRename = () => {
    if (renameValue.trim() && renameValue !== conversation.title) {
      onRename(conversation.id, renameValue.trim());
    }
    setIsRenaming(false);
  };

  const handleRenameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleRename();
    } else if (e.key === "Escape") {
      setRenameValue(conversation.title);
      setIsRenaming(false);
    }
  };

  return (
    <div
      className={cn(
        "group relative rounded-xl border border-white/5 bg-[#0a0a0a] p-4 transition-all hover:border-white/10 hover:bg-[#111]",
        conversation.is_pinned && "border-yellow-500/20 bg-yellow-500/5"
      )}
    >
      {/* Pin indicator */}
      {conversation.is_pinned && (
        <div className="absolute top-3 right-12 text-yellow-500">
          <Pin className="h-3 w-3" />
        </div>
      )}

      {/* Menú */}
      <div className="absolute top-3 right-3" ref={menuRef}>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="rounded-lg p-1.5 text-gray-600 opacity-0 transition-all group-hover:opacity-100 hover:bg-white/10 hover:text-white"
        >
          <MoreVertical className="h-4 w-4" />
        </button>

        {showMenu && (
          <div className="absolute top-full right-0 z-50 mt-1 w-48 rounded-xl border border-white/10 bg-[#0a0a0a] p-1.5 shadow-2xl">
            <button
              onClick={() => {
                setIsRenaming(true);
                setShowMenu(false);
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              <Edit3 className="h-3.5 w-3.5" />
              Renombrar
            </button>

            <button
              onClick={() => {
                onPin(conversation.id);
                setShowMenu(false);
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              {conversation.is_pinned ? (
                <>
                  <PinOff className="h-3.5 w-3.5" />
                  Desfijar
                </>
              ) : (
                <>
                  <Pin className="h-3.5 w-3.5" />
                  Fijar
                </>
              )}
            </button>

            <button
              onClick={() => {
                onArchive(conversation.id);
                setShowMenu(false);
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              {conversation.is_archived ? (
                <>
                  <ArchiveRestore className="h-3.5 w-3.5" />
                  Desarchivar
                </>
              ) : (
                <>
                  <Archive className="h-3.5 w-3.5" />
                  Archivar
                </>
              )}
            </button>

            <div className="my-1 h-px bg-white/5" />

            <button
              onClick={() => {
                onDelete(conversation.id);
                setShowMenu(false);
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-red-400 transition-colors hover:bg-red-500/10"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Eliminar
            </button>
          </div>
        )}
      </div>

      {/* Contenido principal como link */}
      <Link href={`/chat/${conversation.id}`} className="block">
        {/* Título */}
        {isRenaming ? (
          <input
            ref={inputRef}
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            onBlur={handleRename}
            onKeyDown={handleRenameKeyDown}
            onClick={(e) => e.preventDefault()}
            className="mb-2 w-full rounded-lg border border-white/20 bg-black px-2 py-1 text-sm font-medium text-white focus:border-white/40 focus:outline-none"
          />
        ) : (
          <h3 className="mb-2 truncate pr-8 text-sm font-medium text-white">
            {conversation.title}
          </h3>
        )}

        {/* Preview del último mensaje */}
        {conversation.lastMessage && (
          <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-gray-500">
            {conversation.lastMessage.role === "assistant" && "🤖 "}
            {conversation.lastMessage.content}
          </p>
        )}

        {/* Metadata */}
        <div className="flex items-center gap-3 text-[10px] text-gray-600">
          <span className="flex items-center gap-1">
            <MessageSquare className="h-3 w-3" />
            {conversation.message_count}
          </span>

          <span className="rounded bg-white/5 px-1.5 py-0.5 font-medium">
            {getModelDisplayName(conversation.model)}
          </span>

          <span className="ml-auto">
            {formatRelativeTime(conversation.updated_at)}
          </span>
        </div>
      </Link>
    </div>
  );
}
