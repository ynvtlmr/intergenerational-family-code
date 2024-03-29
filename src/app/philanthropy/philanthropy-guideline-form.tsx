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
import { usePhilanthropyStore } from "./philanthropy-store";
import { Textarea } from "@/components/ui/textarea";

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
type PhilanthropyGuidelineFormSchema = z.infer<
  typeof philanthropyGuidelineFormSchema
>;

export default function PhilanthropyGuidelineForm() {
  const addGuideline = usePhilanthropyStore((s) => s.addGuideline);

  const form = useForm<PhilanthropyGuidelineFormSchema>({
    resolver: zodResolver(philanthropyGuidelineFormSchema),
    defaultValues: {
      guideline: "",
    },
  });
  function onSubmit({ guideline }: PhilanthropyGuidelineFormSchema) {
    addGuideline(guideline);
    form.reset();
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
