# 🗄️ Crear Tablas en la Base de Datos de Render

## ✅ Paso 1: Crear archivo .env

**IMPORTANTE:** Crea manualmente un archivo `.env` en la carpeta `backend-example/` con este contenido:

```env
DATABASE_URL="postgresql://backend_example_db_fq3k_user:0kuvdrd2dxfOgXutKaW3nH7mY4XoqyQ8@dpg-d5ejuangi27c73c5lc50-a:5432/backend_example_db_fq3k?sslmode=require"
JWT_SECRET="tu-secret-jwt-seguro"
JWT_EXPIRES_IN="1h"
PORT=3000
NODE_ENV=development
FRONTEND_URL="http://localhost:5173"
```

**Nota:** Si Render te dio una URL diferente o con otro formato, úsala tal cual. Solo asegúrate de que tenga el formato:
`postgresql://usuario:password@host:puerto/database?sslmode=require`

## ✅ Paso 2: Crear las tablas

Ahora ejecuta uno de estos comandos para crear las tablas en tu base de datos de Render:

### Opción A: Migraciones (Recomendado para producción)

```bash
cd backend-example
npm run prisma:migrate
```

Cuando te pregunte el nombre de la migración, escribe: `init`

Esto creará:
- ✅ Tabla `users` con todos los campos
- ✅ Tabla `products` con todos los campos
- ✅ Índices y constraints (email único, etc.)

### Opción B: Push directo (Más rápido, solo desarrollo)

```bash
cd backend-example
npm run prisma:push
```

Esto sincroniza el schema directamente sin crear archivos de migración.

## ✅ Paso 3: Verificar en TablePlus

1. Abre TablePlus
2. Crea una nueva conexión PostgreSQL con estos datos:
   - **Host:** `dpg-d5ejuangi27c73c5lc50-a`
   - **Port:** `5432` (o el que Render te indique)
   - **User:** `backend_example_db_fq3k_user`
   - **Password:** `0kuvdrd2dxfOgXutKaW3nH7mY4XoqyQ8`
   - **Database:** `backend_example_db_fq3k`
   - **SSL:** ✅ Habilitado/Required

3. Deberías ver las tablas:
   - ✅ `users` - Con campos: id, name, last, telefono, age, isActive, email, password, createdAt, updatedAt
   - ✅ `products` - Con campos: id, name, price, description, isActive, createdAt, updatedAt

## ✅ Paso 4: Probar la conexión

```bash
npm run start:dev
```

Deberías ver en la consola:
```
[PrismaService] Database connection established
```

## 🎉 ¡Listo!

Ahora tienes:
- ✅ Base de datos conectada a Render
- ✅ Tablas creadas con Prisma
- ✅ Listo para usar desde tu aplicación
- ✅ Visible en TablePlus

## 🔧 Si tienes problemas

1. **Error de conexión:** Verifica que la base de datos esté activa en Render
2. **Error de SSL:** Asegúrate de que la URL tenga `?sslmode=require`
3. **Error de autenticación:** Verifica usuario y contraseña en Render
4. **Puerto incorrecto:** Revisa la URL completa en el panel de Render
