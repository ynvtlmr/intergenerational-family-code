"use client";

import { Button } from "@/components/ui/button";
import { useFamilyCrest } from "./family-crest-store";

export default function FamilyCrestPreview() {
  const { crest } = useFamilyCrest();

  if (!crest) {
    return null;
  }

  return (
    <div className="pb-6">
      <a href={crest} target="_blank">
        <img src={crest} alt="Family Crest" className="mb-4" />
      </a>
      <a href={crest} target="_blank">
        <Button className="w-full">Download</Button>
      </a>
    </div>
  );
}
