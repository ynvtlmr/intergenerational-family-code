"use client";

import { useFamilyValueStore } from "./family-value-store";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

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

export default function FamilyValueForm() {
  const values = useFamilyValueStore((s) => s.values);
  const addFamilyValue = useFamilyValueStore((s) => s.addValue);
  const familyValueFormSchema = z.object({
    value: z
      .string()
      .min(2, {
        message: "Value must be greater than 2 characters.",
      })
      .max(50, {
        message: "Value must be less than 50 characters.",
      })
      .refine((v) => !values[v], {
        message: "Value already exists.",
      }),
    description: z
      .string()
      .min(2, {
        message: "Description must be greater than 2 characters.",
      })
      .max(200, {
        message: "Description must be less than 200 characters.",
      }),
  });
  type FamilyValueFormSchema = z.infer<typeof familyValueFormSchema>;
  const form = useForm<FamilyValueFormSchema>({
    resolver: zodResolver(familyValueFormSchema),
    defaultValues: {
      value: "",
      description: "",
    },
  });

  function onSubmit(formData: FamilyValueFormSchema) {
    addFamilyValue(formData);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <h1 className="text-2xl font-bold">What are your family values?</h1>
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  data-test="family-value-title-input"
                  placeholder="Title"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  data-test="family-value-description-textarea"
                  placeholder="Enter a short description..."
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
