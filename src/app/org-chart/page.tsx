import { OrgChartNode } from "../type";
import { OrganizationChart } from "primereact/organizationchart";

type OrgChartPageProps = {
  data: OrgChartNode[];
};

export default function OrgChartPage({ data }: OrgChartPageProps) {
  return (
    <div>
      <OrganizationChart value={data} />
    </div>
  );
}
