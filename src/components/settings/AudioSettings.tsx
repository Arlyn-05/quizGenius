
import { Volume2, VolumeX } from "lucide-react";

interface AudioSettingsProps {
  voice: string;
  volume: number;
  speechRate: number;
  onVoiceChange: (voice: string) => void;
  onVolumeChange: (volume: number) => void;
  onSpeechRateChange: (rate: number) => void;
  onSave: () => void;
  voiceOptions: Array<{ value: string; label: string; }>;
}

export function AudioSettings({ 
  voice, 
  volume, 
  speechRate, 
  onVoiceChange, 
  onVolumeChange, 
  onSpeechRateChange, 
  onSave,
  voiceOptions 
}: AudioSettingsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <Volume2 className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        <h2 className="text-lg font-semibold dark:text-white">Audio Settings</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Text-to-Speech Voice
          </label>
          <select 
            value={voice}
            onChange={(e) => onVoiceChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {voiceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Volume ({volume}%)
          </label>
          <div className="flex items-center gap-3">
            <VolumeX className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={volume}
              onChange={(e) => onVolumeChange(parseInt(e.target.value))}
              className="w-full"
            />
            <Volume2 className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Speech Rate ({speechRate.toFixed(1)}x)
          </label>
          <input 
            type="range" 
            min="0.5" 
            max="2" 
            step="0.1"
            value={speechRate}
            onChange={(e) => onSpeechRateChange(parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Slower</span>
            <span>Normal</span>
            <span>Faster</span>
          </div>
        </div>
        
        <div className="pt-4 flex justify-end">
          <button 
            onClick={onSave}
            className="px-4 py-2 bg-studygenius-primary text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Save Audio Settings
          </button>
        </div>
      </div>
    </div>
  );
}
