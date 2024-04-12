import { create } from "zustand";
import { persist } from "zustand/middleware";
import { policyTreeFormSchema } from "./policy-tree-form";

export interface PolicyTreeTableRow extends policyTreeFormSchema {
  id: string;
}

interface PolicyTreeState {
  data: PolicyTreeTableRow[];
  addRow: (row: PolicyTreeTableRow) => void;
  deleteRow: (id: string) => void;
}

export const usePolicyTreeStore = create<PolicyTreeState>()(
  persist(
    (set) => ({
      data: [],
      addRow: (row) => set((state) => ({ data: [...state.data, row] })),
      deleteRow: (id) =>
        set((state) => ({
          data: state.data.filter((row) => row.id !== id),
        })),
    }),
    {
      name: "policy-tree",
    }
  )
);
