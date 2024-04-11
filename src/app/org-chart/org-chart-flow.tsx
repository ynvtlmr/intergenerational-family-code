"use client";

import ReactFlow, {
  Controls,
  Background,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
  getConnectedEdges,
  getNodesBounds,
  getViewportForBounds,
} from "reactflow";
import type { NodeDragHandler, Node } from "reactflow";
import "reactflow/dist/style.css";
import { toSvg } from "html-to-image";

import { useCallback, useEffect, useRef } from "react";
import {
  useAddNewNode,
  useAddNodeOnEdgeDrop,
  useSaveAndRestore,
} from "./hooks";
import OrgChartIndividualNode from "./org-chart-individual-node";
import type { IndividualNode, NodeData, NodeTypes } from "./types";
import { useOrgChartImageStore } from "./org-chart-store";

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
  customNode: OrgChartIndividualNode,
};

export default function OrgChartFlow() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { getNode, getNodes } = useReactFlow();

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

  const syncNodePositions = useCallback(
    (
      mainNode: Node<NodeData>,
      followerNode: Node<NodeData>,
      adjustYPosition: number = 0
    ) => {
      const newY = mainNode.position.y - adjustYPosition;
      const updatedNode = {
        ...followerNode,
        position: { ...followerNode.position, y: newY },
      };
      setNodes((prevNodes) =>
        prevNodes.map((n) => (n.id === updatedNode.id ? updatedNode : n))
      );
    },
    [setNodes]
  );

  /**
   * Handles the drag event for a node in the org chart.
   * If the dragged node is of type "customJunction", it updates the positions of the connected nodes.
   * @param event ReactMouseEvent.
   * @param node The dragged node.
   * @param nodes A list of org chart nodes.
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
        .map((edge) => (edge.source === node.id ? edge.target : edge.source));

      // Get the node objects of the left and right connected nodes
      const [nodeOneId, nodeTwoId] = leftAndRightNodeIds;
      const nodeOne = getNode(nodeOneId);
      const nodeTwo = getNode(nodeTwoId);

      // Update the position of the first connected node
      if (nodeOne) {
        syncNodePositions(node, nodeOne, 50);
      }

      // Update the position of the second connected node
      if (nodeTwo) {
        syncNodePositions(node, nodeTwo, 50);
      }
    },
    [edges, getNode, syncNodePositions]
  );

  // Restore the flow from local storage on component mount
  useEffect(() => {
    onRestore();
  }, [onRestore]);

  // Save the flow image url to local storage on component unmount
  const saveImgString = useOrgChartImageStore((s) => s.saveImgString);
  function storeOrgChartImageString() {
    const imageWidth = 1024;
    const imageHeight = 768;

    const nodesBounds = getNodesBounds(getNodes());
    const transform = getViewportForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.1,
      2
    );

    const orgChart = document.querySelector(".react-flow__viewport");
    if (!orgChart) return;
    function filter(node: HTMLElement) {
      return node.tagName !== "i";
    }
    toSvg(orgChart as HTMLElement, {
      filter,
      style: {
        transform: `translate(${transform.x}px, ${transform.y}px scale(${transform.zoom}))`,
      },
    }).then((dataUrl) => {
      saveImgString(dataUrl);
    });
  }

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
        defaultEdgeOptions={{ type: "straight" }}
        nodeOrigin={[0.5, 0]}
      >
        <Panel
          className="divide-x rounded border bg-background py-1 shadow-xl"
          position="top-right"
        >
          <button
            className="px-3"
            onClick={() => {
              onSave();
              storeOrgChartImageString();
            }}
          >
            save
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
