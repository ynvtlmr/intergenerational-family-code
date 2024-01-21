import { create } from "zustand";

interface FamilyValueState {
  values: Set<string>;
  addValue: (value: string) => void;
  deleteValue: (value: string) => void;
}

export const useFamilyValueStore = create<FamilyValueState>((set) => ({
  values: new Set(),
  addValue: (value) => set((state) => ({ values: state.values.add(value) })),
  deleteValue: (value) =>
    set((state) => {
      const valueExists = state.values.delete(value);
      if (!valueExists) return state;
      return { values: new Set(state.values) };
    }),
}));

export const useFamilyValues = () => {
  return {
    values: useFamilyValueStore((s) => s.values),
    addFamilyValue: useFamilyValueStore((s) => s.addValue),
    deleteFamilyValue: useFamilyValueStore((s) => s.deleteValue),
  };
};
