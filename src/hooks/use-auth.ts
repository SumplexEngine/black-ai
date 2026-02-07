"use client";

import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

// ============================================
// TIPOS
// ============================================

interface UserProfile {
  id: string;
  user_id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  plan_id: string | null;
  tokens_used: number;
  tokens_reset_at: string;
}

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isProfileComplete: boolean;
}

// ============================================
// HOOK
// ============================================

export function useAuth() {
  const router = useRouter();
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    isLoading: true,
    isAuthenticated: false,
    isProfileComplete: false,
  });

  // Obtener datos del usuario
  const fetchUser = useCallback(async () => {
    try {
      const supabase = createClient();

      // Obtener usuario
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setState({
          user: null,
          profile: null,
          isLoading: false,
          isAuthenticated: false,
          isProfileComplete: false,
        });
        return;
      }

      // Obtener perfil
      const { data: profile } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      const userProfile = profile as UserProfile | null;
      const isProfileComplete = Boolean(
        userProfile?.full_name && userProfile?.username
      );

      setState({
        user,
        profile: userProfile,
        isLoading: false,
        isAuthenticated: true,
        isProfileComplete,
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      setState({
        user: null,
        profile: null,
        isLoading: false,
        isAuthenticated: false,
        isProfileComplete: false,
      });
    }
  }, []);

  // Cerrar sesión
  const signOut = useCallback(async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setState({
      user: null,
      profile: null,
      isLoading: false,
      isAuthenticated: false,
      isProfileComplete: false,
    });
    router.push("/login");
    router.refresh();
  }, [router]);

  // Refrescar datos
  const refresh = useCallback(() => {
    setState((prev) => ({ ...prev, isLoading: true }));
    fetchUser();
  }, [fetchUser]);

  // Efecto inicial
  useEffect(() => {
    fetchUser();

    // Escuchar cambios de autenticación
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchUser();
      } else {
        setState({
          user: null,
          profile: null,
          isLoading: false,
          isAuthenticated: false,
          isProfileComplete: false,
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchUser]);

  return {
    ...state,
    signOut,
    refresh,
  };
}
