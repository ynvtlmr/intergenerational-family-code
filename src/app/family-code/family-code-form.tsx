"use client";

import { addStatement } from "./actions";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import FormSubmitButton from "@/components/form-submit-button";

const familyStatementFormSchema = z.object({
  statement: z
    .string()
    .min(2, {
      message: "Statement must be greater than 2 characters.",
    })
    .max(250, {
      message: "Statement must be less than 250 characters.",
    }),
});
export type InsertFamilyStatement = z.infer<typeof familyStatementFormSchema>;

export default function FamilyCodeForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<InsertFamilyStatement>({
    resolver: zodResolver(familyStatementFormSchema),
    defaultValues: {
      statement: "",
    },
  });
  async function onSubmit(formData: InsertFamilyStatement) {
    setIsSubmitting(true);
    await addStatement(formData);
    form.reset();
    setIsSubmitting(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <h1 className="text-2xl font-bold">Family Code</h1>
        <p>Add a statement that your family commits to.</p>
        <FormField
          control={form.control}
          name="statement"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  data-test="statement-textarea"
                  placeholder="The Stark family commits to excellence in that which is most impactful."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormSubmitButton
          disabled={isSubmitting}
          defaultText="Add Statement"
          loadingText="Adding..."
        />
      </form>
    </Form>
  );
}
