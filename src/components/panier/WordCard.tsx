import { useState } from 'react';
import { useAudio } from '../../hooks/useAudio';
import { useAppContext } from '../../context/AppContext';
import { trackEvent } from '../../utils/analytics';
import type { WordCard as WordCardType } from '../../types';

interface Props {
  card: WordCardType;
}

export default function WordCard({ card }: Props) {
  const { speak } = useAudio();
  const { mode, parentLanguage } = useAppContext();
  const [showTranslation, setShowTranslation] = useState(false);
  const [animating, setAnimating] = useState(false);

  const isBebe = mode === 'bebe';

  const handleTap = () => {
    trackEvent('word_tap', { word: card.word });
    setAnimating(true);
    if (isBebe) {
      speak(card.word, { rate: 0.7 });
    } else {
      speak(card.audioText);
    }
    setTimeout(() => setAnimating(false), 300);
  };

  const handleLongPress = () => {
    setShowTranslation(true);
    setTimeout(() => setShowTranslation(false), 3000);
  };

  const translation = card.translations[parentLanguage];
  const isEducatrice = mode === 'educatrice';

  const wordLabel = card.article ? `${card.article} ${card.word}` : card.word;

  return (
    <button
      onClick={handleTap}
      onContextMenu={(e) => { e.preventDefault(); handleLongPress(); }}
      onTouchStart={() => {
        const timer = setTimeout(handleLongPress, 600);
        const clear = () => { clearTimeout(timer); document.removeEventListener('touchend', clear); };
        document.addEventListener('touchend', clear);
      }}
      aria-label={`${wordLabel}. Appuie pour écouter${translation ? `. Appui long pour la traduction` : ''}`}
      className={`bg-white rounded-2xl border-2 border-brume hover:border-secondary
        active:scale-95 transition-all flex flex-col items-center text-center
        ${isEducatrice ? 'p-8' : isBebe ? 'p-6' : 'p-4'}
        ${animating ? 'animate-pop' : ''}
        ${showTranslation ? 'ring-2 ring-accent' : ''}`}
    >
      <span className={isEducatrice ? 'text-7xl mb-4' : isBebe ? 'text-6xl mb-3' : 'text-5xl mb-3'} aria-hidden="true">{card.emoji}</span>

      <span className={`font-bold text-dark ${isEducatrice ? 'text-2xl' : isBebe ? 'text-xl' : 'text-lg'}`}>
        {card.article && <span className="text-muted font-normal">{card.article} </span>}
        {card.word}
      </span>

      {mode === 'grand' && (
        <span className="text-sm text-muted mt-1 leading-tight">{card.phrase}</span>
      )}

      {showTranslation && translation && (
        <span className="mt-2 px-3 py-1 bg-accent/20 text-dark rounded-full text-sm font-medium" role="status">
          {translation}
        </span>
      )}

      <span className="mt-2 text-primary text-sm" aria-hidden="true">
        {animating ? '🔊' : '🔈'} Écouter
      </span>
    </button>
  );
}
