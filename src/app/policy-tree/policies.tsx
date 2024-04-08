import { DataTable } from "@/components/data-table";
import { policyTreeColumnsWithDelete } from "./columns";
import { createClient } from "@/lib/supabase/server";

export default async function Policies() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const { data: policies, error } = await supabase
    .from("policy_trees")
    .select("*")
    .eq("user_id", data.user?.id);
  if (error) {
    // TODO: handle error
  }

  if (!policies) {
    return <div>No policies found</div>;
  }

  return <DataTable columns={policyTreeColumnsWithDelete} data={policies} />;
}
