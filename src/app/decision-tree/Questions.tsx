"use client";

import { useState } from "react";
import { useFamilyQuestions } from "./family-questions-store";
import { Button } from "@/components/ui/button";
import { Check, Pencil, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Questions() {
  const { questions, deleteQuestion, editQuestion } = useFamilyQuestions();

  

  const [editingQuestion, setEditingQuestion] = useState("");

  const [modifiedQuestion, setModifiedQuestion] = useState("");

  const handleEditQuestion = (question: string) => {
    setEditingQuestion(question);
    setModifiedQuestion(question);
  };

  const handleSaveQuestion = (q: string) => {
    editQuestion(q, modifiedQuestion);
    setEditingQuestion("");
    setModifiedQuestion("");
  }



  return (
    <div className="space-y-8">
      {questions.map((question) => (
        <div key={question} className="flex gap-5 items-center">
          {editingQuestion === question ? (
            <div className="w-full border p-5 rounded-lg">
            <Input
              type="text"
              value={modifiedQuestion || question}
              onChange={(e) => setModifiedQuestion(e.target.value)}
              />
              </div>
          ) : (
            <div className="w-full border p-5 rounded-lg">{question}</div>
          )}
          <div className="flex gap-2">
            {editingQuestion === question ? (
              <Button size="icon" onClick={() => handleSaveQuestion(question)}>
                <Check/>
              </Button>
            ) : (
              <Button size="icon" onClick={() => handleEditQuestion(question)}>
                <Pencil />
              </Button>
            )}
            <Button
              variant="destructive"
              size="icon"
              onClick={() => deleteQuestion(question)}
            >
              <Trash />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
