import { useState } from 'react';
import type { Verb, Tense, Person } from '../types';
import { getConjugation } from '../engine/conjugator';
import { verbs } from '../data/verbs';

interface StudyScreenProps {
  onBack: () => void;
}

const tenses: { value: Tense; label: string }[] = [
  { value: 'present', label: 'Present' },
  { value: 'preterite', label: 'Preterite' },
  { value: 'imperfect', label: 'Imperfect' },
  { value: 'future', label: 'Future' },
  { value: 'conditional', label: 'Conditional' },
  { value: 'present_progressive', label: 'Present Progressive' },
  { value: 'present_perfect', label: 'Present Perfect' },
  { value: 'ir_a_infinitive', label: 'Ir + a + Infinitive' },
];

const people: { value: Person; label: string }[] = [
  { value: 'yo', label: 'yo' },
  { value: 'tú', label: 'tú' },
  { value: 'él', label: 'él/ella/ud.' },
  { value: 'nosotros', label: 'nosotros' },
  { value: 'ellos', label: 'ellos/uds.' },
];

function getConjugationForDisplay(verb: Verb, tense: Tense, person: Person): string {
  const override = verb.conjugations[tense]?.[person];
  return getConjugation(verb.infinitive, tense, person, override);
}

export function StudyScreen({ onBack }: StudyScreenProps) {
  const [selectedVerb, setSelectedVerb] = useState<Verb | null>(null);
  const [selectedTenses, setSelectedTenses] = useState<Set<Tense>>(new Set(['present', 'preterite', 'imperfect']));
  const [verbFilter, setVerbFilter] = useState<'all' | 'regular' | 'irregular' | 'stem_change' | 'ar' | 'er' | 'ir'>('all');

  const getFilteredVerbs = () => {
    switch (verbFilter) {
      case 'regular':
        return verbs.filter((v) => v.type === 'regular');
      case 'irregular':
        return verbs.filter((v) => v.type === 'irregular');
      case 'stem_change':
        return verbs.filter((v) => v.type === 'stem_change');
      case 'ar':
        return verbs.filter((v) => v.infinitive.endsWith('ar'));
      case 'er':
        return verbs.filter((v) => v.infinitive.endsWith('er'));
      case 'ir':
        return verbs.filter((v) => v.infinitive.endsWith('ir'));
      default:
        return verbs;
    }
  };

  const toggleTense = (tense: Tense) => {
    setSelectedTenses((prev) => {
      const next = new Set(prev);
      if (next.has(tense)) {
        next.delete(tense);
      } else {
        next.add(tense);
      }
      return next;
    });
  };

  const selectAllTenses = () => {
    setSelectedTenses(new Set(tenses.map((t) => t.value)));
  };

  const clearTenses = () => {
    setSelectedTenses(new Set());
  };

  const filteredVerbs = getFilteredVerbs();

  return (
    <div className="study-screen">
      <div className="study-header">
        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>
        <h1>Verb Conjugation Reference</h1>
        <div className="header-spacer" />
      </div>

      <div className="study-layout">
        <aside className="study-sidebar">
          <section className="section">
            <h2>Select Verb</h2>
            <div className="filter-bar">
              <button className={verbFilter === 'all' ? 'active' : ''} onClick={() => setVerbFilter('all')}>All</button>
              <button className={verbFilter === 'regular' ? 'active' : ''} onClick={() => setVerbFilter('regular')}>Regular</button>
              <button className={verbFilter === 'irregular' ? 'active' : ''} onClick={() => setVerbFilter('irregular')}>Irregular</button>
              <button className={verbFilter === 'stem_change' ? 'active' : ''} onClick={() => setVerbFilter('stem_change')}>Stem</button>
            </div>
            <div className="study-verb-list">
              {filteredVerbs.map((verb) => (
                <button
                  key={verb.id}
                  className={`study-verb-item ${selectedVerb?.id === verb.id ? 'selected' : ''} ${verb.type}`}
                  onClick={() => setSelectedVerb(verb)}
                >
                  <span className="verb-name">{verb.infinitive}</span>
                  <span className="verb-meaning">{verb.english}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="section">
            <h2>Tenses</h2>
            <div className="tense-actions">
              <button onClick={selectAllTenses}>All</button>
              <button onClick={clearTenses}>Clear</button>
            </div>
            {tenses.map((t) => (
              <button
                key={t.value}
                className={`tense-chip ${selectedTenses.has(t.value) ? 'selected' : ''}`}
                onClick={() => toggleTense(t.value)}
              >
                {t.label}
              </button>
            ))}
          </section>
        </aside>

        <main className="study-content">
          {selectedVerb ? (
            <div className="conjugation-display">
              <div className="conjugation-header">
                <h2 className="conjugation-title">{selectedVerb.infinitive}</h2>
                <span className="conjugation-subtitle">{selectedVerb.english}</span>
                <span className={`verb-type-badge ${selectedVerb.type}`}>
                  {selectedVerb.type === 'stem_change' ? 'stem-changing' : selectedVerb.type}
                </span>
              </div>

              <div className="tense-tables">
                {tenses
                  .filter((t) => selectedTenses.has(t.value))
                  .map((tense) => (
                    <div key={tense.value} className="tense-table">
                      <h3 className="tense-label">{tense.label}</h3>
                      <table>
                        <thead>
                          <tr>
                            <th>Person</th>
                            <th>Conjugation</th>
                          </tr>
                        </thead>
                        <tbody>
                          {people.map((person) => {
                            const conjugation = getConjugationForDisplay(selectedVerb, tense.value, person.value);
                            const hasOverride = selectedVerb.conjugations[tense.value]?.[person.value];
                            return (
                              <tr key={person.value}>
                                <td className="person-cell">{person.label}</td>
                                <td className={`conjugation-cell ${hasOverride ? 'irregular' : ''}`}>
                                  {conjugation}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <p>Select a verb from the sidebar to view its conjugations</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
