import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { User, columns } from "./columns";

const policyData: User[] = [];

export default function PolicyComponent() {
  return (
    <section className="py-24">
      <div className="container">
        <h1 className="mb-8 text-center text-5xl font-bold">Policy Tree</h1>
        <DataTable columns={columns} data={policyData} />
      </div>
    </section>
  );
}
