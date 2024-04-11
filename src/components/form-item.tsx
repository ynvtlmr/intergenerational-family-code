"use client";

import { Loader2, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

type FormItemProps = {
  item: {
    id: number;
    title: string;
    description?: string;
  };
  deleteItem: (id: number) => Promise<
    | {
        message: string;
      }
    | undefined
  >;
};

export default function FormItem({ item, deleteItem }: FormItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteItem(item.id);
    setIsDeleting(false);
  };
  return (
    <li className="rounded-lg border p-5" data-test="form-item">
      <h2 className="text-xl" data-test="form-item-heading">
        {item.title}
      </h2>
      {item.description && (
        <p
          data-test="form-item-description"
          className="text-gray-500 dark:text-gray-400"
        >
          {item.description}
        </p>
      )}
      <div className="mt-5 flex justify-end">
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={isDeleting}
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
