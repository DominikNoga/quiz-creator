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

export type QuizMode = 'all' | 'random' | 'difficult' | 'incorrect';

export type QuizSettings = {
  mode: QuizMode;
  questionCount?: number;
};
