import { addEdge, useReactFlow } from "reactflow";
import type { Connection, Node, Edge, OnConnectStartParams } from "reactflow";
import { toast } from "sonner";

import { Dispatch, SetStateAction, useCallback, useRef } from "react";
import { IndividualNode, NodeData } from "./types";

export function useAddNodeOnEdgeDrop(
  setEdges: Dispatch<SetStateAction<Edge<any>[]>>,
  setNodes: Dispatch<SetStateAction<Node<NodeData, string | undefined>[]>>
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
        const id = crypto.randomUUID();
        const newNode: IndividualNode = {
          id,
          type: "customNode",
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
          data: {
            name: "",
            surname: "",
            dateOfBirth: "",
            placeOfBirth: "",
            gender: "Male",
            genderColor: {
              Male: "#9ad3f6",
              Female: "#f6bfba",
            },
          },
          style: { borderRadius: "4px" },
          origin: [0.5, 0.0],
        };

        setNodes((nds: Node<NodeData>[]) => nds.concat(newNode));

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

  return {
    onConnect,
    onConnectStart,
    onConnectEnd,
  };
}

export function useSaveAndRestore(
  setNodes: Dispatch<SetStateAction<Node<NodeData, string | undefined>[]>>,
  setEdges: Dispatch<SetStateAction<Edge<any>[]>>
) {
  const { setViewport, toObject } = useReactFlow();

  const onSave = useCallback(() => {
    // creates a JSON-compatible representation of the flow
    const flow = toObject();
    localStorage.setItem("family-tree", JSON.stringify(flow));
    toast.success("Your flow has been saved.");
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

  return {
    onSave,
    onRestore,
  };
}
