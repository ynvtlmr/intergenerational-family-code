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
import { useFamilyCodeStore } from "./family-code-store";
import { Textarea } from "@/components/ui/textarea";
import { addStatement } from "./actions";

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
  const form = useForm<InsertFamilyStatement>({
    resolver: zodResolver(familyStatementFormSchema),
    defaultValues: {
      statement: "",
    },
  });
  async function onSubmit(formData: InsertFamilyStatement) {
    await addStatement(formData);
    form.reset();
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
