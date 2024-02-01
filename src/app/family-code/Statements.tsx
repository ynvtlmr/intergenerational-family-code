"use client";

import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useFamilyCode } from "./family-code-store";

export default function Statements() {
    const { statements, deleteStatement } = useFamilyCode();

    const handleDelete = (s: string) => {
        deleteStatement(s);
    };
    
    return (
      <ul className="space-y-5 mt-5 mb-10">
      {statements.map((s) => (
        <li key={s} className="border rounded-lg p-5">
          <h2 className="text-xl">{s}</h2>
          <div className="flex justify-end mt-5">
            <Button variant="destructive" onClick={() => handleDelete(s)}>
              <Trash2Icon size={24} />
            </Button>
          </div>
        </li>
      ))}
    </ul>
  )
}