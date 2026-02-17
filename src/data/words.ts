import type { WordCard } from '../types';

export const themes = [
  { id: 'maison', emoji: '🏠', label: 'La maison' },
  { id: 'emotions', emoji: '😊', label: 'Les émotions' },
  { id: 'vetements', emoji: '🧥', label: 'Les vêtements' },
  { id: 'meteo', emoji: '☀️', label: 'La météo' },
  { id: 'animaux', emoji: '🐱', label: 'Les animaux' },
  { id: 'repas', emoji: '🍎', label: 'Le repas' },
  { id: 'corps', emoji: '🖐️', label: 'Le corps' },
  { id: 'couleurs', emoji: '🎨', label: 'Les couleurs' },
];

export const wordCards: WordCard[] = [
  // MAISON
  { id: 'm1', theme: 'maison', emoji: '🛏️', word: 'lit', article: 'le', phrase: 'Je dors dans mon lit.', audioText: 'le lit. Je dors dans mon lit.', translations: { ar: 'سرير', es: 'cama', en: 'bed', zh: '床' } },
  { id: 'm2', theme: 'maison', emoji: '🪑', word: 'chaise', article: 'la', phrase: 'Je m\'assois sur la chaise.', audioText: 'la chaise. Je m\'assois sur la chaise.', translations: { ar: 'كرسي', es: 'silla', en: 'chair', zh: '椅子' } },
  { id: 'm3', theme: 'maison', emoji: '🚪', word: 'porte', article: 'la', phrase: 'J\'ouvre la porte.', audioText: 'la porte. J\'ouvre la porte.', translations: { ar: 'باب', es: 'puerta', en: 'door', zh: '门' } },
  { id: 'm4', theme: 'maison', emoji: '🪟', word: 'fenêtre', article: 'la', phrase: 'Je regarde par la fenêtre.', audioText: 'la fenêtre. Je regarde par la fenêtre.', translations: { ar: 'نافذة', es: 'ventana', en: 'window', zh: '窗户' } },
  { id: 'm5', theme: 'maison', emoji: '💡', word: 'lampe', article: 'la', phrase: 'J\'allume la lampe.', audioText: 'la lampe. J\'allume la lampe.', translations: { ar: 'مصباح', es: 'lámpara', en: 'lamp', zh: '灯' } },
  { id: 'm6', theme: 'maison', emoji: '🪜', word: 'escalier', article: 'l\'', phrase: 'Je monte l\'escalier.', audioText: 'l\'escalier. Je monte l\'escalier.', translations: { ar: 'درج', es: 'escalera', en: 'stairs', zh: '楼梯' } },
  { id: 'm7', theme: 'maison', emoji: '🧹', word: 'tapis', article: 'le', phrase: 'Le tapis est doux.', audioText: 'le tapis. Le tapis est doux.', translations: { ar: 'سجادة', es: 'alfombra', en: 'carpet', zh: '地毯' } },
  { id: 'm8', theme: 'maison', emoji: '🍽️', word: 'table', article: 'la', phrase: 'On mange à la table.', audioText: 'la table. On mange à la table.', translations: { ar: 'طاولة', es: 'mesa', en: 'table', zh: '桌子' } },

  // ÉMOTIONS
  { id: 'e1', theme: 'emotions', emoji: '😊', word: 'content', article: '', phrase: 'Je suis content!', audioText: 'content. Je suis content!', translations: { ar: 'سعيد', es: 'contento', en: 'happy', zh: '开心' } },
  { id: 'e2', theme: 'emotions', emoji: '😢', word: 'triste', article: '', phrase: 'Je suis triste.', audioText: 'triste. Je suis triste.', translations: { ar: 'حزين', es: 'triste', en: 'sad', zh: '伤心' } },
  { id: 'e3', theme: 'emotions', emoji: '😠', word: 'fâché', article: '', phrase: 'Je suis fâché.', audioText: 'fâché. Je suis fâché.', translations: { ar: 'غاضب', es: 'enojado', en: 'angry', zh: '生气' } },
  { id: 'e4', theme: 'emotions', emoji: '😴', word: 'fatigué', article: '', phrase: 'Je suis fatigué.', audioText: 'fatigué. Je suis fatigué.', translations: { ar: 'متعب', es: 'cansado', en: 'tired', zh: '累了' } },
  { id: 'e5', theme: 'emotions', emoji: '😲', word: 'surpris', article: '', phrase: 'Je suis surpris!', audioText: 'surpris. Je suis surpris!', translations: { ar: 'متفاجئ', es: 'sorprendido', en: 'surprised', zh: '惊讶' } },
  { id: 'e6', theme: 'emotions', emoji: '😳', word: 'gêné', article: '', phrase: 'Je suis gêné.', audioText: 'gêné. Je suis gêné.', translations: { ar: 'خجول', es: 'avergonzado', en: 'embarrassed', zh: '害羞' } },
  { id: 'e7', theme: 'emotions', emoji: '😤', word: 'fier', article: '', phrase: 'Je suis fier de moi!', audioText: 'fier. Je suis fier de moi!', translations: { ar: 'فخور', es: 'orgulloso', en: 'proud', zh: '骄傲' } },
  { id: 'e8', theme: 'emotions', emoji: '😨', word: 'peur', article: 'la', phrase: 'J\'ai peur!', audioText: 'la peur. J\'ai peur!', translations: { ar: 'خائف', es: 'miedo', en: 'scared', zh: '害怕' } },

  // VÊTEMENTS (Quebec French!)
  { id: 'v1', theme: 'vetements', emoji: '🧶', word: 'tuque', article: 'la', phrase: 'Je mets ma tuque.', audioText: 'la tuque. Je mets ma tuque.', translations: { ar: 'قبعة', es: 'gorro', en: 'winter hat', zh: '冬帽' } },
  { id: 'v2', theme: 'vetements', emoji: '🧥', word: 'manteau', article: 'le', phrase: 'Je mets mon manteau.', audioText: 'le manteau. Je mets mon manteau.', translations: { ar: 'معطف', es: 'abrigo', en: 'coat', zh: '外套' } },
  { id: 'v3', theme: 'vetements', emoji: '🧤', word: 'mitaines', article: 'les', phrase: 'Je mets mes mitaines.', audioText: 'les mitaines. Je mets mes mitaines.', translations: { ar: 'قفازات', es: 'guantes', en: 'mittens', zh: '手套' } },
  { id: 'v4', theme: 'vetements', emoji: '🥾', word: 'bottes', article: 'les', phrase: 'Je mets mes bottes.', audioText: 'les bottes. Je mets mes bottes.', translations: { ar: 'أحذية', es: 'botas', en: 'boots', zh: '靴子' } },
  { id: 'v5', theme: 'vetements', emoji: '👖', word: 'pantalon', article: 'le', phrase: 'Je mets mon pantalon.', audioText: 'le pantalon. Je mets mon pantalon.', translations: { ar: 'بنطال', es: 'pantalón', en: 'pants', zh: '裤子' } },
  { id: 'v6', theme: 'vetements', emoji: '🧣', word: 'chandail', article: 'le', phrase: 'Je mets mon chandail.', audioText: 'le chandail. Je mets mon chandail.', translations: { ar: 'كنزة', es: 'suéter', en: 'sweater', zh: '毛衣' } },
  { id: 'v7', theme: 'vetements', emoji: '🧦', word: 'bas', article: 'les', phrase: 'Je mets mes bas.', audioText: 'les bas. Je mets mes bas.', translations: { ar: 'جوارب', es: 'calcetines', en: 'socks', zh: '袜子' } },
  { id: 'v8', theme: 'vetements', emoji: '👟', word: 'souliers', article: 'les', phrase: 'Je mets mes souliers.', audioText: 'les souliers. Je mets mes souliers.', translations: { ar: 'أحذية', es: 'zapatos', en: 'shoes', zh: '鞋子' } },

  // MÉTÉO
  { id: 'w1', theme: 'meteo', emoji: '☀️', word: 'soleil', article: 'le', phrase: 'Il fait soleil!', audioText: 'le soleil. Il fait soleil!', translations: { ar: 'شمس', es: 'sol', en: 'sun', zh: '太阳' } },
  { id: 'w2', theme: 'meteo', emoji: '🌧️', word: 'pluie', article: 'la', phrase: 'Il pleut dehors.', audioText: 'la pluie. Il pleut dehors.', translations: { ar: 'مطر', es: 'lluvia', en: 'rain', zh: '雨' } },
  { id: 'w3', theme: 'meteo', emoji: '❄️', word: 'neige', article: 'la', phrase: 'Il neige! C\'est blanc!', audioText: 'la neige. Il neige! C\'est blanc!', translations: { ar: 'ثلج', es: 'nieve', en: 'snow', zh: '雪' } },
  { id: 'w4', theme: 'meteo', emoji: '💨', word: 'vent', article: 'le', phrase: 'Le vent souffle fort.', audioText: 'le vent. Le vent souffle fort.', translations: { ar: 'رياح', es: 'viento', en: 'wind', zh: '风' } },
  { id: 'w5', theme: 'meteo', emoji: '☁️', word: 'nuage', article: 'le', phrase: 'Il y a des nuages.', audioText: 'le nuage. Il y a des nuages.', translations: { ar: 'سحابة', es: 'nube', en: 'cloud', zh: '云' } },
  { id: 'w6', theme: 'meteo', emoji: '🥶', word: 'froid', article: '', phrase: 'Il fait froid!', audioText: 'froid. Il fait froid!', translations: { ar: 'بارد', es: 'frío', en: 'cold', zh: '冷' } },
  { id: 'w7', theme: 'meteo', emoji: '🥵', word: 'chaud', article: '', phrase: 'Il fait chaud!', audioText: 'chaud. Il fait chaud!', translations: { ar: 'حار', es: 'caliente', en: 'hot', zh: '热' } },
  { id: 'w8', theme: 'meteo', emoji: '⛈️', word: 'tempête', article: 'la', phrase: 'C\'est une grosse tempête!', audioText: 'la tempête. C\'est une grosse tempête!', translations: { ar: 'عاصفة', es: 'tormenta', en: 'storm', zh: '暴风雨' } },

  // ANIMAUX
  { id: 'a1', theme: 'animaux', emoji: '🐱', word: 'chat', article: 'le', phrase: 'Le chat fait miaou.', audioText: 'le chat. Le chat fait miaou.', translations: { ar: 'قطة', es: 'gato', en: 'cat', zh: '猫' } },
  { id: 'a2', theme: 'animaux', emoji: '🐶', word: 'chien', article: 'le', phrase: 'Le chien fait wouf.', audioText: 'le chien. Le chien fait wouf.', translations: { ar: 'كلب', es: 'perro', en: 'dog', zh: '狗' } },
  { id: 'a3', theme: 'animaux', emoji: '🐦', word: 'oiseau', article: 'l\'', phrase: 'L\'oiseau chante.', audioText: 'l\'oiseau. L\'oiseau chante.', translations: { ar: 'طائر', es: 'pájaro', en: 'bird', zh: '鸟' } },
  { id: 'a4', theme: 'animaux', emoji: '🐟', word: 'poisson', article: 'le', phrase: 'Le poisson nage.', audioText: 'le poisson. Le poisson nage.', translations: { ar: 'سمكة', es: 'pez', en: 'fish', zh: '鱼' } },
  { id: 'a5', theme: 'animaux', emoji: '🐰', word: 'lapin', article: 'le', phrase: 'Le lapin saute.', audioText: 'le lapin. Le lapin saute.', translations: { ar: 'أرنب', es: 'conejo', en: 'rabbit', zh: '兔子' } },
  { id: 'a6', theme: 'animaux', emoji: '🐿️', word: 'écureuil', article: 'l\'', phrase: 'L\'écureuil mange une noix.', audioText: 'l\'écureuil. L\'écureuil mange une noix.', translations: { ar: 'سنجاب', es: 'ardilla', en: 'squirrel', zh: '松鼠' } },
  { id: 'a7', theme: 'animaux', emoji: '🐻', word: 'ours', article: 'l\'', phrase: 'L\'ours dort en hiver.', audioText: 'l\'ours. L\'ours dort en hiver.', translations: { ar: 'دب', es: 'oso', en: 'bear', zh: '熊' } },
  { id: 'a8', theme: 'animaux', emoji: '🦋', word: 'papillon', article: 'le', phrase: 'Le papillon vole.', audioText: 'le papillon. Le papillon vole.', translations: { ar: 'فراشة', es: 'mariposa', en: 'butterfly', zh: '蝴蝶' } },

  // REPAS
  { id: 'r1', theme: 'repas', emoji: '🍎', word: 'pomme', article: 'la', phrase: 'Je mange une pomme rouge.', audioText: 'la pomme. Je mange une pomme rouge.', translations: { ar: 'تفاحة', es: 'manzana', en: 'apple', zh: '苹果' } },
  { id: 'r2', theme: 'repas', emoji: '🥛', word: 'lait', article: 'le', phrase: 'Je bois du lait.', audioText: 'le lait. Je bois du lait.', translations: { ar: 'حليب', es: 'leche', en: 'milk', zh: '牛奶' } },
  { id: 'r3', theme: 'repas', emoji: '🍞', word: 'pain', article: 'le', phrase: 'Je mange du pain.', audioText: 'le pain. Je mange du pain.', translations: { ar: 'خبز', es: 'pan', en: 'bread', zh: '面包' } },
  { id: 'r4', theme: 'repas', emoji: '🧀', word: 'fromage', article: 'le', phrase: 'J\'aime le fromage.', audioText: 'le fromage. J\'aime le fromage.', translations: { ar: 'جبن', es: 'queso', en: 'cheese', zh: '奶酪' } },
  { id: 'r5', theme: 'repas', emoji: '💧', word: 'eau', article: 'l\'', phrase: 'Je bois de l\'eau.', audioText: 'l\'eau. Je bois de l\'eau.', translations: { ar: 'ماء', es: 'agua', en: 'water', zh: '水' } },
  { id: 'r6', theme: 'repas', emoji: '🥕', word: 'carotte', article: 'la', phrase: 'La carotte est orange.', audioText: 'la carotte. La carotte est orange.', translations: { ar: 'جزرة', es: 'zanahoria', en: 'carrot', zh: '胡萝卜' } },
  { id: 'r7', theme: 'repas', emoji: '🍌', word: 'banane', article: 'la', phrase: 'La banane est jaune.', audioText: 'la banane. La banane est jaune.', translations: { ar: 'موزة', es: 'plátano', en: 'banana', zh: '香蕉' } },
  { id: 'r8', theme: 'repas', emoji: '🍲', word: 'soupe', article: 'la', phrase: 'La soupe est chaude.', audioText: 'la soupe. La soupe est chaude.', translations: { ar: 'حساء', es: 'sopa', en: 'soup', zh: '汤' } },

  // CORPS
  { id: 'c1', theme: 'corps', emoji: '✋', word: 'main', article: 'la', phrase: 'Je lève ma main.', audioText: 'la main. Je lève ma main.', translations: { ar: 'يد', es: 'mano', en: 'hand', zh: '手' } },
  { id: 'c2', theme: 'corps', emoji: '🦶', word: 'pied', article: 'le', phrase: 'Je tape du pied.', audioText: 'le pied. Je tape du pied.', translations: { ar: 'قدم', es: 'pie', en: 'foot', zh: '脚' } },
  { id: 'c3', theme: 'corps', emoji: '😀', word: 'tête', article: 'la', phrase: 'Je tourne la tête.', audioText: 'la tête. Je tourne la tête.', translations: { ar: 'رأس', es: 'cabeza', en: 'head', zh: '头' } },
  { id: 'c4', theme: 'corps', emoji: '👃', word: 'nez', article: 'le', phrase: 'Je touche mon nez.', audioText: 'le nez. Je touche mon nez.', translations: { ar: 'أنف', es: 'nariz', en: 'nose', zh: '鼻子' } },
  { id: 'c5', theme: 'corps', emoji: '👄', word: 'bouche', article: 'la', phrase: 'J\'ouvre la bouche.', audioText: 'la bouche. J\'ouvre la bouche.', translations: { ar: 'فم', es: 'boca', en: 'mouth', zh: '嘴' } },
  { id: 'c6', theme: 'corps', emoji: '👂', word: 'oreille', article: 'l\'', phrase: 'J\'écoute avec mes oreilles.', audioText: 'l\'oreille. J\'écoute avec mes oreilles.', translations: { ar: 'أذن', es: 'oreja', en: 'ear', zh: '耳朵' } },
  { id: 'c7', theme: 'corps', emoji: '👀', word: 'yeux', article: 'les', phrase: 'Je ferme les yeux.', audioText: 'les yeux. Je ferme les yeux.', translations: { ar: 'عيون', es: 'ojos', en: 'eyes', zh: '眼睛' } },
  { id: 'c8', theme: 'corps', emoji: '🫃', word: 'ventre', article: 'le', phrase: 'J\'ai mal au ventre.', audioText: 'le ventre. J\'ai mal au ventre.', translations: { ar: 'بطن', es: 'barriga', en: 'belly', zh: '肚子' } },

  // COULEURS
  { id: 'co1', theme: 'couleurs', emoji: '🔴', word: 'rouge', article: '', phrase: 'La pomme est rouge.', audioText: 'rouge. La pomme est rouge.', translations: { ar: 'أحمر', es: 'rojo', en: 'red', zh: '红色' } },
  { id: 'co2', theme: 'couleurs', emoji: '🔵', word: 'bleu', article: '', phrase: 'Le ciel est bleu.', audioText: 'bleu. Le ciel est bleu.', translations: { ar: 'أزرق', es: 'azul', en: 'blue', zh: '蓝色' } },
  { id: 'co3', theme: 'couleurs', emoji: '🟡', word: 'jaune', article: '', phrase: 'Le soleil est jaune.', audioText: 'jaune. Le soleil est jaune.', translations: { ar: 'أصفر', es: 'amarillo', en: 'yellow', zh: '黄色' } },
  { id: 'co4', theme: 'couleurs', emoji: '🟢', word: 'vert', article: '', phrase: 'L\'herbe est verte.', audioText: 'vert. L\'herbe est verte.', translations: { ar: 'أخضر', es: 'verde', en: 'green', zh: '绿色' } },
  { id: 'co5', theme: 'couleurs', emoji: '🟠', word: 'orange', article: '', phrase: 'La carotte est orange.', audioText: 'orange. La carotte est orange.', translations: { ar: 'برتقالي', es: 'naranja', en: 'orange', zh: '橙色' } },
  { id: 'co6', theme: 'couleurs', emoji: '🩷', word: 'rose', article: '', phrase: 'La fleur est rose.', audioText: 'rose. La fleur est rose.', translations: { ar: 'وردي', es: 'rosa', en: 'pink', zh: '粉色' } },
  { id: 'co7', theme: 'couleurs', emoji: '⚪', word: 'blanc', article: '', phrase: 'La neige est blanche.', audioText: 'blanc. La neige est blanche.', translations: { ar: 'أبيض', es: 'blanco', en: 'white', zh: '白色' } },
  { id: 'co8', theme: 'couleurs', emoji: '⚫', word: 'noir', article: '', phrase: 'La nuit est noire.', audioText: 'noir. La nuit est noire.', translations: { ar: 'أسود', es: 'negro', en: 'black', zh: '黑色' } },
];
