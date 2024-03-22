import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DecisionTreeState {
  questions: string[];
  addQuestion: (question: string) => void;
  deleteQuestion: (question: string) => void;
}

export const useDecisionTreeStore = create<DecisionTreeState>()(
  persist(
    (set) => ({
      questions: [],
      addQuestion: (question: string) =>
        set((state) => ({ questions: [...state.questions, question] })),
      deleteQuestion: (question: string) =>
        set((state) => ({
          questions: state.questions.filter((q) => q !== question),
        })),
    }),
    { name: "decision-tree" }
  )
);
