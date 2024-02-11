import { useCallback } from "react";
import { Handle, HandleProps, Node, Position } from "reactflow";
import type { NodeData } from "./types";

export default function FamilyTreeIndividualNode({
  data,
  isConnectable,
}: {
  data: NodeData;
  isConnectable: HandleProps["isConnectable"];
}) {
  const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value);
  }, []);
  const { label } = data;

  return (
    <div className="rounded-lg p-5">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div>
        <label htmlFor="text" className="block">
          {label}
        </label>
        <input id="text" name="text" onChange={onChange} />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
}
