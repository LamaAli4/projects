export interface Question {
  question: string;
  options: string[];
  correct: number;
}

export interface QuizData {
  technology: Question[];
  science: Question[];
  history: Question[];
}
