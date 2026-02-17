import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { AppMode, ParentLanguage } from '../types';

interface AppContextType {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  parentLanguage: ParentLanguage;
  setParentLanguage: (lang: ParentLanguage) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<AppMode>(() => {
    return (localStorage.getItem('cari-mode') as AppMode) || 'grand';
  });
  const [parentLanguage, setParentLanguageState] = useState<ParentLanguage>(() => {
    return (localStorage.getItem('cari-lang') as ParentLanguage) || 'en';
  });

  useEffect(() => { localStorage.setItem('cari-mode', mode); }, [mode]);
  useEffect(() => { localStorage.setItem('cari-lang', parentLanguage); }, [parentLanguage]);

  const setMode = (m: AppMode) => setModeState(m);
  const setParentLanguage = (l: ParentLanguage) => setParentLanguageState(l);

  return (
    <AppContext.Provider value={{ mode, setMode, parentLanguage, setParentLanguage }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}
