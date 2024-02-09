"use client";

import ReactFlow, { Controls, Background } from "reactflow";
import "reactflow/dist/style.css";

export default function FamilyTreeFlow() {
  return (
    <div style={{ height: "100%" }}>
      <ReactFlow>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
