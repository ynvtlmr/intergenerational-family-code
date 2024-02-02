import { Copy } from "lucide-react";
import { useCopyToClipboard } from "@/app/family-tree/hooks";
import { useToast } from "@/components/ui/use-toast";

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
  const [copiedText, copy] = useCopyToClipboard();
  const { toast } = useToast();

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
    <div className="absolute bottom-0 right-0 mb-5 mr-5">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={handleViewData}>
            View Data
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="mb-1 mt-0">Family tree data</DialogTitle>
            <DialogDescription>
              Click the copy icon to copy the data.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Textarea
                className="h-80 resize-none"
                value={familyTreeData}
                readOnly
              ></Textarea>
            </div>
            <Button
              type="submit"
              size="sm"
              className="px-3"
              onClick={() => {
                copy(familyTreeData ?? "");
                toast({
                  description: "Copied to clipboard!",
                });
              }}
            >
              <span className="sr-only">Copy</span>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
