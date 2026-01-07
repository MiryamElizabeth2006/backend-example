# 🔍 Verificación de Conexión a Base de Datos

## ⚠️ IMPORTANTE: Archivo .env Requerido

Para que el servidor se conecte a la base de datos, necesitas crear un archivo `.env` en la carpeta `backend-example/` con:

```env
DATABASE_URL="postgresql://backend_example_db_fq3k_user:0kuvdrd2dxfOgXutKaW3nH7mY4XoqyQ8@dpg-d5ejuangi27c73c5lc50-a:5432/backend_example_db_fq3k?sslmode=require"
JWT_SECRET="tu-secret-jwt"
JWT_EXPIRES_IN="1h"
PORT=3000
NODE_ENV=development
FRONTEND_URL="http://localhost:5173"
```

## ✅ Qué Deberías Ver si Todo Funciona

Cuando inicies el servidor con `npm run start:dev`, deberías ver:

```
[Nest] Starting Nest application...
[PrismaService] ✅ Database connection established
[Nest] Nest application successfully started
Server listening on port 3000
```

## ❌ Si Ves Errores

### Error: "Failed to connect to database"

**Causas posibles:**
1. No existe el archivo `.env`
2. La `DATABASE_URL` está incorrecta
3. La base de datos no está activa en Render
4. Problemas de red/firewall

**Solución:**
1. Verifica que el archivo `.env` exista
2. Verifica la URL en el panel de Render
3. Asegúrate de que la base de datos esté activa

### Error: "Cannot find module '@prisma/client'"

**Solución:**
```bash
npm run prisma:generate
```

### Error: "Prisma Client not generated"

**Solución:**
```bash
npm install
npm run prisma:generate
```

## 🧪 Probar la Conexión

Una vez que el servidor esté corriendo, puedes probar:

```bash
# Obtener usuarios
curl http://localhost:3000/users

# Obtener productos
curl http://localhost:3000/products
```

Si recibes respuestas (aunque estén vacías), significa que la conexión funciona.
