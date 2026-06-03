import type { Verb } from '../types';

export const verbs: Verb[] = [
  {
    id: 'hablar',
    infinitive: 'hablar',
    english: 'to speak',
    type: 'regular',
    conjugations: {},
  },
  {
    id: 'comer',
    infinitive: 'comer',
    english: 'to eat',
    type: 'regular',
    conjugations: {},
  },
  {
    id: 'vivir',
    infinitive: 'vivir',
    english: 'to live',
    type: 'regular',
    conjugations: {},
  },
  {
    id: 'pensar',
    infinitive: 'pensar',
    english: 'to think',
    type: 'stem_change',
    conjugations: {
      present: { yo: 'pienso', 'tú': 'piensas', 'él': 'piensa', nosotros: 'pensamos', ellos: 'piensan' },
      preterite: { yo: 'pensé', 'tú': 'pensaste', 'él': 'pensó', nosotros: 'pensamos', ellos: 'pensaron' },
    },
  },
  {
    id: 'querer',
    infinitive: 'querer',
    english: 'to want',
    type: 'irregular',
    conjugations: {
      present: { yo: 'quiero', 'tú': 'quieres', 'él': 'quiere', nosotros: 'queremos', ellos: 'quieren' },
      preterite: { yo: 'quise', 'tú': 'quisiste', 'él': 'quiso', nosotros: 'quisimos', ellos: 'quisieron' },
      future: { yo: 'querré', 'tú': 'querrás', 'él': 'querrá', nosotros: 'querremos', ellos: 'querrán' },
      conditional: { yo: 'querría', 'tú': 'querrías', 'él': 'querría', nosotros: 'querríamos', ellos: 'querrían' },
    },
  },
  {
    id: 'tener',
    infinitive: 'tener',
    english: 'to have',
    type: 'irregular',
    conjugations: {
      present: { yo: 'tengo', 'tú': 'tienes', 'él': 'tiene', nosotros: 'tenemos', ellos: 'tienen' },
      preterite: { yo: 'tuve', 'tú': 'tuviste', 'él': 'tuvo', nosotros: 'tuvimos', ellos: 'tuvieron' },
      future: { yo: 'tendré', 'tú': 'tendrás', 'él': 'tendrá', nosotros: 'tendremos', ellos: 'tendrán' },
      conditional: { yo: 'tendría', 'tú': 'tendrías', 'él': 'tendría', nosotros: 'tendríamos', ellos: 'tendrían' },
    },
  },
  {
    id: 'hacer',
    infinitive: 'hacer',
    english: 'to do/make',
    type: 'irregular',
    conjugations: {
      present: { yo: 'hago', 'tú': 'haces', 'él': 'hace', nosotros: 'hacemos', ellos: 'hacen' },
      preterite: { yo: 'hice', 'tú': 'hiciste', 'él': 'hizo', nosotros: 'hicimos', ellos: 'hicieron' },
      future: { yo: 'haré', 'tú': 'harás', 'él': 'hará', nosotros: 'haremos', ellos: 'harán' },
      conditional: { yo: 'haría', 'tú': 'harías', 'él': 'haría', nosotros: 'haríamos', ellos: 'harían' },
    },
  },
  {
    id: 'estar',
    infinitive: 'estar',
    english: 'to be (temporary)',
    type: 'irregular',
    conjugations: {
      present: { yo: 'estoy', 'tú': 'estás', 'él': 'está', nosotros: 'estamos', ellos: 'están' },
      preterite: { yo: 'estuve', 'tú': 'estuviste', 'él': 'estuvo', nosotros: 'estuvimos', ellos: 'estuvieron' },
      imperfect: { yo: 'estaba', 'tú': 'estabas', 'él': 'estaba', nosotros: 'estábamos', ellos: 'estaban' },
      future: { yo: 'estaré', 'tú': 'estarás', 'él': 'estará', nosotros: 'estaremos', ellos: 'estarán' },
      conditional: { yo: 'estaría', 'tú': 'estarías', 'él': 'estaría', nosotros: 'estaríamos', ellos: 'estarían' },
    },
  },
  {
    id: 'ser',
    infinitive: 'ser',
    english: 'to be (permanent)',
    type: 'irregular',
    conjugations: {
      present: { yo: 'soy', 'tú': 'eres', 'él': 'es', nosotros: 'somos', ellos: 'son' },
      preterite: { yo: 'fui', 'tú': 'fuiste', 'él': 'fue', nosotros: 'fuimos', ellos: 'fueron' },
      imperfect: { yo: 'era', 'tú': 'eras', 'él': 'era', nosotros: 'éramos', ellos: 'eran' },
      future: { yo: 'seré', 'tú': 'serás', 'él': 'será', nosotros: 'seremos', ellos: 'serán' },
      conditional: { yo: 'sería', 'tú': 'serías', 'él': 'sería', nosotros: 'seríamos', ellos: 'serían' },
    },
  },
  {
    id: 'ir',
    infinitive: 'ir',
    english: 'to go',
    type: 'irregular',
    conjugations: {
      present: { yo: 'voy', 'tú': 'vas', 'él': 'va', nosotros: 'vamos', ellos: 'van' },
      preterite: { yo: 'fui', 'tú': 'fuiste', 'él': 'fue', nosotros: 'fuimos', ellos: 'fueron' },
      imperfect: { yo: 'iba', 'tú': 'ibas', 'él': 'iba', nosotros: 'íbamos', ellos: 'iban' },
      future: { yo: 'iré', 'tú': 'irás', 'él': 'irá', nosotros: 'iremos', ellos: 'irán' },
      conditional: { yo: 'iría', 'tú': 'irías', 'él': 'iría', nosotros: 'iríamos', ellos: 'irían' },
    },
  },
  {
    id: 'venir',
    infinitive: 'venir',
    english: 'to come',
    type: 'irregular',
    conjugations: {
      present: { yo: 'vengo', 'tú': 'vienes', 'él': 'viene', nosotros: 'venimos', ellos: 'vienen' },
      preterite: { yo: 'vine', 'tú': 'viniste', 'él': 'vino', nosotros: 'vinimos', ellos: 'vinieron' },
      future: { yo: 'vendré', 'tú': 'vendrás', 'él': 'vendrá', nosotros: 'vendremos', ellos: 'vendrán' },
      conditional: { yo: 'vendría', 'tú': 'vendrías', 'él': 'vendría', nosotros: 'vendríamos', ellos: 'vendrían' },
    },
  },
  {
    id: 'decir',
    infinitive: 'decir',
    english: 'to say/tell',
    type: 'irregular',
    conjugations: {
      present: { yo: 'digo', 'tú': 'dices', 'él': 'dice', nosotros: 'decimos', ellos: 'dicen' },
      preterite: { yo: 'dije', 'tú': 'dijiste', 'él': 'dijo', nosotros: 'dijimos', ellos: 'dijeron' },
      future: { yo: 'diré', 'tú': 'dirás', 'él': 'dirá', nosotros: 'diremos', ellos: 'dirán' },
      conditional: { yo: 'diría', 'tú': 'dirías', 'él': 'diría', nosotros: 'diríamos', ellos: 'dirían' },
    },
  },
  {
    id: 'poder',
    infinitive: 'poder',
    english: 'to be able to',
    type: 'irregular',
    conjugations: {
      present: { yo: 'puedo', 'tú': 'puedes', 'él': 'puede', nosotros: 'podemos', ellos: 'pueden' },
      preterite: { yo: 'pude', 'tú': 'pudiste', 'él': 'pudo', nosotros: 'pudimos', ellos: 'pudieron' },
      future: { yo: 'podré', 'tú': 'podrás', 'él': 'podrá', nosotros: 'podremos', ellos: 'podrán' },
      conditional: { yo: 'podría', 'tú': 'podrías', 'él': 'podría', nosotros: 'podríamos', ellos: 'podrían' },
    },
  },
  {
    id: 'saber',
    infinitive: 'saber',
    english: 'to know',
    type: 'irregular',
    conjugations: {
      present: { yo: 'sé', 'tú': 'sabes', 'él': 'sabe', nosotros: 'sabemos', ellos: 'saben' },
      preterite: { yo: 'supe', 'tú': 'supiste', 'él': 'supo', nosotros: 'supimos', ellos: 'supieron' },
      future: { yo: 'sabré', 'tú': 'sabrás', 'él': 'sabrá', nosotros: 'sabremos', ellos: 'sabrán' },
      conditional: { yo: 'sabría', 'tú': 'sabrías', 'él': 'sabría', nosotros: 'sabríamos', ellos: 'sabrían' },
    },
  },
  {
    id: 'poner',
    infinitive: 'poner',
    english: 'to put',
    type: 'irregular',
    conjugations: {
      present: { yo: 'pongo', 'tú': 'pones', 'él': 'pone', nosotros: 'ponemos', ellos: 'ponen' },
      preterite: { yo: 'puse', 'tú': 'pusiste', 'él': 'puso', nosotros: 'pusimos', ellos: 'pusieron' },
      future: { yo: 'pondré', 'tú': 'pondrás', 'él': 'pondrá', nosotros: 'pondremos', ellos: 'pondrán' },
      conditional: { yo: 'pondría', 'tú': 'pondrías', 'él': 'pondría', nosotros: 'pondríamos', ellos: 'pondrían' },
    },
  },
  {
    id: 'dar',
    infinitive: 'dar',
    english: 'to give',
    type: 'irregular',
    conjugations: {
      present: { yo: 'doy', 'tú': 'das', 'él': 'da', nosotros: 'damos', ellos: 'dan' },
      preterite: { yo: 'di', 'tú': 'diste', 'él': 'dio', nosotros: 'dimos', ellos: 'dieron' },
      future: { yo: 'daré', 'tú': 'darás', 'él': 'dará', nosotros: 'daremos', ellos: 'darán' },
      conditional: { yo: 'daría', 'tú': 'darías', 'él': 'daría', nosotros: 'daríamos', ellos: 'darían' },
    },
  },
  {
    id: 'ver',
    infinitive: 'ver',
    english: 'to see',
    type: 'irregular',
    conjugations: {
      present: { yo: 'veo', 'tú': 'ves', 'él': 've', nosotros: 'vemos', ellos: 'ven' },
      preterite: { yo: 'vi', 'tú': 'viste', 'él': 'vio', nosotros: 'vimos', ellos: 'vieron' },
      imperfect: { yo: 'veía', 'tú': 'veías', 'él': 'veía', nosotros: 'veíamos', ellos: 'veían' },
      future: { yo: 'veré', 'tú': 'verás', 'él': 'verá', nosotros: 'veremos', ellos: 'verán' },
      conditional: { yo: 'vería', 'tú': 'verías', 'él': 'vería', nosotros: 'veríamos', ellos: 'verían' },
    },
  },
  {
    id: 'empezar',
    infinitive: 'empezar',
    english: 'to begin',
    type: 'stem_change',
    conjugations: {
      present: { yo: 'empiezo', 'tú': 'empiezas', 'él': 'empieza', nosotros: 'empezamos', ellos: 'empiezan' },
      preterite: { yo: 'empecé', 'tú': 'empezaste', 'él': 'empezó', nosotros: 'empezamos', ellos: 'empezaron' },
    },
  },
  {
    id: 'entender',
    infinitive: 'entender',
    english: 'to understand',
    type: 'stem_change',
    conjugations: {
      present: { yo: 'entiendo', 'tú': 'entiendes', 'él': 'entiende', nosotros: 'entendemos', ellos: 'entienden' },
      preterite: { yo: 'entendí', 'tú': 'entendiste', 'él': 'entendió', nosotros: 'entendimos', ellos: 'entendieron' },
    },
  },
  {
    id: 'dormir',
    infinitive: 'dormir',
    english: 'to sleep',
    type: 'stem_change',
    conjugations: {
      present: { yo: 'duermo', 'tú': 'duermes', 'él': 'duerme', nosotros: 'dormimos', ellos: 'duermen' },
      preterite: { yo: 'dormí', 'tú': 'dormiste', 'él': 'durmió', nosotros: 'dormimos', ellos: 'durmieron' },
    },
  },
  {
    id: 'preferir',
    infinitive: 'preferir',
    english: 'to prefer',
    type: 'stem_change',
    conjugations: {
      present: { yo: 'prefiero', 'tú': 'prefieres', 'él': 'prefiere', nosotros: 'preferimos', ellos: 'prefieren' },
      preterite: { yo: 'preferí', 'tú': 'preferiste', 'él': 'prefirió', nosotros: 'preferimos', ellos: 'prefirieron' },
    },
  },
  {
    id: 'escribir',
    infinitive: 'escribir',
    english: 'to write',
    type: 'regular',
    conjugations: {},
  },
  {
    id: 'leer',
    infinitive: 'leer',
    english: 'to read',
    type: 'regular',
    conjugations: {},
  },
  {
    id: 'trabajar',
    infinitive: 'trabajar',
    english: 'to work',
    type: 'regular',
    conjugations: {},
  },
  {
    id: 'estudiar',
    infinitive: 'estudiar',
    english: 'to study',
    type: 'regular',
    conjugations: {},
  },
  {
    id: 'caminar',
    infinitive: 'caminar',
    english: 'to walk',
    type: 'regular',
    conjugations: {},
  },
  {
    id: 'correr',
    infinitive: 'correr',
    english: 'to run',
    type: 'regular',
    conjugations: {},
  },
  {
    id: 'beber',
    infinitive: 'beber',
    english: 'to drink',
    type: 'regular',
    conjugations: {},
  },
  {
    id: 'abrir',
    infinitive: 'abrir',
    english: 'to open',
    type: 'regular',
    conjugations: {},
  },
  {
    id: 'cerrar',
    infinitive: 'cerrar',
    english: 'to close',
    type: 'stem_change',
    conjugations: {
      present: { yo: 'cierro', 'tú': 'cierras', 'él': 'cierra', nosotros: 'cerramos', ellos: 'cierran' },
      preterite: { yo: 'cerré', 'tú': 'cerraste', 'él': 'cerró', nosotros: 'cerramos', ellos: 'cerraron' },
    },
  },
  {
    id: 'perder',
    infinitive: 'perder',
    english: 'to lose',
    type: 'stem_change',
    conjugations: {
      present: { yo: 'pierdo', 'tú': 'pierdes', 'él': 'pierde', nosotros: 'perdemos', ellos: 'pierden' },
      preterite: { yo: 'perdí', 'tú': 'perdiste', 'él': 'perdió', nosotros: 'perdimos', ellos: 'perdieron' },
    },
  },
];

export function getVerbsByType(type: 'regular' | 'irregular' | 'stem_change'): Verb[] {
  return verbs.filter((v) => v.type === type);
}

export function getVerbsByEnding(ending: 'ar' | 'er' | 'ir'): Verb[] {
  return verbs.filter((v) => v.infinitive.endsWith(ending));
}

export function getVerbById(id: string): Verb | undefined {
  return verbs.find((v) => v.id === id);
}
