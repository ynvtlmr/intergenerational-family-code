import FormItem from "@/components/form-item";
import { createClient } from "@/lib/supabase/server";

export default async function Questions() {
  const supabase = createClient();
  let { data: questions, error } = await supabase
    .from("decision_tree")
    .select("*");

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <ul className="mb-10 mt-5 space-y-5">
      {questions ? (
        questions.map(({ id, question }) => (
          <FormItem key={id} title={question} id={id} />
        ))
      ) : (
        <div>No questions added yet.</div>
      )}
    </ul>
  );
}
