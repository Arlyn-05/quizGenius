
import { Moon, Sun, User } from "lucide-react";

interface AppearanceSettingsProps {
  theme: string;
  onThemeChange: (theme: string) => void;
  onSave: () => void;
}

export function AppearanceSettings({ theme, onThemeChange, onSave }: AppearanceSettingsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-3 mb-4">
        <Sun className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        <h2 className="text-lg font-semibold dark:text-white">Appearance</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Theme
          </label>
          <div className="flex gap-4">
            <div
              className={`flex flex-col items-center border rounded-lg p-4 cursor-pointer ${
                theme === "light" ? "border-blue-500 bg-blue-50 dark:bg-blue-900" : "border-gray-200 dark:border-gray-700"
              }`}
              onClick={() => onThemeChange("light")}
            >
              <Sun className="h-8 w-8 mb-2 text-gray-700 dark:text-gray-300" />
              <span className="dark:text-gray-300">Light</span>
            </div>
            <div
              className={`flex flex-col items-center border rounded-lg p-4 cursor-pointer ${
                theme === "dark" ? "border-blue-500 bg-blue-50 dark:bg-blue-900" : "border-gray-200 dark:border-gray-700"
              }`}
              onClick={() => onThemeChange("dark")}
            >
              <Moon className="h-8 w-8 mb-2 text-gray-700 dark:text-gray-300" />
              <span className="dark:text-gray-300">Dark</span>
            </div>
            <div
              className={`flex flex-col items-center border rounded-lg p-4 cursor-pointer ${
                theme === "system" ? "border-blue-500 bg-blue-50 dark:bg-blue-900" : "border-gray-200 dark:border-gray-700"
              }`}
              onClick={() => onThemeChange("system")}
            >
              <User className="h-8 w-8 mb-2 text-gray-700 dark:text-gray-300" />
              <span className="dark:text-gray-300">System</span>
            </div>
          </div>
        </div>
        
        <div className="pt-4 flex justify-end">
          <button 
            onClick={onSave}
            className="px-4 py-2 bg-studygenius-primary text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Save Appearance Settings
          </button>
        </div>
      </div>
    </div>
  );
}
