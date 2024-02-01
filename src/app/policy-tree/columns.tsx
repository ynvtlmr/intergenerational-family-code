"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {
  id: string
  Carrier: string
  Type: string
  amount: number
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
        header: "Amount",
        cell: ({ row }) => {
                const amount = parseFloat(row.getValue("amount"))
                const formatted = new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(amount)
           
                return <div className="text-right font-medium">{formatted}</div> }
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
            return <div className="text-right font-medium">{formatted}</div>;
        }
    }
    ,
      {
        accessorKey: "Insured",
        header: "Insured",
      },
]
