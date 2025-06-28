
import { CheckCircle, XCircle, ChevronRight, Lightbulb } from "lucide-react";
import { QuizQuestion } from "@/types/quiz";

interface QuizFeedbackProps {
  question: QuizQuestion;
  selectedOption: string | null;
  onNext: () => void;
  isLastQuestion: boolean;
}

export const QuizFeedback = ({ 
  question, 
  selectedOption, 
  onNext, 
  isLastQuestion 
}: QuizFeedbackProps) => {
  const isCorrect = selectedOption === question.correctAnswer;

  return (
    <div className="bg-white rounded-lg shadow-md p-8 mb-6">
      <div className={`flex items-center gap-3 p-4 mb-6 rounded-lg ${
        isCorrect ? "bg-green-100" : "bg-red-100"
      }`}>
        {isCorrect ? (
          <>
            <CheckCircle className="h-6 w-6 text-green-600" />
            <span className="font-medium">Correct!</span>
          </>
        ) : (
          <>
            <XCircle className="h-6 w-6 text-red-600" />
            <span className="font-medium">Incorrect. The correct answer is: {question.correctAnswer}</span>
          </>
        )}
      </div>
      
      <h2 className="text-xl mb-4">{question.question}</h2>
      
      <div className="space-y-4 mb-6">
        {question.options.map((option, index) => (
          <div 
            key={index}
            className={`p-4 border rounded-lg ${
              option === question.correctAnswer 
                ? "border-green-500 bg-green-50" 
                : option === selectedOption && option !== question.correctAnswer
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200"
            }`}
          >
            {option}
          </div>
        ))}
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
        <Lightbulb className="h-6 w-6 text-blue-600 shrink-0 mt-1" />
        <div>
          <span className="font-semibold block mb-1">Explanation:</span>
          <p>{question.explanation}</p>
        </div>
      </div>
    </div>
  );
};
