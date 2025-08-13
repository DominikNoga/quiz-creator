import type { Question, QuestionProgress, QuizMode } from '../types/question';
import { v4 as uuid } from 'uuid';

export const generateQuestionId = (): string => uuid();


export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getFilteredQuestions(
  questions: Question[],
  progress: QuestionProgress[],
  mode: QuizMode,
  count?: number
): Question[] {
  let filtered: Question[] = [];

  switch (mode) {
    case 'all':
      filtered = [...questions];
      break;
    case 'random':
      filtered = shuffleArray([...questions]);
      break;
    case 'difficult': {
      const difficultIds = progress
        .filter(p => p.status === 'difficult')
        .map(p => p.questionId);
      filtered = questions.filter(q => difficultIds.includes(q.id));
      break;
    }
    case 'incorrect': {
      const incorrectIds = progress
        .filter(p => p.status === 'incorrect')
        .map(p => p.questionId);
      filtered = questions.filter(q => incorrectIds.includes(q.id));
      const ids: { id: string; count: number }[] = [];
      questions.forEach(q => {
        if (!ids.find(i => i.id === q.id)) {
          ids.push({
            id: q.id,
            count: 1
          });
        } else {
          const item = ids.find(i => i.id === q.id);
          const index = ids.indexOf(item!);
          if (index !== -1) {
            ids[index].count += 1;
          }
        }
      });
      console.log(ids.filter(i => i.count > 1));
      break;
    }
  }

  if (count && count > 0) {
    return filtered.slice(0, count);
  }

  return filtered;
}