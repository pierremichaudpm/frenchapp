import { useState, useMemo } from 'react';
import { useAudio } from '../../hooks/useAudio';
import type { BookFormData } from '../../types';

interface Props {
  data: BookFormData;
  onBack: () => void;
}

interface BookPage {
  text: string;
  emoji: string;
}

// ---------- Gender heuristic ----------
function guessGender(name: string): 'f' | 'm' {
  const lower = name.trim().toLowerCase();
  // Names ending in 'a' or 'e' default to feminine (soft heuristic)
  if (lower.endsWith('a') || lower.endsWith('e')) return 'f';
  return 'm';
}

function pronouns(g: 'f' | 'm') {
  return {
    il: g === 'f' ? 'elle' : 'il',
    Il: g === 'f' ? 'Elle' : 'Il',
    son: g === 'f' ? 'sa' : 'son',
    Son: g === 'f' ? 'Sa' : 'Son',
    un: g === 'f' ? 'une' : 'un',
    le: g === 'f' ? 'la' : 'le',
    petit: g === 'f' ? 'petite' : 'petit',
    content: g === 'f' ? 'contente' : 'content',
    heureux: g === 'f' ? 'heureuse' : 'heureux',
    pret: g === 'f' ? 'prête' : 'prêt',
    fatigue: g === 'f' ? 'fatiguée' : 'fatigué',
    tout: g === 'f' ? 'toute' : 'tout',
    grand: g === 'f' ? 'grande' : 'grand',
    bon: g === 'f' ? 'bonne' : 'bon',
    ami: g === 'f' ? 'amie' : 'ami',
    fier: g === 'f' ? 'fière' : 'fier',
    courageux: g === 'f' ? 'courageuse' : 'courageux',
  };
}

// ---------- Sibling helpers ----------
function siblingsIntro(name: string, siblings: number): string {
  if (siblings === 0) return `${name} est enfant unique.`;
  if (siblings === 1) return `${name} a un frère ou une soeur.`;
  return `${name} a ${siblings} frères et soeurs.`;
}

function siblingActivity(name: string, siblings: number, p: ReturnType<typeof pronouns>, simple: boolean): string {
  if (siblings === 0) {
    return simple
      ? `${p.Il} joue avec ${p.son} ourson.`
      : `${p.Il} joue seul·e mais ${p.il} a beaucoup d'imagination!`;
  }
  if (siblings === 1) {
    return simple
      ? `${p.Il} joue avec ${p.son} frère ou sa soeur.`
      : `${name} et ${p.son} frère ou sa soeur jouent ensemble.`;
  }
  return simple
    ? `${p.Il} joue avec ses frères et soeurs.`
    : `${name} et ses ${siblings} frères et soeurs s'amusent ensemble. Quelle équipe!`;
}

// ---------- Age-aware sentence complexity ----------
const isSimple = (age: number) => age <= 3;

