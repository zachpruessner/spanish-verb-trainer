import { useState } from 'react';
import type { Tense, Person } from '../types';
import { regularEndings } from '../engine/conjugator';

interface PatternsScreenProps {
  onVerbSelect?: (verbId: string) => void;
}

const tenses: { value: Tense; label: string }[] = [
  { value: 'present', label: 'Present' },
  { value: 'preterite', label: 'Preterite' },
  { value: 'imperfect', label: 'Imperfect' },
  { value: 'future', label: 'Future' },
  { value: 'conditional', label: 'Conditional' },
];

const people: { value: Person; label: string }[] = [
  { value: 'yo', label: 'yo' },
  { value: 'tú', label: 'tú' },
  { value: 'él', label: 'él/ella/ud.' },
  { value: 'nosotros', label: 'nosotros' },
  { value: 'ellos', label: 'ellos/uds.' },
];

interface StemChangePattern {
  label: string;
  description: string;
  examples: { verb: string; conjugation: string; verbId: string }[];
}

interface SpellingChangePattern {
  label: string;
  description: string;
  examples: { verb: string; conjugation: string; note?: string; verbId: string }[];
}

interface IrregularFamily {
  label: string;
  description: string;
  examples: { verb: string; detail: string; verbId: string }[];
}

const stemChangePatterns: StemChangePattern[] = [
  {
    label: 'e → ie',
    description: 'The stem vowel changes from e to ie in all forms except nosotros and vosotros.',
    examples: [
      { verb: 'pensar → pienso', conjugation: 'pienso, piensas, piensa, pensamos, piensan', verbId: 'pensar' },
      { verb: 'querer → quiero', conjugation: 'quiero, quieres, quiere, queremos, quieren', verbId: 'querer' },
    ],
  },
  {
    label: 'o → ue',
    description: 'The stem vowel changes from o to ue in all forms except nosotros and vosotros.',
    examples: [
      { verb: 'dormir → duermo', conjugation: 'duermo, duermes, duerme, dormimos, duermen', verbId: 'dormir' },
      { verb: 'poder → puedo', conjugation: 'puedo, puedes, puede, podemos, pueden', verbId: 'poder' },
    ],
  },
  {
    label: 'e → i',
    description: 'The stem vowel changes from e to i in all forms except nosotros and vosotros. Only occurs in -ir verbs.',
    examples: [
      { verb: 'preferir → prefiero', conjugation: 'prefiero, prefieres, prefiere, preferimos, prefieren', verbId: 'preferir' },
      { verb: 'pedir → pido', conjugation: 'pido, pides, pide, pedimos, piden', verbId: 'pedir' },
    ],
  },
  {
    label: 'u → ue',
    description: 'The stem vowel u changes to ue. Very rare pattern with only a few verbs.',
    examples: [
      { verb: 'jugar → juego', conjugation: 'juego, juegas, juega, jugamos, juegan', verbId: 'jugar' },
    ],
  },
];

const spellingChangePatterns: SpellingChangePattern[] = [
  {
    label: 'c → qu',
    description: 'The letter c changes to qu before e to preserve the /k/ sound.',
    examples: [
      { verb: 'buscar → busqué', conjugation: 'busqué (preterite yo)', note: 'c → qu before é', verbId: 'buscar' },
    ],
  },
  {
    label: 'g → gu',
    description: 'The letter g changes to gu before e to preserve the /g/ sound.',
    examples: [
      { verb: 'llegar → llegué', conjugation: 'llegué (preterite yo)', note: 'g → gu before é', verbId: 'llegar' },
    ],
  },
  {
    label: 'z → c',
    description: 'The letter z changes to c before e to preserve pronunciation.',
    examples: [
      { verb: 'empezar → empecé', conjugation: 'empecé (preterite yo)', note: 'z → c before é', verbId: 'empezar' },
    ],
  },
];

