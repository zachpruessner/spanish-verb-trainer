import { useState, useEffect, useRef, type KeyboardEvent } from 'react';
import type { SessionConfig, Attempt } from '../types';
import { useSession } from '../hooks/useSession';

interface SessionScreenProps {
  config: SessionConfig;
  onEnd: () => void;
  onAttempt: (attempt: Attempt) => void;
}

export function SessionScreen({ config, onEnd, onAttempt }: SessionScreenProps) {
  const [input, setInput] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { state, submitAnswer, nextPrompt, skip, getScore } = useSession(config);

  useEffect(() => {
    inputRef.current?.focus();
  }, [state.currentPrompt]);

  const handleSubmit = () => {
    if (!input.trim() || state.isAnswered) return;

    const attempt = submitAnswer(input);
    if (attempt) {
      onAttempt(attempt);
      setShowFeedback(true);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (state.isAnswered) {
        setShowFeedback(false);
        setInput('');
        nextPrompt();
      } else {
        handleSubmit();
      }
    }
  };

  const handleSkip = () => {
    skip();
    setInput('');
  };

  const handleEnd = () => {
    onEnd();
  };

  const score = getScore();
  const prompt = state.currentPrompt;

  if (!prompt) {
    return <div className="session-screen">Loading...</div>;
  }

  const getDisplayPrompt = () => {
    switch (config.hintLevel) {
      case 'verb':
        return `${prompt.verb.infinitive} — ${prompt.englishPrompt}`;
      case 'infinitive':
        return `${prompt.verb.english} — ${prompt.englishPrompt}`;
      case 'none':
        return prompt.englishPrompt;
      default:
        return prompt.englishPrompt;
    }
  };

  return (
    <div className="session-screen">
      <div className="session-header">
        <div className="score">
          <span className="correct">{score.correct}</span>
          <span className="separator">/</span>
          <span className="total">{score.total}</span>
        </div>
        <button className="end-btn" onClick={handleEnd}>
          End Session
        </button>
      </div>

      <div className="prompt-area">
        <div className="prompt-display">{getDisplayPrompt()}</div>
      </div>

      <div className="input-area">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your answer..."
          autoComplete="off"
          spellCheck={false}
          readOnly={state.isAnswered}
          className={state.isAnswered ? (state.attempts[state.attempts.length - 1]?.correct ? 'correct' : 'incorrect') : ''}
        />
        <div className="button-row">
          {!state.isAnswered ? (
            <>
              <button className="submit-btn" onClick={handleSubmit} disabled={!input.trim()}>
                Submit
              </button>
              <button className="skip-btn" onClick={handleSkip}>
                Skip
              </button>
            </>
          ) : (
            <button className="next-btn" onClick={() => {
              setShowFeedback(false);
              setInput('');
              nextPrompt();
            }}>
              Next →
            </button>
          )}
        </div>
      </div>

      {showFeedback && state.attempts.length > 0 && (
        <div className={`feedback ${state.attempts[state.attempts.length - 1].correct ? 'correct' : 'incorrect'}`}>
          {state.attempts[state.attempts.length - 1].correct ? (
            <div className="feedback-content">
              <span className="feedback-icon">✓</span>
              <span className="feedback-answer">{prompt.correctAnswer}</span>
            </div>
          ) : (
            <div className="feedback-content">
              <span className="feedback-icon">✗</span>
              <div className="feedback-answers">
                <div className="your-answer">You: {state.attempts[state.attempts.length - 1].userAnswer}</div>
                <div className="correct-answer">Correct: {prompt.correctAnswer}</div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="session-footer">
        <span className="mode-label">{config.mode.toUpperCase()}</span>
        <span className="verb-count">{config.verbs.length} verbs</span>
        <span className="tense-count">{config.tenses.length} tenses</span>
      </div>
    </div>
  );
}
