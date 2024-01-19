"use client";

import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function FormSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button size="lg" className="w-full" type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2Icon className="animate-spin w-6 h-6 mr-2" />
          <span>Generating....</span>
        </>
      ) : (
        <span>Generate Family Crest</span>
      )}
    </Button>
  );
}
