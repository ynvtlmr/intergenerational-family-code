"use client";
import { useFamilyValueStore } from "./family-value-store";
import FormItem from "@/components/form-item";

export default function FamilyValueList() {
  const values = useFamilyValueStore((s) => s.values);
  const deleteFamilyValue = useFamilyValueStore((s) => s.deleteValue);

  const handleDelete = (value: string) => {
    deleteFamilyValue(value);
  };
  return (
    <ul className="mb-10 mt-5 space-y-5">
      {Object.keys(values).map((value) => (
        <FormItem
          key={value}
          title={value}
          desc={values[value]}
          handleDelete={() => handleDelete(value)}
        />
      ))}
    </ul>
  );
}
