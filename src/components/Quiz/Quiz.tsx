import { useContext } from 'react';
import QuestionsContext from '../../providers/QuestionsContextProvider/QuestionsContext';
import QuizContext from '../../providers/QuizContextProvider/QuizContext';
import Question from '../Question/Question';
import './Quiz.scss';
import QuizLoading from './components/QuizLoading';
import QuizError from './components/QuizError';
import QuizHeader from './components/QuizHeader';

export default function Quiz() {
  const { updateProgress } = useContext(QuestionsContext);
  const quizCtx = useContext(QuizContext);

  if (!quizCtx) {
    return <QuizError />;
  }

  const {
    quizMode,
    quizQuestions,
    answeredQuestions,
    score,
    setAnsweredQuestions,
    setScore,
    currentQuestionIndex,
    handleNextQuestion,
    handlePreviousQuestion
  } = quizCtx;
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;
  const progressBar = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  const handleAnswer = (isCorrect: boolean) => {
    if (!currentQuestion) return;
    updateProgress(currentQuestion.id, isCorrect ? 'correct' : 'incorrect');
    setAnsweredQuestions(new Set([...answeredQuestions, currentQuestionIndex]));
    setScore({
      correct: score.correct + (isCorrect ? 1 : 0),
      total: score.total + 1
    });
  };

  const handleMarkDifficult = () => {
    if (!currentQuestion) return;
    updateProgress(currentQuestion.id, 'difficult');
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
        mode={quizMode}
        count={quizQuestions.length}
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
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>

        <button
          className="quiz__nav-btn quiz__nav-btn--primary"
          onClick={handleNextQuestion}
          disabled={!answeredQuestions.has(currentQuestionIndex)}
        >
          {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
        </button>
      </div>
    </div>
  );
}
