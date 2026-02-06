-- ============================================
-- BLACK AI - POLÍTICAS DE SEGURIDAD RLS
-- ============================================
-- Ejecutar en el SQL Editor de Supabase
-- DESPUÉS de crear las tablas (schema.sql)
-- ============================================

-- ============================================
-- 1. HABILITAR RLS EN TODAS LAS TABLAS
-- ============================================

ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_logs ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 2. POLÍTICAS PARA: plans
-- Los planes son públicos (todos pueden leerlos)
-- Solo admins pueden modificarlos (via service_role)
-- ============================================

-- Política: Cualquiera puede ver planes activos
DROP POLICY IF EXISTS "Plans are viewable by everyone" ON public.plans;
CREATE POLICY "Plans are viewable by everyone"
    ON public.plans
    FOR SELECT
    USING (is_active = true);

-- ============================================
-- 3. POLÍTICAS PARA: ai_models
-- Los modelos son públicos (todos pueden leerlos)
-- Solo admins pueden modificarlos (via service_role)
-- ============================================

-- Política: Cualquiera puede ver modelos disponibles
DROP POLICY IF EXISTS "AI Models are viewable by everyone" ON public.ai_models;
CREATE POLICY "AI Models are viewable by everyone"
    ON public.ai_models
    FOR SELECT
    USING (is_available = true);

-- ============================================
-- 4. POLÍTICAS PARA: user_profiles
-- Usuarios pueden ver y editar solo SU perfil
-- ============================================

-- Política: Usuario puede ver su propio perfil
DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;
CREATE POLICY "Users can view own profile"
    ON public.user_profiles
    FOR SELECT
    USING (auth.uid() = user_id);

-- Política: Usuario puede insertar su propio perfil
DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;
CREATE POLICY "Users can insert own profile"
    ON public.user_profiles
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Política: Usuario puede actualizar su propio perfil
DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
CREATE POLICY "Users can update own profile"
    ON public.user_profiles
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- ============================================
-- 5. POLÍTICAS PARA: user_settings
-- Usuarios pueden ver y editar solo SU configuración
-- ============================================

-- Política: Usuario puede ver su configuración
DROP POLICY IF EXISTS "Users can view own settings" ON public.user_settings;
CREATE POLICY "Users can view own settings"
    ON public.user_settings
    FOR SELECT
    USING (auth.uid() = user_id);

-- Política: Usuario puede insertar su configuración
DROP POLICY IF EXISTS "Users can insert own settings" ON public.user_settings;
CREATE POLICY "Users can insert own settings"
    ON public.user_settings
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Política: Usuario puede actualizar su configuración
DROP POLICY IF EXISTS "Users can update own settings" ON public.user_settings;
CREATE POLICY "Users can update own settings"
    ON public.user_settings
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- ============================================
-- 6. POLÍTICAS PARA: conversations
-- Usuarios pueden CRUD solo SUS conversaciones
-- ============================================

-- Política: Usuario puede ver sus conversaciones
DROP POLICY IF EXISTS "Users can view own conversations" ON public.conversations;
CREATE POLICY "Users can view own conversations"
    ON public.conversations
    FOR SELECT
    USING (auth.uid() = user_id);

-- Política: Usuario puede crear conversaciones
DROP POLICY IF EXISTS "Users can create conversations" ON public.conversations;
CREATE POLICY "Users can create conversations"
    ON public.conversations
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Política: Usuario puede actualizar sus conversaciones
DROP POLICY IF EXISTS "Users can update own conversations" ON public.conversations;
CREATE POLICY "Users can update own conversations"
    ON public.conversations
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Política: Usuario puede eliminar sus conversaciones
DROP POLICY IF EXISTS "Users can delete own conversations" ON public.conversations;
CREATE POLICY "Users can delete own conversations"
    ON public.conversations
    FOR DELETE
    USING (auth.uid() = user_id);

-- ============================================
-- 7. POLÍTICAS PARA: messages
-- Usuarios pueden CRUD mensajes de SUS conversaciones
-- ============================================

-- Política: Usuario puede ver mensajes de sus conversaciones
DROP POLICY IF EXISTS "Users can view messages of own conversations" ON public.messages;
CREATE POLICY "Users can view messages of own conversations"
    ON public.messages
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.conversations
            WHERE conversations.id = messages.conversation_id
            AND conversations.user_id = auth.uid()
        )
    );

-- Política: Usuario puede crear mensajes en sus conversaciones
DROP POLICY IF EXISTS "Users can create messages in own conversations" ON public.messages;
CREATE POLICY "Users can create messages in own conversations"
    ON public.messages
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.conversations
            WHERE conversations.id = messages.conversation_id
            AND conversations.user_id = auth.uid()
        )
    );

-- Política: Usuario puede eliminar mensajes de sus conversaciones
DROP POLICY IF EXISTS "Users can delete messages of own conversations" ON public.messages;
CREATE POLICY "Users can delete messages of own conversations"
    ON public.messages
    FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM public.conversations
            WHERE conversations.id = messages.conversation_id
            AND conversations.user_id = auth.uid()
        )
    );

-- ============================================
-- 8. POLÍTICAS PARA: usage_logs
-- Usuarios solo pueden ver SUS registros de uso
-- Solo el sistema puede insertar (via service_role)
-- ============================================

-- Política: Usuario puede ver sus registros de uso
DROP POLICY IF EXISTS "Users can view own usage logs" ON public.usage_logs;
CREATE POLICY "Users can view own usage logs"
    ON public.usage_logs
    FOR SELECT
    USING (auth.uid() = user_id);

-- Política: Permitir inserción desde el servidor (service_role)
-- El INSERT se hace desde el backend con service_role key
DROP POLICY IF EXISTS "Service role can insert usage logs" ON public.usage_logs;
CREATE POLICY "Service role can insert usage logs"
    ON public.usage_logs
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- ============================================
-- ¡POLÍTICAS RLS CREADAS EXITOSAMENTE!
-- ============================================
