# 👟 Zapatillas - E-Commerce de Zapatillas Sostenibles

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-19-61dafb)](https://react.dev/)
[![Playwright](https://img.shields.io/badge/Playwright-1.48-45ba4b)](https://playwright.dev/)

Plataforma de comercio electrónico moderna centrada en zapatillas sostenibles, construida con Next.js App Router y un stack tecnológico de última generación orientado a rendimiento, SEO, accesibilidad e internacionalización.

---

## 📋 Tabla de Contenidos

- [Características Principales](#-características-principales)
- [Stack Tecnológico](#-stack-tecnológico)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Prerequisitos](#-prerequisitos)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Scripts Disponibles](#-scripts-disponibles)
- [Configuración de Entorno](#-configuración-de-entorno)
- [Guía de Desarrollo](#-guía-de-desarrollo)
- [Testing](#-testing)
- [SEO y Performance](#-seo-y-performance)
- [Despliegue](#-despliegue)
- [Estructura de Datos](#-estructura-de-datos)
- [Contribución](#-contribución)
- [Roadmap](#-roadmap)
- [Licencia](#-licencia)

---

## 🚀 Características Principales

### 🌐 Internacionalización (i18n)

- Ruteo multiidioma con prefijos `/[lang]` automáticos
- Middleware inteligente que detecta el idioma del usuario mediante `Accept-Language`
- Diccionarios centralizados en `lib/i18n*` para español e inglés
- URLs canónicas y alternativas para SEO

### 🛍️ Sistema de Carrito

- Carrito persistente en cliente usando Zustand
- Mini-carrito flotante con animaciones suaves
- Gestión de cantidad y eliminación de productos
- Resumen de compra con cálculos automáticos
- Estado sincronizado en tiempo real

### 🎨 Sistema de Diseño

- Tailwind CSS v4 con tokens personalizados
- Design System inspirado en Allbirds
- Componentes shadcn/ui basados en Radix Primitives
- Animaciones fluidas con Framer Motion
- Soporte para tema claro/oscuro
- Tokens de diseño centralizados en `app/globals.css`

### 🔍 Optimización SEO

- Metadata dinámica por página
- Schema.org JSON-LD estructurado
- Sitemap.xml automático
- robots.txt configurable
- Open Graph y Twitter Cards
- Banner de consentimiento GDPR-compliant

### ♿ Accesibilidad (A11y)

- Navegación por teclado completa
- Roles ARIA apropiados
- Contraste WCAG AA mínimo
- Focus visible mejorado
- Soporte para lectores de pantalla
- Validación automática en tests E2E

### 🧪 Testing Completo

- Tests unitarios con Jest y React Testing Library
- Tests end-to-end con Playwright
- Validación de accesibilidad automatizada
- Testing de SEO y metadata
- Coverage de componentes críticos

---

## 🛠 Stack Tecnológico

### Core

- **Next.js 16** - Framework React con App Router
- **React 19** - Biblioteca UI
- **TypeScript 5** - Tipado estático estricto

### Estilos y UI

- **Tailwind CSS 4** - Framework CSS utility-first
- **Radix UI** - Primitivos accesibles (Dialog, Label, Navigation, Separator, Sheet)
- **Framer Motion 12** - Animaciones fluidas
- **Lucide React** - Iconografía moderna
- **Class Variance Authority** - Variantes de componentes

### Gestión de Estado

- **Zustand 5** - State management ligero

### Validación

- **Zod 4** - Esquemas de validación y parsing type-safe

### Testing

- **Jest 29** - Framework de testing
- **React Testing Library** - Utilidades para testing de componentes
- **Playwright 1.48** - Testing E2E y automatización
- **@testing-library/jest-dom** - Matchers personalizados

### Herramientas de Desarrollo

- **ESLint** - Linting de código
- **TypeScript Compiler** - Type checking
- **tsx** - Ejecución de TypeScript

---

## 📁 Arquitectura del Proyecto

```
zapatillas/
├── app/                          # Next.js App Router
│   ├── [lang]/                   # Rutas localizadas (es/en)
│   │   ├── (marketing)/          # Grupo de rutas marketing
│   │   │   └── page.tsx          # Página principal
│   │   ├── carrito/
│   │   │   ├── layout.tsx        # Layout específico de carrito
│   │   │   └── page.tsx          # Página de carrito
│   │   ├── productos/
│   │   │   ├── [slug]/
│   │   │   │   ├── layout.tsx    # Layout de detalle de producto
│   │   │   │   └── page.tsx      # PDP (Product Detail Page)
│   │   │   ├── layout.tsx        # Layout de catálogo
│   │   │   └── page.tsx          # PLP (Product Listing Page)
│   │   ├── publicidad/
│   │   │   └── page.tsx          # Página de promociones
│   │   ├── sobre-nosotros/
│   │   │   └── page.tsx          # Página About
│   │   └── layout.tsx            # Layout principal localizado
│   ├── layout.tsx                # Root Layout
│   ├── globals.css               # Estilos globales y tokens de diseño
│   ├── page.tsx                  # Root page
│   ├── sitemap.ts                # Generación de sitemap
│   └── robots.txt/
│       └── route.ts              # Configuración de robots.txt
│
├── components/                   # Componentes reutilizables
│   ├── ui/                       # Componentes primitivos shadcn/ui
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── navigation-menu.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   └── textarea.tsx
│   ├── seo/
│   │   └── jsonld.tsx            # Componente Schema.org
│   ├── cart-item.tsx             # Item del carrito
│   ├── cart-summary.tsx          # Resumen de compra
│   ├── category-grid.tsx         # Grid de categorías
│   ├── consent-banner.tsx        # Banner GDPR
│   ├── footer.tsx                # Footer
│   ├── header.tsx                # Header principal
│   ├── hero.tsx                  # Hero section
│   ├── mini-cart.tsx             # Carrito flotante
│   ├── mobile-nav.tsx            # Navegación móvil
│   ├── pagination.tsx            # Paginación
│   ├── product-card.tsx          # Tarjeta de producto
│   ├── product-filters.tsx       # Filtros de productos
│   ├── product-grid.tsx          # Grid de productos
│   └── skeletons.tsx             # Skeleton loaders
│
├── lib/                          # Lógica de dominio y utilidades
│   ├── cart/
│   │   └── store.ts              # Store de Zustand para carrito
│   ├── products/
│   │   └── sample.ts             # Catálogo mockeado de productos
│   ├── analytics.ts              # Integración con Google Analytics
│   ├── i18n.ts                   # Exports centralizados de i18n
│   ├── i18n-client.ts            # Hooks de i18n para cliente
│   ├── i18n-server.ts            # Utilidades de i18n para servidor
│   └── utils.ts                  # Utilidades generales (cn, etc.)
│
├── public/                       # Archivos estáticos
│   ├── images/                   # Imágenes de productos y assets
│   │   ├── [productos].png       # Imágenes de productos
│   │   └── [productos].jpg       # Imágenes adicionales
│   ├── favicon.ico
│满足了 `README.md` 的要求。]
│   └── commission_form.md        # Documentación de requisitos
│
├── scripts/                      # Scripts de utilidad
│   └── verify-images.ts          # Validación de imágenes
│
├── tests/                        # Tests automatizados
│   ├── e2e/                      # Tests end-to-end
│   │   ├── setup/
│   │   │   └── global-setup.ts   # Setup global de Playwright
│   │   ├── a11y.spec.ts          # Tests de accesibilidad
│   │   ├── home.spec.ts          # Tests de home
│   │   ├── products.spec.ts      # Tests de productos
│   │   └── seo.spec.ts           # Tests de SEO
│   ├── e2e-playwright/           # Tests adicionales E2E
│   ├── unit/                     # Tests unitarios
│   │   ├── cart-store.test.ts    # Tests del store
│   │   ├── hero.test.tsx         # Tests del componente Hero
│   │   └── product-card.test.tsx # Tests de Product Card
│   └── setup.d.ts                # Type definitions para tests
│
├── .cursorrules                  # Reglas del proyecto
├── agents.md                     # Documentación de agentes
├── components.json               # Configuración de shadcn/ui
├── eslint.config.mjs             # Configuración de ESLint
├── jest.config.js                # Configuración de Jest
├── jest.setup.js                 # Setup de Jest
├── middleware.ts                 # Middleware de Next.js (i18n)
├── next.config.ts                # Configuración de Next.js
├── playwright.config.ts          # Configuración de Playwright
├── postcss.config.mjs            # Configuración de PostCSS
├── tsconfig.json                 # Configuración de TypeScript
├── package.json                  # Dependencias y scripts
├── PlanMaestro.md                # Documento de plan maestro
└── README.md                     # Este archivo

```

### Principios de Arquitectura

1. **Separación de Responsabilidades**
   - `app/`: Rutas y layouts (convención de archivos)
   - `components/`: UI reutilizable y presentacional
   - `lib/`: Lógica de negocio y utilidades

2. **Colocación de Código**
   - Co-locación de componentes relacionados
   - Layouts específicos cuando es necesario
   - Server Components por defecto, Client Components explícitos

3. **Type Safety**
   - TypeScript estricto sin `any` explícitos
   - Tipos compartidos en lugar de duplicados
   - Inferencia de tipos donde sea posible

---

## ⚙️ Prerequisitos

- **Node.js** 18.17+ (recomendado: versión LTS actual)
- **npm** 9+ (o pnpm/yarn, según preferencia)
- **Git** para control de versiones

### Verificación

```bash
node --version   # Debe mostrar v18.17.0 o superior
npm --version    # Debe mostrar 9.x.x o superior
git --version    # Cualquier versión reciente
```

---

## 💻 Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/zapatillas.git
cd zapatillas
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# URL canónica (requerido para producción)
NEXT_PUBLIC_BASE_URL=https://zapatillas.com

# Google Analytics (opcional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Google Search Console (opcional)
GOOGLE_SITE_VERIFICATION=verification_token
```

### 4. Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

El sitio estará disponible en [http://localhost:3000](http://localhost:3000)

El middleware redirigirá automáticamente a `/es/issues` o `/en` según el idioma del navegador.

---

## 🔧 Scripts Disponibles

| Comando                 | Descripción                                           |
| ----------------------- | ----------------------------------------------------- |
| `npm run dev`           | Inicia el servidor de desarrollo en modo watch        |
| `npm run build`         | Genera una build de producción optimizada             |
| `npm run start`         | Sirve la build de producción localmente               |
| `npm run lint`          | Ejecuta ESLint para detectar problemas de código      |
| `npm run type-check`    | Valida tipos de TypeScript sin compilar               |
| `npm run test`          | Ejecuta tests unitarios con Jest en modo watch        |
| `npm run test:ci`       | Ejecuta tests en modo CI (una sola pasada)            |
| `npm run test:e2e`      | Ejecuta tests end-to-end con Playwright               |
| `npm run test:e2e:ui`   | Abre la UI de Playwright para debugging               |
| `npm run verify:images` | Verifica que todas las imágenes referenciadas existan |

### Scripts Adicionales (Internos)

- **Generación estática**: Next.js detecta automáticamente qué rutas pueden ser pre-renderizadas
- **Type safety**: Los tipos se validan durante `npm run build`
- **Optimización de imágenes**: Automática mediante `next/image`

---

## 🌍 Configuración de Entorno

### Variables de Entorno Requeridas

#### Producción

- `NEXT_PUBLIC_BASE_URL`: URL canónica del sitio (ej: `https://zapatillas.com`)

### Variables de Entorno Opcionales

#### Analytics

- `NEXT_PUBLIC_GA_ID`: ID de Google Analytics 4 (ej: `G-XXXXXXXXXX`)

#### SEO

- `GOOGLE_SITE_VERIFICATION`: Token de Google Search Console

#### Desarrollo

- `.env.local`: Usado por Next.js, gitignored por defecto
- `.env.development`: Configuraciones específicas de desarrollo
- `.env.production`: Configuraciones de producción (commit permitido)

---

## 👨‍💻 Guía de Desarrollo

### Flujo de Trabajo Recomendado

1. **Crear una rama nueva**

   ```bash
   git checkout -b feature/mi-nueva-feature
   ```

2. **Desarrollo iterativo**
   - Ejecuta `npm run dev` para ver cambios en tiempo real
   - Usa `npm run test -- --watch` para tests en modo watch
   - Valida tipos con `npm run type-check`

3. **Antes de commit**

   ```bash
   npm run lint         # Verifica código
   npm run type-check   # Verifica tipos
   npm run test         # Tests unitarios
   npm run test:e2e     # Tests E2E (opcional en local)
   ```

4. **Commit descriptivo**

   ```bash
   git commit -m "feat: agregar filtro de precios en catálogo"
   ```

5. **Push y PR**
   ```bash
   git push origin feature/mi-nueva-feature
   # Crear Pull Request en GitHub/GitLab
   ```

### Convenciones de Código

#### TypeScript

- Tipado estricto, **nunca** usar `any`
- Inferencia de tipos cuando sea posible
- Interfaces para objetos complejos
- Types para uniones y transformaciones

#### React

- Server Components por defecto
- Client Components con `"use client"` explícito
- Props tipadas con TypeScript
- Nombres descriptivos: `PascalCase` para componentes

#### Estilos

- **Todo** debe usar tokens de `globals.css`
- No colores hardcodeados en componentes
- Utilidades de Tailwind CSS v4
- Animaciones con `prefers-reduced-motion`

#### Archivos

- Componentes: `kebab-case.tsx`
- Utilidades: `camelCase.ts`
- Hooks: `useCamelCase.ts`
- Types: `types.ts` o inline

### Agregar Nuevos Productos

1. Edita `lib/products/sample.ts`
2. Agrega las imágenes a `public/images/`
3. Ejecuta `npm run verify:images` para validar
4. Las rutas se generan automáticamente en `/[lang]/productos/[slug]`

### Agregar Nuevos Idiomas

1. Edita `lib/i18n-server.ts` - agrega el locale a `locales`
2. Crea diccionarios en `lib/i18n-server.ts` y `lib/i18n-client.ts`
3. El middleware detectará automáticamente el nuevo idioma

---

## 🧪 Testing

### Tests Unitarios (Jest + RTL)

Ubicación: `tests/unit/`

```bash
# Ejecutar todos los tests
npm run test

# Modo watch durante desarrollo
npm run test -- --watch

# Con coverage
npm run test -- --coverage
```

#### Ejemplos de Tests Incluidos

- **cart-store.test.ts**: Validación del store de Zustand
- **hero.test.tsx**: Renderizado y props del Hero
- **product-card.test.tsx**: Interacciones y visualización

#### Escribir Nuevos Tests

```typescript
// tests/unit/mi-component.test.tsx
import { render, screen } from '@testing-library/react';
import { MiComponente } from '@/components/mi-componente';

describe('MiComponente', () => {
  it('debe renderizar correctamente', () => {
    render(<MiComponente />);
    expect(screen.getByText('Contenido')).toBeInTheDocument();
  });
});
```

### Tests End-to-End (Playwright)

Ubicación: `tests/e2e/`

```bash
# Ejecutar todos los tests E2E
npm run test:e2e

# Modo UI (útil para debugging)
npm run test:e2e:ui

# Ejecutar un test específico
npm run test:e2e tests/e2e/home.spec.ts
```

#### Suite de Tests E2E

- **home.spec.ts**: Navegación y contenido de home
- **products.spec.ts**: Catálogo y detalles de producto
- **seo.spec.ts**: Metadata y Schema.org
- **a11y.spec.ts**: Validación de accesibilidad

#### Escribir Nuevos Tests E2E

```typescript
// tests/e2e/mi-feature.spec.ts
import { test, expect } from "@playwright/test";

test("debe cargar correctamente", async ({ page }) => {
  await page.goto("/es");
  await expect(page.getByRole("heading")).toBeVisible();
});
```

### Validación de Accesibilidad

Los tests E2E incluyen validaciones automáticas:

```typescript
// Ejemplo de test a11y
await expect(page).toHaveAccessibleName("Boton principal");
```

Ejecuta manualmente:

```bash
npm run test:e2e tests/e2e/a11y.spec.ts
```

---

## 🔍 SEO y Performance

### Optimizaciones Implementadas

#### Metadata Dinámica

- Cada página tiene su propio `<title>` y `<meta description>`
- Open Graph y Twitter Cards configurados
- URLs canónicas para evitar contenido duplicado

#### Schema.org JSON-LD

- Structured data para productos
- BreadcrumbList para navegación
- Organization para información corporativa

#### Rendimiento

- Server Components por defecto (menos JS en cliente)
- Optimización automática de imágenes con `next/image`
- Lazy loading de componentes pesados
- Code splitting automático por ruta

#### Lighthouse Scores Objetivo

- **Performance**: 90+
- **Accessibility**: 100
- **Best Practices**: 90+
- **SEO**: 100

### Verificar SEO Localmente

```bash
# Build de producción
npm run build

# Iniciar servidor de producción
npm run start

# Ejecutar auditoría
npm run test:e2e tests/e2e/seo.spec.ts
```

---

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conecta el repositorio en [Vercel](https://vercel.com)
2. Configura variables de entorno:
   - `NEXT_PUBLIC_BASE_URL`
   - `NEXT_PUBLIC_GA_ID` (opcional)
   - `GOOGLE_SITE_VERIFICATION` (opcional)
3. Deploy automático en cada push a `main`

### Otras Plataformas

#### Netlify

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

#### Docker

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production
EXPOSE 3000
CMD ["npm", "start"]
```

### Checklist de Pre-Deploy

- [ ] Variables de entorno configuradas
- [ ] `NEXT_PUBLIC_BASE_URL` apunta a producción
- [ ] Tests pasando (`npm run test:ci`)
- [ ] Build exitosa (`npm run build`)
- [ ] Sitemap accesible en `/sitemap.xml`
- [ ] robots.txt configurado en `/robots.txt`
- [ ] Favicon presente
- [ ] Imágenes optimizadas y cargando

---

## 📊 Estructura de Datos

### Modelo de Producto

```typescript
interface Product {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  price: number;
  currency: "ARS" | "USD";
  images: string[];
  category: string;
  tags: string[];
  sizes: string[];
  inStock: boolean;
  materials: string[];
  sustainability: {
    carbonNeutral: boolean;
    recycledMaterials: boolean;
  };
}
```

### Modelo de Carrito

```typescript
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  image: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, size: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}
```

### Diccionarios i18n

```typescript
interface Translations {
  // Navegación
  nav: {
    home: string;
    products: string;
    about: string;
    cart: string;
  };
  // Productos
  products: {
    title: string;
    addToCart: string;
    inStock: string;
    outOfStock: string;
  };
  // ... más
}
```

---

## 🤝 Contribución

### Proceso de Contribución

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'feat: Agregar AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Estándares de Código

- **Commits**: Seguir [Conventional Commits](https://www.conventionalcommits.org/)
  - `feat:` Nueva funcionalidad
  - `fix:` Corrección de bugs
  - `docs:` Documentación
  - `style:` Formato, missing semi colons, etc.
  - `refactor:` Refactorización
  - `test:` Tests
  - `chore:` Mantenimiento

- **Pull Requests**:
  - Descripción clara del cambio
  - Referencias a issues relacionados
  - Screenshots si afecta UI
  - Tests agregados/actualizados

### Checklist de PR

- [ ] Código sigue las convenciones del proyecto
- [ ] Tests agregados/actualizados
- [ ] Documentación actualizada
- [ ] Sin errores de linting
- [ ] Sin errores de tipos
- [ ] Build exitosa
- [ ] Apropiado para merge a main

---

## 🗺️ Roadmap

### Próximas Características

- [ ] Sistema de autenticación de usuarios
- [ ] Integración con pasarela de pago
- [ ] Panel de administración
- [ ] Wishlist/Favoritos
- [ ] Reviews y ratings de productos
- [ ] Programas de fidelización
- [ ] Blog con CMS
- [ ] Notificaciones push
- [ ] Modo offline con Service Workers
- [ ] PWA completo

### Mejoras Técnicas

- [ ] Migración a CSS Modules para componentes complejos
- [ ] Integración con Storybook
- [ ] Análisis de performance con Web Vitals
- [ ] CDN para assets estáticos
- [ ] Cache strategy optimizada
- [ ] Tests de carga con K6

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

---

## 👥 Equipo

- **Desarrollador Principal**: [Tu Nombre]
- **Email**: tu.email@ejemplo.com
- **GitHub**: [@tu-usuario](https://github.com/tu-usuario)

---

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/) - Framework increíble
- [shadcn/ui](https://ui.shadcn.com/) - Componentes accesibles
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Radix UI](https://www.radix-ui.com/) - Primitivos accesibles
- [Allbirds](https://www.allbirds.com/) - Inspiración de diseño

---

## 📞 Soporte

¿Tienes preguntas o problemas?

- Abre un [issue](https://github.com/tu-usuario/zapatillas/issues)
- Envía un email a soporte@ejemplo.com
- Consulta la [documentación completa](https://docs.ejemplo.com)

---

<p align="center">Hecho con ❤️ usando Next.js y TypeScript</p>
