import { useCallback } from "react";
import { Handle, HandleProps, Position } from "reactflow";
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

      <div className="grid grid-cols-2 gap-5">
        <input
          contentEditable
          className="min-w-6 text-ellipsis rounded bg-transparent font-semibold placeholder:text-[#eaf7ff] focus:outline-none"
          name="firstName"
          placeholder="Name"
          onChange={onChange}
        />
        <input
          contentEditable
          className="min-w-6 text-ellipsis rounded bg-transparent font-semibold placeholder:text-[#eaf7ff] focus:outline-none"
          name="surname"
          placeholder="Surname"
        />
        <input
          className="min-w-6 bg-transparent text-xs placeholder:text-[#eaf7ff] focus:outline-none"
          name="dateOfBirth"
          placeholder="Date of Birth"
        />
        <input
          className="min-w-6 bg-transparent text-xs placeholder:text-[#eaf7ff] focus:outline-none"
          name="placeOfBirth"
          placeholder="Place of Birth"
        />
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
}
