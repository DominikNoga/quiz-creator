import { useEffect, useState } from "react";
import type { Question, QuestionProgress } from "../../types/question";
import type { QuizStats } from "../../types/quiz";
import QuestionsContext from "./QuestionsContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { generateQuestionId } from "../../utils/questionUtils";

type Props = {
  children: React.ReactNode;
};

export default function QuestionsContextProvider({ children }: Props) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [progress, setProgress] = useLocalStorage<QuestionProgress[]>('quiz-progress', []);

  useEffect(() => {
    fetch("/src/assets/psd_questions.json")
      .then((res) => res.json())
      .then((data) => {
        const questionsWithIds = data.map((q: Omit<Question, 'id'>) => ({
          ...q,
          id: generateQuestionId(),
        }));
        setQuestions(questionsWithIds);
      })
      .catch((err) => {
        console.error("Failed to load questions:", err);
        setQuestions([]);
      });
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
