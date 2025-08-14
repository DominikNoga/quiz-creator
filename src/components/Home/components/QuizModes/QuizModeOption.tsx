import React, { useContext } from 'react';
import type { QuizMode } from '../../../../types/question.ts';
import './QuizModeOption.scss';
import QuizContext, { type QuizContextType } from '../../../../providers/QuizContextProvider/QuizContext';
import { QUIZ_MODES } from '../../../../constants/quiz.const.ts';

interface QuizModeOptionProps {
  mode: QuizMode;
  isDisabled: boolean;
  description: string;
  children?: React.ReactNode;
}

const QuizModeOption: React.FC<QuizModeOptionProps> = ({
  mode,
  isDisabled,
  description,
  children,
}) => {
  const { quizMode, setQuizMode } = useContext(QuizContext) as QuizContextType;
  const selectedMode = quizMode ?? QUIZ_MODES.ALL;

  return (
    <div className="quiz-mode">
      <label className={`quiz-mode__option ${selectedMode === mode ? 'quiz-mode__option--selected' : ''} ${isDisabled ? 'quiz-mode__option--disabled' : ''}`}>
        <input
          type="radio"
          name="quizMode"
          value={mode}
          checked={selectedMode === mode}
          onChange={() => setQuizMode(mode)}
          disabled={isDisabled}
        />
        <div className="quiz-mode__content">
          <h3>{mode.charAt(0).toUpperCase() + mode.slice(1)} Questions</h3>
          <p>{description}</p>
          {children}
        </div>
      </label>
    </div>
  );
};

export default QuizModeOption;
