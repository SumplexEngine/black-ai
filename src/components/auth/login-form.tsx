"use client";

import { Logo } from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { ArrowRight, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

// ============================================
// ICONOS DE PROVEEDORES OAUTH
// ============================================

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="currentColor"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="currentColor"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="currentColor"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/chat";

  const [isLoading, setIsLoading] = useState(false);
  const [isOAuthLoading, setIsOAuthLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  // Validaciones
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isPasswordValid = formData.password.length >= 1;
  const canSubmit = isEmailValid && isPasswordValid;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

      if (signInError) {
        if (signInError.message.includes("Invalid login credentials")) {
          setError("Email o contraseña incorrectos");
        } else if (signInError.message.includes("Email not confirmed")) {
          setError("Debes confirmar tu email antes de iniciar sesión");
        } else {
          setError(signInError.message);
        }
        return;
      }

      if (data.session) {
        // Verificar si el usuario tiene perfil completo
        const { data: profile } = await supabase
          .from("user_profiles")
          .select("full_name, username")
          .eq("user_id", data.user.id)
          .single();

        // Tipar el perfil
        const userProfile = profile as {
          full_name: string | null;
          username: string | null;
        } | null;

        // Si no tiene nombre completo, redirigir a completar perfil
        if (!userProfile?.full_name) {
          router.push("/complete-profile");
        } else {
          router.push(redirectTo);
        }
        router.refresh();
      }
    } catch {
      setError("Ocurrió un error inesperado. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: "google" | "github" | "apple") => {
    setIsOAuthLoading(provider);
    setError(null);

    try {
      const supabase = createClient();

      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback?next=/complete-profile`,
        },
      });

      if (error) {
        setError(error.message);
        setIsOAuthLoading(null);
      }
    } catch {
      setError("Error al conectar con el proveedor");
      setIsOAuthLoading(null);
    }
  };

  // ============================================
  // FORMULARIO DE LOGIN
  // ============================================

  return (
    <div className="space-y-6">
      {/* Logo y Título */}
      <div className="space-y-2 text-center">
        <div className="mb-4 flex justify-center">
          <Logo size="lg" />
        </div>
        <h1 className="text-2xl font-bold text-white">Bienvenido de nuevo</h1>
        <p className="text-gray-400">Inicia sesión en tu cuenta</p>
      </div>

      {/* Formulario */}
      <Card className="border-white/10 bg-white/5">
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-6">
            {/* Error global */}
            {error && (
              <div className="animate-fade-in rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Mensaje de redirección */}
            {searchParams.get("redirectTo") && (
              <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-gray-400">
                Inicia sesión para continuar
              </div>
            )}

            {/* OAuth Buttons */}
            <div className="grid grid-cols-3 gap-3">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => handleOAuthSignIn("google")}
                disabled={isOAuthLoading !== null || isLoading}
                isLoading={isOAuthLoading === "google"}
              >
                {isOAuthLoading !== "google" && (
                  <GoogleIcon className="h-5 w-5" />
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => handleOAuthSignIn("github")}
                disabled={isOAuthLoading !== null || isLoading}
                isLoading={isOAuthLoading === "github"}
              >
                {isOAuthLoading !== "github" && (
                  <GitHubIcon className="h-5 w-5" />
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => handleOAuthSignIn("apple")}
                disabled={isOAuthLoading !== null || isLoading}
                isLoading={isOAuthLoading === "apple"}
              >
                {isOAuthLoading !== "apple" && (
                  <AppleIcon className="h-5 w-5" />
                )}
              </Button>
            </div>

            {/* Divisor con líneas */}
            <div className="relative flex items-center gap-4 py-2">
              <div className="flex-1 border-t border-white/20" />
              <span className="text-xs whitespace-nowrap text-gray-500 uppercase">
                O continúa con email
              </span>
              <div className="flex-1 border-t border-white/20" />
            </div>

            {/* Email */}
            <Input
              name="email"
              type="email"
              label="Email"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              leftIcon={<Mail className="h-4 w-4" />}
              error={
                touched.email && !isEmailValid && formData.email
                  ? "Ingresa un email válido"
                  : undefined
              }
              disabled={isLoading || isOAuthLoading !== null}
              required
            />

            {/* Password */}
            <div className="space-y-2">
              <Input
                name="password"
                type="password"
                label="Contraseña"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                leftIcon={<Lock className="h-4 w-4" />}
                disabled={isLoading || isOAuthLoading !== null}
                required
              />

              {/* Link olvidé contraseña */}
              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-4">
            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-gray-200"
              size="lg"
              isLoading={isLoading}
              disabled={!canSubmit || isOAuthLoading !== null}
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Iniciar sesión
            </Button>

            <p className="text-center text-sm text-gray-400">
              ¿No tienes cuenta?{" "}
              <Link
                href="/register"
                className="font-medium text-white hover:underline"
              >
                Crear cuenta
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