const irregularFamilies: IrregularFamily[] = [
  {
    label: 'Yo-go verbs',
    description: 'These verbs have an irregular yo form ending in -go in the present tense. The rest of the present tense conjugates regularly (or with stem changes).',
    examples: [
      { verb: 'tener', detail: 'tengo', verbId: 'tener' },
      { verb: 'hacer', detail: 'hago', verbId: 'hacer' },
      { verb: 'poner', detail: 'pongo', verbId: 'poner' },
      { verb: 'salir', detail: 'salgo', verbId: 'salir' },
      { verb: 'venir', detail: 'vengo', verbId: 'venir' },
      { verb: 'decir', detail: 'digo', verbId: 'decir' },
    ],
  },
  {
    label: 'Irregular preterite stems',
    description: 'These verbs use a completely different stem in the preterite tense. They share a common set of preterite endings: -e, -iste, -o, -imos, -ieron (no accent marks).',
    examples: [
      { verb: 'tener', detail: 'tuv- → tuve, tuviste, tuvo, tuvimos, tuvieron', verbId: 'tener' },
      { verb: 'estar', detail: 'estuv- → estuve, estuviste, estuvo, estuvimos, estuvieron', verbId: 'estar' },
      { verb: 'andar', detail: 'anduv- → anduve, anduviste, anduvo, anduvimos, anduvieron', verbId: 'andar' },
      { verb: 'poder', detail: 'pud- → pude, pudiste, pudo, pudimos, pudieron', verbId: 'poder' },
      { verb: 'poner', detail: 'pus- → puse, pusiste, puso, pusimos, pusieron', verbId: 'poner' },
      { verb: 'saber', detail: 'sup- → supe, supiste, supo, supimos, supieron', verbId: 'saber' },
      { verb: 'tener', detail: 'tuv- → tuve, tuviste, tuvo, tuvimos, tuvieron', verbId: 'tener' },
    ],
  },
  {
    label: 'Irregular future/conditional stems',
    description: 'These verbs drop vowels or modify their stem in the future and conditional tenses. The endings remain regular: -é, -ás, -á, -emos, -án (future) and -ía, -ías, -ía, -íamos, -ían (conditional).',
    examples: [
      { verb: 'tener', detail: 'tendr- → tendré, tendría', verbId: 'tener' },
      { verb: 'hacer', detail: 'har- → haré, haría', verbId: 'hacer' },
      { verb: 'poner', detail: 'pondr- → pondré, pondría', verbId: 'poner' },
      { verb: 'salir', detail: 'saldr- → saldré, saldría', verbId: 'salir' },
      { verb: 'venir', detail: 'vendr- → vendré, vendría', verbId: 'venir' },
      { verb: 'decir', detail: 'dir- → diré, diría', verbId: 'decir' },
      { verb: 'querer', detail: 'querr- → querré, querría', verbId: 'querer' },
      { verb: 'saber', detail: 'sabr- → sabré, sabría', verbId: 'saber' },
    ],
  },
];

const uniqueIrregulars = [
  {
    verb: 'ser',
    english: 'to be (permanent)',
    verbId: 'ser',
    note: 'Completely irregular across all tenses. Must be memorized individually.',
  },
  {
    verb: 'ir',
    english: 'to go',
    verbId: 'ir',
    note: 'Completely irregular. Shares preterite forms with ser (fui, fuiste, fue...).',
  },
  {
    verb: 'haber',
    english: 'to have (auxiliary)',
    verbId: 'haber',
    note: 'Used as auxiliary verb in compound tenses (he comido, has hablado).',
  },
];

