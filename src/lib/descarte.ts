/** Preguntas de descarte para quien no sabe nombrar su necesidad. */

export type OpcionDescarte = { t: string; n: string[] };
export type PreguntaDescarte = { q: string; op: OpcionDescarte[] };

export const DESCARTE: PreguntaDescarte[] = [
 {q:'Si esa misma situación se repitiera mañana, exactamente igual, ¿qué es lo que más te dolería?',
  op:[{t:'Que otra vez no me tuvieran en cuenta',n:['reconocimiento','pertenencia']},
      {t:'Que me trataran de esa forma',n:['respeto','justicia']},
      {t:'Quedarme con eso a solas',n:['apoyo','afecto']},
      {t:'No saber qué va a pasar después',n:['seguridad','confianza']}]},
 {q:'Ahora al revés: imagina que esa persona te jura que no fue contra ti, que ni se dio cuenta. ¿Qué pasa con tu dolor?',
  op:[{t:'Se me quita casi todo: lo que me mataba era no entender',n:['comprension','confianza']},
      {t:'Sigue igual: no era esa persona, es algo mío más viejo',n:['aceptacion','seguridad']},
      {t:'Me da más rabia: no darse cuenta también es no verme',n:['reconocimiento','respeto']},
      {t:'Me da tristeza: igual me quedé sin lo que necesitaba',n:['afecto','apoyo']}]},
 {q:'Si ese día hubieras podido pedir una sola cosa, y te la daban de inmediato, ¿cuál habrías pedido?',
  op:[{t:'Un abrazo, sin palabras',n:['afecto']},
      {t:'Que me dijeran la verdad completa',n:['confianza','comprension']},
      {t:'Que me dejaran decidir a mí',n:['autonomia']},
      {t:'Que alguien se hiciera cargo conmigo',n:['apoyo','seguridad']}]},
 {q:'Cambiemos de lugar: ¿qué te hierve la sangre cuando se lo hacen a otra persona?',
  op:[{t:'Que le pasen por encima',n:['respeto']},
      {t:'Que la dejen por fuera',n:['pertenencia']},
      {t:'Que nadie le agradezca todo lo que hace',n:['reconocimiento','justicia']},
      {t:'Que le controlen la vida',n:['autonomia']}]},
 {q:'¿Qué haces tú, casi siempre, apenas esto aparece?',
  op:[{t:'Me callo y sigo como si nada',n:['respeto','aceptacion']},
      {t:'Doy más, me esfuerzo más para que me quieran',n:['reconocimiento','afecto']},
      {t:'Me alejo antes de que me alejen',n:['pertenencia','confianza']},
      {t:'Controlo todo para que no vuelva a pasar',n:['seguridad','competencia']}]},
 {q:'¿Cuál de estas frases te incomoda porque tiene algo de cierto?',
  op:[{t:'«Si no hago algo por alguien, no valgo»',n:['competencia','reconocimiento']},
      {t:'«Si muestro quién soy de verdad, se van»',n:['aceptacion','pertenencia']},
      {t:'«Si bajo la guardia, me hacen daño»',n:['seguridad','confianza']},
      {t:'«Nunca es suficiente lo que recibo»',n:['justicia','afecto']}]},
 {q:'Última: cuando por fin no hay nadie pidiéndote nada, ¿qué aparece?',
  op:[{t:'Alivio: por fin puedo parar',n:['descanso']},
      {t:'Vacío: no sé para qué hago todo esto',n:['sentido']},
      {t:'Ganas de que la vida fuera más liviana',n:['alegria']},
      {t:'Miedo a quedarme sola o solo',n:['pertenencia','apoyo']}]}
];
