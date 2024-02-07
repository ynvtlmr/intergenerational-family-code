"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";

type FormSubmitButtonProps = {
  loadingText?: string;
  defaultText?: string;
} & ButtonProps;

export default function FormSubmitButton({
  loadingText = "Submitting...",
  defaultText = "Submit",
  ...props
}: FormSubmitButtonProps) {
  return (
    <Button
      {...props}
      size="lg"
      className="w-full"
      type="submit"
      disabled={props.disabled}
    >
      {props.disabled ? (
        <>
          <Loader2Icon className="mr-2 h-6 w-6 animate-spin" />
          <span>{loadingText}</span>
        </>
      ) : (
        <span>{defaultText}</span>
      )}
    </Button>
  );
}
