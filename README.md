# Fuego Consciente — La raíz de lo que duele

Acompañamiento en situaciones de dolor por Fuego Consciente.

App web del recorrido de siete pasos, con login de Google, histórico por persona
y acompañamiento con terapeuta.

- **Código:** GitHub
- **Servidor y base de datos:** Railway (Next.js + Postgres)
- **Login:** Auth.js con Google
- **Cobro:** aporte por Bre-B, confirmado por el terapeuta desde el panel

## Estado

Fase 1 lista: despliegue, base de datos y login de Google.
Fase 2 pendiente: portar el recorrido completo (7 pasos + descarte), el chat y
los pagos desde el prototipo `../raiz.html`.

---

## Puesta en marcha

### 1. Subir el código a GitHub

```bash
git remote add origin https://github.com/TU-USUARIO/fuego-consciente.git
git branch -M main
git push -u origin main
```

### 2. Crear las credenciales de Google

1. Entra a <https://console.cloud.google.com/> con tu cuenta.
2. Crea un proyecto nuevo llamado `Fuego Consciente`.
3. Menú **APIs y servicios → Pantalla de consentimiento de OAuth**:
   tipo **Externo**, nombre `Fuego Consciente`, tu correo de soporte.
4. Menú **Credenciales → Crear credenciales → ID de cliente de OAuth**:
   tipo **Aplicación web**.
5. En **URIs de redireccionamiento autorizados** agrega estas dos
   (la de Railway la tendrás después del primer despliegue):
   - `http://localhost:3000/api/auth/callback/google`
   - `https://fuego-consciente-production.up.railway.app/api/auth/callback/google`
6. Guarda el **ID de cliente** y el **Secreto**.

### 3. Desplegar en Railway

1. En tu proyecto de Railway: **New → GitHub Repo** y elige `fuego-consciente`.
2. **New → Database → Add PostgreSQL**. Railway inyecta `DATABASE_URL` solo.
3. En el servicio de la app, pestaña **Variables**, agrega:

   | Variable | Valor |
   |---|---|
   | `AUTH_SECRET` | una clave larga al azar |
   | `AUTH_TRUST_HOST` | `true` |
   | `AUTH_GOOGLE_ID` | el ID de cliente de Google |
   | `AUTH_GOOGLE_SECRET` | el secreto de Google |
   | `SUPER_ADMIN_EMAILS` | `zamoranoorozcoangela@gmail.com` |
   | `PAGO_BREB` | `@zamorano091` |

4. **Settings → Networking → Generate Domain** para obtener la URL pública.
5. Vuelve al paso 2.5 y agrega esa URL como URI de redireccionamiento en Google.

### 4. Probar en tu equipo (opcional, necesita Node.js)

```bash
npm install
cp .env.example .env
npm run dev
```

---

## Acceso de SUPER ADMIN

No hay contraseñas guardadas: entras con tu cuenta de Google. Todo correo que
esté en `SUPER_ADMIN_EMAILS` queda con rol `SUPER_ADMIN` automáticamente al
iniciar sesión. Para sumar terapeutas, agrega su correo a esa variable separado
por coma y vuelve a desplegar.

## Estructura

```
prisma/schema.prisma    modelo de datos (usuarios, procesos, salas, mensajes, pagos)
src/auth.ts             configuración de Auth.js y promoción a SUPER ADMIN
src/lib/prisma.ts       cliente de base de datos
src/app/page.tsx        portada y login
src/app/globals.css     diseño heredado del prototipo
```
