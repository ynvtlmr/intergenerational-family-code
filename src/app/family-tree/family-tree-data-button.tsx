import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function FamilyTreeDataButton() {
  const [familyTreeData, setFamilyTreeData] = useState(() => {
    if (typeof localStorage !== "undefined") {
      const saved = localStorage?.getItem("family-tree-data");
      return saved ? saved : "";
    }
  });

  const handleViewData = () => {
    const saved = localStorage?.getItem("family-tree-data");
    setFamilyTreeData(saved ? saved : "");
  };

  return (
    <div className="absolute bottom-0 right-0 mr-5 mb-5">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={handleViewData}>
            View Data
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="mt-0 mb-1">Share data</DialogTitle>
            <DialogDescription>
              Click on the copy icon to copy the data to your clipboard.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Textarea
                className="resize-none h-80"
                value={familyTreeData}
                readOnly
              ></Textarea>
            </div>
            <Button type="submit" size="sm" className="px-3">
              <span className="sr-only">Copy</span>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
