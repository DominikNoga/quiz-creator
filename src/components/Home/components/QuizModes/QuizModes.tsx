import React, { useContext } from 'react';
import QuizModeOption from './QuizModeOption.tsx';
import './QuizModes.scss';
import type { QuizMode } from '../../../../types/question.ts';
import QuizContext from '../../../../providers/QuizContextProvider/QuizContext';
import { QUIZ_MODES } from '../../../../constants/quiz.const.ts';

interface QuizModesProps {
  questionsLength: number;
  getModeDescription: (mode: QuizMode) => string;
  isModeDisabled: (mode: QuizMode) => boolean;
}

const QuizModes: React.FC<QuizModesProps> = ({
  questionsLength,
  getModeDescription,
  isModeDisabled,
}) => {
  const quizCtx = useContext(QuizContext);
  const selectedMode = quizCtx?.quizMode;

  const modeKeys = Object.values(QUIZ_MODES);

  return (
    <div className="quiz-modes">
      {modeKeys.map((mode) => (
        <QuizModeOption
          key={mode}
          mode={mode}
          isDisabled={isModeDisabled(mode)}
          description={getModeDescription(mode)}
        >
          {mode === QUIZ_MODES.RANDOM && selectedMode === QUIZ_MODES.RANDOM && (
            <div className="quiz-mode__settings">
              <label htmlFor="questionCount">Number of questions:</label>
              <input
                id="questionCount"
                type="number"
                min={1}
                max={questionsLength}
                value={quizCtx?.count}
                onChange={e => quizCtx?.setCount(parseInt(e.target.value) || 10)}
              />
            </div>
          )}
          {mode === QUIZ_MODES.DIFFICULT && isModeDisabled(QUIZ_MODES.DIFFICULT) && (
            <small>Mark questions as difficult during practice to unlock this mode</small>
          )}
          {mode === QUIZ_MODES.INCORRECT && isModeDisabled(QUIZ_MODES.INCORRECT) && (
            <small>Answer some questions incorrectly to unlock this mode</small>
          )}
        </QuizModeOption>
      ))}
    </div>
  );
};

export default QuizModes;
