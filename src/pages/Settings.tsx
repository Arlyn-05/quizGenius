
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Settings as SettingsIcon, User, Bell } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { GeneralSettings } from "@/components/settings/GeneralSettings";
import { AppearanceSettings } from "@/components/settings/AppearanceSettings";
import { AudioSettings } from "@/components/settings/AudioSettings";
import { LanguageSettings } from "@/components/settings/LanguageSettings";
import { ApiSettings } from "@/components/settings/ApiSettings";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "react-i18next";

const languageOptions = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "zh", label: "Chinese" },
  { value: "ja", label: "Japanese" },
  { value: "ko", label: "Korean" },
  { value: "ar", label: "Arabic" },
];

const voiceOptions = [
  { value: "female1", label: "Emma (Female)" },
  { value: "male1", label: "James (Male)" },
  { value: "female2", label: "Sophia (Female)" },
  { value: "male2", label: "William (Male)" },
];

const Settings = () => {
  // Get language context
  const { language, autoTranslate, setLanguage, setAutoTranslate } = useLanguage();
  const { t } = useTranslation();
  
  const [theme, setTheme] = useState(() => localStorage.getItem("studybuddy_theme") || "light");
  const [notifications, setNotifications] = useState(() => localStorage.getItem("studybuddy_notifications") === "true");
  const [voice, setVoice] = useState(() => localStorage.getItem("studybuddy_voice") || "female1");
  const [volume, setVolume] = useState(() => parseInt(localStorage.getItem("studybuddy_volume") || "80"));
  const [speechRate, setSpeechRate] = useState(() => parseFloat(localStorage.getItem("studybuddy_speechRate") || "1.0"));
  const [elevenLabsApiKey, setElevenLabsApiKey] = useState(() => localStorage.getItem("studygenius_elevenLabsApiKey") || "");
  
  const [activeCategory, setActiveCategory] = useState("general");

  useEffect(() => {
    document.documentElement.lang = language;

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else if (theme === 'system') {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }

    localStorage.setItem("studybuddy_theme", theme);
    localStorage.setItem("studybuddy_notifications", notifications.toString());
    localStorage.setItem("studybuddy_voice", voice);
    localStorage.setItem("studybuddy_volume", volume.toString());
    localStorage.setItem("studybuddy_speechRate", speechRate.toString());
    localStorage.setItem("studygenius_elevenLabsApiKey", elevenLabsApiKey);
  }, [language, theme, notifications, voice, volume, speechRate, elevenLabsApiKey]);

  const handleSaveSettings = () => {
    if (notifications) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          toast({
            title: "Notifications Enabled",
            description: "You will now receive study reminders and updates.",
          });
        }
      });
    }

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance("Settings saved successfully");
      utterance.volume = volume / 100;
      utterance.rate = speechRate;
      window.speechSynthesis.speak(utterance);
    }

    toast({
      title: t("Settings Saved"),
      description: t("Your preferences have been updated successfully."),
    });
  };

  const handleApiKeySave = () => {
    setElevenLabsApiKey(localStorage.getItem("studygenius_elevenLabsApiKey") || "");
    
    toast({
      title: "API Key Saved",
      description: "Your ElevenLabs API key has been saved successfully.",
    });
  };

  // Handle language changes
  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  // Handle auto-translate changes
  const handleAutoTranslateChange = (newAutoTranslate: boolean) => {
    setAutoTranslate(newAutoTranslate);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <SettingsIcon className="h-7 w-7 text-gray-700 dark:text-gray-300" />
          <h1 className="text-3xl font-bold dark:text-white">{t("Settings")}</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5">
              <h2 className="text-lg font-semibold mb-4 dark:text-white">General</h2>
              <ul className="space-y-2">
                {["general", "account", "notifications", "audio", "language", "appearance", "api"].map((category) => (
                  <li 
                    key={category}
                    className={`p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md cursor-pointer ${
                      activeCategory === category 
                        ? "text-studygenius-primary font-medium bg-blue-50 dark:bg-blue-900" 
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="col-span-2">
            {activeCategory === "general" && (
              <GeneralSettings 
                notifications={notifications}
                onNotificationsChange={setNotifications}
                onSave={handleSaveSettings}
              />
            )}
            
            {activeCategory === "appearance" && (
              <AppearanceSettings 
                theme={theme}
                onThemeChange={setTheme}
                onSave={handleSaveSettings}
              />
            )}
            
            {activeCategory === "audio" && (
              <AudioSettings 
                voice={voice}
                volume={volume}
                speechRate={speechRate}
                onVoiceChange={setVoice}
                onVolumeChange={setVolume}
                onSpeechRateChange={setSpeechRate}
                onSave={handleSaveSettings}
                voiceOptions={voiceOptions}
              />
            )}
            
            {activeCategory === "language" && (
              <LanguageSettings 
                language={language}
                autoTranslate={autoTranslate}
                onLanguageChange={handleLanguageChange}
                onAutoTranslateChange={handleAutoTranslateChange}
                onSave={handleSaveSettings}
                languageOptions={languageOptions}
              />
            )}
            
            {activeCategory === "api" && (
              <ApiSettings 
                apiKey={elevenLabsApiKey}
                onApiKeyChange={setElevenLabsApiKey}
                onSave={handleApiKeySave}
              />
            )}

            {activeCategory === "account" && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <User className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  <h2 className="text-lg font-semibold dark:text-white">Account Settings</h2>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">Manage your account preferences and profile information here.</p>
                  <div className="pt-4 flex justify-end">
                    <button onClick={handleSaveSettings} className="px-4 py-2 bg-studygenius-primary text-white rounded-md hover:bg-blue-600 transition-colors">
                      Save Account Settings
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeCategory === "notifications" && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Bell className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  <h2 className="text-lg font-semibold dark:text-white">Notification Settings</h2>
                </div>
                <div className="space-y-4">
                  <div className="pt-2">
                    <label className="flex items-center cursor-pointer gap-2">
                      <Switch checked={notifications} onCheckedChange={setNotifications} />
                      <span className="ml-3 text-gray-700 dark:text-gray-300">Enable all notifications</span>
                    </label>
                  </div>
                  <div className="pt-4 flex justify-end">
                    <button onClick={handleSaveSettings} className="px-4 py-2 bg-studygenius-primary text-white rounded-md hover:bg-blue-600 transition-colors">
                      Save Notification Settings
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
