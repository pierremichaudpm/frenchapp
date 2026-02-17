import { useState, useEffect } from "react";
import { useAudio } from "../../hooks/useAudio";
import { useAppContext } from "../../context/AppContext";
import { trackEvent } from "../../utils/analytics";
import type { WordCard as WordCardType } from "../../types";

/* ─── Shared flag so only the first WordCard on screen shows the tooltip ─── */
let tooltipClaimedByInstance = false;

function useTranslationTooltip() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const alreadySeen = localStorage.getItem("cari-tooltip-longpress");
    if (!alreadySeen && !tooltipClaimedByInstance) {
      tooltipClaimedByInstance = true;
      setShow(true);
    }
    return () => {
      // Release claim when component unmounts so it works on next navigation
      if (show) tooltipClaimedByInstance = false;
    };
  }, []);

  const dismiss = () => {
    setShow(false);
    localStorage.setItem("cari-tooltip-longpress", "true");
    tooltipClaimedByInstance = false;
  };

  return { showTooltip: show, dismissTooltip: dismiss };
}

interface Props {
  card: WordCardType;
}

export default function WordCard({ card }: Props) {
  const { speak } = useAudio();
  const { mode, parentLanguage } = useAppContext();
  const [showTranslation, setShowTranslation] = useState(false);
  const [animating, setAnimating] = useState(false);
  const { showTooltip, dismissTooltip } = useTranslationTooltip();

  const isBebe = mode === "bebe";

  const handleTap = () => {
    trackEvent("word_tap", { word: card.word });
    setAnimating(true);
    if (isBebe) {
      speak(card.word, { rate: 0.7 });
    } else {
      speak(card.audioText);
    }
    setTimeout(() => setAnimating(false), 300);
  };

  const handleLongPress = () => {
    if (showTooltip) dismissTooltip();
    setShowTranslation(true);
    setTimeout(() => setShowTranslation(false), 3000);
  };

  const translation = card.translations[parentLanguage];
  const isEducatrice = mode === "educatrice";

  const wordLabel = card.article ? `${card.article} ${card.word}` : card.word;

  return (
    <div className="relative">
      {/* One-time tooltip: teach long-press for translation */}
      {showTooltip && translation && (
        <div
          className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full z-10
                     bg-dark text-white text-xs rounded-xl px-3 py-2 shadow-lg
                     max-w-[200px] text-center animate-fade-in"
        >
          <span>Appui long pour voir la traduction</span>
          <div
            className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0
                          border-l-6 border-r-6 border-t-6
                          border-l-transparent border-r-transparent border-t-dark"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              dismissTooltip();
            }}
            className="block mx-auto mt-1 text-white/60 hover:text-white text-[10px] underline"
          >
            OK
          </button>
        </div>
      )}

      <button
        onClick={handleTap}
        onContextMenu={(e) => {
          e.preventDefault();
          handleLongPress();
        }}
        onTouchStart={() => {
          const timer = setTimeout(handleLongPress, 600);
          const clear = () => {
            clearTimeout(timer);
            document.removeEventListener("touchend", clear);
          };
          document.addEventListener("touchend", clear);
        }}
        aria-label={`${wordLabel}. Appuie pour écouter${translation ? `. Appui long pour la traduction` : ""}`}
        className={`w-full bg-white rounded-2xl border-2 border-brume hover:border-secondary
          active:scale-95 transition-all flex flex-col items-center text-center
          ${isEducatrice ? "p-8" : isBebe ? "p-6" : "p-4"}
          ${animating ? "animate-pop" : ""}
          ${showTranslation ? "ring-2 ring-accent" : ""}`}
      >
        <span
          className={
            isEducatrice
              ? "text-7xl mb-4"
              : isBebe
                ? "text-6xl mb-3"
                : "text-5xl mb-3"
          }
          aria-hidden="true"
        >
          {card.emoji}
        </span>

        <span
          className={`font-bold text-dark ${isEducatrice ? "text-2xl" : isBebe ? "text-xl" : "text-lg"}`}
        >
          {card.article && (
            <span className="text-muted font-normal">{card.article} </span>
          )}
          {card.word}
        </span>

        {mode === "grand" && (
          <span className="text-sm text-muted mt-1 leading-tight">
            {card.phrase}
          </span>
        )}

        {showTranslation && translation && (
          <span
            className="mt-2 px-3 py-1 bg-accent/20 text-dark rounded-full text-sm font-medium"
            role="status"
          >
            {translation}
          </span>
        )}

        <span className="mt-2 text-primary text-sm" aria-hidden="true">
          {animating ? "🔊" : "🔈"} Écouter
        </span>
      </button>
    </div>
  );
}
