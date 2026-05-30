import type { Person, Tense, Prompt, Verb } from '../types';
import { getConjugation } from './conjugator';

const personEnglish: Record<Person, string> = {
  yo: 'I',
  tu: 'you',
  'él': 'he/she',
  nosotros: 'we',
  ellos: 'they',
};

const verbTranslations: Record<string, Record<Tense, string>> = {
  hablar: {
    present: 'speak',
    preterite: 'spoke',
    imperfect: 'used to speak / was speaking',
    future: 'will speak',
    conditional: 'would speak',
    present_progressive: 'speaking',
    present_perfect: 'spoken',
    ir_a_infinitive: 'going to speak',
  },
  comer: {
    present: 'eat',
    preterite: 'ate',
    imperfect: 'used to eat / was eating',
    future: 'will eat',
    conditional: 'would eat',
    present_progressive: 'eating',
    present_perfect: 'eaten',
    ir_a_infinitive: 'going to eat',
  },
  vivir: {
    present: 'live',
    preterite: 'lived',
    imperfect: 'used to live / was living',
    future: 'will live',
    conditional: 'would live',
    present_progressive: 'living',
    present_perfect: 'lived',
    ir_a_infinitive: 'going to live',
  },
  pensar: {
    present: 'think',
    preterite: 'thought',
    imperfect: 'used to think / was thinking',
    future: 'will think',
    conditional: 'would think',
    present_progressive: 'thinking',
    present_perfect: 'thought',
    ir_a_infinitive: 'going to think',
  },
  querer: {
    present: 'want',
    preterite: 'tried/wanted',
    imperfect: 'wanted',
    future: 'will want',
    conditional: 'would want',
    present_progressive: 'wanting',
    present_perfect: 'wanted',
    ir_a_infinitive: 'going to want',
  },
  tener: {
    present: 'have',
    preterite: 'got/received',
    imperfect: 'had',
    future: 'will have',
    conditional: 'would have',
    present_progressive: 'having',
    present_perfect: 'had',
    ir_a_infinitive: 'going to have',
  },
  hacer: {
    present: 'do/make',
    preterite: 'did/made',
    imperfect: 'used to do / was doing',
    future: 'will do/make',
    conditional: 'would do/make',
    present_progressive: 'doing/making',
    present_perfect: 'done/made',
    ir_a_infinitive: 'going to do/make',
  },
  ser: {
    present: 'am/is/are',
    preterite: 'was/were',
    imperfect: 'was/were / used to be',
    future: 'will be',
    conditional: 'would be',
    present_progressive: 'being',
    present_perfect: 'been',
    ir_a_infinitive: 'going to be',
  },
  ir: {
    present: 'go',
    preterite: 'went',
    imperfect: 'used to go / was going',
    future: 'will go',
    conditional: 'would go',
    present_progressive: 'going',
    present_perfect: 'gone',
    ir_a_infinitive: 'going to go',
  },
  venir: {
    present: 'come',
    preterite: 'came',
    imperfect: 'used to come / was coming',
    future: 'will come',
    conditional: 'would come',
    present_progressive: 'coming',
    present_perfect: 'come',
    ir_a_infinitive: 'going to come',
  },
  decir: {
    present: 'say/tell',
    preterite: 'said/told',
    imperfect: 'used to say / was saying',
    future: 'will say/tell',
    conditional: 'would say/tell',
    present_progressive: 'saying/telling',
    present_perfect: 'said/told',
    ir_a_infinitive: 'going to say/tell',
  },
  poder: {
    present: 'can/be able to',
    preterite: 'managed to/was able to',
    imperfect: 'could/was able to',
    future: 'will be able to',
    conditional: 'could/would be able to',
    present_progressive: 'being able to',
    present_perfect: 'been able to',
    ir_a_infinitive: 'going to be able to',
  },
  saber: {
    present: 'know',
    preterite: 'found out/learned',
    imperfect: 'knew',
    future: 'will know',
    conditional: 'would know',
    present_progressive: 'knowing',
    present_perfect: 'known',
    ir_a_infinitive: 'going to know',
  },
  poner: {
    present: 'put',
    preterite: 'put',
    imperfect: 'used to put / was putting',
    future: 'will put',
    conditional: 'would put',
    present_progressive: 'putting',
    present_perfect: 'put',
    ir_a_infinitive: 'going to put',
  },
  dar: {
    present: 'give',
    preterite: 'gave',
    imperfect: 'used to give / was giving',
    future: 'will give',
    conditional: 'would give',
    present_progressive: 'giving',
    present_perfect: 'given',
    ir_a_infinitive: 'going to give',
  },
  ver: {
    present: 'see',
    preterite: 'saw',
    imperfect: 'used to see / was seeing',
    future: 'will see',
    conditional: 'would see',
    present_progressive: 'seeing',
    present_perfect: 'seen',
    ir_a_infinitive: 'going to see',
  },
  empezar: {
    present: 'begin',
    preterite: 'began',
    imperfect: 'used to begin / was beginning',
    future: 'will begin',
    conditional: 'would begin',
    present_progressive: 'beginning',
    present_perfect: 'begun',
    ir_a_infinitive: 'going to begin',
  },
  entender: {
    present: 'understand',
    preterite: 'understood',
    imperfect: 'used to understand / was understanding',
    future: 'will understand',
    conditional: 'would understand',
    present_progressive: 'understanding',
    present_perfect: 'understood',
    ir_a_infinitive: 'going to understand',
  },
  dormir: {
    present: 'sleep',
    preterite: 'slept',
    imperfect: 'used to sleep / was sleeping',
    future: 'will sleep',
    conditional: 'would sleep',
    present_progressive: 'sleeping',
    present_perfect: 'slept',
    ir_a_infinitive: 'going to sleep',
  },
  preferir: {
    present: 'prefer',
    preterite: 'preferred',
    imperfect: 'used to prefer / was preferring',
    future: 'will prefer',
    conditional: 'would prefer',
    present_progressive: 'preferring',
    present_perfect: 'preferred',
    ir_a_infinitive: 'going to prefer',
  },
};

