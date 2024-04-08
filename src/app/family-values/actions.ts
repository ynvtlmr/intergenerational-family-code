"use server";

import { createClient } from "@/lib/supabase/server";
import { InsertFamilyValue } from "./family-value-form";
import { revalidatePath } from "next/cache";

export async function addFamilyValue(familyValue: InsertFamilyValue) {
  const supabase = createClient();
  const { error } = await supabase.from("family_values").insert([familyValue]);

  if (error) {
    return { message: error.message };
  }

  revalidatePath("/family-values");
}

export async function deleteFamilyValue(id: number) {
  const supabase = createClient();
  const { error } = await supabase.from("family_values").delete().eq("id", id);
  if (error) {
    return { message: error.message };
  }
  revalidatePath("/family-values");
}
