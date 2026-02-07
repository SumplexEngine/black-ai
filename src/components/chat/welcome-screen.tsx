"use client";

import { Logo } from "@/components/common/logo";
import { useAuth } from "@/hooks/use-auth";
import { useUserStats } from "@/hooks/use-user";
import Link from "next/link";
import { useEffect, useState } from "react";

export function WelcomeScreen() {
  const { profile } = useAuth();
  const { stats } = useUserStats(profile?.user_id ?? null);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Buenos días");
    else if (hour < 18) setGreeting("Buenas tardes");
    else setGreeting("Buenas noches");
  }, []);

  const planName = stats?.planName || "Free";
  const isFree = planName === "Free";

  return (
    <div className="animate-fade-in flex h-full flex-col items-center justify-start px-8 pt-[10vh] text-center">
      {/* 1. Logo sin fondo (Más arriba) */}
      <div className="mb-6 scale-125">
        <Logo size="2xl" showText={false} />
      </div>

      {/* 2. Plan Info (Debajo del logo) */}
      <div className="mb-8 flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
        <span className="text-xs font-medium tracking-wide text-gray-400 uppercase">
          Plan {planName}
        </span>
        {isFree && (
          <>
            <div className="h-3 w-px bg-white/10" />
            <Link
              href="/pricing"
              className="text-xs font-bold text-yellow-400 transition-colors hover:text-yellow-300 hover:underline"
            >
              ACTUALIZAR
            </Link>
          </>
        )}
      </div>

      {/* 3. Saludo (Debajo del plan) */}
      <h2 className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
        {greeting},{" "}
        <span className="text-gray-400">
          {profile?.full_name?.split(" ")[0]}
        </span>
      </h2>

      {/* 4. Subtítulo */}
      <p className="mt-4 max-w-md text-lg text-gray-500">
        ¿Qué vamos a crear hoy?
      </p>
    </div>
  );
}
