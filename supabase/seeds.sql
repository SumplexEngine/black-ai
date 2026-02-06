-- ============================================
-- BLACK AI - DATOS INICIALES (SEEDS)
-- ============================================
-- Ejecutar en el SQL Editor de Supabase
-- DESPUÉS de crear tablas, políticas y funciones
-- ============================================

-- ============================================
-- 1. INSERTAR PLANES
-- ============================================

-- Plan Free (activo y disponible)
INSERT INTO public.plans (name, description, price, tokens_limit, features, is_active)
VALUES (
    'Free',
    'Perfecto para empezar a explorar Black AI',
    0.00,
    50000,
    '[
        {"name": "50,000 tokens mensuales", "included": true},
        {"name": "Modelos Gemini gratuitos", "included": true},
        {"name": "Conversaciones ilimitadas", "included": true},
        {"name": "Historial de 30 días", "included": true},
        {"name": "Exportar en TXT y Markdown", "included": true},
        {"name": "Soporte por comunidad", "included": true},
        {"name": "Modelos premium", "included": false},
        {"name": "API Access", "included": false},
        {"name": "Soporte prioritario", "included": false}
    ]'::jsonb,
    true
)
ON CONFLICT (name) DO UPDATE SET
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    tokens_limit = EXCLUDED.tokens_limit,
    features = EXCLUDED.features,
    is_active = EXCLUDED.is_active;

-- Plan Pro (preparado para futuro)
INSERT INTO public.plans (name, description, price, tokens_limit, features, is_active)
VALUES (
    'Pro',
    'Para usuarios que necesitan más potencia',
    19.99,
    500000,
    '[
        {"name": "500,000 tokens mensuales", "included": true},
        {"name": "Todos los modelos Gemini", "included": true},
        {"name": "Conversaciones ilimitadas", "included": true},
        {"name": "Historial ilimitado", "included": true},
        {"name": "Exportar en todos los formatos", "included": true},
        {"name": "Soporte por email", "included": true},
        {"name": "Modelos premium", "included": true},
        {"name": "API Access", "included": true},
        {"name": "System prompts personalizados", "included": true}
    ]'::jsonb,
    false  -- No disponible aún
)
ON CONFLICT (name) DO UPDATE SET
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    tokens_limit = EXCLUDED.tokens_limit,
    features = EXCLUDED.features,
    is_active = EXCLUDED.is_active;

-- Plan Enterprise (preparado para futuro)
INSERT INTO public.plans (name, description, price, tokens_limit, features, is_active)
VALUES (
    'Enterprise',
    'Solución personalizada para empresas',
    99.99,
    -1,  -- -1 significa ilimitado
    '[
        {"name": "Tokens ilimitados", "included": true},
        {"name": "Todos los modelos + custom", "included": true},
        {"name": "Todo ilimitado", "included": true},
        {"name": "SSO / SAML", "included": true},
        {"name": "SLA garantizado", "included": true},
        {"name": "Soporte prioritario 24/7", "included": true},
        {"name": "API dedicada", "included": true},
        {"name": "Fine-tuning de modelos", "included": true},
        {"name": "Onboarding personalizado", "included": true}
    ]'::jsonb,
    false  -- No disponible aún
)
ON CONFLICT (name) DO UPDATE SET
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    tokens_limit = EXCLUDED.tokens_limit,
    features = EXCLUDED.features,
    is_active = EXCLUDED.is_active;

-- ============================================
-- 2. INSERTAR MODELOS DE IA (GEMINI)
-- ============================================

-- Gemini 2.0 Flash (Default - Más rápido y reciente)
INSERT INTO public.ai_models (id, name, description, max_tokens, context_window, is_available, is_default, speed, quality, best_for)
VALUES (
    'gemini-2.0-flash',
    'Gemini 2.0 Flash',
    'El modelo más reciente y rápido de Google. Ideal para respuestas instantáneas y tareas generales.',
    8192,
    1000000,
    true,
    true,  -- Modelo por defecto
    'fast',
    'high',
    ARRAY['Respuestas rápidas', 'Chat general', 'Análisis de texto', 'Resúmenes']
)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    max_tokens = EXCLUDED.max_tokens,
    context_window = EXCLUDED.context_window,
    is_available = EXCLUDED.is_available,
    is_default = EXCLUDED.is_default,
    speed = EXCLUDED.speed,
    quality = EXCLUDED.quality,
    best_for = EXCLUDED.best_for;

-- Gemini 1.5 Flash (Rápido y eficiente)
INSERT INTO public.ai_models (id, name, description, max_tokens, context_window, is_available, is_default, speed, quality, best_for)
VALUES (
    'gemini-1.5-flash',
    'Gemini 1.5 Flash',
    'Modelo rápido y eficiente. Excelente balance entre velocidad y calidad para tareas cotidianas.',
    8192,
    1000000,
    true,
    false,
    'fast',
    'high',
    ARRAY['Tareas rápidas', 'Traducciones', 'Preguntas simples', 'Generación de contenido']
)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    max_tokens = EXCLUDED.max_tokens,
    context_window = EXCLUDED.context_window,
    is_available = EXCLUDED.is_available,
    is_default = EXCLUDED.is_default,
    speed = EXCLUDED.speed,
    quality = EXCLUDED.quality,
    best_for = EXCLUDED.best_for;

-- Gemini 1.5 Pro (Avanzado para tareas complejas)
INSERT INTO public.ai_models (id, name, description, max_tokens, context_window, is_available, is_default, speed, quality, best_for)
VALUES (
    'gemini-1.5-pro',
    'Gemini 1.5 Pro',
    'Modelo avanzado con contexto masivo de 2M tokens. Ideal para análisis profundos y documentos largos.',
    8192,
    2000000,
    true,
    false,
    'medium',
    'premium',
    ARRAY['Análisis profundo', 'Documentos largos', 'Razonamiento complejo', 'Código avanzado', 'Investigación']
)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    max_tokens = EXCLUDED.max_tokens,
    context_window = EXCLUDED.context_window,
    is_available = EXCLUDED.is_available,
    is_default = EXCLUDED.is_default,
    speed = EXCLUDED.speed,
    quality = EXCLUDED.quality,
    best_for = EXCLUDED.best_for;

-- ============================================
-- 3. VERIFICAR DATOS INSERTADOS
-- ============================================

-- Ver planes creados
SELECT id, name, price, tokens_limit, is_active FROM public.plans ORDER BY price;

-- Ver modelos creados
SELECT id, name, is_available, is_default, speed, quality FROM public.ai_models ORDER BY is_default DESC;

-- ============================================
-- ¡DATOS INICIALES INSERTADOS EXITOSAMENTE!
-- ============================================
