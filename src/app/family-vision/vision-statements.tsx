"use client";
import FormItem from "@/components/form-item";
import { useFamilyVisionStore } from "./family-vision-store";

export default function VisionStatements() {
  const visionStatements = useFamilyVisionStore((s) => s.visionStatements);

  const deleteVisionStatement = useFamilyVisionStore(
    (s) => s.deleteVisionStatement
  );

  const handleDelete = (s: string) => {
    deleteVisionStatement(s);
  };

  return (
    <ul className="mb-10 mt-5 space-y-5">
      {visionStatements.map((s) => (
        <FormItem key={s} title={s} handleDelete={() => handleDelete(s)} />
      ))}
    </ul>
  );
}
