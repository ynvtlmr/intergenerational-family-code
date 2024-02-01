import { create } from "zustand";

interface FamilyCodeState {
  statements: string[];
  addStatement: (statement: string) => void;
  deleteStatement: (statement: string) => void;
}

export const useFamilyCodeStore = create<FamilyCodeState>((set) => ({
  statements: [],
  addStatement: (statement: string) => set((state) => ({ statements: [...state.statements, statement] })),
  deleteStatement: (statement: string) => set((state) => ({ statements: state.statements.filter((s) => s !== statement) })),
}));

export const useFamilyCode = () => {
  return {
    statements: useFamilyCodeStore((s) => s.statements),
    addStatement: useFamilyCodeStore((s) => s.addStatement),
    deleteStatement: useFamilyCodeStore((s) => s.deleteStatement),
  };
};
