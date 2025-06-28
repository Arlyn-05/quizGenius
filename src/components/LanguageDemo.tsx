
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { TranslateText } from "@/components/TranslateText";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Globe, Languages } from "lucide-react";

export const LanguageDemo: React.FC = () => {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const [showDemo, setShowDemo] = useState(false);
  
  const languages = [
    { code: "en", name: "English" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "ja", name: "Japanese" },
    { code: "ar", name: "Arabic" },
    { code: "hi", name: "Hindi" }
  ];
  
  const sampleText = "Learning becomes more effective when you can access materials in your preferred language.";
  
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Globe className="h-5 w-5 text-studygenius-teal" />
        <h3 className="text-lg font-medium">Try Language Translation</h3>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {languages.map((lang) => (
          <Button
            key={lang.code}
            variant={language === lang.code ? "default" : "outline"}
            size="sm"
            onClick={() => setLanguage(lang.code)}
            className="min-w-[80px]"
          >
            {lang.name}
          </Button>
        ))}
      </div>
      
      {showDemo ? (
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Languages className="h-5 w-5" />
              <span>{t("Translation Demo")}</span>
            </CardTitle>
            <CardDescription>
              {t("Examples of static and dynamic translations")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-1">{t("Static Translations")}</h4>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>{t("Dashboard")}</li>
                <li>{t("Upload Content")}</li>
                <li>{t("Flashcards")}</li>
                <li>{t("Settings")}</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">{t("Dynamic Content Translation")}</h4>
              <p className="text-sm">
                <TranslateText text={sampleText} />
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => setShowDemo(false)}>
              {t("Hide Demo")}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Button 
          variant="outline" 
          onClick={() => setShowDemo(true)}
          className="mb-6"
        >
          {t("Show Translation Examples")}
        </Button>
      )}
    </div>
  );
};
