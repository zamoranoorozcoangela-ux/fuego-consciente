/** Diccionario de necesidades madre — portado del prototipo raiz.html */

export type Necesidad = {
  id: string;
  nombre: string;
  esencia: string;
  lex: string[];
  frases: string[];
  senales: string[];
  banco: string[];
  infancia: string;
  discrimina: string;
  gestos: string[];
};

export const NECESIDADES: Necesidad[] = [
 {
  id:'seguridad', nombre:'Seguridad',
  esencia:'Saber que el suelo no se va a mover de golpe. Poder bajar la guardia.',
  lex:['seguridad','seguro','segura','proteccion','protección','protegida','protegido','desproteccion','desprotegida','estabilidad','estable','inestable','certeza','certidumbre','incertidumbre','resguardo','amparo','desamparo','tranquilidad','calma','miedo','temor','angustia','ansiedad','inseguridad','firmeza','sosten','refugio','peligro','vulnerable','indefensa','indefenso'],
  frases:['no sentir miedo','sentirme a salvo','que el piso no se mueva','saber que voy a estar bien','saber que no me van a dejar','no vivir en alerta','que nada cambie de golpe','poder confiar en que estara'],
  senales:['Revisas señales pequeñas buscando confirmar que algo malo viene.','Te adelantas al peor escenario para que no te tome desprevenida.','Te cuesta soltar el control incluso cuando todo está bien.'],
  banco:['¿Cuál es la señal más pequeña que te pone en alerta antes de que pase nada? ¿Quién te enseñó a leerla?','Si tuvieras que ponerle una edad al miedo que sentiste en esa situación, ¿cuántos años tendría?','¿Qué necesitarías escuchar hoy, con esas palabras exactas, para que el cuerpo bajara la guardia?','¿Qué precio has pagado por mantener todo bajo control?'],
  infancia:'Vuelve a tu casa de la infancia. ¿Había algo que pudiera cambiar de un momento a otro sin que nadie te avisara — un ánimo, una voz, una ausencia, una mudanza? ¿Qué hacías tú cuando eso pasaba?',
  discrimina:'¿Lo que más te dolió fue el miedo a lo que podía pasar después, o el trato que recibiste en el momento?',
  gestos:['Antes de dormir, nombra en voz alta tres cosas que hoy sí se sostuvieron.','Cuando aparezca la alerta, apoya una mano en el esternón y respira seis veces hasta que el cuerpo registre que no hay peligro ahora.','Pide la información que te falta en vez de llenar el vacío con la peor versión.']
 },
 {
  id:'afecto', nombre:'Afecto',
  esencia:'Recibir cariño en el cuerpo y en los hechos, no solo en la idea de que te quieren.',
  lex:['afecto','carino','cariño','amor','ternura','amada','amado','querida','querido','calidez','calor','abrazo','abrazos','contacto','caricia','caricias','mimos','desamor','frialdad','frio','distancia','indiferencia','afectividad','amorosa','amoroso','quieren','quieran','quiere','quererme','amen','amar','apego'],
  frases:['que me quieran','que me abracen','sentir que le importo','que me demuestren','que me traten con ternura','que alguien me cuide','sentirme querida'],
  senales:['Das mucho cariño esperando en silencio que alguien lo devuelva.','Te conformas con migajas de cercanía antes que con nada.','Te cuesta pedir un abrazo aunque lo estés necesitando.'],
  banco:['¿Cómo pides cariño cuando lo necesitas? ¿Lo pides?','¿A quién sí le dejas acercarse, y qué hace esa persona distinto?','Si el cariño que esperabas hubiera llegado ese día, ¿cómo habría sido exactamente? Descríbelo.','¿Qué haces cuando alguien te da cariño y no sabes recibirlo?'],
  infancia:'Trae a tu memoria un día cualquiera de tu infancia. ¿Cómo se demostraba el cariño en tu casa — se decía, se tocaba, se daba en comida, en cosas, o no se daba? ¿Qué hacías tú para conseguirlo?',
  discrimina:'¿Lo que te faltó fue cariño, o fue que te vieran y te valoraran?',
  gestos:['Date hoy el gesto físico que estás esperando de alguien más: crema en las manos, una ducha lenta, tu propio abrazo.','Escríbele a alguien que sí te quiere y dile exactamente lo que necesitas hoy.','Nombra en voz alta una forma concreta en que alguien te quiso esta semana, aunque haya sido pequeña.']
 },
 {
  id:'aceptacion', nombre:'Aceptación',
  esencia:'Que te quieran sin tener que editarte para caber.',
  lex:['aceptacion','aceptación','aceptada','aceptado','aprobacion','aprobación','rechazo','rechazada','rechazado','juicio','juzgada','juzgado','criticada','criticado','critica','encajar','diferente','rara','raro','vergüenza','verguenza','avergonzada','inadecuada','inadecuado','sobrar','defecto','tal como soy'],
  frases:['que me acepten como soy','no tener que fingir','sin que me juzguen','que no me critiquen','poder ser yo','que no me cambien','sentir que estoy bien asi'],
  senales:['Ajustas cómo hablas, vistes o piensas según quién esté al frente.','Te adelantas a criticarte antes de que lo haga otro.','Sientes alivio cuando te vas de un lugar porque por fin puedes soltar el personaje.'],
  banco:['¿Delante de quién eres más tú, y qué tiene esa persona?','¿Qué frase te dices cuando crees que no encajas? ¿De quién es esa voz?','¿Qué tendrías que dejar de hacer para que te quisieran por lo que eres y no por lo que rindes?','¿Qué parte tuya defenderías hoy si alguien se burlara de ella?'],
  infancia:'¿Qué parte de ti, de niña o niño, aprendiste a esconder para que no te regañaran, no se rieran o no se decepcionaran? ¿Quién estaba delante la primera vez que la escondiste?',
  discrimina:'¿Lo que dolió fue que te rechazaran por cómo eres, o que no te tuvieran en cuenta?',
  gestos:['Muestra hoy, en un espacio seguro, una cosa pequeña que sueles esconder.','Cuando te descubras editándote, termina la frase igual, sin editar.','Escribe tres rasgos tuyos que te han criticado y al lado para qué te han servido.']
 },
 {
  id:'reconocimiento', nombre:'Reconocimiento',
  esencia:'Que lo que eres y lo que haces sea visto, y que pese.',
  lex:['reconocimiento','reconocida','reconocido','valoracion','valoración','valorada','valorado','visible','invisible','invisibilidad','ignorada','ignorado','importar','importancia','merito','mérito','gratitud','agradecimiento','desprecio','menospreciada','menospreciado','aporte','vista','visto','notar','existir','cuenta'],
  frases:['que me vean','que me tengan en cuenta','que valoren lo que hago','sentir que importo','que noten mi esfuerzo','que agradezcan','que no me ignoren','sentirme vista'],
  senales:['Te esfuerzas de más esperando que alguien lo note, y no lo dices.','Te duele más el silencio que la crítica.','Enumeras por dentro todo lo que haces mientras nadie lo menciona.'],
  banco:['¿Qué hiciste esta semana que nadie vio? Nómbralo aquí.','¿Qué esperabas que te dijeran en esa situación, palabra por palabra?','¿Cuándo dejaste de contar lo que lograbas, y por qué?','Si nadie volviera a aplaudirte, ¿qué seguirías haciendo igual?'],
  infancia:'De niña o niño, ¿qué tenías que hacer para que en tu casa te notaran: sacar buenas notas, portarte bien, enfermarte, hacer reír, no dar problemas? ¿Qué pasaba cuando no lo hacías?',
  discrimina:'¿Necesitabas que reconocieran lo que hiciste, o que te quisieran aunque no hicieras nada?',
  gestos:['Di en voz alta, a alguien, algo que hiciste bien hoy. Sin quitarle importancia después.','Pide el reconocimiento directamente: "me gustaría que me dijeras si esto te sirvió".','Anota al final del día una cosa tuya que nadie vio y reconócela tú.']
 },
 {
  id:'respeto', nombre:'Respeto',
  esencia:'Que tu límite valga sin que tengas que defenderlo a gritos.',
  lex:['respeto','respetada','respetado','irrespeto','irrespetada','dignidad','limite','límite','limites','límites','trato','maltrato','falta de respeto','consideracion','consideración','burla','humillacion','humillación','humillada','ridiculizada','invadida','invasion','invasión','atropellada','pasar por encima','grosero','grosería'],
  frases:['que respeten mi espacio','que no me griten','que respeten mi decision','que no pasen por encima de mi','que me traten bien','que no se burlen','que respeten mi tiempo'],
  senales:['Explicas demasiado tus decisiones, como si tuvieras que justificarlas.','Te enteras tarde de que algo te molestó: primero te adaptas, después te da rabia.','Repites un límite varias veces y ya no te crees que vaya a valer.'],
  banco:['¿Cuál fue el primer límite tuyo que no se respetó y dejaste pasar?','¿Qué te dices por dentro justo antes de tragarte un «así no»?','¿Qué límite sostienes hoy que te costó años poner?','Si mañana pusieras un límite sin explicar por qué, ¿qué temes que pase?'],
  infancia:'De pequeña o pequeño, ¿qué pasaba cuando decías que no, o cuando algo no te gustaba? ¿Se detenían, se reían, se enojaban, seguían igual? ¿Dónde estabas cuando aprendiste que era mejor no decirlo?',
  discrimina:'¿Lo que dolió fue cómo te trataron, o que no fueras libre de decidir?',
  gestos:['Di hoy un "no" pequeño y no lo acompañes de explicación.','Cuando alguien cruce un límite, nómbralo en el momento con una frase corta: "así no".','Escribe tres límites tuyos innegociables y léelos antes de tu próxima conversación difícil.']
 },
 {
  id:'autonomia', nombre:'Autonomía',
  esencia:'Decidir sobre tu propia vida sin tener que pedir permiso.',
  lex:['autonomia','autonomía','libertad','libre','independencia','independiente','decidir','decision','decisión','eleccion','elección','elegir','control','controlada','controlado','presion','presión','obligada','obligado','atrapada','atrapado','encerrada','manipulada','manipulado','imposicion','imposición','permiso','depender','dependencia','someter','sometida','dejen','dejan','mandan','mandar','ordenan','impuesto','impuesta'],
  frases:['poder decidir','que me dejen ser','que no me controlen','hacer lo que yo quiero','que no me obliguen','sentirme libre','que no decidan por mi'],
  senales:['Sientes que te ahogas cuando alguien organiza tu tiempo sin preguntarte.','Dices que sí y después buscas cómo escaparte.','Defiendes tu independencia incluso cuando aceptar ayuda te vendría bien.'],
  banco:['¿Qué decisión de tu vida de hoy no es del todo tuya?','¿A quién le sigues pidiendo permiso, aunque ya no viva contigo o ya no esté?','¿Qué harías esta semana si supieras que nadie va a opinar?','¿Cuándo aprendiste que era más seguro obedecer que elegir?'],
  infancia:'En tu infancia, ¿cuánto de lo que hacías lo elegías tú? Recuerda una vez en que quisiste algo distinto de lo que se esperaba de ti. ¿Qué pasó?',
  discrimina:'¿Lo que necesitabas era que te dejaran decidir, o que te trataran con respeto mientras decidían por ti?',
  gestos:['Toma hoy una decisión pequeña solo porque la quieres, sin consultarla.','Cuando te pidan algo, responde "déjame pensarlo" en vez de sí automático.','Bloquea en tu semana una hora que no le debas a nadie.']
 },
 {
  id:'pertenencia', nombre:'Pertenencia',
  esencia:'Tener un lugar donde no sobras y no tienes que ganarte la silla.',
  lex:['pertenencia','pertenecer','soledad','sola','solo','excluida','excluido','exclusion','exclusión','afuera','fuera','grupo','comunidad','vinculo','vínculo','conexion','conexión','desconexion','aislada','aislado','sobrar','ajena','ajeno','familia','equipo','parte','integrada','apartada'],
  frases:['sentirme parte','no sentirme sola','que me incluyan','tener un lugar','no quedarme por fuera','sentir que pertenezco','que me inviten'],
  senales:['En grupo estás midiendo si de verdad te quieren ahí.','Te vas primero de los lugares, antes de que se note que sobras.','Te cuesta creer que te buscan por ti y no por utilidad.'],
  banco:['¿En qué mesa te sientas sintiendo que te pueden pedir que te vayas?','¿Qué haces para ganarte el lugar que ya tienes?','¿Quién te hizo sentir «eres de aquí» sin que tuvieras que hacer nada?','¿De qué grupo te fuiste tú primero, antes de que te sacaran?'],
  infancia:'¿Hubo algún lugar en tu infancia — una casa, un salón, un grupo — donde sentiste claramente que no eras de ahí? ¿Y hubo alguno donde sí? ¿Qué hacía la diferencia?',
  discrimina:'¿Lo que necesitabas era formar parte del grupo, o que una persona en particular te quisiera?',
  gestos:['Escribe hoy a alguien de tu círculo sin motivo, solo para estar en contacto.','Quédate diez minutos más en el lugar donde sientas ganas de irte y observa qué pasa.','Nombra tres espacios donde sí eres de ahí, aunque sean pequeños.']
 },
 {
  id:'comprension', nombre:'Comprensión',
  esencia:'Que te escuchen hasta el final y entiendan lo que dijiste, no lo que sonó.',
  lex:['comprension','comprensión','comprendida','comprendido','entender','entendida','entendido','malentendido','escucha','escuchada','escuchado','oida','oído','atencion','atención','empatia','empatía','interrumpida','ignorada','explicar','malinterpretada','malinterpretado','sorda','indiferencia','sienten','sientan','siente'],
  frases:['que me escuchen','que me entiendan','que no me interrumpan','que me presten atencion','sentir que me oyen','que entiendan lo que siento','poder explicarme','que me sientan','que me vean por dentro'],
  senales:['Repites la misma explicación con otras palabras esperando que caiga.','Te callas a mitad de frase porque asumes que no van a entender.','Te alivia más que alguien diga "te entiendo" que una solución.'],
  banco:['¿Qué es lo que más veces has intentado explicar y sientes que nunca llegó?','¿A quién dejaste de contarle las cosas, y cuándo?','¿Qué te habría cambiado ese día un simple «entiendo que te doliera»?','¿Te entiendes tú? ¿Qué parte tuya todavía no te explicas?'],
  infancia:'De niña o niño, cuando llorabas o te quejabas, ¿qué te respondían? ¿Alguien preguntaba qué te pasaba y esperaba la respuesta completa?',
  discrimina:'¿Lo que faltó fue que te escucharan, o que estuvieran de acuerdo contigo?',
  gestos:['Antes de pedir consejo, di: "solo quiero que me escuches".','Escríbelo entero para ti primero, sin interrumpirte, antes de contarlo.','Cuando alguien te escuche de verdad, díselo. Eso enseña cómo tratarte.']
 },
 {
  id:'confianza', nombre:'Confianza',
  esencia:'Poder creerle a alguien sin quedarte vigilando.',
  lex:['confianza','confiar','desconfianza','desconfiar','traicion','traición','traicionada','traicionado','mentira','mentiras','engano','engaño','enganada','engañada','lealtad','desleal','sinceridad','honestidad','deshonesto','verdad','falsedad','falsa','fidelidad','infidelidad','palabra','promesa','decepcion','decepción','defraudada'],
  frases:['que no me mientan','que me digan la verdad','poder confiar','que cumplan lo que dicen','que sean sinceros','que no me traicionen','que no me oculten cosas'],
  senales:['Buscas pruebas, aunque no quieras ser la que revisa.','Guardas una parte de ti afuera de la relación, por si acaso.','Una incoherencia pequeña te reactiva toda una historia vieja.'],
  banco:['¿Qué revisas, y desde cuándo?','¿Cuál fue la primera promesa que te rompieron?','¿Qué te prometiste a ti y no has cumplido?','¿Qué tendría que pasar, en hechos concretos, para que volvieras a confiar?'],
  infancia:'¿Recuerdas la primera vez que alguien grande te prometió algo y no lo cumplió, o te enteraste de que te habían ocultado algo? ¿Qué decidiste sobre la gente después de eso?',
  discrimina:'¿Lo que se rompió fue la confianza en el otro, o tu sensación de estar a salvo en general?',
  gestos:['Verifica lo que supones preguntándolo en voz alta, en vez de investigarlo.','Cumple hoy algo pequeño que te prometiste a ti: así se reconstruye desde adentro.','Nombra una persona que sí ha sido coherente contigo y registra por qué lo sabes.']
 },
 {
  id:'justicia', nombre:'Justicia',
  esencia:'Que lo que das y lo que recibes se parezcan.',
  lex:['justicia','justa','justo','injusticia','injusta','injusto','equidad','desigualdad','reciprocidad','equilibrio','desequilibrio','igualdad','favoritismo','preferencia','abuso','aprovechan','aprovechada','explotada','desproporcion','merecer','merecido','trampa','desventaja'],
  frases:['que sea justo','que no se aprovechen','dar y recibir igual','que repartan bien','que no haya preferencias','que reconozcan lo que aporto','que sea equitativo'],
  senales:['Llevas una cuenta silenciosa de quién puso cuánto.','Te indigna más lo injusto con otros que contigo.','Sigues dando de más y después te llena de rabia.'],
  banco:['¿Qué cuenta llevas en silencio, y con quién?','¿Qué das esperando que te devuelvan, sin haberlo pedido?','En tu casa de infancia, ¿quién recibía más y cómo lo supiste?','¿Qué pasaría si dejaras de dar de más en esa relación?'],
  infancia:'En tu casa de infancia, ¿se repartían igual el cariño, la atención, las exigencias? ¿Hubo alguien que recibía distinto? ¿Qué lugar te tocó a ti?',
  discrimina:'¿Lo que dolió fue el desequilibrio, o que no valoraran lo que tú pusiste?',
  gestos:['Nombra el desequilibrio en el momento, con números: "yo puse esto, tú esto".','Antes de dar de más, pregúntate si lo das libre o esperando cobro.','Retira hoy un aporte que estabas dando solo por costumbre.']
 },
 {
  id:'apoyo', nombre:'Apoyo',
  esencia:'No cargar sola. Que alguien sostenga la otra punta.',
  lex:['apoyo','apoyada','apoyado','ayuda','ayudar','sosten','sostén','soledad','sola','solo','abandono','abandonada','abandonado','desamparo','respaldo','acompanamiento','acompañamiento','acompanada','acompañada','companía','compañia','compañía','cargar','carga','peso','auxilio','colaboracion','colaboración','solidaridad'],
  frases:['que me ayuden','no cargar sola','que alguien este ahi','sentirme acompanada','que me respalden','que no me dejen sola','que me den la mano'],
  senales:['Haces todo tú porque pedir se siente más costoso que cargarlo.','Te enojas de que no te ayuden, pero no lo pediste.','Eres el hombro de todos y no sabes de quién es el tuyo.'],
  banco:['¿Cuándo fue la última vez que pediste ayuda de verdad?','¿Qué aprendiste a hacer sola o solo que no te tocaba a ti?','¿A quién le sostienes tú lo que nadie te sostiene?','¿Qué temes que pase si te muestras necesitada o necesitado?'],
  infancia:'Cuando eras pequeña o pequeño y algo te quedaba grande, ¿quién llegaba? Si no llegaba nadie, ¿qué aprendiste a hacer tú sola?',
  discrimina:'¿Lo que necesitabas era ayuda concreta, o que alguien estuviera presente aunque no resolviera nada?',
  gestos:['Pide hoy una ayuda pequeña y concreta, aunque puedas hacerla sola.','Cuando digas "yo puedo", agrega por dentro: "y aun así no tengo que".','Escribe los nombres de tres personas a quienes sí podrías llamar. Guárdalos donde los veas.']
 },
 {
  id:'descanso', nombre:'Descanso',
  esencia:'Poder parar sin tener que justificarlo ni pagarlo con culpa.',
  lex:['descanso','descansar','pausa','agotamiento','agotada','agotado','cansancio','cansada','cansado','exigencia','autoexigencia','presion','presión','desbordada','desbordado','saturada','respiro','paz','tranquilidad','quietud','silencio','espacio','tiempo para mi','culpa','parar','sobrecarga','exhausta'],
  frases:['poder descansar','tener tiempo para mi','que me dejen en paz','poder parar','un respiro','no hacer nada sin culpa','espacio propio','silencio'],
  senales:['Descansar te produce culpa, así que descansas mal.','Llenas cada hueco de la agenda y después te preguntas por qué estás así.','Solo te permites parar cuando el cuerpo te obliga.'],
  banco:['¿Qué te tienes que ganar para poder descansar?','¿De quién es la voz que te dice que estás perdiendo el tiempo?','¿Qué parte de tu cansancio no es tuya?','¿Cómo se descansaba en tu casa cuando eras pequeña o pequeño?'],
  infancia:'De niña o niño, ¿estaba bien visto no hacer nada en tu casa? ¿Qué se decía de la gente que descansaba? ¿Qué tenías que hacer tú para merecer un rato tuyo?',
  discrimina:'¿Lo que necesitabas era descanso, o que alguien te ayudara a cargar?',
  gestos:['Agenda hoy quince minutos vacíos y cúmplelos como si fueran una cita con alguien importante.','Cuando aparezca la culpa al parar, di en voz alta: "descansar también es hacer algo".','Quita una cosa de tu lista de hoy. Una sola. Sin reemplazarla.']
 },
 {
  id:'competencia', nombre:'Competencia',
  esencia:'Sentir que eres capaz, que lo que haces sirve para algo.',
  lex:['capacidad','capaz','incapaz','incapacidad','competencia','logro','fracaso','fracasada','fracasado','inutil','inútil','torpe','error','equivocacion','equivocación','exito','éxito','suficiente','insuficiente','servir','util','útil','rendimiento','desempeno','desempeño','autoestima','confianza en mi','dominio','aprender'],
  frases:['sentirme capaz','que no soy inutil','poder hacerlo bien','sentir que sirvo','que soy suficiente','no equivocarme','lograrlo'],
  senales:['Un error pequeño te reorganiza la idea completa de quién eres.','Evitas lo nuevo por no quedar mal.','No te crees los logros: siempre fue suerte, ayuda o casualidad.'],
  banco:['¿Cuál fue el error que más caro te costó por dentro?','¿Quién te calificaba de niña o niño, y con qué cara?','¿Qué sabes hacer bien y no te dejas disfrutar?','¿Qué intentarías si equivocarte no cambiara lo que vales?'],
  infancia:'De pequeña o pequeño, ¿cómo reaccionaban cuando te equivocabas? ¿Y cuando lograbas algo? ¿Cuál de las dos reacciones recuerdas más nítida?',
  discrimina:'¿Lo que dolió fue sentirte incapaz, o que nadie reconociera lo que sí lograste?',
  gestos:['Escribe tres cosas que hoy hiciste bien, por pequeñas que sean, sin agregarles un "pero".','Haz algo que sabes hacer bien, solo para recordarle al cuerpo la sensación.','Cuando te equivoques hoy, di "aprendí algo" antes de decir cualquier otra cosa.']
 },
 {
  id:'sentido', nombre:'Sentido',
  esencia:'Que lo que haces tenga una dirección que tú reconoces como tuya.',
  lex:['sentido','proposito','propósito','direccion','dirección','rumbo','vacio','vacío','sinsentido','perdida','perdido','perdida de sentido','motivacion','motivación','desmotivada','ilusion','ilusión','esperanza','coherencia','incoherencia','valores','autenticidad','proyecto','futuro','para que','significado','trascender'],
  frases:['para que estoy haciendo esto','que tenga sentido','sentir que voy a algun lado','no sentirme vacia','tener un proposito','saber para donde voy','que valga la pena'],
  senales:['Cumples con todo y aun así sientes que no estás en tu vida.','Piensas "¿y esto para qué?" varias veces al día.','Lo que antes te movía ya no te mueve y no sabes con qué reemplazarlo.'],
  banco:['¿Qué parte de tu semana sientes que no es tuya?','¿Qué hacías a los diez años que te hacía olvidar la hora?','¿Qué te gustaría que dijeran de ti quienes te conocen de verdad?','Si esto que haces hoy no llevara a ningún lado, ¿lo seguirías haciendo?'],
  infancia:'¿Qué querías ser o hacer antes de que alguien te dijera si era viable? ¿Qué pasó con eso? ¿Quién te dijo qué?',
  discrimina:'¿Lo que falta es dirección propia, o libertad para elegirla?',
  gestos:['Dedica hoy veinte minutos a algo que no sirva para nada más que gustarte.','Escribe qué querrías que quedara de ti, y una acción de esta semana que apunte ahí.','Elimina de la semana una actividad que no apunta a nada tuyo.']
 },
 {
  id:'alegria', nombre:'Alegría',
  esencia:'Que la vida tenga sabor y juego, no solo deberes bien cumplidos.',
  lex:['alegria','alegría','gozo','disfrute','disfrutar','placer','juego','jugar','diversion','diversión','risa','reir','reír','ligereza','pesadez','tristeza','apatia','apatía','aburrimiento','gris','monotonia','monotonía','celebrar','celebracion','celebración','entusiasmo','ganas','vitalidad','deber'],
  frases:['poder disfrutar','volver a reirme','que la vida no sea solo deber','tener ganas','pasarla bien','sentir alegria','jugar'],
  senales:['Aplazas el disfrute para cuando termines todo — y nunca termina.','Te sientes culpable pasándola bien.','Recuerdas cuándo fue la última vez que te reíste a carcajadas y queda lejos.'],
  banco:['¿Cuándo fue la última vez que te reíste sin medirte?','¿Qué te permites disfrutar solo cuando ya terminaste todo?','¿Quién disfrutaba en tu familia, y cómo se le miraba?','¿Qué cosa simple te daba alegría y dejaste de hacer?'],
  infancia:'¿Qué hacías de niña o niño que te hacía perder la noción del tiempo? ¿Cuándo dejaste de hacerlo, y por qué?',
  discrimina:'¿Lo que falta es disfrute, o descanso para poder disfrutar?',
  gestos:['Haz hoy una cosa inútil y divertida durante diez minutos.','Pon la canción que te hacía feliz a los quince años y muévete.','Agenda algo esta semana que no tenga ningún propósito productivo.']
 }
];
