import { Logo } from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowLeft, Mail } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Verificar email | Black AI",
  description: "Verifica tu dirección de email para activar tu cuenta",
};

export default function VerifyEmailPage() {
  return (
    <div className="space-y-6">
      {/* Logo */}
      <div className="flex justify-center">
        <Logo size="lg" />
      </div>

      {/* Card */}
      <Card className="border-white/10 bg-white/5">
        <CardContent className="pt-6 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
            <Mail className="h-8 w-8 text-white" />
          </div>

          <h1 className="mb-2 text-2xl font-bold text-white">
            Verifica tu email
          </h1>

          <p className="mb-6 text-gray-400">
            Hemos enviado un enlace de verificación a tu correo electrónico. Por
            favor, revisa tu bandeja de entrada y haz clic en el enlace para
            activar tu cuenta.
          </p>

          <div className="space-y-3 rounded-lg border border-white/10 bg-white/5 p-4 text-left">
            <p className="text-sm text-gray-400">
              <span className="font-medium text-white">
                ¿No recibes el email?
              </span>
            </p>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="flex items-start gap-2">
                <span className="text-gray-400">•</span>
                Revisa tu carpeta de spam o correo no deseado
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400">•</span>
                Verifica que ingresaste el email correcto
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400">•</span>
                El enlace puede tardar unos minutos en llegar
              </li>
            </ul>
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-3">
          <Link href="/login" className="w-full">
            <Button variant="outline" className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a iniciar sesión
            </Button>
          </Link>
        </CardFooter>
      </Card>

      {/* Ayuda adicional */}
      <p className="text-center text-xs text-gray-500">
        ¿Necesitas ayuda?{" "}
        <Link href="/support" className="text-gray-400 hover:underline">
          Contactar soporte
        </Link>
      </p>
    </div>
  );
}
