"use client";

import { Person, useFamilyGardenStore } from "./family-garden-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DeletePersonTableButton, PersonTable } from "./person-table";
import MoneyInput from "./money-input";

export default function FamilyGarden() {
  const growthRate = useFamilyGardenStore((state) => state.growthRate);
  const setGrowthRate = useFamilyGardenStore((s) => s.setGrowthRate);
  const people = useFamilyGardenStore((state) => state.people);

  return (
    <main className="mt-6 p-10">
      <h1 className="mb-2 text-3xl font-bold">Family Garden</h1>
      <Label className="mb-2">Growth Rate</Label>
      <div className="flex items-center gap-2">
        <Input
          className="w-20"
          type="number"
          min="0"
          max="100"
          value={growthRate}
          onChange={(e) => setGrowthRate(+e.target.value)}
        />
        <span>%</span>
      </div>
      <PersonForm />
      <div className="mt-10 space-y-10">
        {people.map((person) => (
          <>
            <div className="mb-4 flex items-center justify-between gap-2">
              <h2 className="text-2xl font-semibold">{person.name}</h2>
              <DeletePersonTableButton name={person.name} />
            </div>
            <PersonTable key={person.name} person={person} />
          </>
        ))}
      </div>
    </main>
  );
}

const personFormSchema = z.object({
  name: z.string().min(2).max(50),
  beginAge: z.coerce.number().min(0).max(100),
  beginAmount: z.coerce.number().min(0.01, "Must be greater than 0"),
});

type PersonFormSchema = z.infer<typeof personFormSchema>;

function PersonForm() {
  const form = useForm<PersonFormSchema>({
    resolver: zodResolver(personFormSchema),
    defaultValues: {
      name: "",
      beginAge: 30,
      beginAmount: 0,
    },
  });
  const addPerson = useFamilyGardenStore((s) => s.addPerson);
  function onSubmit(values: PersonFormSchema) {
    addPerson(values);
    form.reset();
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 space-y-8 rounded-lg border p-10"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Smith" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="beginAge"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Begin Age</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  placeholder="30"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <MoneyInput
          form={form}
          label="Begin Amount"
          name="beginAmount"
          placeholder="$0.00"
        />
        <Button type="submit">Add Person</Button>
      </form>
    </Form>
  );
}
