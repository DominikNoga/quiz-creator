import { createContext } from 'react';
import type { Question, QuestionProgress } from '../../types/question';
import type { QuizStats } from '../../types/quiz';

export type QuestionContextProps = {
  questions: Question[];
  progress: QuestionProgress[];
  updateProgress: (questionId: string, status: 'correct' | 'incorrect' | 'difficult') => void;
  getQuizStats: () => QuizStats;
  resetProgress: () => void;
};

const QuestionsContext = createContext<QuestionContextProps>({
  questions: [],
  progress: [],
  updateProgress: () => {},
  getQuizStats: () => ({
    totalQuestions: 0,
    answeredQuestions: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    difficultQuestions: 0,
    accuracy: 0,
  }),
  resetProgress: () => {},
});

export default QuestionsContext;
