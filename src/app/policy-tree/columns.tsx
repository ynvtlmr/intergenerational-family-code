"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type User = {
  id: string
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
      {
        id: "actions",
        cell: ({ row }) => {
          const user = row.original
     
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(user.id)}
                >
                  Copy user ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View customer</DropdownMenuItem>
                <DropdownMenuItem>View payment details</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      }
]
