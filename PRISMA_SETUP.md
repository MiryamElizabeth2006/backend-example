# Configuración de Prisma

Este proyecto ahora usa **Prisma** como ORM en lugar de TypeORM.

## 📋 Requisitos Previos

1. PostgreSQL instalado y corriendo (local o en Render)
2. Node.js y npm instalados

## 🚀 Configuración Inicial

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto `backend-example` con la siguiente estructura:

```env
# Base de datos PostgreSQL
DATABASE_URL="postgresql://usuario:password@host:puerto/database?schema=public"

# Para desarrollo local con Docker:
# DATABASE_URL="postgresql://admin:123456@localhost:5432/nest_db?schema=public"

# Para Render (usa la URL completa que te proporciona Render):
# DATABASE_URL="postgresql://usuario:password@dpg-xxxxx.render.com:5432/database"

# JWT
JWT_SECRET="tu-secret-jwt-seguro-aqui"
JWT_EXPIRES_IN="1h"

# Servidor
PORT=3000
NODE_ENV=development

# Frontend (opcional)
FRONTEND_URL="http://localhost:5173"
```

### 3. Generar el cliente de Prisma

```bash
npm run prisma:generate
```

O simplemente:

```bash
npx prisma generate
```

### 4. Crear las tablas en la base de datos

Tienes dos opciones:

#### Opción A: Usar migraciones (recomendado para producción)

```bash
npm run prisma:migrate
```

Esto creará una migración y la aplicará a la base de datos.

#### Opción B: Sincronizar el schema (solo desarrollo)

```bash
npm run prisma:push
```

Esto sincroniza el schema sin crear migraciones (útil para desarrollo rápido).

### 5. Iniciar el servidor

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

## 📝 Scripts Disponibles

- `npm run prisma:generate` - Genera el cliente de Prisma
- `npm run prisma:migrate` - Crea y aplica migraciones
- `npm run prisma:push` - Sincroniza el schema sin migraciones
- `npm run prisma:studio` - Abre Prisma Studio (interfaz visual para la BD)

## 🗄️ Modelos de Base de Datos

### User (users)
- `id`: Int (auto-increment)
- `name`: String
- `last`: String
- `telefono`: String
- `age`: Int
- `isActive`: Boolean (default: true)
- `email`: String (único)
- `password`: String (hasheado)
- `createdAt`: DateTime
- `updatedAt`: DateTime

### Product (products)
- `id`: Int (auto-increment)
- `name`: String
- `price`: Decimal(10, 2)
- `description`: String
- `isActive`: Boolean (default: true)
- `createdAt`: DateTime
- `updatedAt`: DateTime

## 🔧 Para Render

1. Crea una base de datos PostgreSQL en Render
2. Copia la `DATABASE_URL` completa que Render te proporciona
3. Agrégala como variable de entorno en tu Web Service de Render
4. En el Build Command de Render, asegúrate de incluir:
   ```bash
   npm install && npm run prisma:generate && npm run build
   ```
5. En el Start Command:
   ```bash
   npm run start:prod
   ```

## ⚠️ Notas Importantes

- **Nunca** subas el archivo `.env` al repositorio
- El cliente de Prisma se genera automáticamente en `node_modules/.prisma/client`
- Las migraciones se guardan en `prisma/migrations/`
- Usa `prisma:push` solo en desarrollo, usa migraciones en producción
