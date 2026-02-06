// ============================================
// EXPORTACIÓN CENTRALIZADA DE CONSTANTES
// ============================================

export * from "./ai-models";
export * from "./plans";
export * from "./routes";

// ============================================
// CONSTANTES GLOBALES
// ============================================

export const APP_NAME = "Black AI";
export const APP_DESCRIPTION =
  "Tu asistente de IA inteligente potenciado por Gemini";
export const APP_VERSION = "1.0.0";

export const SUPPORT_EMAIL = "support@blackai.com";

// ============================================
// CONFIGURACIÓN DE LA APLICACIÓN
// ============================================

export const APP_CONFIG = {
  name: APP_NAME,
  description: APP_DESCRIPTION,
  version: APP_VERSION,
  defaultLocale: "es",
  supportedLocales: ["es", "en"],
  aiProvider: "Gemini AI",
} as const;

// ============================================
// LÍMITES Y CONFIGURACIÓN
// ============================================

export const LIMITS = {
  MAX_MESSAGE_LENGTH: 30_000,
  MAX_TITLE_LENGTH: 100,
  MAX_SYSTEM_PROMPT_LENGTH: 2_000,
  MAX_FILE_SIZE_MB: 10,
  MESSAGES_PER_PAGE: 50,
  CONVERSATIONS_PER_PAGE: 20,
} as const;

// ============================================
// TIEMPOS (en milisegundos)
// ============================================

export const TIMEOUTS = {
  TOAST_DURATION: 5_000,
  DEBOUNCE_SEARCH: 300,
  AUTO_SAVE: 1_000,
  SESSION_REFRESH: 60_000 * 5, // 5 minutos
  AI_REQUEST_TIMEOUT: 60_000, // 1 minuto
} as const;

// ============================================
// TECLAS DE ATAJOS
// ============================================

export const KEYBOARD_SHORTCUTS = {
  NEW_CHAT: "ctrl+n",
  SEARCH: "ctrl+k",
  SETTINGS: "ctrl+,",
  SEND_MESSAGE: "enter",
  NEW_LINE: "shift+enter",
  CANCEL: "escape",
} as const;
