import QuestionsContext from '../../providers/QuestionsContextProvider/QuestionsContext';
import Question from '../Question/Question';
import './Quiz.scss';
import { useContext } from 'react'
import { useState } from 'react';

export default function Quiz() {
  const { questions } = useContext(QuestionsContext);
  const QUESTIONS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
  const startIdx = (currentPage - 1) * QUESTIONS_PER_PAGE;
  const endIdx = startIdx + QUESTIONS_PER_PAGE;
  const paginatedQuestions = questions.slice(startIdx, endIdx);

  function handlePrev() {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }

  function handleNext() {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }

  return (
    <div>
      <h1>Quiz</h1>
      {paginatedQuestions.map((question) => (
       <Question key={question.question} question={question} />
      ))}
      <div>
        <button onClick={handlePrev} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  )
}
