import './App.scss'
import Quiz from './components/Quiz/Quiz';
import QuestionsContextProvider from './providers/QuestionsContextProvider/QuestionsContextProvider';

function App() {

  return (
    <>
      <QuestionsContextProvider>
        <Quiz />
      </QuestionsContextProvider>
    </>
  )
}

export default App;
