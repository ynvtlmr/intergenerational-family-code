import { useCallback } from "react";
import { Handle, HandleProps, Node, Position } from "reactflow";

export default function FamilyTreeIndividualNode({
  data,
  isConnectable,
}: {
  data: Node["data"];
  isConnectable: HandleProps["isConnectable"];
}) {
  const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="rounded-lg p-5">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div>
        <label htmlFor="text" className="block">
          Text:
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
