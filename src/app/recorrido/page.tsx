import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Recorrido from "@/components/Recorrido";
import type { DatosProceso } from "@/app/acciones";

export const dynamic = "force-dynamic";

export default async function PaginaRecorrido() {
  const sesion = await auth();
  const usuario = sesion?.user ?? null;

  let procesoInicial: { id: string; datos: DatosProceso } | null = null;
  if (usuario) {
    const ultimo = await prisma.proceso.findFirst({
      where: { userId: usuario.id },
      orderBy: { actualizado: "desc" },
    });
    if (ultimo) {
      procesoInicial = { id: ultimo.id, datos: ultimo.datos as DatosProceso };
    }
  }

  return <Recorrido hayCuenta={Boolean(usuario)} procesoInicial={procesoInicial} />;
}
