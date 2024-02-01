import { create } from "zustand";
import {persist} from "zustand/middleware";

interface FamilyQuestionsState {
  questions: string[];
  addQuestion: (question: string) => void;
  deleteQuestion: (question: string) => void;
}

export const useFamilyQuestionsStore = create<FamilyQuestionsState>()(persist((set) => ({
  questions: [],
  addQuestion: (question: string) => set((state) => ({ questions: [...state.questions, question] })),
  deleteQuestion: (question: string) => set((state) => ({ questions: state.questions.filter((q) => q !== question) })),
}), {name: "decision-tree"}));

export const useFamilyQuestions = () => {
  return {
    questions: useFamilyQuestionsStore((s) => s.questions),
    addQuestion: useFamilyQuestionsStore((s) => s.addQuestion),
    deleteQuestion: useFamilyQuestionsStore((s) => s.deleteQuestion),
  };
};