function EndingsTable({ type, tense }: { type: 'ar' | 'er' | 'ir'; tense: Tense }) {
  const endings = regularEndings[type][tense];

  if (tense === 'present_perfect' || tense === 'ir_a_infinitive') {
    return (
      <div className="pattern-ending-note">
        {tense === 'present_perfect' && (
          <span>
            <strong>haber</strong> (he, has, ha, hemos, han) + past participle ({type === 'ar' ? '-ado' : '-ido'})
          </span>
        )}
        {tense === 'ir_a_infinitive' && (
          <span>
            <strong>ir</strong> (voy, vas, va, vamos, van) + a + infinitive
          </span>
        )}
      </div>
    );
  }

  return (
    <table className="pattern-endings-table">
      <thead>
        <tr>
          <th>Person</th>
          <th>Ending</th>
        </tr>
      </thead>
      <tbody>
        {people.map((person) => (
          <tr key={person.value}>
            <td className="person-cell">{person.label}</td>
            <td className="ending-cell">
              <span className="ending-highlight">{endings[person.value]}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function AccordionSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="pattern-accordion">
      <button className="pattern-accordion-header" onClick={() => setIsOpen(!isOpen)}>
        <span className="pattern-accordion-title">{title}</span>
        <span className={`pattern-accordion-chevron ${isOpen ? 'open' : ''}`}>▾</span>
      </button>
      {isOpen && <div className="pattern-accordion-content">{children}</div>}
    </div>
  );
}

export function PatternsScreen({ onVerbSelect }: PatternsScreenProps) {
  const [selectedTense, setSelectedTense] = useState<Tense | 'all'>('all');

  const filteredTenses =
    selectedTense === 'all' ? tenses : tenses.filter((t) => t.value === selectedTense);

  return (
    <div className="patterns-screen">
      <div className="patterns-toolbar">
        <div className="patterns-filter-bar">
          <button
            className={selectedTense === 'all' ? 'active' : ''}
            onClick={() => setSelectedTense('all')}
          >
            All Tenses
          </button>
          {tenses.map((t) => (
            <button
              key={t.value}
              className={selectedTense === t.value ? 'active' : ''}
              onClick={() => setSelectedTense(t.value)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="patterns-content">
        <section className="pattern-section">
          <h2 className="pattern-section-title">Regular Endings</h2>
          <p className="pattern-section-description">
            Regular verbs follow predictable ending patterns based on their infinitive ending: -ar, -er, or -ir.
          </p>

          {filteredTenses.map((tense) => (
            <AccordionSection key={tense.value} title={tense.label} defaultOpen={tense.value === 'present'}>
              <div className="regular-endings-grid">
                <div className="ending-group">
                  <h3 className="ending-group-label">
                    Regular <span className="ending-type ar">-ar</span>
                  </h3>
                  <p className="ending-group-example">
                    Example: <button className="verb-link" onClick={() => onVerbSelect?.('hablar')}>hablar</button>
                  </p>
                  <EndingsTable type="ar" tense={tense.value} />
                </div>
                <div className="ending-group">
                  <h3 className="ending-group-label">
                    Regular <span className="ending-type er">-er</span>
                  </h3>
                  <p className="ending-group-example">
                    Example: <button className="verb-link" onClick={() => onVerbSelect?.('comer')}>comer</button>
                  </p>
                  <EndingsTable type="er" tense={tense.value} />
                </div>
                <div className="ending-group">
                  <h3 className="ending-group-label">
                    Regular <span className="ending-type ir">-ir</span>
                  </h3>
                  <p className="ending-group-example">
                    Example: <button className="verb-link" onClick={() => onVerbSelect?.('vivir')}>vivir</button>
                  </p>
                  <EndingsTable type="ir" tense={tense.value} />
                </div>
              </div>
            </AccordionSection>
          ))}
        </section>

        <section className="pattern-section">
          <h2 className="pattern-section-title">Stem Changes</h2>
          <p className="pattern-section-description">
            Stem-changing verbs modify a vowel in the stem when conjugated. The change occurs in all forms except nosotros and vosotros.
          </p>

          {stemChangePatterns.map((pattern) => (
            <div key={pattern.label} className="pattern-card">
              <h3 className="pattern-card-title">
                <span className="pattern-change-label">{pattern.label}</span>
              </h3>
              <p className="pattern-card-description">{pattern.description}</p>
              <div className="pattern-examples">
                <span className="examples-label">Examples:</span>
                <ul className="examples-list">
                  {pattern.examples.map((ex) => (
                    <li key={ex.verb}>
                      <button className="verb-link" onClick={() => onVerbSelect?.(ex.verbId)}>
                        {ex.verb}
                      </button>
                      <span className="example-conjugation">({ex.conjugation})</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>

        <section className="pattern-section">
          <h2 className="pattern-section-title">Spelling Changes</h2>
          <p className="pattern-section-description">
            These changes preserve pronunciation in certain conjugations. They typically occur in the preterite yo form and other forms where the ending starts with e.
          </p>

          {spellingChangePatterns.map((pattern) => (
            <div key={pattern.label} className="pattern-card">
              <h3 className="pattern-card-title">
                <span className="pattern-change-label">{pattern.label}</span>
              </h3>
              <p className="pattern-card-description">{pattern.description}</p>
              <div className="pattern-examples">
                <span className="examples-label">Examples:</span>
                <ul className="examples-list">
                  {pattern.examples.map((ex) => (
                    <li key={ex.verb}>
                      <button className="verb-link" onClick={() => onVerbSelect?.(ex.verbId)}>
                        {ex.verb}
                      </button>
                      {ex.note && <span className="example-note">{ex.note}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>

        <section className="pattern-section">
          <h2 className="pattern-section-title">Irregular Families</h2>
          <p className="pattern-section-description">
            Many irregular verbs share patterns with each other. Grouping them into families makes them easier to learn.
          </p>

          {irregularFamilies.map((family) => (
            <div key={family.label} className="pattern-card">
              <h3 className="pattern-card-title">{family.label}</h3>
              <p className="pattern-card-description">{family.description}</p>
              <div className="pattern-examples">
                <ul className="examples-list">
                  {family.examples.map((ex) => (
                    <li key={`${ex.verb}-${ex.detail}`}>
                      <button className="verb-link" onClick={() => onVerbSelect?.(ex.verbId)}>
                        {ex.verb}
                      </button>
                      <span className="example-conjugation">→ {ex.detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>

        <section className="pattern-section">
          <h2 className="pattern-section-title">Unique Irregulars</h2>
          <p className="pattern-section-description">
            These highly irregular verbs do not fit cleanly into reusable patterns. Memorize them individually.
          </p>

          <div className="unique-irregulars-grid">
            {uniqueIrregulars.map((item) => (
              <div key={item.verb} className="unique-irregular-card">
                <div className="unique-irregular-header">
                  <h3 className="unique-irregular-name">
                    <button className="verb-link" onClick={() => onVerbSelect?.(item.verbId)}>
                      {item.verb}
                    </button>
                  </h3>
                  <span className="unique-irregular-english">{item.english}</span>
                </div>
                <p className="unique-irregular-note">{item.note}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
