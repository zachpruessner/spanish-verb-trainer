import type { Attempt, Tense } from '../types';

interface ResultsScreenProps {
  attempts: Attempt[];
  onRestart: () => void;
  onHome: () => void;
}

export function ResultsScreen({ attempts, onRestart, onHome }: ResultsScreenProps) {
  const total = attempts.length;
  const correct = attempts.filter((a) => a.correct).length;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  const avgTime = total > 0 ? Math.round(attempts.reduce((sum, a) => sum + a.timeTaken, 0) / total / 1000 * 10) / 10 : 0;

  const verbStats: Record<string, { total: number; correct: number }> = {};
  const tenseStats: Record<string, { total: number; correct: number }> = {};

  attempts.forEach((a) => {
    const verbId = a.prompt.verb.id;
    const tense = a.prompt.tense;

    if (!verbStats[verbId]) {
      verbStats[verbId] = { total: 0, correct: 0 };
    }
    verbStats[verbId].total++;
    if (a.correct) verbStats[verbId].correct++;

    if (!tenseStats[tense]) {
      tenseStats[tense] = { total: 0, correct: 0 };
    }
    tenseStats[tense].total++;
    if (a.correct) tenseStats[tense].correct++;
  });

  const weakVerbs = Object.entries(verbStats)
    .filter(([, s]) => s.correct / s.total < 0.7 && s.total >= 2)
    .sort((a, b) => a[1].correct / a[1].total - b[1].correct / b[1].total);

  const weakTenses = Object.entries(tenseStats)
    .filter(([, s]) => s.correct / s.total < 0.7 && s.total >= 3)
    .sort((a, b) => a[1].correct / a[1].total - b[1].correct / b[1].total);

  const tenseLabels: Record<Tense, string> = {
    present: 'Present',
    preterite: 'Preterite',
    imperfect: 'Imperfect',
    future: 'Future',
    conditional: 'Conditional',
    present_progressive: 'Present Progressive',
    present_perfect: 'Present Perfect',
    ir_a_infinitive: 'Ir + a + Infinitive',
  };

  return (
    <div className="results-screen">
      <h1>Session Results</h1>

      <div className="score-summary">
        <div className="score-circle">
          <span className="score-percentage">{percentage}%</span>
        </div>
        <div className="score-details">
          <div>{correct} correct out of {total}</div>
          <div>Avg time: {avgTime}s</div>
        </div>
      </div>

      {weakVerbs.length > 0 && (
        <section className="weak-areas">
          <h2>Weak Verbs</h2>
          <div className="weak-list">
            {weakVerbs.map(([verbId, stats]) => {
              const verb = attempts.find((a) => a.prompt.verb.id === verbId)?.prompt.verb;
              return (
                <div key={verbId} className="weak-item">
                  <span className="weak-verb">{verb?.infinitive}</span>
                  <span className="weak-rate">
                    {stats.correct}/{stats.total} ({Math.round((stats.correct / stats.total) * 100)}%)
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {weakTenses.length > 0 && (
        <section className="weak-areas">
          <h2>Weak Tenses</h2>
          <div className="weak-list">
            {weakTenses.map(([tense, stats]) => (
              <div key={tense} className="weak-item">
                <span className="weak-tense">{tenseLabels[tense as Tense]}</span>
                <span className="weak-rate">
                  {stats.correct}/{stats.total} ({Math.round((stats.correct / stats.total) * 100)}%)
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="results-actions">
        <button className="restart-btn" onClick={onRestart}>
          Practice Again
        </button>
        <button className="home-btn" onClick={onHome}>
          Back to Home
        </button>
      </div>
    </div>
  );
}
