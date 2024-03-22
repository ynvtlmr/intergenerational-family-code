"use client";

import FormItem from "@/components/form-item";
import { usePhilanthropyStore } from "./philanthropy-store";

export default function Guidelines() {
  const guidelines = usePhilanthropyStore((s) => s.guidelines);
  const deleteGuideline = usePhilanthropyStore((s) => s.deleteGuideline);
  const handleDelete = (g: string) => {
    deleteGuideline(g);
  };

  return (
    <ul className="mb-10 mt-5 space-y-5">
      {guidelines.map((g) => (
        <FormItem key={g} title={g} handleDelete={() => handleDelete(g)} />
      ))}
    </ul>
  );
}
