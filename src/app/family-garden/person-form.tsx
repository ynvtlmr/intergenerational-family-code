"use client";

import MoneyInput from "../../components/money-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import FormSubmitButton from "@/components/form-submit-button";
import { useState } from "react";
import { addPerson } from "./actions";

const personFormSchema = z.object({
  name: z.string().min(2).max(50),
  beginAge: z.coerce.number().min(0).max(100),
  beginAmount: z.coerce.number().min(0.01, "Must be greater than 0"),
});

export type InsertPerson = z.infer<typeof personFormSchema>;

export default function PersonForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<InsertPerson>({
    resolver: zodResolver(personFormSchema),
    defaultValues: {
      name: "",
      beginAge: 30,
      beginAmount: 0,
    },
  });

  async function onSubmit(values: InsertPerson) {
    setIsSubmitting(true);
    addPerson(values);
    form.reset();
    setIsSubmitting(false);
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
        <FormSubmitButton
          disabled={isSubmitting}
          defaultText="Add Person"
          loadingText="Adding..."
        />
      </form>
    </Form>
  );
}
