
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import i18n from "../i18n";
import translationService from "../services/translationService";

interface LanguageContextType {
  language: string;
  autoTranslate: boolean;
  setLanguage: (lang: string) => void;
  setAutoTranslate: (value: boolean) => void;
  translate: (text: string) => Promise<string>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState(() => localStorage.getItem("studybuddy_language") || "en");
  const [autoTranslate, setAutoTranslateState] = useState(() => localStorage.getItem("studybuddy_autoTranslate") === "true");
  
  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem("studybuddy_language", lang);
    i18n.changeLanguage(lang);
    console.log(`Language changed to: ${lang}`);
  };
  
  const setAutoTranslate = (value: boolean) => {
    setAutoTranslateState(value);
    localStorage.setItem("studybuddy_autoTranslate", value.toString());
    console.log(`Auto-translate set to: ${value}`);
  };
  
  // Enhanced translation function that supports async translation
  const translate = async (text: string): Promise<string> => {
    if (!text) return text;
    
    if (!autoTranslate && language === "en") return text;
    
    // First check if it's a key in our i18n resources
    const staticTranslation = i18n.exists(text, { lng: language }) 
      ? i18n.t(text, { lng: language }) 
      : null;
    
    if (staticTranslation && staticTranslation !== text) {
      return staticTranslation;
    }
    
    // Use translation service for dynamic content
    try {
      const translatedText = await translationService.translateText(text, language);
      return translatedText;
    } catch (error) {
      console.error("Translation error:", error);
      return text; // Fallback to original text
    }
  };
  
  useEffect(() => {
    // Set initial language
    i18n.changeLanguage(language);
    console.log(`Initial language set to: ${language}`);
  }, []);
  
  return (
    <LanguageContext.Provider value={{ language, autoTranslate, setLanguage, setAutoTranslate, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};
