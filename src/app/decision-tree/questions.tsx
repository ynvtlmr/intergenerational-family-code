"use client";

import FormItem from "@/components/form-item";
import { useDecisionTree } from "./family-questions-store";

export default function Questions() {
  const { questions, deleteQuestion } = useDecisionTree();
  const handleDelete = (q: string) => {
    deleteQuestion(q);
  };

  return (
     <ul className="space-y-5 mt-5 mb-10">
      {questions.map((q) => (
       <FormItem
          key={q}
          title={q}
          handleDelete={() => handleDelete(q)}
        />
      ))}
    </ul>
  );
};