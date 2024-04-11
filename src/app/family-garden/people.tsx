import { createClient } from "@/lib/supabase/server";
import { DeletePersonTableButton, PersonTable } from "./person-table";

export default async function People() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const { data: people } = await supabase
    .from("family_garden")
    .select("*")
    .eq("user_id", data.user?.id);
  return (
    <div className="mt-10 space-y-10">
      {people?.map((person) => (
        <div key={person.id}>
          <div className="mb-4 flex items-center justify-between gap-2">
            <h2 className="text-2xl font-semibold">{person.name}</h2>
            <DeletePersonTableButton id={person.id} />
          </div>
          <PersonTable person={person} />
        </div>
      ))}
    </div>
  );
}
