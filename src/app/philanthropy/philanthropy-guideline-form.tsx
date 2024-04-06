"use client";
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
import { useState } from "react";
import { addGuideline } from "./actions";
import FormSubmitButton from "@/components/form-submit-button";

const philanthropyGuidelineFormSchema = z.object({
  guideline: z
    .string()
    .min(2, {
      message: "Guideline must be greater than 2 characters.",
    })
    .max(250, {
      message: "Guideline must be less than 250 characters.",
    }),
});
export type InsertGuideline = z.infer<typeof philanthropyGuidelineFormSchema>;

export default function PhilanthropyGuidelineForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<InsertGuideline>({
    resolver: zodResolver(philanthropyGuidelineFormSchema),
    defaultValues: {
      guideline: "",
    },
  });
  async function onSubmit(formData: InsertGuideline) {
    setIsSubmitting(true);
    await addGuideline(formData);
    form.reset();
    setIsSubmitting(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <h2 className="text-lg font-semibold">Guidelines</h2>
        <FormField
          control={form.control}
          name="guideline"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  data-test="guideline-textarea"
                  placeholder="Write your guideline here"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormSubmitButton
          disabled={isSubmitting}
          defaultText="Add Guideline"
          loadingText="Adding..."
        />
      </form>
    </Form>
  );
}
