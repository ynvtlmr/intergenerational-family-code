"use client";
import FamilyCrestForm from "./family-crest-form";

export default function FamilyCrestPage() {
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md mx-auto pt-10 space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Family Crest Generator</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Fill in the form to generate a unique family crest.
          </p>
        </div>
        <FamilyCrestForm />
      </div>
    </main>
  );
}
