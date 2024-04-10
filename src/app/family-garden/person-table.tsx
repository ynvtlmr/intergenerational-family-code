"use client";
import { Person, useFamilyGardenStore } from "./family-garden-store";

export function PersonTable({ person }: { person: Person }) {
  const growthRate = useFamilyGardenStore((s) => s.growthRate);
  const data: Data[] = [];
  for (let age = person.begin_age; age <= 110; age += 10) {
    const netWorthGrowth =
      person.begin_amount *
      Math.pow(1 + growthRate / 100, age - person.begin_age);
    const targetTax = netWorthGrowth * 0.25;
    data.push({
      age,
      netWorthGrowth: `${moneyFormatter.format(netWorthGrowth)}`,
      targetTax: `${moneyFormatter.format(targetTax)}`,
    });
  }

  return (
    <div className="prose-table:my-0">
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
import { Button } from "@/components/ui/button";
import { deletePerson } from "./actions";
import { moneyFormatter } from "@/lib/utils";

interface Data {
  age: number;
  netWorthGrowth: string;
  targetTax: string;
}

export function DeletePersonTableButton({ id }: { id: number }) {
  const handleDelete = async () => {
    await deletePerson(id);
  };

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
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
