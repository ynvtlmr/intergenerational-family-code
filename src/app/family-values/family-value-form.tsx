"use client";

import { useState } from "react";
import { useFamilyValues } from "./family-value-store";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function FamilyValueForm() {
  const [value, setValue] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const { values, addFamilyValue } = useFamilyValues();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (value.trim().length <= 2) return;
    if (description.trim().length <= 2) return;
    if (values[value]) return;

    addFamilyValue({ value, description });
    setValue("");
    setDescription("");
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
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter a short description..."
      />
      <Button type="submit" size="lg" className="w-full">
        Add
      </Button>
    </form>
  );
}
