"use client";

import { Loader2, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { deleteQuestion } from "@/app/decision-tree/actions";
import { useState } from "react";

type FormItemProps = {
  id: number;
  title: string;
  desc?: string;
};

export default function FormItem({ id, title, desc }: FormItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteQuestion(id);
    setIsDeleting(false);
  };
  return (
    <li className="rounded-lg border p-5" data-test="form-item">
      <h2 className="text-xl" data-test="form-item-heading">
        {title}
      </h2>
      {desc && (
        <p
          data-test="form-item-description"
          className="text-gray-500 dark:text-gray-400"
        >
          {desc}
        </p>
      )}
      <div className="mt-5 flex justify-end">
        <Button
          variant="destructive"
          onClick={handleDelete}
          data-test="delete-button"
        >
          {isDeleting ? (
            <Loader2 className="animate-spin" size={24}>
              <title className="sr-only">Delete</title>
            </Loader2>
          ) : (
            <Trash2Icon size={24}>
              <title className="sr-only">Delete</title>
            </Trash2Icon>
          )}
        </Button>
      </div>
    </li>
  );
}
