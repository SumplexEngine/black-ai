# 🚀 PLAN DE TRABAJO - BLACK AI

## 📋 Información del Proyecto

| Campo                   | Detalle              |
| ----------------------- | -------------------- |
| **Nombre del Proyecto** | Black AI             |
| **Tipo**                | Agente de IA (Chat)  |
| **Base de Datos**       | Supabase (SQL)       |
| **Plan Inicial**        | Free                 |
| **Estilo**              | Ultra Moderno 2026   |
| **Nivel de Código**     | Avanzado (100% Real) |

---

# 📊 RESUMEN VISUAL DE FASES

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                           BLACK AI - ROADMAP 2026                            ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐   ║
║  │   FASE 1    │───▶│   FASE 2    │───▶│   FASE 3    │───▶│   FASE 4    │   ║
║  │  Entorno &  │    │  Supabase   │    │   Auth &    │    │   UI/UX     │   ║
║  │   Setup     │    │    SQL      │    │  Seguridad  │    │   2026      │   ║
║  └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘   ║
║        │                  │                  │                  │           ║
║        ▼                  ▼                  ▼                  ▼           ║
║   [2-3 días]         [2-3 días]         [3-4 días]         [4-5 días]      ║
║                                                                              ║
║  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐   ║
║  │   FASE 5    │───▶│   FASE 6    │───▶│   FASE 7    │───▶│   FASE 8    │   ║
║  │  Dashboard  │    │   Motor     │    │  Sistema    │    │  Features   │   ║
║  │  Usuario    │    │    IA       │    │   Planes    │    │  Avanzados  │   ║
║  └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘   ║
║        │                  │                  │                  │           ║
║        ▼                  ▼                  ▼                  ▼           ║
║   [4-5 días]         [5-7 días]         [3-4 días]         [5-6 días]      ║
║                                                                              ║
║  ┌─────────────┐    ┌─────────────┐                                         ║
║  │   FASE 9    │───▶│   FASE 10   │───▶  🎉 LANZAMIENTO                    ║
║  │ Optimización│    │   Deploy    │                                         ║
║  │ & Seguridad │    │  Producción │                                         ║
║  └─────────────┘    └─────────────┘                                         ║
║        │                  │                                                  ║
║        ▼                  ▼                                                  ║
║   [3-4 días]         [2-3 días]                                             ║
║                                                                              ║
║  ══════════════════════════════════════════════════════════════════════     ║
║  TIEMPO TOTAL ESTIMADO: 35-45 DÍAS                                          ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

---

# 🔷 FASE 1: PREPARACIÓN DEL ENTORNO DE DESARROLLO

## 📌 Objetivo de la Fase

> Configurar todas las herramientas, dependencias y estructura base del proyecto para un desarrollo profesional.

---

### 📁 SUBFASE 1.1: Instalación de Herramientas Base

```
┌────────────────────────────────────────────────────────────────┐
│                    HERRAMIENTAS A INSTALAR                     │
├────────────────────────────────────────────────────────────────┤
│  ▸ Node.js (versión LTS más reciente)                         │
│  ▸ Visual Studio Code (Editor de código)                       │
│  ▸ Git (Control de versiones)                                  │
│  ▸ Extensiones de VS Code necesarias                           │
│  ▸ Terminal moderna (Windows Terminal / iTerm2)                │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Node.js instalado y verificado
- ✅ VS Code configurado con extensiones
- ✅ Git instalado y configurado
- ✅ Terminal lista para uso

---

### 📁 SUBFASE 1.2: Creación del Proyecto Next.js 15

```
┌────────────────────────────────────────────────────────────────┐
│                    STACK TECNOLÓGICO                           │
├────────────────────────────────────────────────────────────────┤
│  ▸ Next.js 15 (App Router)                                     │
│  ▸ TypeScript (Tipado estático)                                │
│  ▸ Tailwind CSS 4 (Estilos)                                    │
│  ▸ Framer Motion (Animaciones)                                 │
│  ▸ Zustand (Estado global)                                     │
│  ▸ React Query (Manejo de datos)                               │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Proyecto Next.js 15 creado
- ✅ TypeScript configurado
- ✅ Tailwind CSS instalado
- ✅ Dependencias adicionales instaladas

---

### 📁 SUBFASE 1.3: Estructura de Carpetas Profesional

```
BLACK-AI/
│
├── 📂 src/
│   ├── 📂 app/                    # App Router de Next.js 15
│   │   ├── 📂 (auth)/             # Grupo de rutas de autenticación
│   │   │   ├── 📂 login/
│   │   │   ├── 📂 register/
│   │   │   └── 📂 forgot-password/
│   │   │
│   │   ├── 📂 (dashboard)/        # Grupo de rutas del dashboard
│   │   │   ├── 📂 chat/
│   │   │   ├── 📂 history/
│   │   │   ├── 📂 settings/
│   │   │   └── 📂 profile/
│   │   │
│   │   ├── 📂 api/                # API Routes
│   │   │   ├── 📂 auth/
│   │   │   ├── 📂 chat/
│   │   │   ├── 📂 user/
│   │   │   └── 📂 ai/
│   │   │
│   │   ├── 📄 layout.tsx          # Layout principal
│   │   ├── 📄 page.tsx            # Landing page
│   │   └── 📄 globals.css         # Estilos globales
│   │
│   ├── 📂 components/             # Componentes reutilizables
│   │   ├── 📂 ui/                 # Componentes base (botones, inputs, etc.)
│   │   ├── 📂 layout/             # Header, Footer, Sidebar
│   │   ├── 📂 chat/               # Componentes del chat
│   │   ├── 📂 dashboard/          # Componentes del dashboard
│   │   ├── 📂 auth/               # Componentes de autenticación
│   │   └── 📂 common/             # Componentes compartidos
│   │
│   ├── 📂 lib/                    # Utilidades y configuraciones
│   │   ├── 📂 supabase/           # Cliente y helpers de Supabase
│   │   ├── 📂 ai/                 # Integraciones con APIs de IA
│   │   ├── 📂 utils/              # Funciones utilitarias
│   │   └── 📂 validations/        # Esquemas de validación (Zod)
│   │
│   ├── 📂 hooks/                  # Custom Hooks
│   │   ├── 📄 useAuth.ts
│   │   ├── 📄 useChat.ts
│   │   ├── 📄 useUser.ts
│   │   └── 📄 useTheme.ts
│   │
│   ├── 📂 store/                  # Estado global (Zustand)
│   │   ├── 📄 authStore.ts
│   │   ├── 📄 chatStore.ts
│   │   └── 📄 uiStore.ts
│   │
│   ├── 📂 types/                  # Tipos de TypeScript
│   │   ├── 📄 auth.types.ts
│   │   ├── 📄 chat.types.ts
│   │   ├── 📄 user.types.ts
│   │   └── 📄 database.types.ts
│   │
│   ├── 📂 styles/                 # Estilos adicionales
│   │   ├── 📄 animations.css
│   │   └── 📄 themes.css
│   │
│   └── 📂 constants/              # Constantes de la app
│       ├── 📄 routes.ts
│       ├── 📄 plans.ts
│       └── 📄 ai-models.ts
│
├── 📂 public/                     # Archivos estáticos
│   ├── 📂 images/
│   ├── 📂 icons/
│   └── 📂 fonts/
│
├── 📂 supabase/                   # Archivos SQL de Supabase
│   ├── 📄 schema.sql              # Estructura de tablas
│   ├── 📄 policies.sql            # Políticas RLS
│   ├── 📄 functions.sql           # Funciones SQL
│   ├── 📄 triggers.sql            # Triggers
│   └── 📄 storage.sql             # Buckets de storage
│
├── 📄 .env.local                  # Variables de entorno
├── 📄 .gitignore
├── 📄 next.config.ts
├── 📄 tailwind.config.ts
├── 📄 tsconfig.json
└── 📄 package.json
```

**Entregables:**

- ✅ Estructura de carpetas creada
- ✅ Archivos base configurados
- ✅ Organización profesional lista

---

### 📁 SUBFASE 1.4: Configuración de Variables de Entorno

