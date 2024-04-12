import { Handle, Position, useReactFlow } from "reactflow";
import type { Node, NodeProps } from "reactflow";
import { useDebouncedCallback } from "use-debounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useCallback } from "react";
import type { NodeData } from "./types";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";

export default function OrgChartIndividualNode({
  id,
  data,
  isConnectable,
}: NodeProps<NodeData>) {
  const { setNodes, toObject } = useReactFlow();
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
      localStorage.setItem("org-chart", JSON.stringify(flow));
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
    localStorage.setItem("org-chart", JSON.stringify(flow));
  }, [setNodes, id, toObject]);

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
        isConnectable={isConnectable}
      />

      <div className="mb-3 flex items-center justify-center">
        <FontAwesomeIcon
          icon={gender === "Male" ? (faMars as any) : (faVenus as any)}
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
        isConnectable={isConnectable}
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
