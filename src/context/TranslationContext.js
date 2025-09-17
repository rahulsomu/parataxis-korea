import React, { createContext, useContext, useState, useCallback } from 'react';
import translations from '../translations/translations.json';

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const hasLanguageSelected = sessionStorage.getItem('language')
  const [language, setLanguage] = useState(hasLanguageSelected ? hasLanguageSelected :'en');

  const translate = useCallback((key) => {
    try {
      // Split the key by dots to access nested objects
      const keys = key.split('.');
      let value = translations;
      
      // Traverse the translations object using the key path
      for (const k of keys) {
        if (value && value[k]) {
          value = value[k];
        } else {
          return key;
        }
      }

      // Return the translation in the current language
      if (value && value[language]) {
        return value[language];
      }

      return key;
    } catch (error) {
      return key;
    }
  }, [language]); // Memoize translate function based on language

  const changeLanguage = useCallback((newLanguage) => {
    if (newLanguage === 'en' || newLanguage === 'kr') {
      setLanguage(newLanguage);
      sessionStorage.setItem('language',newLanguage)
    }
  }, []);

  const value = {
    language,
    translate,
    changeLanguage
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}; 