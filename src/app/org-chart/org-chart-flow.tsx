"use client";

import { useCallback, useRef } from "react";

import ReactFlow, {
  Controls,
  Background,
  Panel,
  OnNodesChange,
  useNodesState,
  useEdgesState,
  useReactFlow,
  getConnectedEdges,
} from "reactflow";
import "reactflow/dist/style.css";
import type { NodeDragHandler } from "reactflow";

import type { IndividualNode, NodeOrgData, NodeTypes } from "./types";
import FamilyTreeCustomJunctionNode from "../family-tree/family-tree-custom-junction-node";
import {
  useAddNewNode,
  useAddNodeOnEdgeDrop,
  useSaveAndRestore,
} from "./hooks";
import OrgChartIndividualNode from "./org-chart-individual-node";

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
  customNode: OrgChartIndividualNode,
  customJunction: FamilyTreeCustomJunctionNode,
};

export default function OrgChartFlow() {
  const reactFlowWrapper = useRef(null);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { getNode } = useReactFlow();

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
      ref={reactFlowWrapper}
      className="h-full grow"
      style={{ height: "100%" }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeDrag={handleNodeDrag}
        onConnect={onConnect}
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
