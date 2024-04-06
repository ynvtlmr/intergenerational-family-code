"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addContact } from "./actions";
import { useState } from "react";
import FormSubmitButton from "@/components/form-submit-button";
const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters long",
    })
    .max(50, {
      message: "50 characters long",
    }),
  title: z
    .string()
    .min(5, {
      message: "Job title must be at least 5 characters long",
    })
    .max(50),
  email: z.string().email({ message: "Invalid email" }),
  phone: z
    .string()
    .min(10, {
      message: "Phone number must be at least 10 characters long",
    })
    .max(15),
});

export type InsertContact = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<InsertContact>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      title: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit(values: InsertContact) {
    setIsSubmitting(true);
    await addContact(values);
    form.reset();
    setIsSubmitting(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Jeremy Reinbolt" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Chief Financial Advisor" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="contact@videre.com"
                  type="email"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="604-689-8289" type="tel" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormSubmitButton
          defaultText="Add Contact"
          loadingText="Adding..."
          disabled={isSubmitting}
        />
      </form>
    </Form>
  );
}
