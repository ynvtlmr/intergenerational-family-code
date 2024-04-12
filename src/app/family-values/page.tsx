import { Suspense } from "react";
import Loading from "@/components/loading";
import FamilyValueForm from "./family-value-form";
import FamilyValues from "./family-values";
import AuthenticatedRoute from "../(auth)/authenticated-route";

export default function FamilyValuesPage() {
  return (
    <AuthenticatedRoute>
      <main className="mx-auto mt-4 max-w-xl px-2 md:mt-20">
        <FamilyValueForm />
        <Suspense fallback={<Loading />}>
          <FamilyValues />
        </Suspense>
      </main>
    </AuthenticatedRoute>
  );
}
