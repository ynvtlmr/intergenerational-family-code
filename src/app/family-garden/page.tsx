import PersonForm from "./person-form";
import People from "./people";
import { Suspense } from "react";
import Loading from "@/components/loading";
import GrowthRate from "./growth-rate";
import AuthenticatedRoute from "../(auth)/authenticated-route";

export default function FamilyGarden() {
  return (
    <AuthenticatedRoute>
      <main className="mt-6 p-10">
        <h1 className="mb-2 text-3xl font-bold">Family Garden</h1>
        <GrowthRate />
        <PersonForm />
        <Suspense fallback={<Loading />}>
          <People />
        </Suspense>
      </main>
    </AuthenticatedRoute>
  );
}
