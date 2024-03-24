"use client";
import React from "react";
import { usePolicyTreeStore } from "./policy-tree-store";
import PolicyTreeForm from "./policy-tree-form";
import { DataTable } from "@/app/policy-tree/data-table";
import { columns } from "./columns";

export default function PolicyPage() {
  const data = usePolicyTreeStore((s) => s.data);
  return (
    <section className="pt-10">
      <div className="container">
        <h1 className="mb-8 text-center text-5xl font-bold">Policy Tree</h1>
        <div className="space-y-10">
          <PolicyTreeForm />
          <div>
            <DataTable columns={columns} data={data} />
          </div>
        </div>
      </div>
    </section>
  );
}
