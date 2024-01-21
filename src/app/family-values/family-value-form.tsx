import { useState } from "react";
import { useFamilyValues } from "./family-value-store";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FamilyValueForm() {
  const [value, setValue] = useState<string>("");
  const { addFamilyValue } = useFamilyValues();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (value.trim().length <= 2) return;
    addFamilyValue(value);
    setValue("");
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h1 className="text-2xl font-bold">What are your family values?</h1>
      <Input
        type="text"
        placeholder="Value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button type="submit" className="w-full">
        Add
      </Button>
    </form>
  );
}
