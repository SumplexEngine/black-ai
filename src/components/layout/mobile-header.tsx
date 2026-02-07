"use client";

import { Logo } from "@/components/common/logo";
import { useUIStore } from "@/store/ui-store";
import { Menu } from "lucide-react";

export function MobileHeader() {
  const { openSidebar } = useUIStore();

  return (
    <header className="flex h-16 items-center justify-between border-b border-white/10 bg-black px-4 lg:hidden">
      <button
        onClick={openSidebar}
        className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white"
      >
        <Menu className="h-6 w-6" />
      </button>
      <Logo size="sm" />
      <div className="w-10" /> {/* Espaciador para centrar logo */}
    </header>
  );
}
