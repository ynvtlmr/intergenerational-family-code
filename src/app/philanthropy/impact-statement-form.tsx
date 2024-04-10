"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { addImpactStatement } from "./actions";

import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import FormSubmitButton from "@/components/form-submit-button";

const impactStatementFormSchema = z.object({
  statement: z
    .string()
    .min(2, {
      message: "The statement must be greater than 2 characters.",
    })
    .max(250, {
      message: "The statement must be less than 250 characters.",
    }),
});
export type InsertImpactStatement = z.infer<typeof impactStatementFormSchema>;

export default function ImpactStatementForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<InsertImpactStatement>({
    resolver: zodResolver(impactStatementFormSchema),
    defaultValues: {
      statement: "",
    },
  });
  async function onSubmit(formData: InsertImpactStatement) {
    setIsSubmitting(true);
    await addImpactStatement(formData);
    form.reset();
    setIsSubmitting(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mb-10 space-y-5 rounded-lg border p-5"
      >
        <FormField
          control={form.control}
          name="statement"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  data-test="impact-statement-textarea"
                  placeholder="To enhance the world in longevity and capabilities
through health sciences and education"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormSubmitButton
          disabled={isSubmitting}
          defaultText="Add Impact Statement"
          loadingText="Adding..."
        />
      </form>
    </Form>
  );
}
