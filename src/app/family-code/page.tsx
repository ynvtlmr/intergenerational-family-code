import { Suspense } from "react";

import Loading from "@/components/loading";
import FamilyCodeForm from "./family-code-form";
import Statements from "./statements";
import AuthenticatedRoute from "../(auth)/authenticated-route";

export default function FamilyCodePage() {
  return (
    <AuthenticatedRoute>
      <main className="mx-auto mt-4 max-w-xl px-2 md:mt-20">
        <FamilyCodeForm />
        <Suspense fallback={<Loading />}>
          <Statements />
        </Suspense>
      </main>
    </AuthenticatedRoute>
  );
}
