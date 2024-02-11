import { initialNodes, nodeData, nodeTypes } from "./family-tree-flow";

export type NodeData = typeof nodeData;
export type IndividualNode = Omit<(typeof initialNodes)[0], "type"> & {
  type: NodeTypes;
};
export type NodeTypes = keyof typeof nodeTypes;
