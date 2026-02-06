# 🤖 Black AI

> Tu asistente de IA inteligente potenciado por Gemini

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=flat-square&logo=supabase)

## ✨ Características

- 🚀 **Next.js 15** con App Router y Turbopack
- 🎨 **Diseño moderno** con Tailwind CSS
- 🤖 **Gemini AI** de Google como motor de IA
- 🔐 **Autenticación** completa con Supabase
- 💾 **Base de datos** PostgreSQL con Supabase
- 📱 **Responsive** para todos los dispositivos
- 🌙 **Dark/Light mode**
- ⚡ **Streaming** de respuestas en tiempo real

## 🛠️ Tecnologías

| Tecnología    | Uso             |
| ------------- | --------------- |
| Next.js 15    | Framework React |
| TypeScript    | Tipado estático |
| Tailwind CSS  | Estilos         |
| Supabase      | Auth + Database |
| Gemini AI     | Motor de IA     |
| Framer Motion | Animaciones     |
| Zustand       | Estado global   |

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+
- npm o pnpm
- Cuenta en Supabase
- API Key de Gemini AI

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/black-ai.git
   cd black-ai
   Instalar dependencias
   ```

Bash

npm install
Configurar variables de entorno

Bash

cp .env.example .env.local
Edita .env.local con tus credenciales.

Iniciar en desarrollo

Bash

npm run dev
Abrir en el navegador

text

http://localhost:3000
📁 Estructura del Proyecto
text

black-ai/
├── src/
│ ├── app/ # App Router (páginas)
│ ├── components/ # Componentes React
│ ├── lib/ # Utilidades y configuraciones
│ ├── hooks/ # Custom hooks
│ ├── store/ # Estado global (Zustand)
│ ├── types/ # Tipos TypeScript
│ └── constants/ # Constantes
├── supabase/ # Archivos SQL
├── public/ # Archivos estáticos
└── ...
📜 Scripts Disponibles
Script Descripción
npm run dev Inicia en modo desarrollo
npm run build Compila para producción
npm run start Inicia servidor de producción
npm run lint Ejecuta ESLint
npm run type-check Verifica tipos TypeScript
npm run format Formatea código con Prettier
🔒 Variables de Entorno
env

# Supabase

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Gemini AI

GOOGLE_AI_API_KEY=

# App

NEXT_PUBLIC_APP_NAME="Black AI"
NEXT_PUBLIC_APP_URL=http://localhost:3000
📝 Licencia
MIT © Black AI

Hecho con ❤️ y ☕
