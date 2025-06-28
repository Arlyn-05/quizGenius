
import { Switch } from "@/components/ui/switch";
import { SettingsIcon } from "lucide-react";

interface GeneralSettingsProps {
  notifications: boolean;
  onNotificationsChange: (value: boolean) => void;
  onSave: () => void;
}

export function GeneralSettings({ notifications, onNotificationsChange, onSave }: GeneralSettingsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <SettingsIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        <h2 className="text-lg font-semibold dark:text-white">General Settings</h2>
      </div>
      
      <div className="space-y-4">
        <p className="text-gray-700 dark:text-gray-300">Configure your general preferences here. Select a category from the sidebar to view more specific settings.</p>
        
        <div className="pt-2">
          <label className="flex items-center cursor-pointer gap-2">
            <Switch 
              checked={notifications} 
              onCheckedChange={onNotificationsChange}
            />
            <span className="ml-3 text-gray-700 dark:text-gray-300">Enable notifications</span>
          </label>
        </div>
        
        <div className="pt-4 flex justify-end">
          <button 
            onClick={onSave}
            className="px-4 py-2 bg-studygenius-primary text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Save General Settings
          </button>
        </div>
      </div>
    </div>
  );
}
