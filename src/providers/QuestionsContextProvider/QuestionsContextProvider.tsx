import { useEffect, useState } from "react";
import type { Question, QuestionProgress } from "../../types/question";
import type { QuizStats } from "../../types/quiz";
import QuestionsContext from "./QuestionsContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { fetchQuestions } from "./QuestionsContextProvider.utils";

type Props = {
  children: React.ReactNode;
};

export default function QuestionsContextProvider({ children }: Props) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [progress, setProgress] = useLocalStorage<QuestionProgress[]>('quiz-progress', []);
  const [storedQuestions, setStoredQuestions] = useLocalStorage<Question[]>('questions', []);

  useEffect(() => {
    const getQuestions = async () => {
      const stored = storedQuestions;
      if (stored.length > 0) {
        setQuestions(stored);
        return;
      }
      const fetchedQuestions = await fetchQuestions();
      setQuestions(fetchedQuestions);
      setStoredQuestions(fetchedQuestions);
    };
    getQuestions();
  }, []);

  const updateProgress = (questionId: string, status: 'correct' | 'incorrect' | 'difficult') => {
    const now = new Date();
    const existingIndex = progress.findIndex(p => p.questionId === questionId);

    let updatedProgress: QuestionProgress[];
    if (existingIndex >= 0) {
      updatedProgress = [...progress];
      updatedProgress[existingIndex] = {
        ...updatedProgress[existingIndex],
        status,
        attempts: updatedProgress[existingIndex].attempts + 1,
        lastAnswered: now,
      };
    } else {
      updatedProgress = [
        ...progress,
        {
          questionId,
          status,
          attempts: 1,
          lastAnswered: now,
        },
      ];
    }
    setProgress(updatedProgress);
  };

  const getQuizStats = (): QuizStats => {
    const totalQuestions = questions.length;
    const answeredQuestions = progress.length;
    const correctAnswers = progress.filter(p => p.status === 'correct').length;
    const incorrectAnswers = progress.filter(p => p.status === 'incorrect').length;
    const difficultQuestions = progress.filter(p => p.status === 'difficult').length;
    const accuracy = answeredQuestions > 0 ? (correctAnswers / answeredQuestions) * 100 : 0;

    return {
      totalQuestions,
      answeredQuestions,
      correctAnswers,
      incorrectAnswers,
      difficultQuestions,
      accuracy,
    };
  };

  const resetProgress = () => {
    setProgress([]);
  };
  return (
    <QuestionsContext.Provider value={{
      questions,
      progress,
      updateProgress,
      getQuizStats,
      resetProgress
    }}>
      {children}
    </QuestionsContext.Provider>
  )
}
