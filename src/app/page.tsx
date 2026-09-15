import { auth, signIn, signOut, esTerapeuta, googleListo } from "@/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Portada() {
  const sesion = await auth();
  const usuario = sesion?.user;

  const procesos = usuario
    ? await prisma.proceso.count({ where: { userId: usuario.id } })
    : 0;

  return (
    <div className="wrap">
      <header className="portada">
        <div className="marca-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-completo.png" alt="Fuego Consciente" />
        </div>

        <div className="marca">
          <span className="chispa" />
          Cali · Terapia integral
        </div>

        <h1 className="titulo">
          La raíz
          <br />
          de lo que
          <br />
          te duele
        </h1>

        <p className="bajada">
          Una situación de los últimos cinco días casi nunca es el origen. Es la{" "}
          <strong>brasa</strong> que quedó encendida de algo mucho más viejo.
          Este recorrido de siete pasos te ayuda a encontrar la necesidad madre
          que quedó sin cubrir — y a empezar a dártela tú.
        </p>

        <div className="fila-btn">
          <a className="btn" href="/recorrido" style={{ textDecoration: "none" }}>
            Empezar el recorrido
          </a>
          {usuario && esTerapeuta(usuario.rol) && (
            <a className="btn fantasma" href="/panel" style={{ textDecoration: "none" }}>
              Panel de terapeuta
            </a>
          )}
        </div>

        <p className="nota">
          Son unos veinte minutos, escribiendo a tu ritmo. Puedes cerrar y
          volver: lo que escribas queda guardado en este dispositivo y nadie más
          lo ve.
        </p>

        {googleListo &&
          (usuario ? (
            <div className="cuenta-bar">
              <span className="quien">Hola, {usuario.name ?? usuario.email}</span>
              <span>
                {procesos === 0
                  ? "aún no tienes procesos guardados"
                  : procesos === 1
                    ? "1 proceso guardado"
                    : `${procesos} procesos guardados`}
              </span>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">Salir</button>
              </form>
            </div>
          ) : (
            <div className="cuenta-bar">
              <span>
                ¿Quieres continuarlo desde otro equipo y guardar tu histórico?
              </span>
              <form
                action={async () => {
                  "use server";
                  await signIn("google", { redirectTo: "/recorrido" });
                }}
              >
                <button type="submit">Entrar con Google</button>
              </form>
            </div>
          ))}

        <p className="aviso">
          Esto es una herramienta de autoconocimiento, no una terapia, y no
          atiende urgencias. Si aparece algo muy pesado, acompáñate de alguien de
          confianza o de un profesional.
        </p>
      </header>

      <footer className="cierre">
        <div className="firma">Fuego Consciente</div>
        <p>
          Angela · Terapeuta integral. Masaje tailandés y escucha consciente en
          Cali. Si al hacer este recorrido se te movió algo que quieres acompañar
          con el cuerpo, escríbeme.
        </p>
        <p>
          <a
            href="https://wa.me/573162958779"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp +57 316 295 8779
          </a>{" "}
          ·{" "}
          <a
            href="https://instagram.com/fuegoycuerpoconsciente"
            target="_blank"
            rel="noopener noreferrer"
          >
            @fuegoycuerpoconsciente
          </a>
        </p>
      </footer>
    </div>
  );
}
