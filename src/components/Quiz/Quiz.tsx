import { useContext, useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import QuestionsContext from '../../providers/QuestionsContextProvider/QuestionsContext';
import Question from '../Question/Question';
import type { Question as QuestionType, QuizMode } from '../../types/question';
import { getFilteredQuestions } from '../../utils/questionUtils';
import './Quiz.scss';
import QuizLoading from './components/QuizLoading';
import QuizError from './components/QuizError';
import QuizHeader from './components/QuizHeader';
import type { Score } from '../../types/quiz';

export default function Quiz() {
  const { questions, updateProgress, progress } = useContext(QuestionsContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const mode = (searchParams.get('mode') as QuizMode) || 'all';
  const count = searchParams.get('count') ? parseInt(searchParams.get('count')!) : undefined;

  const [quizQuestions, setQuizQuestions] = useState<QuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [score, setScore] = useState<Score>({ correct: 0, total: 0 });

  useEffect(() => {
    if (questions.length > 0) {
      const filtered = getFilteredQuestions(questions, progress, mode, count);
      setQuizQuestions(filtered);
    }
  }, [questions, mode, count, progress]);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;
  const progressBar = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  const handleAnswer = (isCorrect: boolean) => {
    if (!currentQuestion) return;

    updateProgress(currentQuestion.id, isCorrect ? 'correct' : 'incorrect');
    setAnsweredQuestions(prev => new Set([...prev, currentQuestionIndex]));
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));
  };

  const handleMarkDifficult = () => {
    if (!currentQuestion) return;
    updateProgress(currentQuestion.id, 'difficult');
  };

  const handleNext = () => {
    if (isLastQuestion) {
      return navigate('/results', {
        state: {
          score,
          totalQuestions: quizQuestions.length,
          mode
        }
      });
    }
    setCurrentQuestionIndex(prev => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex(prev => Math.max(0, prev - 1));
  };

  if (quizQuestions.length === 0) {
    return <QuizLoading />;
  }

  if (!currentQuestion) {
    return <QuizError />;
  }

  return (
    <div className="quiz">
      <QuizHeader
        mode={mode}
        count={count}
        progress={progressBar}
        currentQuestionIndex={currentQuestionIndex}
        quizQuestionsLength={quizQuestions.length}
        score={score}
      />

      <Question
        key={currentQuestion.id}
        question={currentQuestion}
        onAnswer={handleAnswer}
        onMarkDifficult={handleMarkDifficult}
      />

      <div className="quiz__navigation">
        <button
          className="quiz__nav-btn quiz__nav-btn--secondary"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>

        <button
          className="quiz__nav-btn quiz__nav-btn--primary"
          onClick={handleNext}
          disabled={!answeredQuestions.has(currentQuestionIndex)}
        >
          {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
        </button>
      </div>
    </div>
  );
}
