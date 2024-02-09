import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="space-y-4">
        <Loader2 className="animate-spin" />
        <span className="mt-4 text-center text-xl">Loading...</span>
      </div>
    </div>
  );
}
