import { createContext } from 'react';
import type { Question } from '../../types/question';

export type QuestionContextProps = {
  questions: Question[];
};

const QuestionsContext = createContext<QuestionContextProps>({
  questions: [],
});

export default QuestionsContext;
