"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

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
import { addFamilyValue } from "./actions";
import { useState } from "react";
import FormSubmitButton from "@/components/form-submit-button";

const familyValueFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Value must be greater than 2 characters.",
    })
    .max(50, {
      message: "Value must be less than 50 characters.",
    }),
  description: z
    .string()
    .min(2, {
      message: "Description must be greater than 2 characters.",
    })
    .max(250, {
      message: "Description must be less than 250 characters.",
    }),
});
export type InsertFamilyValue = z.infer<typeof familyValueFormSchema>;

export default function FamilyValueForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<InsertFamilyValue>({
    resolver: zodResolver(familyValueFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  async function onSubmit(formData: InsertFamilyValue) {
    setIsSubmitting(true);
    await addFamilyValue(formData);
    form.reset();
    setIsSubmitting(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <h1 className="text-2xl font-bold">What are your family values?</h1>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  data-test="family-value-title-input"
                  placeholder="Title"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  data-test="family-value-description-textarea"
                  placeholder="Enter a short description..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormSubmitButton
          loadingText="Adding..."
          defaultText="Add Family Value"
          disabled={isSubmitting}
        />
      </form>
    </Form>
  );
}
