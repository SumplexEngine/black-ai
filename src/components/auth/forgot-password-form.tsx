"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Logo } from "@/components/common/logo";
import { createClient } from "@/lib/supabase/client";
import { Mail, ArrowLeft, Check } from "lucide-react";

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canSubmit = isEmailValid && email.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `${window.location.origin}/api/auth/callback?next=/reset-password`,
        }
      );

      if (resetError) {
        setError(resetError.message);
        return;
      }

      setSuccess(true);
    } catch {
      setError("Ocurrió un error inesperado. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  // ============================================
  // PANTALLA DE ÉXITO
  // ============================================

  if (success) {
    return (
      <div className="space-y-6">
        <div className="flex justify-center">
          <Logo size="lg" />
        </div>

        <Card className="border-white/20 bg-white/5">
          <CardContent className="pt-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
              <Check className="h-6 w-6 text-white" />
            </div>
            <h2 className="mb-2 text-xl font-semibold text-white">
              Revisa tu email
            </h2>
            <p className="text-gray-400">
              Hemos enviado un enlace de recuperación a{" "}
              <span className="font-medium text-white">{email}</span>
            </p>
            <p className="mt-4 text-sm text-gray-500">
              Haz clic en el enlace del email para restablecer tu contraseña. El
              enlace expirará en 1 hora.
            </p>
          </CardContent>
          <CardFooter className="flex-col gap-3">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setSuccess(false);
                setEmail("");
              }}
            >
              Enviar a otro email
            </Button>
            <Link href="/login" className="w-full">
              <Button variant="ghost" className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a iniciar sesión
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // ============================================
  // FORMULARIO
  // ============================================

  return (
    <div className="space-y-6">
      {/* Logo y Título */}
      <div className="space-y-2 text-center">
        <div className="mb-4 flex justify-center">
          <Logo size="lg" />
        </div>
        <h1 className="text-2xl font-bold text-white">Recuperar contraseña</h1>
        <p className="text-gray-400">
          Ingresa tu email y te enviaremos un enlace para restablecer tu
          contraseña
        </p>
      </div>

      {/* Formulario */}
      <Card className="border-white/10 bg-white/5">
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-6">
            {/* Error */}
            {error && (
              <div className="animate-fade-in rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Email */}
            <Input
              name="email"
              type="email"
              label="Email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
              }}
              onBlur={() => setTouched(true)}
              leftIcon={<Mail className="h-4 w-4" />}
              error={
                touched && !isEmailValid && email
                  ? "Ingresa un email válido"
                  : undefined
              }
              disabled={isLoading}
              required
            />
          </CardContent>

          <CardFooter className="flex-col gap-4">
            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-gray-200"
              size="lg"
              isLoading={isLoading}
              disabled={!canSubmit}
            >
              Enviar enlace de recuperación
            </Button>

            <Link href="/login" className="w-full">
              <Button
                type="button"
                variant="ghost"
                className="w-full text-gray-400"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a iniciar sesión
              </Button>
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
