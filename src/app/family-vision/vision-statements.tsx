"use client";
import FormItem from "@/components/form-item";
import { useFamilyVision } from "./family-vision-store";

export default function VisionStatements() {
    const { visionStatements, deleteVisionStatement } = useFamilyVision();

    const handleDelete = (s: string) => {
        deleteVisionStatement(s);
    };
    
    return (
      <ul className="space-y-5 mt-5 mb-10">
      {visionStatements.map((s) => (
        <FormItem
          key={s}
          title={s}
          handleDelete={() => handleDelete(s)}
        />
      ))}
    </ul>
  )
}