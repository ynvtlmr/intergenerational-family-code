"use client";

import { useState, useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  Edge,
  Connection,
} from "reactflow";
import "reactflow/dist/style.css";

import TextUpdaterNode from "./node-text-update";

const initialNodes = [
  {
    id: "node-1",
    type: "textUpdater",
    position: { x: 0, y: 0 },
    data: { value: 123 },
  },
  {
    id: "node-2",
    type: "output",
    targetPosition: "top",
    position: { x: 0, y: 200 },
    data: { label: "second company" },
  },

  {
    id: "node-3",
    type: "output",
    targetPosition: "top",
    position: { x: 200, y: 200 },
    data: { label: "third company" },
  },
  {
    id: "node-4",
    type: "output",
    targetPosition: "top",
    position: { x: 400, y: 200 },
    data: { label: "fourth company" },
  },
];

const initialEdges = [
  {
    id: "edge-1",
    source: "node-1",
    target: "node-2",
    sourceHandle: "a",
  },
  { id: "edge-1", source: "node-1", target: "node-3", sourceHandle: "b" },
  { id: "edge-1", source: "node-1", target: "node-4", sourceHandle: "c" },
];

const rfStyle = {
  backgroundColor: "#B8CEFF",
};

const nodeTypes = { textUpdater: TextUpdaterNode };

export default function OrgChartFlow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes: any) => setNodes((node) => applyNodeChanges(changes, node)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        style={rfStyle}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
