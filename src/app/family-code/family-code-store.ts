import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FamilyCodeState {
  statements: string[];
  addStatement: (statement: string) => void;
  deleteStatement: (statement: string) => void;
}

export const useFamilyCodeStore = create<FamilyCodeState>()(persist((set) => ({
  statements: [],
  addStatement: (statement: string) => set((state) => ({ statements: [...state.statements, statement] })),
  deleteStatement: (statement: string) => set((state) => ({ statements: state.statements.filter((s) => s !== statement) })),
}), {
  name: "family-code",
}));

export const useFamilyCode = () => {
  return {
    statements: useFamilyCodeStore((s) => s.statements),
    addStatement: useFamilyCodeStore((s) => s.addStatement),
    deleteStatement: useFamilyCodeStore((s) => s.deleteStatement),
  };
};
