
import React, { useState, useEffect } from 'react';
import { DescriptiveQuestion } from '@/types/quiz';
import { Lightbulb, ArrowRight, CheckCircle, AlertTriangle, Info, Clock, Award, Brain, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { TranslateText } from '@/components/TranslateText';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface DescriptiveTestProps {
  questions: DescriptiveQuestion[];
  onComplete: () => void;
  examMode?: boolean;
}

const DescriptiveTest = ({ questions, onComplete, examMode = false }: DescriptiveTestProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [hintIndex, setHintIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [keywordsFound, setKeywordsFound] = useState<string[]>([]);
  const [keywordPercentage, setKeywordPercentage] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(examMode ? 300 : 0); // 5 min per question in exam mode
  const [score, setScore] = useState(0);
  const [examCompleted, setExamCompleted] = useState(false);
  const [difficultyBonus, setDifficultyBonus] = useState(0);

  // Make sure we have valid questions before proceeding
  if (!questions || questions.length === 0) {
    return (
      <div className="bg-pastel-gray rounded-lg shadow-md p-8 mb-6">
        <div className="text-center">
          <AlertTriangle className="h-16 w-16 mx-auto text-yellow-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2"><TranslateText text="No Questions Available" /></h2>
          <p className="text-gray-600 mb-6">
            <TranslateText text="There are no descriptive questions available for this test." />
          </p>
          <Button onClick={onComplete} className="px-8">
            <TranslateText text="Back to Quiz Menu" />
          </Button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  // Timer for exam mode
  useEffect(() => {
    let timer: number;
    
    if (examMode && timeRemaining > 0 && !attempted && !completed) {
      timer = window.setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            // Force submission when time runs out
            if (!attempted) {
              toast.warning("Time's up! Your answer has been submitted.");
              checkAnswer();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [examMode, timeRemaining, attempted, completed]);

  // Format time for display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const checkAnswer = () => {
    if (!userAnswer.trim()) {
      toast.error("Please enter an answer before submitting.");
      return;
    }

    setAttempted(true);
    
    // Check if the answer contains enough keywords
    const userAnswerLower = userAnswer.toLowerCase();
    const matchedKeywords = currentQuestion.keywords.filter(keyword => 
      userAnswerLower.includes(keyword.toLowerCase())
    );
    
    setKeywordsFound(matchedKeywords);
    
    // Calculate percentage of keywords found
    const percentFound = (matchedKeywords.length / currentQuestion.keywords.length) * 100;
    setKeywordPercentage(percentFound);
    
    // If the answer contains at least 60% of the keywords, consider it correct
    const minKeywords = Math.ceil(currentQuestion.keywords.length * 0.6);
    const isAnswerCorrect = matchedKeywords.length >= minKeywords;
    
    setIsCorrect(isAnswerCorrect);
    
    // Calculate score based on percentage of keywords found and time remaining in exam mode
    if (examMode) {
      // Base score from keywords (0-100)
      const keywordScore = Math.round(percentFound);
      
      // Difficulty bonus (0-20)
      const difficultyMultiplier = 
        currentQuestion.difficulty === "Hard" ? 1.2 :
        currentQuestion.difficulty === "Medium" ? 1.1 : 1.0;
      
      // Time bonus (0-30): more time remaining = higher bonus
      const timeBonus = timeRemaining > 0 ? 
        Math.round((timeRemaining / 300) * 30) : 0;
      
      // Calculate total score
      const questionScore = Math.round((keywordScore * difficultyMultiplier) + timeBonus);
      
      // Store difficulty bonus for display
      setDifficultyBonus(Math.round((difficultyMultiplier - 1) * 100));
      
      // Add to total score
      setScore(prev => prev + questionScore);
      
      if (isAnswerCorrect) {
        toast.success(`Correct! You earned ${questionScore} points.`);
      } else {
        if (percentFound > 30) {
          toast.warning(`Partial credit! You earned ${questionScore} points.`);
        } else {
          toast.error(`Your answer needs improvement. You earned ${questionScore} points.`);
        }
      }
    } else {
      // Non-exam mode feedback
      if (isAnswerCorrect) {
        toast.success("Correct! Your answer includes key concepts.");
      } else {
        if (percentFound > 30) {
          toast.warning("Your answer contains some key concepts but needs more development.");
        } else {
          toast.error("Your answer is missing essential concepts.");
        }
        
        if (hintIndex < currentQuestion.hints.length) {
          toast((
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <p>Hint: {currentQuestion.hints[hintIndex]}</p>
            </div>
          ), {
            duration: 5000,
          });
          setHintIndex(hintIndex + 1);
        }
      }
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer('');
      setHintIndex(0);
      setIsCorrect(false);
      setAttempted(false);
      setKeywordsFound([]);
      setKeywordPercentage(0);
      
      // Reset timer for exam mode
      if (examMode) {
        setTimeRemaining(300); // 5 minutes per question
      }
      
    } else {
      setCompleted(true);
      if (examMode) {
        setExamCompleted(true);
      } else {
        onComplete();
      }
    }
  };

  const showHint = () => {
    if (examMode) {
      // In exam mode, using hints reduces potential score
      toast.warning("Using hints in exam mode will reduce your potential score!");
      // Reduce time as a penalty for using hints
      setTimeRemaining(prev => Math.max(0, prev - 30)); // 30 second penalty
    }
    
    if (hintIndex < currentQuestion.hints.length) {
      toast((
        <div className="flex items-start gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <p>{currentQuestion.hints[hintIndex]}</p>
        </div>
      ), {
        duration: 5000,
      });
      setHintIndex(hintIndex + 1);
    } else {
      toast.info("No more hints available for this question.");
    }
  };

  if (completed && examCompleted) {
    // Show exam results
    const totalPossibleScore = questions.length * 120; // Max score per question
    const percentage = Math.round((score / totalPossibleScore) * 100);
    
    return (
      <div className="bg-pastel-blue rounded-lg shadow-md p-8 mb-6">
        <div className="text-center">
          <Award className="h-16 w-16 mx-auto text-yellow-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Exam Completed!</h2>
          <div className="mb-6 py-4">
            <div className="text-5xl font-bold text-studygenius-primary">{score}</div>
            <p className="text-gray-600">points earned</p>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-1">
              <span>{percentage}% Score</span>
              <span>{score}/{totalPossibleScore} points</span>
            </div>
            <Progress value={percentage} className="h-3" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 max-w-lg mx-auto">
            <div className="bg-pastel-yellow p-4 rounded-lg">
              <Brain className="h-5 w-5 mx-auto mb-2 text-studygenius-primary" />
              <div className="text-xl font-bold">{questions.length}</div>
              <p className="text-sm text-gray-600">Questions Answered</p>
            </div>
            <div className="bg-pastel-green p-4 rounded-lg">
              <Target className="h-5 w-5 mx-auto mb-2 text-studygenius-purple" />
              <div className="text-xl font-bold">
                {percentage >= 90 ? "Expert" : 
                 percentage >= 75 ? "Advanced" :
                 percentage >= 60 ? "Competent" : "Developing"}
              </div>
              <p className="text-sm text-gray-600">Mastery Level</p>
            </div>
          </div>
          
          <Button onClick={onComplete} className="px-8">
            Back to Quiz Menu
          </Button>
        </div>
      </div>
    );
  }
  
  if (completed) {
    return (
      <div className="bg-pastel-green rounded-lg shadow-md p-8 mb-6">
        <div className="text-center">
          <CheckCircle className="h-16 w-16 mx-auto text-green-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2"><TranslateText text="Test Completed!" /></h2>
          <p className="text-gray-600 mb-6">
            <TranslateText text="You've successfully completed all the descriptive questions." />
          </p>
          <Button onClick={onComplete} className="px-8">
            <TranslateText text="Back to Quiz Menu" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-pastel-blue rounded-lg shadow-md p-8 mb-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="text-sm text-gray-500">
            <TranslateText text={`Question ${currentQuestionIndex + 1} of ${questions.length}`} />
          </span>
          <div className="flex items-center gap-2 mt-1">
            <h2 className="text-xl font-bold"><TranslateText text={currentQuestion.question} /></h2>
            {currentQuestion.difficulty && (
              <Badge variant={
                currentQuestion.difficulty === "Easy" ? "outline" : 
                currentQuestion.difficulty === "Medium" ? "secondary" : 
                "default"
              }>
                {currentQuestion.difficulty}
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {examMode && (
            <div className={`flex items-center gap-1 ${timeRemaining < 60 ? 'text-red-500' : 'text-gray-600'}`}>
              <Clock className="h-5 w-5" />
              <span className="font-mono">{formatTime(timeRemaining)}</span>
            </div>
          )}
          
          <Button variant="ghost" onClick={showHint} disabled={hintIndex >= currentQuestion.hints.length}>
            <Lightbulb className="h-5 w-5 mr-2" />
            <TranslateText text="Hint" />
          </Button>
        </div>
      </div>
      
      {examMode && (
        <div className="mb-4 text-sm">
          <div className="bg-pastel-peach rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Award className="h-5 w-5 text-studygenius-primary" />
              <span className="font-medium">Exam Mode</span>
            </div>
            <p>Your answer will be scored based on:</p>
            <ul className="list-disc ml-5 mt-1 space-y-1">
              <li>Keywords included (core concepts)</li>
              <li>Question difficulty ({currentQuestion.difficulty || "Normal"})</li>
              {currentQuestion.difficulty === "Hard" && difficultyBonus > 0 && (
                <li className="text-studygenius-primary">+{difficultyBonus}% difficulty bonus</li>
              )}
              <li>Time remaining when submitting</li>
            </ul>
          </div>
        </div>
      )}
      
      <Textarea
        placeholder="Type your answer here..."
        className="mb-4 min-h-[150px] bg-pastel-gray/50"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        disabled={isCorrect}
      />
      
      {attempted && (
        <div className={`p-4 mb-4 rounded-lg ${isCorrect ? 'bg-pastel-green' : 'bg-pastel-pink'}`}>
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
            )}
            <div className="w-full">
              <p className="font-semibold mb-1">
                {isCorrect 
                  ? <TranslateText text="Correct Answer!" />
                  : <TranslateText text="Not quite right" />}
              </p>
              
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span>{Math.round(keywordPercentage)}% match</span>
                  <span>{keywordsFound.length}/{currentQuestion.keywords.length} key concepts</span>
                </div>
                <Progress value={keywordPercentage} className="h-2" indicatorClassName={isCorrect ? "bg-green-500" : "bg-amber-500"} />
              </div>
              
              <p className="text-sm mb-3">
                {isCorrect 
                  ? <TranslateText text={currentQuestion.explanation} />
                  : <TranslateText text="Your answer is missing some key concepts. Try to include more of the following:" />}
              </p>
              
              {!isCorrect && (
                <div className="bg-white bg-opacity-50 p-3 rounded-md text-sm">
                  <div className="flex items-start gap-1">
                    <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p><TranslateText text="Missing key concepts:" /></p>
                  </div>
                  <ul className="list-disc ml-6 mt-2 space-y-1">
                    {currentQuestion.keywords
                      .filter(kw => !keywordsFound.includes(kw))
                      .slice(0, 5)
                      .map((keyword, idx) => (
                        <li key={idx} className="text-gray-700">{keyword}</li>
                      ))}
                    {currentQuestion.keywords.filter(kw => !keywordsFound.includes(kw)).length > 5 && (
                      <li className="text-gray-500 italic">
                        <TranslateText text="and others..." />
                      </li>
                    )}
                  </ul>
                </div>
              )}
              
              {examMode && (
                <div className="bg-pastel-yellow mt-3 p-3 rounded-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-studygenius-primary" />
                      <span className="font-medium">Score</span>
                    </div>
                    <span className="font-bold">{score} points</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      <div className="flex justify-end gap-3">
        {!isCorrect ? (
          <Button onClick={checkAnswer} className="bg-studygenius-primary hover:bg-studygenius-primary/90">
            <TranslateText text="Submit Answer" />
          </Button>
        ) : (
          <Button onClick={nextQuestion} className="flex items-center gap-2 bg-studygenius-teal hover:bg-studygenius-teal/90">
            {currentQuestionIndex < questions.length - 1 ? (
              <><TranslateText text="Next Question" /> <ArrowRight className="h-4 w-4" /></>
            ) : (
              <><TranslateText text="Complete Test" /></>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default DescriptiveTest;
