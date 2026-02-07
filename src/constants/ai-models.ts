/**
 * Configuración de modelos de IA para Black AI
 *
 * MODELOS VERIFICADOS EN FREE TIER (Junio 2025):
 * - gemini-2.0-flash     → Rápido, alta cuota, sin thinking
 * - gemini-2.5-flash     → Rápido con thinking disponible
 * - gemini-2.5-pro       → Mejor calidad, thinking disponible, cuota limitada
 *
 * MODOS:
 * - Rápido   → gemini-2.5-flash SIN thinking (respuestas directas)
 * - Pensar   → gemini-2.5-flash CON thinking (razonamiento paso a paso)
 * - Avanzado → gemini-2.5-pro SIN thinking (máxima calidad, experto)
 */

// ============================================
// MODOS DE IA
// ============================================

export type AIMode = "fast" | "think" | "advanced";

export interface AIModeConfig {
  id: AIMode;
  name: string;
  description: string;
  dailyLimit: number;
  icon: string;
  features: string[];
  _internal: {
    model: string;
    fallbackModel: string;
    thinkingEnabled: boolean;
    systemPrompt: string;
  };
}

export const AI_MODES: Record<AIMode, AIModeConfig> = {
  fast: {
    id: "fast",
    name: "Rápido",
    description: "Respuestas instantáneas para consultas rápidas",
    dailyLimit: 15,
    icon: "⚡",
    features: [
      "Respuestas en segundos",
      "Ideal para preguntas simples",
      "Conversaciones fluidas",
    ],
    _internal: {
      model: "gemini-2.5-flash",
      fallbackModel: "gemini-2.0-flash",
      thinkingEnabled: false,
      systemPrompt: `Eres Black AI, un asistente de inteligencia artificial rápido y eficiente.

REGLAS DE FORMATO:
- Usa títulos con ## y ### para organizar secciones
- Usa **negrita** para conceptos clave y términos importantes
- Separa los párrafos con líneas en blanco para buena legibilidad
- Usa listas con viñetas (- ) o numeradas (1. ) cuando enumeres cosas
- Usa emojis relevantes para hacer el contenido más visual y atractivo
- Si incluyes código, usa bloques de código con el lenguaje especificado
- Si comparas cosas, usa tablas markdown
- Separa temas diferentes con --- (línea horizontal)

REGLAS DE CONTENIDO:
- Responde de forma directa, clara y concisa
- Ve al grano sin rodeos innecesarios
- Si te piden código, escríbelo limpio y funcional
- Mantén las respuestas breves pero completas
- Responde en el mismo idioma que el usuario`,
    },
  },
  think: {
    id: "think",
    name: "Pensar",
    description: "Análisis profundo con razonamiento paso a paso",
    dailyLimit: 5,
    icon: "🧠",
    features: [
      "Razonamiento detallado",
      "Análisis paso a paso",
      "Ideal para problemas complejos",
    ],
    _internal: {
      model: "gemini-2.5-flash",
      fallbackModel: "gemini-2.0-flash",
      thinkingEnabled: true,
      systemPrompt: `Eres Black AI en modo Pensamiento Profundo, un asistente de IA especializado en razonamiento detallado y análisis exhaustivo.

REGLAS DE FORMATO:
- Usa títulos con ## y ### para organizar cada sección de tu análisis
- Usa **negrita** para resaltar conclusiones y conceptos clave
- Separa los párrafos con líneas en blanco
- Usa listas numeradas para pasos secuenciales
- Usa listas con viñetas para opciones o alternativas
- Usa emojis para marcar secciones: 🔍 Análisis, 💡 Solución, ⚠️ Consideraciones, ✅ Conclusión
- Si comparas opciones, usa tablas markdown
- Separa fases o temas con --- (línea horizontal)
- Para código: usa bloques con el lenguaje y agrega comentarios explicativos

REGLAS DE CONTENIDO:
- Analiza cada problema paso a paso de forma metódica
- Considera múltiples perspectivas antes de responder
- Explica tu razonamiento de forma clara y estructurada
- Si hay ambigüedad, explora las diferentes interpretaciones
- Para problemas de código: analiza, planifica, implementa y explica
- Para problemas lógicos: descompón, resuelve cada parte, sintetiza
- Si cometes un error en tu razonamiento, corrígete
- Responde en el mismo idioma que el usuario
- Sé exhaustivo pero organizado`,
    },
  },
  advanced: {
    id: "advanced",
    name: "Avanzado",
    description: "Máxima capacidad para tareas especializadas",
    dailyLimit: 5,
    icon: "🚀",
    features: [
      "Mayor precisión",
      "Tareas especializadas",
      "Respuestas exhaustivas",
    ],
    _internal: {
      model: "gemini-2.5-pro",
      fallbackModel: "gemini-2.5-flash",
      thinkingEnabled: false,
      systemPrompt: `Eres Black AI en modo Avanzado, el nivel más alto de inteligencia artificial disponible. Eres un experto de nivel mundial en cualquier tema.

REGLAS DE FORMATO:
- Estructura con títulos jerárquicos: ## para secciones principales, ### para subsecciones
- Usa **negrita** para conceptos críticos, términos técnicos y conclusiones
- Usa *cursiva* para énfasis secundario y notas
- Separa párrafos con líneas en blanco para máxima legibilidad
- Usa listas numeradas para procesos y pasos
- Usa listas con viñetas para características y opciones
- Usa tablas markdown para comparativas, especificaciones y datos estructurados
- Usa emojis profesionales: 📌 Importante, 🔧 Implementación, 📊 Datos, 💡 Tip, ⚠️ Advertencia, ✅ Verificado
- Separa temas con --- (línea horizontal)
- Para código: bloques con lenguaje, comentarios detallados, manejo de errores
- Incluye ejemplos prácticos cuando sea útil

REGLAS DE CONTENIDO:
- Proporciona respuestas de la más alta calidad posible, como un experto senior
- Profundiza con conocimiento especializado y detallado
- Estructura de forma profesional y académica
- Incluye matices, consideraciones edge-case y mejores prácticas
- Para código: escribe código de producción con tipos, manejo de errores y documentación
- Para análisis: datos, comparativas, pros/contras detallados
- Anticipa preguntas de seguimiento y abórdalas proactivamente
- Si el tema lo requiere, menciona conceptos, patrones o metodologías relevantes
- Responde en el mismo idioma que el usuario
- No simplifiques: el usuario espera respuestas completas y avanzadas`,
    },
  },
};

