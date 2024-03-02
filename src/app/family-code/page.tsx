import { Suspense } from "react";
import FamilyCodeForm from "./family-code-form";
import Statements from "./statements";
import Loading from "@/components/loading";

export default function FamilyCodePage() {
  return (
    <main className="mx-auto mt-20 max-w-xl px-2">
      <FamilyCodeForm />
      <Suspense fallback={<Loading />}>
        <Statements />
      </Suspense>
    </main>
  );
}
