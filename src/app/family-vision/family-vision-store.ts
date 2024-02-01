import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FamilyVisionState {
  visionStatements: string[];
  addVisionStatement: (visionStatement: string) => void;
  deleteVisionStatement: (visionStatement: string) => void;
}

export const useFamilyVisionStore = create<FamilyVisionState>()(
  persist(
    (set) => ({
      visionStatements: [],
      addVisionStatement: (visionStatement: string) =>
        set((state) => ({
          visionStatements: [...state.visionStatements, visionStatement],
        })),
      deleteVisionStatement: (visionStatement: string) =>
        set((state) => ({
          visionStatements: state.visionStatements.filter(
            (q) => q !== visionStatement
          ),
        })),
    }),
    {
      name: "family-vision",
    }
  )
);

export const useFamilyVision = () => {
  return {
    visionStatements: useFamilyVisionStore((s) => s.visionStatements),
    addVisionStatement: useFamilyVisionStore((s) => s.addVisionStatement),
    deleteVisionStatement: useFamilyVisionStore((s) => s.deleteVisionStatement),
  };
};
