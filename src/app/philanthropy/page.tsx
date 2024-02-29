"use client";

import Guidelines from "./guidelines";
import PhilanthropyGuidelineForm from "./philanthropy-guideline-form";
import { Suspense } from "react";
import Loading from "@/components/loading";
import ImpactStatementForm from "./impact-statement-form";

export default function DecisionTreePage() {
  const impactStatement = usePhilanthropyStore((s) => s.impactStatement);
  const editImpactStatement = usePhilanthropyStore(
    (s) => s.editImpactStatement
  );
  console.log(impactStatement);
  return (
    <main className="mx-auto mt-20 max-w-xl px-2">
      <h1 className="mb-4 text-2xl font-bold">Philanthropy</h1>
      <h2 className="mb-2 text-lg font-semibold">Impact Statement</h2>
      {impactStatement && !editImpactStatement ? (
        <ImpactStatement />
      ) : (
        <ImpactStatementForm />
      )}
      <PhilanthropyGuidelineForm />
      <Suspense fallback={<Loading />}>
        <Guidelines />
      </Suspense>
    </main>
  );
}

import { usePhilanthropyStore } from "./philanthropy-store";
import { Button } from "@/components/ui/button";

function ImpactStatement() {
  const impactStatement = usePhilanthropyStore((s) => s.impactStatement);
  const setEditImpactStatement = usePhilanthropyStore(
    (s) => s.setEditImpactStatement
  );
  return (
    <div className="mb-10 rounded-lg border p-5" data-test="form-item">
      <p className="">{impactStatement}</p>
      <div className="mt-5">
        <Button
          className="w-full"
          variant="secondary"
          onClick={() => setEditImpactStatement(true)}
          data-test="delete-button"
        >
          Edit
        </Button>
      </div>
    </div>
  );
}
