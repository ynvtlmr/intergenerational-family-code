"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";

import FormSubmitButton from "./form-submit-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { generateCrest } from "./actions";
import { useFamilyCrest } from "./family-crest-store";

const formSchema = z.object({
  name: z.string(),
  symbol: z.string(),
  color: z.string(),
  animal: z.string().optional(),
  motto: z.string().optional(),
  details: z.string().optional(),
});

export type FormSchema = z.infer<typeof formSchema>;

export default function FamilyCrestForm() {
  const { updateCrest } = useFamilyCrest();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Stark",
      symbol: "Sword",
      color: "Blue, Red",
      animal: "Eagle, Lion",
      motto: "Unity in Love, Strength in Respect",
      details: "Flames coming off both sides of the sword",
    },
  });

  async function onSubmit(values: FormSchema) {
    setIsSubmitting(true);
    const generatedCrest = await generateCrest(values);
    if (generatedCrest) {
      updateCrest(generatedCrest);
    }
    setIsSubmitting(false);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Family Name</FormLabel>
              <FormControl>
                <Input placeholder="Stark" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="symbol"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Symbol</FormLabel>
              <FormControl>
                <Input placeholder="Sword" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="color"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Colors</FormLabel>
              <FormControl>
                <Input placeholder="Red, Blue" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="animal"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Animal</FormLabel>
              <FormControl>
                <Input placeholder="Eagle, Lion" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="motto"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Family Motto</FormLabel>
              <FormControl>
                <Input
                  placeholder="Unity in Love, Strength in Respect"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="details"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Details</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Flames coming off both sides of the sword"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormSubmitButton
          disabled={isSubmitting}
          loadingText="Generating..."
          defaultText="Generate"
        />
      </form>
    </Form>
  );
}
