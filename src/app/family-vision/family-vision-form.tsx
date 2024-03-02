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
import { useFamilyVisionStore } from "./family-vision-store";

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
  const addVisionStatement = useFamilyVisionStore((s) => s.addVisionStatement);

  const form = useForm<FamilyStatementFormSchema>({
    resolver: zodResolver(familyStatementFormSchema),
    defaultValues: {
      statement: "",
    },
  });
  function onSubmit({ statement }: FamilyStatementFormSchema) {
    addVisionStatement(statement);
    form.reset();
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
