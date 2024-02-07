import FamilyCrestForm from "./family-crest-form";
import FamilyCrestPreview from "./family-crest-preview";

export default function FamilyCrestPage() {
  return (
    <main className="min-h-screen px-6 pt-5">
      <div className="mx-auto max-w-md xl:grid xl:max-w-full xl:grid-cols-2 xl:gap-6">
        <div className="p-5">
          <div className="mb-8 space-y-2 text-center xl:text-left">
            <h1 className="text-3xl font-bold">Family Crest Generator</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Fill in the form to generate a unique family crest.
            </p>
          </div>
          <FamilyCrestForm />
        </div>
        <div className="flex items-center justify-center py-8">
          <FamilyCrestPreview />
        </div>
      </div>
    </main>
  );
}
