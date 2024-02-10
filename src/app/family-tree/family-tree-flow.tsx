"use client";

import ReactFlow, {
  Controls,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
  NodeChange,
  EdgeChange,
  addEdge,
  Edge,
  Connection,
  Panel,
} from "reactflow";
import "reactflow/dist/style.css";

import { useState, useCallback } from "react";

const initialNodes = [
  {
    id: "1",
    data: { label: "Hello" },
    position: { x: 0, y: 0 },
    style: { backgroundColor: "#9ad3f6" },
  },
  {
    id: "2",
    data: { label: "World" },
    position: { x: 100, y: 100 },
    style: { backgroundColor: "#f5a2e5" },
  },
];

const initialEdges = [{ id: "1-2", source: "1", target: "2" }];

export default function FamilyTreeFlow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  return (
    <div style={{ height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Panel
          className="rounded border bg-background px-3 py-1 shadow-xl"
          position="top-left"
        >
          Family Tree
        </Panel>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
