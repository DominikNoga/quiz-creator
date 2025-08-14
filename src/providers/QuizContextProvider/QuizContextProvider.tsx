import { useEffect, useState } from 'react';
import QuizContext from './QuizContext';
import type { QuizMode, Question } from '../../types/question';
import type { Score } from '../../types/quiz';
import { useSearchParams } from 'react-router-dom';
import { useContext } from 'react';
import QuestionsContext from '../QuestionsContextProvider/QuestionsContext';
import { getFilteredQuestions } from '../../utils/questionUtils';

export default function QuizContextProvider({ children }: { children: React.ReactNode }) {
  const { questions, progress } = useContext(QuestionsContext);
  const [searchParams] = useSearchParams();

  const [quizMode, setQuizMode] = useState<QuizMode>((searchParams.get('mode') as QuizMode) || 'all');
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [count, setCount] = useState<number>(10);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [score, setScore] = useState<Score>({ correct: 0, total: 0 });

  const setQuizQuestionsHandler = () => {
    setScore({ correct: 0, total: 0 });
    const filtered = getFilteredQuestions(questions, progress, quizMode, count);
      setQuizQuestions(filtered);
  }

  return (
    <QuizContext.Provider value={{
      quizMode,
      quizQuestions,
      answeredQuestions,
      score,
      count,
      setQuizMode,
      setQuizQuestions: setQuizQuestionsHandler,
      setAnsweredQuestions,
      setScore,
      setCount,
    }}>
      {children}
    </QuizContext.Provider>
  );
}
