"use client";

import { Button } from "@/components/ui/button";
import { useDecisionTreeStore } from "../decision-tree/family-questions-store";
import { useFamilyCodeStore } from "../family-code/family-code-store";
import { useFamilyValueStore } from "../family-values/family-value-store";
import { useFamilyVisionStore } from "../family-vision/family-vision-store";
import { usePhilanthropyStore } from "../philanthropy/philanthropy-store";
import { useContactStore } from "../contacts/contact-store";
import { useFamilyGardenStore } from "../family-garden/family-garden-store";

export default function PDFPage() {
  const questions = useDecisionTreeStore((s) => s.questions);
  const familyValues = useFamilyValueStore((s) => s.values);
  const familyCodeStatements = useFamilyCodeStore((s) => s.statements);
  const familyVisionStatements = useFamilyVisionStore(
    (s) => s.visionStatements
  );

  const values = Object.keys(familyValues);

  const contacts = useContactStore((s) => s.contacts);

  const guidelines = usePhilanthropyStore((s) => s.guidelines);
  const impactStatement = usePhilanthropyStore((s) => s.impactStatement);

  const { growthRate, people } = useFamilyGardenStore(state => ({ 
    growthRate: state.growthRate, 
    people: state.people
   }));


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
        <Page>
          <h1>Decision Tree</h1>
          <ul>
            {questions.length ? (
              questions.map((question) => <li key={question}>{question}</li>)
            ) : (
              <li>No questions yet.</li>
            )}
          </ul>
        </Page>
        <Page>
          <h1>Family Values</h1>
          <div>
            {values.length ? (
              values.map((value) => (
                <p key={value}>
                  <span className="font-semibold">{value}: </span>{" "}
                  {familyValues[value]}
                </p>
              ))
            ) : (
              <li>No values yet.</li>
            )}
          </div>
        </Page>
        <Page>
          <h1>Family Code</h1>
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
        <Page>
          <h1>Contacts</h1>
          <div>
            {contacts.length ? (
              contacts.map((contact) => (
                <div key={contact.email}>
                  <h2>{contact.name}</h2>
                  <p>{contact.title}</p>
                  <p>Email: {contact.email}</p>
                  <p>Phone: {contact.phone}</p>
                </div>
              ))
            ) : (
              <p>No contacts yet.</p>
            )}
          </div>
        </Page>
        <Page>
          <h1>Family Vision</h1>
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
        <Page>
          <h1>Philanthropy</h1>
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
        <Page>
          <h1>Family Garden</h1>
          <p>Growth Rate: {(growthRate * 100).toFixed(2)}%</p>
          {people.length > 0 ? (
            people.map((person) => (
              <div key={person.id}>
                <h2>{person.name || `Person ${person.id}`}</h2>
                <p>Begin Age: {person.beginAge}</p>
                <p>Begin Amount: {person.beginAmount}</p>
              </div>
            ))
          ) : (
            <p>No people added yet.</p>
          )}
        </Page>
      </div>
    </main>
  );
}

function Page({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose min-h-dvh max-w-full border p-5 print:border-none">
      {children}
    </div>
  );
}
