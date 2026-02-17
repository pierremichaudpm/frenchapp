import { Link } from 'react-router-dom';
import { songs } from '../../data/songs';
import { useAppContext } from '../../context/AppContext';

export default function ChansonsHome() {
  const { mode } = useAppContext();

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-dark mb-1 font-serif">Boîte à chansons</h1>
      <p className="text-muted mb-6">Comptines et chansons avec gestes!</p>

      <div className="space-y-3" role="list">
        {songs.map(song => (
          <div key={song.id} role="listitem">
            <Link
              to={`/chansons/${song.id}`}
              aria-label={song.title}
              className={`bg-white rounded-2xl flex items-center gap-4
                shadow-sm border border-brume hover:border-secondary hover:shadow-md
                active:scale-[0.98] transition-all block ${mode === 'educatrice' ? 'p-6' : 'p-5'}`}
            >
              <span className={mode === 'bebe' || mode === 'educatrice' ? 'text-5xl' : 'text-4xl'}>{song.emoji}</span>
              <div className="flex-1">
                <h3 className={`font-bold text-dark ${mode === 'educatrice' ? 'text-xl' : 'text-lg'}`}>{song.title}</h3>
                {mode !== 'bebe' && <p className="text-sm text-muted">{song.theme}</p>}
                {mode !== 'bebe' && (
                  <div className="flex gap-1 mt-1">
                    {song.vocabularyFocus.slice(0, 3).map(v => (
                      <span key={v} className="text-xs bg-secondary/20 text-dark px-2 py-0.5 rounded-full">{v}</span>
                    ))}
                  </div>
                )}
              </div>
              <span className="text-2xl text-primary">▶</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
