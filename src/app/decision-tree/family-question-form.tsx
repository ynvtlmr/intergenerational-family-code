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
import { useDecisionTreeStore } from "./family-questions-store";
import { Textarea } from "@/components/ui/textarea";

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
  const addQuestion = useDecisionTreeStore((s) => s.addQuestion);

  const form = useForm<familyQuestionFormSchema>({
    resolver: zodResolver(familyQuestionFormSchema),
    defaultValues: {
      question: "",
    },
  });
  function onSubmit({ question }: familyQuestionFormSchema) {
    addQuestion(question);
    form.reset();
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
