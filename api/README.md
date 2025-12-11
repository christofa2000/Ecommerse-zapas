# Zapatillas API

Backend API para el e-commerce de zapatillas sostenibles "Zapatillas".

## Stack Tecnológico

- **Runtime**: Node.js 20+
- **Framework**: NestJS
- **Lenguaje**: TypeScript (estricto)
- **ORM**: Prisma
- **Base de datos**: PostgreSQL
- **Validación**: Zod
- **Testing**: Jest + Supertest

## Estructura del Proyecto

El proyecto está organizado en módulos de dominio:

- `products` - Catálogo de zapatillas
- `users` - Gestión de usuarios y perfiles
- `auth` - Autenticación y autorización (JWT)
- `orders` - Órdenes y checkout

Cada módulo sigue la arquitectura:

- `*.module.ts` - Definición del módulo NestJS
- `*.controller.ts` - Manejo de HTTP (sin lógica de negocio)
- `*.service.ts` - Lógica de negocio
- `*.repository.ts` - Acceso a base de datos (Prisma)
- `*.schemas.ts` - Esquemas Zod y tipos de dominio

## Comandos Disponibles

```bash
# Instalar dependencias
npm install

# Desarrollo (con hot-reload)
npm run start:dev

# Compilar
npm run build

# Producción
npm run start:prod

# Testing
npm test
npm run test:watch
npm run test:e2e

# Linting
npm run lint

# Prisma
npm run prisma:generate  # Generar cliente Prisma
npm run prisma:migrate   # Ejecutar migraciones
npm run prisma:studio    # Abrir Prisma Studio (GUI)
npm run prisma:seed      # Ejecutar seed de datos
```

## Endpoints Disponibles

### Health
- `GET /api/health` - Health check del servicio

### Products
- `GET /api/products` - Listado de productos con filtros y paginación
  - Query params: `page`, `limit`, `category`, `brand`, `minPrice`, `maxPrice`, `size`, `color`, `search`
- `GET /api/products/:id` - Detalle de producto por ID
- `GET /api/products/slug/:slug` - Detalle de producto por slug

### Auth
- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión (devuelve JWT)
- `GET /api/auth/profile` - Obtener perfil del usuario autenticado (requiere JWT)

### Orders
- `POST /api/orders` - Crear una orden (checkout, requiere JWT)
- `GET /api/orders` - Listado de órdenes del usuario (requiere JWT)
- `GET /api/orders/:id` - Detalle de una orden (requiere JWT)

## Configuración Inicial

### 1. Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto `api/` con:

```env
# Base de datos
DATABASE_URL=postgresql://usuario:password@host:5432/database

# JWT (requerido para autenticación)
JWT_SECRET=tu-secret-super-seguro-cambiar-en-produccion
JWT_EXPIRES_IN=1d

# Puerto del servidor (opcional, default: 3001)
PORT=3001
```

### 2. Base de Datos

Asegúrate de tener PostgreSQL corriendo (o usar Neon) y ejecuta las migraciones:

```sql
CREATE DATABASE zapatillas;
```

### 3. Migraciones de Prisma

```bash
# Generar el cliente Prisma
npm run prisma:generate

# Ejecutar migraciones (crea las tablas)
npm run prisma:migrate
```

### 4. Seed (Opcional)

Para poblar la base de datos con datos de ejemplo:

```bash
npm run prisma:seed
```

**Nota**: El seed usa `upsert` basado en `slug`, por lo que:
- Si un producto con el mismo slug ya existe, se actualiza (no se duplica)
- Si no existe, se crea
- Los productos existentes con otros slugs NO se eliminan

### 5. Administración de Productos

Para aprender cómo agregar, editar y gestionar productos, consulta:
- **[PRODUCTS_ADMIN.md](./PRODUCTS_ADMIN.md)** - Guía completa de administración de productos

## Próximos Pasos

1. ✅ Configurar Prisma y PostgreSQL
2. ✅ Implementar módulo `products` (listado + detalle)
3. Implementar módulo `auth` (registro, login, JWT)
4. Implementar módulo `users` (perfiles)
5. Implementar módulo `orders` (checkout)

## Notas

- El servidor corre por defecto en el puerto `3001`
- Todas las rutas tienen el prefijo `/api`
- CORS está configurado para `http://localhost:3000` (frontend Next.js)

