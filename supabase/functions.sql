-- ============================================
-- BLACK AI - FUNCIONES Y TRIGGERS AVANZADOS
-- ============================================
-- Ejecutar en el SQL Editor de Supabase
-- DESPUÉS de crear tablas y políticas
-- ============================================

-- ============================================
-- 1. FUNCIÓN: Crear perfil automáticamente al registrarse
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    free_plan_id UUID;
BEGIN
    -- Obtener el ID del plan Free
    SELECT id INTO free_plan_id
    FROM public.plans
    WHERE name = 'Free' AND is_active = true
    LIMIT 1;

    -- Crear perfil del usuario
    INSERT INTO public.user_profiles (
        user_id,
        username,
        full_name,
        plan_id,
        tokens_used,
        tokens_reset_at
    ) VALUES (
        NEW.id,
        COALESCE(
            NEW.raw_user_meta_data->>'username',
            SPLIT_PART(NEW.email, '@', 1)
        ),
        NEW.raw_user_meta_data->>'full_name',
        free_plan_id,
        0,
        NOW()
    );

    -- Crear configuración por defecto
    INSERT INTO public.user_settings (
        user_id,
        theme,
        language,
        default_model,
        email_notifications,
        preferences
    ) VALUES (
        NEW.id,
        'dark',
        'es',
        'gemini-2.0-flash',
        true,
        '{}'::jsonb
    );

    RETURN NEW;
END;
$$;

-- Trigger: Ejecutar al crear usuario
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 2. FUNCIÓN: Actualizar conversación al crear mensaje
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_new_message()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Actualizar contador de mensajes y fecha de actualización
    UPDATE public.conversations
    SET
        message_count = message_count + 1,
        total_tokens = total_tokens + COALESCE(NEW.tokens_used, 0),
        updated_at = NOW()
    WHERE id = NEW.conversation_id;

    RETURN NEW;
END;
$$;

-- Trigger: Ejecutar al crear mensaje
DROP TRIGGER IF EXISTS on_message_created ON public.messages;
CREATE TRIGGER on_message_created
    AFTER INSERT ON public.messages
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_message();

-- ============================================
-- 3. FUNCIÓN: Generar título de conversación
-- ============================================

CREATE OR REPLACE FUNCTION public.generate_conversation_title(content TEXT)
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
    title TEXT;
BEGIN
    -- Tomar los primeros 50 caracteres del contenido
    title := LEFT(TRIM(content), 50);

    -- Si es muy largo, agregar "..."
    IF LENGTH(TRIM(content)) > 50 THEN
        title := title || '...';
    END IF;

    -- Si está vacío, usar título por defecto
    IF title IS NULL OR title = '' THEN
        title := 'Nueva conversación';
    END IF;

    RETURN title;
END;
$$;

-- ============================================
-- 4. FUNCIÓN: Actualizar título con primer mensaje
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_first_message_title()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    current_title TEXT;
    msg_count INTEGER;
BEGIN
    -- Obtener información de la conversación
    SELECT title, message_count INTO current_title, msg_count
    FROM public.conversations
    WHERE id = NEW.conversation_id;

    -- Solo actualizar si es el primer mensaje del usuario y el título es genérico
    IF NEW.role = 'user' AND msg_count = 0 AND current_title = 'Nueva conversación' THEN
        UPDATE public.conversations
        SET title = public.generate_conversation_title(NEW.content)
        WHERE id = NEW.conversation_id;
    END IF;

    RETURN NEW;
END;
$$;

-- Trigger: Ejecutar antes de insertar mensaje
DROP TRIGGER IF EXISTS on_first_message_title ON public.messages;
CREATE TRIGGER on_first_message_title
    BEFORE INSERT ON public.messages
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_first_message_title();

-- ============================================
-- 5. FUNCIÓN: Actualizar tokens usados del usuario
-- ============================================

