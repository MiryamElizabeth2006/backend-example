# 🚀 Configuración para Base de Datos en Render

## 📋 Paso 1: Crear archivo .env

Crea un archivo `.env` en la carpeta `backend-example/` con el siguiente contenido:

```env
# Base de datos PostgreSQL en Render
DATABASE_URL="postgresql://backend_example_db_fq3k_user:0kuvdrd2dxfOgXutKaW3nH7mY4XoqyQ8@dpg-d5ejuangi27c73c5lc50-a:5432/backend_example_db_fq3k?sslmode=require"

# JWT Configuration
JWT_SECRET="tu-secret-jwt-seguro-cambiar-en-produccion"
JWT_EXPIRES_IN="1h"

# Server Configuration
PORT=3000
NODE_ENV=development

# Frontend URL (opcional)
FRONTEND_URL="http://localhost:5173"
```

**⚠️ IMPORTANTE:** 
- La URL que proporcionaste estaba incompleta, le agregué el puerto `:5432` y `?sslmode=require` que es necesario para Render
- Si Render te dio una URL diferente o con otro puerto, úsala tal cual te la dieron

## 📋 Paso 2: Generar Prisma Client

```bash
cd backend-example
npm run prisma:generate
```

## 📋 Paso 3: Crear las tablas en la base de datos

Tienes dos opciones:

### Opción A: Usar Migraciones (Recomendado)

```bash
npm run prisma:migrate
```

Cuando te pregunte el nombre de la migración, usa: `init`

Esto creará las tablas `users` y `products` en tu base de datos de Render.

### Opción B: Push Directo (Más rápido para desarrollo)

```bash
npm run prisma:push
```

Esto sincroniza el schema directamente sin crear archivos de migración.

## 📋 Paso 4: Verificar en TablePlus

1. Abre TablePlus
2. Crea una nueva conexión PostgreSQL
3. Usa estos datos:
   - **Host:** `dpg-d5ejuangi27c73c5lc50-a`
   - **Port:** `5432` (o el que Render te indique)
   - **User:** `backend_example_db_fq3k_user`
   - **Password:** `0kuvdrd2dxfOgXutKaW3nH7mY4XoqyQ8`
   - **Database:** `backend_example_db_fq3k`
   - **SSL:** Habilitado/Required

4. Deberías ver las tablas:
   - `users`
   - `products`

## 📋 Paso 5: Probar la conexión localmente

```bash
npm run start:dev
```

El servidor debería conectarse a la base de datos de Render y funcionar correctamente.

## 🔧 Para Desplegar en Render

Cuando despliegues el backend en Render como Web Service:

### Variables de Entorno en Render:

1. Ve a tu Web Service en Render
2. Ve a **Environment** → **Environment Variables**
3. Agrega estas variables:

```
DATABASE_URL=postgresql://backend_example_db_fq3k_user:0kuvdrd2dxfOgXutKaW3nH7mY4XoqyQ8@dpg-d5ejuangi27c73c5lc50-a:5432/backend_example_db_fq3k?sslmode=require
JWT_SECRET=tu-secret-jwt-seguro-aqui
JWT_EXPIRES_IN=1h
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://tu-frontend-url.render.com
```

### Build Command en Render:

```bash
npm install && npm run prisma:generate && npm run build
```

### Start Command en Render:

```bash
npm run start:prod
```

## ⚠️ Notas Importantes

- **Nunca** subas el archivo `.env` al repositorio (ya está en `.gitignore`)
- La URL de Render puede tener un formato ligeramente diferente, úsala tal cual te la proporcionan
- Si tienes problemas de conexión, verifica que la base de datos esté activa en Render
- Para producción, usa migraciones (`prisma migrate`) en lugar de `prisma push`

## 🎉 ¡Listo!

Una vez completados estos pasos, tendrás:
- ✅ Base de datos configurada en Render
- ✅ Tablas creadas con Prisma
- ✅ Conexión funcionando localmente
- ✅ Listo para desplegar el backend en Render
