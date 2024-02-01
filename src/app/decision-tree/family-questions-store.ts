import { create } from "zustand";

interface FamilyQuestionsState {
  questions: string[];
  addQuestion: (question: string) => void;
  deleteQuestion: (question: string) => void;
}

export const useFamilyQuestionsStore = create<FamilyQuestionsState>((set) => ({
  questions: [],
  addQuestion: (question: string) => set((state) => ({ questions: [...state.questions, question] })),
  deleteQuestion: (question: string) => set((state) => ({ questions: state.questions.filter((q) => q !== question) })),
}));

export const useFamilyQuestions = () => {
  return {
    questions: useFamilyQuestionsStore((s) => s.questions),
    addQuestion: useFamilyQuestionsStore((s) => s.addQuestion),
    deleteQuestion: useFamilyQuestionsStore((s) => s.deleteQuestion),
  };
};
