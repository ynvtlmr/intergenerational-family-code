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

export const nodeData = {
  name: "",
  surname: "",
  dateOfBirth: "",
  placeOfBirth: "",
};

export const initialNodes = [
  {
    id: "0",
    type: "customNode",
    data: nodeData,
    position: { x: 0, y: 0 },
    style: { backgroundColor: "#9ad3f6", borderRadius: "4px" },
    origin: [0.5, 0.0],
  },
];

export const nodeTypes = { customNode: FamilyTreeIndividualNode };

let id = 1;
const getId = () => `${id++}`;

export default function FamilyTreeFlow() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { onConnect, onConnectStart, onConnectEnd } = useAddNodeOnEdgeDrop(
    setEdges,
    setNodes,
    getId
  );
  const { onSave, onRestore } = useSaveAndRestore(setNodes, setEdges);

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
        </Panel>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
