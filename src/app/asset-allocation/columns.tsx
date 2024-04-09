// "use client";

// import { ColumnDef } from "@tanstack/react-table";
// import { PolicyTreeTableRow } from "./policy-tree-store";
// import DeleteRowButton from "./delete-row-button";

// interface AssetAllocationTableRow {}

// export const assetAllocationColumns: ColumnDef<AssetAllocationTableRow>[] = [
//   {
//     accessorKey: "carrier",
//     header: "Carrier",
//   },
//   {
//     accessorKey: "type",
//     header: "Type",
//   },
//   {
//     accessorKey: "amount",
//     header: "Amount",
//     cell: ({ row }) => {
//       const amountValue = row.original.amount;
//       const formatted = new Intl.NumberFormat("en-US", {
//         style: "currency",
//         currency: "USD",
//       }).format(+amountValue);
//       return <div className="text-left font-medium">{formatted}</div>;
//     },
//   },
//   {
//     accessorKey: "owner",
//     header: "Owner",
//   },
//   {
//     accessorKey: "beneficiary",
//     header: "Beneficiary",
//   },
//   {
//     accessorKey: "payor",
//     header: "Payor",
//   },
//   {
//     accessorKey: "anniversary",
//     header: "Anniversary",
//     cell: ({ row }) => {
//       const date = new Date(row.original.anniversary);
//       const formatted = date.toLocaleDateString();
//       return <div className="text-left font-medium">{formatted}</div>;
//     },
//   },
//   {
//     accessorKey: "insured",
//     header: "Insured",
//   },
// ];

// export const policyTreeColumnsWithDelete: ColumnDef<PolicyTreeTableRow>[] = [
//   ...policyTreeColumns,
//   {
//     id: "actions",
//     header: "Actions",
//     cell: ({ row }) => (
//       <div>
//         <DeleteRowButton id={row.original.id} />
//       </div>
//     ),
//   },
// ];