// ---------- Deterministic "random" picker based on name ----------
function nameHash(name: string): number {
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = (h * 31 + name.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

// ---------- Animal-specific verbs ----------
function animalVerb(animal: string, _p: ReturnType<typeof pronouns>, simple: boolean): string {
  const a = animal.toLowerCase();
  if (a.includes('chat')) return simple ? 'caresser les chats' : 'caresser les chats et les entendre ronronner';
  if (a.includes('chien')) return simple ? 'jouer avec les chiens' : 'courir avec les chiens au parc';
  if (a.includes('oiseau')) return simple ? 'écouter les oiseaux' : 'écouter les oiseaux chanter dans les arbres';
  if (a.includes('lapin')) return simple ? 'nourrir les lapins' : 'nourrir les lapins et toucher leurs douces oreilles';
  if (a.includes('papillon')) return simple ? 'regarder les papillons' : 'courir après les papillons dans le jardin';
  if (a.includes('poisson')) return simple ? 'regarder les poissons' : 'regarder les poissons nager dans l\'eau';
  return simple ? `voir ${animal}` : `observer ${animal} de près`;
}

// ---------- Food-specific scene ----------
function foodScene(food: string, foodEmoji: string, name: string, p: ReturnType<typeof pronouns>, simple: boolean): string {
  const f = food.toLowerCase();
  if (f.includes('pomme')) {
    return simple
      ? `${name} mange une pomme ${foodEmoji}. Croc croc!`
      : `${name} croque dans une pomme bien rouge ${foodEmoji}. Croc croc! C'est sucré et délicieux!`;
  }
  if (f.includes('banane')) {
    return simple
      ? `${name} mange une banane ${foodEmoji}. Miam!`
      : `${name} pèle une banane ${foodEmoji} et la partage avec ${p.son} ${p.ami}. Miam miam!`;
  }
  if (f.includes('fromage')) {
    return simple
      ? `${name} mange du fromage ${foodEmoji}. Miam!`
      : `${name} découpe un morceau de fromage ${foodEmoji}. Ça sent bon! ${p.Il} le met sur du pain.`;
  }
  if (f.includes('pain')) {
    return simple
      ? `${name} mange du pain ${foodEmoji}. Miam!`
      : `${name} sent le bon pain chaud ${foodEmoji} de la boulangerie. ${p.Il} en prend un gros morceau!`;
  }
  if (f.includes('soupe')) {
    return simple
      ? `${name} mange de la soupe ${foodEmoji}. C'est chaud!`
      : `${name} souffle sur la soupe chaude ${foodEmoji}. Fff! Fff! C'est ${p.bon} et ça réchauffe!`;
  }
  if (f.includes('carotte')) {
    return simple
      ? `${name} mange une carotte ${foodEmoji}. Croc!`
      : `${name} croque une carotte orange ${foodEmoji}. Croc croc! C'est croquant comme un lapin!`;
  }
  return simple
    ? `${name} mange ${food} ${foodEmoji}. Miam!`
    : `${name} adore ${food} ${foodEmoji}. C'est ${p.son} repas préféré!`;
}

// =====================================================
// STORY TEMPLATES
// =====================================================

type TemplateBuilder = (
  data: BookFormData,
  g: 'f' | 'm',
  p: ReturnType<typeof pronouns>,
  simple: boolean,
) => BookPage[];

// ---------- Template 1: A Day at the Park ----------
const templatePark: TemplateBuilder = (data, _g, p, simple) => {
  const { name, age, siblings, animal, animalEmoji, food, foodEmoji, neighborhood } = data;
  return [
    {
      text: simple
        ? `Voici ${name}! ${p.Il} a ${age} ans.`
        : `Voici ${name}! ${p.Il} a ${age} ans et ${p.il} habite à ${neighborhood}.`,
      emoji: '🌟',
    },
    {
      text: simple
        ? `${name} habite à ${neighborhood}. ${siblingsIntro(name, siblings)}`
        : `${siblingsIntro(name, siblings)} ${siblingActivity(name, siblings, p, simple)}`,
      emoji: '🏠',
    },
    {
      text: simple
        ? `Aujourd'hui, ${name} va au parc. Il fait beau!`
        : `Ce matin, le soleil brille. ${name} met ${p.son} manteau et ${p.il} va au parc de ${neighborhood}.`,
      emoji: '🌳',
    },
    {
      text: simple
        ? `${name} voit ${animal} ${animalEmoji}! « Oh! »`
        : `Au parc, ${name} voit ${animal} ${animalEmoji}! ${p.Il} adore ${animalVerb(animal, p, simple)}.`,
      emoji: animalEmoji,
    },
    {
      text: foodScene(food, foodEmoji, name, p, simple),
      emoji: foodEmoji,
    },
    {
      text: simple
        ? `${name} joue. ${p.Il} est ${p.content}!`
        : `${name} glisse sur le toboggan et se balance. ${p.Il} rit avec ses amis!`,
      emoji: '🎠',
    },
    {
      text: simple
        ? `${name} est ${p.fatigue}. C'est l'heure du dodo.`
        : `Le soleil se couche. ${name} est un peu ${p.fatigue} après cette belle journée.`,
      emoji: '🌅',
    },
    {
      text: simple
        ? `Bonne nuit, ${name}! À demain!`
        : `« Bonne nuit, ${name}! » dit maman. ${p.Il} s'endort, ${p.heureux}. À demain!`,
      emoji: '🌙',
    },
  ];
};

// ---------- Template 2: Market Day / Le Marché ----------
const templateMarche: TemplateBuilder = (data, _g, p, simple) => {
  const { name, age, siblings, animal, animalEmoji, food, foodEmoji, neighborhood } = data;
  return [
    {
      text: simple
        ? `C'est ${name}! ${p.Il} a ${age} ans.`
        : `Bonjour! ${name} a ${age} ans et ${p.il} habite dans le quartier ${neighborhood}.`,
      emoji: '👋',
    },
    {
      text: simple
        ? `Aujourd'hui, ${name} va au marché avec maman.`
        : `Aujourd'hui, c'est jour de marché à ${neighborhood}! ${name} tient la main de maman.`,
      emoji: '🛒',
    },
    {
      text: simple
        ? `Il y a des fruits! Il y a des légumes!`
        : `Il y a des étals partout. Des fruits, des légumes, du pain frais. Ça sent tellement bon!`,
      emoji: '🍎',
    },
    {
      text: foodScene(food, foodEmoji, name, p, simple),
      emoji: foodEmoji,
    },
    {
      text: simple
        ? `${name} voit ${animal} ${animalEmoji} près du marché!`
        : `Près du marché, ${name} aperçoit ${animal} ${animalEmoji}. « Regarde maman, ${animal}! »`,
      emoji: animalEmoji,
    },
    {
      text: simple
        ? `${siblingsIntro(name, siblings)} ${siblingActivity(name, siblings, p, simple)}`
        : siblings === 0
          ? `${name} porte le sac. ${p.Il} est ${p.fier} d'aider!`
          : `${name} et ses ${siblings > 1 ? `${siblings} frères et soeurs` : 'frère ou soeur'} portent les sacs ensemble. Quelle bonne équipe!`,
      emoji: '💪',
    },
    {
      text: simple
        ? `On rentre à la maison. C'est l'heure du goûter!`
        : `De retour à la maison, maman prépare un bon goûter. ${name} aide à ranger les courses.`,
      emoji: '🏠',
    },
    {
      text: simple
        ? `Merci, ${name}! Belle journée!`
        : `« Merci pour ton aide, ${name}! » dit maman. Quelle belle journée au marché!`,
      emoji: '❤️',
    },
  ];
};

// ---------- Template 3: Rainy Day at Home ----------
const templatePluie: TemplateBuilder = (data, _g, p, simple) => {
  const { name, age, siblings, animal, animalEmoji, food, foodEmoji, neighborhood } = data;
  return [
    {
      text: simple
        ? `Voici ${name}! ${p.Il} a ${age} ans.`
        : `${name} a ${age} ans. ${p.Il} habite à ${neighborhood} avec sa famille.`,
      emoji: '🌟',
    },
    {
      text: simple
        ? `Oh non! Il pleut aujourd'hui.`
        : `Ce matin, ${name} regarde par la fenêtre. Il pleut à ${neighborhood}! Plic, ploc, plic, ploc.`,
      emoji: '🌧️',
    },
    {
      text: simple
        ? `${name} reste à la maison. ${siblingActivity(name, siblings, p, simple)}`
        : `Pas de parc aujourd'hui. ${name} décide de jouer à la maison. ${siblingActivity(name, siblings, p, simple)}`,
      emoji: '🏠',
    },
    {
      text: simple
        ? `${name} dessine ${animal} ${animalEmoji}. C'est joli!`
        : `${name} prend ses crayons et dessine ${animal} ${animalEmoji}. « Regarde mon dessin! » C'est très joli!`,
      emoji: '🎨',
    },
    {
      text: foodScene(food, foodEmoji, name, p, simple),
      emoji: foodEmoji,
    },
    {
      text: simple
        ? `${name} fait une cabane avec des coussins!`
        : `${name} construit une grande cabane avec des coussins et des couvertures. ${p.Il} se cache dedans!`,
      emoji: '🏕️',
    },
    {
      text: simple
        ? `La pluie s'arrête. Un arc-en-ciel!`
        : `Tout à coup, la pluie s'arrête. ${name} court à la fenêtre. « Un arc-en-ciel! »`,
      emoji: '🌈',
    },
    {
      text: simple
        ? `Belle journée, ${name}! Bonne nuit!`
        : `Même sous la pluie, ${name} a passé une journée magnifique. Bonne nuit, ${p.petit} ${name}!`,
      emoji: '🌙',
    },
  ];
};

// ---------- Template 4: Visit to the Library ----------
const templateBiblio: TemplateBuilder = (data, _g, p, simple) => {
  const { name, age, siblings, animal, animalEmoji, food, foodEmoji, neighborhood } = data;
  return [
    {
      text: simple
        ? `C'est ${name}! ${p.Il} a ${age} ans.`
        : `${name} a ${age} ans et habite à ${neighborhood}. Aujourd'hui est un jour spécial!`,
      emoji: '🌟',
    },
    {
      text: simple
        ? `${name} va à la bibliothèque!`
        : `${name} met ses souliers. ${p.Il} va à la bibliothèque de ${neighborhood} avec papa.`,
      emoji: '📚',
    },
    {
      text: simple
        ? `Il y a plein de livres! ${name} regarde les images.`
        : `À la bibliothèque, il y a des étagères immenses remplies de livres. ${name} adore regarder les images.`,
      emoji: '📖',
    },
    {
      text: simple
        ? `${name} trouve un livre sur ${animal} ${animalEmoji}!`
        : `${name} trouve un livre sur ${animal} ${animalEmoji}. « Papa, regarde! Un livre sur ${animal}! » ${p.Il} est ${p.tout} ${p.content}.`,
      emoji: animalEmoji,
    },
    {
      text: simple
        ? `${siblingsIntro(name, siblings)} ${siblingActivity(name, siblings, p, simple)}`
        : siblings === 0
          ? `${name} s'assoit dans un coin douillet et lit ${p.son} livre tout·e seul·e. Quel plaisir!`
          : `${name} et ses ${siblings > 1 ? `${siblings} frères et soeurs` : 'frère ou soeur'} s'assoient ensemble pour lire. C'est un beau moment!`,
      emoji: '📖',
    },
    {
      text: foodScene(food, foodEmoji, name, p, simple),
      emoji: foodEmoji,
    },
    {
      text: simple
        ? `${name} rapporte ${p.son} livre à la maison!`
        : `${name} emprunte trois livres. ${p.Il} les range dans ${p.son} sac avec soin. « Merci! »`,
      emoji: '🎒',
    },
    {
      text: simple
        ? `Bonne nuit, ${name}! On lit encore demain?`
        : `Le soir, papa lit l'histoire de ${animal} ${animalEmoji} à ${name}. « Encore! » dit ${p.il} en souriant. Bonne nuit!`,
      emoji: '🌙',
    },
  ];
};

// Collect all templates
const TEMPLATES: TemplateBuilder[] = [templatePark, templateMarche, templatePluie, templateBiblio];

// =====================================================
// COMPONENT
// =====================================================

export default function LivrePreview({ data, onBack }: Props) {
  const { speak } = useAudio();
  const [currentPage, setCurrentPage] = useState(0);

  const pages: BookPage[] = useMemo(() => {
    const g = guessGender(data.name);
    const p = pronouns(g);
    const simple = isSimple(data.age);

    // Deterministically pick a template based on the child's name
    const templateIndex = nameHash(data.name) % TEMPLATES.length;
    const template = TEMPLATES[templateIndex];

    return template(data, g, p, simple);
  }, [data]);

  const page = pages[currentPage];

  const handleReadPage = () => {
    speak(page.text, { rate: 0.8 });
  };

  const handleReadAll = () => {
    const allText = pages.map(p => p.text).join('. ');
    speak(allText, { rate: 0.75 });
  };

  const handleDownloadPDF = async () => {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text(`L'histoire de ${data.name}`, 20, 25);
    doc.setFontSize(10);
    doc.text('CARI Francisation — Petite enfance', 20, 33);

    pages.forEach((p, i) => {
      if (i > 0) doc.addPage();
      doc.setFontSize(40);
      doc.text(p.emoji, 90, 80);
      doc.setFontSize(16);
      const lines = doc.splitTextToSize(p.text, 170);
      doc.text(lines, 20, 110);
      doc.setFontSize(10);
      doc.text(`Page ${i + 1} / ${pages.length}`, 90, 280);
    });

    doc.save(`livre-${data.name.toLowerCase()}.pdf`);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white border border-brume flex items-center justify-center text-dark"
        >
          ←
        </button>
        <h1 className="text-xl font-bold text-dark font-serif">L'histoire de {data.name}</h1>
      </div>

      {/* Book page */}
      <div className="bg-white rounded-3xl p-8 border-2 border-accent/30 shadow-lg min-h-[300px]
        flex flex-col items-center justify-center text-center">
        <span className="text-8xl mb-6">{page.emoji}</span>
        <p className="text-xl leading-relaxed text-dark font-serif">{page.text}</p>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
          disabled={currentPage === 0}
          className={`w-12 h-12 rounded-full flex items-center justify-center text-xl
            ${currentPage === 0 ? 'bg-brume text-muted' : 'bg-white border border-brume text-dark active:scale-90'}`}
        >
          ←
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleReadPage}
            className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium
              active:scale-95 transition-transform"
          >
            🔈 Lire
          </button>
          <span className="text-sm text-muted">{currentPage + 1}/{pages.length}</span>
        </div>

        <button
          onClick={() => setCurrentPage(p => Math.min(pages.length - 1, p + 1))}
          disabled={currentPage === pages.length - 1}
          className={`w-12 h-12 rounded-full flex items-center justify-center text-xl
            ${currentPage === pages.length - 1 ? 'bg-brume text-muted' : 'bg-primary text-white active:scale-90'}`}
        >
          →
        </button>
      </div>

      {/* Page dots */}
      <div className="flex justify-center gap-2 mt-4">
        {pages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === currentPage ? 'bg-primary scale-125' : 'bg-brume'
            }`}
          />
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={handleReadAll}
          className="flex-1 py-3 bg-secondary text-white rounded-xl font-medium
            active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
        >
          🔈 Lire tout
        </button>
        <button
          onClick={handleDownloadPDF}
          className="flex-1 py-3 bg-primary text-white rounded-xl font-medium
            active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
        >
          📄 PDF
        </button>
      </div>
    </div>
  );
}
