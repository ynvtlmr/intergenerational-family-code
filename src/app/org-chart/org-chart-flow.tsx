"use client";


import { useCallback } from "react";

import ReactFlow, {
  Controls,
  Background,
  addEdge,
  Edge,
  Connection,
  Panel,
  OnNodesChange,
} from "reactflow";
import "reactflow/dist/style.css";
import UpdaterNode from "./custom-update-node";
import { useOrgStore } from "./store";

interface CustomNodeData {
  label: string;
}

type CustomNode = {
  id: string;
  type: string;
  data: CustomNodeData;
  position: { x: number; y: number };
}

type CustomEdge = Edge;


const rfStyle = {
  backgroundColor: "#B8CEFF",
};

const nodeTypes = { textUpdater: UpdaterNode };

export default function OrgChartFlow() {
  const nodes = useOrgStore((state) => state.nodes) as CustomNode[];
  const edges = useOrgStore((state) => state.edges) as CustomEdge[];
  const addNode = useOrgStore((state) => state.addNode);


  const handleConnect = (params: Edge | Connection) => {
    const nextEdge = addEdge(params, edges);
    useOrgStore.setState({ edges: nextEdge });
  };



  return (
    <div className="wrapper"  style={{ height: "100%" }}>
      <ReactFlow
      nodes={nodes}
      edges={edges}
     
      onConnect={handleConnect}
      nodeTypes={nodeTypes}
      style={rfStyle}
      fitView
      >
        <Panel position="top-left">Organizational Chart</Panel>

        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

