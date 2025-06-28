
import { Globe } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LanguageSettingsProps {
  language: string;
  autoTranslate: boolean;
  onLanguageChange: (lang: string) => void;
  onAutoTranslateChange: (value: boolean) => void;
  onSave: () => void;
  languageOptions: Array<{ value: string; label: string; }>;
}

export function LanguageSettings({ 
  language, 
  autoTranslate, 
  onLanguageChange, 
  onAutoTranslateChange, 
  onSave,
  languageOptions 
}: LanguageSettingsProps) {
  const { t } = useTranslation();
  
  // Handle language change with console log for debugging
  const handleLanguageChange = (newLang: string) => {
    console.log(`Language selection changed to: ${newLang}`);
    onLanguageChange(newLang);
  };
  
  // Handle auto-translate change with console log for debugging
  const handleAutoTranslateChange = (value: boolean) => {
    console.log(`Auto-translate changed to: ${value}`);
    onAutoTranslateChange(value);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <Globe className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        <h2 className="text-lg font-semibold dark:text-white">{t("Language Settings")}</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t("Default App Language")}
          </label>
          <Select
            value={language}
            onValueChange={handleLanguageChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              {languageOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t("This sets the app's interface language")}</p>
        </div>
        
        <div className="pt-2">
          <label className="flex items-center cursor-pointer gap-2">
            <Switch 
              checked={autoTranslate} 
              onCheckedChange={handleAutoTranslateChange}
            />
            <span className="ml-3 text-gray-700 dark:text-gray-300">{t("Automatically translate uploaded content")}</span>
          </label>
        </div>
        
        <div className="pt-4 flex justify-end">
          <button 
            onClick={onSave}
            className="px-4 py-2 bg-studygenius-primary text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            {t("Save Language Settings")}
          </button>
        </div>
      </div>
    </div>
  );
}
