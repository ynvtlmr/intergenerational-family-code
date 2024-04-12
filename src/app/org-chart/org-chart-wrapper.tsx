"use client";
import { ReactFlowProvider } from "reactflow";
import OrgChartFlow from "./org-chart-flow";

export default function OrgChartWrapper() {
  return (
    <ReactFlowProvider>
      <OrgChartFlow />
    </ReactFlowProvider>
  );
}
