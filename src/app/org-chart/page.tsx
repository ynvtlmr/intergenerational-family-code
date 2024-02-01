<<<<<<< HEAD
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
=======
export default function OrganizationPage() {
  return <div>This is the Organization Page</div>;
>>>>>>> 8425f0c3bc30b56a99b1bec4703d24f2dc3caff8
}
