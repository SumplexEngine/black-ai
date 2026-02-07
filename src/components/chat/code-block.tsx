"use client";

import { saveAs } from "file-saver";
import { Check, Copy, Download } from "lucide-react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  language: string;
  value: string;
}

// Mapa de extensiones por lenguaje
const extensions: Record<string, string> = {
  javascript: "js",
  typescript: "ts",
  python: "py",
  java: "java",
  cpp: "cpp",
  csharp: "cs",
  php: "cs",
  html: "html",
  css: "css",
  json: "json",
  sql: "sql",
  bash: "sh",
  shell: "sh",
  markdown: "md",
};

export function CodeBlock({ language, value }: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const downloadCode = () => {
    const ext = extensions[language] || "txt";
    const blob = new Blob([value], { type: "text/plain;charset=utf-8" });
    saveAs(blob, `code.${ext}`);
  };

  return (
    <div className="relative my-4 overflow-hidden rounded-lg border border-white/10 bg-[#1e1e1e]">
      <div className="flex items-center justify-between bg-[#2d2d2d] px-4 py-2">
        <span className="text-xs font-medium text-gray-400 lowercase">
          {language || "code"}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={downloadCode}
            className="flex items-center gap-1 rounded px-2 py-1 text-xs text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
            title="Descargar código"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Descargar</span>
          </button>

          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1 rounded px-2 py-1 text-xs text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            {isCopied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Copiado</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Copiar</span>
              </>
            )}
          </button>
        </div>
      </div>
      <div className="overflow-x-auto p-4">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: 0,
            background: "transparent",
            fontSize: "0.875rem",
          }}
          wrapLongLines={true}
        >
          {value}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
