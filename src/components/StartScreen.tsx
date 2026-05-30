import { useState } from 'react';
import type { Mode, Tense, HintLevel, SessionConfig } from '../types';
import { verbs, getVerbsByType, getVerbsByEnding } from '../data/verbs';

interface StartScreenProps {
  onStart: (config: SessionConfig) => void;
  onStudy: () => void;
}

const tenses: { value: Tense; label: string; category: 'core' | 'advanced' }[] = [
  { value: 'present', label: 'Present', category: 'core' },
  { value: 'preterite', label: 'Preterite', category: 'core' },
  { value: 'imperfect', label: 'Imperfect', category: 'core' },
  { value: 'future', label: 'Future', category: 'core' },
  { value: 'conditional', label: 'Conditional', category: 'core' },
  { value: 'present_progressive', label: 'Present Progressive', category: 'advanced' },
  { value: 'present_perfect', label: 'Present Perfect', category: 'advanced' },
  { value: 'ir_a_infinitive', label: 'Ir + a + Infinitive', category: 'advanced' },
];

const modes: { value: Mode; label: string; description: string }[] = [
  { value: 'learn', label: 'Learn', description: 'Single verb focus with hints' },
  { value: 'practice', label: 'Practice', description: 'Mixed verbs, no verb hint' },
  { value: 'test', label: 'Test', description: 'Full randomization, no hints' },
];

const hintLevels: { value: HintLevel; label: string; description: string }[] = [
  { value: 'verb', label: 'Verb + Prompt', description: 'Shows verb and English prompt' },
  { value: 'infinitive', label: 'English Only', description: 'Shows English prompt only' },
  { value: 'none', label: 'No Hint', description: 'English prompt only (hardest)' },
];

export function StartScreen({ onStart, onStudy }: StartScreenProps) {
  const [mode, setMode] = useState<Mode>('learn');
  const [selectedVerbs, setSelectedVerbs] = useState<Set<string>>(new Set());
  const [selectedTenses, setSelectedTenses] = useState<Set<Tense>>(new Set(['present']));
  const [hintLevel, setHintLevel] = useState<HintLevel>('verb');
  const [verbFilter, setVerbFilter] = useState<'all' | 'regular' | 'irregular' | 'stem_change' | 'ar' | 'er' | 'ir'>('all');

  const getFilteredVerbs = () => {
    switch (verbFilter) {
      case 'regular':
        return getVerbsByType('regular');
      case 'irregular':
        return getVerbsByType('irregular');
      case 'stem_change':
        return getVerbsByType('stem_change');
      case 'ar':
        return getVerbsByEnding('ar');
      case 'er':
        return getVerbsByEnding('er');
      case 'ir':
        return getVerbsByEnding('ir');
      default:
        return verbs;
    }
  };

  const toggleVerb = (id: string) => {
    setSelectedVerbs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectAllFiltered = () => {
    const filtered = getFilteredVerbs();
    setSelectedVerbs(new Set(filtered.map((v) => v.id)));
  };

  const clearVerbs = () => {
    setSelectedVerbs(new Set());
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

  const handleStart = () => {
    if (selectedVerbs.size === 0 || selectedTenses.size === 0) return;

    const selectedVerbObjects = verbs.filter((v) => selectedVerbs.has(v.id));

    let hint: HintLevel = hintLevel;
    if (mode === 'learn') {
      hint = 'verb';
    } else if (mode === 'practice') {
      hint = hint === 'verb' ? 'infinitive' : hint;
    } else {
      hint = 'none';
    }

    onStart({
      mode,
      verbs: selectedVerbObjects,
      tenses: Array.from(selectedTenses),
      hintLevel: hint,
    });
  };

  const filteredVerbs = getFilteredVerbs();
  const canStart = selectedVerbs.size > 0 && selectedTenses.size > 0;

  return (
    <div className="start-screen">
      <h1>Spanish Verb Trainer</h1>

      <section className="section">
        <h2>Select Mode</h2>
        <div className="mode-grid">
          {modes.map((m) => (
            <button
              key={m.value}
              className={`mode-card ${mode === m.value ? 'selected' : ''}`}
              onClick={() => setMode(m.value)}
            >
              <h3>{m.label}</h3>
              <p>{m.description}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Select Verbs ({selectedVerbs.size} selected)</h2>
        <div className="filter-bar">
          <button className={verbFilter === 'all' ? 'active' : ''} onClick={() => setVerbFilter('all')}>All</button>
          <button className={verbFilter === 'regular' ? 'active' : ''} onClick={() => setVerbFilter('regular')}>Regular</button>
          <button className={verbFilter === 'irregular' ? 'active' : ''} onClick={() => setVerbFilter('irregular')}>Irregular</button>
          <button className={verbFilter === 'stem_change' ? 'active' : ''} onClick={() => setVerbFilter('stem_change')}>Stem-change</button>
          <button className={verbFilter === 'ar' ? 'active' : ''} onClick={() => setVerbFilter('ar')}>-ar</button>
          <button className={verbFilter === 'er' ? 'active' : ''} onClick={() => setVerbFilter('er')}>-er</button>
          <button className={verbFilter === 'ir' ? 'active' : ''} onClick={() => setVerbFilter('ir')}>-ir</button>
          <div className="spacer" />
          <button onClick={selectAllFiltered}>Select All Filtered</button>
          <button onClick={clearVerbs}>Clear</button>
        </div>
        <div className="verb-grid">
          {filteredVerbs.map((verb) => (
            <button
              key={verb.id}
              className={`verb-chip ${selectedVerbs.has(verb.id) ? 'selected' : ''} ${verb.type}`}
              onClick={() => toggleVerb(verb.id)}
            >
              {verb.infinitive}
              <span className="verb-english"> {verb.english}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Select Tenses ({selectedTenses.size} selected)</h2>
        <div className="tense-actions">
          <button onClick={selectAllTenses}>Select All</button>
          <button onClick={clearTenses}>Clear</button>
        </div>
        <div className="tense-groups">
          <div className="tense-group">
            <h3>Core</h3>
            {tenses
              .filter((t) => t.category === 'core')
              .map((t) => (
                <button
                  key={t.value}
                  className={`tense-chip ${selectedTenses.has(t.value) ? 'selected' : ''}`}
                  onClick={() => toggleTense(t.value)}
                >
                  {t.label}
                </button>
              ))}
          </div>
          <div className="tense-group">
            <h3>Advanced</h3>
            {tenses
              .filter((t) => t.category === 'advanced')
              .map((t) => (
                <button
                  key={t.value}
                  className={`tense-chip ${selectedTenses.has(t.value) ? 'selected' : ''}`}
                  onClick={() => toggleTense(t.value)}
                >
                  {t.label}
                </button>
              ))}
          </div>
        </div>
      </section>

      {mode !== 'learn' && mode !== 'test' && (
        <section className="section">
          <h2>Hint Level</h2>
          <div className="hint-grid">
            {hintLevels.map((h) => (
              <button
                key={h.value}
                className={`hint-card ${hintLevel === h.value ? 'selected' : ''}`}
                onClick={() => setHintLevel(h.value)}
              >
                <h3>{h.label}</h3>
                <p>{h.description}</p>
              </button>
            ))}
          </div>
        </section>
      )}

      <div className="start-actions">
        <button
          className="start-btn"
          disabled={!canStart}
          onClick={handleStart}
        >
          Start {mode.charAt(0).toUpperCase() + mode.slice(1)} Session
        </button>
        <button
          className="study-btn"
          onClick={() => onStudy()}
        >
          📖 Study Conjugations
        </button>
      </div>
    </div>
  );
}
