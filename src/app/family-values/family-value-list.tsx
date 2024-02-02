"use client";
import { useFamilyValues } from "./family-value-store";
import { Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FamilyValueList() {
  const { values, deleteFamilyValue } = useFamilyValues();

  const handleDelete = (value: string) => {
    deleteFamilyValue(value);
  };
  return (
    <ul className="space-y-5 mt-5 mb-10">
      {Object.keys(values).map((value) => (
        <li key={value} className="border rounded-lg p-5">
          <h2 className="text-xl">{value}</h2>
          <p className="text-gray-500 dark:text-gray-400">{values[value]}</p>
          <div className="flex justify-end mt-5">
            <Button variant="destructive" onClick={() => handleDelete(value)}>
              <Trash2Icon size={24} />
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}