CREATE OR REPLACE FUNCTION public.update_user_tokens(
    p_user_id UUID,
    p_tokens INTEGER,
    p_model VARCHAR DEFAULT 'gemini-2.0-flash',
    p_action VARCHAR DEFAULT 'chat_message',
    p_conversation_id UUID DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Actualizar tokens usados en el perfil
    UPDATE public.user_profiles
    SET tokens_used = tokens_used + p_tokens
    WHERE user_id = p_user_id;

    -- Registrar en usage_logs
    INSERT INTO public.usage_logs (
        user_id,
        conversation_id,
        action,
        tokens_total,
        model
    ) VALUES (
        p_user_id,
        p_conversation_id,
        p_action,
        p_tokens,
        p_model
    );

    RETURN TRUE;
END;
$$;

-- ============================================
-- 6. FUNCIÓN: Verificar límite de tokens
-- ============================================

CREATE OR REPLACE FUNCTION public.check_tokens_limit(p_user_id UUID)
RETURNS TABLE (
    has_tokens BOOLEAN,
    tokens_used INTEGER,
    tokens_limit INTEGER,
    tokens_remaining INTEGER,
    percentage_used INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_tokens_used INTEGER;
    v_tokens_limit INTEGER;
BEGIN
    -- Obtener tokens usados y límite del plan
    SELECT
        up.tokens_used,
        COALESCE(p.tokens_limit, 50000)
    INTO v_tokens_used, v_tokens_limit
    FROM public.user_profiles up
    LEFT JOIN public.plans p ON up.plan_id = p.id
    WHERE up.user_id = p_user_id;

    -- Si no existe el usuario
    IF v_tokens_used IS NULL THEN
        v_tokens_used := 0;
        v_tokens_limit := 50000;
    END IF;

    RETURN QUERY SELECT
        (v_tokens_used < v_tokens_limit) AS has_tokens,
        v_tokens_used AS tokens_used,
        v_tokens_limit AS tokens_limit,
        (v_tokens_limit - v_tokens_used) AS tokens_remaining,
        CASE
            WHEN v_tokens_limit > 0 THEN ((v_tokens_used * 100) / v_tokens_limit)
            ELSE 0
        END AS percentage_used;
END;
$$;

-- ============================================
-- 7. FUNCIÓN: Reiniciar tokens mensuales
-- ============================================

CREATE OR REPLACE FUNCTION public.reset_monthly_tokens()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    affected_rows INTEGER;
BEGIN
    -- Reiniciar tokens de usuarios cuya fecha de reset ya pasó
    WITH updated AS (
        UPDATE public.user_profiles
        SET
            tokens_used = 0,
            tokens_reset_at = NOW() + INTERVAL '1 month'
        WHERE tokens_reset_at <= NOW()
        RETURNING 1
    )
    SELECT COUNT(*) INTO affected_rows FROM updated;

    RETURN affected_rows;
END;
$$;

-- ============================================
-- 8. FUNCIÓN: Obtener estadísticas del usuario
-- ============================================

CREATE OR REPLACE FUNCTION public.get_user_stats(p_user_id UUID)
RETURNS TABLE (
    total_conversations BIGINT,
    total_messages BIGINT,
    total_tokens_used BIGINT,
    tokens_limit INTEGER,
    tokens_remaining INTEGER,
    plan_name VARCHAR,
    member_since TIMESTAMPTZ,
    most_used_model VARCHAR
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    SELECT
        (SELECT COUNT(*) FROM public.conversations WHERE user_id = p_user_id) AS total_conversations,
        (SELECT COUNT(*) FROM public.messages m
         INNER JOIN public.conversations c ON m.conversation_id = c.id
         WHERE c.user_id = p_user_id) AS total_messages,
        (SELECT COALESCE(SUM(tokens_total), 0) FROM public.usage_logs WHERE user_id = p_user_id) AS total_tokens_used,
        COALESCE(p.tokens_limit, 50000) AS tokens_limit,
        COALESCE(p.tokens_limit, 50000) - COALESCE(up.tokens_used, 0) AS tokens_remaining,
        COALESCE(p.name, 'Free')::VARCHAR AS plan_name,
        up.created_at AS member_since,
        COALESCE(
            (SELECT model FROM public.usage_logs WHERE user_id = p_user_id
             GROUP BY model ORDER BY COUNT(*) DESC LIMIT 1),
            'gemini-2.0-flash'
        )::VARCHAR AS most_used_model
    FROM public.user_profiles up
    LEFT JOIN public.plans p ON up.plan_id = p.id
    WHERE up.user_id = p_user_id;
END;
$$;

-- ============================================
-- 9. FUNCIÓN: Eliminar conversación y sus mensajes
-- ============================================

CREATE OR REPLACE FUNCTION public.delete_conversation_cascade(
    p_user_id UUID,
    p_conversation_id UUID
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Verificar que la conversación pertenece al usuario
    IF NOT EXISTS (
        SELECT 1 FROM public.conversations
        WHERE id = p_conversation_id AND user_id = p_user_id
    ) THEN
        RAISE EXCEPTION 'Conversación no encontrada o no autorizada';
    END IF;

    -- Eliminar mensajes (se hace automáticamente por CASCADE, pero por seguridad)
    DELETE FROM public.messages WHERE conversation_id = p_conversation_id;

    -- Eliminar conversación
    DELETE FROM public.conversations WHERE id = p_conversation_id;

    RETURN TRUE;
END;
$$;

-- ============================================
-- 10. FUNCIÓN: Archivar/Desarchivar conversación
-- ============================================

CREATE OR REPLACE FUNCTION public.toggle_conversation_archive(
    p_user_id UUID,
    p_conversation_id UUID
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_is_archived BOOLEAN;
BEGIN
    -- Verificar propiedad y obtener estado actual
    SELECT is_archived INTO v_is_archived
    FROM public.conversations
    WHERE id = p_conversation_id AND user_id = p_user_id;

    IF v_is_archived IS NULL THEN
        RAISE EXCEPTION 'Conversación no encontrada o no autorizada';
    END IF;

    -- Cambiar estado
    UPDATE public.conversations
    SET is_archived = NOT v_is_archived
    WHERE id = p_conversation_id AND user_id = p_user_id;

    RETURN NOT v_is_archived;
END;
$$;

-- ============================================
-- ¡FUNCIONES Y TRIGGERS CREADOS EXITOSAMENTE!
-- ============================================