```
┌────────────────────────────────────────────────────────────────┐
│                  VARIABLES DE ENTORNO                          │
├────────────────────────────────────────────────────────────────┤
│  ▸ NEXT_PUBLIC_SUPABASE_URL                                    │
│  ▸ NEXT_PUBLIC_SUPABASE_ANON_KEY                              │
│  ▸ SUPABASE_SERVICE_ROLE_KEY                                   │
│  ▸ API Keys de IA (gratuitas)                                  │
│  ▸ Configuraciones de la aplicación                            │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Archivo .env.local configurado
- ✅ Variables de Supabase añadidas
- ✅ Seguridad de claves verificada

---

### 📁 SUBFASE 1.5: Configuración de Git y Control de Versiones

```
┌────────────────────────────────────────────────────────────────┐
│                    CONTROL DE VERSIONES                        │
├────────────────────────────────────────────────────────────────┤
│  ▸ Inicializar repositorio Git                                 │
│  ▸ Configurar .gitignore profesional                           │
│  ▸ Crear repositorio en GitHub/GitLab                          │
│  ▸ Configurar ramas (main, develop, feature)                   │
│  ▸ Primer commit inicial                                        │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Repositorio Git inicializado
- ✅ Conectado a GitHub/GitLab
- ✅ Estrategia de ramas definida

---

# 🔷 FASE 2: CONFIGURACIÓN DE SUPABASE (SQL)

## 📌 Objetivo de la Fase

> Diseñar y crear toda la estructura de base de datos usando SQL puro en Supabase.

---

### 📁 SUBFASE 2.1: Diseño del Esquema de Base de Datos

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                        DIAGRAMA DE BASE DE DATOS                             │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────┐         ┌─────────────────┐         ┌────────────────┐ │
│  │     USERS       │         │   USER_PROFILES │         │     PLANS      │ │
│  │  (auth.users)   │────────▶│                 │────────▶│                │ │
│  │                 │   1:1   │  - id           │   N:1   │  - id          │ │
│  │  - id (UUID)    │         │  - user_id      │         │  - name        │ │
│  │  - email        │         │  - username     │         │  - price       │ │
│  │  - created_at   │         │  - avatar_url   │         │  - tokens_limit│ │
│  └─────────────────┘         │  - plan_id      │         │  - features    │ │
│          │                   │  - tokens_used  │         └────────────────┘ │
│          │                   │  - created_at   │                            │
│          │                   └─────────────────┘                            │
│          │                            │                                      │
│          │                            │ 1:N                                  │
│          │                            ▼                                      │
│          │                   ┌─────────────────┐                            │
│          │                   │  CONVERSATIONS  │                            │
│          │                   │                 │                            │
│          │                   │  - id           │                            │
│          │                   │  - user_id      │                            │
│          └──────────────────▶│  - title        │                            │
│                        1:N   │  - model        │                            │
│                              │  - created_at   │                            │
│                              │  - updated_at   │                            │
│                              └─────────────────┘                            │
│                                       │                                      │
│                                       │ 1:N                                  │
│                                       ▼                                      │
│                              ┌─────────────────┐         ┌────────────────┐ │
│                              │    MESSAGES     │         │   AI_MODELS    │ │
│                              │                 │         │                │ │
│                              │  - id           │         │  - id          │ │
│                              │  - conversation │         │  - name        │ │
│                              │  - role         │         │  - provider    │ │
│                              │  - content      │         │  - is_free     │ │
│                              │  - tokens       │         │  - max_tokens  │ │
│                              │  - created_at   │         │  - status      │ │
│                              └─────────────────┘         └────────────────┘ │
│                                                                              │
│  ┌─────────────────┐         ┌─────────────────┐                            │
│  │   USAGE_LOGS    │         │  USER_SETTINGS  │                            │
│  │                 │         │                 │                            │
│  │  - id           │         │  - id           │                            │
│  │  - user_id      │         │  - user_id      │                            │
│  │  - action       │         │  - theme        │                            │
│  │  - tokens_used  │         │  - language     │                            │
│  │  - model        │         │  - preferences  │                            │
│  │  - created_at   │         │  - created_at   │                            │
│  └─────────────────┘         └─────────────────┘                            │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Diagrama ER completo
- ✅ Relaciones definidas
- ✅ Campos y tipos especificados

---

### 📁 SUBFASE 2.2: Creación de Tablas con SQL

```
┌────────────────────────────────────────────────────────────────┐
│                    TABLAS A CREAR (SQL)                        │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  📋 TABLA: plans                                               │
│     ▸ Almacena los planes disponibles (Free, Pro, etc.)       │
│     ▸ Define límites de tokens y características              │
│                                                                │
│  📋 TABLA: user_profiles                                       │
│     ▸ Información extendida del usuario                        │
│     ▸ Vinculada a auth.users de Supabase                       │
│     ▸ Contador de tokens usados                                │
│                                                                │
│  📋 TABLA: conversations                                       │
│     ▸ Almacena las conversaciones/chats                        │
│     ▸ Título, modelo usado, timestamps                         │
│                                                                │
│  📋 TABLA: messages                                            │
│     ▸ Mensajes individuales de cada conversación              │
│     ▸ Rol (user/assistant), contenido, tokens                 │
│                                                                │
│  📋 TABLA: ai_models                                           │
│     ▸ Modelos de IA disponibles                                │
│     ▸ Proveedor, estado, si es gratuito                       │
│                                                                │
│  📋 TABLA: user_settings                                       │
│     ▸ Configuraciones personalizadas                           │
│     ▸ Tema, idioma, preferencias                               │
│                                                                │
│  📋 TABLA: usage_logs                                          │
│     ▸ Registro de uso para analytics                           │
│     ▸ Tokens consumidos por acción                             │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Archivo schema.sql con todas las tablas
- ✅ Índices para optimización
- ✅ Constraints y foreign keys

---

### 📁 SUBFASE 2.3: Políticas de Seguridad RLS (SQL)

```
┌────────────────────────────────────────────────────────────────┐
│               ROW LEVEL SECURITY (RLS)                         │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  🔒 POLÍTICA: Users can view own profile                       │
│     ▸ SELECT: auth.uid() = user_id                            │
│                                                                │
│  🔒 POLÍTICA: Users can update own profile                     │
│     ▸ UPDATE: auth.uid() = user_id                            │
│                                                                │
│  🔒 POLÍTICA: Users can view own conversations                 │
│     ▸ SELECT: auth.uid() = user_id                            │
│                                                                │
│  🔒 POLÍTICA: Users can create conversations                   │
│     ▸ INSERT: auth.uid() = user_id                            │
│                                                                │
│  🔒 POLÍTICA: Users can delete own conversations               │
│     ▸ DELETE: auth.uid() = user_id                            │
│                                                                │
│  🔒 POLÍTICA: Users can view own messages                      │
│     ▸ SELECT: via conversation ownership                       │
│                                                                │
│  🔒 POLÍTICA: Public can view plans                            │
│     ▸ SELECT: true (público)                                   │
│                                                                │
│  🔒 POLÍTICA: Public can view active AI models                 │
│     ▸ SELECT: status = 'active'                               │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Archivo policies.sql con todas las políticas
- ✅ RLS habilitado en todas las tablas
- ✅ Seguridad a nivel de fila implementada

---

### 📁 SUBFASE 2.4: Funciones y Triggers SQL

