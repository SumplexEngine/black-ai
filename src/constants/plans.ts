/**
 * Configuración de planes de Black AI
 * Desarrollado por Sumplex Studios
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
    isAvailable: true,
    features: [
      { name: "Modo Rápido: 15 peticiones/día", included: true },
      { name: "Modo Pensar: 5 peticiones/día", included: true },
      { name: "Modo Avanzado: 5 peticiones/día", included: true },
      { name: "Conversaciones ilimitadas", included: true },
      { name: "Historial de 30 días", included: true, limit: "30 días" },
      { name: "Exportar en TXT y Markdown", included: true },
      { name: "Soporte por comunidad", included: true },
      { name: "Peticiones ilimitadas", included: false },
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
    isPopular: true,
    isAvailable: false,
    badge: "Próximamente",
    features: [
      { name: "Peticiones ilimitadas", included: true },
      { name: "Todos los modos de IA", included: true },
      { name: "Conversaciones ilimitadas", included: true },
      { name: "Historial ilimitado", included: true },
      { name: "Exportar en todos los formatos", included: true },
      { name: "Soporte por email", included: true },
      { name: "API Access", included: true },
      { name: "Prioridad en respuestas", included: true },
    ],
  },

  ENTERPRISE: {
    id: "enterprise",
    name: "Enterprise",
    description: "Solución personalizada para empresas",
    price: -1,
    currency: "USD",
    isAvailable: false,
    badge: "Contactar",
    features: [
      { name: "Todo ilimitado", included: true },
      { name: "API dedicada", included: true },
      { name: "SSO / SAML", included: true },
      { name: "SLA garantizado", included: true },
      { name: "Soporte prioritario 24/7", included: true },
      { name: "Onboarding personalizado", included: true },
    ],
  },
} as const;

// ============================================
// CONFIGURACIÓN
// ============================================

export const DEFAULT_PLAN_ID = "free";
export const DEFAULT_PLAN = PLANS.FREE;

export const PLAN_LIMITS = {
  FREE: {
    HISTORY_DAYS: 30,
    MAX_MESSAGE_LENGTH: 10_000,
    MAX_CONVERSATIONS: -1,
  },
  PRO: {
    HISTORY_DAYS: -1,
    MAX_MESSAGE_LENGTH: 50_000,
    MAX_CONVERSATIONS: -1,
  },
} as const;

// ============================================
// FUNCIONES
// ============================================

export function getPlanById(id: string): Plan | undefined {
  return Object.values(PLANS).find((plan) => plan.id === id);
}

export function getAvailablePlans(): Plan[] {
  return Object.values(PLANS).filter((plan) => plan.isAvailable);
}

export function formatPlanPrice(plan: Plan): string {
  if (plan.price === 0) return "Gratis";
  if (plan.price === -1) return "Contactar";
  return `$${plan.price}/mes`;
}
