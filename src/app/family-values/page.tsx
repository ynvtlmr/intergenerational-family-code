"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";

export default function FamilyValuesPage() {
  const [value, setValue] = useState<string>("");
  const [values, setValues] = useState<Set<string>>(new Set([]));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (value.trim().length <= 2) return;
    setValues((values) => values.add(value));
    setValue("");
  };

  const handleDelete = (value: string) => {
    setValues((values) => {
      values.delete(value);
      return new Set(values);
    });
  };

  return (
    <main className="max-w-xl mx-auto mt-20 px-2">
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
    </main>
  );
}
