import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OrgChartState {
  imgString: string;
  saveImgString: (newImgString: string) => void;
}

export const useOrgChartImageStore = create<OrgChartState>()(
  persist(
    (set) => ({
      imgString: "",
      saveImgString: (newImgString: string) => set({ imgString: newImgString }),
    }),
    { name: "org-chart-image" }
  )
);
