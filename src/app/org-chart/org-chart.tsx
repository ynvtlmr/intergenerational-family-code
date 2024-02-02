import { OrganizationChart } from "primereact/organizationchart";
import { Button } from "@/components/ui/button";
import OrgChartFormDialog from "./org-chart-form-dialog";
import { OrgChartNode } from "./page";

type OrgChartProps = {
  data: OrgChartNode[];
  onAddNode: (parentId: number, newNode: OrgChartNode) => void;
  onDeleteNode: (nodeId: number) => void;
};

export default function OrgChart({
  data,
  onAddNode,
  onDeleteNode,
}: OrgChartProps) {
  const handleAddNode = (parentId: number) => {
    const newNode: OrgChartNode = {
      id: Math.floor(Math.random() * 1000),
      label: "New Node",
    };
    onAddNode(parentId, newNode);
  };

  const nodeTemplate = (node: OrgChartNode) => {
    return (
      <>
        <div>{node.label}</div>

        <div className=" grid grid-cols-1">
          <Button
            className=" gap-2 rounded-md"
            variant="outline"
            onClick={() => handleAddNode(node.id)}
          >
            Create a Node
          </Button>
          <OrgChartFormDialog />
          <Button
            className=" gap-2 rounded-md"
            variant="destructive"
            onClick={() => onDeleteNode(node.id)}
          >
            Delete Node
          </Button>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="my-5 flex justify-center">
        <h1 className="text-4xl font-bold">Organizational Chart</h1>
      </div>
      <OrganizationChart value={data} nodeTemplate={nodeTemplate} />
    </>
  );
}
