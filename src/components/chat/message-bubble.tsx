"use client";

import { CodeBlock } from "@/components/chat/code-block";
import { Logo } from "@/components/common/logo";
import { useAuth } from "@/hooks/use-auth";
import { cn, getInitials } from "@/lib/utils";
import jsPDF from "jspdf";
import {
  Check,
  Copy,
  Edit2,
  FileDown,
  RefreshCw,
  ThumbsDown,
  ThumbsUp,
  Trash2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MessageBubbleProps {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt?: Date;
  isStreaming?: boolean;
  onDelete?: (messageId: string) => void;
  onEdit?: (messageId: string, newContent: string) => void;
  onRegenerate?: (messageId: string) => void;
  onFeedback?: (messageId: string, type: "like" | "dislike") => void;
}

export function MessageBubble({
  id,
  role,
  content,
  createdAt,
  isStreaming = false,
  onDelete,
  onEdit,
  onRegenerate,
  onFeedback,
}: MessageBubbleProps) {
  const { profile } = useAuth();

  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const [feedback, setFeedback] = useState<"like" | "dislike" | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isUser = role === "user";
  const initials = getInitials(profile?.full_name || "Usuario");
  const timestamp = createdAt
    ? new Date(createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [isEditing]);

  useEffect(() => {
    if (!isEditing) {
      setEditContent(content);
    }
  }, [content, isEditing]);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const splitText = doc.splitTextToSize(content, 180);
    doc.text(splitText, 15, 15);
    doc.save(`black-ai-${id}.pdf`);
  };

  const handleSaveEdit = () => {
    if (editContent.trim() !== content) {
      onEdit?.(id, editContent);
      setIsEditing(false);
    } else {
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (confirm("¿Eliminar este mensaje y su respuesta?")) {
      onDelete?.(id);
    }
  };

  const handleFeedback = (type: "like" | "dislike") => {
    setFeedback(type);
    onFeedback?.(id, type);
  };

  if (!content && isStreaming) {
    return null;
  }

  return (
    <div
      className={cn(
        "group flex w-full flex-col gap-1 px-4 py-3 transition-all duration-500 ease-out md:px-6",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-3xl gap-3",
          isUser ? "justify-end" : "justify-start"
        )}
      >
        {!isUser && (
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black select-none">
            <Logo size="sm" showText={false} />
          </div>
        )}

        <div
          className={cn(
            "relative min-w-0",
            isUser
              ? "max-w-[80%] rounded-2xl bg-[#1a1a1a] text-white shadow-sm md:max-w-[65%]"
              : "flex-1 overflow-hidden"
          )}
        >
          {isEditing ? (
            <div className="w-full min-w-[300px] p-3">
              <textarea
                ref={textareaRef}
                value={editContent}
                onChange={(e) => {
                  setEditContent(e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                className="w-full resize-none rounded-lg bg-[#2a2a2a] p-3 text-sm text-white focus:ring-1 focus:ring-white/20 focus:outline-none"
                rows={1}
              />
              <div className="mt-2 flex justify-end gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="rounded-md bg-gray-700 px-3 py-1.5 text-xs text-white transition-colors hover:bg-gray-600"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="rounded-md bg-white px-3 py-1.5 text-xs font-medium text-black transition-colors hover:bg-gray-200"
                >
                  Enviar
                </button>
              </div>
            </div>
          ) : (
            <div className={cn(isUser && "px-4 py-3")}>
              {isUser ? (
                <p className="text-[13px] leading-6 break-words whitespace-pre-wrap text-white">
                  {content}
                </p>
              ) : (
                <div className="ai-response min-w-0 overflow-hidden">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({ children }) => (
                        <h1 className="mt-5 mb-3 text-xl font-bold text-white first:mt-0">
                          {children}
                        </h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="mt-5 mb-2.5 text-lg font-bold text-white first:mt-0">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="mt-4 mb-2 text-base font-bold text-white first:mt-0">
                          {children}
                        </h3>
                      ),
                      h4: ({ children }) => (
                        <h4 className="mt-3 mb-1.5 text-sm font-bold text-white first:mt-0">
                          {children}
                        </h4>
                      ),
                      p: ({ children }) => (
                        <p className="mb-3 text-[13px] leading-6 break-words text-gray-300 last:mb-0">
                          {children}
                        </p>
                      ),
                      strong: ({ children }) => (
                        <strong className="font-semibold text-white">
                          {children}
                        </strong>
                      ),
                      em: ({ children }) => (
                        <em className="text-gray-400">{children}</em>
                      ),
                      a: ({ children, href }) => (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="break-all text-blue-400 underline decoration-blue-400/30 transition-colors hover:text-blue-300"
                        >
                          {children}
                        </a>
                      ),
                      ul: ({ children }) => (
                        <ul className="mb-3 ml-1 space-y-1.5 text-[13px] leading-6 text-gray-300 last:mb-0">
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="mb-3 ml-1 list-decimal space-y-1.5 pl-4 text-[13px] leading-6 text-gray-300 last:mb-0">
                          {children}
                        </ol>
                      ),
                      li: ({ children }) => (
                        <li className="flex gap-2 text-gray-300">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gray-600" />
                          <span className="min-w-0 flex-1 break-words">
                            {children}
                          </span>
                        </li>
                      ),
                      hr: () => <hr className="my-5 border-white/10" />,
                      blockquote: ({ children }) => (
                        <blockquote className="my-3 border-l-2 border-white/20 pl-3 text-[13px] text-gray-400 italic">
                          {children}
                        </blockquote>
                      ),
                      code({ inline, className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                          <CodeBlock
                            language={match[1] || "text"}
                            value={String(children).replace(/\n$/, "")}
                          />
                        ) : (
                          <code
                            className="rounded bg-white/10 px-1 py-0.5 font-mono text-[12px] break-all text-emerald-400"
                            {...props}
                          >
                            {children}
                          </code>
                        );
                      },
                      pre: ({ children }) => (
                        <div className="my-3 overflow-x-auto">{children}</div>
                      ),
                      table: ({ children }) => (
                        <div className="my-3 w-full overflow-x-auto rounded-lg border border-white/10">
                          <table className="w-full text-left text-xs">
                            {children}
                          </table>
                        </div>
                      ),
                      thead: ({ children }) => (
                        <thead className="border-b border-white/10 bg-white/5 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                          {children}
                        </thead>
                      ),
                      tbody: ({ children }) => (
                        <tbody className="divide-y divide-white/5">
                          {children}
                        </tbody>
                      ),
                      tr: ({ children }) => (
                        <tr className="transition-colors hover:bg-white/[0.02]">
                          {children}
                        </tr>
                      ),
                      th: ({ children }) => (
                        <th className="px-3 py-2 font-bold whitespace-nowrap text-white">
                          {children}
                        </th>
                      ),
                      td: ({ children }) => (
                        <td className="px-3 py-2 text-gray-300">{children}</td>
                      ),
                    }}
                  >
                    {content}
                  </ReactMarkdown>
                  {isStreaming && (
                    <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse rounded-full bg-white/70" />
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {isUser && (
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#2a2a2a] text-[10px] font-medium text-white select-none">
            {initials}
          </div>
        )}
      </div>

      {!isEditing && !isStreaming && content && (
        <div
          className={cn(
            "mx-auto flex w-full max-w-3xl items-center gap-2 text-[10px] text-gray-600 opacity-0 transition-opacity duration-200 group-hover:opacity-100",
            isUser ? "justify-end pr-10" : "justify-start pl-10"
          )}
        >
          {isUser ? (
            <>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 transition-colors hover:text-white"
              >
                {copied ? (
                  <span className="flex items-center gap-1 text-green-400">
                    <Check className="h-3 w-3" /> Copiado
                  </span>
                ) : (
                  <>
                    <Copy className="h-3 w-3" /> Copiar
                  </>
                )}
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1 transition-colors hover:text-white"
              >
                <Edit2 className="h-3 w-3" /> Editar
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-1 transition-colors hover:text-red-400"
              >
                <Trash2 className="h-3 w-3" /> Eliminar
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleFeedback("like")}
                className={cn(
                  "p-1 transition-colors hover:text-white",
                  feedback === "like" && "text-green-400"
                )}
              >
                <ThumbsUp className="h-3 w-3" />
              </button>
              <button
                onClick={() => handleFeedback("dislike")}
                className={cn(
                  "p-1 transition-colors hover:text-white",
                  feedback === "dislike" && "text-red-400"
                )}
              >
                <ThumbsDown className="h-3 w-3" />
              </button>
              <button
                onClick={handleCopy}
                className="p-1 transition-colors hover:text-white"
              >
                {copied ? (
                  <Check className="h-3 w-3 text-green-400" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </button>
              <button
                onClick={() => onRegenerate?.(id)}
                className="p-1 transition-colors hover:text-white"
              >
                <RefreshCw className="h-3 w-3" />
              </button>
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-1 p-1 transition-colors hover:text-white"
              >
                <FileDown className="h-3 w-3" />
                <span className="hidden sm:inline">PDF</span>
              </button>
              <span className="ml-1 border-l border-white/10 pl-1 text-[9px] text-gray-700">
                {timestamp}
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
