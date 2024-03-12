"use client";

import { Button } from "@/components/ui/button";
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

  const handleClick = () => {
    window.print();
  };
  return (
    <main className="w-full p-5  print:p-0">
      <h1 className="mb-5 text-4xl font-bold print:hidden">
        Intergenerational Family Code Report
      </h1>
      <Button
        className="mb-5 print:hidden"
        onClick={handleClick}
        aria-label="Print PDF"
      >
        Print PDF
      </Button>
      <div className="space-y-10 print:space-y-0">
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
          <div>
            <h2>Impact Statement</h2>
            <p>{impactStatement}</p>
            <h2>Guidelines</h2>
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
      </div>
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
    <div className="prose min-h-dvh max-w-full border p-5 print:border-none">
      <h1>{title}</h1>
      {children}
    </div>
  );
}
