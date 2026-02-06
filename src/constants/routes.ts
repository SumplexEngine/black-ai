/**
 * Rutas de la aplicación
 * Centralizar las rutas evita errores de tipeo
 */

export const ROUTES = {
  // ============================================
  // PÚBLICAS
  // ============================================
  HOME: "/",

  // ============================================
  // AUTENTICACIÓN
  // ============================================
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  VERIFY_EMAIL: "/verify-email",

  // ============================================
  // DASHBOARD
  // ============================================
  DASHBOARD: "/chat",
  CHAT: "/chat",
  CHAT_CONVERSATION: (id: string) => `/chat/${id}` as const,
  HISTORY: "/history",
  SETTINGS: "/settings",
  PROFILE: "/profile",

  // ============================================
  // API
  // ============================================
  API: {
    AUTH: {
      CALLBACK: "/api/auth/callback",
      LOGIN: "/api/auth/login",
      REGISTER: "/api/auth/register",
      LOGOUT: "/api/auth/logout",
    },
    CHAT: "/api/chat",
    CONVERSATIONS: "/api/conversations",
    USER: "/api/user",
  },
} as const;

/**
 * Rutas que requieren autenticación
 */
export const PROTECTED_ROUTES = [
  "/chat",
  "/history",
  "/settings",
  "/profile",
] as const;

/**
 * Rutas públicas (accesibles sin auth)
 */
export const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/verify-email",
] as const;

/**
 * Rutas de auth (redirigir a dashboard si ya está autenticado)
 */
export const AUTH_ROUTES = ["/login", "/register", "/forgot-password"] as const;

/**
 * Verifica si una ruta es protegida
 */
export function isProtectedRoute(path: string): boolean {
  return PROTECTED_ROUTES.some((route) => path.startsWith(route));
}

/**
 * Verifica si una ruta es de autenticación
 */
export function isAuthRoute(path: string): boolean {
  return AUTH_ROUTES.some((route) => path === route);
}
