import PDFPage from "./pdf-page";
import { createClient } from "@/lib/supabase/server";
import { policyTreeColumns } from "../policy-tree/columns";
import { DataTable } from "@/components/data-table";
import { PersonTable } from "../family-garden/person-table";
import FamilyTreePDF from "./family-tree-pdf";
import OrgChartPDF from "./org-chart-pdf";
import { assetAllocationColumns } from "../asset-allocation/columns";
import AssetPieChart from "../asset-allocation/asset-pie-chart";
import { wealthItems } from "../wealth-forest/data";

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

  const { data: familyCrest } = await supabase
    .from("family_crest")
    .select("*")
    .eq("user_id", data.user?.id)
    .maybeSingle();

  const { data: assetAllocations } = await supabase
    .from("asset_allocation")
    .select("*")
    .eq("user_id", data.user?.id);

  return (
    <div className="space-y-10 print:space-y-0">
      <PDFPage>
        <div className="flex h-dvh items-center justify-center">
          <div>
            <h1 className="text-6xl">Intergenerational Family Code</h1>
            <p className="text-right text-2xl font-bold">
              Jeremy Reinbolt, President
            </p>
          </div>
        </div>
      </PDFPage>
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
      <PDFPage>
        <h1>Policy Tree</h1>
        <div className="prose-table:my-0">
          <DataTable columns={policyTreeColumns} data={policies || []} />
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
      <PDFPage>
        <h1>Building your Wealth Forest</h1>
        <div className="grid grid-cols-2 gap-4">
          {wealthItems.map((item, i) => (
            <div key={i}>
              <h2>{item.alt}</h2>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </PDFPage>
      <PDFPage>
        <h1>Asset Allocation</h1>
        <div className="text-sm prose-table:my-0">
          <DataTable
            columns={assetAllocationColumns}
            data={assetAllocations || []}
          />
          <div className="mx-auto mt-6 h-72 w-72">
            <AssetPieChart assetAllocations={assetAllocations || []} />
          </div>
        </div>
      </PDFPage>
      {familyCrest && (
        <PDFPage>
          <h1>Family Crest</h1>
          <div className="flex gap-10 p-10">
            <div className="text-xl">
              <p>{familyCrest.name}&apos;s Family Crest</p>
              {familyCrest.motto && (
                <blockquote>{familyCrest.motto}</blockquote>
              )}
              <div className="mt-20">
                <p>Animal: {familyCrest.animal}</p>
                <p>Symbol: {familyCrest.symbol}</p>
                <p>Colours: {familyCrest.color}</p>
              </div>
            </div>
            <div>
              <img
                src={familyCrest.image_url}
                alt="Family Crest"
                className="ml-6 w-[448px] rounded-lg"
              />
            </div>
          </div>
        </PDFPage>
      )}
      <FamilyTreePDF />
      <OrgChartPDF />
    </div>
  );
}
