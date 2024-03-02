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
type ImpactStatementFormSchema = z.infer<typeof impactStatementFormSchema>;

export default function ImpactStatementForm() {
  const updateImpactStatement = usePhilanthropyStore(
    (s) => s.updateImpactStatement
  );
  const impactStatement = usePhilanthropyStore((s) => s.impactStatement);
  const setEditImpactStatement = usePhilanthropyStore(
    (s) => s.setEditImpactStatement
  );

  const form = useForm<ImpactStatementFormSchema>({
    resolver: zodResolver(impactStatementFormSchema),
    defaultValues: {
      statement: impactStatement,
    },
  });
  function onSubmit({ statement }: ImpactStatementFormSchema) {
    updateImpactStatement(statement);
    setEditImpactStatement(false);
    form.reset();
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
        <Button
          type="submit"
          size="lg"
          className="w-full"
          data-test="add-button"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
