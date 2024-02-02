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
    const updateNode = (nodes: OrgChartNode[]): OrgChartNode[] => {
      return nodes.map((node) => {
        if (node.id === parentId) {
          return {
            ...node,
            children: node.children ? [...node.children, newNode] : [newNode],
          };
        }

        if (node.children) {
          return { ...node, children: updateNode(node.children) };
        }
        return node;
      });
    };
    setOrgChartInitialData(updateNode(orgChartInitialData));
  };

  // delete node from org chart

  const deleteNodeFromOrgChart = (nodeId: number) => {
    const removeNode = (nodes: OrgChartNode[]): OrgChartNode[] => {
      return nodes.reduce((acc, node) => {
        if (node.id !== nodeId) {
          if (node.children) {
            node = { ...node, children: removeNode(node.children) };
          }
          acc.push(node);
        }
        return acc;
      }, [] as OrgChartNode[]);
    };

    setOrgChartInitialData(removeNode(orgChartInitialData));
  };
  

  return (
    <div>
      <OrgChart data={orgChartInitialData} onAddNode={addNodeToOrgChart} onDeleteNode={deleteNodeFromOrgChart}/>
    </div>
  );
}
