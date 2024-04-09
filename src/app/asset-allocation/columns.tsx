// "use client";

import { ColumnDef } from "@tanstack/react-table";
import DeleteRowButton from "@/components/delete-row-button";
import { deleteAssetAllocation } from "./actions";
import { InsertAssetAllocation } from "./asset-allocation-form";

interface AssetAllocationTableRow extends InsertAssetAllocation {
  id: number;
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
