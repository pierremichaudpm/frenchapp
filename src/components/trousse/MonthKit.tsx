import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { monthKits } from '../../data/months';
import { songs } from '../../data/songs';
import MiniStory from './MiniStory';
import ParentSheet from './ParentSheet';

type KitTab = 'comptine' | 'story' | 'parent';

const storyTitles: Record<string, string> = {
  jan: 'Petit ours découvre la neige',
  fev: 'Petite souris et ses émotions',
  mar: 'Petit lapin a faim!',
  avr: 'Petit renard dans la forêt',
  mai: 'Petit papillon et les couleurs',
  jun: 'Petit canard en vacances',
  jul: 'Petit poisson dans le lac',
  aou: 'Petit chat veut jouer!',
  sep: 'Petite tortue à la garderie',
  oct: 'Petite chouette au verger',
  nov: 'Petit hérisson et la pluie',
  dec: 'Petit renne décore le sapin',
};

export default function MonthKit() {
  const { kitId } = useParams<{ kitId: string }>();
  const kit = monthKits.find(k => k.id === kitId);
  const [tab, setTab] = useState<KitTab>('comptine');

  if (!kit || !kit.available) {
    return (
      <div className="p-4 max-w-lg mx-auto text-center">
        <p className="text-muted mt-8">Cette trousse n'est pas encore disponible.</p>
        <Link to="/trousse" className="text-primary mt-4 block">← Retour</Link>
      </div>
    );
  }

  const linkedSong = kit.comptineId ? songs.find(s => s.id === kit.comptineId) : null;

  const tabs: { id: KitTab; label: string; emoji: string }[] = [
    { id: 'comptine', label: 'Comptine', emoji: '🎵' },
    { id: 'story', label: 'Histoire', emoji: '📖' },
    { id: 'parent', label: 'Parents', emoji: '👨‍👩‍👧' },
  ];

  return (
    <div className="p-4 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <Link
          to="/trousse"
          className="w-10 h-10 rounded-full bg-white border border-brume flex items-center justify-center text-dark"
          aria-label="Retour à la trousse"
        >
          ←
        </Link>
        <span className="text-3xl" role="img" aria-hidden="true">{kit.emoji}</span>
        <div>
          <h1 className="text-xl font-bold text-dark font-serif">{kit.name}</h1>
          <p className="text-sm text-muted">{kit.theme}</p>
        </div>
      </div>

      {/* Tab bar */}
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

      {tab === 'comptine' && linkedSong && (
        <div className="text-center" role="tabpanel">
          <div className="bg-white rounded-2xl p-8 border border-brume mb-4">
            <span className="text-6xl block mb-4">{linkedSong.emoji}</span>
            <h2 className="text-xl font-bold text-dark font-serif mb-2">{linkedSong.title}</h2>
            <p className="text-muted mb-6">La comptine du mois</p>
            <Link
              to={`/chansons/${kit.comptineId}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full
                font-medium active:scale-95 transition-transform"
            >
              🎵 Écouter la comptine
            </Link>
          </div>
        </div>
      )}

      {tab === 'story' && kit.story && (
        <div role="tabpanel">
          <MiniStory pages={kit.story} title={storyTitles[kit.id] || kit.theme} />
        </div>
      )}
      {tab === 'parent' && kit.parentSheet && (
        <div role="tabpanel">
          <ParentSheet data={kit.parentSheet} />
        </div>
      )}
    </div>
  );
}
