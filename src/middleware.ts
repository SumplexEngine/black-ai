import { updateSession } from "@/lib/supabase/middleware";
import { type NextRequest, NextResponse } from "next/server";

// ============================================
// CONFIGURACIÓN DE RUTAS
// ============================================

// Rutas que requieren autenticación completa (con perfil)
const protectedRoutes = ["/chat", "/history", "/settings", "/profile"];

// Rutas de autenticación (redirigir a chat si ya está logueado)
const authRoutes = ["/login", "/register", "/forgot-password"];

// Rutas que requieren auth pero permiten perfil incompleto
const profileSetupRoutes = ["/complete-profile"];

// Rutas públicas (no requieren autenticación)
const publicRoutes = ["/", "/verify-email", "/reset-password"];

// ============================================
// MIDDLEWARE
// ============================================

export async function middleware(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request);
  const { pathname } = request.nextUrl;

  // Determinar tipo de ruta
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isProfileSetupRoute = profileSetupRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  // ============================================
  // LÓGICA DE REDIRECCIÓN
  // ============================================

  // 1. Rutas públicas - siempre permitir
  if (isPublicRoute) {
    return supabaseResponse;
  }

  // 2. Rutas de setup de perfil
  if (isProfileSetupRoute) {
    if (!user) {
      // Sin usuario -> login
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // Con usuario -> permitir (verificará perfil en el componente)
    return supabaseResponse;
  }

  // 3. Rutas protegidas
  if (isProtectedRoute) {
    if (!user) {
      // Sin usuario -> login con redirect
      const redirectUrl = new URL("/login", request.url);
      redirectUrl.searchParams.set("redirectTo", pathname);
      return NextResponse.redirect(redirectUrl);
    }
    // Con usuario -> permitir
    return supabaseResponse;
  }

  // 4. Rutas de auth (login, register, etc.)
  if (isAuthRoute) {
    if (user) {
      // Ya autenticado -> ir a chat
      return NextResponse.redirect(new URL("/chat", request.url));
    }
    // Sin usuario -> permitir acceso a auth
    return supabaseResponse;
  }

  // 5. Cualquier otra ruta -> permitir
  return supabaseResponse;
}

// ============================================
// CONFIGURACIÓN DEL MATCHER
// ============================================

export const config = {
  matcher: [
    /*
     * Coincide con todas las rutas excepto:
     * - _next/static (archivos estáticos)
     * - _next/image (optimización de imágenes)
     * - favicon.ico
     * - Archivos de imagen
     * - Archivos públicos
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
