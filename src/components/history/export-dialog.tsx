"use client";

import { cn } from "@/lib/utils";
import type { ExportFormat } from "@/types/chat.types";
import { Code, Download, FileJson, FileText, X } from "lucide-react";
import { useEffect, useState } from "react";

interface ExportDialogProps {
  isOpen: boolean;
  conversationId: string;
  conversationTitle: string;
  onClose: () => void;
}

const exportFormats: Array<{
  value: ExportFormat;
  label: string;
  description: string;
  icon: typeof FileText;
  extension: string;
}> = [
  {
    value: "markdown",
    label: "Markdown",
    description: "Formato con estilos y código",
    icon: Code,
    extension: ".md",
  },
  {
    value: "txt",
    label: "Texto plano",
    description: "Sin formato, solo texto",
    icon: FileText,
    extension: ".txt",
  },
  {
    value: "json",
    label: "JSON",
    description: "Datos estructurados para backup",
    icon: FileJson,
    extension: ".json",
  },
];

export function ExportDialog({
  isOpen,
  conversationId,
  conversationTitle,
  onClose,
}: ExportDialogProps) {
  const [selectedFormat, setSelectedFormat] =
    useState<ExportFormat>("markdown");
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleExport = async () => {
    setIsExporting(true);

    try {
      // Obtener mensajes
      const res = await fetch(`/api/conversations/${conversationId}/messages`);
      const data = await res.json();
      const messages = data.messages || [];

      let content = "";
      const filename = conversationTitle
        .replace(/[^a-zA-Z0-9áéíóúñÁÉÍÓÚÑ\s]/g, "")
        .replace(/\s+/g, "_")
        .slice(0, 50);

      const format = exportFormats.find((f) => f.value === selectedFormat)!;

      switch (selectedFormat) {
        case "markdown":
          content = `# ${conversationTitle}\n\n`;
          content += `> Exportado desde Black AI — ${new Date().toLocaleString("es-ES")}\n\n---\n\n`;
          for (const msg of messages) {
            const role = msg.role === "user" ? "👤 **Tú**" : "🤖 **Black AI**";
            content += `### ${role}\n\n${msg.content}\n\n---\n\n`;
          }
          break;

        case "txt":
          content = `${conversationTitle}\n${"=".repeat(50)}\n\n`;
          for (const msg of messages) {
            const role = msg.role === "user" ? "Tú" : "Black AI";
            content += `[${role}]\n${msg.content}\n\n${"─".repeat(30)}\n\n`;
          }
          break;

        case "json":
          content = JSON.stringify(
            {
              title: conversationTitle,
              exportedAt: new Date().toISOString(),
              messages: messages.map(
                (m: { role: string; content: string; created_at: string }) => ({
                  role: m.role,
                  content: m.content,
                  timestamp: m.created_at,
                })
              ),
            },
            null,
            2
          );
          break;
      }

      // Descargar archivo
      const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${filename}${format.extension}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      onClose();
    } catch (error) {
      console.error("Error exportando:", error);
      alert("Error al exportar la conversación");
    } finally {
      setIsExporting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="animate-scale-in relative z-10 mx-4 w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
            <Download className="h-6 w-6 text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-white">
            Exportar conversación
          </h3>
          <p className="mt-1 text-xs text-gray-500">
            &ldquo;{conversationTitle}&rdquo;
          </p>
        </div>

        {/* Formatos */}
        <div className="mb-6 space-y-2">
          {exportFormats.map((format) => {
            const Icon = format.icon;
            return (
              <button
                key={format.value}
                onClick={() => setSelectedFormat(format.value)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all",
                  selectedFormat === format.value
                    ? "border-blue-500/30 bg-blue-500/5 text-white"
                    : "border-white/5 bg-[#111] text-gray-400 hover:border-white/10"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <div>
                  <p className="text-sm font-medium">
                    {format.label}{" "}
                    <span className="text-gray-600">({format.extension})</span>
                  </p>
                  <p className="text-xs text-gray-500">{format.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Botón exportar */}
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition-colors hover:bg-gray-200 disabled:opacity-50"
        >
          {isExporting ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
          ) : (
            <>
              <Download className="h-4 w-4" />
              Descargar
            </>
          )}
        </button>
      </div>
    </div>
  );
}
