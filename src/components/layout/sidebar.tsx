"use client";

import { Logo } from "@/components/common/logo";
import { SidebarHistory } from "@/components/layout/sidebar-history";
import { UserButton } from "@/components/layout/user-button";
import { AI_MODES } from "@/constants/ai-models";
import { cn } from "@/lib/utils";
import { useChatStore } from "@/store/chat-store";
import { useUIStore } from "@/store/ui-store";
import { CreditCard, PenSquare, Settings, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isSidebarOpen, closeSidebar } = useUIStore();
  const { currentMode, clearMessages, setActiveConversationId } =
    useChatStore();

  const handleNewChat = () => {
    closeSidebar();
    clearMessages();
    setActiveConversationId(null);

    // Siempre usar un timestamp único para forzar re-mount del componente
    // Esto resetea completamente el hook use-chat
    router.push("/chat?new=" + Date.now());
  };

  return (
    <>
      {/* Overlay para móvil */}
      {isSidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/10 bg-black transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header: Logo y Modo */}
        <div className="flex h-20 items-center justify-between px-6 pt-2">
          <Link href="/chat" onClick={handleNewChat} className="flex flex-col">
            <Logo size="md" />

            {/* Modo Actual */}
            <div className="mt-1 flex items-center gap-1.5 pl-[52px]">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
              <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                Modo {AI_MODES[currentMode].name}
              </span>
            </div>
          </Link>
          <button
            onClick={closeSidebar}
            className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Botón Nuevo Chat */}
        <div className="px-4 pt-2 pb-4">
          <button
            onClick={handleNewChat}
            className="flex w-full items-center gap-3 rounded-xl bg-white px-4 py-3 text-sm font-medium text-black transition-all hover:bg-gray-200 active:scale-[0.98]"
          >
            <PenSquare className="h-5 w-5" />
            Nuevo Chat
          </button>
        </div>

        {/* Historial Scrollable */}
        <div className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20 flex-1 overflow-y-auto">
          <SidebarHistory />
        </div>

        {/* Footer */}
        <div className="space-y-1 border-t border-white/10 p-3">
          <Link
            href="/settings"
            onClick={closeSidebar}
            className={cn(
              "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors",
              pathname === "/settings"
                ? "bg-white/10 text-white"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            )}
          >
            <Settings className="h-5 w-5" />
            Configuración
          </Link>

          <Link
            href="/pricing"
            onClick={closeSidebar}
            className={cn(
              "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors",
              pathname === "/pricing"
                ? "bg-white/10 text-white"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            )}
          >
            <CreditCard className="h-5 w-5" />
            Suscripción
          </Link>

          {/* Usuario y Plan */}
          <div className="flex flex-col gap-2 pt-2">
            <UserButton />
          </div>
        </div>
      </aside>
    </>
  );
}
