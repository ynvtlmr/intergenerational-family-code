"use client";

import FormItem from "@/components/form-item";
import { useDecisionTreeStore } from "./family-questions-store";

export default function Questions() {
  const questions = useDecisionTreeStore((s) => s.questions);
  const deleteQuestion = useDecisionTreeStore((s) => s.deleteQuestion);
  const handleDelete = (q: string) => {
    deleteQuestion(q);
  };

  return (
    <ul className="mb-10 mt-5 space-y-5">
      {questions.map((q) => (
        <FormItem key={q} title={q} handleDelete={() => handleDelete(q)} />
      ))}
    </ul>
  );
}
