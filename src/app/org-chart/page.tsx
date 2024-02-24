"use client";

import { ReactFlowProvider } from "reactflow";
import OrgChartFlow from "./org-chart-flow";


export default function OrgChartPage() {
  return (
    <ReactFlowProvider>
      <OrgChartFlow />
    </ReactFlowProvider>
  );
}