function getEnglishVerb(verb: Verb, tense: Tense): string {
  const translations = verbTranslations[verb.infinitive];
  if (translations && translations[tense]) {
    return translations[tense];
  }
  const fallback: Record<Tense, string> = {
    present: verb.english,
    preterite: `${verb.english}(past)`,
    imperfect: `used to ${verb.english}`,
    future: `will ${verb.english}`,
    conditional: `would ${verb.english}`,
    present_progressive: `${verb.english}ing`,
    present_perfect: `${verb.english}(past part.)`,
    ir_a_infinitive: `going to ${verb.english}`,
  };
  return fallback[tense];
}

function buildEnglishPrompt(person: Person, englishVerb: string): string {
  const subject = personEnglish[person].toLowerCase();
  return `${subject} ${englishVerb}`;
}

export function generatePrompt(
  verb: Verb,
  tense: Tense,
  person: Person
): Prompt {
  const correctAnswer = getConjugation(
    verb.infinitive,
    tense,
    person,
    verb.conjugations[tense]?.[person]
  );

  const englishVerb = getEnglishVerb(verb, tense);
  const englishPrompt = buildEnglishPrompt(person, englishVerb);

  return {
    verb,
    tense,
    person,
    englishPrompt,
    correctAnswer,
  };
}

export function generateRandomPrompt(
  verbs: Verb[],
  tenses: Tense[],
  people: Person[]
): Prompt {
  const verb = verbs[Math.floor(Math.random() * verbs.length)];
  const tense = tenses[Math.floor(Math.random() * tenses.length)];
  const person = people[Math.floor(Math.random() * people.length)];

  return generatePrompt(verb, tense, person);
}
