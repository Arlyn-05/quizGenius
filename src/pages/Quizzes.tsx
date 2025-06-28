import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { QuizStatus, Quiz, QuizQuestion } from "@/types/quiz";
import { quizzesList, mockQuestions } from "@/data/mockQuizData";
import { QuizList } from "@/components/quiz/QuizList";
import { QuizQuestion as QuizQuestionComponent } from "@/components/quiz/QuizQuestion";
import { QuizFeedback } from "@/components/quiz/QuizFeedback";
import { QuizResults } from "@/components/quiz/QuizResults";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { AuthDialog } from "@/components/auth/AuthDialog";

const Quizzes = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);
  const [quizStatus, setQuizStatus] = useState<QuizStatus>("start");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{correct: boolean}[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>(mockQuestions);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    checkAuthentication();
    loadQuizzes();
    updateQuizStats();
  }, [quizStatus]);

  const checkAuthentication = () => {
    const savedUser = localStorage.getItem('studygenius_user');
    console.log("Authentication check - Local storage:", savedUser);
    console.log("Authentication check - isAuthenticated:", isAuthenticated);
  };

  const loadQuizzes = () => {
    const savedQuizzes = JSON.parse(localStorage.getItem('studygenius_quizzes') || '[]');
    setQuizzes([...quizzesList, ...savedQuizzes]);
  };

  const updateQuizStats = () => {
    if (quizStatus === "result") {
      const currentQuizzesTaken = parseInt(localStorage.getItem('studygenius_quizzesTaken') || '0');
      localStorage.setItem('studygenius_quizzesTaken', (currentQuizzesTaken + 1).toString());
      window.dispatchEvent(new Event('studygenius_stats_updated'));
    }
  };

  const startQuiz = (id: number) => {
    const savedUser = localStorage.getItem('studygenius_user');
    if (!savedUser) {
      toast.error("Authentication Required", {
        description: "Please sign in to take quizzes"
      });
      return;
    }

    setSelectedQuiz(id);
    setQuizStatus("start");
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    
    const selectedQuizData = quizzes.find(q => q.id === id);
    if (selectedQuizData?.quizQuestions) {
      console.log(`Loading questions for quiz ${id}:`, selectedQuizData.quizQuestions);
      
      const questionsWithHints = selectedQuizData.quizQuestions.map(q => {
        if (!q.hint) {
          return {
            ...q,
            hint: `Consider the relationship between ${q.options[0]} and ${q.options[1]} in context of the question.`
          };
        }
        return q;
      });
      
      setQuizQuestions(questionsWithHints);
    } else {
      setQuizQuestions(mockQuestions);
      console.log(`No specific questions found for quiz ${id}, using default questions.`);
    }
  };

  const deleteQuiz = (id: number) => {
    const savedUser = localStorage.getItem('studygenius_user');
    if (!savedUser) {
      toast.error("Authentication Required", {
        description: "Please sign in to manage quizzes."
      });
      return;
    }

    const savedQuizzes = JSON.parse(localStorage.getItem('studygenius_quizzes') || '[]');
    const updatedQuizzes = savedQuizzes.filter(quiz => quiz.id !== id);
    localStorage.setItem('studygenius_quizzes', JSON.stringify(updatedQuizzes));
    setQuizzes([...quizzesList, ...updatedQuizzes]);
    
    toast.success("Quiz Deleted", {
      description: "The quiz has been successfully deleted."
    });
    
    window.dispatchEvent(new Event('studygenius_stats_updated'));
  };

  const checkAnswer = () => {
    if (!selectedOption) return;
    
    const isCorrect = selectedOption === quizQuestions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    setAnswers(prev => [...prev, { correct: isCorrect }]);
    setQuizStatus("feedback");
  };

  const nextQuestion = () => {
    setSelectedOption(null);
    setShowHint(false);
    
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setQuizStatus("question");
    } else {
      setQuizStatus("result");
    }
  };

  const getHint = (question: string) => {
    const currentQuestionData = quizQuestions[currentQuestion];
    return currentQuestionData?.hint || "No hint available for this question.";
  };

  const handleCreateQuiz = () => {
    const savedUser = localStorage.getItem('studygenius_user');
    if (!savedUser) {
      toast.error("Authentication Required", {
        description: "Please sign in to create quizzes."
      });
      return;
    }

    toast.info("Coming Soon", {
      description: "Quiz creation feature will be available soon!"
    });
  };

  const renderAuthStatus = () => {
    const savedUser = localStorage.getItem('studygenius_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      return (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Welcome, {parsedUser.email}</span>
          <Button variant="outline" onClick={logout}>Sign Out</Button>
        </div>
      );
    }
    
    return (
      <AuthDialog 
        trigger={<Button>Sign In / Sign Up</Button>}
        onAuthSuccess={() => {
          toast.success("Authentication Successful", {
            description: "You can now access all quiz features!"
          });
        }}
      />
    );
  };

  const renderContent = () => {
    if (!selectedQuiz) {
      return (
        <>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Quizzes</h1>
            <div className="flex items-center gap-4">
              {renderAuthStatus()}
              <Button className="flex items-center gap-2" onClick={handleCreateQuiz}>
                <Plus className="h-5 w-5" />
                <span>Create Quiz</span>
              </Button>
            </div>
          </div>

          <QuizList 
            quizzes={quizzes}
            onStartQuiz={startQuiz}
            onDeleteQuiz={deleteQuiz}
          />
        </>
      );
    }

    if (quizStatus === "start") {
      const quiz = quizzes.find(q => q.id === selectedQuiz);
      
      if (!quiz) {
        return (
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-red-500">Quiz not found. Please select another quiz.</p>
            <Button 
              className="mt-4"
              onClick={() => setSelectedQuiz(null)}
            >
              Back to Quizzes
            </Button>
          </div>
        );
      }
      
      return (
        <div className="max-w-2xl mx-auto text-center">
          <button 
            className="self-start flex items-center gap-1 text-gray-600 mb-6 hover:text-studygenius-teal"
            onClick={() => setSelectedQuiz(null)}
          >
            &larr; Back to all quizzes
          </button>
          
          <h1 className="text-3xl font-bold mb-4">{quiz.title}</h1>
          <p className="text-gray-600 mb-8">
            This quiz contains {quizQuestions.length} questions to test your knowledge
            {quiz.quizQuestions ? ' based on your uploaded content' : ''}.
          </p>
          
          <Button 
            size="lg"
            onClick={() => setQuizStatus("question")}
          >
            Start Quiz
          </Button>
        </div>
      );
    }

    if (quizStatus === "question") {
      return (
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Question {currentQuestion + 1}/{quizQuestions.length}</h1>
            <span className="text-gray-600">Score: {score}</span>
          </div>
          
          <QuizQuestionComponent
            question={quizQuestions[currentQuestion]}
            selectedOption={selectedOption}
            onOptionSelect={setSelectedOption}
            showHint={showHint}
            onShowHint={() => setShowHint(!showHint)}
            hint={getHint(quizQuestions[currentQuestion].question)}
          />
          
          <div className="flex justify-end">
            <Button
              disabled={!selectedOption}
              onClick={checkAnswer}
            >
              Check Answer
            </Button>
          </div>
        </div>
      );
    }

    if (quizStatus === "feedback") {
      return (
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Question {currentQuestion + 1}/{quizQuestions.length}</h1>
            <span className="text-gray-600">Score: {score}</span>
          </div>
          
          <QuizFeedback
            question={quizQuestions[currentQuestion]}
            selectedOption={selectedOption}
            onNext={nextQuestion}
            isLastQuestion={currentQuestion === quizQuestions.length - 1}
          />
          
          <div className="flex justify-end">
            <Button
              className="flex items-center gap-2"
              onClick={nextQuestion}
            >
              {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "See Results"}
            </Button>
          </div>
        </div>
      );
    }

    if (quizStatus === "result") {
      return (
        <QuizResults
          score={score}
          totalQuestions={quizQuestions.length}
          questions={quizQuestions}
          answers={answers}
          onRetry={() => {
            setQuizStatus("question");
            setCurrentQuestion(0);
            setScore(0);
            setAnswers([]);
          }}
          onBackToQuizzes={() => setSelectedQuiz(null)}
        />
      );
    }
  };

  return (
    <Layout>
      {renderContent()}
    </Layout>
  );
};

export default Quizzes;
