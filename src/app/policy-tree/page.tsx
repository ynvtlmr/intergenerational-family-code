"use client";

import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { TableActionsProvider, columns } from "./columns";
import { usePolicyTreeStore } from "./policy-tree-store";
import PolicyTreeForm from "./policy-tree-form";

export default function PolicyComponent() {
  // const [policyData, setPolicyData] = useState<User[]>(initialPolicyData);
  // const [editingId, setEditingId] = useState<string | null>(null);
  const data = usePolicyTreeStore((s) => s.data);

  // // Function to handle editing a row
  // const handleEdit = (id: string) => {
  //   setEditingId(id);
  // };

  // // Function to handle saving edited row
  // const handleSaveEdit = (id: string, updatedData: User) => {
  //   const updatedPolicyData = policyData.map((policy) =>
  //     policy.id === id ? { ...policy, ...updatedData } : policy
  //   );
  //   setPolicyData(updatedPolicyData);
  //   setEditingId(null);
  // };

  // // Function to handle deleting a row
  // const handleDelete = (id: string) => {
  //   setPolicyData(policyData.filter((row) => row.id !== id));
  // };

  // // Function to add a new row
  // const addNewRow = () => {
  //   const newPolicy: User = {
  //     id: `${policyData.length}`, // You might want to generate a more unique ID
  //     Carrier: "",
  //     Type: "",
  //     Amount: 0,
  //     Owner: "",
  //     Beneficiary: "",
  //     Payor: "",
  //     Anniversary: new Date().toISOString().slice(0, 10),
  //     Insured: "",
  //   };

  //   setPolicyData([...policyData, newPolicy]);
  // };

  return (
    <TableActionsProvider>
      {" "}
      {/* Wrap the component with the provider */}
      {/*   Carrier: string;
  Type: string;
  Amount: number;
  Owner: string;
  Beneficiary: string;
  Payor: string;
  Anniversary: string;
  Insured: string;
  make me a form
  */}
      <section className="py-24">
        <div className="container">
          <h1 className="mb-8 text-center text-5xl font-bold">Policy Tree</h1>
          <PolicyTreeForm />
          {/* <Button onClick={addNewRow} className="mb-4">
            Add New Policy
          </Button> */}
          <DataTable
            columns={[
              ...columns,
              // {
              //   id: "actions",
              //   header: "Actions",
              //   cell: ({ row }) => (
              //     <div>
              //       {editingId === row.original.id ? (
              //         <>
              //           <Button
              //             onClick={() =>
              //               handleSaveEdit(row.original.id, {
              //                 Carrier: "Updated Carrier",
              //                 id: "",
              //                 Type: "",
              //                 Amount: 0,
              //                 Owner: "",
              //                 Beneficiary: "",
              //                 Payor: "",
              //                 Anniversary: "",
              //                 Insured: "",
              //               })
              //             }
              //           >
              //             Save
              //           </Button>
              //           <Button onClick={() => setEditingId(null)}>
              //             Cancel
              //           </Button>
              //         </>
              //       ) : (
              //         <>
              //           <Button onClick={() => handleEdit(row.original.id)}>
              //             Edit
              //           </Button>
              //           <Button onClick={() => handleDelete(row.original.id)}>
              //             Delete
              //           </Button>
              //         </>
              //       )}
              //     </div>
              //   ),
              // },
            ]}
            data={data}
          />
        </div>
      </section>
    </TableActionsProvider>
  );
}
