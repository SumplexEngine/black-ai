/**
 * Configuración de planes de Black AI
 */

// ============================================
// INTERFACES
// ============================================

export interface PlanFeature {
  name: string;
  included: boolean;
  limit?: string;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  priceYearly?: number;
  currency: string;
  tokensLimit: number;
  features: PlanFeature[];
  isPopular?: boolean;
  isAvailable: boolean;
  badge?: string;
}

// ============================================
// PLANES
// ============================================

export const PLANS: Record<string, Plan> = {
  FREE: {
    id: "free",
    name: "Free",
    description: "Perfecto para empezar a explorar Black AI",
    price: 0,
    currency: "USD",
    tokensLimit: 50_000,
    isAvailable: true,
    features: [
      { name: "50,000 tokens mensuales", included: true },
      { name: "Modelos de IA gratuitos", included: true },
      { name: "Conversaciones ilimitadas", included: true },
      { name: "Historial de 30 días", included: true, limit: "30 días" },
      { name: "Exportar en TXT y Markdown", included: true },
      { name: "Soporte por comunidad", included: true },
      { name: "Modelos premium (GPT-4, Claude)", included: false },
      { name: "API Access", included: false },
      { name: "Soporte prioritario", included: false },
    ],
  },

  PRO: {
    id: "pro",
    name: "Pro",
    description: "Para usuarios que necesitan más potencia",
    price: 19.99,
    priceYearly: 199.99,
    currency: "USD",
    tokensLimit: 500_000,
    isPopular: true,
    isAvailable: false, // No disponible aún
    badge: "Más Popular",
    features: [
      { name: "500,000 tokens mensuales", included: true },
      { name: "Todos los modelos de IA", included: true },
      { name: "Conversaciones ilimitadas", included: true },
      { name: "Historial ilimitado", included: true },
      { name: "Exportar en todos los formatos", included: true },
      { name: "Soporte por email", included: true },
      { name: "Modelos premium (GPT-4, Claude)", included: true },
      { name: "API Access", included: true },
      { name: "System prompts personalizados", included: true },
    ],
  },

  ENTERPRISE: {
    id: "enterprise",
    name: "Enterprise",
    description: "Solución personalizada para empresas",
    price: -1, // Contactar para precio
    currency: "USD",
    tokensLimit: -1, // Ilimitado
    isAvailable: false,
    badge: "Personalizado",
    features: [
      { name: "Tokens ilimitados", included: true },
      { name: "Todos los modelos + custom", included: true },
      { name: "Todo ilimitado", included: true },
      { name: "SSO / SAML", included: true },
      { name: "SLA garantizado", included: true },
      { name: "Soporte prioritario 24/7", included: true },
      { name: "API dedicada", included: true },
      { name: "Fine-tuning de modelos", included: true },
      { name: "Onboarding personalizado", included: true },
    ],
  },
} as const;

// ============================================
// CONFIGURACIÓN
// ============================================

/**
 * Plan por defecto para nuevos usuarios
 */
export const DEFAULT_PLAN_ID = "free";
export const DEFAULT_PLAN = PLANS.FREE;

/**
 * Límites del plan Free
 */
export const FREE_PLAN_LIMITS = {
  TOKENS_PER_MONTH: 50_000,
  HISTORY_DAYS: 30,
  MAX_MESSAGE_LENGTH: 4_000,
  MAX_CONVERSATIONS: -1, // -1 = ilimitado
} as const;

/**
 * Obtener plan por ID
 */
export function getPlanById(id: string): Plan | undefined {
  return Object.values(PLANS).find((plan) => plan.id === id);
}

/**
 * Obtener planes disponibles
 */
export function getAvailablePlans(): Plan[] {
  return Object.values(PLANS).filter((plan) => plan.isAvailable);
}

/**
 * Formatear precio del plan
 */
export function formatPlanPrice(plan: Plan): string {
  if (plan.price === 0) return "Gratis";
  if (plan.price === -1) return "Contactar";
  return `$${plan.price}/mes`;
}
