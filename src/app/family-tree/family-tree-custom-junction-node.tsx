import { useReactFlow, Position, addEdge, Handle } from "reactflow";
import type { NodeProps } from "reactflow";

export default function FamilyTreeCustomJunctionNode({
  isConnectable,
}: NodeProps) {
  const { setEdges } = useReactFlow();

  return (
    <div className="rounded-lg border-foreground bg-foreground p-4">
      <Handle
        type="source"
        id="left"
        position={Position.Left}
        isConnectable={isConnectable}
        onConnect={(params) => {
          if (params.targetHandle === "right") {
            const edge = {
              ...params,
              type: "straight",
              targetHandle: "right",
            };
            setEdges((edges) => addEdge(edge, edges));
          }
        }}
      />
      <Handle
        type="source"
        id="right"
        position={Position.Right}
        isConnectable={isConnectable}
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
