import FamilyCodeForm from "./family-code-form";
import Statements from "./statements";

export default function FamilyCodePage() {
  return (
    <main className="mx-auto mt-20 max-w-xl px-2">
      <FamilyCodeForm />
      <Statements />
    </main>
  );
}
