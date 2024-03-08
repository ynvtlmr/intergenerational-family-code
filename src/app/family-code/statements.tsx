"use client";
import { useFamilyCodeStore } from "./family-code-store";
import FormItem from "@/components/form-item";

export default function Statements() {
  const statements = useFamilyCodeStore((s) => s.statements);
  const deleteStatement = useFamilyCodeStore((s) => s.deleteStatement);

  const handleDelete = (s: string) => {
    deleteStatement(s);
  };

  return (
    <ul className="mb-10 mt-5 space-y-5">
      {statements.map((s) => (
        <FormItem key={s} title={s} handleDelete={() => handleDelete(s)} />
      ))}
    </ul>
  );
}
