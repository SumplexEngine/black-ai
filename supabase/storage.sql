-- ============================================
-- BLACK AI - CONFIGURACIÓN DE STORAGE
-- ============================================
-- Ejecutar en el SQL Editor de Supabase
-- ============================================

-- ============================================
-- 1. CREAR BUCKET: avatars
-- ============================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'avatars',
    'avatars',
    true,  -- Público para que se puedan ver las imágenes
    2097152,  -- 2MB en bytes
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 2097152,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

-- ============================================
-- 2. POLÍTICAS DE STORAGE PARA: avatars
-- ============================================

-- Política: Cualquiera puede ver avatares (son públicos)
DROP POLICY IF EXISTS "Anyone can view avatars" ON storage.objects;
CREATE POLICY "Anyone can view avatars"
    ON storage.objects
    FOR SELECT
    USING (bucket_id = 'avatars');

-- Política: Usuarios autenticados pueden subir su propio avatar
DROP POLICY IF EXISTS "Users can upload own avatar" ON storage.objects;
CREATE POLICY "Users can upload own avatar"
    ON storage.objects
    FOR INSERT
    WITH CHECK (
        bucket_id = 'avatars'
        AND auth.role() = 'authenticated'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

-- Política: Usuarios pueden actualizar su propio avatar
DROP POLICY IF EXISTS "Users can update own avatar" ON storage.objects;
CREATE POLICY "Users can update own avatar"
    ON storage.objects
    FOR UPDATE
    USING (
        bucket_id = 'avatars'
        AND auth.role() = 'authenticated'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

-- Política: Usuarios pueden eliminar su propio avatar
DROP POLICY IF EXISTS "Users can delete own avatar" ON storage.objects;
CREATE POLICY "Users can delete own avatar"
    ON storage.objects
    FOR DELETE
    USING (
        bucket_id = 'avatars'
        AND auth.role() = 'authenticated'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

-- ============================================
-- 3. CREAR BUCKET: attachments (para futuro uso)
-- ============================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'attachments',
    'attachments',
    false,  -- Privado
    10485760,  -- 10MB en bytes
    ARRAY[
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/gif',
        'application/pdf',
        'text/plain',
        'text/markdown',
        'application/json'
    ]
)
ON CONFLICT (id) DO UPDATE SET
    public = false,
    file_size_limit = 10485760,
    allowed_mime_types = ARRAY[
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/gif',
        'application/pdf',
        'text/plain',
        'text/markdown',
        'application/json'
    ];

-- ============================================
-- 4. POLÍTICAS DE STORAGE PARA: attachments
-- ============================================

-- Política: Usuarios pueden ver sus propios attachments
DROP POLICY IF EXISTS "Users can view own attachments" ON storage.objects;
CREATE POLICY "Users can view own attachments"
    ON storage.objects
    FOR SELECT
    USING (
        bucket_id = 'attachments'
        AND auth.role() = 'authenticated'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

-- Política: Usuarios pueden subir attachments
DROP POLICY IF EXISTS "Users can upload attachments" ON storage.objects;
CREATE POLICY "Users can upload attachments"
    ON storage.objects
    FOR INSERT
    WITH CHECK (
        bucket_id = 'attachments'
        AND auth.role() = 'authenticated'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

-- Política: Usuarios pueden eliminar sus attachments
DROP POLICY IF EXISTS "Users can delete own attachments" ON storage.objects;
CREATE POLICY "Users can delete own attachments"
    ON storage.objects
    FOR DELETE
    USING (
        bucket_id = 'attachments'
        AND auth.role() = 'authenticated'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

-- ============================================
-- ¡STORAGE CONFIGURADO EXITOSAMENTE!
-- ============================================
