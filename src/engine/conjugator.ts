import type { Person, Tense, ConjugationEntry } from '../types';

const regularEndings: Record<string, Record<Tense, ConjugationEntry>> = {
  ar: {
    present: { yo: 'o', tu: 'as', 'él': 'a', nosotros: 'amos', ellos: 'an' },
    preterite: { yo: 'é', tu: 'aste', 'él': 'ó', nosotros: 'amos', ellos: 'aron' },
    imperfect: { yo: 'aba', tu: 'abas', 'él': 'aba', nosotros: 'ábamos', ellos: 'aban' },
    future: { yo: 'é', tu: 'ás', 'él': 'á', nosotros: 'emos', ellos: 'án' },
    conditional: { yo: 'ía', tu: 'ías', 'él': 'ía', nosotros: 'íamos', ellos: 'ían' },
    present_progressive: { yo: 'ando', tu: 'ando', 'él': 'ando', nosotros: 'ando', ellos: 'ando' },
    present_perfect: { yo: 'ado', tu: 'ado', 'él': 'ado', nosotros: 'ado', ellos: 'ado' },
    ir_a_infinitive: { yo: '', tu: '', 'él': '', nosotros: '', ellos: '' },
  },
  er: {
    present: { yo: 'o', tu: 'es', 'él': 'e', nosotros: 'emos', ellos: 'en' },
    preterite: { yo: 'í', tu: 'iste', 'él': 'ió', nosotros: 'imos', ellos: 'ieron' },
    imperfect: { yo: 'ía', tu: 'ías', 'él': 'ía', nosotros: 'íamos', ellos: 'ían' },
    future: { yo: 'é', tu: 'ás', 'él': 'á', nosotros: 'emos', ellos: 'án' },
    conditional: { yo: 'ía', tu: 'ías', 'él': 'ía', nosotros: 'íamos', ellos: 'ían' },
    present_progressive: { yo: 'iendo', tu: 'iendo', 'él': 'iendo', nosotros: 'iendo', ellos: 'iendo' },
    present_perfect: { yo: 'ado', tu: 'ado', 'él': 'ado', nosotros: 'ado', ellos: 'ado' },
    ir_a_infinitive: { yo: '', tu: '', 'él': '', nosotros: '', ellos: '' },
  },
  ir: {
    present: { yo: 'o', tu: 'es', 'él': 'e', nosotros: 'imos', ellos: 'en' },
    preterite: { yo: 'í', tu: 'iste', 'él': 'ió', nosotros: 'imos', ellos: 'ieron' },
    imperfect: { yo: 'ía', tu: 'ías', 'él': 'ía', nosotros: 'íamos', ellos: 'ían' },
    future: { yo: 'é', tu: 'ás', 'él': 'á', nosotros: 'emos', ellos: 'án' },
    conditional: { yo: 'ía', tu: 'ías', 'él': 'ía', nosotros: 'íamos', ellos: 'ían' },
    present_progressive: { yo: 'iendo', tu: 'iendo', 'él': 'iendo', nosotros: 'iendo', ellos: 'iendo' },
    present_perfect: { yo: 'ado', tu: 'ado', 'él': 'ado', nosotros: 'ado', ellos: 'ado' },
    ir_a_infinitive: { yo: '', tu: '', 'él': '', nosotros: '', ellos: '' },
  },
};

const haberForms: ConjugationEntry = {
  yo: 'he',
  tu: 'has',
  'él': 'ha',
  nosotros: 'hemos',
  ellos: 'han',
};

const irForms: ConjugationEntry = {
  yo: 'voy',
  tu: 'vas',
  'él': 'va',
  nosotros: 'vamos',
  ellos: 'van',
};

export function getVerbType(infinitive: string): 'ar' | 'er' | 'ir' {
  if (infinitive.endsWith('ar')) return 'ar';
  if (infinitive.endsWith('er')) return 'er';
  if (infinitive.endsWith('ir')) return 'ir';
  throw new Error(`Invalid infinitive: ${infinitive}`);
}

export function getStem(infinitive: string): string {
  return infinitive.slice(0, -2);
}

export function conjugateRegular(
  infinitive: string,
  tense: Tense,
  person: Person
): string {
  const type = getVerbType(infinitive);
  const stem = getStem(infinitive);
  const endings = regularEndings[type];

  if (tense === 'present_perfect') {
    return `${haberForms[person]} ${stem}${endings[tense][person]}`;
  }

  if (tense === 'ir_a_infinitive') {
    return `${irForms[person]} a ${infinitive}`;
  }

  if (tense === 'present_progressive') {
    return `${stem}${endings[tense][person]}`;
  }

  if (['future', 'conditional'].includes(tense)) {
    return infinitive + endings[tense][person];
  }

  return stem + endings[tense][person];
}

export function getConjugation(
  infinitive: string,
  tense: Tense,
  person: Person,
  override?: string
): string {
  if (override) return override;
  return conjugateRegular(infinitive, tense, person);
}
