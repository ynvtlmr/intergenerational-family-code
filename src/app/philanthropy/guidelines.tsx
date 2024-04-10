import { createClient } from "@/lib/supabase/server";
import { deleteGuideline } from "./actions";
import FormItem from "@/components/form-item";

export default async function Guidelines() {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();
  const { data: guidelines, error } = await supabase
    .from("philanthropy_guidelines")
    .select("*")
    .eq("user_id", data.user?.id);

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <ul className="mb-10 mt-5 space-y-5">
      {guidelines.map((guideline) => (
        <FormItem
          key={guideline}
          item={{
            id: guideline.id,
            title: guideline.guideline,
          }}
          deleteItem={deleteGuideline}
        />
      ))}
    </ul>
  );
}
