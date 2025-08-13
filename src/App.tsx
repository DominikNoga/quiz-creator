import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss'
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Quiz from './components/Quiz/Quiz';
import Progress from './components/Progress/Progress';
import Results from './components/Results/Results';
import QuestionsContextProvider from './providers/QuestionsContextProvider/QuestionsContextProvider';

function App() {

  return (
    <Router>
      <QuestionsContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="progress" element={<Progress />} />
            <Route path="results" element={<Results />} />
          </Route>
        </Routes>
      </QuestionsContextProvider>
    </Router>
  )
}

export default App;
