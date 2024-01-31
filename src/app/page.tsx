"use client";
import { useState } from "react";
import { OrgChartNode } from "./type";
import OrgChartPage from "./org-chart/page";
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

export default function Home() {
  const [orgChartInitialData, setOrgChartInitialData] =
    useState<OrgChartNode[]>(initialData);

  return (
    <>
      <div className=" flex justify-center my-5">
        <h1 className=" text-4xl font-bold">This is the Org Chart</h1>
      </div>
      <div>
        <OrgChartPage data={orgChartInitialData} />
      </div>
    </>
  );
}
