"use client";

import { Button } from "@/components/ui/button";
import { useFamilyCrest } from "./family-crest-store";
import { ImageIcon } from "lucide-react";

export default function FamilyCrestPreview() {
  const { crest } = useFamilyCrest();

  if (!crest) {
    return (
      <div className="w-[320px] h-[320px] xl:w-[448px] xl:h-[448px]">
        <div className="border w-full h-full flex items-center justify-center bg-secondary">
          <ImageIcon size={64} className="stroke-border" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <a href={crest} target="_blank">
        <img src={crest} alt="Family Crest" className="mb-4 w-[448px]" />
      </a>
      <a href={crest} target="_blank">
        <Button className="w-full">Download</Button>
      </a>
    </div>
  );
}
