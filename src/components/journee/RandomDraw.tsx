import { useState } from 'react';
import { routineCards } from '../../data/routine';
import { useAudio } from '../../hooks/useAudio';

export default function RandomDraw() {
  const { speak } = useAudio();
  const [drawnCard, setDrawnCard] = useState<typeof routineCards[0] | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleDraw = () => {
    setIsDrawing(true);
    // Quick shuffle animation
    let count = 0;
    const interval = setInterval(() => {
      const random = routineCards[Math.floor(Math.random() * routineCards.length)];
      setDrawnCard(random);
      count++;
      if (count > 8) {
        clearInterval(interval);
        setIsDrawing(false);
        const final = routineCards[Math.floor(Math.random() * routineCards.length)];
        setDrawnCard(final);
        speak(final.audioText);
      }
    }, 100);
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-sm text-muted mb-6 text-center">
        Pige une carte et mime l'action!
      </p>

      {/* Drawn card */}
      {drawnCard && (
        <div
          aria-live="polite"
          aria-label={`Carte pigée: ${drawnCard.phrase}`}
          className={`bg-white rounded-3xl p-8 mb-8 flex flex-col items-center gap-4
          border-2 border-accent shadow-lg w-full max-w-xs
          ${isDrawing ? 'animate-pulse' : 'animate-pop'}`}
        >
          <span className="text-7xl">{drawnCard.emoji}</span>
          <span className="text-xl font-bold text-dark text-center font-serif">{drawnCard.phrase}</span>
          {!isDrawing && (
            <button
              onClick={() => speak(drawnCard.audioText)}
              aria-label="Écouter encore"
              className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium
                active:scale-95 transition-transform flex items-center gap-2"
            >
              🔈 Écouter encore
            </button>
          )}
        </div>
      )}

      {/* Draw button */}
      <button
        onClick={handleDraw}
        disabled={isDrawing}
        aria-label="Piger une carte au hasard"
        className={`w-48 h-48 rounded-full flex flex-col items-center justify-center
          text-white font-bold text-xl transition-all
          ${isDrawing ? 'bg-accent scale-95' : 'bg-primary hover:bg-primary/90 active:scale-90 shadow-lg'}`}
      >
        <span className="text-5xl mb-2">🎲</span>
        <span className="font-serif">Pige une carte!</span>
      </button>
    </div>
  );
}
