import Guidelines from "./guidelines";
import PhilanthropyGuidelineForm from "./philanthropy-guideline-form";
import { Suspense } from "react";
import Loading from "@/components/loading";

export default function DecisionTreePage() {
  return (
    <main className="mx-auto mt-20 max-w-xl px-2">
      <PhilanthropyGuidelineForm />
      <Suspense fallback={<Loading />}>
        <Guidelines />
      </Suspense>
    </main>
  );
}
