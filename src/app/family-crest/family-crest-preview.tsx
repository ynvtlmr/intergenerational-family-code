"use client";

import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";
import useGenerateCrest from "./useGenerateCrest";

export default function FamilyCrestPreview() {
  const { crest } = useGenerateCrest();

  if (!crest) {
    return (
      <div className="h-[320px] w-[320px] xl:h-[448px] xl:w-[448px]">
        <div className="flex h-full w-full items-center justify-center border bg-secondary">
          <ImageIcon size={64} className="stroke-border" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <a href={crest} target="_blank" rel="noopener noreferrer">
        <img src={crest} alt="Family Crest" className="mb-4 w-[448px]" />
      </a>
      <a href={crest} target="_blank" rel="noopener noreferrer">
        <Button className="w-full">Download</Button>
      </a>
    </div>
  );
}
