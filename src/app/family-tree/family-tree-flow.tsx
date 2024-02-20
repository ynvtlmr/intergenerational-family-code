"use client";

import ReactFlow, {
  Controls,
  Background,
  Panel,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";

import { useRef } from "react";
import { useAddNodeOnEdgeDrop, useSaveAndRestore } from "./hooks";
import FamilyTreeIndividualNode from "./family-tree-individual-node";
import type { IndividualNode, NodeData, NodeTypes } from "./types";

const nodeData: NodeData = {
  name: "",
  surname: "",
  dateOfBirth: "",
  placeOfBirth: "",
  gender: "Male",
  genderColor: {
    Male: "#9ad3f6",
    Female: "#f6bfba",
  },
};

const initialNodes: IndividualNode[] = [
  {
    id: "0",
    type: "customNode",
    data: nodeData,
    position: { x: 0, y: 0 },
    style: { borderRadius: "4px" },
    origin: [0.5, 0.0],
  },
];

const nodeTypes: NodeTypes = { customNode: FamilyTreeIndividualNode };

export default function FamilyTreeFlow() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { onConnect, onConnectStart, onConnectEnd } = useAddNodeOnEdgeDrop(
    setEdges,
    setNodes
  );
  const { onSave, onRestore, onAdd } = useSaveAndRestore(setNodes, setEdges);

  return (
    <div
      className="h-full grow"
      ref={reactFlowWrapper}
      style={{ height: "100%" }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 2 }}
        defaultEdgeOptions={{ type: "smoothstep" }}
        nodeOrigin={[0.5, 0]}
      >
        <Panel
          className="divide-x rounded border bg-background py-1 shadow-xl"
          position="top-right"
        >
          <button className="px-3" onClick={onSave}>
            save
          </button>
          <button className="px-3" onClick={onRestore}>
            restore
          </button>
          <button className="px-3" onClick={onAdd}>
            add node
          </button>
        </Panel>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
