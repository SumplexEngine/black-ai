/**
 * Configuración de modelos de IA para Black AI
 * Usando exclusivamente Gemini AI de Google
 */

// ============================================
// PROVEEDOR
// ============================================

export const AI_PROVIDER = "google" as const;

// ============================================
// INTERFACE DE MODELO
// ============================================

export interface AIModelConfig {
  id: string;
  name: string;
  description: string;
  maxTokens: number;
  contextWindow: number;
  isAvailable: boolean;
  isDefault: boolean;
  speed: "fast" | "medium" | "slow";
  quality: "standard" | "high" | "premium";
  bestFor: string[];
}

// ============================================
// MODELOS DE GEMINI DISPONIBLES
// ============================================

export const AI_MODELS: AIModelConfig[] = [
  {
    id: "gemini-2.0-flash",
    name: "Gemini 2.0 Flash",
    description:
      "El modelo más reciente y rápido de Google. Ideal para respuestas instantáneas.",
    maxTokens: 8_192,
    contextWindow: 1_000_000,
    isAvailable: true,
    isDefault: true,
    speed: "fast",
    quality: "high",
    bestFor: ["Respuestas rápidas", "Chat general", "Análisis de texto"],
  },
  {
    id: "gemini-1.5-flash",
    name: "Gemini 1.5 Flash",
    description:
      "Modelo rápido y eficiente. Excelente balance entre velocidad y calidad.",
    maxTokens: 8_192,
    contextWindow: 1_000_000,
    isAvailable: true,
    isDefault: false,
    speed: "fast",
    quality: "high",
    bestFor: ["Tareas rápidas", "Resúmenes", "Traducciones"],
  },
  {
    id: "gemini-1.5-pro",
    name: "Gemini 1.5 Pro",
    description:
      "Modelo avanzado con contexto masivo. Ideal para análisis profundos.",
    maxTokens: 8_192,
    contextWindow: 2_000_000,
    isAvailable: true,
    isDefault: false,
    speed: "medium",
    quality: "premium",
    bestFor: [
      "Análisis profundo",
      "Documentos largos",
      "Razonamiento complejo",
    ],
  },
];

// ============================================
// CONFIGURACIÓN POR DEFECTO
// ============================================

const defaultModel = AI_MODELS.find((m) => m.isDefault);
const firstModel = AI_MODELS[0];

if (!defaultModel && !firstModel) {
  throw new Error("No hay modelos de IA configurados");
}

export const DEFAULT_MODEL: AIModelConfig = defaultModel ?? firstModel!;
export const DEFAULT_MODEL_ID: string = DEFAULT_MODEL.id;

export const DEFAULT_CHAT_CONFIG = {
  temperature: 0.7,
  maxTokens: 4_096,
  topP: 0.95,
  topK: 40,
} as const;

// ============================================
// FUNCIONES DE UTILIDAD
// ============================================

/**
 * Obtener modelo por ID
 */
export function getModelById(id: string): AIModelConfig | undefined {
  return AI_MODELS.find((model) => model.id === id);
}

/**
 * Obtener modelos disponibles
 */
export function getAvailableModels(): AIModelConfig[] {
  return AI_MODELS.filter((model) => model.isAvailable);
}

/**
 * Obtener el modelo por defecto
 */
export function getDefaultModel(): AIModelConfig {
  return DEFAULT_MODEL;
}

/**
 * Verificar si un modelo existe y está disponible
 */
export function isModelAvailable(id: string): boolean {
  const model = getModelById(id);
  return model?.isAvailable ?? false;
}
