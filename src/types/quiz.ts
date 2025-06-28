
export type QuizStatus = "start" | "question" | "feedback" | "result";

export interface Quiz {
  id: number;
  title: string;
  questions: number;
  difficulty: string;
  quizQuestions?: QuizQuestion[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  hint: string;
}

export interface DescriptiveQuestion {
  id: number;
  question: string;
  correctAnswer: string;
  keywords: string[];
  explanation: string;
  hints: string[];
  difficulty?: "Easy" | "Medium" | "Hard"; // Added difficulty property
}
