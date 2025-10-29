# PlanMaestro — Web estilo Allbirds (zapatillas)

## 0) Principios

- **Diseño centralizado:** todos los estilos viven en `app/globals.css` via **tokens CSS** (`:root { --brand-... }`).
- **Componentes reusables:** shadcn/ui como base + utilidades Tailwind v4.
- **A11y & Performance first:** contraste, focus, imágenes optimizadas, Server Components donde aplique.
- **Testing continuo:** Jest/RTL (unidad/integración) + Playwright (E2E) desde el día 1.

## 1) Estructura inicial

app/
(marketing)/
page.tsx # Home (Hero, grid de productos, highlights)
productos/
page.tsx # PLP
[slug]/page.tsx # PDP
carrito/
page.tsx
layout.tsx
globals.css # <-- tokens y estilos globales ÚNICOS
components/
ui/ # componentes shadcn añadidos
shared/ # wrappers, secciones, CTA, etc.
lib/
products/ # data fetching, mappers
utils/ # helpers (clsx, formatters)
tests/
e2e/ # Playwright
unit/ # Jest/RTL

css
Copiar código

## 2) Tokens y estilos en `globals.css`

- Mantener **toda** la identidad visual aquí.
- Ejemplo (primer borrador):

```css
/* app/globals.css */
@import "tailwindcss";

/* Reset mínimo y helpers */
*,*::before,*::after{box-sizing:border-box}
html,body{height:100%}
body{margin:0;font-family:var(--font-sans, ui-sans-serif);background:var(--bg);color:var(--fg)}
img,video{max-width:100%;height:auto}

/* Design Tokens */
:root{
  /* Paleta base */
  --bg: #ffffff;
  --fg: #0b0b17;

  /* Marca (inspiración Allbirds: suaves, naturales, premium) */
  --brand-50:#f5f7f6;
  --brand-100:#e7eeeb;
  --brand-200:#cadbd4;
  --brand-300:#a5c2b8;
  --brand-400:#7ea79b;
  --brand-500:#5f8e82;  /* primario */
  --brand-600:#4f786d;
  --brand-700:#3f6158;
  --brand-800:#2f4a43;
  --brand-900:#223833;

  /* Tipografía y tamaños */
  --radius: 14px;
  --shadow-sm: 0 1px 2px rgba(0,0,0,.06);
  --shadow-md: 0 6px 24px rgba(0,0,0,.08);
}

/* Utilidades */
@layer utilities {
  .focus-ring { outline: none; box-shadow: 0 0 0 3px color-mix(in oklab, var(--brand-500) 40%, white 60%); border-radius: var(--radius); }
  .card-soft { border-radius: var(--radius); box-shadow: var(--shadow-md); background: white; }
}
Cualquier cambio de color/spacing/radius/typography se hace aquí agregando/modificando tokens.

3) Rutas y MVP
Home: Hero con value prop, grid de “más vendidos”, sección materiales, CTA.

PLP (productos): filtros básicos (categoría, color, talle), tarjetas con imagen + precio.

PDP: galería, talles, materiales, reseñas mock, “Add to Cart”.

Carrito: listado, total, CTA checkout (mock).

Footer/Header: navegación clara + accesible.

4) Componentes base (shadcn/ui)
Button, Card, NavigationMenu, Badge, Separator, Input, Textarea, Label.

Extender estilo usando utilidades basadas en tokens (bg-[var(--brand-500)], rounded-[var(--radius)], etc.).

5) Animaciones (framer-motion)
Aplicar en secciones clave (hero, product cards hover, transiciones suaves).

Respetar prefers-reduced-motion.

6) Testing
Jest/RTL: unit & integration para UI crítica (card producto, add-to-cart, filtros).

Playwright: E2E del flujo Home → PLP → PDP → Cart → Checkout (mock).

Mantener data-testid mínimos y semántica primero (getByRole, getByLabelText).

7) Performance & SEO
next/image con sizes adecuado.

Metadata por página (title/description/OG).

Evitar third-parties pesados sin necesidad.

8) Roadmap (fases)
MVP estático (catálogo mock, UI final, tokens definidos).

Cart client-side + persistencia simple (localStorage/zustand).

Búsqueda/filters y colecciones.

Contenido editorial (materiales, sostenibilidad).

Integración headless commerce (opcional).
```
