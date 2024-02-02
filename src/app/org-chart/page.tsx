"use client";

import { useState } from "react";
import OrgChart from "./org-chart";
import { OrgChartNode } from "../../../types/questions";
import { initialData } from "./fakeDatabase";


import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function OrgChartPage() {
  const [orgChartInitialData, setOrgChartInitialData] = useState<OrgChartNode[]>(initialData);

  const addNodeToOrgChart = (parentId: number, newNode: OrgChartNode) => {
    const updateNode = (nodes: OrgChartNode[]): OrgChartNode[] =>
      nodes.map(node => ({
        ...node,
        children: node.id === parentId
          ? [...(node.children || []), newNode]
          : node.children ? updateNode(node.children) : undefined
      }));
    
    setOrgChartInitialData(updateNode(orgChartInitialData));
  };

  // delete node from org chart

  const deleteNodeFromOrgChart = (nodeId: number) => {
    const removeNode = (nodes: OrgChartNode[]): OrgChartNode[] => {
      return nodes.filter(node => node.id !== nodeId)
      .map(node => ({
        ...node,
        children: node.children? removeNode(node.children) : undefined
      }));
    };
    setOrgChartInitialData(removeNode(orgChartInitialData));
  };
  

  return (
    <div>
      <OrgChart data={orgChartInitialData} onAddNode={addNodeToOrgChart} onDeleteNode={deleteNodeFromOrgChart}/>
    </div>
  );
}
