import { Node, NodeProps } from "reactflow";

export default [
  {
    id: "0",
    type: "textUpdater",
    data: { label: "Node" },
    position: { x: 0, y: 50 },
  }
] as Node[];


export type NodeOrgData = {
  title: string;
  description: string;
};

export type IndividualNode = Node<NodeOrgData, "customNode" | "customJunction" >;


export type NodeTypes = {
  customNode: React.ComponentType<NodeProps>;
  customJunction: React.ComponentType<NodeProps>;
};