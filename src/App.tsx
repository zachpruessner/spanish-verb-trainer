import { useState, useCallback } from 'react';
import type { SessionConfig, Attempt } from './types';
import { StartScreen } from './components/StartScreen';
import { SessionScreen } from './components/SessionScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { StudyScreen } from './components/StudyScreen';
import { useStats } from './hooks/useStats';
import './App.css';

type Screen = 'start' | 'session' | 'results' | 'study';

function App() {
  const [screen, setScreen] = useState<Screen>('start');
  const [config, setConfig] = useState<SessionConfig | null>(null);
  const [sessionAttempts, setSessionAttempts] = useState<Attempt[]>([]);
  const { recordAttempt } = useStats();

  const handleStart = (newConfig: SessionConfig) => {
    setConfig(newConfig);
    setSessionAttempts([]);
    setScreen('session');
  };

  const handleAttempt = useCallback((attempt: Attempt) => {
    setSessionAttempts((prev) => [...prev, attempt]);
    recordAttempt(attempt);
  }, [recordAttempt]);

  const handleEnd = () => {
    setScreen('results');
  };

  const handleRestart = () => {
    if (config) {
      setSessionAttempts([]);
      setScreen('session');
    }
  };

  const handleHome = () => {
    setConfig(null);
    setSessionAttempts([]);
    setScreen('start');
  };

  const handleStudy = () => {
    setScreen('study');
  };

  const handleStudyBack = () => {
    setScreen('start');
  };

  return (
    <div className="app">
      {screen === 'start' && <StartScreen onStart={handleStart} onStudy={handleStudy} />}
      {screen === 'session' && config && (
        <SessionScreen config={config} onEnd={handleEnd} onAttempt={handleAttempt} />
      )}
      {screen === 'results' && config && (
        <ResultsScreen
          attempts={sessionAttempts}
          onRestart={handleRestart}
          onHome={handleHome}
        />
      )}
      {screen === 'study' && <StudyScreen onBack={handleStudyBack} />}
    </div>
  );
}

export default App;
