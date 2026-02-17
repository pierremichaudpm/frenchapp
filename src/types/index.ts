export type AppMode = 'bebe' | 'grand' | 'educatrice';
export type ParentLanguage = 'ar' | 'es' | 'zh' | 'ht' | 'pt' | 'tl' | 'hi' | 'en' | 'ro' | 'fa' | 'uk';

export interface WordCard {
  id: string;
  theme: string;
  emoji: string;
  word: string;
  article: string;
  phrase: string;
  audioText: string;
  translations: Partial<Record<ParentLanguage, string>>;
}

export interface LyricLine {
  text: string;
  gesture: string;
  gestureEmoji: string;
  durationMs: number;
}

export interface Comptine {
  id: string;
  title: string;
  theme: string;
  emoji: string;
  lyrics: LyricLine[];
  vocabularyFocus: string[];
  ageRange: 'all' | '18m+' | '3-5';
}

export interface RoutineCard {
  id: string;
  period: 'matin' | 'jour' | 'soir';
  phrase: string;
  emoji: string;
  audioText: string;
  order: number;
}

export interface MonthKit {
  id: string;
  month: number;
  name: string;
  theme: string;
  emoji: string;
  comptineId?: string;
  story?: StoryPage[];
  parentSheet?: ParentSheetData;
  available: boolean;
}

export interface StoryPage {
  text: string;
  emoji: string;
  highlightWords: string[];
}

export interface ParentSheetData {
  title: string;
  words: { french: string; emoji: string }[];
  activities: string[];
}

export interface BookFormData {
  name: string;
  age: number;
  siblings: number;
  food: string;
  foodEmoji: string;
  animal: string;
  animalEmoji: string;
  neighborhood: string;
}
