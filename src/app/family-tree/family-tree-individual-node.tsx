import { Handle, Position, addEdge, useReactFlow } from "reactflow";
import type { Connection, Node, NodeProps, XYPosition } from "reactflow";
import { useDebouncedCallback } from "use-debounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";

import { useCallback } from "react";
import type { NodeData } from "./types";

export default function FamilyTreeIndividualNode({
  id,
  data,
  isConnectable,
}: NodeProps<NodeData>) {
  const { getNode, setNodes, setEdges, toObject } = useReactFlow();
  const { name, surname, dateOfBirth, placeOfBirth, gender, genderColor } =
    data;

  const onChange = useDebouncedCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const inputField = evt.target.name;
      const inputValue = evt.target.value;
      setNodes((nodes: Node<NodeData>[]) =>
        nodes.map((node) => {
          if (node.id === id) {
            node.data = {
              ...node.data,
              [inputField]: inputValue,
            };
          }
          return node;
        })
      );

      // creates a JSON-compatible representation of the flow
      const flow = toObject();
      localStorage.setItem("family-tree", JSON.stringify(flow));
    },
    300
  );

  const handleNodeGender = useCallback(() => {
    setNodes((nodes: Node<NodeData>[]) =>
      nodes.map((node) => {
        if (node.id === id) {
          node.data = {
            ...node.data,
            gender: node.data.gender === "Male" ? "Female" : "Male",
          };
        }
        return node;
      })
    );

    // creates a JSON-compatible representation of the flow
    const flow = toObject();
    localStorage.setItem("family-tree", JSON.stringify(flow));
  }, [setNodes, id, toObject]);

  const connectNodesWithJunction = useCallback(
    (
      { source, sourceHandle, target, targetHandle }: Connection,
      { x, y }: XYPosition
    ) => {
      if (!source || !target) return;

      const newNodeId = crypto.randomUUID();
      // this is the new junction node
      const newNode = {
        id: newNodeId,
        type: "customJunction",
        data: {},
        position: {
          x,
          y,
        },
      };

      // edge between the source to the new node
      const leftEdge = {
        id: crypto.randomUUID(),
        source,
        target: newNodeId,
        type: "straight",
        sourceHandle,
      };
      // edge between the new node to the target
      const rightEdge = {
        id: crypto.randomUUID(),
        source: newNodeId,
        target,
        type: "straight",
        targetHandle,
      };
      setNodes((nodes) => nodes.concat(newNode));
      setEdges((edges) => addEdge(leftEdge, addEdge(rightEdge, edges)));
    },
    [setNodes, setEdges]
  );

  const getNewJunctionPosition = useCallback(
    (
      sourceNode: Node<NodeData>,
      targetNode: Node<NodeData>,
      dragFrom: "leftHandler" | "rightHandler",
      adjustYPosition: number = 0
    ): XYPosition | undefined => {
      // x position is the middle of the node
      const {
        position: { x: sourceNodeX, y: sourceNodeY },
        width,
      } = sourceNode;
      const {
        position: { x: targetNodeX, y: targetNodeY },
      } = targetNode;
      if (!width) return;

      const widthBetweenSourceAndTargetNodes = Math.abs(
        sourceNodeX + width - targetNodeX
      );
      const newX =
        sourceNodeX + width / 2 + widthBetweenSourceAndTargetNodes / 2;
      const newY =
        dragFrom === "leftHandler"
          ? targetNodeY + adjustYPosition
          : sourceNodeY + adjustYPosition;
      return { x: newX, y: newY };
    },
    []
  );

  return (
    <div
      style={{ backgroundColor: genderColor[gender] }}
      className="rounded-lg p-5"
    >
      <Handle
        type="target"
        id="top"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        id="left"
        position={Position.Left}
        isConnectable={true}
        onConnect={(params) => {
          const { source, target } = params;
          if (!source || !target) return;

          const sourceNode = getNode(source);
          const targetNode = getNode(target);
          if (!sourceNode || !targetNode) return;

          if (
            params.sourceHandle === "right" &&
            sourceNode.type !== "customJunction"
          ) {
            const newJunctionPosition = getNewJunctionPosition(
              sourceNode,
              targetNode,
              "leftHandler",
              50
            );
            if (!newJunctionPosition) return;
            connectNodesWithJunction(params, newJunctionPosition);
          } else if (params.sourceHandle === "right") {
            const edge = {
              ...params,
              type: "straight",
              sourceHandle: "right",
            };
            setEdges((edges) => addEdge(edge, edges));
          }
        }}
      />

      <div className="mb-3 flex items-center justify-center">
        <FontAwesomeIcon
          icon={gender === "Male" ? faMars : faVenus}
          className={`fa-lg cursor-pointer ${gender === "Male" ? "text-[#3daaee] hover:text-[#336889]" : "text-[#f26356] hover:text-[#aa483f]"}`}
          onClick={handleNodeGender}
        />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <input
          className="min-w-6 text-ellipsis rounded bg-transparent font-semibold placeholder:text-[#eaf7ff] focus:outline-none"
          name="name"
          placeholder="Name"
          defaultValue={name}
          onChange={onChange}
        />
        <input
          className="min-w-6 text-ellipsis rounded bg-transparent font-semibold placeholder:text-[#eaf7ff] focus:outline-none"
          name="surname"
          placeholder="Surname"
          defaultValue={surname}
          onChange={onChange}
        />
        <input
          className="min-w-6 bg-transparent text-xs placeholder:text-[#eaf7ff] focus:outline-none"
          name="dateOfBirth"
          placeholder="Date of Birth"
          defaultValue={dateOfBirth}
          onChange={onChange}
        />
        <input
          className="min-w-6 bg-transparent text-xs placeholder:text-[#eaf7ff] focus:outline-none"
          name="placeOfBirth"
          placeholder="Place of Birth"
          defaultValue={placeOfBirth}
          onChange={onChange}
        />
      </div>

      <Handle
        type="source"
        id="right"
        position={Position.Right}
        isConnectable={true}
        onConnect={(params) => {
          const { source, target } = params;
          if (!source || !target) return;

          const sourceNode = getNode(source);
          const targetNode = getNode(target);
          if (!sourceNode || !targetNode) return;

          if (
            params.targetHandle === "left" &&
            targetNode.type !== "customJunction"
          ) {
            const newJunctionPosition = getNewJunctionPosition(
              sourceNode,
              targetNode,
              "rightHandler",
              50
            );
            if (!newJunctionPosition) return;
            connectNodesWithJunction(params, newJunctionPosition);
          } else if (params.targetHandle === "left") {
            const edge = {
              ...params,
              type: "straight",
              targetHandle: "left",
            };
            setEdges((edges) => addEdge(edge, edges));
          }
        }}
      />
    </div>
  );
}
