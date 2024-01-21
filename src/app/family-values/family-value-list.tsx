import { useFamilyValues } from "./family-value-store";
import { Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FamilyValueList() {
  const { values, deleteFamilyValue } = useFamilyValues();

  const handleDelete = (value: string) => {
    deleteFamilyValue(value);
  };
  return (
    <ul className="space-y-5 mt-5">
      {Array.from(values).map((value) => (
        <li
          key={value}
          className="flex items-center justify-between border rounded-lg p-5"
        >
          <p className="text-xl">{value}</p>
          <Button variant="destructive" onClick={() => handleDelete(value)}>
            <Trash2Icon size={24} />
          </Button>
        </li>
      ))}
    </ul>
  );
}
