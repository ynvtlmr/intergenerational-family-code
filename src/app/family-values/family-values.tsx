import FormItem from "@/components/form-item";
import { createClient } from "@/lib/supabase/server";
import { deleteFamilyValue } from "./actions";

export default async function FamilyValues() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const { data: familyValues, error } = await supabase
    .from("family_values")
    .select("*")
    .eq("user_id", data.user?.id);

  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <ul className="mb-10 mt-5 space-y-5">
      {familyValues ? (
        familyValues.map((value) => (
          <FormItem
            key={value.id}
            item={{
              id: value.id,
              title: value.title,
              description: value.description,
            }}
            deleteItem={deleteFamilyValue}
          />
        ))
      ) : (
        <div>No family values added yet.</div>
      )}
    </ul>
  );
}
