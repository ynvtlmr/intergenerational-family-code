import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Person {
  id: number;
  name: string;
  beginAmount: string;
  beginAge: number;
}

interface FamilyGardenState {
  growthRate: number;
  people: Person[];
  setGrowthRate: (rate: number) => void;
  addPerson: (person: Omit<Person, 'id'>) => void;
  deletePerson: (personId: number) => void;
  updatePerson: (personId: number, person: Partial<Omit<Person, 'id'>>) => void;
  resetData: () => void;
}

export const useFamilyGardenStore = create<FamilyGardenState>()(
  persist(
    (set) => ({
      growthRate: 0.05,
      people: [{ id: 1, name: '', beginAmount: '', beginAge: 30 }, { id: 2, name: '', beginAmount: '', beginAge: 40 }],
      setGrowthRate: (rate) => set({ growthRate: rate }),
      addPerson: (person) => set((state) => ({ people: [...state.people, { ...person, id: Math.max(...state.people.map(p => p.id)) + 1 }] })),
      deletePerson: (personId) => set((state) => ({ people: state.people.filter(person => person.id !== personId) })),
      updatePerson: (personId, updates) => set((state) => ({
        people: state.people.map(person => person.id === personId ? { ...person, ...updates } : person),
      })),
      resetData: () => set(() => ({
        growthRate: 0.05,
        people: [{ id: 1, name: '', beginAmount: '', beginAge: 30 }, { id: 2, name: '', beginAmount: '', beginAge: 40 }],
      })),
    }),
    { name: "family-garden" }
  )
);
