import { useState } from 'react';
import { useAudio } from '../../hooks/useAudio';
import type { StoryPage } from '../../types';

interface Props {
  pages: StoryPage[];
  title: string;
}

export default function MiniStory({ pages, title }: Props) {
  const [currentPage, setCurrentPage] = useState(0);
  const { speak } = useAudio();
  const page = pages[currentPage];

  const handleReadPage = () => {
    speak(page.text, { rate: 0.8 });
  };

  const goNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goPrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderHighlightedText = (text: string, highlights: string[]) => {
    let result = text;
    highlights.forEach(word => {
      result = result.replace(
        new RegExp(`(${word})`, 'gi'),
        '|||$1|||'
      );
    });
    return result.split('|||').map((part, i) => {
      const isHighlight = highlights.some(w => w.toLowerCase() === part.toLowerCase());
      return isHighlight ? (
        <button
          key={i}
          onClick={() => speak(part)}
          className="font-bold text-primary underline decoration-accent decoration-2 underline-offset-2"
        >
          {part}
        </button>
      ) : (
        <span key={i}>{part}</span>
      );
    });
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-dark font-serif mb-4">{title}</h2>

      {/* Story page */}
      <div className="bg-white rounded-3xl p-6 border-2 border-brume shadow-sm min-h-[250px] flex flex-col items-center justify-center text-center" aria-live="polite">
        <span className="text-7xl mb-6" aria-hidden="true">{page.emoji}</span>
        <p className="text-lg leading-relaxed text-dark">
          {renderHighlightedText(page.text, page.highlightWords)}
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={goPrev}
          disabled={currentPage === 0}
          aria-label="Page précédente"
          className={`w-12 h-12 rounded-full flex items-center justify-center text-xl
            ${currentPage === 0 ? 'bg-brume text-muted' : 'bg-white border border-brume text-dark active:scale-90'}`}
        >
          ←
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleReadPage}
            aria-label={`Lire cette page`}
            className="px-5 py-2.5 bg-primary text-white rounded-full font-medium text-sm
              active:scale-95 transition-transform flex items-center gap-2"
          >
            🔈 Lire cette page
          </button>
          <span className="text-sm text-muted">{currentPage + 1}/{pages.length}</span>
        </div>

        <button
          onClick={goNext}
          disabled={currentPage === pages.length - 1}
          aria-label="Page suivante"
          className={`w-12 h-12 rounded-full flex items-center justify-center text-xl
            ${currentPage === pages.length - 1 ? 'bg-brume text-muted' : 'bg-primary text-white active:scale-90'}`}
        >
          →
        </button>
      </div>

      {/* Page dots */}
      <div className="flex justify-center gap-2 mt-4">
        {pages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            aria-label={`Aller à la page ${i + 1}`}
            className={`w-3 h-3 rounded-full transition-all ${
              i === currentPage ? 'bg-primary scale-125' : 'bg-brume'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
