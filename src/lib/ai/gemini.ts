import { GoogleGenAI } from "@google/genai";

// ============================================
// CLIENTE DE GEMINI
// ============================================

let genAIInstance: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI {
  if (!genAIInstance) {
    const apiKey = process.env.GOOGLE_AI_API_KEY;
    if (!apiKey) {
      throw new Error("GOOGLE_AI_API_KEY no está configurada en .env.local");
    }
    genAIInstance = new GoogleGenAI({ apiKey });
  }
  return genAIInstance;
}

// ============================================
// GENERAR TÍTULO AUTOMÁTICO
// ============================================

export async function generateConversationTitle(
  firstMessage: string
): Promise<string> {
  try {
    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Genera un título corto (máximo 50 caracteres) para una conversación que empieza con este mensaje. Solo responde con el título, sin comillas ni puntuación extra:\n\n"${firstMessage.slice(0, 200)}"`,
    });

    const title = response.text?.trim();
    if (title && title.length > 0 && title.length <= 60) {
      return title;
    }
    return firstMessage.slice(0, 50) + (firstMessage.length > 50 ? "..." : "");
  } catch {
    return firstMessage.slice(0, 50) + (firstMessage.length > 50 ? "..." : "");
  }
}

// ============================================
// STREAMING CON FALLBACK AUTOMÁTICO
// ============================================

export interface GeminiStreamOptions {
  model: string;
  fallbackModel?: string;
  messages: Array<{ role: "user" | "assistant" | "system"; content: string }>;
  systemPrompt?: string;
  thinkingEnabled?: boolean;
}

export async function* streamGeminiResponse(
  options: GeminiStreamOptions
): AsyncGenerator<string, void, unknown> {
  const { model, fallbackModel, messages, systemPrompt, thinkingEnabled } =
    options;

  // Modelos a intentar en orden
  const modelsToTry = [model];
  if (fallbackModel && fallbackModel !== model) {
    modelsToTry.push(fallbackModel);
  }
  if (!modelsToTry.includes("gemini-2.0-flash")) {
    modelsToTry.push("gemini-2.0-flash");
  }

  let lastError: Error | null = null;

  for (let i = 0; i < modelsToTry.length; i++) {
    const currentModel = modelsToTry[i];
    if (!currentModel) continue;

    try {
      const stream = attemptStream({
        model: currentModel,
        messages,
        systemPrompt,
        thinkingEnabled: thinkingEnabled && supportsThinking(currentModel),
      });

      let hasYielded = false;

      for await (const chunk of stream) {
        hasYielded = true;
        yield chunk;
      }

      if (hasYielded) return;
    } catch (error: unknown) {
      const err =
        error instanceof Error ? error : new Error("Error desconocido");
      lastError = err;

      const isRetryableError =
        err.message.includes("429") ||
        err.message.includes("RESOURCE_EXHAUSTED") ||
        err.message.includes("quota") ||
        err.message.includes("404") ||
        err.message.includes("NOT_FOUND");

      const isLastModel = i === modelsToTry.length - 1;

      if (isRetryableError && !isLastModel) {
        console.warn(
          `[Gemini] Error con ${currentModel}, intentando siguiente modelo...`
        );
        continue;
      }

      throw err;
    }
  }

  if (lastError) {
    throw lastError;
  }
}

// ============================================
// INTENTAR STREAM CON UN MODELO ESPECÍFICO
// ============================================

async function* attemptStream(options: {
  model: string;
  messages: Array<{ role: "user" | "assistant" | "system"; content: string }>;
  systemPrompt?: string;
  thinkingEnabled?: boolean;
}): AsyncGenerator<string, void, unknown> {
  const ai = getGeminiClient();
  const { model, messages, systemPrompt, thinkingEnabled } = options;

  // Construir historial para Gemini
  const contents: Array<{
    role: "user" | "model";
    parts: Array<{ text: string }>;
  }> = [];

  for (const msg of messages) {
    if (msg.role === "system") continue;
    contents.push({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    });
  }

  // Configuración
  const config: Record<string, unknown> = {};

  if (systemPrompt) {
    config.systemInstruction = systemPrompt;
  }

  if (thinkingEnabled) {
    config.thinkingConfig = { thinkingBudget: 2048 };
  }

  const response = await ai.models.generateContentStream({
    model,
    contents,
    config: Object.keys(config).length > 0 ? config : undefined,
  });

  for await (const chunk of response) {
    const text = chunk.text;
    if (text) {
      yield text;
    }
  }
}

// ============================================
// VERIFICAR SI UN MODELO SOPORTA THINKING
// ============================================

function supportsThinking(model: string): boolean {
  const thinkingModels = ["gemini-2.5-flash", "gemini-2.5-pro"];
  return thinkingModels.some((m) => model.includes(m));
}

// ============================================
// GENERAR RESPUESTA SIN STREAMING
// ============================================

export async function generateGeminiResponse(
  model: string,
  prompt: string,
  systemPrompt?: string
): Promise<string> {
  const ai = getGeminiClient();

  const config: Record<string, unknown> = {};
  if (systemPrompt) {
    config.systemInstruction = systemPrompt;
  }

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: Object.keys(config).length > 0 ? config : undefined,
    });

    return response.text || "";
  } catch {
    if (model !== "gemini-2.0-flash") {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
        config: Object.keys(config).length > 0 ? config : undefined,
      });
      return response.text || "";
    }
    throw new Error("No se pudo generar respuesta");
  }
}
