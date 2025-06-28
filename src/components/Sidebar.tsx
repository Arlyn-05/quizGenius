
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, Upload, FileText, 
  GraduationCap, Book, Settings 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export function Sidebar() {
  const location = useLocation();
  const { t } = useTranslation();
  
  const navItems = [
    {
      title: t("Dashboard"),
      icon: LayoutDashboard,
      path: "/",
    },
    {
      title: t("Upload Content"),
      icon: Upload,
      path: "/upload",
    },
    {
      title: t("Flashcards"),
      icon: FileText,
      path: "/flashcards",
    },
    {
      title: t("Quizzes"),
      icon: GraduationCap,
      path: "/quizzes",
    },
    {
      title: t("Smart Notes"),
      icon: Book,
      path: "/smart-notes",
    },
    {
      title: t("Settings"),
      icon: Settings,
      path: "/settings",
    },
  ];
  
  return (
    <div className="w-64 min-h-screen p-4 bg-elegant-cream dark:bg-elegant-dark border-r border-elegant-tan/30">
      <div className="flex items-center mb-8 pl-2">
        <div className="text-elegant-dark dark:text-elegant-gold text-3xl font-bold flex items-center gap-2">
          <Book className="h-8 w-8" />
          <span>StudyBuddy</span>
        </div>
      </div>
      
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 px-3 py-3 rounded-md transition-colors",
              location.pathname === item.path
                ? "bg-elegant-gold text-elegant-dark dark:bg-elegant-gold dark:text-elegant-dark"
                : "text-elegant-dark dark:text-elegant-tan hover:bg-elegant-tan/30 dark:hover:bg-elegant-coffee/20"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
