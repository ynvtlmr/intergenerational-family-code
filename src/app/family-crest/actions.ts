"use server";

import { createClient } from "@/lib/supabase/server";
import { InsertFamilyCrest } from "./family-crest-form";
import { revalidatePath } from "next/cache";

export async function addFamilyCrest(
  familyCrest: InsertFamilyCrest & {
    image_url: string;
  }
) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  const { data: existingCrest } = await supabase
    .from("family_crest")
    .select("*")
    .eq("user_id", data.user?.id)
    .maybeSingle();

  if (existingCrest) {
    const imagePath = existingCrest.image_url.replace(
      `https://zsykkropsjmgqyvxhvaq.supabase.co/storage/v1/object/public/family_crest/`,
      ""
    );

    console.log(imagePath);
    await supabase.storage.from("family_crest").remove(imagePath);
    await supabase
      .from("family_crest")
      .update(familyCrest)
      .eq("user_id", data.user?.id);
  } else {
    await supabase
      .from("family_crest")
      .insert(familyCrest)
      .eq("user_id", data.user?.id);
  }
  revalidatePath("/family-crest");
}
