import { Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";

type FormItemProps = {
    title: string;
    desc?: string;
    handleDelete: React.MouseEventHandler<HTMLButtonElement>;
}

export default function FormItem({title, desc, handleDelete}: FormItemProps) {
  return (
   <li className="border rounded-lg p-5">
          <h2 className="text-xl">{title}</h2>
          {desc && <p className="text-gray-500 dark:text-gray-400">{desc}</p>}
           <div className="flex justify-end mt-5">
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2Icon size={24} />
            </Button>
          </div>
        </li>
  )
}