import Questions from "./questions";
import FamilyQuestionForm from "./family-question-form";
import { Suspense } from "react";
import Loading from "@/components/loading";
import AuthenticatedRoute from "../(auth)/authenticated-route";

export default function DecisionTreePage() {
  return (
    <AuthenticatedRoute>
      <main className="mx-auto mt-20 max-w-xl px-2">
        <FamilyQuestionForm />
        <Suspense fallback={<Loading />}>
          <Questions />
        </Suspense>
      </main>
    </AuthenticatedRoute>
  );
}
