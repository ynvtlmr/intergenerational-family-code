import { Suspense } from "react";
import FamilyValueForm from "./family-value-form";
import Loading from "@/components/loading";
import FamilyValues from "./family-values";

export default function FamilyValuesPage() {
  return (
    <main className="mx-auto mt-20 max-w-xl px-2">
      <FamilyValueForm />
      <Suspense fallback={<Loading />}>
        <FamilyValues />
      </Suspense>
    </main>
  );
}
