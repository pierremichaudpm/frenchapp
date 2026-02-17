import type { RoutineCard } from '../types';

export const routineCards: RoutineCard[] = [
  // MATIN
  { id: 'rm1', period: 'matin', phrase: 'Je me réveille', emoji: '😴', audioText: 'Je me réveille.', order: 1 },
  { id: 'rm2', period: 'matin', phrase: 'Je me brosse les dents', emoji: '🪥', audioText: 'Je me brosse les dents.', order: 2 },
  { id: 'rm3', period: 'matin', phrase: 'Je mange mon déjeuner', emoji: '🥣', audioText: 'Je mange mon déjeuner.', order: 3 },
  { id: 'rm4', period: 'matin', phrase: 'Je m\'habille', emoji: '👕', audioText: 'Je m\'habille.', order: 4 },

  // JOUR
  { id: 'rj1', period: 'jour', phrase: 'Je mets mon manteau', emoji: '🧥', audioText: 'Je mets mon manteau.', order: 5 },
  { id: 'rj2', period: 'jour', phrase: 'Je dis au revoir', emoji: '👋', audioText: 'Je dis au revoir.', order: 6 },
  { id: 'rj3', period: 'jour', phrase: 'Je joue dehors', emoji: '🎈', audioText: 'Je joue dehors.', order: 7 },
  { id: 'rj4', period: 'jour', phrase: 'Je mange ma collation', emoji: '🍎', audioText: 'Je mange ma collation.', order: 8 },

  // SOIR
  { id: 'rs1', period: 'soir', phrase: 'Je prends mon bain', emoji: '🛁', audioText: 'Je prends mon bain.', order: 9 },
  { id: 'rs2', period: 'soir', phrase: 'Je mets mon pyjama', emoji: '👶', audioText: 'Je mets mon pyjama.', order: 10 },
  { id: 'rs3', period: 'soir', phrase: 'On lit une histoire', emoji: '📖', audioText: 'On lit une histoire.', order: 11 },
  { id: 'rs4', period: 'soir', phrase: 'Bonne nuit!', emoji: '🌙', audioText: 'Bonne nuit!', order: 12 },
];
