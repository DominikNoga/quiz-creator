import type { QUIZ_MODES } from "../constants/quiz.const";

export type Question = {
  id: string;
  question: string;
  answers: string[];
  correctAnswers: number[] | number;
};

export type QuestionStatus = 'unanswered' | 'correct' | 'incorrect' | 'difficult';

export type QuestionProgress = {
  questionId: string;
  status: QuestionStatus;
  attempts: number;
  lastAnswered?: Date;
};

export type QuizMode = typeof QUIZ_MODES[keyof typeof QUIZ_MODES];

export type QuizSettings = {
  mode: QuizMode;
  questionCount?: number;
};
