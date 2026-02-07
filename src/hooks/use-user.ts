"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

// ============================================
// TIPOS
// ============================================

interface UserStats {
  totalConversations: number;
  totalMessages: number;
  tokensUsed: number;
  tokensLimit: number;
  tokensRemaining: number;
  percentageUsed: number;
  planName: string;
}

interface UsageByMode {
  fast: { used: number; limit: number; remaining: number };
  think: { used: number; limit: number; remaining: number };
  advanced: { used: number; limit: number; remaining: number };
  resetAt: Date | null;
}

interface SettingsPreferences {
  usage_fast?: number;
  usage_think?: number;
  usage_advanced?: number;
  usage_reset_at?: string;
}

interface ProfileWithPlan {
  tokens_used: number;
  plans: { name: string; tokens_limit: number } | null;
}

// ============================================
// HOOK: useUserStats
// ============================================

export function useUserStats(userId: string | null) {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    const fetchStats = async () => {
      try {
        const supabase = createClient();

        // Obtener perfil con plan
        const { data: profile } = await supabase
          .from("user_profiles")
          .select("tokens_used, plans(name, tokens_limit)")
          .eq("user_id", userId)
          .single();

        // Obtener conteo de conversaciones
        const { count: conversationsCount } = await supabase
          .from("conversations")
          .select("*", { count: "exact", head: true })
          .eq("user_id", userId);

        // Obtener conteo de mensajes a través de conversaciones
        const { data: userConversations } = await supabase
          .from("conversations")
          .select("id")
          .eq("user_id", userId);

        let messagesCount = 0;
        const conversations = userConversations as { id: string }[] | null;
        if (conversations && conversations.length > 0) {
          const conversationIds = conversations.map((c) => c.id);
          const { count } = await supabase
            .from("messages")
            .select("*", { count: "exact", head: true })
            .in("conversation_id", conversationIds);
          messagesCount = count ?? 0;
        }

        const profileData = profile as ProfileWithPlan | null;
        const tokensLimit = profileData?.plans?.tokens_limit ?? 50000;
        const tokensUsed = profileData?.tokens_used ?? 0;

        setStats({
          totalConversations: conversationsCount ?? 0,
          totalMessages: messagesCount,
          tokensUsed,
          tokensLimit,
          tokensRemaining: Math.max(0, tokensLimit - tokensUsed),
          percentageUsed: Math.round((tokensUsed / tokensLimit) * 100),
          planName: profileData?.plans?.name ?? "Free",
        });
      } catch (err) {
        console.error("Error fetching user stats:", err);
        setError("Error al cargar estadísticas");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [userId]);

  return { stats, isLoading, error };
}

// ============================================
// HOOK: useUsageByMode
// ============================================

export function useUsageByMode(userId: string | null) {
  const [usage, setUsage] = useState<UsageByMode | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    const fetchUsage = async () => {
      try {
        const supabase = createClient();

        // Obtener settings del usuario
        const { data: settings } = await supabase
          .from("user_settings")
          .select("preferences")
          .eq("user_id", userId)
          .single();

        // Tipar correctamente
        const settingsData = settings as {
          preferences: SettingsPreferences | null;
        } | null;
        const prefs: SettingsPreferences = settingsData?.preferences ?? {};

        // Verificar si necesita reset (24 horas)
        const resetAt = prefs.usage_reset_at
          ? new Date(prefs.usage_reset_at)
          : null;
        const now = new Date();

        let usageFast = prefs.usage_fast ?? 0;
        let usageThink = prefs.usage_think ?? 0;
        let usageAdvanced = prefs.usage_advanced ?? 0;

        // Si pasaron 24 horas, resetear
        if (resetAt && now > resetAt) {
          usageFast = 0;
          usageThink = 0;
          usageAdvanced = 0;
        }

        setUsage({
          fast: {
            used: usageFast,
            limit: 15,
            remaining: Math.max(0, 15 - usageFast),
          },
          think: {
            used: usageThink,
            limit: 5,
            remaining: Math.max(0, 5 - usageThink),
          },
          advanced: {
            used: usageAdvanced,
            limit: 5,
            remaining: Math.max(0, 5 - usageAdvanced),
          },
          resetAt,
        });
      } catch (err) {
        console.error("Error fetching usage:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsage();
  }, [userId]);

  return { usage, isLoading };
}
