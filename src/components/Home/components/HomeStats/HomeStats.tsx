// HomeStats.tsx
import React from 'react';
import './HomeStats.scss';
import type { QuizStats } from '../../../../types/quiz';

const HomeStats: React.FC<{ stats: QuizStats }> = ({ stats }) => (
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
);

export default HomeStats;
