import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Person {
  name: string;
  begin_amount: number;
  begin_age: number;
}

interface FamilyGardenState {
  growthRate: number;
  setGrowthRate: (rate: number) => void;
}

export const useFamilyGardenStore = create<FamilyGardenState>()(
  persist(
    (set) => ({
      growthRate: 5,
      setGrowthRate: (rate) => set({ growthRate: rate }),
    }),
    { name: "family-garden" }
  )
);
