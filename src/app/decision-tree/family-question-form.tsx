"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { addQuestion } from "./actions";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import FormSubmitButton from "@/components/form-submit-button";

const familyQuestionFormSchema = z.object({
  question: z
    .string()
    .min(2, {
      message: "Question must be greater than 2 characters.",
    })
    .max(250, {
      message: "Question must be less than 250 characters.",
    }),
});
type familyQuestionFormSchema = z.infer<typeof familyQuestionFormSchema>;

export default function FamilyQuestionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<familyQuestionFormSchema>({
    resolver: zodResolver(familyQuestionFormSchema),
    defaultValues: {
      question: "",
    },
  });
  async function onSubmit({ question }: familyQuestionFormSchema) {
    setIsSubmitting(true);
    await addQuestion(question);
    form.reset();
    setIsSubmitting(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <h1 className="text-2xl font-bold">Decision Tree</h1>
        <p className="">
          Add a question to help guide your family decision making.
        </p>
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  data-test="question-textarea"
                  placeholder="Does this align with our family values?"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormSubmitButton
          disabled={isSubmitting}
          loadingText="Adding..."
          defaultText="Add Question"
        />
      </form>
    </Form>
  );
}
