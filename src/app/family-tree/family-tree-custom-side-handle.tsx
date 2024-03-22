import { Handle, getConnectedEdges, useNodeId, useStore } from "reactflow";
import type { HandleProps, ReactFlowState } from "reactflow";

import { useMemo } from "react";

const selector = (s: ReactFlowState) => ({
  nodeInternals: s.nodeInternals,
  edges: s.edges,
});

type CustomHandleProps = HandleProps & { connectionLimit?: number };

export default function CustomSideHandle({
  isConnectable,
  connectionLimit,
  ...props
}: CustomHandleProps) {
  const { nodeInternals, edges } = useStore(selector);
  const nodeId = useNodeId();

  const isHandleConnectable = useMemo(() => {
    if (typeof connectionLimit === "number") {
      if (!nodeId) return isConnectable;
      const node = nodeInternals.get(nodeId);
      if (!node) return isConnectable;
      const connectedEdges = getConnectedEdges([node], edges);
      return connectedEdges.length < connectionLimit;
    }
    return isConnectable;
  }, [nodeInternals, edges, nodeId, isConnectable, connectionLimit]);

  return <Handle {...props} isConnectable={isHandleConnectable}></Handle>;
}
