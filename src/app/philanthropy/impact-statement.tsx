"use client";
import { useState } from "react";
import { deleteImpactStatement } from "./actions";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ImpactStatement({
  impactStatement,
}: {
  impactStatement: any;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteImpactStatement(impactStatement.id);
    setIsDeleting(false);
  };

  return (
    <div className="mb-10 rounded-lg border p-5" data-test="form-item">
      <p>{impactStatement.statement}</p>
      <div className="mt-5">
        <Button
          variant="destructive"
          disabled={isDeleting}
          onClick={handleDelete}
        >
          {isDeleting ? (
            <Loader2 className="animate-spin" size={24}>
              <title className="sr-only">Delete</title>
            </Loader2>
          ) : (
            <Trash2 size={24}>
              <title className="sr-only">Delete</title>
            </Trash2>
          )}
        </Button>
      </div>
    </div>
  );
}
