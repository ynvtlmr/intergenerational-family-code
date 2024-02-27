"use client";

import { useCallback, useRef } from "react";

import ReactFlow, {
  Controls,
  Background,
  addEdge,
  Edge,
  Connection,
  Panel,
  OnNodesChange,
  useNodesState,
  useEdgesState,
  useReactFlow,
  getConnectedEdges,
} from "reactflow";
import "reactflow/dist/style.css";
import type { NodeDragHandler } from "reactflow";


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
  const reactFlowWrapper = useRef(null);
  const nodes = useOrgStore((state) => state.nodes) as CustomNode[];
  const edges = useOrgStore((state) => state.edges) as CustomEdge[];
  const addNode = useOrgStore((state) => state.addNode);


  const handleConnect = (params: Edge | Connection) => {
    const nextEdge = addEdge(params, edges);
    useOrgStore.setState({ edges: nextEdge });
  };



  return (
    <div  ref={reactFlowWrapper} className="h-full grow"  style={{ height: "100%" }}>
      <ReactFlow
      nodes={nodes}
      edges={edges}
     
      onConnect={handleConnect}
      nodeTypes={nodeTypes}
      style={rfStyle}
      fitView
      >
        <Panel 
          className="divide-x rounded border bg-background py-1 shadow-xl"
          position="top-right">

            <button className="px-3">
              save
            </button>

            <button className="px-3">
              restore
            </button>

            <button className="px-3">
              add node
            </button>

            <button className="px-3">
              add junction
            </button>


        </Panel>

        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

