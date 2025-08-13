import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import QuestionsContext from '../../providers/QuestionsContextProvider/QuestionsContext';
import './Results.scss';

type LocationState = {
  score: { correct: number; total: number };
  totalQuestions: number;
  mode: string;
};

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { getQuizStats } = useContext(QuestionsContext);
  
  const state = location.state as LocationState;
  
  if (!state) {
    navigate('/');
    return null;
  }

  const { score, totalQuestions, mode } = state;
  const percentage = (score.correct / score.total) * 100;
  const overallStats = getQuizStats();

  const getPerformanceMessage = (): { message: string; emoji: string; color: string } => {
    if (percentage >= 90) {
      return { message: "Excellent! You're ready for the PSD exam!", emoji: "🎉", color: "#27ae60" };
    } else if (percentage >= 80) {
      return { message: "Great job! You're on the right track!", emoji: "👏", color: "#2ecc71" };
    } else if (percentage >= 70) {
      return { message: "Good work! Keep practicing to improve!", emoji: "👍", color: "#f39c12" };
    } else if (percentage >= 60) {
      return { message: "Not bad! Focus on your weak areas!", emoji: "💪", color: "#e67e22" };
    } else {
      return { message: "Keep studying! You'll get there!", emoji: "📚", color: "#e74c3c" };
    }
  };

  const performance = getPerformanceMessage();

  const getModeTitle = (): string => {
    switch (mode) {
      case 'all': return 'All Questions';
      case 'random': return 'Random Questions';
      case 'difficult': return 'Difficult Questions';
      case 'incorrect': return 'Review Mistakes';
      default: return 'Quiz';
    }
  };

  return (
    <div className="results">
      <div className="results__header">
        <div className="results__emoji">{performance.emoji}</div>
        <h1 className="results__title">Quiz Complete!</h1>
        <p className="results__subtitle">{getModeTitle()}</p>
      </div>

      <div className="results__score">
        <div className="score-circle" style={{ borderColor: performance.color }}>
          <span className="score-percentage" style={{ color: performance.color }}>
            {percentage.toFixed(0)}%
          </span>
          <span className="score-fraction">
            {score.correct}/{score.total}
          </span>
        </div>
      </div>

      <div className="results__message" style={{ color: performance.color }}>
        <h2>{performance.message}</h2>
      </div>

      <div className="results__stats">
        <div className="results__stat-grid">
          <div className="stat-card">
            <h3>This Quiz</h3>
            <div className="stat-details">
              <div className="stat-row">
                <span>Correct Answers:</span>
                <span className="stat-value stat-value--correct">{score.correct}</span>
              </div>
              <div className="stat-row">
                <span>Incorrect Answers:</span>
                <span className="stat-value stat-value--incorrect">{score.total - score.correct}</span>
              </div>
              <div className="stat-row">
                <span>Total Questions:</span>
                <span className="stat-value">{score.total}</span>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <h3>Overall Progress</h3>
            <div className="stat-details">
              <div className="stat-row">
                <span>Questions Answered:</span>
                <span className="stat-value">{overallStats.answeredQuestions}</span>
              </div>
              <div className="stat-row">
                <span>Overall Accuracy:</span>
                <span className="stat-value">{overallStats.accuracy.toFixed(1)}%</span>
              </div>
              <div className="stat-row">
                <span>Difficult Questions:</span>
                <span className="stat-value">{overallStats.difficultQuestions}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="results__actions">
        <button 
          className="results__btn results__btn--primary"
          onClick={() => navigate('/')}
        >
          Take Another Quiz
        </button>
        <button 
          className="results__btn results__btn--secondary"
          onClick={() => navigate('/progress')}
        >
          View Progress
        </button>
      </div>
    </div>
  );
}