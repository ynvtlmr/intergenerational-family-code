"use client";
import { useFamilyValues } from "./family-value-store";
import FormItem from "@/components/form-item";

export default function FamilyValueList() {
  const { values, deleteFamilyValue } = useFamilyValues();

  const handleDelete = (value: string) => {
    deleteFamilyValue(value);
  };
  return (
    <ul className="space-y-5 mt-5 mb-10">
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
