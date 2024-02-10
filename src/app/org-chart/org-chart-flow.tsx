"use client";

import { useCallback, useRef } from "react";
import ReactFlow, {
  Controls,
  Background,
  addEdge,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
  useReactFlow,
  OnConnectStartParams,
} from "reactflow";
import "reactflow/dist/style.css";
import TextUpdaterNode from "./node-text-update";

const initialNodes = [
  {
    id: "0",
    type: "textUpdater",
    data: { label: "Node" },
    position: { x: 0, y: 50 },
  },
];

let id = 1;
const getId = () => `${id++}`;

const rfStyle = {
  backgroundColor: "#B8CEFF",
};

const nodeTypes = { textUpdater: TextUpdaterNode };

export default function OrgChartFlow() {
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef<string>();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();

  const onConnect = useCallback((params: Edge | Connection) => {
    connectingNodeId.current = undefined;
    setEdges((eds) => addEdge(params, eds));
  }, []);

  const onConnectStart = useCallback(
    (
      _: React.MouseEvent | React.TouchEvent,
      { nodeId }: OnConnectStartParams
    ) => {
      if (!nodeId) return;
      connectingNodeId.current = nodeId;
    },
    []
  );

  const onConnectEnd = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (!connectingNodeId.current || !event.target) return;

      if (
        !(event instanceof MouseEvent) ||
        !(event.target instanceof HTMLDivElement)
      )
        return;
      const targetIsPane = event.target.classList.contains("react-flow__pane");
      console.log(event.target);

      if (targetIsPane) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const id = getId();
        const newNode = {
          id,
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
          data: { label: `Node ${id}` },
          origin: [0.5, 0.0],
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({ id, source: connectingNodeId.current!, target: id })
        );
      }
    },
    [screenToFlowPosition]
  );

  return (
    <div className="wrapper" ref={reactFlowWrapper} style={{ height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        style={rfStyle}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
