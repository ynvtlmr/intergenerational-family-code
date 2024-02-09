import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex items-center gap-2">
        <Loader2 className="animate-spin" />
        <span className="mt-4 text-center text-xl">Loading...</span>
      </div>
    </div>
  );
}
