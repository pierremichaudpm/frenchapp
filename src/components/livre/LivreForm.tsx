import { useState } from 'react';
import type { BookFormData } from '../../types';
import { trackEvent } from '../../utils/analytics';
import LivrePreview from './LivrePreview';

const foods = [
  { value: 'pommes', emoji: '🍎', label: 'les pommes' },
  { value: 'bananes', emoji: '🍌', label: 'les bananes' },
  { value: 'fromage', emoji: '🧀', label: 'le fromage' },
  { value: 'pain', emoji: '🍞', label: 'le pain' },
  { value: 'soupe', emoji: '🍲', label: 'la soupe' },
  { value: 'carottes', emoji: '🥕', label: 'les carottes' },
];

const animals = [
  { value: 'chats', emoji: '🐱', label: 'les chats' },
  { value: 'chiens', emoji: '🐶', label: 'les chiens' },
  { value: 'oiseaux', emoji: '🐦', label: 'les oiseaux' },
  { value: 'lapins', emoji: '🐰', label: 'les lapins' },
  { value: 'papillons', emoji: '🦋', label: 'les papillons' },
  { value: 'poissons', emoji: '🐟', label: 'les poissons' },
];

export default function LivreForm() {
  const [formData, setFormData] = useState<BookFormData | null>(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState(3);
  const [siblings, setSiblings] = useState(0);
  const [selectedFood, setSelectedFood] = useState(foods[0]);
  const [selectedAnimal, setSelectedAnimal] = useState(animals[0]);
  const [neighborhood, setNeighborhood] = useState('Saint-Laurent');

  if (formData) {
    return <LivrePreview data={formData} onBack={() => setFormData(null)} />;
  }

  const handleSubmit = () => {
    trackEvent('story_create', { name: name || 'Mon ami' });
    setFormData({
      name: name || 'Mon ami',
      age,
      siblings,
      food: selectedFood.label,
      foodEmoji: selectedFood.emoji,
      animal: selectedAnimal.label,
      animalEmoji: selectedAnimal.emoji,
      neighborhood,
    });
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-dark mb-1 font-serif">Mon livre personnalisé</h1>
      <p className="text-muted mb-6">Crée une histoire avec le prénom de l'enfant!</p>

      <div className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-bold text-dark mb-2">Prénom de l'enfant</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Ex: Sofia, Youssef, Li..."
            className="w-full p-4 rounded-xl border-2 border-brume text-lg focus:border-primary
              focus:outline-none transition-colors bg-white"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-bold text-dark mb-2">Âge</label>
          <div className="flex gap-2">
            {[2, 3, 4, 5].map(a => (
              <button
                key={a}
                onClick={() => setAge(a)}
                className={`flex-1 py-3 rounded-xl text-lg font-bold transition-all ${
                  age === a
                    ? 'bg-primary text-white'
                    : 'bg-white border-2 border-brume text-dark hover:border-primary'
                }`}
              >
                {a} ans
              </button>
            ))}
          </div>
        </div>

        {/* Siblings */}
        <div>
          <label className="block text-sm font-bold text-dark mb-2">Nombre de frères et soeurs</label>
          <div className="flex gap-2">
            {[0, 1, 2, 3].map(s => (
              <button
                key={s}
                onClick={() => setSiblings(s)}
                className={`flex-1 py-3 rounded-xl text-lg font-bold transition-all ${
                  siblings === s
                    ? 'bg-primary text-white'
                    : 'bg-white border-2 border-brume text-dark hover:border-primary'
                }`}
              >
                {s === 3 ? '3+' : s}
              </button>
            ))}
          </div>
        </div>

        {/* Food */}
        <div>
          <label className="block text-sm font-bold text-dark mb-2">Nourriture préférée</label>
          <div className="grid grid-cols-3 gap-2">
            {foods.map(f => (
              <button
                key={f.value}
                onClick={() => setSelectedFood(f)}
                className={`p-3 rounded-xl flex flex-col items-center gap-1 transition-all ${
                  selectedFood.value === f.value
                    ? 'bg-primary text-white ring-2 ring-primary ring-offset-2'
                    : 'bg-white border-2 border-brume hover:border-primary'
                }`}
              >
                <span className="text-2xl">{f.emoji}</span>
                <span className="text-xs font-medium">{f.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Animal */}
        <div>
          <label className="block text-sm font-bold text-dark mb-2">Animal préféré</label>
          <div className="grid grid-cols-3 gap-2">
            {animals.map(a => (
              <button
                key={a.value}
                onClick={() => setSelectedAnimal(a)}
                className={`p-3 rounded-xl flex flex-col items-center gap-1 transition-all ${
                  selectedAnimal.value === a.value
                    ? 'bg-primary text-white ring-2 ring-primary ring-offset-2'
                    : 'bg-white border-2 border-brume hover:border-primary'
                }`}
              >
                <span className="text-2xl">{a.emoji}</span>
                <span className="text-xs font-medium">{a.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Neighborhood */}
        <div>
          <label className="block text-sm font-bold text-dark mb-2">Quartier</label>
          <input
            type="text"
            value={neighborhood}
            onChange={e => setNeighborhood(e.target.value)}
            className="w-full p-4 rounded-xl border-2 border-brume text-lg focus:border-primary
              focus:outline-none transition-colors bg-white"
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full py-4 bg-primary text-white rounded-xl text-lg font-bold
            active:scale-[0.98] transition-transform shadow-lg"
        >
          📖 Créer mon livre!
        </button>
      </div>
    </div>
  );
}
