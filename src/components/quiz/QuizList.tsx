
import { GraduationCap, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Quiz } from "@/types/quiz";
import { quizzesList } from "@/data/mockQuizData";

interface QuizListProps {
  quizzes: Quiz[];
  onStartQuiz: (id: number) => void;
  onDeleteQuiz: (id: number) => void;
}

export const QuizList = ({ quizzes, onStartQuiz, onDeleteQuiz }: QuizListProps) => {
  const handleDelete = (id: number, event: React.MouseEvent) => {
    event.stopPropagation();
    
    const isDefaultQuiz = quizzesList.some(q => q.id === id);
    if (isDefaultQuiz) {
      toast({
        title: "Cannot Delete Default Quiz",
        description: "Default quizzes cannot be deleted.",
        variant: "destructive"
      });
      return;
    }
    
    onDeleteQuiz(id);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {quizzes.map((quiz) => (
        <div 
          key={quiz.id}
          className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow relative"
          onClick={() => onStartQuiz(quiz.id)}
        >
          <div className="flex justify-between items-start mb-4">
            <GraduationCap className="h-8 w-8 text-studygenius-teal" />
            <div className="flex items-center gap-2">
              <span className={`text-sm px-2 py-1 rounded-full ${
                quiz.difficulty === "Easy" ? "bg-green-100 text-green-800" :
                quiz.difficulty === "Medium" ? "bg-yellow-100 text-yellow-800" :
                "bg-red-100 text-red-800"
              }`}>{quiz.difficulty}</span>
              
              {!quizzesList.some(q => q.id === quiz.id) && (
                <button 
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  onClick={(e) => handleDelete(quiz.id, e)}
                  aria-label="Delete quiz"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2">{quiz.title}</h3>
          <p className="text-gray-500 text-sm">{quiz.questions} questions</p>
        </div>
      ))}
    </div>
  );
};
