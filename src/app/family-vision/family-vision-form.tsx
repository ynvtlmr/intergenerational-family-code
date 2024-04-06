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
import { Textarea } from "@/components/ui/textarea";
import { addStatement } from "./actions";
import FormSubmitButton from "@/components/form-submit-button";
import { useState } from "react";

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
type FamilyStatementFormSchema = z.infer<typeof familyStatementFormSchema>;

export default function FamilyVisionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<FamilyStatementFormSchema>({
    resolver: zodResolver(familyStatementFormSchema),
    defaultValues: {
      statement: "",
    },
  });
  async function onSubmit({ statement }: FamilyStatementFormSchema) {
    setIsSubmitting(true);
    await addStatement(statement);
    form.reset();
    setIsSubmitting(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <h1 className="text-2xl font-bold">Family Vision</h1>
        <p>Add a statement that defines your family&apos;s vision.</p>
        <FormField
          control={form.control}
          name="statement"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  data-test="statement-textarea"
                  placeholder="To be a family that is very deeply connected by love and meaning."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormSubmitButton
          defaultText="Add Statement"
          loadingText="Adding..."
          disabled={isSubmitting}
        />
      </form>
    </Form>
  );
}
