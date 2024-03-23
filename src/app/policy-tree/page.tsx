"use client";

import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { TableActionsProvider, columns } from "./columns";
import { usePolicyTreeStore } from "./policy-tree-store";
import PolicyTreeForm from "./policy-tree-form";

export default function PolicyComponent() {
  const data = usePolicyTreeStore((s) => s.data);
  const deleteRow = usePolicyTreeStore((s) => s.deleteRow);

  const handleDelete = (owner: string) => {
    deleteRow(owner);
  };

  return (
    <TableActionsProvider>
      <section className="py-24">
        <div className="container">
          <h1 className="mb-8 text-center text-5xl font-bold">Policy Tree</h1>
          <PolicyTreeForm />
          <DataTable
            columns={[
              {
                id: "id",
                header: "ID",
                cell: ({ row }) => {
                  return <div>{row.id}</div>;
                },
              },
              ...columns,
              {
                id: "actions",
                header: "Actions",
                cell: ({ row }) => (
                  <div>
                    <Button onClick={() => handleDelete(row.original.owner)}>
                      Delete
                    </Button>
                  </div>
                ),
              },
            ]}
            data={data}
          />
        </div>
      </section>
    </TableActionsProvider>
  );
}
