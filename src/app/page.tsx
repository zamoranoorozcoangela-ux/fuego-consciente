import { auth, signIn, signOut, esTerapeuta } from "@/auth";
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
        <div className="marca">
          <span className="chispa" />
          Fuego Consciente · Cali
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

        {usuario ? (
          <div className="tarjeta">
            <b>Hola, {usuario.name ?? usuario.email}</b>
            <p className="nota">
              Sesión iniciada con Google. Rol: {usuario.rol.replace("_", " ")} ·
              Procesos guardados: {procesos} · Acompañamientos usados:{" "}
              {usuario.acompUsados} · Disponibles por aporte: {usuario.creditos}
            </p>
            <div className="fila-btn">
              <a className="btn" href="/recorrido" style={{ textDecoration: "none" }}>
                Empezar el recorrido
              </a>
              {esTerapeuta(usuario.rol) && (
                <a
                  className="btn fantasma"
                  href="/panel"
                  style={{ textDecoration: "none" }}
                >
                  Panel de terapeuta
                </a>
              )}
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button className="btn fantasma" type="submit">
                  Salir
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="tarjeta">
            <b>Entra para guardar tu proceso</b>
            <p className="nota">
              Con tu cuenta de Google tu recorrido queda guardado, puedes
              continuarlo desde otro equipo y ver tu histórico. No publicamos
              nada ni escribimos a tus contactos.
            </p>
            <div className="fila-btn">
              <form
                action={async () => {
                  "use server";
                  await signIn("google", { redirectTo: "/" });
                }}
              >
                <button className="btn" type="submit">
                  Entrar con Google
                </button>
              </form>
            </div>
          </div>
        )}

        <p className="aviso">
          Esto es una herramienta de autoconocimiento, no una terapia: si
          aparece algo muy pesado, acompáñate de alguien de confianza o de un
          profesional.
        </p>
      </header>

      <footer className="cierre">
        <div className="firma">Fuego Consciente</div>
        <p>
          Angela · Terapeuta integral. Masaje tailandés y escucha consciente en
          Cali.
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
