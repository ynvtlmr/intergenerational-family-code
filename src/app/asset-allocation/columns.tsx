"use client";

import { ColumnDef } from "@tanstack/react-table";
import DeleteRowButton from "@/components/delete-row-button";
import { deleteAssetAllocation } from "./actions";
import { InsertAssetAllocation } from "./asset-allocation-form";
import { moneyFormatter } from "@/lib/utils";

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
    cell: ({ row }) => {
      const targetAllocation = row.original.target_allocation;
      return <div>{targetAllocation}%</div>;
    },
  },
  {
    accessorKey: "target_net_return",
    header: "Target Net Return",
    cell: ({ row }) => {
      const targetNetReturn = row.original.target_net_return;
      return <div>{targetNetReturn}%</div>;
    },
  },
  {
    accessorKey: "sharpe_ratio_target",
    header: "Sharpe Ratio Target",
    cell: ({ row }) => {
      const sharpeRatioTarget = row.original.sharpe_ratio_target;
      return <div>{moneyFormatter.format(sharpeRatioTarget)}</div>;
    },
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
