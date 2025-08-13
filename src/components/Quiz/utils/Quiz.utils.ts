import type { QuizMode } from "../../../types/question";

export const getModeTitle = (mode: QuizMode, count?: number): string => {
  switch (mode) {
    case 'all': return 'All Questions';
    case 'random': return `Random Questions (${count})`;
    case 'difficult': return 'Difficult Questions';
    case 'incorrect': return 'Review Mistakes';
    default: return 'Quiz';
  }
};