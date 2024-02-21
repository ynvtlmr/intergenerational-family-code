"use client";

import ReactFlow, {
  Controls,
  Background,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
  getConnectedEdges,
} from "reactflow";
import type { NodeDragHandler } from "reactflow";
import "reactflow/dist/style.css";

import { useCallback, useRef } from "react";
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
  const { getNode } = useReactFlow();

  // there are also onConnectStart and onConnectEnd for adding node on edge drop
  const { onConnect } = useAddNodeOnEdgeDrop(setEdges, setNodes);
  const { onSave, onRestore } = useSaveAndRestore(setNodes, setEdges);
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

  /**
   * Handles the drag event for a node in the family tree.
   * If the dragged node is of type "customJunction", it updates the positions of the connected nodes.
   * @param event ReactMouseEvent.
   * @param node The dragged node.
   * @param nodes A list of family tree nodes.
   */
  const handleNodeDrag: NodeDragHandler = useCallback(
    (_, node, __) => {
      // If the node is not of type "customJunction", return
      // We only want to update the positions of the connected nodes for junction nodes
      if (node.type !== "customJunction") return;

      // Get the connected edges of the node
      const connectedEdges = getConnectedEdges([node], edges);

      // Get the node IDs of the left and right connected nodes
      const leftAndRightNodeIds = connectedEdges
        .filter((edge) => edge.type === "straight")
        .map((edge) => edge.target);

      // Get the node objects of the left and right connected nodes
      const [nodeOneId, nodeTwoId] = leftAndRightNodeIds;
      const nodeOne = getNode(nodeOneId);
      const nodeTwo = getNode(nodeTwoId);

      // Update the position of the first connected node
      if (nodeOne) {
        const newY = node.position.y - 34;
        const updatedNodeOne = {
          ...nodeOne,
          position: { ...nodeOne.position, y: newY },
        };
        setNodes((prevNodes) =>
          prevNodes.map((n) =>
            n.id === updatedNodeOne.id ? updatedNodeOne : n
          )
        );
      }

      // Update the position of the second connected node
      if (nodeTwo) {
        const newY = node.position.y - 34;
        const updatedNodeTwo = {
          ...nodeTwo,
          position: { ...nodeTwo.position, y: newY },
        };
        setNodes((prevNodes) =>
          prevNodes.map((n) =>
            n.id === updatedNodeTwo.id ? updatedNodeTwo : n
          )
        );
      }
    },
    [getNode, edges, setNodes]
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
        onNodeDrag={handleNodeDrag}
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
