import { useReactFlow, Position, addEdge, Handle } from "reactflow";
import type { NodeProps } from "reactflow";

import CustomSideHandle from "./family-tree-custom-side-handle";

export default function FamilyTreeCustomJunctionNode({
  isConnectable,
}: NodeProps) {
  const { setEdges } = useReactFlow();

  return (
    <div className="rounded-lg border-foreground bg-foreground p-4">
      <CustomSideHandle
        type="target"
        id="left"
        position={Position.Left}
        isConnectable={true}
        connectionLimit={2}
        onConnect={(params) => {
          if (params.sourceHandle === "right") {
            const edge = {
              ...params,
              type: "straight",
              sourceHandle: "right",
            };
            setEdges((edges) => addEdge(edge, edges));
          }
        }}
      />
      <CustomSideHandle
        type="source"
        id="right"
        position={Position.Right}
        isConnectable={true}
        connectionLimit={2}
        onConnect={(params) => {
          if (params.targetHandle === "left") {
            const edge = {
              ...params,
              type: "straight",
              targetHandle: "left",
            };
            setEdges((edges) => addEdge(edge, edges));
          }
        }}
      />
      <Handle
        type="source"
        id="bottom"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
}
