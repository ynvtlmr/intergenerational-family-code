import { OrganizationChart } from "primereact/organizationchart";
import { Button } from "@/components/ui/button";
import OrgChartFormDialog from "./org-chart-form-dialog";
import { OrgChartNode } from "./page";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
      label: "Stark Industries",
    };
    onAddNode(parentId, newNode);
  };

  const nodeTemplate = (node: OrgChartNode) => {
    return (
      <>
        <div>{node.label}</div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Create Node</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue="Stark Industries"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => handleAddNode(node.id)}>
                Add
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className=" grid grid-cols-1">
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
