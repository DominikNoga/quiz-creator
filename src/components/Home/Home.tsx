import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionsContext from '../../providers/QuestionsContextProvider/QuestionsContext';
import type { QuizMode } from '../../types/question';
import './Home.scss';

export default function Home() {
  const { questions, getQuizStats } = useContext(QuestionsContext);
  const [selectedMode, setSelectedMode] = useState<QuizMode>('all');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const navigate = useNavigate();
  const stats = getQuizStats();

  const handleStartQuiz = () => {
    const params = new URLSearchParams({
      mode: selectedMode,
      ...(selectedMode === 'random' && { count: questionCount.toString() })
    });
    navigate(`/quiz?${params.toString()}`);
  };

  const getModeDescription = (mode: QuizMode): string => {
    switch (mode) {
      case 'all':
        return `Practice all ${questions.length} questions in order`;
      case 'random':
        return `Practice a random selection of questions`;
      case 'difficult':
        return `Review ${stats.difficultQuestions} questions marked as difficult`;
      case 'incorrect':
        return `Review ${stats.incorrectAnswers} incorrectly answered questions`;
      default:
        return '';
    }
  };

  const isModeDisabled = (mode: QuizMode): boolean => {
    switch (mode) {
      case 'difficult':
        return stats.difficultQuestions === 0;
      case 'incorrect':
        return stats.incorrectAnswers === 0;
      default:
        return false;
    }
  };

  return (
    <div className="home">
      <div className="home__hero">
        <h1 className="home__title">PSD Exam Preparation</h1>
        <p className="home__description">
          Master the Professional Scrum Developer (PSD) exam with our comprehensive question bank. 
          Practice with over {questions.length} carefully curated questions to ensure you're ready for success.
        </p>
      </div>

      <div className="home__stats">
        <div className="stats-card">
          <h3>Your Progress</h3>
          <div className="stats-grid">
            <div className="stat">
              <span className="stat__value">{stats.answeredQuestions}</span>
              <span className="stat__label">Answered</span>
            </div>
            <div className="stat">
              <span className="stat__value">{stats.correctAnswers}</span>
              <span className="stat__label">Correct</span>
            </div>
            <div className="stat">
              <span className="stat__value">{stats.accuracy.toFixed(1)}%</span>
              <span className="stat__label">Accuracy</span>
            </div>
            <div className="stat">
              <span className="stat__value">{stats.difficultQuestions}</span>
              <span className="stat__label">Difficult</span>
            </div>
          </div>
        </div>
      </div>

      <div className="home__quiz-setup">
        <h2>Choose Your Learning Path</h2>
        
        <div className="quiz-modes">
          <div className="quiz-mode">
            <label className={`quiz-mode__option ${selectedMode === 'all' ? 'quiz-mode__option--selected' : ''}`}>
              <input
                type="radio"
                name="quizMode"
                value="all"
                checked={selectedMode === 'all'}
                onChange={(e) => setSelectedMode(e.target.value as QuizMode)}
              />
              <div className="quiz-mode__content">
                <h3>All Questions</h3>
                <p>{getModeDescription('all')}</p>
              </div>
            </label>
          </div>

          <div className="quiz-mode">
            <label className={`quiz-mode__option ${selectedMode === 'random' ? 'quiz-mode__option--selected' : ''}`}>
              <input
                type="radio"
                name="quizMode"
                value="random"
                checked={selectedMode === 'random'}
                onChange={(e) => setSelectedMode(e.target.value as QuizMode)}
              />
              <div className="quiz-mode__content">
                <h3>Random Questions</h3>
                <p>{getModeDescription('random')}</p>
                {selectedMode === 'random' && (
                  <div className="quiz-mode__settings">
                    <label htmlFor="questionCount">Number of questions:</label>
                    <input
                      id="questionCount"
                      type="number"
                      min="1"
                      max={questions.length}
                      value={questionCount}
                      onChange={(e) => setQuestionCount(parseInt(e.target.value) || 10)}
                    />
                  </div>
                )}
              </div>
            </label>
          </div>

          <div className="quiz-mode">
            <label className={`quiz-mode__option ${selectedMode === 'difficult' ? 'quiz-mode__option--selected' : ''} ${isModeDisabled('difficult') ? 'quiz-mode__option--disabled' : ''}`}>
              <input
                type="radio"
                name="quizMode"
                value="difficult"
                checked={selectedMode === 'difficult'}
                onChange={(e) => setSelectedMode(e.target.value as QuizMode)}
                disabled={isModeDisabled('difficult')}
              />
              <div className="quiz-mode__content">
                <h3>Difficult Questions</h3>
                <p>{getModeDescription('difficult')}</p>
                {isModeDisabled('difficult') && (
                  <small>Mark questions as difficult during practice to unlock this mode</small>
                )}
              </div>
            </label>
          </div>

          <div className="quiz-mode">
            <label className={`quiz-mode__option ${selectedMode === 'incorrect' ? 'quiz-mode__option--selected' : ''} ${isModeDisabled('incorrect') ? 'quiz-mode__option--disabled' : ''}`}>
              <input
                type="radio"
                name="quizMode"
                value="incorrect"
                checked={selectedMode === 'incorrect'}
                onChange={(e) => setSelectedMode(e.target.value as QuizMode)}
                disabled={isModeDisabled('incorrect')}
              />
              <div className="quiz-mode__content">
                <h3>Review Mistakes</h3>
                <p>{getModeDescription('incorrect')}</p>
                {isModeDisabled('incorrect') && (
                  <small>Answer some questions incorrectly to unlock this mode</small>
                )}
              </div>
            </label>
          </div>
        </div>

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