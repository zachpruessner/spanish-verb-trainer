import type { Person, Tense, ConjugationEntry } from '../types';

const regularEndings: Record<string, Record<Tense, ConjugationEntry>> = {
  ar: {
    present: { yo: 'o', 'tú': 'as', 'él': 'a', nosotros: 'amos', ellos: 'an' },
    preterite: { yo: 'é', 'tú': 'aste', 'él': 'ó', nosotros: 'amos', ellos: 'aron' },
    imperfect: { yo: 'aba', 'tú': 'abas', 'él': 'aba', nosotros: 'ábamos', ellos: 'aban' },
    future: { yo: 'é', 'tú': 'ás', 'él': 'á', nosotros: 'emos', ellos: 'án' },
    conditional: { yo: 'ía', 'tú': 'ías', 'él': 'ía', nosotros: 'íamos', ellos: 'ían' },
    present_progressive: { yo: 'ando', 'tú': 'ando', 'él': 'ando', nosotros: 'ando', ellos: 'ando' },
    present_perfect: { yo: 'ado', 'tú': 'ado', 'él': 'ado', nosotros: 'ado', ellos: 'ado' },
    ir_a_infinitive: { yo: '', 'tú': '', 'él': '', nosotros: '', ellos: '' },
  },
  er: {
    present: { yo: 'o', 'tú': 'es', 'él': 'e', nosotros: 'emos', ellos: 'en' },
    preterite: { yo: 'í', 'tú': 'iste', 'él': 'ió', nosotros: 'imos', ellos: 'ieron' },
    imperfect: { yo: 'ía', 'tú': 'ías', 'él': 'ía', nosotros: 'íamos', ellos: 'ían' },
    future: { yo: 'é', 'tú': 'ás', 'él': 'á', nosotros: 'emos', ellos: 'án' },
    conditional: { yo: 'ía', 'tú': 'ías', 'él': 'ía', nosotros: 'íamos', ellos: 'ían' },
    present_progressive: { yo: 'iendo', 'tú': 'iendo', 'él': 'iendo', nosotros: 'iendo', ellos: 'iendo' },
    present_perfect: { yo: 'ado', 'tú': 'ado', 'él': 'ado', nosotros: 'ado', ellos: 'ado' },
    ir_a_infinitive: { yo: '', 'tú': '', 'él': '', nosotros: '', ellos: '' },
  },
  ir: {
    present: { yo: 'o', 'tú': 'es', 'él': 'e', nosotros: 'imos', ellos: 'en' },
    preterite: { yo: 'í', 'tú': 'iste', 'él': 'ió', nosotros: 'imos', ellos: 'ieron' },
    imperfect: { yo: 'ía', 'tú': 'ías', 'él': 'ía', nosotros: 'íamos', ellos: 'ían' },
    future: { yo: 'é', 'tú': 'ás', 'él': 'á', nosotros: 'emos', ellos: 'án' },
    conditional: { yo: 'ía', 'tú': 'ías', 'él': 'ía', nosotros: 'íamos', ellos: 'ían' },
    present_progressive: { yo: 'iendo', 'tú': 'iendo', 'él': 'iendo', nosotros: 'iendo', ellos: 'iendo' },
    present_perfect: { yo: 'ado', 'tú': 'ado', 'él': 'ado', nosotros: 'ado', ellos: 'ado' },
    ir_a_infinitive: { yo: '', 'tú': '', 'él': '', nosotros: '', ellos: '' },
  },
};

const haberForms: ConjugationEntry = {
  yo: 'he',
  'tú': 'has',
  'él': 'ha',
  nosotros: 'hemos',
  ellos: 'han',
};

const irForms: ConjugationEntry = {
  yo: 'voy',
  'tú': 'vas',
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
