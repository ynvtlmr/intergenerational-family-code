"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFamilyQuestions } from "./family-questions-store";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function QuestionDialog() {
  return (
  <Dialog>
  <DialogTrigger asChild>
    <Button>
    Add a question
    </Button>
  </DialogTrigger>
  <DialogContent>
    <QuestionForm/>
  </DialogContent>
</Dialog>
)
};


 function QuestionForm() {
  const [question, setQuestion] = useState("");
  const {addQuestion} = useFamilyQuestions();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!question.trim()) return;
   addQuestion(question);
    setQuestion("");
  };
  return (
           <form onSubmit={handleSubmit}>
            <h1 className="text-xl font-bold mb-2">Add a Question</h1>
            <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                type="text"
                placeholder="Type here"
              />
              <Button className="mt-4">
                Submit
              </Button>
        </form>
  );
};
