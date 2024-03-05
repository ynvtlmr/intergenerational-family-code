"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

import { signInWithEmailAndPassword, auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;

export default function LoginForm() {
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { replace } = useRouter();

  async function onSubmit({ email, password }: LoginFormSchema) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    replace("/decision-tree");
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto grid w-full max-w-lg items-center gap-4"
      >
        <h1 className="mb-4 text-center text-3xl font-bold">Login</h1>
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
        <Button>Login</Button>
      </form>
    </Form>
  );
}
