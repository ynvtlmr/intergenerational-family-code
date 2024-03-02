import { Node, NodeProps } from "reactflow";

export type NodeOrgData = {
  title: string;
  description: string;
};

export type IndividualNode = Node<NodeOrgData, "customNode" | "customJunction" >;


export type NodeTypes = {
  customNode: React.ComponentType<NodeProps>;
  customJunction: React.ComponentType<NodeProps>;
};