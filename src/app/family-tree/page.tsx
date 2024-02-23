"use client";

import { ReactFlowProvider } from "reactflow";

import FamilyTreeFlow from "./family-tree-flow";

export default function FamilyTreePage() {
  return (
    <ReactFlowProvider>
      <FamilyTreeFlow />
    </ReactFlowProvider>
  );
}
