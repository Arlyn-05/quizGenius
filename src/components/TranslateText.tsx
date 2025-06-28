
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "react-i18next";
import translationService from "@/services/translationService";

interface TranslateTextProps {
  text: string;
  className?: string;
}

/**
 * Component that translates text based on current language settings
 */
export const TranslateText: React.FC<TranslateTextProps> = ({ text, className }) => {
  const { t } = useTranslation();
  const { language, autoTranslate } = useLanguage();
  const [translatedText, setTranslatedText] = useState(text);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    // If no text provided, use original text
    if (!text) {
      setTranslatedText(text);
      return;
    }

    const translateContent = async () => {
      setIsTranslating(true);

      try {
        // If language is English and autoTranslate is off, use original text
        if (language === "en" && !autoTranslate) {
          setTranslatedText(text);
          return;
        }

        // First check if it's a key in our i18n resources
        const translated = t(text);
        if (translated !== text) {
          setTranslatedText(translated);
          return;
        }

        // For content not in our static translations, use the translation service
        if (autoTranslate || language !== "en") {
          const result = await translationService.translateText(text, language);
          if (result) {
            setTranslatedText(result);
          } else {
            setTranslatedText(text); // Fallback to original text
          }
        } else {
          setTranslatedText(text);
        }
      } catch (error) {
        console.error("Translation error:", error);
        setTranslatedText(text); // Fallback to original text
      } finally {
        setIsTranslating(false);
      }
    };

    translateContent();
  }, [text, t, autoTranslate, language]);

  if (isTranslating) {
    return <span className={className}>{text}</span>;
  }

  return <span className={className}>{translatedText}</span>;
};
