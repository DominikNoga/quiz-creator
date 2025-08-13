import { useState } from 'react';
import type { Question } from '../../types/question';
import './Question.scss';

type Props = {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
  onMarkDifficult: () => void;
  showResult?: boolean;
};

export default function Question({ question, onAnswer, onMarkDifficult, showResult = false }: Props) {
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const correctAnswers = Array.isArray(question.correctAnswers) 
    ? question.correctAnswers 
    : [question.correctAnswers];

  const isMultipleChoice = Array.isArray(question.correctAnswers);

  const handleAnswerSelect = (answerIndex: number) => {
    if (hasAnswered) return;

    if (isMultipleChoice) {
      setSelectedAnswers(prev => 
        prev.includes(answerIndex)
          ? prev.filter(i => i !== answerIndex)
          : [...prev, answerIndex]
      );
    } else {
      setSelectedAnswers([answerIndex]);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswers.length === 0) return;

    const correct = correctAnswers.length === selectedAnswers.length &&
      correctAnswers.every(answer => selectedAnswers.includes(answer));

    setIsCorrect(correct);
    setHasAnswered(true);
    onAnswer(correct);
  };

  const getAnswerClass = (answerIndex: number): string => {
    let className = 'question__answer';
    
    if (selectedAnswers.includes(answerIndex)) {
      className += ' question__answer--selected';
    }

    if (hasAnswered || showResult) {
      if (correctAnswers.includes(answerIndex)) {
        className += ' question__answer--correct';
      } else if (selectedAnswers.includes(answerIndex)) {
        className += ' question__answer--incorrect';
      }
    }

    return className;
  };

  return (
    <div className="question">
      <div className="question__header">
        <h2 className="question__text">{question.question}</h2>
        <button 
          className="question__difficult-btn"
          onClick={onMarkDifficult}
          title="Mark as difficult"
        >
          ⭐
        </button>
      </div>
      
      <div className="question__info">
        {isMultipleChoice ? (
          <p className="question__hint">Multiple answers may be correct</p>
        ) : (
          <p className="question__hint">Select one answer</p>
        )}
      </div>

      <div className="question__answers">
        {question.answers.map((answer, index) => (
          <button
            key={index}
            className={getAnswerClass(index)}
            onClick={() => handleAnswerSelect(index)}
            disabled={hasAnswered && !showResult}
          >
            <span className="question__answer-text">{answer}</span>
          </button>
        ))}
      </div>

      {!hasAnswered && !showResult && (
        <div className="question__actions">
          <button 
            className="question__submit-btn"
            onClick={handleSubmit}
            disabled={selectedAnswers.length === 0}
          >
            Submit Answer
          </button>
        </div>
      )}

      {(hasAnswered || showResult) && (
        <div className={`question__result ${isCorrect ? 'question__result--correct' : 'question__result--incorrect'}`}>
          {isCorrect ? (
            <p>✅ Correct! Well done.</p>
          ) : (
            <p>❌ Incorrect. The correct answer{correctAnswers.length > 1 ? 's are' : ' is'}: {
              correctAnswers.map(i => question.answers[i]).join(', ')
            }</p>
          )}
        </div>
      )}
    </div>
  )
}