```
┌────────────────────────────────────────────────────────────────┐
│                  FUNCIONES SQL A CREAR                         │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ⚡ FUNCIÓN: handle_new_user()                                 │
│     ▸ Trigger al crear usuario en auth.users                  │
│     ▸ Crea automáticamente user_profile                        │
│     ▸ Asigna plan Free por defecto                            │
│     ▸ Crea user_settings por defecto                          │
│                                                                │
│  ⚡ FUNCIÓN: update_tokens_used()                              │
│     ▸ Actualiza contador de tokens del usuario                │
│     ▸ Registra en usage_logs                                   │
│                                                                │
│  ⚡ FUNCIÓN: check_token_limit()                               │
│     ▸ Verifica si usuario tiene tokens disponibles            │
│     ▸ Retorna true/false                                       │
│                                                                │
│  ⚡ FUNCIÓN: reset_monthly_tokens()                            │
│     ▸ Reinicia tokens mensualmente (para Free)                │
│     ▸ Ejecutada por cron job                                   │
│                                                                │
│  ⚡ FUNCIÓN: get_user_stats()                                  │
│     ▸ Retorna estadísticas del usuario                         │
│     ▸ Total conversaciones, mensajes, tokens                  │
│                                                                │
│  ⚡ FUNCIÓN: update_conversation_timestamp()                   │
│     ▸ Trigger al añadir mensaje                                │
│     ▸ Actualiza updated_at de la conversación                 │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Archivo functions.sql con todas las funciones
- ✅ Archivo triggers.sql con todos los triggers
- ✅ Automatizaciones configuradas

---

### 📁 SUBFASE 2.5: Configuración de Storage (Buckets) con SQL

```
┌────────────────────────────────────────────────────────────────┐
│                    BUCKETS DE STORAGE                          │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  📦 BUCKET: avatars                                            │
│     ▸ Almacena fotos de perfil de usuarios                    │
│     ▸ Tamaño máximo: 2MB                                       │
│     ▸ Tipos permitidos: image/*                                │
│     ▸ Acceso: Privado (solo dueño)                            │
│                                                                │
│  📦 BUCKET: attachments                                        │
│     ▸ Archivos adjuntos en conversaciones                     │
│     ▸ Tamaño máximo: 10MB                                      │
│     ▸ Tipos permitidos: images, documents                      │
│     ▸ Acceso: Privado (solo dueño)                            │
│                                                                │
│  📦 BUCKET: exports                                            │
│     ▸ Exportaciones de conversaciones                          │
│     ▸ Archivos temporales (auto-delete 24h)                   │
│     ▸ Acceso: Privado (solo dueño)                            │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Archivo storage.sql con creación de buckets
- ✅ Políticas de storage configuradas
- ✅ Límites y tipos definidos

---

### 📁 SUBFASE 2.6: Datos Iniciales (Seeds)

```
┌────────────────────────────────────────────────────────────────┐
│                      DATOS INICIALES                           │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  🌱 SEED: Planes                                               │
│     ▸ Plan Free (límites definidos)                           │
│     ▸ Plan Pro (preparado para futuro)                        │
│     ▸ Plan Enterprise (preparado para futuro)                 │
│                                                                │
│  🌱 SEED: Modelos de IA                                        │
│     ▸ Modelos gratuitos disponibles                           │
│     ▸ Configuración de cada modelo                            │
│     ▸ Estado activo/inactivo                                   │
│                                                                │
│  🌱 SEED: Configuraciones por defecto                          │
│     ▸ Temas disponibles                                        │
│     ▸ Idiomas soportados                                       │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Archivo seeds.sql con datos iniciales
- ✅ Planes configurados
- ✅ Modelos de IA registrados

---

# 🔷 FASE 3: SISTEMA DE AUTENTICACIÓN

## 📌 Objetivo de la Fase

> Implementar un sistema de autenticación completo, seguro y con excelente UX.

---

### 📁 SUBFASE 3.1: Configuración del Cliente Supabase

```
┌────────────────────────────────────────────────────────────────┐
│                   CLIENTE SUPABASE                             │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  🔧 Cliente del lado del cliente (browser)                     │
│     ▸ Configuración con cookies                                │
│     ▸ Manejo de sesiones                                       │
│     ▸ Auto-refresh de tokens                                   │
│                                                                │
│  🔧 Cliente del lado del servidor                              │
│     ▸ Para Server Components                                   │
│     ▸ Para API Routes                                          │
│     ▸ Para Server Actions                                      │
│                                                                │
│  🔧 Middleware de autenticación                                │
│     ▸ Protección de rutas                                      │
│     ▸ Redirecciones automáticas                                │
│     ▸ Verificación de sesión                                   │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Cliente browser configurado
- ✅ Cliente server configurado
- ✅ Middleware de auth implementado

---

### 📁 SUBFASE 3.2: Página de Registro

```
┌────────────────────────────────────────────────────────────────┐
│                   FUNCIONALIDADES REGISTRO                     │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  📝 Formulario de registro                                     │
│     ▸ Email con validación                                     │
│     ▸ Contraseña con requisitos de seguridad                  │
│     ▸ Confirmación de contraseña                               │
│     ▸ Nombre de usuario (opcional)                             │
│     ▸ Aceptar términos y condiciones                          │
│                                                                │
│  🎨 Diseño moderno                                             │
│     ▸ Animaciones de entrada                                   │
│     ▸ Feedback visual en tiempo real                          │
│     ▸ Indicador de fortaleza de contraseña                    │
│     ▸ Estados de loading                                       │
│                                                                │
│  ⚡ Funcionalidades                                            │
│     ▸ Validación con Zod                                       │
│     ▸ Manejo de errores elegante                              │
│     ▸ Email de verificación                                    │
│     ▸ Redirección post-registro                               │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Página de registro completa
- ✅ Validaciones implementadas
- ✅ Integración con Supabase Auth

---

### 📁 SUBFASE 3.3: Página de Login

```
┌────────────────────────────────────────────────────────────────┐
│                    FUNCIONALIDADES LOGIN                       │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  📝 Formulario de login                                        │
│     ▸ Email                                                    │
│     ▸ Contraseña                                               │
│     ▸ Recordar sesión                                          │
│     ▸ Link a recuperar contraseña                             │
│     ▸ Link a registro                                          │
│                                                                │
│  🎨 Diseño moderno                                             │
│     ▸ Consistente con registro                                 │
│     ▸ Animaciones fluidas                                      │
│     ▸ Dark mode compatible                                     │
│                                                                │
│  ⚡ Funcionalidades                                            │
│     ▸ Validación en tiempo real                               │
│     ▸ Mensajes de error específicos                           │
│     ▸ Protección contra brute force                           │
│     ▸ Redirección a dashboard                                 │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Página de login completa
- ✅ Manejo de sesiones
- ✅ Remember me funcional

---

### 📁 SUBFASE 3.4: Recuperación de Contraseña

```
┌────────────────────────────────────────────────────────────────┐
│              RECUPERACIÓN DE CONTRASEÑA                        │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  📧 Solicitar recuperación                                     │
│     ▸ Formulario de email                                      │
│     ▸ Envío de email con link                                  │
│     ▸ Mensaje de confirmación                                  │
│                                                                │
│  🔐 Restablecer contraseña                                     │
│     ▸ Página de nueva contraseña                              │
│     ▸ Validación de token                                      │
│     ▸ Requisitos de seguridad                                  │
│     ▸ Confirmación exitosa                                     │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Flujo de recuperación completo
- ✅ Emails configurados
- ✅ Página de reset password

---

### 📁 SUBFASE 3.5: Verificación de Email

```
┌────────────────────────────────────────────────────────────────┐
│                 VERIFICACIÓN DE EMAIL                          │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  📧 Email de verificación                                      │
│     ▸ Enviado automáticamente al registrar                    │
│     ▸ Template personalizado                                   │
│     ▸ Link de verificación                                     │
│                                                                │
│  ✅ Página de confirmación                                     │
│     ▸ Mensaje de éxito                                         │
│     ▸ Redirección automática                                  │
│     ▸ Opción de reenviar email                                │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Flujo de verificación completo
- ✅ Templates de email configurados
- ✅ Página de confirmación

---

### 📁 SUBFASE 3.6: Protección de Rutas y Middleware

```
┌────────────────────────────────────────────────────────────────┐
│                   PROTECCIÓN DE RUTAS                          │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  🔒 Rutas protegidas                                           │
│     ▸ /dashboard/* → Requiere autenticación                  │
│     ▸ /chat/* → Requiere autenticación                        │
│     ▸ /settings/* → Requiere autenticación                    │
│     ▸ /profile/* → Requiere autenticación                     │
│                                                                │
│  🔓 Rutas públicas                                             │
│     ▸ / → Landing page                                         │
│     ▸ /login → Login                                           │
│     ▸ /register → Registro                                     │
│     ▸ /forgot-password → Recuperación                         │
│                                                                │
│  🔄 Redirecciones                                              │
│     ▸ Usuario no auth → /login                                │
│     ▸ Usuario auth en /login → /dashboard                     │
│     ▸ Token expirado → /login con mensaje                     │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Middleware de Next.js configurado
- ✅ Protección de rutas implementada
- ✅ Redirecciones automáticas

---

# 🔷 FASE 4: DISEÑO UI/UX MODERNO 2026

## 📌 Objetivo de la Fase

> Crear un sistema de diseño ultra moderno con animaciones avanzadas y experiencia de usuario premium.

---

### 📁 SUBFASE 4.1: Sistema de Diseño Base

```
┌────────────────────────────────────────────────────────────────┐
│                   SISTEMA DE DISEÑO                            │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  🎨 Paleta de Colores                                          │
│     ▸ Primary: Negro/Gris oscuro                              │
│     ▸ Accent: Azul eléctrico / Púrpura neón                   │
│     ▸ Success, Warning, Error states                           │
│     ▸ Gradientes modernos                                      │
│                                                                │
│  📝 Tipografía                                                 │
│     ▸ Font principal: Inter / Geist                           │
│     ▸ Font monospace: JetBrains Mono                          │
│     ▸ Escala tipográfica definida                             │
│                                                                │
│  📐 Espaciado                                                  │
│     ▸ Sistema de 4px/8px                                       │
│     ▸ Breakpoints responsive                                   │
│     ▸ Container widths                                         │
│                                                                │
│  🌗 Temas                                                      │
│     ▸ Dark mode (principal)                                    │
│     ▸ Light mode                                               │
│     ▸ Transiciones suaves                                      │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Tailwind config con design tokens
- ✅ CSS variables definidas
- ✅ Tema dark/light implementado

---

### 📁 SUBFASE 4.2: Componentes UI Base

```
┌────────────────────────────────────────────────────────────────┐
│                   COMPONENTES BASE                             │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  🔘 Botones                                                    │
│     ▸ Primary, Secondary, Ghost, Outline                      │
│     ▸ Tamaños: sm, md, lg                                      │
│     ▸ Estados: hover, active, disabled, loading               │
│     ▸ Con iconos                                               │
│                                                                │
│  📝 Inputs                                                     │
│     ▸ Text, Email, Password                                    │
│     ▸ Textarea                                                 │
│     ▸ Select                                                   │
│     ▸ Checkbox, Radio, Switch                                  │
│     ▸ Estados de validación                                    │
│                                                                │
│  📦 Cards                                                      │
│     ▸ Card base                                                │
│     ▸ Card interactiva                                         │
│     ▸ Card con glassmorphism                                   │
│                                                                │
│  🔔 Feedback                                                   │
│     ▸ Toast notifications                                      │
│     ▸ Alerts                                                   │
│     ▸ Modals                                                   │
│     ▸ Loading spinners                                         │
│     ▸ Skeletons                                                │
│                                                                │
│  📋 Navegación                                                 │
│     ▸ Navbar                                                   │
│     ▸ Sidebar                                                  │
│     ▸ Tabs                                                     │
│     ▸ Breadcrumbs                                              │
│     ▸ Dropdown menus                                           │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Biblioteca de componentes UI
- ✅ Documentación de uso
- ✅ Variantes y estados

---

### 📁 SUBFASE 4.3: Animaciones Avanzadas

```
┌────────────────────────────────────────────────────────────────┐
│                   SISTEMA DE ANIMACIONES                       │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ✨ Animaciones de entrada                                     │
│     ▸ Fade in/out                                              │
│     ▸ Slide in (todas direcciones)                            │
│     ▸ Scale up/down                                            │
│     ▸ Stagger children                                         │
│                                                                │
│  🔄 Transiciones de página                                     │
│     ▸ Page transitions suaves                                  │
│     ▸ Shared layout animations                                 │
│     ▸ Loading states animados                                  │
│                                                                │
│  💫 Microinteracciones                                         │
│     ▸ Hover effects                                            │
│     ▸ Click feedback                                           │
│     ▸ Focus states                                             │
│     ▸ Success/Error animations                                 │
│                                                                │
│  🎯 Animaciones especiales                                     │
│     ▸ Typing indicator (chat)                                  │
│     ▸ Message bubble animations                                │
│     ▸ Pulse effects                                            │
│     ▸ Gradient animations                                      │
│     ▸ Glow effects                                             │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Framer Motion configurado
- ✅ Biblioteca de animaciones
- ✅ Hooks de animación custom

---

### 📁 SUBFASE 4.4: Landing Page Moderna

```
┌────────────────────────────────────────────────────────────────┐
│                     LANDING PAGE                               │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  🏠 Secciones                                                  │
│     ▸ Hero section con animación                              │
│     ▸ Features showcase                                        │
│     ▸ Demo interactiva                                         │
│     ▸ Planes y precios                                         │
│     ▸ Testimonios                                              │
│     ▸ FAQ                                                      │
│     ▸ CTA final                                                │
│     ▸ Footer                                                   │
│                                                                │
│  🎨 Efectos visuales                                           │
│     ▸ Parallax scrolling                                       │
│     ▸ Gradient backgrounds animados                           │
│     ▸ Particles/Orbs flotantes                                │
│     ▸ Glassmorphism cards                                      │
│     ▸ Scroll reveal animations                                 │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Landing page completa
- ✅ Responsive design
- ✅ Animaciones implementadas

---

### 📁 SUBFASE 4.5: Responsive Design Avanzado

```
┌────────────────────────────────────────────────────────────────┐
│                   RESPONSIVE DESIGN                            │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  📱 Mobile (< 640px)                                           │
│     ▸ Diseño stack vertical                                   │
│     ▸ Menú hamburger                                           │
│     ▸ Touch-friendly targets                                   │
│     ▸ Bottom navigation (chat)                                │
│                                                                │
│  📲 Tablet (640px - 1024px)                                    │
│     ▸ Layout híbrido                                           │
│     ▸ Sidebar colapsable                                       │
│     ▸ Grid adaptativo                                          │
│                                                                │
│  💻 Desktop (> 1024px)                                         │
│     ▸ Layout completo                                          │
│     ▸ Sidebar permanente                                       │
│     ▸ Aprovechamiento del espacio                             │
│                                                                │
│  🖥️ Large screens (> 1440px)                                   │
│     ▸ Max-width containers                                     │
│     ▸ Diseño centrado                                          │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Todos los breakpoints implementados
- ✅ Testing en múltiples dispositivos
- ✅ Touch interactions optimizadas

---

# 🔷 FASE 5: DASHBOARD DE USUARIO

## 📌 Objetivo de la Fase

> Crear un dashboard intuitivo y funcional donde el usuario gestione su experiencia con Black AI.

---

### 📁 SUBFASE 5.1: Layout del Dashboard

```
┌────────────────────────────────────────────────────────────────────────────┐
│                          LAYOUT DEL DASHBOARD                              │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐ │
│  │                           HEADER                                      │ │
│  │  [Logo]                    [Búsqueda]              [User] [Theme]    │ │
│  └──────────────────────────────────────────────────────────────────────┘ │
│                                                                            │
│  ┌────────────┐ ┌───────────────────────────────────────────────────────┐ │
│  │            │ │                                                        │ │
│  │  SIDEBAR   │ │                    MAIN CONTENT                        │ │
│  │            │ │                                                        │ │
│  │ • Chat     │ │                                                        │ │
│  │ • History  │ │                                                        │ │
│  │ • Settings │ │                                                        │ │
│  │ • Profile  │ │                                                        │ │
│  │            │ │                                                        │ │
│  │ ────────── │ │                                                        │ │
│  │            │ │                                                        │ │
│  │ [Nuevo     │ │                                                        │ │
│  │  Chat]     │ │                                                        │ │
│  │            │ │                                                        │ │
│  │ ────────── │ │                                                        │ │
│  │            │ │                                                        │ │
│  │ Tokens:    │ │                                                        │ │
│  │ [███░░] 60%│ │                                                        │ │
│  │            │ │                                                        │ │
│  └────────────┘ └───────────────────────────────────────────────────────┘ │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Layout base del dashboard
- ✅ Header con navegación
- ✅ Sidebar responsive
- ✅ Sistema de rutas anidadas

---

### 📁 SUBFASE 5.2: Panel Principal (Home)

```
┌────────────────────────────────────────────────────────────────┐
│                    PANEL PRINCIPAL                             │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  📊 Widgets de estadísticas                                    │
│     ▸ Tokens usados este mes                                   │
│     ▸ Total de conversaciones                                  │
│     ▸ Mensajes enviados                                        │
│     ▸ Modelo más usado                                         │
│                                                                │
│  📝 Acceso rápido                                              │
│     ▸ Nuevo chat (botón prominente)                           │
│     ▸ Conversaciones recientes                                 │
│     ▸ Modelos favoritos                                        │
│                                                                │
│  💡 Tips y novedades                                           │
│     ▸ Características nuevas                                   │
│     ▸ Tips de uso                                              │
│     ▸ Anuncios del sistema                                     │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Dashboard home implementado
- ✅ Widgets de estadísticas
- ✅ Quick actions

---

### 📁 SUBFASE 5.3: Historial de Conversaciones

```
┌────────────────────────────────────────────────────────────────┐
│               HISTORIAL DE CONVERSACIONES                      │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  🔍 Funcionalidades de búsqueda                               │
│     ▸ Búsqueda por título                                     │
│     ▸ Filtro por fecha                                         │
│     ▸ Filtro por modelo de IA                                 │
│     ▸ Ordenar por: reciente, antiguo, más usado               │
│                                                                │
│  📋 Lista de conversaciones                                    │
│     ▸ Título de la conversación                                │
│     ▸ Fecha de última actividad                                │
│     ▸ Modelo usado                                             │
│     ▸ Número de mensajes                                       │
│     ▸ Preview del último mensaje                              │
│                                                                │
│  ⚡ Acciones                                                   │
│     ▸ Continuar conversación                                   │
│     ▸ Renombrar                                                │
│     ▸ Exportar (PDF, TXT, MD)                                 │
│     ▸ Eliminar                                                 │
│     ▸ Archivar                                                 │
│                                                                │
│  📦 Paginación                                                 │
│     ▸ Infinite scroll o paginación tradicional                │
│     ▸ Carga optimizada                                         │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Página de historial
- ✅ Búsqueda y filtros
- ✅ Acciones CRUD
- ✅ Paginación

---

### 📁 SUBFASE 5.4: Página de Perfil

```
┌────────────────────────────────────────────────────────────────┐
│                    PERFIL DE USUARIO                           │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  👤 Información del perfil                                     │
│     ▸ Avatar (upload/cambiar)                                  │
│     ▸ Nombre de usuario                                        │
│     ▸ Email (solo lectura)                                     │
│     ▸ Fecha de registro                                        │
│                                                                │
│  📊 Estadísticas de uso                                        │
│     ▸ Plan actual                                              │
│     ▸ Tokens usados / disponibles                             │
│     ▸ Gráfico de uso mensual                                   │
│     ▸ Historial de actividad                                   │
│                                                                │
│  🔐 Seguridad                                                  │
│     ▸ Cambiar contraseña                                       │
│     ▸ Sesiones activas                                         │
│     ▸ Cerrar todas las sesiones                               │
│                                                                │
│  ⚠️ Zona de peligro                                           │
│     ▸ Exportar mis datos                                       │
│     ▸ Eliminar cuenta                                          │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Página de perfil completa
- ✅ Upload de avatar
- ✅ Edición de datos
- ✅ Gestión de seguridad

---

### 📁 SUBFASE 5.5: Página de Configuración

```
┌────────────────────────────────────────────────────────────────┐
│                     CONFIGURACIÓN                              │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  🎨 Apariencia                                                 │
│     ▸ Tema (Dark / Light / System)                            │
│     ▸ Color de acento                                          │
│     ▸ Densidad de UI                                           │
│     ▸ Tamaño de fuente                                         │
│                                                                │
│  🤖 Preferencias de IA                                         │
│     ▸ Modelo por defecto                                       │
│     ▸ Temperatura default                                      │
│     ▸ Longitud de respuesta preferida                         │
│     ▸ Idioma de respuestas                                     │
│                                                                │
│  🔔 Notificaciones                                             │
│     ▸ Email notifications                                      │
│     ▸ Tips y sugerencias                                       │
│     ▸ Novedades del producto                                  │
│                                                                │
│  🌐 Idioma y región                                            │
│     ▸ Idioma de la interfaz                                    │
│     ▸ Formato de fecha                                         │
│     ▸ Zona horaria                                             │
│                                                                │
│  ♿ Accesibilidad                                               │
│     ▸ Reducir animaciones                                      │
│     ▸ Alto contraste                                           │
│     ▸ Tamaño de cursor                                         │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Página de settings completa
- ✅ Todas las preferencias funcionales
- ✅ Persistencia en base de datos

---

# 🔷 FASE 6: MOTOR DE CHAT CON IA

## 📌 Objetivo de la Fase

> Implementar el núcleo del producto: un chat con IA funcional, rápido y con excelente UX.

---

### 📁 SUBFASE 6.1: Interfaz de Chat

````
┌────────────────────────────────────────────────────────────────────────────┐
│                          INTERFAZ DE CHAT                                  │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ┌────────────────────────────────────────────────────────────────────┐   │
│  │  📋 [Título de la conversación]    [Modelo: GPT-4]    [⚙️] [...]  │   │
│  └────────────────────────────────────────────────────────────────────┘   │
│                                                                            │
│  ┌────────────────────────────────────────────────────────────────────┐   │
│  │                                                                    │   │
│  │  ┌─────────────────────────────────────────────────────────────┐  │   │
│  │  │ 👤 User                                              10:30  │  │   │
│  │  │ Hola, ¿cómo puedo crear una API REST en Node.js?           │  │   │
│  │  └─────────────────────────────────────────────────────────────┘  │   │
│  │                                                                    │   │
│  │  ┌─────────────────────────────────────────────────────────────┐  │   │
│  │  │ 🤖 Black AI                                          10:31  │  │   │
│  │  │ ¡Hola! Para crear una API REST en Node.js, puedes          │  │   │
│  │  │ seguir estos pasos:                                         │  │   │
│  │  │                                                              │  │   │
│  │  │ 1. Instala Express.js...                                    │  │   │
│  │  │ ```javascript                                                │  │   │
│  │  │ const express = require('express');                         │  │   │
│  │  │ ```                                                          │  │   │
│  │  │                                                    [📋] [👍]│  │   │
│  │  └─────────────────────────────────────────────────────────────┘  │   │
│  │                                                                    │   │
│  │                         ● ● ● (typing...)                         │   │
│  │                                                                    │   │
│  └────────────────────────────────────────────────────────────────────┘   │
│                                                                            │
│  ┌────────────────────────────────────────────────────────────────────┐   │
│  │  [📎]  | Escribe tu mensaje...                        |  [🎤] [➤] │   │
│  └────────────────────────────────────────────────────────────────────┘   │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
````

**Entregables:**

- ✅ Interfaz de chat completa
- ✅ Lista de mensajes scrolleable
- ✅ Input de mensaje con acciones
- ✅ Header con info de conversación

---

### 📁 SUBFASE 6.2: Componente de Mensajes

```
┌────────────────────────────────────────────────────────────────┐
│                  COMPONENTE DE MENSAJES                        │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  💬 Mensaje del usuario                                        │
│     ▸ Avatar del usuario                                       │
│     ▸ Nombre/Email                                             │
│     ▸ Timestamp                                                │
│     ▸ Contenido del mensaje                                    │
│     ▸ Acciones: editar, eliminar                              │
│                                                                │
│  🤖 Mensaje de IA                                              │
│     ▸ Avatar de Black AI                                       │
│     ▸ Indicador de modelo usado                               │
│     ▸ Timestamp                                                │
│     ▸ Contenido con markdown renderizado                      │
│     ▸ Syntax highlighting para código                         │
│     ▸ Acciones: copiar, regenerar, feedback                  │
│                                                                │
│  ⚡ Características especiales                                 │
│     ▸ Streaming de respuesta (efecto máquina de escribir)     │
│     ▸ Lazy loading de mensajes antiguos                       │
│     ▸ Animación de entrada                                     │
│     ▸ Indicador de "thinking"                                  │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Componente MessageBubble
- ✅ Markdown rendering
- ✅ Code syntax highlighting
- ✅ Acciones de mensaje

---

### 📁 SUBFASE 6.3: Integración con APIs de IA Gratuitas

```
┌────────────────────────────────────────────────────────────────┐
│                  APIs DE IA GRATUITAS                          │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  🤖 OPCIÓN 1: Groq (Llama, Mixtral)                           │
│     ▸ Muy rápido                                               │
│     ▸ Modelos: llama-3.1-70b, mixtral-8x7b                    │
│     ▸ Free tier generoso                                       │
│                                                                │
│  🤖 OPCIÓN 2: Together AI                                      │
│     ▸ Múltiples modelos open source                           │
│     ▸ Free tier disponible                                     │
│                                                                │
│  🤖 OPCIÓN 3: Hugging Face Inference                          │
│     ▸ Modelos open source                                      │
│     ▸ Free tier                                                │
│                                                                │
│  🤖 OPCIÓN 4: OpenRouter (agregador)                          │
│     ▸ Acceso a múltiples modelos                              │
│     ▸ Algunos modelos gratuitos                               │
│                                                                │
│  🤖 OPCIÓN 5: Google AI Studio (Gemini)                       │
│     ▸ Free tier generoso                                       │
│     ▸ Gemini 1.5 Flash gratuito                               │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Integración con al menos 2 proveedores
- ✅ Sistema de fallback
- ✅ Manejo de errores robusto

---

### 📁 SUBFASE 6.4: Streaming de Respuestas

```
┌────────────────────────────────────────────────────────────────┐
│                 STREAMING DE RESPUESTAS                        │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  📡 Implementación                                             │
│     ▸ Server-Sent Events (SSE)                                │
│     ▸ Edge Runtime para baja latencia                         │
│     ▸ Chunked transfer                                         │
│                                                                │
│  🎨 UX del streaming                                           │
│     ▸ Efecto de escritura en tiempo real                      │
│     ▸ Cursor parpadeante                                       │
│     ▸ Smooth scrolling automático                             │
│     ▸ Botón de parar generación                               │
│                                                                │
│  ⚡ Optimizaciones                                             │
│     ▸ Buffer de texto para performance                        │
│     ▸ Debounced re-renders                                     │
│     ▸ Memory management                                        │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ API Route con streaming
- ✅ Cliente que consume stream
- ✅ UI de streaming implementada

---

### 📁 SUBFASE 6.5: Gestión de Conversaciones

```
┌────────────────────────────────────────────────────────────────┐
│               GESTIÓN DE CONVERSACIONES                        │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ➕ Crear conversación                                         │
│     ▸ Nueva conversación vacía                                 │
│     ▸ Título auto-generado del primer mensaje                 │
│     ▸ Selección de modelo                                      │
│                                                                │
│  📝 Editar conversación                                        │
│     ▸ Cambiar título                                           │
│     ▸ Cambiar modelo (para nuevos mensajes)                   │
│                                                                │
│  🗑️ Eliminar conversación                                      │
│     ▸ Confirmación modal                                       │
│     ▸ Eliminación de todos los mensajes                       │
│                                                                │
│  📤 Exportar conversación                                      │
│     ▸ Formato Markdown                                         │
│     ▸ Formato texto plano                                      │
│     ▸ Formato JSON                                             │
│                                                                │
│  🔄 Sincronización                                             │
│     ▸ Auto-save de mensajes                                    │
│     ▸ Optimistic updates                                       │
│     ▸ Manejo de conflictos                                     │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ CRUD completo de conversaciones
- ✅ Sincronización con Supabase
- ✅ Exportación funcional

---

### 📁 SUBFASE 6.6: Selector de Modelos de IA

```
┌────────────────────────────────────────────────────────────────┐
│                  SELECTOR DE MODELOS                           │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  📋 Lista de modelos                                           │
│     ▸ Nombre del modelo                                        │
│     ▸ Proveedor                                                │
│     ▸ Descripción breve                                        │
│     ▸ Indicador: Free / Premium                               │
│     ▸ Estado: Disponible / No disponible                      │
│                                                                │
│  ℹ️ Información del modelo                                     │
│     ▸ Capacidades                                              │
│     ▸ Límites de tokens                                        │
│     ▸ Velocidad relativa                                       │
│     ▸ Mejor uso recomendado                                    │
│                                                                │
│  ⚙️ Configuración del modelo                                   │
│     ▸ Temperature slider                                       │
│     ▸ Max tokens                                               │
│     ▸ System prompt personalizado                             │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Componente ModelSelector
- ✅ Panel de configuración
- ✅ Persistencia de preferencias

---

# 🔷 FASE 7: SISTEMA DE PLANES Y LÍMITES

## 📌 Objetivo de la Fase

> Implementar el sistema de planes con límites de uso, preparando la estructura para monetización futura.

---

### 📁 SUBFASE 7.1: Definición de Planes

```
┌────────────────────────────────────────────────────────────────┐
│                    ESTRUCTURA DE PLANES                        │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  🆓 PLAN FREE                                                  │
│     ▸ Tokens mensuales: 50,000                                │
│     ▸ Modelos: Solo gratuitos                                 │
│     ▸ Conversaciones: Ilimitadas                              │
│     ▸ Historial: 30 días                                       │
│     ▸ Exportación: Básica (TXT, MD)                           │
│     ▸ Soporte: Comunidad                                       │
│                                                                │
│  ⭐ PLAN PRO (Futuro)                                          │
│     ▸ Tokens mensuales: 500,000                               │
│     ▸ Modelos: Todos disponibles                              │
│     ▸ Conversaciones: Ilimitadas                              │
│     ▸ Historial: Ilimitado                                    │
│     ▸ Exportación: Completa (PDF, DOCX)                       │
│     ▸ Soporte: Email                                           │
│     ▸ API access                                               │
│                                                                │
│  🏢 PLAN ENTERPRISE (Futuro)                                   │
│     ▸ Tokens: Personalizados                                   │
│     ▸ Modelos: Custom + Fine-tuned                            │
│     ▸ Todo Pro +                                               │
│     ▸ SSO / SAML                                               │
│     ▸ Soporte prioritario                                      │
│     ▸ SLA garantizado                                          │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Planes definidos en base de datos
- ✅ Constantes de planes en código
- ✅ Documentación de características

---

### 📁 SUBFASE 7.2: Sistema de Tokens

```
┌────────────────────────────────────────────────────────────────┐
│                   SISTEMA DE TOKENS                            │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  📊 Conteo de tokens                                           │
│     ▸ Tokens de entrada (prompt)                              │
│     ▸ Tokens de salida (respuesta)                            │
│     ▸ Total por mensaje                                        │
│     ▸ Acumulado por conversación                              │
│     ▸ Acumulado mensual                                        │
│                                                                │
│  ⚠️ Límites y alertas                                         │
│     ▸ Warning al 80% del límite                               │
│     ▸ Alerta al 90%                                            │
│     ▸ Bloqueo al 100%                                          │
│     ▸ Opción de upgrade                                        │
│                                                                │
│  🔄 Reset de tokens                                            │
│     ▸ Reset mensual automático                                 │
│     ▸ Fecha de reset visible                                   │
│     ▸ No acumulables                                           │
│                                                                │
│  📈 Visualización                                              │
│     ▸ Barra de progreso                                        │
│     ▸ Gráfico de uso                                           │
│     ▸ Historial de consumo                                     │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Sistema de conteo implementado
- ✅ Alertas de límite
- ✅ UI de visualización de tokens

---

### 📁 SUBFASE 7.3: Control de Acceso por Plan

```
┌────────────────────────────────────────────────────────────────┐
│                 CONTROL DE ACCESO                              │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  🔐 Middleware de verificación                                 │
│     ▸ Verificar tokens disponibles antes de request           │
│     ▸ Verificar acceso a modelo según plan                    │
│     ▸ Verificar features según plan                           │
│                                                                │
│  🚫 Manejo de límites alcanzados                              │
│     ▸ Mensaje claro al usuario                                 │
│     ▸ Opciones disponibles                                     │
│     ▸ Countdown hasta reset                                    │
│     ▸ CTA de upgrade                                           │
│                                                                │
│  ✨ Feature flags por plan                                     │
│     ▸ Exportación PDF (Pro+)                                  │
│     ▸ API access (Pro+)                                       │
│     ▸ Modelos premium (Pro+)                                  │
│     ▸ Custom system prompts (Pro+)                            │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Middleware de control de acceso
- ✅ Feature flags implementados
- ✅ UI de límite alcanzado

---

### 📁 SUBFASE 7.4: Página de Planes y Precios

```
┌────────────────────────────────────────────────────────────────┐
│                  PÁGINA DE PRICING                             │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  💳 Cards de planes                                            │
│     ▸ Diseño comparativo                                       │
│     ▸ Características destacadas                              │
│     ▸ Precio (Free por ahora)                                 │
│     ▸ CTA claro                                                │
│                                                                │
│  📋 Tabla comparativa                                          │
│     ▸ Todas las features listadas                             │
│     ▸ Checkmarks por plan                                      │
│     ▸ Destacar plan recomendado                               │
│                                                                │
│  ❓ FAQ de planes                                              │
│     ▸ Preguntas frecuentes                                    │
│     ▸ Políticas de uso                                         │
│     ▸ Información de billing (futuro)                         │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Página de pricing completa
- ✅ Componentes de plan cards
- ✅ Tabla comparativa

---

# 🔷 FASE 8: FUNCIONALIDADES AVANZADAS

## 📌 Objetivo de la Fase

> Añadir características avanzadas que diferencien a Black AI de la competencia.

---

### 📁 SUBFASE 8.1: Búsqueda Global

```
┌────────────────────────────────────────────────────────────────┐
│                    BÚSQUEDA GLOBAL                             │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  🔍 Funcionalidades                                            │
│     ▸ Búsqueda en todas las conversaciones                    │
│     ▸ Búsqueda en mensajes                                     │
│     ▸ Full-text search en Supabase                            │
│     ▸ Resultados con highlight                                │
│                                                                │
│  ⌨️ UX de búsqueda                                            │
│     ▸ Comando rápido (Ctrl/Cmd + K)                           │
│     ▸ Modal de búsqueda                                        │
│     ▸ Resultados en tiempo real                               │
│     ▸ Navegación por teclado                                  │
│                                                                │
│  📊 Filtros avanzados                                          │
│     ▸ Por fecha                                                │
│     ▸ Por modelo                                               │
│     ▸ Por tipo (pregunta/respuesta)                           │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Búsqueda full-text implementada
- ✅ Modal de búsqueda (Command palette)
- ✅ Filtros funcionales

---

### 📁 SUBFASE 8.2: System Prompts Personalizados

```
┌────────────────────────────────────────────────────────────────┐
│                  SYSTEM PROMPTS                                │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  📝 Prompts predefinidos                                       │
│     ▸ Asistente general                                        │
│     ▸ Programador experto                                      │
│     ▸ Escritor creativo                                        │
│     ▸ Tutor educativo                                          │
│     ▸ Traductor                                                │
│                                                                │
│  ✨ Prompts personalizados                                     │
│     ▸ Crear prompt propio                                      │
│     ▸ Guardar y nombrar                                        │
│     ▸ Editar y eliminar                                        │
│     ▸ Establecer como default                                 │
│                                                                │
│  📋 Biblioteca de prompts                                      │
│     ▸ Categorías                                               │
│     ▸ Búsqueda                                                 │
│     ▸ Favoritos                                                │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Sistema de prompts
- ✅ CRUD de prompts personalizados
- ✅ Biblioteca de prompts

---

### 📁 SUBFASE 8.3: Shortcuts y Productividad

```
┌────────────────────────────────────────────────────────────────┐
│               ATAJOS DE TECLADO                                │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ⌨️ Atajos globales                                           │
│     ▸ Ctrl/Cmd + K: Búsqueda                                  │
│     ▸ Ctrl/Cmd + N: Nueva conversación                        │
│     ▸ Ctrl/Cmd + /: Ver atajos                                │
│     ▸ Ctrl/Cmd + ,: Settings                                  │
│                                                                │
│  💬 Atajos en chat                                             │
│     ▸ Enter: Enviar mensaje                                    │
│     ▸ Shift + Enter: Nueva línea                              │
│     ▸ Esc: Cancelar generación                                │
│     ▸ Ctrl/Cmd + Shift + C: Copiar última respuesta          │
│                                                                │
│  📋 Modal de atajos                                            │
│     ▸ Lista completa de atajos                                 │
│     ▸ Categorizado                                             │
│     ▸ Searchable                                               │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Sistema de shortcuts
- ✅ Modal de ayuda de atajos
- ✅ Hooks de keyboard

---

### 📁 SUBFASE 8.4: Regenerar y Editar Mensajes

```
┌────────────────────────────────────────────────────────────────┐
│              EDICIÓN DE MENSAJES                               │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  🔄 Regenerar respuesta                                        │
│     ▸ Botón en cada respuesta de IA                           │
│     ▸ Opción de regenerar con otro modelo                     │
│     ▸ Mantener historial de regeneraciones                    │
│                                                                │
│  ✏️ Editar mensaje del usuario                                │
│     ▸ Editar mensaje enviado                                   │
│     ▸ Re-enviar y obtener nueva respuesta                     │
│     ▸ Crear branch de conversación                            │
│                                                                │
│  🌳 Árbol de conversación                                      │
│     ▸ Visualizar branches                                      │
│     ▸ Navegar entre versiones                                  │
│     ▸ Seleccionar versión preferida                           │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Funcionalidad de regenerar
- ✅ Edición de mensajes
- ✅ Sistema de versiones

---

### 📁 SUBFASE 8.5: Exportación Avanzada

```
┌────────────────────────────────────────────────────────────────┐
│                    EXPORTACIÓN                                 │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  📄 Formatos disponibles                                       │
│     ▸ Markdown (.md)                                           │
│     ▸ Texto plano (.txt)                                       │
│     ▸ JSON (para backup/import)                               │
│     ▸ HTML (styled)                                            │
│                                                                │
│  ⚙️ Opciones de exportación                                   │
│     ▸ Incluir metadata                                         │
│     ▸ Incluir timestamps                                       │
│     ▸ Solo código                                              │
│     ▸ Rango de fecha                                           │
│                                                                │
│  📦 Exportación masiva                                         │
│     ▸ Exportar todas las conversaciones                       │
│     ▸ Backup completo                                          │
│     ▸ Formato ZIP                                              │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Exportación en múltiples formatos
- ✅ Opciones de personalización
- ✅ Descarga de archivos

---

# 🔷 FASE 9: OPTIMIZACIÓN Y SEGURIDAD

## 📌 Objetivo de la Fase

> Asegurar que Black AI sea rápido, seguro y escalable.

---

### 📁 SUBFASE 9.1: Rate Limiting

```
┌────────────────────────────────────────────────────────────────┐
│                    RATE LIMITING                               │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  🚦 Límites por endpoint                                       │
│     ▸ API de chat: X requests/minuto                          │
│     ▸ Auth endpoints: Más restrictivo                         │
│     ▸ Uploads: Límite por tamaño/cantidad                     │
│                                                                │
│  📊 Implementación                                             │
│     ▸ Redis o Upstash para conteo                             │
│     ▸ Sliding window algorithm                                 │
│     ▸ Headers de rate limit info                              │
│                                                                │
│  ⚠️ Manejo de exceso                                          │
│     ▸ Response 429 Too Many Requests                          │
│     ▸ Retry-After header                                       │
│     ▸ UI feedback claro                                        │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Rate limiting implementado
- ✅ Configuración por plan
- ✅ Manejo de errores

---

### 📁 SUBFASE 9.2: Validación y Sanitización

```
┌────────────────────────────────────────────────────────────────┐
│               VALIDACIÓN Y SEGURIDAD                           │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ✅ Validación de inputs                                       │
│     ▸ Zod schemas para todo                                   │
│     ▸ Validación client y server side                         │
│     ▸ Mensajes de error claros                                │
│                                                                │
│  🧹 Sanitización                                               │
│     ▸ HTML sanitization                                        │
│     ▸ SQL injection prevention (ya por Supabase)             │
│     ▸ XSS prevention                                           │
│                                                                │
│  🔐 Headers de seguridad                                       │
│     ▸ CSP (Content Security Policy)                           │
│     ▸ HSTS                                                     │
│     ▸ X-Frame-Options                                          │
│     ▸ X-Content-Type-Options                                  │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Schemas de validación
- ✅ Sanitización implementada
- ✅ Headers de seguridad configurados

---

### 📁 SUBFASE 9.3: Performance Optimization

```
┌────────────────────────────────────────────────────────────────┐
│                   OPTIMIZACIÓN                                 │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ⚡ Next.js optimizations                                      │
│     ▸ Image optimization                                       │
│     ▸ Font optimization                                        │
│     ▸ Code splitting                                           │
│     ▸ Dynamic imports                                          │
│                                                                │
│  📦 Bundle optimization                                        │
│     ▸ Tree shaking                                             │
│     ▸ Minification                                             │
│     ▸ Compression                                              │
│                                                                │
│  🗄️ Caching                                                    │
│     ▸ Static generation donde posible                         │
│     ▸ API caching                                              │
│     ▸ React Query caching                                      │
│                                                                │
│  📊 Monitoring                                                 │
│     ▸ Core Web Vitals                                          │
│     ▸ Lighthouse audit                                         │
│     ▸ Bundle analyzer                                          │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Optimizaciones aplicadas
- ✅ Bundle size reducido
- ✅ Score de Lighthouse > 90

---

### 📁 SUBFASE 9.4: Error Handling Global

```
┌────────────────────────────────────────────────────────────────┐
│                  MANEJO DE ERRORES                             │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  🚨 Error boundaries                                           │
│     ▸ Error boundary global                                    │
│     ▸ Error boundaries por sección                            │
│     ▸ Fallback UI elegante                                     │
│                                                                │
│  📄 Páginas de error                                           │
│     ▸ 404 Not Found                                            │
│     ▸ 500 Server Error                                         │
│     ▸ Error genérico                                           │
│                                                                │
│  📝 Logging                                                    │
│     ▸ Error logging estructurado                              │
│     ▸ Contexto del error                                       │
│     ▸ Stack traces (solo desarrollo)                          │
│                                                                │
│  🔄 Recovery                                                   │
│     ▸ Retry automático donde aplique                          │
│     ▸ Opciones de recuperación                                 │
│     ▸ Mensajes útiles para el usuario                         │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Error boundaries implementados
- ✅ Páginas de error diseñadas
- ✅ Sistema de logging

---

### 📁 SUBFASE 9.5: SEO y Meta Tags

```
┌────────────────────────────────────────────────────────────────┐
│                      SEO                                       │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  🏷️ Meta tags                                                  │
│     ▸ Title y description por página                          │
│     ▸ Open Graph tags                                          │
│     ▸ Twitter cards                                            │
│     ▸ Canonical URLs                                           │
│                                                                │
│  🗺️ Sitemap y Robots                                          │
│     ▸ Sitemap.xml dinámico                                    │
│     ▸ Robots.txt                                               │
│     ▸ Páginas indexables definidas                            │
│                                                                │
│  📊 Structured data                                            │
│     ▸ JSON-LD para la organización                            │
│     ▸ Schema.org markup                                        │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Meta tags en todas las páginas
- ✅ Sitemap generado
- ✅ Structured data implementado

---

# 🔷 FASE 10: DEPLOYMENT Y LANZAMIENTO

## 📌 Objetivo de la Fase

> Desplegar Black AI a producción de manera profesional y preparar para usuarios reales.

---

### 📁 SUBFASE 10.1: Preparación para Producción

```
┌────────────────────────────────────────────────────────────────┐
│              CHECKLIST PRE-DEPLOYMENT                          │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ✅ Código                                                     │
│     ▸ TypeScript sin errores                                  │
│     ▸ ESLint sin warnings                                      │
│     ▸ Tests pasando (si hay)                                  │
│     ▸ Build exitoso                                            │
│                                                                │
│  ✅ Seguridad                                                  │
│     ▸ Variables de entorno configuradas                       │
│     ▸ Secrets no expuestos                                     │
│     ▸ RLS verificado                                           │
│                                                                │
│  ✅ Base de datos                                              │
│     ▸ Migraciones aplicadas                                   │
│     ▸ Seeds ejecutados                                         │
│     ▸ Backups configurados                                     │
│                                                                │
│  ✅ Assets                                                     │
│     ▸ Imágenes optimizadas                                     │
│     ▸ Favicons configurados                                    │
│     ▸ Fonts cargando correctamente                            │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Checklist completado
- ✅ Build de producción exitoso
- ✅ Review final de seguridad

---

### 📁 SUBFASE 10.2: Deploy a Vercel

```
┌────────────────────────────────────────────────────────────────┐
│                  DEPLOY A VERCEL                               │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  🚀 Configuración de Vercel                                    │
│     ▸ Conectar repositorio                                     │
│     ▸ Configurar variables de entorno                         │
│     ▸ Configurar dominio                                       │
│     ▸ Configurar team (si aplica)                             │
│                                                                │
│  ⚙️ Configuración avanzada                                    │
│     ▸ Edge functions                                           │
│     ▸ Regiones de deployment                                   │
│     ▸ Build settings                                           │
│                                                                │
│  🔄 CI/CD                                                      │
│     ▸ Preview deployments                                      │
│     ▸ Production deployments                                   │
│     ▸ Branch protection                                        │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ App desplegada en Vercel
- ✅ Dominio configurado
- ✅ CI/CD funcionando

---

### 📁 SUBFASE 10.3: Dominio y SSL

```
┌────────────────────────────────────────────────────────────────┐
│                  DOMINIO Y SSL                                 │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  🌐 Configuración de dominio                                   │
│     ▸ Comprar/usar dominio                                     │
│     ▸ Configurar DNS                                           │
│     ▸ Apuntar a Vercel                                         │
│                                                                │
│  🔒 SSL/HTTPS                                                  │
│     ▸ Certificado SSL (automático en Vercel)                  │
│     ▸ Forzar HTTPS                                             │
│     ▸ HSTS configurado                                         │
│                                                                │
│  📧 Email (opcional)                                           │
│     ▸ Configurar dominio para emails                          │
│     ▸ SPF, DKIM, DMARC                                        │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Dominio funcionando
- ✅ HTTPS activo
- ✅ DNS configurado correctamente

---

### 📁 SUBFASE 10.4: Monitoreo y Analytics

```
┌────────────────────────────────────────────────────────────────┐
│              MONITOREO Y ANALYTICS                             │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  📊 Analytics                                                  │
│     ▸ Vercel Analytics                                         │
│     ▸ Google Analytics (opcional)                             │
│     ▸ Eventos personalizados                                   │
│                                                                │
│  🔍 Error tracking                                             │
│     ▸ Sentry o similar (opcional)                             │
│     ▸ Alertas de errores                                       │
│     ▸ Performance monitoring                                   │
│                                                                │
│  📈 Uptime monitoring                                          │
│     ▸ Health check endpoint                                    │
│     ▸ Status page                                              │
│     ▸ Alertas de downtime                                      │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ Analytics configurado
- ✅ Error tracking activo
- ✅ Monitoreo de uptime

---

### 📁 SUBFASE 10.5: Documentación Final

```
┌────────────────────────────────────────────────────────────────┐
│                   DOCUMENTACIÓN                                │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  📚 Documentación técnica                                      │
│     ▸ README.md completo                                       │
│     ▸ Instrucciones de desarrollo                             │
│     ▸ Arquitectura del proyecto                                │
│     ▸ API documentation                                        │
│                                                                │
│  📖 Documentación de usuario                                   │
│     ▸ Guía de inicio                                           │
│     ▸ FAQ                                                      │
│     ▸ Términos de servicio                                     │
│     ▸ Política de privacidad                                   │
│                                                                │
│  🔧 Runbooks                                                   │
│     ▸ Troubleshooting común                                    │
│     ▸ Procedimientos de backup                                 │
│     ▸ Escalamiento                                             │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Entregables:**

- ✅ README completo
- ✅ Documentación de usuario
- ✅ Páginas legales

---

# 📋 RESUMEN DEL PLAN

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                         RESUMEN EJECUTIVO                                    ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  TOTAL DE FASES: 10                                                          ║
║  TOTAL DE SUBFASES: 50                                                       ║
║  TIEMPO ESTIMADO: 35-45 días                                                 ║
║                                                                              ║
║  ┌────────────────────────────────────────────────────────────────────────┐ ║
║  │ FASE │ NOMBRE                          │ SUBFASES │ DÍAS ESTIMADOS    │ ║
║  ├────────────────────────────────────────────────────────────────────────┤ ║
║  │  1   │ Preparación del Entorno         │    5     │     2-3           │ ║
║  │  2   │ Supabase (SQL)                  │    6     │     2-3           │ ║
║  │  3   │ Sistema de Autenticación        │    6     │     3-4           │ ║
║  │  4   │ Diseño UI/UX 2026               │    5     │     4-5           │ ║
║  │  5   │ Dashboard de Usuario            │    5     │     4-5           │ ║
║  │  6   │ Motor de Chat con IA            │    6     │     5-7           │ ║
║  │  7   │ Sistema de Planes               │    4     │     3-4           │ ║
║  │  8   │ Funcionalidades Avanzadas       │    5     │     5-6           │ ║
║  │  9   │ Optimización y Seguridad        │    5     │     3-4           │ ║
║  │ 10   │ Deployment y Lanzamiento        │    5     │     2-3           │ ║
║  └────────────────────────────────────────────────────────────────────────┘ ║
║                                                                              ║
║  TECNOLOGÍAS PRINCIPALES:                                                    ║
║  • Next.js 15 (App Router)                                                   ║
║  • TypeScript                                                                ║
║  • Tailwind CSS 4                                                            ║
║  • Supabase (PostgreSQL + Auth + Storage)                                   ║
║  • Framer Motion                                                             ║
║  • APIs de IA gratuitas (Groq, Google AI, etc.)                             ║
║                                                                              ║
║  METODOLOGÍA:                                                                ║
║  • Desarrollo iterativo por fases                                            ║
║  • Código 100% real y avanzado                                               ║
║  • SQL directo para Supabase                                                 ║
║  • Guía paso a paso para cada subfase                                        ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

---

## 🎯 ¿LISTO PARA COMENZAR?

Cuando quieras, dime:

> **"Comenzar Fase 1"**

Y te guiaré paso a paso con instrucciones detalladas y código 100% real y avanzado para cada subfase. 🚀

---

**Nota:** Este plan está diseñado para ser flexible. Podemos ajustar tiempos y prioridades según avancemos. ¡Estoy aquí para guiarte en cada paso del camino! 💪
