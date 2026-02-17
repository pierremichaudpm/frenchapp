import { useAppContext } from '../../context/AppContext';
import LanguageSelector from '../shared/LanguageSelector';
import type { AppMode } from '../../types';

const modes: { id: AppMode; emoji: string; label: string; desc: string }[] = [
  { id: 'bebe', emoji: '👶', label: 'Mode Bébé', desc: '6-18 mois — Grandes images, audio simple' },
  { id: 'grand', emoji: '🧒', label: 'Mode Grand', desc: '3-5 ans — Phrases, contexte, vocabulaire' },
  { id: 'educatrice', emoji: '👩‍🏫', label: 'Mode Éducatrice', desc: 'Grandes cartes pour projection en groupe' },
];

export default function SettingsPage() {
  const { mode, setMode } = useAppContext();

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-dark mb-6 font-serif">Paramètres</h1>

      {/* Mode */}
      <div className="mb-8">
        <h2 className="text-sm font-bold text-dark mb-3">Mode d'utilisation</h2>
        <div className="space-y-2">
          {modes.map(m => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`w-full p-4 rounded-xl text-left transition-all flex items-center gap-4 ${
                mode === m.id
                  ? 'bg-primary text-white ring-2 ring-primary ring-offset-2'
                  : 'bg-white border border-brume hover:border-primary'
              }`}
            >
              <span className="text-3xl">{m.emoji}</span>
              <div>
                <div className="font-bold">{m.label}</div>
                <div className={`text-sm ${mode === m.id ? 'text-white/80' : 'text-muted'}`}>{m.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Language */}
      <div className="mb-8">
        <LanguageSelector />
      </div>

      {/* About */}
      <div className="bg-white rounded-2xl p-4 border border-brume">
        <div className="flex items-center gap-3 mb-3">
          <img src="/logos/cari-symbol.png" alt="CARI" className="w-10 h-10" />
          <div>
            <h3 className="font-bold text-dark">CARI St-Laurent</h3>
            <p className="text-xs text-muted">Francisation — Petite enfance</p>
          </div>
        </div>
        <p className="text-sm text-muted leading-relaxed">
          Outils numériques de francisation pour les enfants de 6 mois à 5 ans,
          développés dans le cadre du Programme de soutien à la francisation du MIFI.
        </p>
      </div>
    </div>
  );
}
