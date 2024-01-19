import { Separator } from "@/components/ui/separator";
import FamilyCrestForm from "./family-crest-form";
import FamilyCrestPreview from "./family-crest-preview";

export default function FamilyCrestPage() {
  return (
    <main className="min-h-screen bg-secondary">
      <div className="max-w-md mx-auto pt-10">
        <div className="space-y-2 text-center mb-8">
          <h1 className="text-3xl font-bold">Family Crest Generator</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Fill in the form to generate a unique family crest.
          </p>
        </div>
        <FamilyCrestForm />
        <Separator className="my-8" />
        <FamilyCrestPreview />
      </div>
    </main>
  );
}
