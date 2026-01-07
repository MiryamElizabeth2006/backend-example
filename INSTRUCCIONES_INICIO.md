# 🚀 Instrucciones para Iniciar el Servidor

## 📋 Paso 1: Crear archivo .env

**IMPORTANTE:** Antes de iniciar el servidor, crea un archivo `.env` en la carpeta `backend-example/` con este contenido:

```env
DATABASE_URL="postgresql://backend_example_db_fq3k_user:0kuvdrd2dxfOgXutKaW3nH7mY4XoqyQ8@dpg-d5ejuangi27c73c5lc50-a:5432/backend_example_db_fq3k?sslmode=require"
JWT_SECRET="mi-secret-jwt-super-seguro-12345"
JWT_EXPIRES_IN="1h"
PORT=3000
NODE_ENV=development
FRONTEND_URL="http://localhost:5173"
```

## 📋 Paso 2: Generar Prisma Client

```bash
cd backend-example
npm run prisma:generate
```

## 📋 Paso 3: Iniciar el Servidor

```bash
npm run start:dev
```

## ✅ Salida Esperada

Si todo está correcto, deberías ver algo como:

```
> project-example@0.0.1 start:dev
> prisma generate && nest start --watch

Loaded Prisma config from prisma.config.ts.
Prisma schema loaded from prisma\schema.prisma.

✔ Generated Prisma Client (v7.2.0) to .\node_modules\@prisma\client in XXms

[Nest] Starting Nest application...
[PrismaService] ✅ Database connection established
[InstanceLoader] PrismaModule dependencies initialized
[InstanceLoader] ConfigModule dependencies initialized
[InstanceLoader] AppModule dependencies initialized
[Nest] Nest application successfully started
Server listening on port 3000
```

## 🧪 Probar que Funciona

Abre otra terminal y prueba:

```bash
# Obtener usuarios (debería devolver [])
curl http://localhost:3000/users

# Obtener productos (debería devolver [])
curl http://localhost:3000/products
```

Si recibes respuestas JSON (aunque estén vacías), significa que todo funciona correctamente.

## ❌ Si Hay Errores

### Error: "Failed to connect to database"

1. Verifica que el archivo `.env` exista y tenga la `DATABASE_URL` correcta
2. Verifica que la base de datos esté activa en Render
3. Verifica que la URL tenga el formato correcto con `?sslmode=require`

### Error: "Cannot find module '@prisma/client'"

Ejecuta:
```bash
npm run prisma:generate
```

### Error: "EADDRINUSE: address already in use"

Alguien ya está usando el puerto 3000. Cambia el puerto en `.env`:
```env
PORT=3001
```

## 🎯 Siguiente Paso

Una vez que el servidor esté funcionando correctamente, puedes:
1. Probar los endpoints con Postman o curl
2. Conectar tu frontend
3. Desplegar en Render siguiendo `DEPLOY_RENDER.md`
