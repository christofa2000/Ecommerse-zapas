# 👟 Zapatillas - E-Commerce Sostenible

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-19-61dafb)](https://react.dev/)
[![Playwright](https://img.shields.io/badge/Playwright-1.48-45ba4b)](https://playwright.dev/)

Plataforma de comercio electrónico moderna centrada en zapatillas sostenibles, construida con Next.js App Router y un stack tecnológico de última generación orientado a rendimiento, SEO, accesibilidad e internacionalización.

---

## 🚀 Características Principales

- **🌐 Internacionalización (i18n)** - Ruteo multiidioma con detección automática de idioma
- **🛍️ Sistema de Carrito** - Carrito persistente con Zustand y mini-carrito flotante
- **🎨 Sistema de Diseño** - Tailwind CSS v4 con tokens personalizados y componentes shadcn/ui
- **🔍 Optimización SEO** - Metadata dinámica, Schema.org JSON-LD, sitemap automático
- **♿ Accesibilidad (A11y)** - WCAG AA, navegación por teclado, roles ARIA, soporte para lectores de pantalla
- **🧪 Testing Completo** - Tests unitarios (Jest + RTL) y E2E (Playwright)

---

## 🛠 Stack Tecnológico

**Core:** Next.js 16, React 19, TypeScript 5  
**UI:** Tailwind CSS 4, Radix UI, Framer Motion, Lucide React  
**Estado:** Zustand 5  
**Validación:** Zod 4  
**Testing:** Jest 29, React Testing Library, Playwright 1.48  
**Herramientas:** ESLint, TypeScript, Bundle Analyzer, Lighthouse CI

---

## 📁 Arquitectura del Proyecto

```
zapatillas/
├── app/                    # Next.js App Router
│   ├── [lang]/            # Rutas localizadas (es/en)
│   │   ├── productos/     # PLP y PDP
│   │   ├── carrito/       # Página de carrito
│   │   └── ...
│   ├── layout.tsx         # Root Layout
│   └── globals.css        # Estilos globales y tokens
├── components/            # Componentes reutilizables
│   ├── ui/                # Componentes shadcn/ui
│   └── ...
├── lib/                   # Lógica de dominio y utilidades
│   ├── cart/              # Store de Zustand
│   ├── products/          # Catálogo de productos
│   └── i18n*              # Internacionalización
├── public/                # Archivos estáticos
├── tests/                 # Tests automatizados
│   ├── e2e/               # Tests E2E con Playwright
│   └── unit/              # Tests unitarios con Jest
└── ...
```

**Principios:** Separación de responsabilidades, Server Components por defecto, TypeScript estricto sin `any`.

---

## ⚙️ Prerequisitos

- **Node.js** 18.17+ (LTS recomendado)
- **npm** 9+
- **Git**

---

## 💻 Instalación y Configuración

### 1. Clonar e Instalar

```bash
git clone https://github.com/tu-usuario/zapatillas.git
cd zapatillas
npm install
```

### 2. Variables de Entorno

Crea `.env.local`:

```env
NEXT_PUBLIC_BASE_URL=https://zapatillas.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX  # Opcional
GOOGLE_SITE_VERIFICATION=token  # Opcional
```

### 3. Iniciar Desarrollo

```bash
npm run dev
```

El sitio estará disponible en [http://localhost:3000](http://localhost:3000) y redirigirá automáticamente a `/es` o `/en`.

---

## 🔧 Scripts Disponibles

| Comando                 | Descripción                     |
| ----------------------- | ------------------------------- |
| `npm run dev`           | Servidor de desarrollo          |
| `npm run build`         | Build de producción optimizada  |
| `npm run start`         | Sirve la build de producción    |
| `npm run lint`          | Ejecuta ESLint                  |
| `npm run type-check`    | Valida tipos de TypeScript      |
| `npm run test`          | Tests unitarios (Jest)          |
| `npm run test:e2e`      | Tests end-to-end (Playwright)   |
| `npm run analyze`       | Análisis de bundle              |
| `npm run lighthouse`    | Auditoría de Lighthouse         |
| `npm run lighthouse:ci` | Lighthouse CI con configuración |

---

## 👨‍💻 Guía de Desarrollo

### Flujo de Trabajo

1. Crear rama: `git checkout -b feature/mi-feature`
2. Desarrollo: `npm run dev` + `npm run test -- --watch`
3. Antes de commit: `npm run lint && npm run type-check && npm run test`

### Convenciones

- **TypeScript:** Tipado estricto, nunca `any`
- **React:** Server Components por defecto, Client Components explícitos con `"use client"`
- **Estilos:** Todo debe usar tokens de `globals.css`, no colores hardcodeados
- **Archivos:** Componentes `kebab-case.tsx`, utilidades `camelCase.ts`, hooks `useCamelCase.ts`

### Agregar Productos

1. Edita `lib/products/sample.ts`
2. Agrega imágenes a `public/images/` (WebP/AVIF recomendado)
3. Ejecuta `npm run verify:images`
4. El metadata dinámico se genera automáticamente

---

## 🧪 Testing

### Tests Unitarios

```bash
npm run test              # Ejecutar todos
npm run test -- --watch   # Modo watch
npm run test -- --coverage # Con coverage
```

**Ubicación:** `tests/unit/` - Tests de componentes y stores

### Tests E2E

```bash
npm run test:e2e          # Todos los tests
npm run test:e2e tests/e2e/home.spec.ts  # Test específico
```

**Ubicación:** `tests/e2e/` - Tests de navegación, productos, SEO y accesibilidad

---

## 🔍 SEO y Performance

### Optimizaciones Implementadas

- Server Components para mejor rendimiento
- Metadata dinámica con `generateMetadata` en todas las páginas
- Optimización de imágenes (AVIF/WebP) con `next/image`
- Lazy loading de componentes y recursos
- Code splitting automático por ruta
- Memoización con `React.memo` y `useCallback`
- Preconnect para recursos externos
- Respeto por `prefers-reduced-motion`

### Herramientas de Análisis

```bash
npm run analyze        # Bundle Analyzer
npm run lighthouse     # Auditoría Lighthouse
npm run lighthouse:ci  # Lighthouse CI
```

### Objetivos Lighthouse

- **Performance**: ≥ 90
- **Accessibility**: ≥ 90
- **Best Practices**: ≥ 95
- **SEO**: ≥ 90

### Core Web Vitals

- **FCP**: ≤ 2000ms
- **LCP**: ≤ 2500ms
- **CLS**: ≤ 0.1
- **TBT**: ≤ 300ms

Para más detalles, consulta `REPORTE_OPTIMIZACION_LIGHTHOUSE.md`.

---

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conecta el repositorio en [Vercel](https://vercel.com)
2. Configura variables de entorno
3. Deploy automático en cada push a `main`

### CI/CD

El proyecto incluye GitHub Actions para:

- Tests unitarios y E2E
- Validación de TypeScript
- Auditorías de Lighthouse
- Validación de accesibilidad

Compatible con Netlify, Docker y otras plataformas que soporten Next.js.

---

## 🤝 Contribución

1. Fork el proyecto y crea una rama feature
2. Commit con mensajes siguiendo [Conventional Commits](https://www.conventionalcommits.org/)
3. Ejecuta los tests y asegúrate de que pasen
4. Abre un Pull Request con descripción clara

---

<p align="center">Hecho con ❤️ usando Next.js y TypeScript</p>
