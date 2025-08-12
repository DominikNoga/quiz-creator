import type { Question } from "../../types/question";
import QuestionsContext from "./QuestionsContext";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export default function QuestionsContextProvider({ children }: Props) {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    fetch("/src/assets/psd_questions.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setQuestions(data);
      })
      .catch((err) => {
        console.error("Failed to load questions:", err);
        setQuestions([]);
      });
  }, []);

  return (
    <QuestionsContext.Provider value={{ questions: questions }}>
      {children}
    </QuestionsContext.Provider>
  )
}
