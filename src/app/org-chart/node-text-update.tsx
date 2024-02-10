"use client";
import { Button } from "@/components/ui/button";

import { useCallback } from "react";
import { Handle, Position } from "reactflow";

interface TextUpdaterNodeProps {
  isConnectable: boolean;
}

interface handleStyle {
  left?: number;
}

const handleStyle = { left: 30 };

export default function TextUpdaterNode({
  isConnectable,
}: TextUpdaterNodeProps) {
  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  }, []);

  const handleClick = () => {
    console.log("clicked");
  };

  return (
    <div className="h-18 rounded-md border border-gray-200 bg-white p-1 ">
      <div className=" flex items-center space-x-2">
        <label htmlFor="text" className="text-xs text-gray-500">
          Text:
        </label>
        <input
          id="text"
          name="text"
          onChange={onChange}
          className="rounded border-2 border-gray-300 p-1 text-xs"
        />
        <Button
          onClick={handleClick}
          className="rounded bg-black p-1 text-xs text-white"
        >
          create Node
        </Button>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={handleStyle}
        isConnectable={isConnectable}
      />
    </div>
  );
}
