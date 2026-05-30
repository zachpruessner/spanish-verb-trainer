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
      present: { yo: 'pienso', tu: 'piensas', 'él': 'piensa', nosotros: 'pensamos', ellos: 'piensan' },
      preterite: { yo: 'pensé', tu: 'pensaste', 'él': 'pensó', nosotros: 'pensamos', ellos: 'pensaron' },
    },
  },
  {
    id: 'querer',
    infinitive: 'querer',
    english: 'to want',
    type: 'irregular',
    conjugations: {
      present: { yo: 'quiero', tu: 'quieres', 'él': 'quiere', nosotros: 'queremos', ellos: 'quieren' },
      preterite: { yo: 'quise', tu: 'quisiste', 'él': 'quiso', nosotros: 'quisimos', ellos: 'quisieron' },
      future: { yo: 'querré', tu: 'querrás', 'él': 'querrá', nosotros: 'querremos', ellos: 'querrán' },
      conditional: { yo: 'querría', tu: 'querrías', 'él': 'querría', nosotros: 'querríamos', ellos: 'querrían' },
    },
  },
  {
    id: 'tener',
    infinitive: 'tener',
    english: 'to have',
    type: 'irregular',
    conjugations: {
      present: { yo: 'tengo', tu: 'tienes', 'él': 'tiene', nosotros: 'tenemos', ellos: 'tienen' },
      preterite: { yo: 'tuve', tu: 'tuviste', 'él': 'tuvo', nosotros: 'tuvimos', ellos: 'tuvieron' },
      future: { yo: 'tendré', tu: 'tendrás', 'él': 'tendrá', nosotros: 'tendremos', ellos: 'tendrán' },
      conditional: { yo: 'tendría', tu: 'tendrías', 'él': 'tendría', nosotros: 'tendríamos', ellos: 'tendrían' },
    },
  },
  {
    id: 'hacer',
    infinitive: 'hacer',
    english: 'to do/make',
    type: 'irregular',
    conjugations: {
      present: { yo: 'hago', tu: 'haces', 'él': 'hace', nosotros: 'hacemos', ellos: 'hacen' },
      preterite: { yo: 'hice', tu: 'hiciste', 'él': 'hizo', nosotros: 'hicimos', ellos: 'hicieron' },
      future: { yo: 'haré', tu: 'harás', 'él': 'hará', nosotros: 'haremos', ellos: 'harán' },
      conditional: { yo: 'haría', tu: 'harías', 'él': 'haría', nosotros: 'haríamos', ellos: 'harían' },
    },
  },
  {
    id: 'ser',
    infinitive: 'ser',
    english: 'to be (permanent)',
    type: 'irregular',
    conjugations: {
      present: { yo: 'soy', tu: 'eres', 'él': 'es', nosotros: 'somos', ellos: 'son' },
      preterite: { yo: 'fui', tu: 'fuiste', 'él': 'fue', nosotros: 'fuimos', ellos: 'fueron' },
      imperfect: { yo: 'era', tu: 'eras', 'él': 'era', nosotros: 'éramos', ellos: 'eran' },
      future: { yo: 'seré', tu: 'serás', 'él': 'será', nosotros: 'seremos', ellos: 'serán' },
      conditional: { yo: 'sería', tu: 'serías', 'él': 'sería', nosotros: 'seríamos', ellos: 'serían' },
    },
  },
  {
    id: 'ir',
    infinitive: 'ir',
    english: 'to go',
    type: 'irregular',
    conjugations: {
      present: { yo: 'voy', tu: 'vas', 'él': 'va', nosotros: 'vamos', ellos: 'van' },
      preterite: { yo: 'fui', tu: 'fuiste', 'él': 'fue', nosotros: 'fuimos', ellos: 'fueron' },
      imperfect: { yo: 'iba', tu: 'ibas', 'él': 'iba', nosotros: 'íbamos', ellos: 'iban' },
      future: { yo: 'iré', tu: 'irás', 'él': 'irá', nosotros: 'iremos', ellos: 'irán' },
      conditional: { yo: 'iría', tu: 'irías', 'él': 'iría', nosotros: 'iríamos', ellos: 'irían' },
    },
  },
  {
    id: 'venir',
    infinitive: 'venir',
    english: 'to come',
    type: 'irregular',
    conjugations: {
      present: { yo: 'vengo', tu: 'vienes', 'él': 'viene', nosotros: 'venimos', ellos: 'vienen' },
      preterite: { yo: 'vine', tu: 'viniste', 'él': 'vino', nosotros: 'vinimos', ellos: 'vinieron' },
      future: { yo: 'vendré', tu: 'vendrás', 'él': 'vendrá', nosotros: 'vendremos', ellos: 'vendrán' },
      conditional: { yo: 'vendría', tu: 'vendrías', 'él': 'vendría', nosotros: 'vendríamos', ellos: 'vendrían' },
    },
  },
  {
    id: 'decir',
    infinitive: 'decir',
    english: 'to say/tell',
    type: 'irregular',
    conjugations: {
      present: { yo: 'digo', tu: 'dices', 'él': 'dice', nosotros: 'decimos', ellos: 'dicen' },
      preterite: { yo: 'dije', tu: 'dijiste', 'él': 'dijo', nosotros: 'dijimos', ellos: 'dijeron' },
      future: { yo: 'diré', tu: 'dirás', 'él': 'dirá', nosotros: 'diremos', ellos: 'dirán' },
      conditional: { yo: 'diría', tu: 'dirías', 'él': 'diría', nosotros: 'diríamos', ellos: 'dirían' },
    },
  },
  {
    id: 'poder',
    infinitive: 'poder',
    english: 'to be able to',
    type: 'irregular',
    conjugations: {
      present: { yo: 'puedo', tu: 'puedes', 'él': 'puede', nosotros: 'podemos', ellos: 'pueden' },
      preterite: { yo: 'pude', tu: 'pudiste', 'él': 'pudo', nosotros: 'pudimos', ellos: 'pudieron' },
      future: { yo: 'podré', tu: 'podrás', 'él': 'podrá', nosotros: 'podremos', ellos: 'podrán' },
      conditional: { yo: 'podría', tu: 'podrías', 'él': 'podría', nosotros: 'podríamos', ellos: 'podrían' },
    },
  },
  {
    id: 'saber',
    infinitive: 'saber',
    english: 'to know',
    type: 'irregular',
    conjugations: {
      present: { yo: 'sé', tu: 'sabes', 'él': 'sabe', nosotros: 'sabemos', ellos: 'saben' },
      preterite: { yo: 'supe', tu: 'supiste', 'él': 'supo', nosotros: 'supimos', ellos: 'supieron' },
      future: { yo: 'sabré', tu: 'sabrás', 'él': 'sabrá', nosotros: 'sabremos', ellos: 'sabrán' },
      conditional: { yo: 'sabría', tu: 'sabrías', 'él': 'sabría', nosotros: 'sabríamos', ellos: 'sabrían' },
    },
  },
  {
    id: 'poner',
    infinitive: 'poner',
    english: 'to put',
    type: 'irregular',
    conjugations: {
      present: { yo: 'pongo', tu: 'pones', 'él': 'pone', nosotros: 'ponemos', ellos: 'ponen' },
      preterite: { yo: 'puse', tu: 'pusiste', 'él': 'puso', nosotros: 'pusimos', ellos: 'pusieron' },
      future: { yo: 'pondré', tu: 'pondrás', 'él': 'pondrá', nosotros: 'pondremos', ellos: 'pondrán' },
      conditional: { yo: 'pondría', tu: 'pondrías', 'él': 'pondría', nosotros: 'pondríamos', ellos: 'pondrían' },
    },
  },
  {
    id: 'dar',
    infinitive: 'dar',
    english: 'to give',
    type: 'irregular',
    conjugations: {
      present: { yo: 'doy', tu: 'das', 'él': 'da', nosotros: 'damos', ellos: 'dan' },
      preterite: { yo: 'di', tu: 'diste', 'él': 'dio', nosotros: 'dimos', ellos: 'dieron' },
      future: { yo: 'daré', tu: 'darás', 'él': 'dará', nosotros: 'daremos', ellos: 'darán' },
      conditional: { yo: 'daría', tu: 'darías', 'él': 'daría', nosotros: 'daríamos', ellos: 'darían' },
    },
  },
  {
    id: 'ver',
    infinitive: 'ver',
    english: 'to see',
    type: 'irregular',
    conjugations: {
      present: { yo: 'veo', tu: 'ves', 'él': 've', nosotros: 'vemos', ellos: 'ven' },
      preterite: { yo: 'vi', tu: 'viste', 'él': 'vio', nosotros: 'vimos', ellos: 'vieron' },
      imperfect: { yo: 'veía', tu: 'veías', 'él': 'veía', nosotros: 'veíamos', ellos: 'veían' },
      future: { yo: 'veré', tu: 'verás', 'él': 'verá', nosotros: 'veremos', ellos: 'verán' },
      conditional: { yo: 'vería', tu: 'verías', 'él': 'vería', nosotros: 'veríamos', ellos: 'verían' },
    },
  },
  {
    id: 'empezar',
    infinitive: 'empezar',
    english: 'to begin',
    type: 'stem_change',
    conjugations: {
      present: { yo: 'empiezo', tu: 'empiezas', 'él': 'empieza', nosotros: 'empezamos', ellos: 'empiezan' },
      preterite: { yo: 'empecé', tu: 'empezaste', 'él': 'empezó', nosotros: 'empezamos', ellos: 'empezaron' },
    },
  },
  {
    id: 'entender',
    infinitive: 'entender',
    english: 'to understand',
    type: 'stem_change',
    conjugations: {
      present: { yo: 'entiendo', tu: 'entiendes', 'él': 'entiende', nosotros: 'entendemos', ellos: 'entienden' },
      preterite: { yo: 'entendí', tu: 'entendiste', 'él': 'entendió', nosotros: 'entendimos', ellos: 'entendieron' },
    },
  },
  {
    id: 'dormir',
    infinitive: 'dormir',
    english: 'to sleep',
    type: 'stem_change',
    conjugations: {
      present: { yo: 'duermo', tu: 'duermes', 'él': 'duerme', nosotros: 'dormimos', ellos: 'duermen' },
      preterite: { yo: 'dormí', tu: 'dormiste', 'él': 'durmió', nosotros: 'dormimos', ellos: 'durmieron' },
    },
  },
  {
    id: 'preferir',
    infinitive: 'preferir',
    english: 'to prefer',
    type: 'stem_change',
    conjugations: {
      present: { yo: 'prefiero', tu: 'prefieres', 'él': 'prefiere', nosotros: 'preferimos', ellos: 'prefieren' },
      preterite: { yo: 'preferí', tu: 'preferiste', 'él': 'prefirió', nosotros: 'preferimos', ellos: 'prefirieron' },
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
      present: { yo: 'cierro', tu: 'cierras', 'él': 'cierra', nosotros: 'cerramos', ellos: 'cierran' },
      preterite: { yo: 'cerré', tu: 'cerraste', 'él': 'cerró', nosotros: 'cerramos', ellos: 'cerraron' },
    },
  },
  {
    id: 'perder',
    infinitive: 'perder',
    english: 'to lose',
    type: 'stem_change',
    conjugations: {
      present: { yo: 'pierdo', tu: 'pierdes', 'él': 'pierde', nosotros: 'perdemos', ellos: 'pierden' },
      preterite: { yo: 'perdí', tu: 'perdiste', 'él': 'perdió', nosotros: 'perdimos', ellos: 'perdieron' },
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
