
import { OrganizationChart } from "primereact/organizationchart";

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
  return (
    <div>
      <OrganizationChart value={initialData} />
    </div>
  );
}
