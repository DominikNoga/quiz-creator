import { createContext } from 'react';
import type { QuizMode, Question } from '../../types/question';
import type { Score } from '../../types/quiz';

export type QuizContextType = {
  quizMode: QuizMode;
  quizQuestions: Question[];
  answeredQuestions: Array<number>;
  score: Score;
  count: number;
  setQuizMode: (mode: QuizMode) => void;
  setQuizQuestions: () => void;
  setAnsweredQuestions: (answered: Array<number>) => void;
  setScore: (score: Score) => void;
  setCount: (count: number) => void;
  handleNextQuestion: () => void;
  handlePreviousQuestion: () => void;
  currentQuestionIndex: number;
  lastQuizAvailable: boolean;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);
export default QuizContext;
