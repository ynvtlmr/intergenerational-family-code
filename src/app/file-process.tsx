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

  const jsonFileDownload = () => {
    // Display a confirmation dialog before downloading the JSON file
    if (!confirm("Download intergenerational family code data?")) return;

    const jsonData = getAllJson();
    const fileName = "ifc-data.json";
    const data = new Blob([JSON.stringify(jsonData)], { type: "text/json" });
    const jsonURL = window.URL.createObjectURL(data);
    const link = document.createElement("a");
    document.body.appendChild(link);
    link.href = jsonURL;
    link.setAttribute("download", fileName);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mx-auto mt-2 flex max-w-xl justify-center gap-2">
      <Button onClick={jsonFileDownload}>Download JSON</Button>
      <Button>Upload JSON</Button>
    </div>
  );
}
