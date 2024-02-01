
import { OrganizationChart } from "primereact/organizationchart";
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
  return (
    <>
    <div className=" flex justify-center my-5">
      <h1 className="text-4xl font-bold">Organizational Chart</h1>
    </div>
      <OrganizationChart value={initialData} />
    </>
  );
}
