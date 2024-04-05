import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { InsertFamilyStatement } from "./family-code-form";

export async function addStatement(statement: InsertFamilyStatement) {
  const supabase = createClient();
  const { error } = await supabase.from("family_code").insert([statement]);

  if (error) {
    return { message: error.message };
  }

  revalidatePath("/family-code");
}

export async function deleteStatement(id: number) {
  const supabase = createClient();
  const { error } = await supabase.from("family_code").delete().eq("id", id);

  if (error) {
    return { message: error.message };
  }

  revalidatePath("/family-code");
}
