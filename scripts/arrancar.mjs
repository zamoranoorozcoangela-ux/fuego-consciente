/**
 * Arranque en Railway.
 *
 * La red privada donde vive Postgres tarda unos segundos en quedar lista
 * después de que el contenedor empieza. Si Prisma intenta conectarse antes,
 * el proceso muere y el dominio responde 502 sin explicar nada.
 *
 * Aquí reintentamos la preparación de la base y, pase lo que pase, dejamos
 * el servidor web arriba: es preferible una página con un error legible a
 * un 502 mudo.
 */
import { spawn, spawnSync } from "node:child_process";

const PUERTO = "3000";
const INTENTOS = 5;
const ESPERA_MS = 4000;

const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function prepararBaseUnaVez() {
  const r = spawnSync("prisma", ["db", "push", "--skip-generate"], {
    stdio: "inherit",
    shell: true,
  });
  return r.status === 0;
}

async function prepararBase() {
  if (!process.env.DATABASE_URL) {
    console.error("[arranque] Falta la variable DATABASE_URL: no puedo preparar la base.");
    return false;
  }
  for (let intento = 1; intento <= INTENTOS; intento++) {
    if (prepararBaseUnaVez()) {
      console.log("[arranque] Base lista.");
      return true;
    }
    if (intento < INTENTOS) {
      console.log(
        `[arranque] La base no respondió (intento ${intento} de ${INTENTOS}). Reintento en ${ESPERA_MS / 1000}s.`,
      );
      await esperar(ESPERA_MS);
    }
  }
  console.error("[arranque] No se pudo preparar la base tras varios intentos.");
  return false;
}

const listo = await prepararBase();
if (!listo) {
  console.error("[arranque] Levanto el servidor igual para que el error se vea en la web.");
}

const servidor = spawn("next", ["start", "-p", PUERTO], {
  stdio: "inherit",
  shell: true,
});
servidor.on("exit", (codigo) => process.exit(codigo ?? 1));
