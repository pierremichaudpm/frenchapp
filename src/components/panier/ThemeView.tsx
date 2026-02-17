import { useParams, Link } from 'react-router-dom';
import { themes, wordCards } from '../../data/words';
import WordCard from './WordCard';

export default function ThemeView() {
  const { themeId } = useParams<{ themeId: string }>();
  const theme = themes.find(t => t.id === themeId);
  const cards = wordCards.filter(c => c.theme === themeId);

  if (!theme) return <div className="p-4">Thème introuvable.</div>;

  return (
    <div className="p-4 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/" className="w-10 h-10 rounded-full bg-white border border-brume flex items-center justify-center text-dark">
          ←
        </Link>
        <span className="text-3xl">{theme.emoji}</span>
        <h1 className="text-xl font-bold text-dark font-serif">{theme.label}</h1>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {cards.map(card => (
          <WordCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
