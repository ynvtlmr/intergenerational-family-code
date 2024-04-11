import FormItem from "@/components/form-item";
import { createClient } from "@/lib/supabase/server";
import { deleteQuestion } from "./actions";

export default async function Questions() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  const { data: questions, error } = await supabase
    .from("decision_tree")
    .select("*")
    .eq("user_id", data.user?.id);

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <ul className="mb-10 mt-5 space-y-5">
      {questions ? (
        questions.map((question) => (
          <FormItem
            key={question.id}
            item={{
              id: question.id,
              title: question.question,
            }}
            deleteItem={deleteQuestion}
          />
        ))
      ) : (
        <div>No questions added yet.</div>
      )}
    </ul>
  );
}
