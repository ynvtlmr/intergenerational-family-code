import { create } from "zustand";
import { Node, Edge } from "reactflow";

import initialNodes from "./nodes";

type RFState = {
  nodes: Node[];
  edges: Edge[];

  addNode: (nextNode: Node) => void
  updateNodeTitle: (nodeId: string, nextTitle: string) => void;
}


export const useOrgStore = create<RFState>((set) => ({
  nodes: initialNodes,
  edges: [],
  addNode: (nextNode) => set((state) => ({ nodes: [...state.nodes, nextNode] })),
  updateNodeTitle: (nodeId, nextTitle) =>
    set((state) => ({
      nodes: state.nodes.map((n) =>
        n.id === nodeId ? { ...n, data: { ...n.data, label: nextTitle } } : n
      ),
}))
}));



// export type Node = {
//   id: string;
//   type: string;
//   title: string;
//   data: { label: string };
//   position: { x: number; y: number };
// };

// export type State = {
//   nodes: Node[];
// };

// export type Actions = {
//   addNode: (node: Node[]) => void;
//   removeNode: (id: string) => void;
// };

// export const useOrgStore = create<State & Actions>((set) => ({
//   nodes: [],
//   addNode: (node) => set((state) => ({ nodes: [...state.nodes, ...node] })),
//   removeNode: (id: string) =>
//     set((state) => ({ nodes: state.nodes.filter((n) => n.id !== id) })),
// }));