import { Suspense } from "react";
import Loading from "@/components/loading";
import FamilyValueForm from "./family-value-form";
import FamilyValues from "./family-values";
import AuthenticatedRoute from "../(auth)/authenticated-route";

export default function FamilyValuesPage() {
  return (
    <AuthenticatedRoute>
      <main className="mx-auto mt-20 max-w-xl px-2">
        <FamilyValueForm />
        <Suspense fallback={<Loading />}>
          <FamilyValues />
        </Suspense>
      </main>
    </AuthenticatedRoute>
  );
}
