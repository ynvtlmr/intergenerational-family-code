"use client";

import { useRef } from "react";
import { useDecisionTreeStore } from "../decision-tree/family-questions-store";
import { useFamilyCodeStore } from "../family-code/family-code-store";
import { useFamilyValueStore } from "../family-values/family-value-store";
import { useFamilyVisionStore } from "../family-vision/family-vision-store";
import { usePhilanthropyStore } from "../philanthropy/philanthropy-store";

export default function PDFPage() {
  const questions = useDecisionTreeStore((s) => s.questions);
  const familyValues = useFamilyValueStore((s) => s.values);
  const familyCodeStatements = useFamilyCodeStore((s) => s.statements);
  const familyVisionStatements = useFamilyVisionStore(
    (s) => s.visionStatements
  );

  const guidelines = usePhilanthropyStore((s) => s.guidelines);
  const impactStatement = usePhilanthropyStore((s) => s.impactStatement);

  const printRef = useRef<HTMLElement>(null);

  const handleClick = () => {
    if (printRef.current) {
    }
  };
  return (
    <main ref={printRef} onClick={handleClick} className="space-y-2">
      <Page title="Decision Tree">
        <ul>
          {questions.length ? (
            questions.map((question) => <li key={question}>{question}</li>)
          ) : (
            <li>No questions yet.</li>
          )}
        </ul>
      </Page>
      <Page title="Family Values">
        <ul>
          {familyValues.length ? (
            Object.keys(familyValues).map((value) => (
              <li key={value}>{value}</li>
            ))
          ) : (
            <li>No values yet.</li>
          )}
        </ul>
      </Page>
      <Page title="Family Code">
        {
          <ul>
            {familyCodeStatements.length ? (
              familyCodeStatements.map((statement) => (
                <li key={statement}>{statement}</li>
              ))
            ) : (
              <li>No statements yet.</li>
            )}
          </ul>
        }
      </Page>
      <Page title="Family Vision">
        {
          <ul>
            {familyVisionStatements.length ? (
              familyVisionStatements.map((statement) => (
                <li key={statement}>{statement}</li>
              ))
            ) : (
              <li>No statements yet.</li>
            )}
          </ul>
        }
      </Page>
      <Page title="Philanthropy">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Impact Statement</h2>
          <p>{impactStatement}</p>
          <h2 className="text-xl font-bold">Guidelines</h2>
          {
            <ul>
              {guidelines.length ? (
                guidelines.map((guideline) => (
                  <li key={guideline}>{guideline}</li>
                ))
              ) : (
                <li>No guidelines yet.</li>
              )}
            </ul>
          }
        </div>
      </Page>
    </main>
  );
}

function Page({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto min-h-dvh max-w-7xl border p-5">
      <h1 className="mb-3 text-3xl font-bold">{title}</h1>
      {children}
    </div>
  );
}
