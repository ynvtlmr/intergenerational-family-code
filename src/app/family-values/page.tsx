"use client";

import FamilyValueForm from "./family-value-form";
import FamilyValueList from "./family-value-list";

export default function FamilyValuesPage() {
  return (
    <main className="max-w-xl mx-auto mt-20 px-2">
      <FamilyValueForm />
      <FamilyValueList />
    </main>
  );
}
