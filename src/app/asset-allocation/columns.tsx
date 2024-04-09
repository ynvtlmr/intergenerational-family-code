// "use client";

import { ColumnDef } from "@tanstack/react-table";
import DeleteRowButton from "@/components/delete-row-button";
import { deleteAssetAllocation } from "./actions";

interface AssetAllocationTableRow {
  id: number;
  type: string;
  band: string;
  target_allocation: number;
  target_net_return: number;
  sharpe_ratio_target: number;
}

export const assetAllocationColumns: ColumnDef<AssetAllocationTableRow>[] = [
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "band",
    header: "Band",
  },
  {
    accessorKey: "target_allocation",
    header: "Target Allocation",
  },
  {
    accessorKey: "target_net_return",
    header: "Target Net Return",
  },
  {
    accessorKey: "sharpe_ratio_target",
    header: "Sharpe Ratio Target",
  },
];

export const assetAllocationColumnsWithDelete: ColumnDef<AssetAllocationTableRow>[] =
  [
    ...assetAllocationColumns,
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div>
          <DeleteRowButton
            handleDeleteRow={async () => {
              await deleteAssetAllocation(row.original.id);
            }}
          />
        </div>
      ),
    },
  ];
