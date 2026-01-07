# 🚀 Guía Completa para Desplegar Backend en Render

## 📋 Requisitos Previos

- ✅ Base de datos PostgreSQL creada en Render
- ✅ Tablas creadas en la base de datos (users y products)
- ✅ Repositorio Git con el código del backend

## 🔧 Paso 1: Configurar el Repositorio

Asegúrate de que tu código esté en un repositorio Git (GitHub, GitLab, Bitbucket).

## 🔧 Paso 2: Crear Web Service en Render

1. Ve a [Render Dashboard](https://dashboard.render.com)
2. Haz clic en **"New +"** → **"Web Service"**
3. Conecta tu repositorio
4. Configura el servicio:

### Configuración Básica

- **Name:** `backend-example` (o el nombre que prefieras)
- **Environment:** `Node`
- **Region:** Elige la región más cercana
- **Branch:** `main` o `master` (según tu repositorio)
- **Root Directory:** `backend-example` (si tu repo tiene la carpeta backend-example)

### Build Command

```bash
npm install && npm run prisma:generate && npm run build
```

### Start Command

```bash
npm run start:prod
```

## 🔧 Paso 3: Configurar Variables de Entorno

En el panel de Render, ve a **Environment** → **Environment Variables** y agrega:

### Variables Requeridas

```env
DATABASE_URL=postgresql://backend_example_db_fq3k_user:0kuvdrd2dxfOgXutKaW3nH7mY4XoqyQ8@dpg-d5ejuangi27c73c5lc50-a:5432/backend_example_db_fq3k?sslmode=require
JWT_SECRET=tu-secret-jwt-muy-seguro-aqui-cambiar
JWT_EXPIRES_IN=1h
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://tu-frontend-url.render.com
```

**⚠️ IMPORTANTE:**
- Usa la URL completa de tu base de datos de Render
- El `JWT_SECRET` debe ser una cadena larga y aleatoria (usa un generador de secrets)
- `FRONTEND_URL` debe ser la URL de tu frontend desplegado

### Obtener DATABASE_URL de Render

1. Ve a tu base de datos PostgreSQL en Render
2. En la sección **"Connections"** encontrarás la **Internal Database URL**
3. Cópiala completa y úsala como `DATABASE_URL`

## 🔧 Paso 4: Configuración Avanzada (Opcional)

### Health Check

Render puede verificar que tu servicio esté funcionando. Agrega un endpoint de health:

En `src/app.controller.ts`:

```typescript
@Get('health')
health() {
  return { status: 'ok', timestamp: new Date().toISOString() };
}
```

Luego en Render, configura:
- **Health Check Path:** `/health`

### Auto-Deploy

- **Auto-Deploy:** `Yes` (se despliega automáticamente en cada push)

## 🔧 Paso 5: Desplegar

1. Haz clic en **"Create Web Service"**
2. Render comenzará a construir y desplegar tu aplicación
3. Puedes ver los logs en tiempo real
4. Cuando termine, tendrás una URL como: `https://backend-example.onrender.com`

## ✅ Verificación Post-Deploy

1. **Verifica los logs:**
   - Deberías ver: `✅ Database connection established`
   - No debería haber errores de conexión

2. **Prueba los endpoints:**
   ```bash
   # Health check
   curl https://tu-backend.onrender.com/health
   
   # Obtener usuarios
   curl https://tu-backend.onrender.com/users
   
   # Obtener productos
   curl https://tu-backend.onrender.com/products
   ```

3. **Verifica en TablePlus:**
   - Conecta a tu base de datos de Render
   - Verifica que las tablas existan
   - Puedes insertar datos de prueba desde la API

## 🐛 Solución de Problemas

### Error: "Cannot find module '@prisma/client'"

**Solución:** Asegúrate de que el Build Command incluya `npm run prisma:generate`:
```bash
npm install && npm run prisma:generate && npm run build
```

### Error: "Database connection failed"

**Solución:**
1. Verifica que `DATABASE_URL` esté correctamente configurada
2. Asegúrate de usar la **Internal Database URL** (no la externa)
3. Verifica que la base de datos esté activa en Render

### Error: "Port already in use"

**Solución:** Render asigna el puerto automáticamente. Asegúrate de usar:
```typescript
const port = process.env.PORT || 3000;
```

### Error: "Prisma Client not generated"

**Solución:** 
1. Verifica que `prisma generate` se ejecute en el Build Command
2. Verifica que el archivo `prisma/schema.prisma` esté en el repositorio

## 📝 Checklist Final

Antes de desplegar, verifica:

- [ ] Código en repositorio Git
- [ ] `prisma/schema.prisma` está en el repo
- [ ] `.env` NO está en el repo (está en `.gitignore`)
- [ ] Variables de entorno configuradas en Render
- [ ] Build Command incluye `prisma:generate`
- [ ] Start Command es `npm run start:prod`
- [ ] Base de datos activa en Render
- [ ] Tablas creadas en la base de datos

## 🎉 ¡Listo!

Una vez desplegado, tu backend estará disponible en:
- **URL:** `https://tu-backend.onrender.com`
- **API Base:** `https://tu-backend.onrender.com/api` (si configuraste un prefijo)

Puedes usar esta URL en tu frontend para hacer las peticiones a la API.
