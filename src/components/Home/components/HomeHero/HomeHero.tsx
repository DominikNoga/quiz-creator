// HomeHero.tsx
import React from 'react';
import './HomeHero.scss';

const HomeHero: React.FC<{ questionCount: number }> = ({ questionCount }) => (
  <div className="home__hero">
    <h1 className="home__title">PSD Exam Preparation</h1>
    <p className="home__description">
      Master the Professional Scrum Developer (PSD) exam with our comprehensive question bank.
      Practice with over {questionCount} carefully curated questions to ensure you're ready for success.
    </p>
  </div>
);

export default HomeHero;
