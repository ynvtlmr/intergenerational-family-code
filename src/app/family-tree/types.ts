import { Node, NodeProps } from "reactflow";

export type NodeData = {
  name: string;
  surname: string;
  dateOfBirth: string;
  placeOfBirth: string;
  gender: "Male" | "Female";
  genderColor: {
    Male: string;
    Female: string;
  };
};

export type IndividualNode = Node<NodeData, "customNode" | "customJunction">;

export type NodeTypes = {
  customNode: React.ComponentType<NodeProps>;
  customJunction: React.ComponentType<NodeProps>;
};
