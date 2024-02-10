"use client";

import ReactFlow, {
  Controls,
  Background,
  addEdge,
  Edge,
  Connection,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
  OnConnectStartParams,
} from "reactflow";
import "reactflow/dist/style.css";

import { useCallback, useRef } from "react";

const initialNodes = [
  {
    id: "0",
    data: { label: "Hello" },
    position: { x: 0, y: 0 },
    style: { backgroundColor: "#9ad3f6" },
  },
];

let id = 1;
const getId = () => `${id++}`;

export default function FamilyTreeFlow() {
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef<string | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition, setViewport, toObject } = useReactFlow();

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      // reset the start node on connections
      connectingNodeId.current = null;
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  const onConnectStart = useCallback(
    (
      _: React.MouseEvent | React.TouchEvent,
      { nodeId }: OnConnectStartParams
    ) => {
      connectingNodeId.current = nodeId;
    },
    []
  );

  const onConnectEnd = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (!connectingNodeId.current || !event.target) return;

      // check if the event is a MouseEvent and the target is a pane
      if (
        !(event instanceof MouseEvent) ||
        !(event.target instanceof HTMLDivElement)
      )
        return;

      const targetIsPane = event.target.classList.contains("react-flow__pane");
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

        setEdges((eds) => {
          // if we are not connecting a node, we don't need to create an edge
          if (!connectingNodeId.current) return eds;

          return eds.concat({
            id,
            source: connectingNodeId.current,
            target: id,
          });
        });
      }
    },
    [setNodes, setEdges, screenToFlowPosition]
  );

  const onSave = useCallback(() => {
    // creates a JSON-compatible representation of the flow
    const flow = toObject();
    localStorage.setItem("family-tree", JSON.stringify(flow));
  }, [toObject]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const data = localStorage.getItem("family-tree");
      const flow = data ? JSON.parse(data) : null;
      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setEdges, setViewport]);

  return (
    <div
      className="h-full grow"
      ref={reactFlowWrapper}
      style={{ height: "100%" }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        fitView
        fitViewOptions={{ padding: 2 }}
        nodeOrigin={[0.5, 0]}
      >
        <Panel
          className="divide-x rounded border bg-background px-3 py-1 shadow-xl"
          position="top-right"
        >
          <button className="pr-2" onClick={onSave}>
            save
          </button>
          <button className="pl-2" onClick={onRestore}>
            restore
          </button>
        </Panel>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
