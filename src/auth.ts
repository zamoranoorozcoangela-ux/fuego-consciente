import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

/** Correos que entran como SUPER ADMIN, separados por coma en SUPER_ADMIN_EMAILS */
const superAdmins = (process.env.SUPER_ADMIN_EMAILS || "")
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  session: { strategy: "database" },
  pages: { signIn: "/" },
  callbacks: {
    async session({ session, user }) {
      let actual = user as typeof user & {
        rol: string;
        creditos: number;
        acompUsados: number;
      };

      // El equipo se promueve solo: si el correo está en la lista, queda SUPER ADMIN.
      const correo = (actual.email || "").toLowerCase();
      if (superAdmins.includes(correo) && actual.rol !== "SUPER_ADMIN") {
        actual = (await prisma.user.update({
          where: { id: actual.id },
          data: { rol: "SUPER_ADMIN" },
        })) as typeof actual;
      }

      session.user.id = actual.id;
      session.user.rol = actual.rol;
      session.user.creditos = actual.creditos;
      session.user.acompUsados = actual.acompUsados;
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
