/**
 * Validación y tipado de variables de entorno
 * Configurado para usar Gemini AI
 */

// ============================================
// VARIABLES DEL CLIENTE (públicas)
// ============================================

const clientEnv = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME ?? "Black AI",
  NEXT_PUBLIC_APP_URL:
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
} as const;

// ============================================
// VARIABLES DEL SERVIDOR (privadas)
// ============================================

const serverEnv = {
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  GOOGLE_AI_API_KEY: process.env.GOOGLE_AI_API_KEY,
  NODE_ENV: process.env.NODE_ENV ?? "development",
} as const;

// ============================================
// VALIDACIÓN
// ============================================

/**
 * Valida que las variables de entorno del cliente estén configuradas
 */
export function validateClientEnv(): void {
  const required = [
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  ] as const;

  const missing: string[] = [];

  for (const key of required) {
    if (!clientEnv[key]) {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `❌ Variables de entorno faltantes:\n${missing.map((k) => `   - ${k}`).join("\n")}\n\nRevisa tu archivo .env.local`
    );
  }
}

/**
 * Valida que las variables de entorno del servidor estén configuradas
 */
export function validateServerEnv(): void {
  const required = ["SUPABASE_SERVICE_ROLE_KEY", "GOOGLE_AI_API_KEY"] as const;

  const missing: string[] = [];

  for (const key of required) {
    if (!serverEnv[key]) {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    console.warn(
      `⚠️ Variables de entorno faltantes:\n${missing.map((k) => `   - ${k}`).join("\n")}`
    );
  }
}

/**
 * Valida que Gemini AI esté configurado
 */
export function validateGeminiEnv(): boolean {
  if (!serverEnv.GOOGLE_AI_API_KEY) {
    console.error("❌ GOOGLE_AI_API_KEY no está configurada");
    return false;
  }
  return true;
}

// ============================================
// EXPORTACIONES
// ============================================

/**
 * Variables de entorno del cliente (seguras para exponer)
 */
export const env = {
  // Supabase
  supabaseUrl: clientEnv.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabaseAnonKey: clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",

  // App
  appName: clientEnv.NEXT_PUBLIC_APP_NAME,
  appUrl: clientEnv.NEXT_PUBLIC_APP_URL,

  // Entorno
  isDevelopment: serverEnv.NODE_ENV === "development",
  isProduction: serverEnv.NODE_ENV === "production",
} as const;

/**
 * Variables de entorno del servidor (NUNCA exponer al cliente)
 */
export const serverOnlyEnv = {
  supabaseServiceRoleKey: serverEnv.SUPABASE_SERVICE_ROLE_KEY ?? "",
  geminiApiKey: serverEnv.GOOGLE_AI_API_KEY ?? "",
} as const;
