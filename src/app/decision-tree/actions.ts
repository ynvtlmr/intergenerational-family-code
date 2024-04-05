"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addQuestion(question: string) {
  const supabase = createClient();
  const { error } = await supabase.from("decision_tree").insert([{ question }]);
  if (error) {
    return { message: error.message };
  }
  revalidatePath("/decision-tree");
}

export async function deleteQuestion(id: number) {
  const supabase = createClient();
  const { error } = await supabase.from("decision_tree").delete().eq("id", id);
  if (error) {
    return { message: error.message };
  }
  revalidatePath("/decision-tree");
}
