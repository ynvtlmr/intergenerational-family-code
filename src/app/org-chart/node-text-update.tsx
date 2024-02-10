"use client";
import { Divide } from "lucide-react";
import { useCallback } from "react";
import { Handle, Position } from "reactflow";

interface TextUpdaterNodeProps {
  data: any;
  isConnectable: boolean;
}

interface handleStyle {
  left?: number;
}

const handleStyle = { left: 30 };

export default function TextUpdaterNode({
  data,
  isConnectable,
}: TextUpdaterNodeProps) {
  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  }, []);

  return (
    <div className="h-12 rounded-md border border-gray-200 bg-white p-1 ">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div>
        <label htmlFor="text" className="block text-xs text-gray-500">
          Text:
        </label>
        <input id="text" name="text" onChange={onChange} className="" />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={handleStyle}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />

      <Handle
        type="source"
        position={Position.Bottom}
        id="c"
        isConnectable={isConnectable}
      />
    </div>
  );
}
