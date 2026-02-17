import { useState, useCallback } from 'react';
import { routineCards } from '../../data/routine';
import { useAudio } from '../../hooks/useAudio';

export default function SequenceGame() {
  const { speak } = useAudio();
  const allCards = [...routineCards];
  const [shuffled, setShuffled] = useState(() => shuffle([...allCards]));
  const [selected, setSelected] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);
  const [wrong, setWrong] = useState<string | null>(null);

  const expectedOrder = allCards.sort((a, b) => a.order - b.order).map(c => c.id);
  const nextExpected = expectedOrder[selected.length];

  const handleSelect = useCallback((cardId: string) => {
    if (completed || selected.includes(cardId)) return;

    const card = routineCards.find(c => c.id === cardId)!;
    speak(card.audioText);

    if (cardId === nextExpected) {
      const newSelected = [...selected, cardId];
      setSelected(newSelected);
      if (newSelected.length === expectedOrder.length) {
        setCompleted(true);
        setTimeout(() => speak('Bravo! Tu as mis toutes les cartes dans le bon ordre!'), 500);
      }
    } else {
      setWrong(cardId);
      setTimeout(() => setWrong(null), 800);
    }
  }, [completed, selected, nextExpected, expectedOrder.length, speak]);

  const handleReset = () => {
    setShuffled(shuffle([...allCards]));
    setSelected([]);
    setCompleted(false);
  };

  return (
    <div>
      <p className="text-sm text-muted mb-4">
        Appuie sur les cartes dans l'ordre de la journée!
        <span className="font-bold text-dark ml-1" aria-live="polite">{selected.length}/{expectedOrder.length}</span>
      </p>

      {/* Selected cards in order */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4 p-3 bg-white rounded-xl border border-secondary" aria-label="Cartes sélectionnées">
          {selected.map((id, i) => {
            const card = routineCards.find(c => c.id === id)!;
            return (
              <div key={id} className="flex items-center gap-1 bg-secondary/15 rounded-full px-3 py-1 text-sm">
                <span className="text-xs text-muted">{i + 1}.</span>
                <span>{card.emoji}</span>
                <span className="text-dark font-medium">{card.phrase}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Cards to pick from */}
      <div className="grid grid-cols-2 gap-3">
        {shuffled
          .filter(c => !selected.includes(c.id))
          .map(card => (
            <button
              key={card.id}
              onClick={() => handleSelect(card.id)}
              aria-label={`${card.phrase}. ${selected.includes(card.id) ? 'Déjà sélectionné' : ''}`}
              className={`bg-white rounded-2xl p-4 flex flex-col items-center gap-2
                border-2 active:scale-95 transition-all
                ${wrong === card.id ? 'border-red-400 bg-red-50 animate-[shake_0.3s]' : 'border-brume hover:border-accent'}`}
            >
              <span className="text-4xl">{card.emoji}</span>
              <span className="text-sm font-medium text-dark text-center">{card.phrase}</span>
            </button>
          ))}
      </div>

      {completed && (
        <div className="mt-6 text-center" role="status">
          <div className="text-6xl animate-celebrate mb-3">🎉</div>
          <p className="text-xl font-bold text-dark font-serif mb-4">Bravo!</p>
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-primary text-white rounded-full font-medium active:scale-95 transition-transform"
          >
            Rejouer
          </button>
        </div>
      )}
    </div>
  );
}

function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
