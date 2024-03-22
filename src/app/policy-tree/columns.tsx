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

export type User = {
  id: string;
  Carrier: string;
  Type: string;
  Amount: number;
  Owner: string;
  Beneficiary: string;
  Payor: string;
  Anniversary: string;
  Insured: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "Carrier",
    header: "Carrier",
  },
  {
    accessorKey: "Type",
    header: "Type",
  },
  {
    accessorKey: "Amount",
    header: () => <div>Amount</div>,
    cell: ({ row }) => {
      const amountValue = row.getValue("Amount") as number;
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amountValue);
      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "Owner",
    header: "Owner",
  },
  {
    accessorKey: "Beneficiary",
    header: "Beneficiary",
  },
  {
    accessorKey: "Payor",
    header: "Payor",
  },
  {
    accessorKey: "Anniversary",
    header: "Anniversary",
    cell: ({ row }) => {
      const date = new Date(row.getValue("Anniversary"));
      const formatted = date.toLocaleDateString("en-US");
      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "Insured",
    header: "Insured",
  },
];

export { TableActionsProvider };

