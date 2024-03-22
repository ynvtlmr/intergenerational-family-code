import React, { createContext, useContext, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { PolicyTreeTableRow } from "./policy-tree-store";

// Define your context
const TableActionsContext = createContext<any>(null);

// Define your provider component
const TableActionsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Your provider logic here
  return (
    <TableActionsContext.Provider value={{}}>
      {children}
    </TableActionsContext.Provider>
  );
};

// Define a hook to use the context
const useTableActions = () => useContext(TableActionsContext);

export const columns: ColumnDef<PolicyTreeTableRow>[] = [
  // {
  //   accessorKey: "id",
  //   header: "ID",
  // },
  {
    accessorKey: "carrier",
    header: "Carrier",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    // cell: ({ row }) => {
    //   const amountValue = row.getValue("Amount") as number;
    //   const formatted = new Intl.NumberFormat("en-US", {
    //     style: "currency",
    //     currency: "USD",
    //   }).format(amountValue);
    //   return <div className="text-left font-medium">{formatted}</div>;
    // },
  },
  {
    accessorKey: "owner",
    header: "Owner",
  },
  {
    accessorKey: "beneficiary",
    header: "Beneficiary",
  },
  {
    accessorKey: "payor",
    header: "Payor",
  },
  {
    accessorKey: "anniversary",
    header: "Anniversary",
    // cell: ({ row }) => {
    //   const date = new Date(row.getValue("1"));
    //   const formatted = date.toLocaleDateString("en-US");
    //   return <div className="text-left font-medium">{formatted}</div>;
    // },
  },
  {
    accessorKey: "insured",
    header: "Insured",
  },
];

export { TableActionsProvider };
