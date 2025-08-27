import { useState } from 'react';
import QuizContext from './QuizContext';
import type { QuizMode, Question } from '../../types/question';
import type { Score } from '../../types/quiz';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useContext } from 'react';
import QuestionsContext from '../QuestionsContextProvider/QuestionsContext';
import { getFilteredQuestions } from '../../utils/questionUtils';
import { INITIAL_QUESTIONS_COUNT, INITIAL_QUIZ_DATA, INITIAL_SCORE, LAST_QUIZ_DATA_KEY } from './QuizContextProvider.const';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { QUIZ_MODES } from '../../constants/quiz.const';

export default function QuizContextProvider({ children }: { children: React.ReactNode }) {
  const { questions, progress } = useContext(QuestionsContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [lastQuiz, setLastQuiz] = useLocalStorage(LAST_QUIZ_DATA_KEY, INITIAL_QUIZ_DATA);
  const [quizMode, setQuizMode] = useState<QuizMode>((searchParams.get('mode') as QuizMode) || 'all');
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [count, setCount] = useState<number>(INITIAL_QUESTIONS_COUNT);
  const [answeredQuestions, setAnsweredQuestions] = useState<Array<number>>([]);
  const [score, setScore] = useState<Score>(INITIAL_SCORE);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const setQuizQuestionsHandler = () => {
    if (quizMode === QUIZ_MODES.LAST_QUIZ) {
      loadLastQuiz();
      return;
    }
    loadNewQuiz();
  }

  const loadNewQuiz = () => {
    setScore(INITIAL_SCORE);
    setAnsweredQuestions([]);
    const filtered = getFilteredQuestions(questions, progress, quizMode, count);
    setQuizQuestions(filtered);
    setLastQuiz({
      quizMode,
      quizQuestions: filtered,
      answeredQuestions,
      score
    });
  }

  const loadLastQuiz = () => {
    if (lastQuiz) {
      setQuizMode(lastQuiz.quizMode);
      setQuizQuestions(lastQuiz.quizQuestions);
      setAnsweredQuestions(lastQuiz.answeredQuestions);
      setScore(lastQuiz.score);
      setCurrentQuestionIndex(lastQuiz.answeredQuestions.length || 0);
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex === quizQuestions.length - 1) {
      return navigate('/results', {
        state: {
          score,
          totalQuestions: quizQuestions.length,
          mode: quizMode
        }
      });
    }
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    setLastQuiz({
      quizMode,
      quizQuestions,
      answeredQuestions,
      score
    });
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

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
      handleNextQuestion,
      handlePreviousQuestion,
      currentQuestionIndex,
      lastQuizAvailable: !!lastQuiz
    }}>
      {children}
    </QuizContext.Provider>
  );
}
