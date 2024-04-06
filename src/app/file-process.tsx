"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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

  const jsonFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.readAsText(file[0], "UTF-8");
    fileReader.onload = (e) => {
      if (!e.target || typeof e.target.result !== "string") return;
      const data = JSON.parse(e.target.result);
      jsonKeys.forEach((key) => {
        localStorage.setItem(key, JSON.stringify(data[key]));
      });
      window.location.reload();
    };
  };

  return (
    <div className="mx-auto mt-2 flex w-full max-w-xl flex-col justify-center gap-2">
      <Button onClick={jsonFileDownload}>Download</Button>
      <Button>
        <Label htmlFor="upload-json" className="cursor-pointer">
          Upload
        </Label>
        <Input
          id="upload-json"
          type="file"
          className="hidden"
          onChange={jsonFileUpload}
        />
      </Button>
    </div>
  );
}
