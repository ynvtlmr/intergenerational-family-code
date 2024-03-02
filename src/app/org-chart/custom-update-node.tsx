// "use client";

// import { Handle, Position } from "reactflow";

// import CreateNodeDialog from "./create-node-dialog-hook-form";

// interface UpdaterNodeProps {
//   data: { label: string };
//   isConnectable: boolean;
// }

// export default function UpdaterNode({ data, isConnectable }: UpdaterNodeProps) {
//   return (
//     <>
//       <div className="h-18 rounded-md border border-gray-200 bg-white p-1 ">
//         <div className="flex h-16 items-center justify-center">
//           {data.label}
//         </div>

//         <div className=" flex items-center space-x-2">
//           <CreateNodeDialog />
//         </div>

//         <Handle
//           type="source"
//           position={Position.Bottom}
//           isConnectable={isConnectable}
//         />

//         <Handle
//           type="target"
//           position={Position.Top}
//           isConnectable={isConnectable}
//         />
//       </div>
//     </>
//   );
// }
