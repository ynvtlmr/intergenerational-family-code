"use client"

import { ColumnDef } from "@tanstack/react-table"

export type User = {
  id: number
  Carrier: string
  Type: string
  Amount: number
  Owner: string
  Beneficiary: string
  Payor:  string    
  Anniversary: string
  Insured: string
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "ID",
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

      return <div className="text-left font-medium">{formatted}</div>;}
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
            const date = new Date(row.getValue('Anniversary'));
            const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
            const formatted = date.toLocaleDateString();
            return <div className="text-left font-medium">{formatted}</div>;
        }
    }
    ,
      {
        accessorKey: "Insured",
        header: "Insured",
      },
]
