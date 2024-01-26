import { create } from "zustand";

type FamilyValue = {
  value: string;
  description: string;
};

interface FamilyValueState {
  values: {
    [key: string]: string;
  };
  addValue: (familyValue: FamilyValue) => void;
  deleteValue: (value: string) => void;
}

export const useFamilyValueStore = create<FamilyValueState>((set) => ({
  values: {},
  addValue: ({ value, description }) =>
    set((state) => {
      state.values[value] = description;
      return { values: { ...state.values } };
    }),
  deleteValue: (value) =>
    set((state) => {
      delete state.values[value];
      return { values: { ...state.values } };
    }),
}));

export const useFamilyValues = () => {
  return {
    values: useFamilyValueStore((s) => s.values),
    addFamilyValue: useFamilyValueStore((s) => s.addValue),
    deleteFamilyValue: useFamilyValueStore((s) => s.deleteValue),
  };
};