import { OrganizationChart } from "primereact/organizationchart";
import { Button } from "primereact/button";
import { OrgChartNode } from "../../../types/questions";


type OrgChartProps = {
  data: OrgChartNode[];
  onAddNode: (parentId: number, newNode: OrgChartNode) => void;
}

export default function OrgChart({data, onAddNode}: OrgChartProps) {

  const handleAddNode = (parentId: number) => {
    const newNode: OrgChartNode = {
      id: Math.floor(Math.random() * 1000),
      label: "New Node",
    };
    onAddNode(parentId, newNode);
  };

  const nodeTemplate = (node: OrgChartNode) => {
    return (
      <div>
        <div>{node.label}</div>
        <Button
          label="Add Node"
          onClick={() => handleAddNode(node.id)}
          className=" rounded-md gap-2"
        />
       
      </div>
    );
  };


  return (
    <>
    <div className="flex justify-center my-5">
      <h1 className="text-4xl font-bold">Organizational Chart</h1>
    </div>
     <OrganizationChart value={data} nodeTemplate={nodeTemplate} />
    </>
  )
}