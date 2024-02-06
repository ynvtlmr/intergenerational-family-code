"use client";

import { Button } from "@/components/ui/button";

const jsonKeys = [
  "decision-tree",
  "family-value",
  "family-code",
  "family-vision",
  "family-tree",
];

export default function FileProcess() {
  // Get all the JSON data from localStorage and return it as an object
  const getAllJson = () => {
    return jsonKeys.reduce((acc, key) => {
      let d = localStorage.getItem(key);
      const jsonData = d ? JSON.parse(d) : "";
      return {
        ...acc,
        [key]: jsonData,
      };
    }, {});
  };

  return (
    <div className="mx-auto mt-2 flex max-w-xl justify-center gap-2">
      <Button>Download JSON</Button>
      <Button>Upload JSON</Button>
    </div>
  );
}
