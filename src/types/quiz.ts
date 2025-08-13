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
