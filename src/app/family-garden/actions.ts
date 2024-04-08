"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { InsertPerson } from "./person-form";

export async function addPerson(person: InsertPerson) {
  const supabase = createClient();
  const { error } = await supabase.from("family_garden").insert([
    {
      name: person.name,
      begin_amount: person.beginAmount,
      begin_age: person.beginAge,
    },
  ]);

  if (error) {
    return { message: error.message };
  }

  revalidatePath("/family-garden");
}

export async function deletePerson(id: number) {
  const supabase = createClient();
  const { error } = await supabase.from("family_garden").delete().eq("id", id);

  if (error) {
    return { message: error.message };
  }

  revalidatePath("/family-garden");
}
