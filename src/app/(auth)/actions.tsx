"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function login(email: string, password: string) {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { message: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/decision-tree");
}

export async function signup(email: string, password: string) {
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return { message: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/decision-tree");
}

export async function signout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
