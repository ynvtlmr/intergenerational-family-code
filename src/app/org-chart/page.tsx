"use client";

import { useState } from "react";
import OrgChart from "./org-chart";
import { OrgChartNode } from "../../../types/questions";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";


const initialData: OrgChartNode[] = [
  {
    id: 1,
    label: "Stark Industries",
    children: [
      {
        id: 2,
        label: "Stark Corporation",
        children: [
          { id: 5, label: "Stark Bank" },
          { id: 6, label: "Stark Hospital" },
        ],
      },
      {
        id: 3,
        label: "Peter Park Corporation",
        children: [
          { id: 7, label: "Peter Parker Bank " },
          { id: 8, label: "Peter Parker Hospitals" },
        ],
      },
      {
        id: 4,
        label: "Tony Stark Corporation",
        children: [{ id: 9, label: "Tony Bank" }],
      },
    ],
  },
];


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

  return (
    <div>
      <OrgChart data={orgChartInitialData} onAddNode={addNodeToOrgChart} />
    </div>
  );
}
