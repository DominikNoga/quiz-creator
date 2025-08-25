import type { Question, QuizMode } from "./question";

export type QuizStats = {
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  difficultQuestions: number;
  accuracy: number;
};

export type Score = {
  correct: number;
  total: number;
};

export type QuizData = {
  quizMode: QuizMode;
  quizQuestions: Question[];
  answeredQuestions: Set<number>;
  score: Score;
};
