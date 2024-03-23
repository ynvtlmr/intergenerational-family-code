import { create } from "zustand";
import { persist } from "zustand/middleware";

export type PolicyTreeTableRow = {
  carrier: string;
  type: string;
  amount: number;
  owner: string;
  beneficiary: string;
  payor: string;
  anniversary: string;
  insured: string;
};

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
      deleteRow: (owner) =>
        set((state) => ({
          data: state.data.filter((row) => row.owner !== owner),
        })),
    }),
    {
      name: "policy-tree",
    }
  )
);
