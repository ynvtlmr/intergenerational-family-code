"use client";

import FormItem from "@/components/form-item";
import { useDecisionTree } from "./family-questions-store";

export default function Questions() {
  const { questions, deleteQuestion } = useDecisionTree();
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
