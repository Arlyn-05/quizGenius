
import { ReactNode, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { useLanguage } from "@/contexts/LanguageContext";
import i18n from "@/i18n";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { language } = useLanguage();
  
  // Apply theme from localStorage and set language
  useEffect(() => {
    const savedTheme = localStorage.getItem("studygenius_theme") || "dark";
    
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else if (savedTheme === "system") {
      // Check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
    
    // Set HTML lang attribute based on selected language
    document.documentElement.lang = language;
    
    // Make sure i18n is in sync with our application language
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}
