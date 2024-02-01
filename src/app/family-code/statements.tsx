"use client";
import { useFamilyCode } from "./family-code-store";
import FormItem from "@/components/form-item";

export default function Statements() {
    const { statements, deleteStatement } = useFamilyCode();

    const handleDelete = (s: string) => {
        deleteStatement(s);
    };
    
    return (
      <ul className="space-y-5 mt-5 mb-10">
      {statements.map((s) => (
        <FormItem
          key={s}
          title={s}
          handleDelete={() => handleDelete(s)}
        />
      ))}
    </ul>
  )
}