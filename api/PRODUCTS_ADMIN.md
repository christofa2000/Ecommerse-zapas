# 📦 Guía de Administración de Productos

Esta guía explica cómo agregar, editar y gestionar productos en la base de datos usando Prisma Studio y el seed.

## 🎯 Fuente de Verdad

**La fuente de verdad para productos es la base de datos PostgreSQL (Neon).**

- El backend (`/api/products`) lee directamente de la base de datos.
- El frontend (`/es/productos`) consume el backend.
- El seed (`prisma/seed.ts`) sincroniza productos iniciales/demo.

## 📋 Campos del Modelo Product

### Campos Básicos

- **`id`**: String (CUID, generado automáticamente)
- **`name`**: String (requerido) - Nombre del producto
- **`slug`**: String (requerido, único) - URL amigable (ej: `runner-natural`)
- **`description`**: String (opcional) - Descripción del producto
- **`price`**: Decimal (requerido) - Precio en formato decimal (ej: `89.99`)
- **`image`**: String (opcional) - URL de imagen principal
- **`images`**: String[] (array) - Array de URLs de imágenes adicionales
- **`brand`**: String (opcional) - Marca del producto
- **`category`**: String (opcional) - Categoría (ej: `running`, `casual`, `unisex`)
- **`stock`**: Int (requerido, default: 0) - Stock total disponible
- **`isActive`**: Boolean (requerido, default: true) - Si está activo y visible

### Campos Array: `sizes` y `colors`

- **`sizes`**: String[] - Array de talles disponibles (ej: `["38", "39", "40", "41", "42"]`)
- **`colors`**: String[] - Array de colores disponibles (ej: `["blanco", "negro", "gris"]`)

## 🛠️ Cómo Editar Productos en Prisma Studio

### 1. Abrir Prisma Studio

```bash
cd api
npm run prisma:studio
```

Esto abrirá Prisma Studio en `http://localhost:5555`

### 2. Editar Campos Simples

1. Click en el modelo **Product**
2. Click en el producto que quieres editar
3. Edita los campos de texto directamente:
   - `name`, `slug`, `description`, `brand`, `category`
   - `price` (número decimal, ej: `89.99`)
   - `stock` (número entero)
   - `isActive` (checkbox)

### 3. Editar Arrays: `sizes` y `colors`

**Importante**: `sizes` y `colors` son arrays de strings (`String[]`).

#### En Prisma Studio:

1. Click en el campo `sizes` o `colors`
2. Verás un editor de array con botones `+` y `-`
3. Para agregar un valor:
   - Click en `+`
   - Escribe el valor (ej: `"40"` para sizes o `"blanco"` para colors)
   - Presiona Enter
4. Para eliminar un valor:
   - Click en el `-` al lado del valor
5. Para editar un valor:
   - Click en el valor y edítalo directamente

#### Ejemplo de valores válidos:

**sizes:**
```
["38", "39", "40", "41", "42", "43", "44"]
```

**colors:**
```
["blanco", "negro", "gris"]
```

### 4. Editar Array: `images`

Similar a `sizes` y `colors`, pero con URLs:
```
["/images/zapas-blancas.png", "/images/zapas-blancas2.png"]
```

### 5. Guardar Cambios

- Click en **"Save 1 change"** o presiona `Ctrl+S` / `Cmd+S`
- Los cambios se guardan inmediatamente en la base de datos

## 🌱 Usar el Seed para Sincronizar Productos

### ¿Qué hace el seed?

El seed (`prisma/seed.ts`) usa `upsert` basado en `slug`:

- ✅ **Si un producto con el mismo `slug` ya existe**: Se **actualiza** con los nuevos datos
- ✅ **Si no existe**: Se **crea** un nuevo producto
- ✅ **Los productos con otros slugs NO se eliminan**: Solo se procesan los productos del seed

### Ejecutar el seed

```bash
cd api
npm run prisma:seed
```

### Agregar un producto nuevo al seed

1. Abre `api/prisma/seed.ts`
2. Agrega un nuevo objeto al array `products`:

```typescript
{
  name: 'Nuevo Producto',
  slug: 'nuevo-producto', // IMPORTANTE: debe ser único
  description: 'Descripción del producto',
  price: 99.99,
  image: '/images/nuevo-producto.jpg',
  images: ['/images/nuevo-producto.jpg'],
  brand: 'Zapatillas',
  category: 'running',
  sizes: ['38', '39', '40', '41', '42'],
  colors: ['blanco', 'negro'],
  stock: 50,
  isActive: true,
}
```

3. Ejecuta `npm run prisma:seed`

## ✅ Buenas Prácticas

### Slug

- ✅ **Debe ser único** (no puede haber dos productos con el mismo slug)
- ✅ **Usar formato kebab-case**: `runner-natural`, `tree-skipper`
- ✅ **Sin espacios ni caracteres especiales**: usar guiones
- ✅ **Descriptivo**: que refleje el nombre del producto

### isActive

- ✅ **`true`**: Producto visible en la PLP y PDP
- ❌ **`false`**: Producto oculto (no aparece en búsquedas, pero se mantiene en la BD)

### price

- ✅ **Formato decimal**: `89.99`, `119.00`
- ✅ **Sin símbolos**: no usar `$89.99` o `89,99`
- ✅ **Consistente**: usar 2 decimales cuando sea posible

### images

- ✅ **Array no vacío**: al menos una imagen
- ✅ **Rutas relativas**: `/images/producto.jpg` (no URLs absolutas)
- ✅ **Primera imagen**: debe ser la imagen principal (usada en cards)

### sizes y colors

- ✅ **Valores consistentes**: usar los mismos valores en todos los productos
- ✅ **Formato string**: `"40"` no `40` (número)
- ✅ **Minúsculas para colors**: `"blanco"` no `"Blanco"`

## 🔍 Verificar Productos

### En el Backend

```bash
# Ver todos los productos
curl http://localhost:3001/api/products

# Ver un producto por slug
curl http://localhost:3001/api/products/slug/runner-natural
```

### En Prisma Studio

1. Abre Prisma Studio: `npm run prisma:studio`
2. Click en **Product**
3. Verás la lista completa de productos

### En el Frontend

- **PLP**: `http://localhost:3000/es/productos`
- **PDP**: `http://localhost:3000/es/productos/[slug]`

## ⚠️ Problemas Comunes

### "Producto no encontrado" (404)

**Causa**: El slug no existe en la base de datos.

**Solución**:
1. Verifica en Prisma Studio que el producto existe
2. Verifica que el slug sea exactamente igual (case-sensitive)
3. Verifica que `isActive` sea `true`

### Productos duplicados

**Causa**: Se crearon productos con slugs diferentes manualmente.

**Solución**:
1. En Prisma Studio, elimina los duplicados manualmente
2. O usa el seed para sincronizar (actualizará productos existentes)

### Arrays vacíos en Prisma Studio

**Causa**: No se agregaron valores al array.

**Solución**:
1. Click en el campo del array
2. Click en `+` para agregar valores
3. Guarda los cambios

## 📝 Notas Importantes

- **El seed NO elimina productos**: Solo crea/actualiza los productos que están en el array
- **Los productos agregados manualmente en Prisma Studio se mantienen** (a menos que los elimines manualmente)
- **La home (`/`) usa datos mock** (`lib/products/sample.ts`) - ver comentarios en `app/[lang]/(marketing)/page.tsx`
- **La PLP (`/es/productos`) usa SOLO datos del backend** - fuente de verdad




