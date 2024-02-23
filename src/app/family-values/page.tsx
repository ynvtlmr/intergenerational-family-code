import { Suspense } from "react";
import FamilyValueForm from "./family-value-form";
import FamilyValueList from "./family-value-list";
import Loading from "@/components/loading";

export default function FamilyValuesPage() {
  return (
    <Suspense fallback={<Loading />}>
      <main className="mx-auto mt-20 max-w-xl px-2">
        <FamilyValueForm />
        <FamilyValueList />
      </main>
    </Suspense>
  );
}
