"use client";

import { Button } from "@/components/ui/button";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { usePolicyTreeStore } from "./policy-tree-store";

const policyTreeFormSchema = z.object({
  carrier: z.string(),
  type: z.string(),
  amount: z.string(),
  owner: z.string(),
  beneficiary: z.string(),
  payor: z.string(),
  anniversary: z.string(),
  insured: z.string(),
});
type policyTreeFormSchema = z.infer<typeof policyTreeFormSchema>;

export default function PolicyTreeForm() {
  const addPolicy = usePolicyTreeStore((s) => s.addRow);
  const form = useForm<policyTreeFormSchema>({
    resolver: zodResolver(policyTreeFormSchema),
    defaultValues: {
      carrier: "",
      type: "",
      amount: "0",
      owner: "",
      beneficiary: "",
      payor: "",
      anniversary: "",
      insured: "",
    },
  });
  function onSubmit(values: policyTreeFormSchema) {
    console.log(values);
    addPolicy({ ...values, amount: +values.amount });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <p className=""></p>
        <FormField
          control={form.control}
          name="carrier"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Carrier" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Type" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="number" placeholder="Amount" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="owner"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Owner" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="beneficiary"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Beneficiary" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="payor"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Payor" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="anniversary"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="date" placeholder="Anniversary" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="insured"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Insured" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size="lg"
          className="w-full"
          data-test="add-button"
        >
          Add
        </Button>
      </form>
    </Form>
  );
}
