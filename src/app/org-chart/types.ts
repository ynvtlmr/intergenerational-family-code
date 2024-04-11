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

export type IndividualNode = Node<NodeData, "customNode">;

export type NodeTypes = {
  customNode: React.ComponentType<NodeProps>;
};
