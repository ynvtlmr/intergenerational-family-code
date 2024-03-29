import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Person {
  name: string;
  beginAmount: number;
  beginAge: number;
}

interface FamilyGardenState {
  growthRate: number;
  people: Person[];
  setGrowthRate: (rate: number) => void;
  addPerson: (person: Person) => void;
  deletePerson: (name: string) => void;
}

export const useFamilyGardenStore = create<FamilyGardenState>()(
  persist(
    (set) => ({
      growthRate: 5,
      people: [],
      setGrowthRate: (rate) => set({ growthRate: rate }),
      addPerson: (person) =>
        set((state) => ({
          people: [...state.people, person],
        })),
      deletePerson: (name) =>
        set((state) => ({
          people: state.people.filter((person) => person.name !== name),
        })),
    }),
    { name: "family-garden" }
  )
);
