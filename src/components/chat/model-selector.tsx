"use client";

import { AI_MODES, AIMode } from "@/constants/ai-models";
import { cn } from "@/lib/utils";
import { Brain, ChevronDown, Rocket, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ModelSelectorProps {
  currentMode: AIMode;
  onModeChange: (mode: AIMode) => void;
}

const icons = {
  fast: Zap,
  think: Brain,
  advanced: Rocket,
};

export function ModelSelector({
  currentMode,
  onModeChange,
}: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cerrar al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const CurrentIcon = icons[currentMode];
  const modeName = AI_MODES[currentMode].name;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg border border-white/5 bg-[#1a1a1a] px-3 py-1.5 text-sm font-medium text-gray-200 transition-colors hover:bg-[#252525] hover:text-white"
      >
        <CurrentIcon className="h-4 w-4" />
        <span>{modeName}</span>
        <ChevronDown className="h-3 w-3 text-gray-500" />
      </button>

      {isOpen && (
        <div className="animate-fade-in absolute top-full z-50 mt-2 w-64 rounded-xl border border-white/10 bg-[#1a1a1a] p-1 shadow-xl">
          {Object.values(AI_MODES).map((mode) => {
            const Icon = icons[mode.id];
            const isSelected = currentMode === mode.id;

            return (
              <button
                key={mode.id}
                onClick={() => {
                  onModeChange(mode.id);
                  setIsOpen(false);
                }}
                className={cn(
                  "flex w-full items-start gap-3 rounded-lg p-2 text-left transition-colors",
                  isSelected ? "bg-white/10" : "hover:bg-white/5"
                )}
              >
                <div
                  className={cn(
                    "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black",
                    isSelected ? "text-white" : "text-gray-400"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "text-sm font-medium",
                        isSelected ? "text-white" : "text-gray-200"
                      )}
                    >
                      {mode.name}
                    </span>
                    {isSelected && (
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    )}
                  </div>
                  <p className="line-clamp-2 text-xs text-gray-500">
                    {mode.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
