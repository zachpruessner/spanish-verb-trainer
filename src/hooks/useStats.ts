import { useState, useEffect, useCallback } from 'react';
import type { Attempt, VerbStats, TenseStats } from '../types';

const STORAGE_KEY = 'spanish-verb-trainer-stats';

interface StoredStats {
  verbStats: Record<string, VerbStats>;
  tenseStats: Record<string, TenseStats>;
}

function loadStats(): StoredStats {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch {
    // ignore
  }
  return { verbStats: {}, tenseStats: {} };
}

function saveStats(stats: StoredStats): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}

export function useStats() {
  const [stats, setStats] = useState<StoredStats>(loadStats);

  useEffect(() => {
    saveStats(stats);
  }, [stats]);

  const recordAttempt = useCallback((attempt: Attempt) => {
    setStats((prev) => {
      const verbId = attempt.prompt.verb.id;
      const tense = attempt.prompt.tense;

      const verbStats = { ...prev.verbStats };
      const existingVerb = verbStats[verbId] || {
        verbId,
        totalAttempts: 0,
        correctAttempts: 0,
        avgTime: 0,
        lastAttempt: null,
      };

      const newVerbTotal = existingVerb.totalAttempts + 1;
      const newVerbCorrect = existingVerb.correctAttempts + (attempt.correct ? 1 : 0);
      const newVerbAvgTime =
        (existingVerb.avgTime * existingVerb.totalAttempts + attempt.timeTaken) / newVerbTotal;

      verbStats[verbId] = {
        ...existingVerb,
        totalAttempts: newVerbTotal,
        correctAttempts: newVerbCorrect,
        avgTime: newVerbAvgTime,
        lastAttempt: new Date(),
      };

      const tenseStats = { ...prev.tenseStats };
      const existingTense = tenseStats[tense] || {
        tense,
        totalAttempts: 0,
        correctAttempts: 0,
        avgTime: 0,
      };

      const newTenseTotal = existingTense.totalAttempts + 1;
      const newTenseCorrect = existingTense.correctAttempts + (attempt.correct ? 1 : 0);
      const newTenseAvgTime =
        (existingTense.avgTime * existingTense.totalAttempts + attempt.timeTaken) / newTenseTotal;

      tenseStats[tense] = {
        ...existingTense,
        totalAttempts: newTenseTotal,
        correctAttempts: newTenseCorrect,
        avgTime: newTenseAvgTime,
      };

      return { verbStats, tenseStats };
    });
  }, []);

  const getWeakVerbs = useCallback(
    (minAttempts = 3) => {
      return Object.values(stats.verbStats)
        .filter((s) => s.totalAttempts >= minAttempts)
        .sort((a, b) => {
          const aRate = a.correctAttempts / a.totalAttempts;
          const bRate = b.correctAttempts / b.totalAttempts;
          return aRate - bRate;
        })
        .map((s) => s.verbId);
    },
    [stats.verbStats]
  );

  const getWeakTenses = useCallback(
    (minAttempts = 5) => {
      return Object.values(stats.tenseStats)
        .filter((s) => s.totalAttempts >= minAttempts)
        .sort((a, b) => {
          const aRate = a.correctAttempts / a.totalAttempts;
          const bRate = b.correctAttempts / b.totalAttempts;
          return aRate - bRate;
        })
        .map((s) => s.tense);
    },
    [stats.tenseStats]
  );

  const resetStats = useCallback(() => {
    setStats({ verbStats: {}, tenseStats: {} });
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    stats,
    recordAttempt,
    getWeakVerbs,
    getWeakTenses,
    resetStats,
  };
}
