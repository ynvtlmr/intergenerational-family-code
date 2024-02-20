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
import {
  useAddNewNode,
  useAddNodeOnEdgeDrop,
  useSaveAndRestore,
} from "./hooks";
import FamilyTreeIndividualNode from "./family-tree-individual-node";
import FamilyTreeCustomJunctionNode from "./family-tree-custom-junction-node";
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
  },
];

const nodeTypes: NodeTypes = {
  customNode: FamilyTreeIndividualNode,
  customJunction: FamilyTreeCustomJunctionNode,
};

export default function FamilyTreeFlow() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { onConnect, onConnectStart, onConnectEnd } = useAddNodeOnEdgeDrop(
    setEdges,
    setNodes
  );
  const { onSave, onRestore } = useSaveAndRestore(setNodes, setEdges);
  const { onAdd } = useAddNewNode(
    {
      id: crypto.randomUUID(),
      type: "customNode",
      position: {
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() * window.innerHeight,
      },
      data: {
        name: "",
        surname: "",
        dateOfBirth: "",
        placeOfBirth: "",
        gender: "Male",
        genderColor: {
          Male: "#9ad3f6",
          Female: "#f6bfba",
        },
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
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() * window.innerHeight,
      },
    },
    setNodes
  );

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
