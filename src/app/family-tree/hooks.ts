import {
  Connection,
  Node,
  Edge,
  OnConnectStartParams,
  addEdge,
  useReactFlow,
} from "reactflow";

import { Dispatch, SetStateAction, useCallback, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";

export function useAddNodeOnEdgeDrop(
  setEdges: Dispatch<SetStateAction<Edge<any>[]>>,
  setNodes: Dispatch<SetStateAction<Node<any, string | undefined>[]>>,
  getId: () => string
) {
  const connectingNodeId = useRef<string | null>(null);
  const { screenToFlowPosition } = useReactFlow();

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
    [setNodes, setEdges, screenToFlowPosition, getId]
  );

  return {
    onConnect,
    onConnectStart,
    onConnectEnd,
  };
}

export function useSaveAndRestore(
  setNodes: Dispatch<SetStateAction<Node<any, string | undefined>[]>>,
  setEdges: Dispatch<SetStateAction<Edge<any>[]>>
) {
  const { setViewport, toObject } = useReactFlow();
  const { toast } = useToast();

  const onSave = useCallback(() => {
    // creates a JSON-compatible representation of the flow
    const flow = toObject();
    localStorage.setItem("family-tree", JSON.stringify(flow));
    toast({ title: "Your flow has been saved." });
  }, [toObject, toast]);

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

  return {
    onSave,
    onRestore,
  };
}
