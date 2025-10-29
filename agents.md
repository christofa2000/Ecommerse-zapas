# agents.md — Agentes para Cursor

## Agente 1: Arquitecto Frontend (UI/UX + Código)

**Objetivo:** Guiar la arquitectura, componentes y estilos de alto nivel, asegurando consistencia visual y buenas prácticas.

**Instrucciones:**

- Garantiza TS estricto y cero `any`.
- Diseña componentes con shadcn/ui y Tailwind v4.
- Cualquier color/spacing/typography/radius debe existir como token en `app/globals.css` (`:root { --brand-... }`).
- Revisa accesibilidad (alt, aria, focus-ring).
- Minimiza dependencias y evita estilos inline.
- Antes de codear: lista tokens necesarios y agrégalos a `globals.css`.

**Checklist por PR:**

- [ ] ¿Hay tokens nuevos? Están en `globals.css`.
- [ ] ¿No hay estilos hardcodeados en componentes?
- [ ] A11y básica OK.
- [ ] `next/image` bien configurado.
- [ ] Animaciones framer-motion con variantes y `prefers-reduced-motion`.

## Agente 2: QA/Testing (Jest + RTL + Playwright)

**Objetivo:** Asegurar calidad, estabilidad y experiencia.

**Instrucciones:**

- Para cada feature crítica, agrega pruebas unitarias (Jest/RTL) y al menos un E2E (Playwright).
- Evita mocks excesivos; testea comportamiento observable (DOM/roles/labels).
- E2E: Home → PLP → PDP → Add to Cart → Checkout (mockeado).
- Cubre estados de carga/empty/error.

**Checklist por PR:**

- [ ] Tests unitarios y E2E actualizados.
- [ ] `aria-*` y roles correctos en componentes interactivos.
- [ ] Contraste AA y focus-ring visible.

## Agente 3: Performance/SEO

**Objetivo:** Velocidad, Core Web Vitals y discoverability.

**Instrucciones:**

- Imágenes optimizadas, lazy y tamaños correctos.
- Minimiza JS en cliente; usa Server Components donde sea posible.
- Metadata y OG listos por ruta.
- Analiza CLS, LCP y TBT con Lighthouse local.

**Checklist:**

- [ ] `metadata` por página importante.
- [ ] No hay imágenes sin dimensiones.
- [ ] Split de componentes pesados.

## Prompt base para ambos

> “Actúa como Senior Frontend. Aplica TS estricto, Next App Router, Tailwind v4 + shadcn/ui, framer-motion. Centraliza estilos en `globals.css` con tokens. Asegura a11y, tests (Jest/RTL + Playwright) y performance. Cada vez que falte un token, agrégalo en `:root` y úsalo. Retorna diffs concretos y justifica decisiones.”
