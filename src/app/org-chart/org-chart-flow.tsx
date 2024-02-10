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
];

// const initialEdges = [
//   { id: "1-2", source: "1", target: "2", label: "to the", type: "step" },
//   { id: "2-3", source: "2", target: "3", label: "connected" },
// ];

const rfStyle = {
  backgroundColor: "#B8CEFF",
};

const nodeTypes = { textUpdater: TextUpdaterNode };

export default function OrgChartFlow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);

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
