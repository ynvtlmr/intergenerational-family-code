"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { InsertContact } from "./contact-form";

export async function addContact(contact: InsertContact) {
  const supabase = createClient();
  const { error } = await supabase.from("contacts").insert(contact);
  if (error) {
    return { message: error.message };
  }
  revalidatePath("/contacts");
}

export async function deleteContact(id: number) {
  const supabase = createClient();
  const { error } = await supabase.from("contacts").delete().eq("id", id);
  if (error) {
    return { message: error.message };
  }
  revalidatePath("/contacts");
}
