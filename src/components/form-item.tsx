import { Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";

type FormItemProps = {
  title: string;
  desc?: string;
  handleDelete: React.MouseEventHandler<HTMLButtonElement>;
};

export default function FormItem({ title, desc, handleDelete }: FormItemProps) {
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
          <Trash2Icon size={24}>
            <title className="sr-only">Delete</title>
          </Trash2Icon>
        </Button>
      </div>
    </li>
  );
}
