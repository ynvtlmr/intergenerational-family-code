"use client";

import { useState } from "react";
import OrgChart from "./org-chart";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

type OrgChartNode = {
  id: number;
  label: string;
  children?: OrgChartNode[];
};

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
  const [orgChartInitialData, setOrgChartInitialData] =
    useState<OrgChartNode[]>(initialData);

  const addNodeToOrgChart = (parentId: number, newNode: OrgChartNode) => {
    const updateNode = (nodes: OrgChartNode[]): OrgChartNode[] =>
      nodes.map((node) => ({
        ...node,
        children:
          node.id === parentId
            ? [...(node.children || []), newNode]
            : node.children
              ? updateNode(node.children)
              : undefined,
      }));
    setOrgChartInitialData(updateNode(orgChartInitialData));
  };

  // delete node from org chart

  const deleteNodeFromOrgChart = (nodeId: number) => {
    const removeNode = (nodes: OrgChartNode[]): OrgChartNode[] => {
      return nodes
        .filter((node) => node.id !== nodeId)
        .map((node) => ({
          ...node,
          children: node.children ? removeNode(node.children) : undefined,
        }));
    };
    setOrgChartInitialData(removeNode(orgChartInitialData));
  };

  return (
    <div>
      <OrgChart
        data={orgChartInitialData}
        onAddNode={addNodeToOrgChart}
        onDeleteNode={deleteNodeFromOrgChart}
      />
    </div>
  );
}
