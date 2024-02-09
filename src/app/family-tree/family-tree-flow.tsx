"use client";

import ReactFlow, { Controls, Background } from "reactflow";
import "reactflow/dist/style.css";

export default function FamilyTreeFlow() {
  const nodes = [
    {
      id: "1",
      position: { x: 0, y: 0 },
      data: { label: "Hello" },
      type: "input",
    },
    {
      id: "2",
      position: { x: 100, y: 100 },
      data: { label: "World" },
    },
  ];

  return (
    <div style={{ height: "100%" }}>
      <ReactFlow nodes={nodes}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
