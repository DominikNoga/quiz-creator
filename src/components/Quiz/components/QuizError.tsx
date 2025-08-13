import { useNavigate } from 'react-router-dom';

export default function QuizError() {
  const navigate = useNavigate();
  
  return (
    <div className="quiz quiz--error">
      <h1>No Questions Available</h1>
      <p>There are no questions available for the selected mode.</p>
      <button onClick={() => navigate('/')}>Go Back Home</button>
    </div>
  )
}
