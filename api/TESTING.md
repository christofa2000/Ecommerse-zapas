# 🧪 Guía de Pruebas de Endpoints

Esta guía te ayudará a probar los endpoints de la API de diferentes maneras.

## 📋 Prerequisitos

1. **Servidor corriendo**: El backend debe estar activo
   ```bash
   cd api
   npm run start:dev
   ```

2. **Base de datos configurada**: PostgreSQL debe estar corriendo y con datos
   ```bash
   # Si no tienes datos, ejecuta el seed:
   npm run prisma:seed
   ```

## 🚀 Opción 1: Script Automatizado (Recomendado)

El script prueba todos los endpoints automáticamente:

```bash
cd api
npm run test:endpoints
```

Este script prueba:
- ✅ Health check
- ✅ Listado básico de productos
- ✅ Listado con filtros
- ✅ Búsqueda
- ✅ Detalle por ID
- ✅ Detalle por slug
- ✅ Manejo de errores (404, validación)

## 🌐 Opción 2: Navegador

Abre tu navegador y visita:

- Health: http://localhost:3001/api/health
- Productos: http://localhost:3001/api/products
- Con filtros: http://localhost:3001/api/products?category=unisex&limit=5

## 💻 Opción 3: cURL (Terminal)

### Health Check
```bash
curl http://localhost:3001/api/health
```

### Listado de productos
```bash
# Básico
curl http://localhost:3001/api/products

# Con paginación
curl "http://localhost:3001/api/products?page=1&limit=5"

# Con filtros
curl "http://localhost:3001/api/products?category=unisex&minPrice=50&maxPrice=150"

# Búsqueda
curl "http://localhost:3001/api/products?search=sostenibles"
```

### Detalle de producto
```bash
# Por ID (reemplaza CLXXX... con un ID real de tu BD)
curl http://localhost:3001/api/products/clxxx1234567890

# Por slug
curl http://localhost:3001/api/products/slug/zapatillas-sostenibles-clasicas
```

### Formato JSON bonito (con jq, opcional)
```bash
curl http://localhost:3001/api/products | jq
```

## 🛠️ Opción 4: Postman / Insomnia / Thunder Client

### Importar colección

Crea una nueva colección con estos endpoints:

**Base URL**: `http://localhost:3001/api`

**Endpoints:**

1. **GET** `/health`
   - Sin parámetros

2. **GET** `/products`
   - Query params:
     - `page` (number, default: 1)
     - `limit` (number, default: 12, max: 100)
     - `category` (string, opcional)
     - `brand` (string, opcional)
     - `minPrice` (number, opcional)
     - `maxPrice` (number, opcional)
     - `size` (string, opcional)
     - `color` (string, opcional)
     - `search` (string, opcional)

3. **GET** `/products/:id`
   - Path param: `id` (string, formato cuid)

4. **GET** `/products/slug/:slug`
   - Path param: `slug` (string)

### Ejemplos de requests en Postman

**Listado con filtros:**
```
GET http://localhost:3001/api/products?category=unisex&minPrice=80&maxPrice=120&limit=10
```

**Búsqueda:**
```
GET http://localhost:3001/api/products?search=running&limit=5
```

## 📝 Opción 5: Node.js / TypeScript

Puedes usar el script de prueba como referencia:

```typescript
// test-manual.ts
const API_BASE = 'http://localhost:3001/api';

async function test() {
  const response = await fetch(`${API_BASE}/products?page=1&limit=5`);
  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

test();
```

Ejecutar:
```bash
ts-node test-manual.ts
```

## ✅ Respuestas Esperadas

### Health Check
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "service": "zapatillas-api"
}
```

### Listado de Productos
```json
{
  "data": [
    {
      "id": "clxxx...",
      "name": "Zapatillas Sostenibles Clásicas",
      "slug": "zapatillas-sostenibles-clasicas",
      "price": 89.99,
      "category": "unisex",
      ...
    }
  ],
  "meta": {
    "page": 1,
    "limit": 12,
    "total": 3,
    "totalPages": 1
  }
}
```

### Detalle de Producto
```json
{
  "data": {
    "id": "clxxx...",
    "name": "Zapatillas Sostenibles Clásicas",
    "slug": "zapatillas-sostenibles-clasicas",
    "description": "Zapatillas cómodas...",
    "price": 89.99,
    ...
  }
}
```

### Error 404
```json
{
  "statusCode": 404,
  "message": "Producto con ID clxxx999... no encontrado",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "path": "/api/products/clxxx999..."
}
```

### Error de Validación (400)
```json
{
  "statusCode": 400,
  "message": "Error de validación",
  "errors": [
    {
      "path": "limit",
      "message": "Number must be less than or equal to 100"
    }
  ],
  "timestamp": "2024-01-15T10:30:00.000Z",
  "path": "/api/products"
}
```

## 🔍 Verificar Datos en la Base de Datos

Si quieres ver qué productos hay en la BD:

```bash
# Abrir Prisma Studio (GUI)
npm run prisma:studio
```

O consultar directamente en PostgreSQL:
```sql
SELECT id, name, slug, price, stock FROM products WHERE "isActive" = true;
```

## 🐛 Troubleshooting

### Error: "Cannot connect to database"
- Verifica que PostgreSQL esté corriendo
- Revisa la `DATABASE_URL` en `.env`
- Ejecuta `npm run prisma:generate` y `npm run prisma:migrate`

### Error: "No products found"
- Ejecuta el seed: `npm run prisma:seed`
- Verifica en Prisma Studio que haya productos activos

### Error: "Port 3001 already in use"
- Cambia el puerto en `.env`: `PORT=3002`
- O mata el proceso que usa el puerto 3001

### Error: "ECONNREFUSED"
- Asegúrate de que el servidor esté corriendo: `npm run start:dev`
- Verifica que esté en el puerto correcto (3001 por defecto)





