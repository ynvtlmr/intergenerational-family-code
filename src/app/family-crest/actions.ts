"use server";

import { createClient } from "@/lib/supabase/server";
import { InsertFamilyCrest } from "./family-crest-form";
import { revalidatePath } from "next/cache";

export async function addFamilyCrest(familyCrest: InsertFamilyCrest) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const { data: existingFamilyCrest } = await supabase
    .from("family_crest")
    .select("*")
    .eq("id", data.user?.id)
    .maybeSingle();
  if (existingFamilyCrest) {
    await supabase
      .from("family_crest")
      .update(familyCrest)
      .eq("user_id", data.user?.id)
      .eq("id", existingFamilyCrest.id);
  } else {
    await supabase.from("family_crest").insert([familyCrest]);
  }
  revalidatePath("/family-crest");
}

export async function deleteFamilyCrest() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  await supabase.from("family_crest").delete().eq("id", data.user?.id);
}
