export type Person = 'yo' | 'tú' | 'él' | 'nosotros' | 'ellos';

export type Tense =
  | 'present'
  | 'preterite'
  | 'imperfect'
  | 'future'
  | 'conditional'
  | 'present_progressive'
  | 'present_perfect'
  | 'ir_a_infinitive';

export type VerbType = 'regular' | 'irregular' | 'stem_change';

export type Mode = 'learn' | 'practice' | 'test';

export type HintLevel = 'verb' | 'infinitive' | 'none' | 'reverse';

export interface ConjugationEntry {
  yo: string;
  'tú': string;
  'él': string;
  nosotros: string;
  ellos: string;
}

export interface VerbConjugations {
  present?: ConjugationEntry;
  preterite?: ConjugationEntry;
  imperfect?: ConjugationEntry;
  future?: ConjugationEntry;
  conditional?: ConjugationEntry;
  present_progressive?: ConjugationEntry;
  present_perfect?: ConjugationEntry;
  ir_a_infinitive?: ConjugationEntry;
}

export interface Verb {
  id: string;
  infinitive: string;
  english: string;
  type: VerbType;
  conjugations: VerbConjugations;
}

export interface Prompt {
  verb: Verb;
  tense: Tense;
  person: Person;
  englishPrompt: string;
  correctAnswer: string;
}

export interface Attempt {
  prompt: Prompt;
  userAnswer: string;
  correct: boolean;
  timeTaken: number;
  timestamp: Date;
}

export interface SessionConfig {
  mode: Mode;
  verbs: Verb[];
  tenses: Tense[];
  hintLevel: HintLevel;
}

export interface SessionState {
  config: SessionConfig;
  currentPrompt: Prompt | null;
  attempts: Attempt[];
  isAnswered: boolean;
  startTime: Date | null;
}

export interface VerbStats {
  verbId: string;
  totalAttempts: number;
  correctAttempts: number;
  avgTime: number;
  lastAttempt: Date | null;
}

export interface TenseStats {
  tense: Tense;
  totalAttempts: number;
  correctAttempts: number;
  avgTime: number;
}
