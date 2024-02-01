"use client";

import { useFamilyQuestions } from "./family-questions-store";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";

export default function Questions() {
  const { questions, deleteQuestion } = useFamilyQuestions();
  const handleDelete = (q: string) => {
    deleteQuestion(q);
  };

  return (
     <ul className="space-y-5 mt-5 mb-10">
      {questions.map((q) => (
        <li key={q} className="border rounded-lg p-5">
          <h2 className="text-xl">{q}</h2>
          <div className="flex justify-end mt-5">
            <Button variant="destructive" onClick={() => handleDelete(q)}>
              <Trash2Icon size={24} />
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
};
