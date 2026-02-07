"use client";

import { useAuth } from "@/hooks/use-auth";
import { useUserStats } from "@/hooks/use-user";
import { cn, getInitials } from "@/lib/utils";
import { LogOut, MoreHorizontal, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function UserButton() {
  const { user, profile, signOut } = useAuth();
  const { stats } = useUserStats(user?.id ?? null);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const fullName = profile?.full_name || "Usuario";
  const initials = getInitials(fullName);
  const planName = stats?.planName || "Free";

  // Colores según el plan
  const planColors = {
    Free: "text-gray-500",
    Pro: "text-blue-400",
    Enterprise: "text-yellow-400",
  };

  const planColor =
    planColors[planName as keyof typeof planColors] || "text-gray-500";

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition-colors hover:bg-white/5"
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/5 bg-white/10 text-sm font-medium text-white">
          {initials}
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="truncate text-sm font-medium text-white">{fullName}</p>
          <div className="flex items-center gap-1.5">
            <div
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                planName === "Free"
                  ? "bg-gray-500"
                  : planName === "Pro"
                    ? "bg-blue-500"
                    : "bg-yellow-500"
              )}
            />
            <p
              className={cn(
                "truncate text-[10px] font-semibold tracking-wider uppercase",
                planColor
              )}
            >
              Plan {planName}
            </p>
          </div>
        </div>
        <MoreHorizontal className="h-4 w-4 text-gray-500" />
      </button>

      {/* Menú Dropdown */}
      {isOpen && (
        <div className="animate-fade-in absolute bottom-full left-0 z-50 mb-2 w-full min-w-[200px] overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] shadow-xl">
          <div className="p-1">
            <div className="mb-1 truncate border-b border-white/5 px-3 py-2 text-xs text-gray-500">
              {user?.email}
            </div>
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
            >
              <UserIcon className="h-4 w-4" />
              Mi Perfil
            </Link>
          </div>
          <div className="h-px bg-white/5" />
          <div className="p-1">
            <button
              onClick={() => signOut()}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-red-500/10"
            >
              <LogOut className="h-4 w-4" />
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
