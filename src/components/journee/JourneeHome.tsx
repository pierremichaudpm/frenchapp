import { useState } from 'react';
import { routineCards } from '../../data/routine';
import { useAudio } from '../../hooks/useAudio';
import { trackEvent } from '../../utils/analytics';
import SequenceGame from './SequenceGame';
import RandomDraw from './RandomDraw';
import { useAppContext } from '../../context/AppContext';

type Tab = 'explore' | 'sequence' | 'random';

export default function JourneeHome() {
  const { mode } = useAppContext();
  const [tab, setTab] = useState<Tab>('explore');
  const { speak } = useAudio();
  const [animatingId, setAnimatingId] = useState<string | null>(null);

  const periods = [
    { id: 'matin' as const, label: 'Matin', emoji: '🌅' },
    { id: 'jour' as const, label: 'Jour', emoji: '☀️' },
    { id: 'soir' as const, label: 'Soir', emoji: '🌙' },
  ];

  const handleCardTap = (id: string, text: string) => {
    trackEvent('routine_tap', { card: id });
    setAnimatingId(id);
    speak(text);
    setTimeout(() => setAnimatingId(null), 500);
  };

  const tabs: { id: Tab; label: string; emoji: string }[] = [
    { id: 'explore', label: 'Explorer', emoji: '👀' },
    { id: 'sequence', label: 'Ordonner', emoji: '🔢' },
    { id: 'random', label: 'Piger!', emoji: '🎲' },
  ];

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-dark mb-1 font-serif">Ma journée en français</h1>
      <p className="text-muted mb-4">Les actions de la journée!</p>

      {mode !== 'bebe' && (
        <div className="flex gap-2 mb-6 bg-white rounded-xl p-1 border border-brume" role="tablist">
          {tabs.map(t => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1 ${
                tab === t.id ? 'bg-primary text-white shadow-sm' : 'text-muted hover:text-dark'
              }`}
            >
              <span>{t.emoji}</span> {t.label}
            </button>
          ))}
        </div>
      )}

      {(tab === 'explore' || mode === 'bebe') && (
        <div className="space-y-6">
          {periods.map(period => (
            <div key={period.id}>
              <h2 className="text-lg font-bold text-dark mb-3 flex items-center gap-2">
                <span className="text-2xl">{period.emoji}</span> {period.label}
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {routineCards
                  .filter(c => c.period === period.id)
                  .map(card => (
                    <button
                      key={card.id}
                      onClick={() => handleCardTap(card.id, card.audioText)}
                      aria-label={card.phrase}
                      className={`bg-white rounded-2xl flex flex-col items-center gap-2
                        border border-brume hover:border-secondary active:scale-95 transition-all
                        ${mode === 'educatrice' ? 'p-6' : 'p-4'}
                        ${animatingId === card.id ? 'animate-pop border-accent' : ''}`}
                    >
                      <span className={mode === 'bebe' || mode === 'educatrice' ? 'text-5xl' : 'text-4xl'}>{card.emoji}</span>
                      {mode !== 'bebe' && <span className={`font-medium text-dark text-center ${mode === 'educatrice' ? 'text-base' : 'text-sm'}`}>{card.phrase}</span>}
                      <span className="text-xs text-primary">🔈</span>
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'sequence' && mode !== 'bebe' && <SequenceGame />}
      {tab === 'random' && mode !== 'bebe' && <RandomDraw />}
    </div>
  );
}
