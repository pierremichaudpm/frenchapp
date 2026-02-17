import { useAppContext } from '../../context/AppContext';
import type { AppMode } from '../../types';

const modes: { id: AppMode; emoji: string; label: string }[] = [
  { id: 'bebe', emoji: '👶', label: 'Bébé' },
  { id: 'grand', emoji: '🧒', label: 'Grand' },
  { id: 'educatrice', emoji: '👩‍🏫', label: 'Éducatrice' },
];

export default function ModeToggle() {
  const { mode, setMode } = useAppContext();

  return (
    <div className="flex bg-dark/10 rounded-full p-1 gap-1" role="radiogroup" aria-label="Mode d'utilisation">
      {modes.map(m => (
        <button
          key={m.id}
          role="radio"
          aria-checked={mode === m.id}
          aria-label={`Mode ${m.label}`}
          onClick={() => setMode(m.id)}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
            mode === m.id
              ? 'bg-white text-dark shadow-sm'
              : 'text-dark/60 hover:text-dark/80'
          }`}
        >
          <span aria-hidden="true">{m.emoji}</span>
          <span className="hidden sm:inline">{m.label}</span>
        </button>
      ))}
    </div>
  );
}
