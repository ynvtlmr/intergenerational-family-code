<<<<<<< HEAD
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
=======
import "./globals.css";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/decision-tree", label: "Decision Tree" },
  { href: "/family-values", label: "Family Values" },
  { href: "/family-code", label: "Family Code" },
  { href: "/family-vision", label: "Family Vision" },
  { href: "/family-tree", label: "Family Tree" },
  { href: "/family-crest", label: "Family Crest" },
  { href: "/family-garden", label: "Family Garden" },
  { href: "/org-chart", label: "Organizational Chart" },
]

export default async function Home() {
  return (
    <main className="max-w-4xl mx-auto pt-20 px-2">
      <h1 className="font-bold text-4xl mb-8 text-center">Intergenerational Family Code</h1>
      <div className="flex flex-col gap-2 justify-center max-w-xl mx-auto">
        {
links.map((link) => (
  <Button key={link.label}><Link className="w-full" href={link.href}>{link.label}</Link></Button>
  ))}
      </div>
    </main>
>>>>>>> 8425f0c3bc30b56a99b1bec4703d24f2dc3caff8
  );
}
