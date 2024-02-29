import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DecisionTreeState {
  guidelines: string[];
  addGuideline: (guideline: string) => void;
  deleteGuideline: (guideline: string) => void;
}

export const usePhilanthropyStore = create<DecisionTreeState>()(
  persist(
    (set) => ({
      guidelines: [],
      addGuideline: (question: string) =>
        set((state) => ({ guidelines: [...state.guidelines, question] })),
      deleteGuideline: (question: string) =>
        set((state) => ({
          guidelines: state.guidelines.filter((q) => q !== question),
        })),
    }),
    { name: "decision-tree" }
  )
);
