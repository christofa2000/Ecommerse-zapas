👟 Zapatillas

Sitio de comercio electrónico centrado en zapatillas sostenibles, construido con Next.js App Router y un stack moderno orientado a SEO, accesibilidad e internacionalización.

🚀 Características principales

🌐 Ruteo e internacionalización con prefijos /[lang], middleware que usa Accept-Language y diccionarios centralizados en lib/i18n\*.

🧱 Catálogo mockeado en lib/products/sample.ts con datos de talles, materiales, stock y etiquetas.

🛒 Carrito persistente en cliente mediante Zustand (lib/cart/store.ts), con mini-cart, resumen y controles de cantidad.

🎨 UI moderna con Tailwind CSS 4, componentes Radix, animaciones con Framer Motion y design tokens en app/globals.css.

🔍 Optimización SEO: metadata dinámica, JSON-LD (components/seo/jsonld.tsx), sitemap, robots y banner de consentimiento con Google Analytics.

🧪 Pruebas automatizadas (unitarias y E2E) con Jest, Testing Library y Playwright (tests/), incluyendo validaciones de UI, SEO y accesibilidad.

🧰 Stack tecnológico

⚛️ Next.js 16 (App Router) + React 19 + TypeScript

💅 Tailwind CSS 4 con tokens personalizados

🗂 Zustand para estado compartido y persistencia

🧩 Radix UI Primitives + Lucide Icons + Framer Motion

🧪 Jest, Testing Library y Playwright para QA

⚙️ Requisitos previos

Node.js 18.17+ (recomendado: versión LTS vigente)

npm 9+ (o pnpm/yarn, según preferencia)

💻 Instalación y uso
npm install # Instala dependencias
npm run dev # Inicia el servidor local en http://localhost:3000

🔧 Scripts útiles
Comando Descripción
npm run build Genera la build de producción
npm run start Sirve la build compilada
npm run lint Ejecuta ESLint con la configuración del repo
npm run type-check Valida los tipos de TypeScript
npm run test Corre pruebas unitarias con Jest
npm run test:e2e Ejecuta Playwright para pruebas E2E
npm run verify:images Verifica que las imágenes existan en public/images
🔑 Variables de entorno

Crear un archivo .env.local con los valores sensibles:

Variable Descripción
NEXT_PUBLIC_BASE_URL URL canónica usada por metadata, sitemap y JSON-LD (https://zapatillas.com)
NEXT_PUBLIC_GA_ID ID de Google Analytics (opcional)
GOOGLE_SITE_VERIFICATION Token de Search Console (opcional)
🗂️ Estructura del proyecto
app/ Rutas App Router, layouts y páginas (localizadas en [lang]/)
components/ Componentes UI (hero, header, mini-cart, product-grid, etc.)
lib/ Lógica de dominio: i18n, catálogo, analytics, store del carrito
public/images/ Activos usados por el catálogo y Open Graph
scripts/ Utilidades (p.ej. verify-images.ts)
tests/ Suites unitarias y end-to-end

🧭 Flujo de desarrollo

Ejecutá npm run dev y abrí http://localhost:3000.
El middleware redirige automáticamente a /es o /en según el idioma del navegador.

Actualizá textos traducibles en lib/i18n.ts y lib/i18n-server.ts.
Las páginas localizadas viven dentro de app/[lang]/.

Agregá nuevos productos en lib/products/sample.ts y subí imágenes a public/images.
Luego corré npm run verify:images para validar rutas.

Antes de hacer commit, ejecutá:

npm run lint
npm run type-check
npm run test
npm run test:e2e

🧪 Pruebas y calidad

Unit tests:

npm run test

Ejemplos en tests/unit/\* (componentes como product-card, hero, etc.).
Usá npm run test -- --watch durante el desarrollo.

Playwright E2E:

npm run test:e2e

Valida flujos clave (home, catálogo, SEO, accesibilidad).
Configuración en playwright.config.ts.

Accesibilidad:
Tests dedicados en tests/e2e/a11y.spec.ts.
Usalos como referencia al crear nuevas vistas.

☁️ Despliegue

Compatible con Vercel u otras plataformas Next.js.
El pipeline debe ejecutar npm run build y (preferentemente) pruebas y linting previos al deploy.
Asegurate de exportar las variables de entorno requeridas en el proveedor elegido.
