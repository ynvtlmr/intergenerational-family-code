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
          <PersonTable key={person.name} person={person} />
        ))}
      </div>
    </main>
  );
}

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";

interface Data {
  age: number;
  netWorthGrowth: string;
  targetTax: string;
}

const moneyFormatter = Intl.NumberFormat("en-CA", {
  currency: "CAD",
  currencyDisplay: "symbol",
  currencySign: "standard",
  style: "currency",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function DeletePersonTableButton({ name }: { name: string }) {
  const deletePerson = useFamilyGardenStore((s) => s.deletePerson);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 className="h-6 w-6" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deletePerson(name)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function PersonTable({ person }: { person: Person }) {
  const growthRate = useFamilyGardenStore((s) => s.growthRate);
  const data: Data[] = [];
  for (let age = person.beginAge; age <= 110; age += 10) {
    const netWorthGrowth =
      person.beginAmount *
      Math.pow(1 + growthRate / 100, age - person.beginAge);
    const targetTax = netWorthGrowth * 0.25;
    data.push({
      age,
      netWorthGrowth: `${moneyFormatter.format(netWorthGrowth)}`,
      targetTax: `${moneyFormatter.format(targetTax)}`,
    });
  }

  return (
    <div className="rounded-lg border p-10">
      <div className="mb-4 flex justify-between gap-2">
        <h2 className="text-2xl font-semibold">{person.name}</h2>
        <DeletePersonTableButton name={person.name} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Age</TableHead>
            <TableHead>Net Worth Growth</TableHead>
            <TableHead>Target Tax (25%)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((person, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{person.age}</TableCell>
              <TableCell>{person.netWorthGrowth}</TableCell>
              <TableCell>{person.targetTax}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

const personFormSchema = z.object({
  name: z.string().min(2).max(50),
  beginAge: z.coerce.number().min(0).max(100),
  beginAmount: z.coerce.number().min(0),
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
        <FormField
          control={form.control}
          name="beginAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Begin Amount</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <span>$</span>
                  <Input type="number" placeholder="0" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add Person</Button>
      </form>
    </Form>
  );
}
