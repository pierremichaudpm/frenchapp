import { Link } from 'react-router-dom';
import { themes } from '../../data/words';
import { useAppContext } from '../../context/AppContext';

export default function PanierHome() {
  const { mode } = useAppContext();

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-dark mb-1 font-serif">Panier de mots</h1>
      {mode !== 'bebe' && <p className="text-muted mb-6">Choisis un thème pour découvrir les mots!</p>}
      {mode === 'bebe' && <div className="mb-6" />}

      <div className={`grid gap-4 ${mode === 'bebe' ? 'grid-cols-1' : 'grid-cols-2'}`} role="list">
        {themes.map(theme => (
          <div key={theme.id} role="listitem">
            <Link
              to={`/mots/${theme.id}`}
              aria-label={theme.label}
              className={`bg-white rounded-2xl flex flex-col items-center gap-3
                shadow-sm border border-brume hover:border-primary hover:shadow-md
                active:scale-95 transition-all ${mode === 'educatrice' ? 'p-8' : 'p-6'}`}
            >
              <span className={mode === 'bebe' || mode === 'educatrice' ? 'text-7xl' : 'text-5xl'}>{theme.emoji}</span>
              <span className={`font-semibold text-dark ${mode === 'educatrice' ? 'text-xl' : 'text-base'}`}>{theme.label}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
