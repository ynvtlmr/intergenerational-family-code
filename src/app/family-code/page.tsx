import FamilyCodeForm from "./family-code-form";
import Statements from "./statements";

export default function FamilyCodePage() {
  return (
    <main className="max-w-xl mx-auto mt-20 px-2">
      <FamilyCodeForm />
      <Statements />
    </main>
  )
}