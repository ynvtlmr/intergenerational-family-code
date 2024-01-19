import { IQuestion } from "./types/questions";

const baseUrl = "http://localhost:3002";

export const getAllQuestions = async (): Promise<IQuestion[]> => {
  const res = await fetch(`${baseUrl}/questions`);
  const questions = await res.json();
  return questions; // Access the questions array inside the response object
};
