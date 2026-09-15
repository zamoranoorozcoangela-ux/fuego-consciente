"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NECESIDADES } from "@/lib/necesidades";
import type { Prisma } from "@prisma/client";

export type DatosProceso = Record<string, unknown> & {
  palabra?: string;
  necesidad?: string | null;
  paso?: number;
};

/** Guarda el proceso en curso. Devuelve su id, o null si no hay sesión. */
export async function guardarProceso(
  id: string | null,
  datos: DatosProceso,
): Promise<string | null> {
  const sesion = await auth();
  if (!sesion?.user) return null;

  const necesidad = NECESIDADES.find((n) => n.id === datos.necesidad);
  const campos = {
    palabra: String(datos.palabra ?? "").slice(0, 200),
    necesidadId: String(datos.necesidad ?? ""),
    necesidad: necesidad?.nombre ?? "",
    paso: Number(datos.paso ?? 1),
    datos: datos as Prisma.InputJsonValue,
  };

  if (id) {
    const propio = await prisma.proceso.findFirst({
      where: { id, userId: sesion.user.id },
      select: { id: true },
    });
    if (propio) {
      await prisma.proceso.update({ where: { id }, data: campos });
      return id;
    }
  }

  const creado = await prisma.proceso.create({
    data: { ...campos, userId: sesion.user.id },
  });
  return creado.id;
}

/** Histórico: los procesos de quien tiene la sesión abierta. */
export async function listarProcesos() {
  const sesion = await auth();
  if (!sesion?.user) return [];
  return prisma.proceso.findMany({
    where: { userId: sesion.user.id },
    orderBy: { actualizado: "desc" },
    take: 30,
    select: {
      id: true,
      palabra: true,
      necesidad: true,
      paso: true,
      actualizado: true,
    },
  });
}

/** Abre uno del histórico para releerlo o continuarlo. */
export async function cargarProceso(id: string) {
  const sesion = await auth();
  if (!sesion?.user) return null;
  const proceso = await prisma.proceso.findFirst({
    where: { id, userId: sesion.user.id },
  });
  if (!proceso) return null;
  return { id: proceso.id, datos: proceso.datos as DatosProceso };
}
