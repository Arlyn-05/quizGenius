
import { CheckCircle, XCircle } from "lucide-react";
import { QuizQuestion } from "@/types/quiz";
import { Button } from "@/components/ui/button";

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  questions: QuizQuestion[];
  answers: { correct: boolean }[];
  onRetry: () => void;
  onBackToQuizzes: () => void;
}

export const QuizResults = ({
  score,
  totalQuestions,
  questions,
  answers,
  onRetry,
  onBackToQuizzes
}: QuizResultsProps) => {
  const percentage = (score / totalQuestions) * 100;

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6">Quiz Results</h1>
      
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="mb-6">
          <div className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-4 border-8 border-studygenius-teal text-studygenius-teal">
            <span className="text-3xl font-bold">{percentage.toFixed(0)}%</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">Your Score: {score}/{totalQuestions}</h2>
          <p className="text-gray-600">
            {percentage >= 80 
              ? "Excellent work! You've mastered this topic." 
              : percentage >= 60 
                ? "Good job! Keep practicing to improve further." 
                : "Keep studying! You'll get better with practice."}
          </p>
        </div>
        
        <div className="flex flex-col gap-3">
          {questions.map((q, i) => (
            <div 
              key={i} 
              className="flex items-center gap-3 p-3 rounded-lg border"
            >
              {answers[i]?.correct ? (
                <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600 shrink-0" />
              )}
              <span className="text-sm text-gray-700 truncate">{q.question}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex gap-4 justify-center">
        <Button 
          variant="outline"
          onClick={onBackToQuizzes}
        >
          Back to Quizzes
        </Button>
        <Button 
          onClick={onRetry}
        >
          Retry Quiz
        </Button>
      </div>
    </div>
  );
};
