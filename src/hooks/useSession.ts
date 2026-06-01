import { useState, useCallback, useEffect, useRef } from 'react';
import type { SessionConfig, SessionState, Attempt, Person, Prompt } from '../types';
import { generateRandomPrompt } from '../engine/promptGenerator';

const people: Person[] = ['yo', 'tú', 'él', 'nosotros', 'ellos'];

export function useSession(config: SessionConfig | null) {
  const [state, setState] = useState<SessionState>({
    config: config || {
      mode: 'learn',
      verbs: [],
      tenses: [],
      hintLevel: 'verb',
    },
    currentPrompt: null,
    attempts: [],
    isAnswered: false,
    startTime: null,
  });

  const promptStartTime = useRef<Date | null>(null);
  const currentPromptRef = useRef<Prompt | null>(null);

  const generateNextPrompt = useCallback(() => {
    if (!config || config.verbs.length === 0 || config.tenses.length === 0) {
      return;
    }

    const prompt = generateRandomPrompt(config.verbs, config.tenses, people, currentPromptRef.current ?? undefined);
    promptStartTime.current = new Date();
    currentPromptRef.current = prompt;

    setState((prev) => ({
      ...prev,
      currentPrompt: prompt,
      isAnswered: false,
      startTime: promptStartTime.current,
    }));
  }, [config]);

  useEffect(() => {
    if (config && config.verbs.length > 0 && config.tenses.length > 0) {
      generateNextPrompt();
    }
  }, [config, generateNextPrompt]);

  const submitAnswer = useCallback(
    (userAnswer: string) => {
      if (!state.currentPrompt || !promptStartTime.current) return;

      const endTime = new Date();
      const timeTaken = endTime.getTime() - promptStartTime.current.getTime();

      const normalizedUser = userAnswer.trim().toLowerCase();
      const normalizedCorrect = state.currentPrompt.correctAnswer
        .trim()
        .toLowerCase();

      const correct = normalizedUser === normalizedCorrect;

      const attempt: Attempt = {
        prompt: state.currentPrompt,
        userAnswer,
        correct,
        timeTaken,
        timestamp: endTime,
      };

      setState((prev) => ({
        ...prev,
        attempts: [...prev.attempts, attempt],
        isAnswered: true,
      }));

      return attempt;
    },
    [state.currentPrompt]
  );

  const nextPrompt = useCallback(() => {
    generateNextPrompt();
  }, [generateNextPrompt]);

  const skip = useCallback(() => {
    if (!state.currentPrompt) return;

    const attempt: Attempt = {
      prompt: state.currentPrompt,
      userAnswer: '(skipped)',
      correct: false,
      timeTaken: 0,
      timestamp: new Date(),
    };

    setState((prev) => ({
      ...prev,
      attempts: [...prev.attempts, attempt],
    }));

    generateNextPrompt();
  }, [state.currentPrompt, generateNextPrompt]);

  const getScore = useCallback(() => {
    const total = state.attempts.length;
    const correct = state.attempts.filter((a) => a.correct).length;
    return { total, correct, percentage: total > 0 ? Math.round((correct / total) * 100) : 0 };
  }, [state.attempts]);

  return {
    state,
    submitAnswer,
    nextPrompt,
    skip,
    getScore,
    generateNextPrompt,
  };
}
