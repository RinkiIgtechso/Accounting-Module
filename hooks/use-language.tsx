"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { translations, Language } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.es) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es');

  // Load language from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('reno-language-storage');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.state?.language) {
          setLanguageState(parsed.state.language);
        }
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('reno-language-storage', JSON.stringify({ state: { language: lang } }));
  };

  const t = (key: keyof typeof translations.es): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
