import type { QuizMode } from "../../../types/question"
import type { Score } from "../../../types/quiz";
import { getModeTitle } from "../utils/Quiz.utils";

type Props = {
  mode: QuizMode;
  count?: number;
  progress: number;
  currentQuestionIndex: number;
  quizQuestionsLength: number;
  score: Score;
}
export default function QuizHeader({ mode, count, progress, currentQuestionIndex, quizQuestionsLength, score }: Props) {
  return (
    <div className="quiz__header">
      <div className="quiz__info">
        <h1 className="quiz__title">{getModeTitle(mode, count)}</h1>
        <div className="quiz__progress">
          <div className="quiz__progress-bar">
            <div
              className="quiz__progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="quiz__progress-text">
            Question {currentQuestionIndex + 1} of {quizQuestionsLength}
          </span>
        </div>
      </div>
      <div className="quiz__score">
        <span>Score: {score.correct}/{score.total}</span>
      </div>
    </div>
  )
}
