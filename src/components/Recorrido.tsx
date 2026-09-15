"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NECESIDADES } from "@/lib/necesidades";
import { DESCARTE } from "@/lib/descarte";
import { cotejar } from "@/lib/cotejo";
import { guardarProceso, type DatosProceso } from "@/app/acciones";

const CLAVE_LOCAL = "fuegoconsciente_raiz_v2";
const NOMBRES = [
  "Situación",
  "Tu palabra",
  "Cotejo",
  "Preguntas",
  "Verificación",
  "Puente",
  "21 días",
];

type Bitacora = Record<string, { fecha: string; penso: string; mejor: string }>;

type Estado = {
  situacion: { que: string; senti: string; pense: string };
  palabra: string;
  necesidad: string | null;
  alternativas: string[];
  respuestas: Record<string, string>;
  extras: number;
  verificacion: Record<string, string>;
  compromiso: string;
  bitacora: Bitacora;
  descarte: { i: number; elegidas: number[]; abierto: boolean } | null;
  paso: number;
};

const INICIAL: Estado = {
  situacion: { que: "", senti: "", pense: "" },
  palabra: "",
  necesidad: null,
  alternativas: [],
  respuestas: {},
  extras: 0,
  verificacion: {},
  compromiso: "",
  bitacora: {},
  descarte: null,
  paso: 1,
};

