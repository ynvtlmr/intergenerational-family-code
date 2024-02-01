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
      },
      {
        accessorKey: "Insured",
        header: "Insured",
      },
]
