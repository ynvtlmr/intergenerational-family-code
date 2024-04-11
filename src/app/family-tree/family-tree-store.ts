import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FamilyTreeState {
  imgString: string;
  saveImgString: (newImgString: string) => void;
}

export const useFamilyTreeImageStore = create<FamilyTreeState>()(
  persist(
    (set) => ({
      imgString: "",
      saveImgString: (newImgString: string) => set({ imgString: newImgString }),
    }),
    { name: "family-tree-image" }
  )
);
