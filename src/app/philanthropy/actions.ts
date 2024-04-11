"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { InsertGuideline } from "./philanthropy-guideline-form";
import { InsertImpactStatement } from "./impact-statement-form";

export async function addGuideline(guideline: InsertGuideline) {
  const supabase = createClient();
  const { error } = await supabase
    .from("philanthropy_guidelines")
    .insert([guideline]);
  if (error) {
    return { message: error.message };
  }
  revalidatePath("/philanthropy");
}

export async function deleteGuideline(id: number) {
  const supabase = createClient();
  const { error } = await supabase
    .from("philanthropy_guidelines")
    .delete()
    .eq("id", id);
  if (error) {
    return { message: error.message };
  }
  revalidatePath("/philanthropy");
}

export async function addImpactStatement(
  impactStatement: InsertImpactStatement
) {
  const supabase = createClient();
  const { error } = await supabase
    .from("philanthropy_impact_statements")
    .insert([impactStatement]);
  if (error) {
    return { message: error.message };
  }
  revalidatePath("/philanthropy");
}

export async function deleteImpactStatement(id: number) {
  const supabase = createClient();
  const { error } = await supabase
    .from("philanthropy_impact_statements")
    .delete()
    .eq("id", id);
  if (error) {
    return { message: error.message };
  }
  revalidatePath("/philanthropy");
}
