import FormItem from "@/components/form-item";
import { createClient } from "@/lib/supabase/server";
import { deleteStatement } from "./actions";

export default async function VisionStatements() {
  const supabase = createClient();
  const { data: statements, error } = await supabase
    .from("family_vision")
    .select("*");

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <ul className="mb-10 mt-5 space-y-5">
      {statements.map((statement) => (
        <FormItem
          key={statement.id}
          item={{
            id: statement.id,
            title: statement.statement,
          }}
          deleteItem={deleteStatement}
        />
      ))}
    </ul>
  );
}
