"use client";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { useState } from "react";
import FormSubmitButton from "@/components/form-submit-button";
import Link from "next/link";
import { login } from "../actions";
import { useRouter } from "next/navigation";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;

export default function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit({ email, password }: LoginFormSchema) {
    setIsSubmitting(true);

    const error = await login(email, password);
    if (error) {
      setError(error.message);
    }
    setIsSubmitting(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto grid w-full max-w-lg items-center gap-4"
      >
        <h1 className="mb-4 text-center text-3xl font-bold">Login</h1>
        {error && (
          <p className="text-center text-destructive">
            You entered the wrong email or password.
          </p>
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormSubmitButton
          disabled={isSubmitting}
          defaultText="Login"
          loadingText="Logging in..."
        />
        <div className="mt-4 flex gap-2">
          <p>Need to create an account?</p>
          <Link className="text-blue-500 hover:underline" href="/signup">
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
}
