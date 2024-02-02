import FamilyValueForm from "./family-value-form";
import FamilyValueList from "./family-value-list";

export default function FamilyValuesPage() {
  return (
    <main className="mx-auto mt-20 max-w-xl px-2">
      <FamilyValueForm />
      <FamilyValueList />
    </main>
  );
}
