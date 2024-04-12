import { Suspense } from "react";
import Guidelines from "./guidelines";
import PhilanthropyGuidelineForm from "./philanthropy-guideline-form";
import ImpactStatementSection from "./impact-statement-section";
import Loading from "@/components/loading";
import AuthenticatedRoute from "../(auth)/authenticated-route";

export default function DecisionTreePage() {
  return (
    <AuthenticatedRoute>
      <main className="mx-auto mt-20 max-w-xl px-2">
        <h1 className="mb-4 text-2xl font-bold">Philanthropy</h1>
        <h2 className="mb-2 text-lg font-semibold">Impact Statement</h2>
        <Suspense fallback={<Loading />}>
          <ImpactStatementSection />
        </Suspense>
        <PhilanthropyGuidelineForm />
        <Suspense fallback={<Loading />}>
          <Guidelines />
        </Suspense>
      </main>
    </AuthenticatedRoute>
  );
}
