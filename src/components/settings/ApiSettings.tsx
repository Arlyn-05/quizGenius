
import { SettingsIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

interface ApiSettingsProps {
  apiKey: string;
  onApiKeyChange: (key: string) => void;
  onSave: () => void;
}

export function ApiSettings({ apiKey, onApiKeyChange, onSave }: ApiSettingsProps) {
  const [isValidating, setIsValidating] = useState(false);

  const handleSave = async () => {
    if (apiKey.trim().length < 32) {
      toast({
        title: "Invalid API Key",
        description: "Please enter a valid ElevenLabs API key (at least 32 characters)",
        variant: "destructive"
      });
      return;
    }

    setIsValidating(true);
    
    try {
      const response = await fetch('https://api.elevenlabs.io/v1/voices', {
        headers: {
          'xi-api-key': apiKey
        }
      });
      
      if (response.ok) {
        // API key is valid - store it in localStorage
        localStorage.setItem("studygenius_elevenLabsApiKey", apiKey);
        
        // Then call the parent component's save handler
        onSave();
        
        toast({
          title: "API Key Saved",
          description: "Your ElevenLabs API key has been validated and saved successfully.",
        });
      } else {
        // API key is invalid
        toast({
          title: "Invalid API Key",
          description: "The provided API key was rejected by ElevenLabs. Please check your API key and try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Could not validate the API key. Please check your internet connection and try again.",
        variant: "destructive"
      });
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <SettingsIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        <h2 className="text-lg font-semibold dark:text-white">API Keys</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            ElevenLabs API Key
          </label>
          <input 
            type="password"
            value={apiKey}
            onChange={(e) => onApiKeyChange(e.target.value)}
            placeholder="Enter your ElevenLabs API key"
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Required for AI voice generation. Get your API key from{" "}
            <a 
              href="https://elevenlabs.io/app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              ElevenLabs
            </a>
          </p>
        </div>
        
        <div className="pt-4 flex justify-end">
          <button 
            onClick={handleSave}
            disabled={isValidating}
            className={`px-4 py-2 bg-studygenius-primary text-white rounded-md hover:bg-blue-600 transition-colors ${isValidating ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isValidating ? (
              <>
                <span className="inline-block h-4 w-4 mr-2 animate-spin rounded-full border-2 border-solid border-white border-r-transparent"></span>
                Validating...
              </>
            ) : (
              "Save API Key"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
