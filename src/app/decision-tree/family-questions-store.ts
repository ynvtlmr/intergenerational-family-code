import { create } from "zustand";
import questions from "../../../data/questions";

interface FamilyQuestionsState {
  questions: string[];
  addQuestion: (question: string) => void;
  deleteQuestion: (question: string) => void;
  editQuestion: (oldQuestion: string, newQuestion: string) => void; // New function to edit a question
}

export const useFamilyQuestionsStore = create<FamilyQuestionsState>((set) => ({
  questions: questions,
  addQuestion: (question: string) => set((state) => ({ questions: [...state.questions, question] })),
  deleteQuestion: (question: string) => set((state) => ({ questions: state.questions.filter((q) => q !== question) })),
  editQuestion: (oldQuestion: string, newQuestion: string) => set((state) => ({
    questions: state.questions.map((q) => q === oldQuestion ? newQuestion : q)
  })),
}));

export const useFamilyQuestions = () => {
  return {
    questions: useFamilyQuestionsStore((s) => s.questions),
    addQuestion: useFamilyQuestionsStore((s) => s.addQuestion),
    deleteQuestion: useFamilyQuestionsStore((s) => s.deleteQuestion),
    editQuestion: useFamilyQuestionsStore((s) => s.editQuestion),
  };
};
