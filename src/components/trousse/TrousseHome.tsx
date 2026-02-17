import { Link } from 'react-router-dom';
import { monthKits } from '../../data/months';

export default function TrousseHome() {
  const currentMonth = new Date().getMonth() + 1;

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-dark mb-1 font-serif">Trousse mensuelle</h1>
      <p className="text-muted mb-6">Un thème par mois avec chanson, histoire et vocabulaire!</p>

      <div className="grid grid-cols-3 gap-3">
        {monthKits.map(kit => (
          <div key={kit.id}>
            {kit.available ? (
              <Link
                to={`/trousse/${kit.id}`}
                className={`bg-white rounded-2xl p-4 flex flex-col items-center gap-2
                  border-2 hover:shadow-md active:scale-95 transition-all block
                  ${kit.month === currentMonth ? 'border-primary shadow-md' : 'border-brume hover:border-secondary'}`}
              >
                <span className="text-3xl">{kit.emoji}</span>
                <span className="text-xs font-bold text-dark">{kit.name}</span>
                <span className="text-[10px] text-muted text-center leading-tight">{kit.theme}</span>
              </Link>
            ) : (
              <div className="bg-brume/30 rounded-2xl p-4 flex flex-col items-center gap-2 border-2 border-transparent opacity-50">
                <span className="text-3xl grayscale">{kit.emoji}</span>
                <span className="text-xs font-bold text-muted">{kit.name}</span>
                <span className="text-[10px] text-muted/60 text-center leading-tight">Bientôt</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
