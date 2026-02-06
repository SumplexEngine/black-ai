/**
 * Utilidades y funciones helper para Black AI
 */

// ============================================
// FORMATEO DE FECHAS
// ============================================

/**
 * Formatea una fecha de forma legible
 */
export function formatDate(
  date: Date | string,
  options?: Intl.DateTimeFormatOptions
): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...options,
  };

  return new Date(date).toLocaleDateString("es-ES", defaultOptions);
}

/**
 * Formatea una fecha con hora
 */
export function formatDateTime(date: Date | string): string {
  return new Date(date).toLocaleString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Formatea tiempo relativo (hace 5 minutos, etc.)
 */
export function formatRelativeTime(date: Date | string): string {
  const now = new Date();
  const then = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "hace un momento";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `hace ${diffInMinutes} ${diffInMinutes === 1 ? "minuto" : "minutos"}`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `hace ${diffInHours} ${diffInHours === 1 ? "hora" : "horas"}`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `hace ${diffInDays} ${diffInDays === 1 ? "día" : "días"}`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `hace ${diffInWeeks} ${diffInWeeks === 1 ? "semana" : "semanas"}`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `hace ${diffInMonths} ${diffInMonths === 1 ? "mes" : "meses"}`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `hace ${diffInYears} ${diffInYears === 1 ? "año" : "años"}`;
}

// ============================================
// FORMATEO DE NÚMEROS Y TOKENS
// ============================================

/**
 * Formatea un número con separadores de miles
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("es-ES").format(num);
}

/**
 * Formatea tokens (con K, M para miles y millones)
 */
export function formatTokens(tokens: number): string {
  if (tokens >= 1_000_000) {
    return `${(tokens / 1_000_000).toFixed(1)}M`;
  }
  if (tokens >= 1_000) {
    return `${(tokens / 1_000).toFixed(1)}K`;
  }
  return tokens.toString();
}

/**
 * Calcula el porcentaje
 */
export function calculatePercentage(used: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((used / total) * 100);
}

// ============================================
// STRINGS
// ============================================

/**
 * Genera un ID único
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

/**
 * Trunca un texto a cierta longitud
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3)}...`;
}

/**
 * Capitaliza la primera letra
 */
export function capitalize(text: string): string {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Obtiene las iniciales de un nombre
 */
/**
 * Obtiene las iniciales de un nombre
 */
export function getInitials(name: string): string {
  if (!name || name.trim().length === 0) return "??";

  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) return "??";

  const firstPart = parts[0];
  if (!firstPart) return "??";

  if (parts.length === 1) {
    return firstPart.substring(0, 2).toUpperCase();
  }

  const lastPart = parts[parts.length - 1];
  if (!lastPart) return firstPart.substring(0, 2).toUpperCase();

  const firstInitial = firstPart[0] ?? "?";
  const lastInitial = lastPart[0] ?? "?";

  return (firstInitial + lastInitial).toUpperCase();
}

/**
 * Genera un color basado en un string (para avatares)
 */
export function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = hash % 360;
  return `hsl(${hue}, 70%, 50%)`;
}

// ============================================
// VALIDACIONES
// ============================================

/**
 * Valida un email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida fortaleza de contraseña
 */
export function getPasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
} {
  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 2) {
    return { score, label: "Débil", color: "text-red-500" };
  }
  if (score <= 4) {
    return { score, label: "Media", color: "text-yellow-500" };
  }
  return { score, label: "Fuerte", color: "text-green-500" };
}

// ============================================
// FUNCIONES DE UTILIDAD
// ============================================

/**
 * Espera un tiempo determinado
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Copia texto al portapapeles
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback para navegadores antiguos
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand("copy");
      return true;
    } catch {
      return false;
    } finally {
      textArea.remove();
    }
  }
}

// ============================================
// DETECCIÓN DE ENTORNO
// ============================================

/**
 * Verifica si estamos en el cliente (browser)
 */
export function isClient(): boolean {
  return typeof window !== "undefined";
}

/**
 * Verifica si estamos en el servidor
 */
export function isServer(): boolean {
  return typeof window === "undefined";
}

/**
 * Verifica si es dispositivo móvil
 */
export function isMobile(): boolean {
  if (!isClient()) return false;
  return window.innerWidth < 768;
}

/**
 * Verifica si es dispositivo táctil
 */
export function isTouchDevice(): boolean {
  if (!isClient()) return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}
