import { Handle, Position, addEdge, useReactFlow } from "reactflow";
import type { Node, NodeProps } from "reactflow";
import { useDebouncedCallback } from "use-debounce";

import type { NodeOrgData } from "./types";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function OrgChartIndividualNode({
  id,
  data,
  isConnectable,
}: NodeProps<NodeOrgData>) {
  const { setNodes, setEdges, toObject } = useReactFlow();
  const { title, description } = data;

  const onChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputField = event.target.title;
      const inputValue = event.target.value;
      setNodes((nodes: Node<NodeOrgData>[]) =>
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
    }
  );

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className=" rounded-lg bg-zinc-300 p-5 ">
            <Handle
              type="target"
              id="top"
              position={Position.Bottom}
              isConnectable={isConnectable}
            />
            <Handle
              type="target"
              id="left"
              position={Position.Left}
              isConnectable={true}
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

            <div className="grid grid-cols-2 gap-5">
              <input
                className="min-w-6 text-ellipsis rounded bg-transparent font-semibold placeholder:text-[#eaf7ff] focus:outline-none"
                name="title"
                placeholder="Title"
                defaultValue={title}
                onChange={onChange}
              />
              <input
                className="min-w-6 text-ellipsis rounded bg-transparent font-semibold placeholder:text-[#eaf7ff] focus:outline-none"
                name="description"
                placeholder="Description"
                defaultValue={description}
                onChange={onChange}
              />
            </div>

            <Handle
              type="target"
              id="right"
              position={Position.Right}
              isConnectable={true}
              onConnect={(params) => {
                if (params.sourceHandle === "left") {
                  const edge = {
                    ...params,
                    type: "straight",
                    sourceHandle: "left",
                  };
                  setEdges((edges) => addEdge(edge, edges));
                }
              }}
            />
          </div>
        </TooltipTrigger>
      </Tooltip>
    </TooltipProvider>
  );
}
