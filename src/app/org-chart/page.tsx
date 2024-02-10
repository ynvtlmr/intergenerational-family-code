"use client";

import { ReactFlowProvider } from "reactflow";
import OrgChartFlow from "./org-chart-flow";

export type OrgChartNode = {
  id: number;
  label: string;
  children?: OrgChartNode[];
};

export default function OrgChartPage() {
  return (
    <ReactFlowProvider>
      <OrgChartFlow />
    </ReactFlowProvider>
  );
}
