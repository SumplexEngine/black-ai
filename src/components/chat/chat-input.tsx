"use client";

import { Logo } from "@/components/common/logo";
import { AI_MODES, AIMode } from "@/constants/ai-models";
import { cn } from "@/lib/utils";
import { Brain, Image, Mic, Plus, Rocket, Square, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  onModeChange: (mode: AIMode) => void;
  currentMode: AIMode;
  isLoading: boolean;
  isStreaming?: boolean;
  onStopGeneration?: () => void;
}

const modeIcons = {
  fast: Zap,
  think: Brain,
  advanced: Rocket,
};

export function ChatInput({
  onSendMessage,
  onModeChange,
  currentMode,
  isLoading,
  isStreaming = false,
  onStopGeneration,
}: ChatInputProps) {
  const [content, setContent] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        150
      )}px`;
    }
  }, [content]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (!content.trim() || isLoading) return;
    onSendMessage(content);
    setContent("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleImageSelect = () => {
    setIsMenuOpen(false);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Por ahora solo mostramos que se seleccionó
      // La funcionalidad completa se implementará en Fase 8
      alert(
        `Archivo seleccionado: ${file.name}\n\nEsta función estará disponible próximamente.`
      );
      // Limpiar input para poder seleccionar el mismo archivo de nuevo
      e.target.value = "";
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-6">
      {/* Input oculto para archivos */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Botón de parar generación */}
      {isStreaming && (
        <div className="mb-3 flex justify-center">
          <button
            onClick={onStopGeneration}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-[#1a1a1a] px-4 py-2 text-xs font-medium text-gray-300 transition-all hover:border-white/20 hover:bg-[#252525] hover:text-white"
          >
            <Square className="h-3 w-3 fill-current" />
            Detener generación
          </button>
        </div>
      )}

      <div className="flex items-end gap-3">
        {/* 1. Botón (+) */}
        <div className="relative shrink-0 pb-[2px]" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn(
              "flex h-[44px] w-[44px] items-center justify-center rounded-full border border-white/10 bg-[#1a1a1a] text-gray-400 transition-all hover:bg-[#252525] hover:text-white",
              isMenuOpen &&
                "rotate-45 border-white bg-white text-black hover:bg-white hover:text-black"
            )}
          >
            <Plus className="h-5 w-5" />
          </button>

          {/* Menú */}
          {isMenuOpen && (
            <div className="animate-slide-up absolute bottom-14 left-0 z-50 w-64 rounded-2xl border border-white/10 bg-[#0a0a0a] p-2 shadow-2xl">
              <div className="space-y-1">
                <div className="px-3 py-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">
                  Modo de IA
                </div>
                {Object.values(AI_MODES).map((mode) => {
                  const Icon = modeIcons[mode.id];
                  const isSelected = currentMode === mode.id;
                  return (
                    <button
                      key={mode.id}
                      onClick={() => {
                        onModeChange(mode.id);
                        setIsMenuOpen(false);
                      }}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                        isSelected
                          ? "bg-white/10 text-white"
                          : "text-gray-400 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <div className="flex-1">
                        <span className="text-sm font-medium">{mode.name}</span>
                        <p className="text-[10px] text-gray-500">
                          {mode.description}
                        </p>
                      </div>
                      {isSelected && (
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                      )}
                    </button>
                  );
                })}
                <div className="my-2 h-px bg-white/10" />

                {/* Botón Imagen / Video - FUNCIONAL */}
                <button
                  onClick={handleImageSelect}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <Image className="h-4 w-4" />
                  <div className="flex-1">
                    <span className="text-sm font-medium">Imagen / Video</span>
                    <p className="text-[10px] text-gray-500">
                      Adjuntar archivo multimedia
                    </p>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 2. INPUT CENTRAL */}
        <div className="relative flex min-h-[44px] flex-1 items-center overflow-hidden rounded-[22px] border border-white/10 bg-[#1a1a1a] shadow-sm transition-colors focus-within:border-white/30">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Pregunta lo que quieras..."
            className="scrollbar-hide w-full resize-none border-none bg-transparent px-5 py-[10px] pr-12 text-[15px] text-white shadow-none ring-0 outline-none placeholder:text-gray-500 focus:outline-none"
            rows={1}
            disabled={isLoading || isStreaming}
            style={{
              minHeight: "44px",
              maxHeight: "150px",
              lineHeight: "24px",
              background: "transparent",
              border: "none",
              outline: "none",
              boxShadow: "none",
            }}
          />

          {/* Botón Micrófono */}
          <button
            className="absolute top-1/2 right-2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
            title="Usar voz"
          >
            <Mic className="h-5 w-5" />
          </button>
        </div>

        {/* 3. Botón Enviar */}
        <div className="shrink-0 pb-[2px]">
          <button
            onClick={handleSubmit}
            disabled={!content.trim() || isLoading || isStreaming}
            className={cn(
              "flex h-[44px] w-[44px] items-center justify-center rounded-full transition-all duration-300",
              content.trim() && !isLoading && !isStreaming
                ? "scale-100 bg-white text-black opacity-100 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:bg-gray-200"
                : "cursor-not-allowed border border-white/10 bg-[#1a1a1a] text-gray-500 opacity-50"
            )}
          >
            {isLoading && !isStreaming ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <div
                className={cn(
                  "transition-transform",
                  content.trim() ? "scale-110" : "scale-100"
                )}
              >
                <Logo
                  size="sm"
                  showText={false}
                  animate={content.trim().length > 0}
                />
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
