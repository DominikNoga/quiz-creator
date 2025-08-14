import { useContext, useState } from 'react';
import QuizContext from '../../providers/QuizContextProvider/QuizContext';
import { useNavigate } from 'react-router-dom';
import QuestionsContext from '../../providers/QuestionsContextProvider/QuestionsContext';
import type { QuizMode } from '../../types/question';
import './Home.scss';
import QuizModes from './components/QuizModes/QuizModes';
import HomeStats from './components/HomeStats/HomeStats';
import HomeHero from './components/HomeHero/HomeHero';
import { QUIZ_MODES } from '../../constants/quiz.const';

export default function Home() {
  const { questions, getQuizStats } = useContext(QuestionsContext);
  const quizCtx = useContext(QuizContext);
  const [questionCount, setQuestionCount] = useState<number>(10);
  const navigate = useNavigate();
  const stats = getQuizStats();

  const handleStartQuiz = () => {
    if (!quizCtx) return;
    const params = new URLSearchParams({
      mode: quizCtx.quizMode,
      ...(quizCtx.quizMode === QUIZ_MODES.RANDOM && { count: questionCount.toString() })
    });
    navigate(`/quiz?${params.toString()}`);
    quizCtx.setQuizQuestions();
  };

  const getModeDescription = (mode: QuizMode): string => {
    switch (mode) {
      case QUIZ_MODES.ALL:
        return `Practice all ${questions.length} questions in order`;
      case QUIZ_MODES.RANDOM:
        return `Practice a random selection of questions`;
      case QUIZ_MODES.DIFFICULT:
        return `Review ${stats.difficultQuestions} questions marked as difficult`;
      case QUIZ_MODES.INCORRECT:
        return `Review ${stats.incorrectAnswers} incorrectly answered questions`;
      default:
        return '';
    }
  };

  const isModeDisabled = (mode: QuizMode): boolean => {
    switch (mode) {
      case QUIZ_MODES.DIFFICULT:
        return stats.difficultQuestions === 0;
      case QUIZ_MODES.INCORRECT:
        return stats.incorrectAnswers === 0;
      default:
        return false;
    }
  };

  return (
    <div className="home">
      <HomeHero questionCount={questions.length} />
      <HomeStats stats={stats} />
      <div className="home__quiz-setup">
        <h2>Choose Your Learning Path</h2>
        <QuizModes
          questionsLength={questions.length}
          getModeDescription={getModeDescription}
          isModeDisabled={isModeDisabled}
        />
        <button
          className="home__start-button"
          onClick={handleStartQuiz}
          disabled={questions.length === 0}
        >
          {questions.length === 0 ? 'Loading Questions...' : 'Start Quiz'}
        </button>
      </div>
    </div>
  );
}