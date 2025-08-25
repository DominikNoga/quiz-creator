import { QUIZ_MODES } from "../../constants/quiz.const";
import type { QuizData, Score } from "../../types/quiz";

export const INITIAL_SCORE: Score = { correct: 0, total: 0 };

export const INITIAL_QUESTIONS_COUNT = 10;

export const LAST_QUIZ_DATA_KEY = 'last-quiz';

export const INITIAL_QUIZ_DATA: QuizData = {
  quizMode: QUIZ_MODES.ALL,
  quizQuestions: [],
  answeredQuestions: new Set<number>(),
  score: INITIAL_SCORE,
};
