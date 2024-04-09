"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addAssetAllocation(assetAllocation: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from("asset_allocation")
    .insert([assetAllocation]);
  if (error) {
    return { message: error.message };
  }
  revalidatePath("/asset-allocation");
}

export async function deleteAssetAllocation(id: number) {
  const supabase = createClient();
  const { error } = await supabase
    .from("asset_allocation")
    .delete()
    .eq("id", id);
  if (error) {
    return { message: error.message };
  }
  revalidatePath("/asset-allocation");
}
