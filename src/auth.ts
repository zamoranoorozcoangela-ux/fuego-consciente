import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

/** Correos que entran como SUPER ADMIN, separados por coma en SUPER_ADMIN_EMAILS */
const superAdmins = (process.env.SUPER_ADMIN_EMAILS || "")
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

/** Solo registramos Google cuando sus credenciales existen, para que la app
 *  levante igual mientras se terminan de configurar en Google Cloud. */
export const googleListo = Boolean(
  process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET,
);

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: googleListo ? [Google] : [],
  session: { strategy: "database" },
  pages: { signIn: "/" },
  callbacks: {
    async session({ session, user }) {
      let registro = await prisma.user.findUnique({ where: { id: user.id } });

      // El equipo se promueve solo: si el correo está en la lista, queda SUPER ADMIN.
      const correo = (user.email || "").toLowerCase();
      if (registro && superAdmins.includes(correo) && registro.rol !== "SUPER_ADMIN") {
        registro = await prisma.user.update({
          where: { id: user.id },
          data: { rol: "SUPER_ADMIN" },
        });
      }

      session.user.id = user.id;
      session.user.rol = registro?.rol ?? "USUARIO";
      session.user.creditos = registro?.creditos ?? 0;
      session.user.acompUsados = registro?.acompUsados ?? 0;
      return session;
    },
  },
});

/** Sesión obligatoria: devuelve el usuario o null. */
export async function usuarioActual() {
  const sesion = await auth();
  return sesion?.user ?? null;
}

export function esTerapeuta(rol?: string | null) {
  return rol === "TERAPEUTA" || rol === "SUPER_ADMIN";
}
