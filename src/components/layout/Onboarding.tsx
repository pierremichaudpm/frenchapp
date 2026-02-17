import { useState, useCallback, useRef, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import type { AppMode, ParentLanguage } from '../../types';

interface Props {
  onComplete: () => void;
}

/* ─── Language data (same as LanguageSelector) ─── */
const languages: { code: ParentLanguage; label: string; native: string }[] = [
  { code: 'ar', label: 'Arabe', native: 'العربية' },
  { code: 'es', label: 'Espagnol', native: 'Español' },
  { code: 'en', label: 'Anglais', native: 'English' },
  { code: 'zh', label: 'Mandarin', native: '中文' },
  { code: 'ht', label: 'Créole haïtien', native: 'Kreyòl' },
  { code: 'pt', label: 'Portugais', native: 'Português' },
  { code: 'tl', label: 'Tagalog', native: 'Tagalog' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'ro', label: 'Roumain', native: 'Română' },
  { code: 'fa', label: 'Persan', native: 'فارسی' },
  { code: 'uk', label: 'Ukrainien', native: 'Українська' },
];

/* ─── Mode data (same as SettingsPage) ─── */
const modes: { id: AppMode; emoji: string; label: string; desc: string }[] = [
  { id: 'bebe', emoji: '👶', label: 'Mode Bébé', desc: '6-18 mois — Images et sons' },
  { id: 'grand', emoji: '🧒', label: 'Mode Grand', desc: '3-5 ans — Phrases et vocabulaire' },
  { id: 'educatrice', emoji: '👩‍🏫', label: 'Mode Éducatrice', desc: 'Projection en groupe' },
];

/* ─── Feature overview data ─── */
const features = [
  { emoji: '🖼️', name: 'Mots', desc: 'Cartes de vocabulaire illustrées' },
  { emoji: '🎵', name: 'Chansons', desc: 'Comptines animées à chanter' },
  { emoji: '☀️', name: 'Journée', desc: 'Routines matin, jour et soir' },
  { emoji: '🎒', name: 'Trousse', desc: 'Activités mensuelles thématiques' },
  { emoji: '📖', name: 'Livre', desc: 'Histoires personnalisées' },
];

const TOTAL_SCREENS = 4;

export default function Onboarding({ onComplete }: Props) {
  const { parentLanguage, setParentLanguage, mode, setMode } = useAppContext();
  const [screen, setScreen] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  /* ─── Touch / swipe handling ─── */
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null || touchStartY.current === null || isAnimating) return;

      const deltaX = e.changedTouches[0].clientX - touchStartX.current;
      const deltaY = e.changedTouches[0].clientY - touchStartY.current;
      touchStartX.current = null;
      touchStartY.current = null;

      // Only swipe if horizontal movement dominates
      if (Math.abs(deltaX) < 50 || Math.abs(deltaX) < Math.abs(deltaY)) return;

      if (deltaX < 0 && screen < TOTAL_SCREENS - 1) {
        goTo(screen + 1);
      } else if (deltaX > 0 && screen > 0) {
        goTo(screen - 1);
      }
    },
    [screen, isAnimating],
  );

  /* ─── Navigation ─── */
  const goTo = useCallback(
    (target: number) => {
      if (target === screen || isAnimating) return;
      setDirection(target > screen ? 'forward' : 'backward');
      setIsAnimating(true);
      setScreen(target);
    },
    [screen, isAnimating],
  );

  useEffect(() => {
    if (!isAnimating) return;
    const timer = setTimeout(() => setIsAnimating(false), 350);
    return () => clearTimeout(timer);
  }, [isAnimating, screen]);

  const handleNext = () => {
    if (screen < TOTAL_SCREENS - 1) goTo(screen + 1);
  };

  const handleFinish = () => {
    localStorage.setItem('cari-onboarded', 'true');
    onComplete();
  };

  const handleSkip = () => {
    localStorage.setItem('cari-onboarded', 'true');
    onComplete();
  };

  /* ─── Screen content renderers ─── */
  const renderWelcome = () => (
    <div className="flex flex-col items-center justify-center text-center px-6 flex-1">
      <div className="w-28 h-28 rounded-3xl bg-white shadow-lg flex items-center justify-center mb-8">
        <img
          src="/logos/cari-symbol.png"
          alt="CARI"
          className="w-20 h-20 object-contain"
        />
      </div>
      <h1 className="text-4xl font-serif font-bold text-dark mb-3">
        Bienvenue!
      </h1>
      <p className="text-lg text-dark/80 mb-4 leading-relaxed max-w-xs">
        L'application de <span className="text-primary font-semibold">francisation</span> pour
        les tout-petits du Québec.
      </p>
      <p className="text-sm text-muted leading-relaxed max-w-xs">
        CARI St-Laurent accompagne les familles immigrantes dans
        l'apprentissage du français, de 6 mois à 5 ans.
      </p>
      <div className="flex gap-2 mt-8">
        {['🖼️', '🎵', '☀️', '🎒', '📖'].map((e, i) => (
          <span
            key={i}
            className="text-2xl animate-bounce"
            style={{ animationDelay: `${i * 120}ms`, animationDuration: '1.5s' }}
          >
            {e}
          </span>
        ))}
      </div>
    </div>
  );

  const renderLanguage = () => (
    <div className="flex flex-col flex-1 px-6">
      <div className="text-center mb-6 pt-2">
        <span className="text-4xl mb-2 block">🌍</span>
        <h2 className="text-2xl font-serif font-bold text-dark mb-1">
          Votre langue
        </h2>
        <p className="text-sm text-muted">
          Les traductions apparaîtront dans cette langue.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 overflow-y-auto flex-1 pb-4">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setParentLanguage(lang.code)}
            className={`p-3 rounded-xl text-left transition-all ${
              parentLanguage === lang.code
                ? 'bg-primary text-white ring-2 ring-primary ring-offset-2 scale-[1.02]'
                : 'bg-white text-dark border border-brume hover:border-primary'
            }`}
          >
            <div className="font-medium text-sm">{lang.native}</div>
            <div
              className={`text-xs ${
                parentLanguage === lang.code ? 'text-white/80' : 'text-muted'
              }`}
            >
              {lang.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderMode = () => (
    <div className="flex flex-col items-center flex-1 px-6">
      <div className="text-center mb-6 pt-2">
        <span className="text-4xl mb-2 block">🎯</span>
        <h2 className="text-2xl font-serif font-bold text-dark mb-1">
          Mode d'utilisation
        </h2>
        <p className="text-sm text-muted">
          Choisissez selon l'âge de l'enfant.
        </p>
      </div>
      <div className="space-y-3 w-full max-w-sm">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`w-full p-5 rounded-2xl text-left transition-all flex items-center gap-4 ${
              mode === m.id
                ? 'bg-primary text-white ring-2 ring-primary ring-offset-2 scale-[1.02]'
                : 'bg-white border border-brume hover:border-primary'
            }`}
          >
            <span className="text-4xl">{m.emoji}</span>
            <div>
              <div className="font-bold text-base">{m.label}</div>
              <div
                className={`text-sm ${
                  mode === m.id ? 'text-white/80' : 'text-muted'
                }`}
              >
                {m.desc}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderFeatures = () => (
    <div className="flex flex-col items-center flex-1 px-6">
      <div className="text-center mb-6 pt-2">
        <span className="text-4xl mb-2 block">✨</span>
        <h2 className="text-2xl font-serif font-bold text-dark mb-1">
          Qu'est-ce qu'on peut faire?
        </h2>
        <p className="text-sm text-muted">
          Cinq activités pour apprendre le français en jouant.
        </p>
      </div>
      <div className="space-y-3 w-full max-w-sm">
        {features.map((f, i) => (
          <div
            key={f.name}
            className="flex items-center gap-4 bg-white rounded-2xl p-4 border border-brume"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <span className="text-3xl w-12 h-12 flex items-center justify-center rounded-xl bg-light">
              {f.emoji}
            </span>
            <div>
              <div className="font-bold text-dark">{f.name}</div>
              <div className="text-sm text-muted">{f.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const screens = [renderWelcome, renderLanguage, renderMode, renderFeatures];
  const isLastScreen = screen === TOTAL_SCREENS - 1;

  /* ─── Animation class based on direction ─── */
  const slideClass = isAnimating
    ? direction === 'forward'
      ? 'animate-slide-in-right'
      : 'animate-slide-in-left'
    : '';

  return (
    <div className="fixed inset-0 z-[100] bg-light flex flex-col overflow-hidden">
      {/* Skip button */}
      <div className="flex justify-end p-4 pb-0 shrink-0">
        <button
          onClick={handleSkip}
          className="text-sm text-muted hover:text-dark transition-colors px-3 py-1.5 rounded-full hover:bg-dark/5"
        >
          Passer →
        </button>
      </div>

      {/* Screen content */}
      <div
        ref={containerRef}
        className="flex-1 flex flex-col overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          key={screen}
          className={`flex-1 flex flex-col ${slideClass}`}
        >
          {screens[screen]()}
        </div>
      </div>

      {/* Bottom area: dots + button */}
      <div className="shrink-0 pb-8 pt-4 px-6 flex flex-col items-center gap-5">
        {/* Progress dots */}
        <div className="flex gap-2">
          {Array.from({ length: TOTAL_SCREENS }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Aller a l'ecran ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === screen
                  ? 'w-8 h-3 bg-primary'
                  : 'w-3 h-3 bg-brume hover:bg-muted'
              }`}
            />
          ))}
        </div>

        {/* Next / Finish button */}
        {isLastScreen ? (
          <button
            onClick={handleFinish}
            className="w-full max-w-xs bg-primary text-white font-bold text-lg py-4 rounded-2xl
                       shadow-lg shadow-primary/30 hover:bg-primary/90
                       active:scale-[0.97] transition-all"
          >
            Commencer!
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full max-w-xs bg-dark text-white font-bold text-base py-4 rounded-2xl
                       hover:bg-dark/90 active:scale-[0.97] transition-all"
          >
            Suivant
          </button>
        )}
      </div>

      {/* Inline keyframe styles for slide animations */}
      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.35s ease-out both;
        }
        .animate-slide-in-left {
          animation: slideInLeft 0.35s ease-out both;
        }
      `}</style>
    </div>
  );
}
