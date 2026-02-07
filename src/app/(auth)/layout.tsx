import { Logo } from "@/components/common/logo";
import { Lightbulb, PenTool, Shield, Target } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Lado Izquierdo - Formulario */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:max-w-md">{children}</div>
      </div>

      {/* Lado Derecho - Decorativo (solo en pantallas grandes) */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-white/5 via-transparent to-white/5 lg:flex lg:flex-1">
        {/* Círculos decorativos */}
        <div className="absolute top-1/4 -right-20 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-1/4 -left-20 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />

        {/* Contenido central */}
        <div className="relative flex w-full flex-col items-center justify-center p-12 text-center">
          <Logo size="2xl" showText={false} />

          <h2 className="mt-6 text-3xl font-bold text-white">Black AI</h2>

          <p className="mt-4 max-w-md text-lg text-gray-400">
            Tu asistente de inteligencia artificial para resolver problemas,
            generar ideas y potenciar tu productividad.
          </p>

          {/* Características */}
          <div className="mt-12 w-full max-w-sm space-y-6 text-left">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/10">
                <Lightbulb className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-white">Resuelve problemas</h3>
                <p className="text-sm text-gray-500">
                  Desde matemáticas hasta programación
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/10">
                <PenTool className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-white">Genera contenido</h3>
                <p className="text-sm text-gray-500">
                  Textos, ideas, resúmenes y más
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/10">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-white">Asistente personal</h3>
                <p className="text-sm text-gray-500">
                  Respuestas precisas a tus preguntas
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/10">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-white">Privado y seguro</h3>
                <p className="text-sm text-gray-500">
                  Tus conversaciones están protegidas
                </p>
              </div>
            </div>
          </div>

          {/* Créditos */}
          <p className="mt-12 text-xs text-gray-600">
            Desarrollado por Sumplex Studios
          </p>
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>
    </div>
  );
}
