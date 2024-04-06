"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addStatement(statement: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from("family_vision")
    .insert([{ statement }]);
  if (error) {
    return { message: error.message };
  }
  revalidatePath("/family-vision");
}

export async function deleteStatement(id: number) {
  const supabase = createClient();
  const { error } = await supabase.from("family_vision").delete().eq("id", id);
  if (error) {
    return { message: error.message };
  }
  revalidatePath("/family-vision");
}
