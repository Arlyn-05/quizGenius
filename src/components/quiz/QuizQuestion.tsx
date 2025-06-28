
import { Lightbulb, AlertTriangle } from "lucide-react";
import { QuizQuestion as QuizQuestionType } from "@/types/quiz";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface QuizQuestionProps {
  question: QuizQuestionType;
  selectedOption: string | null;
  onOptionSelect: (option: string) => void;
  showHint: boolean;
  onShowHint: () => void;
  hint: string;
}

export const QuizQuestion = ({
  question,
  selectedOption,
  onOptionSelect,
  showHint,
  onShowHint,
  hint
}: QuizQuestionProps) => {
  const handleHintClick = () => {
    onShowHint();
    
    toast((
      <div className="flex items-start gap-2">
        <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
        <p>{hint || question.hint || "No hint available for this question."}</p>
      </div>
    ), {
      duration: 5000,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl">{question.question}</h2>
        <button 
          onClick={handleHintClick}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Show hint"
        >
          <Lightbulb className={`h-5 w-5 ${showHint ? 'text-yellow-600' : 'text-yellow-500'}`} />
        </button>
      </div>
      
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <div 
            key={index}
            className={`p-4 border rounded-lg cursor-pointer ${
              selectedOption === option 
                ? "border-studygenius-teal bg-teal-50" 
                : "border-gray-200 hover:bg-gray-50"
            }`}
            onClick={() => onOptionSelect(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};
