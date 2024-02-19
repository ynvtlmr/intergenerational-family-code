import { useCallback } from "react";
import { Handle, HandleProps, Position, useReactFlow } from "reactflow";
import type { IndividualNode, NodeData } from "./types";

export default function FamilyTreeIndividualNode({
  id,
  data,
  isConnectable,
}: {
  id: IndividualNode["id"];
  data: NodeData;
  isConnectable: HandleProps["isConnectable"];
}) {
  const { setNodes } = useReactFlow();
  const { name, surname, dateOfBirth, placeOfBirth } = data;

  const onChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const inputField = evt.target.name;
      const inputValue = evt.target.value;
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id !== id) return node;
          return {
            ...node,
            data: {
              ...node.data,
              [inputField]: inputValue,
            },
          };
        })
      );
    },
    [setNodes, id]
  );

  return (
    <div className="rounded-lg p-5">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />

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
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
}
