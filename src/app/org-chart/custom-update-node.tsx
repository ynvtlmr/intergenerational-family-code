"use client";

import { Handle, Position } from "reactflow";


import CreateNodeDialog from "./create-node-dialog-hook-form";

interface UpdaterNodeProps {
  data : { label: string };
  isConnectable: boolean;
}

export default function UpdaterNode({
  data,
  isConnectable,
}: UpdaterNodeProps) {

  return (
    <>
      <div className="h-18 rounded-md border border-gray-200 bg-white p-1 ">
        <div className="flex justify-center items-center h-16">
          {data.label}
        </div>

        <div className=" flex items-center space-x-2">
          <CreateNodeDialog />
        </div>

        


        <Handle
          type="source"
          position={Position.Bottom}
          isConnectable={isConnectable}
        />

        <Handle
          type="target"
          position={Position.Top}
          isConnectable={isConnectable}
        />
      </div>
    </>
  );
}
