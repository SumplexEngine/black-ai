import { AI_MODES, type AIMode } from "@/constants/ai-models";
import {
  generateConversationTitle,
  streamGeminiResponse,
} from "@/lib/ai/gemini";
import { createClient } from "@/lib/supabase/server";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return new Response(JSON.stringify({ error: "No autenticado" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const {
      message,
      conversationId,
      mode = "fast",
    }: {
      message: string;
      conversationId?: string;
      mode?: AIMode;
    } = body;

    if (!message?.trim()) {
      return new Response(JSON.stringify({ error: "Mensaje vacío" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const modeConfig = AI_MODES[mode];
    if (!modeConfig) {
      return new Response(JSON.stringify({ error: "Modo no válido" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const modelId = modeConfig._internal.model;
    const fallbackModel = modeConfig._internal.fallbackModel;
    const thinkingEnabled = modeConfig._internal.thinkingEnabled;
    const systemPrompt = modeConfig._internal.systemPrompt;

    // 1. Crear conversación si no existe
    let activeConversationId: string = conversationId || "";
    let isNewConversation = false;

    if (!activeConversationId) {
      const { data: newConv, error: convError } = await (
        supabase.from("conversations") as any
      )
        .insert({
          user_id: user.id,
          title: "Nueva conversación",
          model: modelId,
        })
        .select("id")
        .single();

      if (convError || !newConv) throw new Error("Error creando conversación");
      activeConversationId = (newConv as { id: string }).id;
      isNewConversation = true;
    }

    // 2. Guardar mensaje del usuario
    const { data: userMsgData } = await (supabase.from("messages") as any)
      .insert({
        conversation_id: activeConversationId,
        role: "user",
        content: message,
        model: modelId,
      })
      .select("id")
      .single();

    const userMessageDbId = (userMsgData as { id: string } | null)?.id || "";

    // 3. Crear placeholder para respuesta de IA (para que ya exista en BD)
    const { data: assistantMsgData } = await (supabase.from("messages") as any)
      .insert({
        conversation_id: activeConversationId,
        role: "assistant",
        content: "", // Se llenará luego
        model: modelId,
        tokens_used: 0,
      })
      .select("id")
      .single();

    const assistantMessageDbId =
      (assistantMsgData as { id: string } | null)?.id || "";

    // 4. Obtener historial (excluyendo el placeholder vacío actual)
    const { data: history } = await (supabase.from("messages") as any)
      .select("role, content")
      .eq("conversation_id", activeConversationId)
      .neq("id", assistantMessageDbId) // Excluir el actual
      .order("created_at", { ascending: true })
      .limit(50);

    const chatHistory = (
      (history as Array<{ role: string; content: string }>) || []
    ).map((msg) => ({
      role: msg.role as "user" | "assistant" | "system",
      content: msg.content,
    }));

    // 5. Streaming y actualización progresiva
    const encoder = new TextEncoder();
    let fullResponse = "";

    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Send initial metadata
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                type: "conversation_id",
                id: activeConversationId,
              })}\n\n`
            )
          );
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                type: "user_message_id",
                id: userMessageDbId,
              })}\n\n`
            )
          );
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                type: "mode",
                mode,
                model: modelId,
              })}\n\n`
            )
          );

          // Generate title in background
          if (isNewConversation) {
            generateConversationTitle(message).then((title) => {
              (supabase.from("conversations") as any)
                .update({ title })
                .eq("id", activeConversationId)
                .then(() => {
                  controller.enqueue(
                    encoder.encode(
                      `data: ${JSON.stringify({ type: "title", title })}\n\n`
                    )
                  );
                });
            });
          }

          // Start Gemini Stream
          const geminiStream = streamGeminiResponse({
            model: modelId,
            fallbackModel,
            messages: chatHistory,
            systemPrompt,
            thinkingEnabled,
          });

          for await (const chunk of geminiStream) {
            fullResponse += chunk;
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ type: "text", content: chunk })}\n\n`
              )
            );
          }

          // UPDATE the placeholder message with full content
          const estimatedTokens = Math.ceil(
            (message.length + fullResponse.length) / 4
          );

          await (supabase.from("messages") as any)
            .update({
              content: fullResponse,
              tokens_used: estimatedTokens,
            })
            .eq("id", assistantMessageDbId);

          // Update user tokens
          await (supabase as any).rpc("update_user_tokens", {
            p_user_id: user.id,
            p_tokens: estimatedTokens,
            p_model: modelId,
            p_action: "chat_message",
            p_conversation_id: activeConversationId,
          });

          // Done signal
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                type: "done",
                tokens: estimatedTokens,
                assistantMessageId: assistantMessageDbId,
              })}\n\n`
            )
          );

          controller.close();
        } catch (error) {
          console.error("Error en streaming:", error);
          const errorMessage =
            error instanceof Error ? error.message : "Error desconocido";

          // Save what we have so far + error
          if (fullResponse) {
            await (supabase.from("messages") as any)
              .update({
                content: fullResponse + `\n\n[Error: ${errorMessage}]`,
              })
              .eq("id", assistantMessageDbId);
          }

          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ type: "error", error: errorMessage })}\n\n`
            )
          );
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error en /api/chat:", error);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
