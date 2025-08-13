import { useContext } from 'react';
import QuestionsContext from '../../providers/QuestionsContextProvider/QuestionsContext';
import type { QuestionStatus } from '../../types/question';
import './Progress.scss';

export default function Progress() {
  const { questions, progress, getQuizStats, resetProgress } = useContext(QuestionsContext);
  const stats = getQuizStats();

  const getQuestionsByStatus = (status: QuestionStatus) => {
    const questionIds = progress
      .filter(p => p.status === status)
      .map(p => p.questionId);
    
    return questions.filter(q => questionIds.includes(q.id));
  };

  const getStatusColor = (status: QuestionStatus): string => {
    switch (status) {
      case 'correct': return '#27ae60';
      case 'incorrect': return '#e74c3c';
      case 'difficult': return '#f39c12';
      default: return '#95a5a6';
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all progress? This action cannot be undone.')) {
      resetProgress();
    }
  };

  return (
    <div className="progress">
      <div className="progress__header">
        <h1>Your Progress</h1>
        <button className="progress__reset-btn" onClick={handleReset}>
          Reset Progress
        </button>
      </div>

      <div className="progress__stats">
        <div className="stats-overview">
          <div className="stat-card">
            <h3>Overall Statistics</h3>
            <div className="stat-grid">
              <div className="stat-item">
                <span className="stat-value">{stats.totalQuestions}</span>
                <span className="stat-label">Total Questions</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{stats.answeredQuestions}</span>
                <span className="stat-label">Answered</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{stats.accuracy.toFixed(1)}%</span>
                <span className="stat-label">Accuracy</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">
                  {stats.totalQuestions - stats.answeredQuestions}
                </span>
                <span className="stat-label">Remaining</span>
              </div>
            </div>
          </div>
        </div>

        <div className="progress-chart">
          <h3>Progress Breakdown</h3>
          <div className="chart-container">
            <div className="chart-bar">
              <div 
                className="chart-segment chart-segment--correct"
                style={{ 
                  width: `${(stats.correctAnswers / stats.totalQuestions) * 100}%`,
                  backgroundColor: getStatusColor('correct')
                }}
              ></div>
              <div 
                className="chart-segment chart-segment--incorrect"
                style={{ 
                  width: `${(stats.incorrectAnswers / stats.totalQuestions) * 100}%`,
                  backgroundColor: getStatusColor('incorrect')
                }}
              ></div>
              <div 
                className="chart-segment chart-segment--difficult"
                style={{ 
                  width: `${(stats.difficultQuestions / stats.totalQuestions) * 100}%`,
                  backgroundColor: getStatusColor('difficult')
                }}
              ></div>
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <span 
                  className="legend-color"
                  style={{ backgroundColor: getStatusColor('correct') }}
                ></span>
                <span>Correct ({stats.correctAnswers})</span>
              </div>
              <div className="legend-item">
                <span 
                  className="legend-color"
                  style={{ backgroundColor: getStatusColor('incorrect') }}
                ></span>
                <span>Incorrect ({stats.incorrectAnswers})</span>
              </div>
              <div className="legend-item">
                <span 
                  className="legend-color"
                  style={{ backgroundColor: getStatusColor('difficult') }}
                ></span>
                <span>Difficult ({stats.difficultQuestions})</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="progress__sections">
        {(['incorrect', 'difficult', 'correct'] as QuestionStatus[]).map(status => {
          const statusQuestions = getQuestionsByStatus(status);
          if (statusQuestions.length === 0) return null;

          return (
            <div key={status} className="progress__section">
              <h2 className="progress__section-title">
                {status === 'incorrect' && '❌ Questions to Review'}
                {status === 'difficult' && '⭐ Difficult Questions'}
                {status === 'correct' && '✅ Mastered Questions'}
                <span className="progress__section-count">({statusQuestions.length})</span>
              </h2>
              <div className="progress__questions">
                {statusQuestions.slice(0, 10).map((question, index) => (
                  <div key={question.id} className="progress__question">
                    <span className="progress__question-number">{index + 1}.</span>
                    <span className="progress__question-text">{question.question}</span>
                  </div>
                ))}
                {statusQuestions.length > 10 && (
                  <div className="progress__more">
                    And {statusQuestions.length - 10} more questions...
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {stats.answeredQuestions === 0 && (
        <div className="progress__empty">
          <h2>No Progress Yet</h2>
          <p>Start taking quizzes to see your progress here!</p>
        </div>
      )}
    </div>
  );
}