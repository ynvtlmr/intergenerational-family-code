import { createClient } from "@/lib/supabase/server";
import ImpactStatementForm from "./impact-statement-form";
import ImpactStatement from "./impact-statement";

export default async function ImpactStatementSection() {
  const supabase = createClient();
  let { data: impactStatement, error } = await supabase
    .from("philanthropy_impact_statements")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!impactStatement) {
    return <ImpactStatementForm />;
  }

  return <ImpactStatement impactStatement={impactStatement} />;
}
