"use client";

import { cn } from "@/lib/utils";
import {
  Archive,
  ArrowUpAZ,
  Clock,
  MessageSquare,
  Search,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ConversationFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  sort: "recent" | "oldest" | "most_messages";
  onSortChange: (value: "recent" | "oldest" | "most_messages") => void;
  model: string;
  onModelChange: (value: string) => void;
  showArchived: boolean;
  onArchivedChange: (value: boolean) => void;
  totalResults: number;
}

const sortOptions = [
  { value: "recent", label: "Más recientes", icon: Clock },
  { value: "oldest", label: "Más antiguos", icon: ArrowUpAZ },
  { value: "most_messages", label: "Más mensajes", icon: MessageSquare },
] as const;

const modelOptions = [
  { value: "", label: "Todos los modelos" },
  { value: "gemini-3-flash-preview", label: "Rápido" },
  { value: "gemini-3-pro-preview", label: "Pro" },
  { value: "gemini-2.0-flash", label: "Flash 2.0" },
  { value: "gemini-1.5-flash", label: "Flash 1.5" },
  { value: "gemini-1.5-pro", label: "Pro 1.5" },
];

export function ConversationFilters({
  search,
  onSearchChange,
  sort,
  onSortChange,
  model,
  onModelChange,
  showArchived,
  onArchivedChange,
  totalResults,
}: ConversationFiltersProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setShowSortMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentSort = sortOptions.find((s) => s.value === sort);
  const SortIcon = currentSort?.icon || Clock;

  return (
    <div className="space-y-4">
      {/* Barra de búsqueda y filtros */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Búsqueda */}
        <div className="relative flex-1">
          <Search
            className={cn(
              "absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transition-colors",
              isSearchFocused ? "text-white" : "text-gray-500"
            )}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            placeholder="Buscar conversaciones..."
            className="w-full rounded-xl border border-white/10 bg-[#111] py-2.5 pr-10 pl-10 text-sm text-white transition-colors placeholder:text-gray-500 focus:border-white/20 focus:outline-none"
          />
          {search && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filtros */}
        <div className="flex items-center gap-2">
          {/* Selector de modelo */}
          <select
            value={model}
            onChange={(e) => onModelChange(e.target.value)}
            className="appearance-none rounded-xl border border-white/10 bg-[#111] px-3 py-2.5 text-xs text-gray-300 transition-colors focus:border-white/20 focus:outline-none"
          >
            {modelOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Ordenamiento */}
          <div className="relative" ref={sortRef}>
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className={cn(
                "flex items-center gap-2 rounded-xl border px-3 py-2.5 text-xs transition-colors",
                showSortMenu
                  ? "border-white/20 bg-white/5 text-white"
                  : "border-white/10 bg-[#111] text-gray-300 hover:border-white/20"
              )}
            >
              <SortIcon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{currentSort?.label}</span>
            </button>

            {showSortMenu && (
              <div className="absolute top-full right-0 z-50 mt-2 w-48 rounded-xl border border-white/10 bg-[#0a0a0a] p-1.5 shadow-2xl">
                {sortOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.value}
                      onClick={() => {
                        onSortChange(option.value);
                        setShowSortMenu(false);
                      }}
                      className={cn(
                        "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs transition-colors",
                        sort === option.value
                          ? "bg-white/10 text-white"
                          : "text-gray-400 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {option.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Toggle archivados */}
          <button
            onClick={() => onArchivedChange(!showArchived)}
            className={cn(
              "flex items-center gap-2 rounded-xl border px-3 py-2.5 text-xs transition-colors",
              showArchived
                ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-400"
                : "border-white/10 bg-[#111] text-gray-300 hover:border-white/20"
            )}
          >
            <Archive className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Archivados</span>
          </button>
        </div>
      </div>

      {/* Resultados */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500">
          {totalResults === 0
            ? "No hay conversaciones"
            : `${totalResults} conversación${totalResults !== 1 ? "es" : ""}`}
          {search && ` para "${search}"`}
          {showArchived && " (archivadas)"}
        </p>
      </div>
    </div>
  );
}