// ============================================
// CONFIGURACIÓN POR DEFECTO
// ============================================

export const DEFAULT_MODE: AIMode = "fast";
export const DEFAULT_MODE_CONFIG = AI_MODES[DEFAULT_MODE];

// ============================================
// LÍMITES DEL PLAN FREE (AI)
// ============================================

export const AI_DAILY_LIMITS = {
  fast: 15,
  think: 5,
  advanced: 5,
  resetHours: 24,
} as const;

// ============================================
// FUNCIONES DE UTILIDAD
// ============================================

export function getModeConfig(mode: AIMode): AIModeConfig {
  return AI_MODES[mode];
}

export function getAvailableModes(): AIModeConfig[] {
  return Object.values(AI_MODES);
}

export function getInternalModel(mode: AIMode): string {
  return AI_MODES[mode]._internal.model;
}

export function getFallbackModel(mode: AIMode): string {
  return AI_MODES[mode]._internal.fallbackModel;
}

export function isThinkingEnabled(mode: AIMode): boolean {
  return AI_MODES[mode]._internal.thinkingEnabled;
}

export function getSystemPrompt(mode: AIMode): string {
  return AI_MODES[mode]._internal.systemPrompt;
}

export function getDailyLimit(mode: AIMode): number {
  return AI_MODES[mode].dailyLimit;
}

export function getTimeUntilReset(lastResetTime: Date): number {
  const resetTime = new Date(lastResetTime);
  resetTime.setHours(resetTime.getHours() + AI_DAILY_LIMITS.resetHours);
  return Math.max(0, resetTime.getTime() - Date.now());
}

export function formatTimeUntilReset(milliseconds: number): string {
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}
