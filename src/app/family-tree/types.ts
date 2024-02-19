import { NodeProps } from "reactflow";

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

export type IndividualNode = {
  id: string;
  type: keyof NodeTypes;
  position: { x: number; y: number };
  data: NodeData;
  style: React.CSSProperties;
  origin: [number, number];
};

export type NodeTypes = { customNode: React.ComponentType<NodeProps> };
