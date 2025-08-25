import type { Question } from "../../types/question";
import { generateQuestionId } from "../../utils/questionUtils";

export const fetchQuestions = async (): Promise<Question[]> => {
  try {
    const response = await fetch("/src/assets/psd_questions.json");
    const data = await response.json();
    return data.map((q: Omit<Question, 'id'>) => ({
      ...q,
      id: generateQuestionId(),
    }));
  } catch (error) {
    console.error("Failed to fetch questions:", error);
    return [];
  }
};
