import PDFPage from "./pdf-page";
import { createClient } from "@/lib/supabase/server";
import { policyTreeColumns } from "../policy-tree/columns";
import { DataTable } from "@/components/data-table";
import { PersonTable } from "../family-garden/person-table";
import FamilyTreePDF from "./family-tree-pdf";

export default async function PDFPages() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const { data: questions } = await supabase
    .from("decision_tree")
    .select("*")
    .eq("user_id", data.user?.id);

  const { data: values } = await supabase
    .from("family_values")
    .select("*")
    .eq("user_id", data.user?.id);

  const { data: familyCode } = await supabase
    .from("family_code")
    .select("*")
    .eq("user_id", data.user?.id);

  const { data: contacts } = await supabase
    .from("contacts")
    .select("*")
    .eq("user_id", data.user?.id);

  const { data: visionStatements } = await supabase
    .from("family_vision")
    .select("*")
    .eq("user_id", data.user?.id);

  const { data: policies } = await supabase
    .from("policy_tree")
    .select("*")
    .eq("user_id", data.user?.id);

  const { data: impactStatement } = await supabase
    .from("philanthropy_impact_statements")
    .select("*")
    .eq("user_id", data.user?.id)
    .maybeSingle();

  const { data: guidelines } = await supabase
    .from("philanthropy_guidelines")
    .select("*")
    .eq("user_id", data.user?.id);

  const { data: people } = await supabase
    .from("family_garden")
    .select("*")
    .eq("user_id", data.user?.id);

  return (
    <div className="space-y-10 print:space-y-0">
      <PDFPage>
        <h1>Decision Tree</h1>
        <ul>
          {questions && questions.length ? (
            questions.map((question) => (
              <li key={question.id}>{question.question}</li>
            ))
          ) : (
            <li>No questions yet.</li>
          )}
        </ul>
      </PDFPage>
      <PDFPage>
        <h1>Family Values</h1>
        <div>
          {values && values.length ? (
            values.map((value) => (
              <p key={value.id}>
                <span className="font-semibold">{value.title}: </span>
                {value.description}
              </p>
            ))
          ) : (
            <li>No values yet.</li>
          )}
        </div>
      </PDFPage>
      <PDFPage>
        <h1>Family Code</h1>
        {
          <ul>
            {familyCode && familyCode.length ? (
              familyCode.map((statement) => (
                <li key={statement.id}>{statement.statement}</li>
              ))
            ) : (
              <li>No statements yet.</li>
            )}
          </ul>
        }
      </PDFPage>
      <PDFPage>
        <h1>Contacts</h1>
        <div>
          {contacts && contacts.length ? (
            contacts.map((contact) => (
              <div key={contact.id}>
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
      </PDFPage>
      <PDFPage>
        <h1>Policy Tree</h1>
        <div className="prose-table:my-0">
          <DataTable columns={policyTreeColumns} data={policies || []} />
        </div>
      </PDFPage>
      <PDFPage>
        <h1>Family Vision</h1>
        {
          <ul>
            {visionStatements && visionStatements.length ? (
              visionStatements.map((statement) => (
                <li key={statement.id}>{statement.statement}</li>
              ))
            ) : (
              <li>No statements yet.</li>
            )}
          </ul>
        }
      </PDFPage>
      <FamilyTreePDF />
      <PDFPage>
        <h1>Philanthropy</h1>
        <div>
          {impactStatement && (
            <>
              <h2>Impact Statement</h2>
              <p>{impactStatement.statement}</p>
            </>
          )}
          <h2>Guidelines</h2>
          {
            <ul>
              {guidelines && guidelines.length ? (
                guidelines.map((guideline) => (
                  <li key={guideline.id}>{guideline.guideline}</li>
                ))
              ) : (
                <li>No guidelines yet.</li>
              )}
            </ul>
          }
        </div>
      </PDFPage>
      {people &&
        people.map((person) => (
          <PDFPage key={person.name}>
            <h1>Family Garden</h1>
            <h2 className="">{person.name}</h2>
            <PersonTable person={person} />
          </PDFPage>
        ))}
    </div>
  );
}
