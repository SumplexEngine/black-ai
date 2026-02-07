"use client";

import { Logo } from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { ArrowRight, Check, Lock, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PasswordRequirement {
  label: string;
  test: (password: string) => boolean;
}

const passwordRequirements: PasswordRequirement[] = [
  { label: "Al menos 8 caracteres", test: (p) => p.length >= 8 },
  { label: "Una letra mayúscula", test: (p) => /[A-Z]/.test(p) },
  { label: "Una letra minúscula", test: (p) => /[a-z]/.test(p) },
  { label: "Un número", test: (p) => /[0-9]/.test(p) },
];

export function ResetPasswordForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState({
    password: false,
    confirmPassword: false,
  });

  // Validaciones
  const passwordsMatch = formData.password === formData.confirmPassword;
  const allPasswordRequirementsMet = passwordRequirements.every((req) =>
    req.test(formData.password)
  );
  const canSubmit =
    passwordsMatch && allPasswordRequirementsMet && formData.confirmPassword;

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

      const { error: updateError } = await supabase.auth.updateUser({
        password: formData.password,
      });

      if (updateError) {
        if (updateError.message.includes("same as the old password")) {
          setError("La nueva contraseña debe ser diferente a la anterior");
        } else {
          setError(updateError.message);
        }
        return;
      }

      setSuccess(true);

      // Redirigir después de 3 segundos
      setTimeout(() => {
        router.push("/chat");
        router.refresh();
      }, 3000);
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
              Contraseña actualizada
            </h2>
            <p className="text-gray-400">
              Tu contraseña ha sido restablecida exitosamente.
            </p>
            <p className="mt-4 text-sm text-gray-500">
              Redirigiendo automáticamente...
            </p>
          </CardContent>
          <CardFooter className="justify-center">
            <Link href="/chat">
              <Button className="bg-white text-black hover:bg-gray-200">
                Ir al chat
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
        <h1 className="text-2xl font-bold text-white">Nueva contraseña</h1>
        <p className="text-gray-400">Ingresa tu nueva contraseña</p>
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

            {/* Nueva Contraseña */}
            <div className="space-y-2">
              <Input
                name="password"
                type="password"
                label="Nueva contraseña"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                leftIcon={<Lock className="h-4 w-4" />}
                disabled={isLoading}
                required
              />

              {/* Requisitos de contraseña */}
              {formData.password && (
                <div className="animate-fade-in space-y-1">
                  {passwordRequirements.map((req, index) => {
                    const met = req.test(formData.password);
                    return (
                      <div
                        key={index}
                        className={cn(
                          "flex items-center gap-2 text-xs transition-colors",
                          met ? "text-green-400" : "text-gray-500"
                        )}
                      >
                        {met ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <X className="h-3 w-3" />
                        )}
                        {req.label}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Confirmar Contraseña */}
            <Input
              name="confirmPassword"
              type="password"
              label="Confirmar contraseña"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              leftIcon={<Lock className="h-4 w-4" />}
              error={
                touched.confirmPassword &&
                formData.confirmPassword &&
                !passwordsMatch
                  ? "Las contraseñas no coinciden"
                  : undefined
              }
              disabled={isLoading}
              required
            />
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-gray-200"
              size="lg"
              isLoading={isLoading}
              disabled={!canSubmit}
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Restablecer contraseña
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