export default function Recorrido({
  hayCuenta,
  procesoInicial,
}: {
  hayCuenta: boolean;
  procesoInicial: { id: string; datos: DatosProceso } | null;
}) {
  const [E, setE] = useState<Estado>(() =>
    procesoInicial ? { ...INICIAL, ...(procesoInicial.datos as object) } : INICIAL,
  );
  const [procesoId, setProcesoId] = useState<string | null>(
    procesoInicial?.id ?? null,
  );
  const [aviso, setAviso] = useState("");
  const [diaAbierto, setDiaAbierto] = useState<number | null>(null);
  const [verTodas, setVerTodas] = useState(false);
  const montado = useRef(false);

  const N = useMemo(
    () => NECESIDADES.find((n) => n.id === E.necesidad) ?? null,
    [E.necesidad],
  );

  const decir = useCallback((texto: string) => {
    setAviso(texto);
    setTimeout(() => setAviso(""), 2600);
  }, []);

  // Recuperar lo escrito en este dispositivo cuando no venimos de una cuenta
  useEffect(() => {
    if (procesoInicial) {
      montado.current = true;
      return;
    }
    try {
      const crudo = localStorage.getItem(CLAVE_LOCAL);
      if (crudo) setE({ ...INICIAL, ...JSON.parse(crudo) });
    } catch {
      /* sin almacenamiento disponible */
    }
    montado.current = true;
  }, [procesoInicial]);

  // Guardar: siempre en el dispositivo, y en la cuenta si hay sesión
  useEffect(() => {
    if (!montado.current) return;
    try {
      localStorage.setItem(CLAVE_LOCAL, JSON.stringify(E));
    } catch {
      /* sin almacenamiento disponible */
    }
    if (!hayCuenta) return;
    const t = setTimeout(async () => {
      const id = await guardarProceso(procesoId, E as unknown as DatosProceso);
      if (id && id !== procesoId) setProcesoId(id);
    }, 1500);
    return () => clearTimeout(t);
  }, [E, hayCuenta, procesoId]);

  const abrirPaso = useCallback((n: number) => {
    setE((e) => ({ ...e, paso: Math.max(e.paso, n) }));
    setTimeout(() => {
      document.getElementById("paso" + n)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 60);
  }, []);

  /* ---------- Paso 2: cotejo ---------- */
  function buscarRaiz() {
    const v = E.palabra.trim();
    if (!v) return decir("Escribe la palabra que sentiste vulnerada.");
    const r = cotejar(v);
    if (!r.length || r[0].score < 0.42) {
      setE((e) => ({ ...e, necesidad: null, alternativas: [] }));
      setVerTodas(true);
    } else {
      setE((e) => ({
        ...e,
        necesidad: r[0].nec.id,
        alternativas: r.slice(1, 3).map((x) => x.nec.id),
      }));
      setVerTodas(false);
    }
    abrirPaso(3);
  }

  function elegirNecesidad(id: string) {
    const otras = cotejar(E.palabra || id)
      .filter((x) => x.nec.id !== id)
      .slice(0, 2)
      .map((x) => x.nec.id);
    setE((e) => ({ ...e, necesidad: id, alternativas: otras, extras: 0 }));
    setVerTodas(false);
    const nom = NECESIDADES.find((n) => n.id === id)?.nombre ?? "";
    decir("Raíz: " + nom);
  }

  /* ---------- Paso 2·B: descarte ---------- */
  const d = E.descarte ?? { i: 0, elegidas: [], abierto: false };

  function abrirDescarte() {
    setE((e) => ({
      ...e,
      descarte: e.descarte
        ? { ...e.descarte, abierto: true }
        : { i: 0, elegidas: [], abierto: true },
    }));
    setTimeout(
      () =>
        document
          .getElementById("paso2b")
          ?.scrollIntoView({ behavior: "smooth", block: "start" }),
      60,
    );
  }

  function responderDescarte(opcion: number) {
    setE((e) => {
      const act = e.descarte ?? { i: 0, elegidas: [], abierto: true };
      const elegidas = [...act.elegidas];
      elegidas[act.i] = opcion;
      return { ...e, descarte: { ...act, elegidas, i: act.i + 1 } };
    });
  }

  const puntajesDescarte = useMemo(() => {
    const p: Record<string, number> = {};
    d.elegidas.forEach((oi, qi) => {
      const pregunta = DESCARTE[qi];
      if (oi == null || !pregunta) return;
      const opcion = pregunta.op[oi];
      if (!opcion) return;
      const peso = opcion.n.length === 1 ? 1.5 : 1;
      opcion.n.forEach((id) => {
        p[id] = (p[id] ?? 0) + peso;
      });
    });
    return Object.entries(p)
      .map(([id, v]) => ({ id, v }))
      .sort((a, b) => b.v - a.v);
  }, [d.elegidas]);

  function elegirDelDescarte(id: string) {
    const nec = NECESIDADES.find((n) => n.id === id);
    if (!nec) return;
    setE((e) => ({
      ...e,
      necesidad: id,
      palabra: e.palabra || nec.nombre.toLowerCase(),
      alternativas: puntajesDescarte
        .filter((x) => x.id !== id)
        .slice(0, 2)
        .map((x) => x.id),
      extras: 0,
    }));
    abrirPaso(3);
    decir("Seguimos con " + nec.nombre + ".");
  }

  /* ---------- Paso 4: preguntas ---------- */
  const preguntas = useMemo(() => {
    if (!N) return [];
    const nb = N.nombre.toLowerCase();
    const base = [
      {
        id: "eco",
        q: `¿Recuerdas otra situación de tu vida adulta donde sentiste exactamente esto: ${N.esencia.toLowerCase()}?`,
        pista: "Con quién, dónde, qué se dijo.",
      },
      {
        id: "infancia",
        q: N.infancia,
        pista:
          "Si no aparece un recuerdo nítido, escribe la sensación: el cuerpo recuerda antes que la cabeza.",
      },
      {
        id: "contra",
        q: `¿Hubo alguna vez — una sola basta — en que sí recibiste ${nb}? ¿Quién estaba y qué hizo exactamente?`,
        pista: "Esto es el contrapatrón: la prueba de que sí es posible.",
      },
      {
        id: "patron",
        q: "Mirando las tres escenas juntas: ¿qué haces tú, siempre, cuando esta necesidad se toca?",
        pista:
          "Callar, complacer, atacar, desaparecer, controlar, explicar de más, hacerte la fuerte…",
      },
    ];
    const extra = Math.min(E.extras, N.banco.length);
    for (let i = 0; i < extra; i++) {
      base.push({
        id: `x${N.id}_${i}`,
        q: N.banco[i],
        pista: "Pregunta de profundización.",
      });
    }
    return base;
  }, [N, E.extras]);

  const verificaciones = useMemo(() => {
    if (!N) return [];
    const alts = E.alternativas
      .map((id) => NECESIDADES.find((n) => n.id === id))
      .filter(Boolean);
    const nombres = alts.length
      ? alts.map((a) => a!.nombre.toLowerCase()).join(" o ")
      : "cualquier otra necesidad";
    return [
      {
        id: "v1",
        q: `¿Sientes que ${N.nombre.toLowerCase()} explica tu sufrimiento mejor que ${nombres}?`,
        pista:
          "Responde con el cuerpo, no con la lógica. ¿Dónde se afloja algo al leerlo?",
      },
      { id: "v2", q: N.discrimina, pista: "Esta pregunta separa dos raíces que se parecen mucho." },
      {
        id: "v3",
        q: `Si en esa situación de los últimos días ${N.nombre.toLowerCase()} hubiera estado cubierta, ¿el resto seguiría doliendo igual?`,
        pista: 'Si la respuesta es "sí, igual", la raíz probablemente es otra.',
      },
    ];
  }, [N, E.alternativas]);

  const llenos = Object.keys(E.bitacora).length;

  async function copiarTodo() {
    const L: string[] = [];
    L.push("MI RAÍZ — Fuego Consciente");
    L.push("Fecha: " + new Date().toLocaleDateString("es-CO"));
    L.push("");
    L.push("01. SITUACIÓN");
    L.push("Qué pasó: " + E.situacion.que);
    L.push("Qué sentí: " + E.situacion.senti);
    L.push("Qué pensé: " + E.situacion.pense);
    L.push("");
    L.push("02. MI PALABRA: " + E.palabra);
    L.push("03. NECESIDAD MADRE: " + (N ? N.nombre + " — " + N.esencia : "—"));
    L.push("");
    L.push("04. PREGUNTAS");
    preguntas.forEach((p) => L.push(p.q + "\n" + (E.respuestas[p.id] ?? "")));
    L.push("");
    L.push("05. VERIFICACIÓN");
    verificaciones.forEach((v) => L.push(v.q + "\n" + (E.verificacion[v.id] ?? "")));
    L.push("");
    L.push("06. MI GESTO: " + E.compromiso);
    L.push("");
    L.push("07. BITÁCORA DE 21 DÍAS");
    Object.keys(E.bitacora)
      .sort((a, b) => Number(a) - Number(b))
      .forEach((k) => {
        const b = E.bitacora[k];
        L.push(`Día ${k} (${b.fecha}) — Pensé: ${b.penso} | Mejor: ${b.mejor}`);
      });
    try {
      await navigator.clipboard.writeText(L.join("\n"));
      decir("Copiado. Pégalo en tus notas.");
    } catch {
      decir("No se pudo copiar aquí.");
    }
  }

  const chips = (ids: string[], onPick: (id: string) => void) => (
    <div className="chips">
      {ids.map((id) => {
        const n = NECESIDADES.find((x) => x.id === id);
        if (!n) return null;
        return (
          <button
            key={id}
            type="button"
            className="chip"
            aria-pressed={E.necesidad === id}
            onClick={() => onPick(id)}
          >
            {n.nombre}
          </button>
        );
      })}
    </div>
  );

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
        <nav className="mapa" aria-label="Los siete pasos">
          {NOMBRES.map((t, i) => (
            <span key={t} className={"mapa-item" + (i + 1 <= E.paso ? " on" : "")}>
              <b>0{i + 1}</b>
              {t}
            </span>
          ))}
        </nav>
        <p className="aviso">
          {hayCuenta
            ? "Tu proceso se guarda en tu cuenta: puedes continuarlo desde otro equipo y verlo en tu histórico."
            : "Sin cuenta, lo que escribas queda solo en este dispositivo."}{" "}
          Esto es una herramienta de autoconocimiento, no una terapia: si aparece
          algo muy pesado, acompáñate de alguien de confianza o de un profesional.
        </p>
      </header>

      <main className="sendero">
        <div className="mecha" style={{ height: `${(E.paso / 7) * 100}%` }} />

        {/* PASO 1 */}
        <section className={"paso" + (E.paso === 1 ? " activa" : " hecha")} id="paso1">
          <div className="nodo" />
          <div className="eyebrow">
            <span>01</span> Situación
          </div>
          <h2>¿Qué pasó en estos últimos cinco días?</h2>
          <p className="guia">
            Un momento puntual, no un resumen de tu vida. Una conversación, un
            mensaje, un silencio, una mirada. Escríbelo como si se lo contaras a
            alguien que estuvo ahí contigo.
          </p>
          <div className="grupo">
            {(
              [
                ["que", "Qué pasó", "El martes le escribí a… y no me respondió hasta el otro día.", 4],
                ["senti", "Qué sentiste en el cuerpo", "Un vacío en el pecho, calor en la cara, ganas de llorar…", 3],
                ["pense", "Qué pensaste en ese momento", "La frase exacta que te dijiste por dentro.", 3],
              ] as const
            ).map(([campo, etiqueta, ejemplo, filas]) => (
              <div className="campo" key={campo}>
                <label htmlFor={"s-" + campo}>{etiqueta}</label>
                <textarea
                  id={"s-" + campo}
                  rows={filas}
                  placeholder={ejemplo}
                  value={E.situacion[campo]}
                  onChange={(ev) =>
                    setE((e) => ({
                      ...e,
                      situacion: { ...e.situacion, [campo]: ev.target.value },
                    }))
                  }
                />
              </div>
            ))}
          </div>
          <div className="fila-btn">
            <button
              className="btn"
              type="button"
              onClick={() => {
                if (!E.situacion.que.trim()) return decir("Escribe primero qué pasó.");
                abrirPaso(2);
              }}
            >
              Continuar
            </button>
          </div>
        </section>

        {/* PASO 2 */}
        {E.paso >= 2 && (
          <section className={"paso" + (E.paso === 2 ? " activa" : " hecha")} id="paso2">
            <div className="nodo" />
            <div className="eyebrow">
              <span>02</span> Tu palabra
            </div>
            <h2>¿Qué cualidad o necesidad sentiste vulnerada?</h2>
            <p className="guia">
              No hay lista para escoger. Escríbelo con tus propias palabras: una
              palabra, o la frase que te salga. Lo que tú dirías si nadie
              estuviera juzgando cómo suena.
            </p>
            <div className="campo palabra-clave">
              <label htmlFor="s-necesidad" style={{ textAlign: "center" }}>
                Tu palabra
              </label>
              <input
                type="text"
                id="s-necesidad"
                placeholder="escríbela aquí"
                autoComplete="off"
                spellCheck={false}
                value={E.palabra}
                onChange={(ev) => setE((e) => ({ ...e, palabra: ev.target.value }))}
              />
            </div>
            <div className="fila-btn">
              <button className="btn" type="button" onClick={buscarRaiz}>
                Buscar la raíz
              </button>
              <button className="btn fantasma" type="button" onClick={abrirDescarte}>
                No sé qué nombre ponerle
              </button>
            </div>
          </section>
        )}

        {/* PASO 2·B — DESCARTE */}
        {d.abierto && (
          <section className="paso activa" id="paso2b">
            <div className="nodo" />
            <div className="eyebrow">
              <span>02·B</span> Descarte
            </div>
            <h2>Lleguemos por eliminación</h2>
            <p className="guia">
              No hace falta que sepas el nombre. Estas preguntas te contradicen a
              propósito: te hacen mirar lo que pasó desde otro ángulo para que la
              necesidad aparezca sola. Responde rápido, con lo primero que
              sientas; si dudas entre dos, elige la que te incomode más.
            </p>

            {d.i < DESCARTE.length ? (
              <>
                <div className="avance">
                  Pregunta {d.i + 1} de {DESCARTE.length}
                </div>
                <div className="pregunta">
                  <p className="q">{DESCARTE[d.i].q}</p>
                </div>
                <div className="lista">
                  {DESCARTE[d.i].op.map((o, i) => (
                    <button
                      key={i}
                      type="button"
                      className="item"
                      aria-pressed={d.elegidas[d.i] === i}
                      onClick={() => responderDescarte(i)}
                    >
                      <span>{o.t}</span>
                    </button>
                  ))}
                </div>
                <div className="fila-btn">
                  {d.i > 0 && (
                    <button
                      className="btn fantasma"
                      type="button"
                      onClick={() =>
                        setE((e) => ({
                          ...e,
                          descarte: { ...d, i: Math.max(0, d.i - 1) },
                        }))
                      }
                    >
                      Volver a la anterior
                    </button>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="avance">Respondiste las {DESCARTE.length} preguntas</div>
                <div className="brasa-card">
                  <div className="etiqueta">Lo que quedó después del descarte</div>
                  <p className="esencia">
                    Por lo que respondiste, tu dolor se parece más a estas. Léelas
                    sin apurarte: la correcta suele aflojar algo en el cuerpo, no
                    convencer a la cabeza.
                  </p>
                  <ul className="senales">
                    {puntajesDescarte.slice(0, 3).map((x) => {
                      const n = NECESIDADES.find((k) => k.id === x.id);
                      return n ? (
                        <li key={x.id}>
                          <b style={{ fontWeight: 500 }}>{n.nombre}:</b> {n.esencia}
                        </li>
                      ) : null;
                    })}
                  </ul>
                </div>
                <div className="alternativas">
                  <p className="tit">Elige la que reconozcas como tuya:</p>
                  {chips(
                    puntajesDescarte.slice(0, 3).map((x) => x.id),
                    elegirDelDescarte,
                  )}
                </div>
                <div className="fila-btn">
                  <button
                    className="btn fantasma"
                    type="button"
                    onClick={() => setVerTodas(true)}
                  >
                    Ninguna: ver las quince
                  </button>
                  <button
                    className="btn fantasma"
                    type="button"
                    onClick={() =>
                      setE((e) => ({
                        ...e,
                        descarte: { i: 0, elegidas: [], abierto: true },
                      }))
                    }
                  >
                    Responder otra vez
                  </button>
                </div>
                {verTodas && (
                  <div className="alternativas">
                    <p className="tit">Las quince necesidades madre:</p>
                    {chips(
                      NECESIDADES.map((n) => n.id),
                      elegirDelDescarte,
                    )}
                  </div>
                )}
              </>
            )}
          </section>
        )}

        {/* PASO 3 */}
        {E.paso >= 3 && (
          <section className={"paso" + (E.paso === 3 ? " activa" : " hecha")} id="paso3">
            <div className="nodo" />
            <div className="eyebrow">
              <span>03</span> Cotejo
            </div>
            <h2>Debajo de tu palabra hay una necesidad madre</h2>

            {N ? (
              <>
                <p className="guia">
                  Escribiste «{E.palabra}». Debajo de esa palabra, la necesidad
                  madre que más se le parece es esta. No es una etiqueta: es un
                  punto de partida para excavar.
                </p>
                <div className="brasa-card">
                  <div className="etiqueta">Necesidad madre</div>
                  <div className="nombre">{N.nombre}</div>
                  <p className="esencia">{N.esencia}</p>
                  <ul className="senales">
                    {N.senales.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
                {E.alternativas.length > 0 && !verTodas && (
                  <div className="alternativas">
                    <p className="tit">
                      También rozaste estas. Si alguna te suena más cierta en el
                      cuerpo, cámbiala:
                    </p>
                    {chips(E.alternativas, elegirNecesidad)}
                  </div>
                )}
              </>
            ) : (
              <p className="guia">
                No encontré una raíz clara debajo de «{E.palabra}». Eso pasa y no
                es un error: a veces la palabra propia es tan tuya que no se
                parece a ninguna. Elige la que más se acerque a lo que sentiste.
              </p>
            )}

            {verTodas && (
              <div className="alternativas">
                <p className="tit">Las quince necesidades madre. Elige la que reconozcas:</p>
                {chips(
                  NECESIDADES.map((n) => n.id),
                  elegirNecesidad,
                )}
              </div>
            )}

            <div className="fila-btn">
              <button
                className="btn"
                type="button"
                onClick={() => {
                  if (!E.necesidad) return decir("Elige primero una necesidad.");
                  abrirPaso(4);
                }}
              >
                Sí, empecemos por ahí
              </button>
              <button
                className="btn fantasma"
                type="button"
                onClick={() => setVerTodas((v) => !v)}
              >
                Ver todas las necesidades
              </button>
            </div>
          </section>
        )}

        {/* PASO 4 */}
        {E.paso >= 4 && N && (
          <section className={"paso" + (E.paso === 4 ? " activa" : " hecha")} id="paso4">
            <div className="nodo" />
            <div className="eyebrow">
              <span>04</span> Preguntas
            </div>
            <h2>Bajemos por el hilo de {N.nombre.toLowerCase()}</h2>
            <p className="guia">
              Estas preguntas no buscan una respuesta correcta. Buscan la escena:
              lugar, edad, quién estaba, qué se dijo. Escribe lo primero que
              aparezca, aunque parezca que no tiene que ver.
            </p>
            <div className="grupo">
              {preguntas.map((p) => (
                <div className="pregunta" key={p.id}>
                  <p className="q">{p.q}</p>
                  <p className="pista">{p.pista}</p>
                  <textarea
                    rows={3}
                    placeholder="…"
                    value={E.respuestas[p.id] ?? ""}
                    onChange={(ev) =>
                      setE((e) => ({
                        ...e,
                        respuestas: { ...e.respuestas, [p.id]: ev.target.value },
                      }))
                    }
                  />
                </div>
              ))}
            </div>
            <div className="fila-btn">
              <button
                className="btn"
                type="button"
                onClick={() => {
                  if (!(E.respuestas.patron ?? "").trim())
                    return decir("La última pregunta es la más importante. Respóndela.");
                  abrirPaso(5);
                }}
              >
                Continuar
              </button>
              {E.extras < N.banco.length && (
                <button
                  className="btn fantasma"
                  type="button"
                  onClick={() => setE((e) => ({ ...e, extras: e.extras + 1 }))}
                >
                  Traer otra pregunta
                </button>
              )}
            </div>
          </section>
        )}

        {/* PASO 5 */}
        {E.paso >= 5 && N && (
          <section className={"paso" + (E.paso === 5 ? " activa" : " hecha")} id="paso5">
            <div className="nodo" />
            <div className="eyebrow">
              <span>05</span> Verificación
            </div>
            <h2>¿Es esta, de verdad, la raíz?</h2>
            <p className="guia">
              Antes de seguir, descartemos. Si la respuesta a estas preguntas no
              es un sí claro en el cuerpo, la raíz es otra — y eso también es un
              hallazgo.
            </p>
            <div className="grupo">
              {verificaciones.map((v) => (
                <div className="pregunta" key={v.id}>
                  <p className="q">{v.q}</p>
                  <p className="pista">{v.pista}</p>
                  <textarea
                    rows={2}
                    placeholder="…"
                    value={E.verificacion[v.id] ?? ""}
                    onChange={(ev) =>
                      setE((e) => ({
                        ...e,
                        verificacion: { ...e.verificacion, [v.id]: ev.target.value },
                      }))
                    }
                  />
                </div>
              ))}
            </div>
            <div className="fila-btn">
              <button className="btn" type="button" onClick={() => abrirPaso(6)}>
                Confirmo: es esta
              </button>
              <button
                className="btn fantasma"
                type="button"
                onClick={() => setVerTodas(true)}
              >
                Cambiar de necesidad
              </button>
            </div>
          </section>
        )}

        {/* PASO 6 */}
        {E.paso >= 6 && N && (
          <section className={"paso" + (E.paso === 6 ? " activa" : " hecha")} id="paso6">
            <div className="nodo" />
            <div className="eyebrow">
              <span>06</span> Puente
            </div>
            <h2>De la herida al gesto</h2>
            <p className="guia">
              Nadie va a volver atrás a darte lo que faltó. La pregunta puente
              cambia el destinatario: de quien no pudo, a ti.
            </p>
            <div className="puente">
              <div className="etiqueta">Pregunta puente</div>
              <p className="q">
                ¿Qué puedo hacer hoy para darme la {N.nombre.toLowerCase()} que no
                recibí en ese momento?
              </p>
              <ul className="gestos">
                {N.gestos.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
              <div className="campo">
                <label htmlFor="s-compromiso">Mi gesto para hoy</label>
                <textarea
                  id="s-compromiso"
                  rows={3}
                  placeholder="Algo pequeño, concreto y de hoy. No un propósito de vida."
                  value={E.compromiso}
                  onChange={(ev) => setE((e) => ({ ...e, compromiso: ev.target.value }))}
                />
              </div>
            </div>
            <div className="fila-btn">
              <button
                className="btn"
                type="button"
                onClick={() => {
                  if (!E.compromiso.trim())
                    return decir("Escribe tu gesto de hoy, aunque sea mínimo.");
                  abrirPaso(7);
                }}
              >
                Ver mi patrón
              </button>
            </div>
          </section>
        )}

        {/* PASO 7 */}
        {E.paso >= 7 && N && (
          <section className="paso activa" id="paso7">
            <div className="nodo" />
            <div className="eyebrow">
              <span>07</span> Plan de trabajo
            </div>
            <h2>Veintiún días de la misma pregunta</h2>

            <div className="patron">
              <h3>Tu patrón, en una frase</h3>
              <p>
                Cuando algo toca tu necesidad de{" "}
                <strong style={{ color: "var(--terracota)" }}>
                  {N.nombre.toLowerCase()}
                </strong>
                , tú{" "}
                <strong>
                  {(E.respuestas.patron ?? "lo que haces cuando esto se toca").toLowerCase()}
                </strong>
                . Eso te protegió cuando eras pequeña o pequeño y no tenías otra
                herramienta. Hoy ya tienes otras: por eso el trabajo no es dejar
                de sentirlo, sino notar el momento exacto en que aparece y elegir
                distinto.
              </p>
              <p>
                Tu contrapatrón — la prueba de que sí es posible — es esto que
                escribiste: <em>{E.respuestas.contra || "aún por encontrar"}</em>
              </p>
            </div>

            <p className="guia">
              Cada vez que aparezca una situación que toque esta necesidad, abre
              un día y escribe dos cosas: qué pensaste, y qué podrías hacer
              distinto para dártela tú. Hay que llenarlos cuando la vida los
              provoque.
            </p>

            <div className="tablero">
              {Array.from({ length: 21 }, (_, i) => i + 1).map((i) => (
                <button
                  key={i}
                  type="button"
                  className={"dia" + (E.bitacora[i] ? " lleno" : "") + (i === llenos + 1 ? " hoy" : "")}
                  aria-label={"Día " + i + (E.bitacora[i] ? " (escrito)" : "")}
                  onClick={() => setDiaAbierto(i)}
                >
                  {i}
                </button>
              ))}
            </div>

            <div className="contadores">
              <div className="contador">
                <span className="n">{llenos}</span>
                <span className="l">Días escritos</span>
              </div>
              <div className="contador">
                <span className="n">{21 - llenos}</span>
                <span className="l">Por escribir</span>
              </div>
            </div>

            {diaAbierto !== null && (
              <DiaBitacora
                dia={diaAbierto}
                necesidad={N.nombre.toLowerCase()}
                pregunta={N.banco[(diaAbierto - 1) % N.banco.length]}
                valor={E.bitacora[diaAbierto] ?? { fecha: "", penso: "", mejor: "" }}
                onCerrar={() => setDiaAbierto(null)}
                onGuardar={(penso, mejor) => {
                  if (!penso && !mejor) return decir("Escribe algo antes de guardar.");
                  setE((e) => ({
                    ...e,
                    bitacora: {
                      ...e.bitacora,
                      [diaAbierto]: {
                        fecha: new Date().toLocaleDateString("es-CO"),
                        penso,
                        mejor,
                      },
                    },
                  }));
                  setDiaAbierto(null);
                  decir("Día " + diaAbierto + " guardado.");
                }}
              />
            )}

            <div className="fila-btn">
              <button className="btn fantasma" type="button" onClick={copiarTodo}>
                Copiar todo mi proceso
              </button>
              <button
                className="btn fantasma"
                type="button"
                onClick={() => {
                  if (!confirm("Esto empieza un proceso nuevo. El actual queda en tu histórico. ¿Seguir?"))
                    return;
                  setE(INICIAL);
                  setProcesoId(null);
                  setVerTodas(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Empezar un proceso nuevo
              </button>
            </div>
          </section>
        )}
      </main>

      {aviso && <div className="aviso-toast">{aviso}</div>}
    </div>
  );
}

function DiaBitacora({
  dia,
  necesidad,
  pregunta,
  valor,
  onCerrar,
  onGuardar,
}: {
  dia: number;
  necesidad: string;
  pregunta: string;
  valor: { penso: string; mejor: string };
  onCerrar: () => void;
  onGuardar: (penso: string, mejor: string) => void;
}) {
  const [penso, setPenso] = useState(valor.penso);
  const [mejor, setMejor] = useState(valor.mejor);

  return (
    <div className="bitacora-form">
      <div className="cab">
        <b>Día {dia}</b>
        <button type="button" onClick={onCerrar}>
          cerrar
        </button>
      </div>
      <p className="pista">Pregunta de hoy: {pregunta}</p>
      <div className="campo">
        <label htmlFor="b-penso">Qué pensé</label>
        <textarea
          id="b-penso"
          rows={3}
          placeholder="La frase exacta que me dije por dentro."
          value={penso}
          onChange={(e) => setPenso(e.target.value)}
        />
      </div>
      <div className="campo">
        <label htmlFor="b-mejor">Qué puedo hacer mejor para darme {necesidad}</label>
        <textarea
          id="b-mejor"
          rows={3}
          placeholder="Una acción concreta, para la próxima vez."
          value={mejor}
          onChange={(e) => setMejor(e.target.value)}
        />
      </div>
      <div className="fila-btn">
        <button
          className="btn"
          type="button"
          onClick={() => onGuardar(penso.trim(), mejor.trim())}
        >
          Guardar día {dia}
        </button>
      </div>
    </div>
  );
}
