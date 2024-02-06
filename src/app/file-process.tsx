import { Button } from "@/components/ui/button";

export default function FileProcess() {
  return (
    <div className="mx-auto mt-2 flex max-w-xl justify-center gap-2">
      <Button>Download JSON</Button>
      <Button>Upload JSON</Button>
    </div>
  );
}
