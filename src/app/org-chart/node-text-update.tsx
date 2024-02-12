"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Handle, Position } from "reactflow";

import { useCallback } from "react";
import { Button } from "@/components/ui/button";

import CreateNodeDialog from "./create-node-dialog";

interface TextUpdaterNodeProps {
  isConnectable: boolean;
}

interface handleStyle {
  left?: number;
}

const handleStyle = { left: 30 };

const formSchema = z.object({
  title: z.string().min(2).max(50),
});

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
          Create:
        </label>
        <input
          id="text"
          name="text"
          onChange={onChange}
          className="rounded border-2 border-gray-300 p-1 text-xs"
        />
        <CreateNodeDialog />
      </div>
      <div className=" flex w-full items-center "></div>
      <Button
        onClick={handleClick}
        className="flex w-full items-center rounded bg-black p-2 text-white"
      >
        Add
      </Button>

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
