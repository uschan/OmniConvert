import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Load saved language
  useEffect(() => {
    const saved = localStorage.getItem('omni_lang') as Language;
    if (saved && ['en', 'zh', 'ja'].includes(saved)) {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('omni_lang', lang);
  };

  const t = (key: string): string => {
    const dict = TRANSLATIONS[language];
    // Special handling for dynamic unit keys not explicitly in map
    // We try to find 'u_{key}', if not found, fallback to key itself or English default
    if (!dict[key]) {
       // Check if it's a unit ID trying to resolve
       if (key.startsWith('u_')) {
         return TRANSLATIONS['en'][key] || key.replace('u_', '');
       }
       return TRANSLATIONS['en'][key] || key;
    }
    return dict[key];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
