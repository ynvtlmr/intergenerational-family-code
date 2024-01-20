import { IQuestion } from "./types/questions";

const baseUrl = "http://localhost:3002";

export const getAllQuestions = async (): Promise<IQuestion[]> => {
  const res = await fetch(`${baseUrl}/questions`, { cache: "no-store" });
  const questions = await res.json();
  return questions;
};

export const addQuestion = async (question: IQuestion): Promise<IQuestion> => {
  const res = await fetch(`${baseUrl}/questions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(question),
  });
  const newQuestion = await res.json();
  return newQuestion;
};
