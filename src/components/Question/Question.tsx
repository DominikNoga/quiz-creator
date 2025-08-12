import type { Question } from '../../types/question';
import './Question.scss';

type Props = {
  question: Question;
};

export default function Question({ question }: Props) {
  return (
    <div>
      <h2>{question.question}</h2>
      <ul>
        {question.answers.map((answer, index) => (
          <li key={index}>{answer}</li>
        ))}
      </ul>
    </div>
  )
}
