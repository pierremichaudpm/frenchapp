import { useAppContext } from '../../context/AppContext';
import type { ParentLanguage } from '../../types';

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

export default function LanguageSelector() {
  const { parentLanguage, setParentLanguage } = useAppContext();

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-dark">
        Langue des parents / Parent language
      </label>
      <div className="grid grid-cols-2 gap-2">
        {languages.map(lang => (
          <button
            key={lang.code}
            onClick={() => setParentLanguage(lang.code)}
            className={`p-3 rounded-xl text-left transition-all ${
              parentLanguage === lang.code
                ? 'bg-primary text-white ring-2 ring-primary ring-offset-2'
                : 'bg-white text-dark border border-brume hover:border-primary'
            }`}
          >
            <div className="font-medium text-sm">{lang.native}</div>
            <div className={`text-xs ${parentLanguage === lang.code ? 'text-white/80' : 'text-muted'}`}>
              {lang.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
