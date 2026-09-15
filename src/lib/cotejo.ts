/** Cotejo semántico entre la palabra propia y el diccionario de necesidades. */
import { NECESIDADES, type Necesidad } from "./necesidades";

export type Coincidencia = { nec: Necesidad; score: number };

const STOP = new Set<string>(['de','la','el','los','las','un','una','unos','unas','y','o','que','a','en','mi','me','se','lo','al','del','por','para','con','sin','no','es','ser','estar','sentir','siento','senti','sentí','mas','más','muy','como','cuando','tener','tengo','su','sus','le','les','yo','te','ha','han','hay','esta','este','eso','ese','esa','algo','alguien','todo','toda','pero','si','sí','ni','yo','vez','gente','persona']);

export function norm(s: string): string {
  return (s||'').toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g,'')
    .replace(/[^a-z0-9ñ\s]/g,' ')
    .replace(/\s+/g,' ').trim();
}
export function toks(s: string): string[] { return norm(s).split(' ').filter(t=>t.length>2 && !STOP.has(t)); }

function lev(a: string, b: string): number {
  if(a===b) return 0;
  const m=a.length,n=b.length;
  if(!m||!n) return Math.max(m,n);
  let prev=Array.from({length:n+1},(_,j)=>j), cur=new Array(n+1);
  for(let i=1;i<=m;i++){
    cur[0]=i;
    for(let j=1;j<=n;j++){
      cur[j]=Math.min(prev[j]+1, cur[j-1]+1, prev[j-1]+(a[i-1]===b[j-1]?0:1));
    }
    [prev,cur]=[cur,prev];
  }
  return prev[n];
}
function sim(a: string, b: string): number {
  const d=lev(a,b), L=Math.max(a.length,b.length);
  return L?1-d/L:0;
}
/* raíz aproximada: recorta sufijos flexivos del español */
function raiz(t: string): string {
  const r = t.replace(/(ciones|cion|dades|dad|mente|abamos|aban|aba|aron|aste|amos|ando|iendo|adas|ados|ada|ado|osa|oso|ar|er|ir|es|as|os|a|o|e)$/,'');
  return r.length>=4 ? r : t;
}

export function cotejar(entrada: string): Coincidencia[] {
  const tk = toks(entrada);
  const n  = norm(entrada);
  if(!tk.length) return [];

  const puntajes = NECESIDADES.map(nec=>{
    const lex = nec.lex.map(norm);
    const frs = nec.frases.map(norm);
    let mejor=0, extras=0;

    // coincidencia por frase completa
    for(const f of frs){
      if(n.includes(f) || f.includes(n)) { mejor=Math.max(mejor,.98); }
      const ft = toks(f);
      const comunes = ft.filter(x=>tk.includes(x)).length;
      if(ft.length && comunes>=2) mejor=Math.max(mejor,.72+.06*comunes);
      else if(ft.length && comunes===1 && ft.length<=3) mejor=Math.max(mejor,.55);
    }
    // coincidencia por token
    for(const t of tk){
      let mt=0;
      for(const l of lex){
        if(t===l){ mt=1; break; }
        const rt=raiz(t), rl=raiz(l);
        if(rt.length>=4 && rt===rl){ mt=Math.max(mt,.94); continue; }
        if(rt.length>=4 && (l.startsWith(rt)||t.startsWith(rl))){ mt=Math.max(mt,.86); continue; }
        const s=sim(t,l);
        if(s>=.78) mt=Math.max(mt,s*.9);
      }
      if(mt>mejor){ extras+=mejor>0?1:0; mejor=mt; }
      else if(mt>=.8) extras++;
    }
    // el nombre mismo de la necesidad
    const nn=norm(nec.nombre);
    if(n===nn) mejor=1;
    return { nec, score: Math.min(1, mejor + Math.min(extras,3)*.03) };
  });

  return puntajes.filter(p=>p.score>0).sort((a,b)=>b.score-a.score);
}
