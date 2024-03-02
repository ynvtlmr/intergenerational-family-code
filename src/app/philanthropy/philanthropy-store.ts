import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PhilanthropyState {
  impactStatement: string;
  updateImpactStatement: (statement: string) => void;
  editImpactStatement: boolean;
  setEditImpactStatement: (edit: boolean) => void;
  guidelines: string[];
  addGuideline: (guideline: string) => void;
  deleteGuideline: (guideline: string) => void;
}

export const usePhilanthropyStore = create<PhilanthropyState>()(
  persist(
    (set) => ({
      impactStatement: "",
      updateImpactStatement: (statement: string) =>
        set({ impactStatement: statement }),
      editImpactStatement: false,
      setEditImpactStatement: (edit: boolean) =>
        set({ editImpactStatement: edit }),
      guidelines: [],
      addGuideline: (question: string) =>
        set((state) => ({ guidelines: [...state.guidelines, question] })),
      deleteGuideline: (question: string) =>
        set((state) => ({
          guidelines: state.guidelines.filter((q) => q !== question),
        })),
    }),
    { name: "philanthropy" }
  )
);
