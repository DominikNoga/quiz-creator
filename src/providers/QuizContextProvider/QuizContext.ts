import { createContext } from 'react';
import type { QuizMode, Question } from '../../types/question';
import type { Score } from '../../types/quiz';

export type QuizContextType = {
  quizMode: QuizMode;
  quizQuestions: Question[];
  answeredQuestions: Set<number>;
  score: Score;
  count: number;
  setQuizMode: (mode: QuizMode) => void;
  setQuizQuestions: () => void;
  setAnsweredQuestions: (answered: Set<number>) => void;
  setScore: (score: Score) => void;
  setCount: (count: number) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);
export default QuizContext;
