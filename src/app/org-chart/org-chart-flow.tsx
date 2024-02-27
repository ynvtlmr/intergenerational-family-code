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

import { useAddNewNode } from "../family-tree/hooks";
import type { IndividualNode, NodeOrgData, NodeTypes } from "./types";
import FamilyTreeCustomJunctionNode from "../family-tree/family-tree-custom-junction-node";

const nodeData: NodeOrgData = {
  title: "",
  description: "",
};

const initialNodes: IndividualNode[] = [
  {
    id: "0",
    type: "customNode",
    data: nodeData,
    position: { x: 0, y: 0 },
    style: { borderRadius: "4px" },
  },
];


const nodeTypes: NodeTypes = {
  customJunction: FamilyTreeCustomJunctionNode,
}


const rfStyle = {
  backgroundColor: "#B8CEFF",
};


export default function OrgChartFlow() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  // const nodes = useOrgStore((state) => state.nodes) as CustomNode[];
  // const edges = useOrgStore((state) => state.edges) as CustomEdge[];
  const addNode = useOrgStore((state) => state.addNode);

  const { onAdd } = useAddNewNode(
    {
      id: crypto.randomUUID(),
      type: "customNode",
      position: {
        x:
          typeof window !== "undefined"
            ? Math.random() * window.innerWidth - 100
            : 0,
        y:
          typeof window !== "undefined"
            ? Math.random() * window.innerHeight
            : 0,
      },
      data: {
        label: "",
        description: "",
      },
      style: { borderRadius: "4px" },
    },
    setNodes
  );

  const { onAdd: onAddJunction } = useAddNewNode(
    {
      id: crypto.randomUUID(),
      type: "customJunction",
      data: {},
      position: {
        x:
          typeof window !== "undefined"
            ? Math.random() * window.innerWidth - 100
            : 0,
        y:
          typeof window !== "undefined"
            ? Math.random() * window.innerHeight
            : 0,
      },
    },
    setNodes
  );


  // const handleConnect = (params: Edge | Connection) => {
  //   const nextEdge = addEdge(params, edges);
  //   useOrgStore.setState({ edges: nextEdge });
  // };



  return (
    <div  ref={reactFlowWrapper} className="h-full grow"  style={{ height: "100%" }}>
      <ReactFlow
      nodes={nodes}
      // edges={edges}
      onNodesChange={onNodesChange}
      // onConnect={handleConnect}
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

            <button className="px-3" onClick={onAdd}>
              add node
            </button>

            <button className="px-3" onClick={onAddJunction}>
              add junction
            </button>

        </Panel>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

