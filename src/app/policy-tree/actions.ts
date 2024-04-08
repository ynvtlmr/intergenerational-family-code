import { InsertPolicyTree } from "./policy-tree-form";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addPolicy(policy: InsertPolicyTree) {
  const supabase = createClient();
  const { error } = await supabase.from("policy_trees").insert(policy);
  if (error) {
    return { message: error.message };
  }
  revalidatePath("/policy-tree");
}

export async function deletePolicy(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("policy_trees").delete().eq("id", id);
  if (error) {
    return { message: error.message };
  }
  revalidatePath("/policy-tree");
}
